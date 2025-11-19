"use server";

import { APIError } from "better-auth";
import { headers } from "next/headers";
import z, { success } from "zod";

import { Candidate, ICandidateProfile } from "@/database/candidate.mode";
import { auth } from "@/lib/auth";

import action from "../handlers/action";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";
import { createCandidateProfileSchema } from "../validations/candidate.validate";

export const getCandidates = async () => {
  await dbConnect();
  return {
    name: "Rakib",
    age: 25,
  };
};

export const createCandidateProfile = async (
  userId: string,
  accountType: string,
  params: z.infer<typeof createCandidateProfileSchema>
): Promise<ActionResponse<{ candidate: ICandidateProfile }>> => {
  // 1. Validate input

  console.log(params);
  const validationResult = await action({
    params,
    schema: createCandidateProfileSchema,
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    // Extract fields from validated result
    const { name, email, phone, headline, gender, dateOfBirth, location, bio } = params;

    // Ensure one user = one profile (optional if needed)
    const existing = await Candidate.findOne({ email });
    if (existing) {
      throw new Error("Candidate profile for this email already exists");
    }

    // 3. Create profile
    const [profile] = await Candidate.create([
      {
        user: userId,
        name,
        accountType,
        email,
        phone,
        headline,
        gender,
        dateOfBirth,
        location,
        bio,
      },
    ]);

    if (!profile) throw new Error("Failed to create candidate profile");

    try {
      await auth.api.updateUser({
        body: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          candidate: (profile._id as any).toString(),
        },
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
    }

    // 6. Return success
    return {
      success: true,
      data: {
        candidate: JSON.parse(JSON.stringify(profile)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
