import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;

const client = new MongoClient(MONGODB_URI);
const db = client.db();

// Auth for server
export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
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
        type: "string",
        required: false,
      },
      employee: {
        type: "string",
        required: false,
      },
      candidate: {
        type: "string",
        required: false,
      },
    },
  },
  session: {
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
        type: "string",
        required: false,
      },
      employee: {
        type: "string",
        required: false,
      },
      candidate: {
        type: "string",
        required: false,
      },
    },
    storeSessionInDatabase: true,
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
  plugins: [
    customSession(async ({ user, session }) => {
      // let employeeId = "";

      // //@ts-ignore
      // if (user?.accountType === "employee") {
      //   employeeId = "askdjhkasdf";
      // }
      return {
        user,
        session,
      };
    }),
    nextCookies(),
  ], // make sure nextCookie() is the last plugin in the array
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
