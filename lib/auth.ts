import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;
console.log("🚀 ~ MONGODB_URI:", MONGODB_URI);

const client = new MongoClient(MONGODB_URI);
const db = client.db();

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
    },
  },
  //...your config
  plugins: [nextCookies()], // make sure nextCookie() is the last plugin in the array
});
