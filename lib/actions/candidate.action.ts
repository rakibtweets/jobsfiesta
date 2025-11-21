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
    const { name, email, phone, headline, gender, dateOfBirth, location, bio } = validationResult.params!;

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

export const updateCandidateProfile = async (
  userId: string,
  params: z.infer<typeof createCandidateProfileSchema>
): Promise<ActionResponse<{ candidate: ICandidateProfile }>> => {
  // 1. Validate input
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

    const { name, phone, headline, gender, dateOfBirth, location, bio } = validationResult.params!;

    // 2. Find candidate profile
    const profile = await Candidate.findOne({ user: userId });

    if (!profile) {
      throw new Error("Candidate profile not found");
    }

    // 3. Update fields if they exist in params
    if (name !== undefined) profile.name = name;
    if (phone !== undefined) profile.phone = phone;
    if (headline !== undefined) profile.headline = headline;
    if (gender !== undefined) profile.gender = gender;
    if (bio !== undefined) profile.bio = bio;

    if (dateOfBirth !== undefined) profile.dateOfBirth = dateOfBirth;

    if (location) {
      profile.location = {
        country: location.country ?? profile.location?.country,
        state: location.state ?? profile.location?.state,
      };
    }

    // 4. Save changes
    const updated = await profile.save();

    // 5. Revalidate UI page
    revalidatePath("/dashboard/candidate/profile");

    return {
      success: true,
      data: {
        candidate: JSON.parse(JSON.stringify(updated)),
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
  params: z.infer<typeof createCandidateProfileSchema>
): Promise<ActionResponse<{ candidate: ICandidateProfile }>> => {
  // 1. Validate input
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

    const { name, phone, headline, gender, dateOfBirth, location, bio } = validationResult.params!;

    // Build update object dynamically
    const updateData: Partial<ICandidateProfile> = {};

    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (headline !== undefined) updateData.headline = headline;
    if (gender !== undefined) updateData.gender = gender;
    if (bio !== undefined) updateData.bio = bio;
    if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;

    if (location) {
      updateData.location = {
        country: location.country,
        state: location.state,
      };
    }

    // 2. Find and update candidate profile
    const updatedProfile = await Candidate.findOneAndUpdate(
      { user: userId },
      { $set: updateData },
      { new: true } // return the updated document
    );

    if (!updatedProfile) {
      throw new Error("Candidate profile not found");
    }

    // 3. Revalidate UI
    revalidatePath("/dashboard/candidate/profile");

    return {
      success: true,
      data: {
        candidate: JSON.parse(JSON.stringify(updatedProfile)),
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

    const { institution, degree, fieldOfStudy, graduationYear } = validationResult.params!;
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

    const { institution, degree, fieldOfStudy, graduationYear } = validationResult.params!;
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

// Server action: update candidate resume/image information
export const candidateImageUpload = async (
  userId: string,
  payload: { id?: string; url?: string }
): Promise<ActionResponse> => {
  try {
    await dbConnect();

    console.log(payload);

    if (!payload?.url) {
      throw new Error("Image URL is required");
    }
    const candidate = await Candidate.findOne({ user: userId });
    if (!candidate) {
      throw new Error("Candidate profile not found");
    }

    // Update photo atomically
    const updatedProfile = await Candidate.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          photo: {
            id: payload.id ?? candidate.photo?.id ?? "",
            url: payload.url ?? candidate.photo?.url ?? "",
          },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!updatedProfile) {
      throw new Error("Candidate profile not found");
    }

    console.log(updatedProfile);

    // Update better-auth user profile image
    try {
      if (updatedProfile?.photo?.url as string) {
        await auth.api.updateUser({
          body: {
            image: payload.url as string,
          },
          headers: await headers(),
        });

        return {
          success: true,
        };
      }
    } catch (error) {
      console.log("🚀 ~ candidateImageUplaod ~ error:", error);
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

    // Revalidate page
    revalidatePath("/dashboard/candidate/profile");

    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀 ~ candidateImageUplaod ~ error:", error);
    return handleError(error) as ErrorResponse;
  }
};

export const candidateResumeUplaod = async (
  userId: string,
  payload: { id?: string; url?: string }
): Promise<ActionResponse> => {
  try {
    await dbConnect();
    console.log(payload);
    if (!payload?.url) {
      throw new Error("Image URL is required");
    }

    // Update resume atomically
    const updatedProfile = await Candidate.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          resume: {
            id: payload.id,
            url: payload.url,
          },
        },
      },
      {
        new: true, // return updated data
        runValidators: true,
      }
    ).lean();

    if (!updatedProfile) {
      throw new Error("Candidate profile not found");
    }

    // Revalidate page
    revalidatePath("/dashboard/candidate/profile");

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
