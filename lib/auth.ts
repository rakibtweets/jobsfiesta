import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import { admin } from "better-auth/plugins";
import { MongoClient } from "mongodb";

import { sendEmailAction } from "./actions/send-email.action";

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
      disableSignUp: true,
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60,
    autoSignInAfterVerification: true,
    sendOnSignIn: true,
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      // console.log("🚀 ~ link:", link);
      console.log("🚀 ~ link:", link);
      // console.log("🚀 ~ link:", link);
      // link.searchParams.set("callbackURL", "/auth/verify");

      await sendEmailAction({
        to: user.email,
        subject: "Verify your email address",
        meta: {
          description: "Please verify your email address to complete the registration process.",
          link: String(link),
        },
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  user: {
    deleteUser: {
      enabled: true,
    },
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
        defaultValue: "user",
        input: false,
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
    admin(),
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
