"use server";

import { auth } from "@/lib/auth";

import action from "../handlers/action";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";
import { signupFormSchema } from "../validations/auth";

export const signUpWithEmailPassword = async (
  params: ISignUpEmailParams
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<ActionResponse<{ user: any; token: string | null }>> => {
  const validationResult = await action({
    params,
    schema: signupFormSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name, email, password, confirmPassword, agreeOnTerms, accountType } = validationResult.params!;

  if (password !== confirmPassword) {
    throw new Error("Password does not match");
  }

  if (!agreeOnTerms) {
    throw new Error("User must agree to the terms before signing up.");
  }

  try {
    const data = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        agreeOnTerms,
        accountType,
      },
    });

    console.log(data);

    return {
      success: true,
      status: 201,
      data: {
        user: data.user,
        token: data.token,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const createUser = async () => {
  await dbConnect();
  return {
    user: "rakib",
  };
};
