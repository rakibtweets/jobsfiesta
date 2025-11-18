import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";
import { z } from "zod";

const MONGODB_URI = process.env.MONGODB_URI as string;

const client = new MongoClient(MONGODB_URI);
const db = client.db();

const roles = z.enum(["admin", "editor", "moderator"]);

// Auth for server
export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      agreeOnTerms: {
        type: "boolean",
        required: true,
      },
      accountType: {
        type: "string",
        required: false,
      },
      role: {
        type: ["admin", "editor", "moderator"],
        required: false,
        validator: {
          input: roles,
        },
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (user.email === process.env.ADMIN_EMAIL) {
            return {
              data: {
                ...user,
                role: "admin",
              },
            };
          }
          return { data: user };
        },
      },
    },
  },
  //...your config
  plugins: [nextCookies()], // make sure nextCookie() is the last plugin in the array
});
