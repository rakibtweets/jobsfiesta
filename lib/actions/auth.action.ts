"use server";

import { APIError } from "better-auth";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { signInFormSchema, signupFormSchema } from "../validations/auth";

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

    return {
      success: true,
      status: 201,
      data: {
        user: data.user,
        token: data.token,
      },
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        status: error.statusCode,
        error: {
          message: error.message,
        },
      };
    }
    return handleError(error) as ErrorResponse;
  }
};

export const loginWithEmailPassword = async (
  params: ISignInEmailParams
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<ActionResponse<{ user: any; token: string | null }>> => {
  const validationResult = await action({
    params,
    schema: signInFormSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { email, password, rememberMe } = validationResult.params!;

  try {
    const data = await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe,
      },
      headers: await headers(),
    });

    return {
      success: true,
      status: 200,
      data: {
        user: data.user,
        token: data.token,
      },
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        status: error.statusCode,
        error: {
          message: error.message,
        },
      };
    }

    return handleError(error) as ErrorResponse;
  }
};

export const logoutUser = async (): Promise<ActionResponse> => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        status: error.statusCode,
        error: {
          message: error.message,
        },
      };
    }

    return handleError(error) as ErrorResponse;
  }
};
