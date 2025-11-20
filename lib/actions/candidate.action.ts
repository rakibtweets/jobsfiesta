"use server";

import { APIError } from "better-auth";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";

import { Candidate, ICandidateProfile, IExperience, IEducation } from "@/database/candidate.model";
import { auth } from "@/lib/auth";

import action from "../handlers/action";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";
import { createCandidateProfileSchema, experienceSchema, educationSchema } from "../validations/candidate.validate";

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

export const addExperienceToCandidateProfile = async (
  userId: string,
  params: z.infer<typeof experienceSchema>
): Promise<ActionResponse<{ experience: IExperience }>> => {
  // 1. Validate input
  const validationResult = await action({
    params,
    schema: experienceSchema,
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    const { position, company, startDate, endDate, description } = params;

    // 2. Find candidate profile
    const profile = await Candidate.findOne({ user: userId });

    if (!profile) {
      throw new Error("Candidate profile not found");
    }

    // 3. Build new experience object
    const newExperience = {
      _id: new mongoose.Types.ObjectId(),
      position,
      company,
      startDate,
      endDate,
      description,
    };

    // 4. Push experience into array
    profile.experience.push(newExperience);

    // 5. Save the profile
    await profile.save();

    revalidatePath("/dashboard/candidate/profile");

    return {
      success: true,
      data: {
        experience: JSON.parse(JSON.stringify(newExperience)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const updateExperienceInCandidateProfile = async (
  userId: string,
  experienceId: string,
  params: z.infer<typeof experienceSchema>
): Promise<ActionResponse<{ experience: IExperience }>> => {
  // 1. Validate input
  const validationResult = await action({
    params,
    schema: experienceSchema,
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    const { position, company, startDate, endDate, description } = params;

    // 2. Find candidate profile
    const profile = await Candidate.findOne({ user: userId });

    if (!profile) {
      throw new Error("Candidate profile not found");
    }

    // 3. Find experience by _id
    const experience = profile.experience.find((e) => String(e._id) === experienceId);

    if (!experience) {
      throw new Error("Experience entry not found");
    }

    // 4. Update fields
    experience.position = position ?? experience.position;
    experience.company = company ?? experience.company;
    experience.startDate = startDate ?? experience.startDate;
    experience.endDate = endDate ?? experience.endDate;
    experience.description = description ?? experience.description;

    // 5. Save profile
    await profile.save();
    revalidatePath("/dashboard/candidate/profile");
    return {
      success: true,
      data: {
        experience: JSON.parse(JSON.stringify(experience)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const getCandidateProfileByUserId = async (
  userId: string
): Promise<ActionResponse<{ candidate: ICandidateProfile }>> => {
  try {
    await dbConnect();

    // 1. Find profile
    const profile = await Candidate.findOne({ user: userId }).lean();

    if (!profile) {
      throw new Error("Candidate profile not found");
    }

    // 2. Return
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

export const deleteExperienceFromCandidateProfile = async (
  userId: string,
  experienceId: string
): Promise<ActionResponse> => {
  try {
    await dbConnect();

    // 1. Find candidate profile
    const profile = await Candidate.findOne({ user: userId });

    if (!profile) {
      throw new Error("Candidate profile not found");
    }

    // 2. Find experience index
    const index = profile.experience.findIndex((e) => String(e._id) === experienceId);

    if (index === -1) {
      throw new Error("Experience entry not found");
    }

    // 3. Remove experience from array
    profile.experience.splice(index, 1);

    // 4. Save changes
    await profile.save();

    // 5. Revalidate UI path
    revalidatePath("/dashboard/candidate/profile");

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const addEducationToCandidateProfile = async (
  userId: string,
  params: z.infer<typeof educationSchema>
): Promise<ActionResponse<{ education: IEducation }>> => {
  // 1. Validate input
  const validationResult = await action({
    params,
    schema: educationSchema,
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    const { institution, degree, fieldOfStudy, graduationYear } = params;
    console.log("🚀 ~ addEducationToCandidateProfile ~ params:", params);

    // 2. Find candidate profile
    const profile = await Candidate.findOne({ user: userId });

    if (!profile) {
      throw new Error("Candidate profile not found");
    }

    // 3. Build new education object
    const newEducation = {
      _id: new mongoose.Types.ObjectId(),
      institution,
      degree,
      fieldOfStudy,
      graduationYear,
    };

    // 4. Push education into array
    profile.education.push(newEducation);

    // 5. Save the profile
    await profile.save();

    revalidatePath("/dashboard/candidate/profile");

    return {
      success: true,
      data: {
        education: JSON.parse(JSON.stringify(newEducation)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const updateEducationInCandidateProfile = async (
  userId: string,
  educationId: string,
  params: z.infer<typeof educationSchema>
): Promise<ActionResponse<{ education: IEducation }>> => {
  // 1. Validate input
  const validationResult = await action({
    params,
    schema: educationSchema,
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    const { institution, degree, fieldOfStudy, graduationYear } = params;
    console.log("🚀 ~ updateEducationInCandidateProfile ~ params:", params);

    // 2. Find candidate profile
    const profile = await Candidate.findOne({ user: userId });

    if (!profile) {
      throw new Error("Candidate profile not found");
    }

    // 3. Find education by _id
    const education = profile.education.find((e) => String(e._id) === educationId);

    if (!education) {
      throw new Error("Education entry not found");
    }

    // 4. Update fields
    education.institution = institution ?? education.institution;
    education.degree = degree ?? education.degree;
    education.fieldOfStudy = fieldOfStudy ?? education.fieldOfStudy;
    education.graduationYear = graduationYear ?? education.graduationYear;

    // 5. Save profile
    await profile.save();
    revalidatePath("/dashboard/candidate/profile");
    return {
      success: true,
      data: {
        education: JSON.parse(JSON.stringify(education)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const deleteEducationFromCandidateProfile = async (
  userId: string,
  educationId: string
): Promise<ActionResponse> => {
  try {
    await dbConnect();

    // 1. Find candidate profile
    const profile = await Candidate.findOne({ user: userId });

    if (!profile) {
      throw new Error("Candidate profile not found");
    }

    // 2. Find education index
    const index = profile.education.findIndex((e) => String(e._id) === educationId);

    if (index === -1) {
      throw new Error("Education entry not found");
    }

    // 3. Remove education from array
    profile.education.splice(index, 1);

    // 4. Save changes
    await profile.save();

    // 5. Revalidate UI path
    revalidatePath("/dashboard/candidate/profile");

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
