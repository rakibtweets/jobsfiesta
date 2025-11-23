"use server";

import { APIError } from "better-auth";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { Candidate, ICandidateProfile } from "@/database/candidate.model";
import { Employee, IEmployerProfile } from "@/database/employee.model";
import { auth } from "@/lib/auth";

import action from "../handlers/action";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";
import { EmployeeProfileFormValues, employeeFormSchema } from "../validations/employee.validatoin";

export const createEmployeeProfile = async (
  userId: string,
  accountType: string,
  payload: EmployeeProfileFormValues
): Promise<ActionResponse<{ employee: IEmployerProfile }>> => {
  console.log({ userId, accountType, payload });
  const validationResult = await action({
    params: payload,
    schema: employeeFormSchema,
    authorizeRole: "employee",
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();

    // Extract fields from validated result
    const { name, email, companyName, companySize, country, industry } = validationResult.params!;

    // Ensure one user = one profile (optional if needed)
    const existing = await Employee.findOne({ user: userId });

    if (existing) {
      throw new Error("Employee profile for this user already exists");
    }

    // 3. Create profile
    const [profile] = await Employee.create([
      {
        user: userId,
        name,
        accountType,
        email,
        companyName,
        companySize,
        country,
        industry,
      },
    ]);

    if (!profile) throw new Error("Failed to create Employee profile");

    try {
      await auth.api.updateUser({
        body: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          employee: (profile._id as any).toString(),
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
        employee: JSON.parse(JSON.stringify(profile)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const updateEmployeeProfile = async (
  userId: string,
  payload: Partial<EmployeeProfileFormValues>
): Promise<ActionResponse<{ employee: IEmployerProfile }>> => {
  const validationResult = await action({
    params: payload,
    schema: employeeFormSchema.partial(),
    authorizeRole: "employee",
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();
    // 2. Update profile
    const updatedProfile = await Employee.findOneAndUpdate(
      { user: userId },
      { $set: validationResult.params },
      { new: true }
    );
    if (!updatedProfile) throw new Error("Failed to update Employee profile");
    // 3. Return success
    revalidatePath("/dashboard/employee/profile");
    return {
      success: true,
      data: {
        employee: JSON.parse(JSON.stringify(updatedProfile)),
      },
    };
  } catch (error) {
    console.log("🚀 ~ updateEmployeeProfile ~ error:", error);
    return handleError(error) as ErrorResponse;
  }
};

// save candidates
export async function addToSavedCandidate(candidateId: string, employeeId: string): Promise<ActionResponse> {
  const validationResult = await action({
    params: { employeeId, candidateId },
    authorizeRole: "employee",
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();

    console.log({ candidateId, employeeId });

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      throw new Error("candidate not found");
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new Error("User not found");
    }
    const alreadyInWishlist = employee.savedCandidate?.some(
      (id: mongoose.Types.ObjectId) => id.toString() === candidateId
    );

    if (alreadyInWishlist) {
      throw new Error("Candidate already in saved list");
    }

    // Add candidate to employee's savedCandidate list if not already there
    await Employee.findByIdAndUpdate(employeeId, { $addToSet: { savedCandidate: candidateId } }, { new: true });

    revalidatePath("/dashboard/employee");
    revalidatePath("/dashboard/employee/saved-candidates");
    return { success: true };
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return handleError(error) as ErrorResponse;
  }
}

// remove from  removeFromSavedCandidate

export async function removeFromSavedCandidate(candidateId: string, employeeId: string): Promise<ActionResponse> {
  const validationResult = await action({
    params: { employeeId, candidateId },
    authorizeRole: "employee",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      throw new Error("Candidate not found");
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new Error("Employee not found");
    }

    const isSaved = employee.savedCandidate?.some((id: mongoose.Types.ObjectId) => id.toString() === candidateId);

    if (!isSaved) {
      throw new Error("Candidate is not in saved list");
    }

    // Remove candidate from savedCandidate list
    await Employee.findByIdAndUpdate(employeeId, { $pull: { savedCandidate: candidateId } }, { new: true });

    revalidatePath("/dashboard/employee");
    revalidatePath("/dashboard/employee/saved-candidates");

    return { success: true };
  } catch (error) {
    console.error("Error removing from saved candidates:", error);
    return handleError(error) as ErrorResponse;
  }
}

export async function clearSavedCandidates(employeeId: string): Promise<ActionResponse> {
  const validationResult = await action({
    params: { employeeId },
    authorizeRole: "employee",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new Error("Employee not found");
    }

    // Clear the savedCandidate array
    await Employee.findByIdAndUpdate(employeeId, { $set: { savedCandidate: [] } }, { new: true });

    // Revalidate paths
    revalidatePath("/dashboard/employee");
    revalidatePath("/dashboard/employee/saved-candidates");

    return { success: true };
  } catch (error) {
    console.error("Error clearing saved candidates:", error);
    return handleError(error) as ErrorResponse;
  }
}

export async function getSavedCandidates(
  employeeId: string
): Promise<ActionResponse<{ candidates: ICandidateProfile[] }>> {
  const validationResult = await action({
    authorizeRole: "employee",
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    // Find the employee and populate savedCandidate with selected fields
    const employee = await Employee.findById(employeeId).populate({
      path: "savedCandidate",
      model: Candidate,
      select: "name skills headline location.country",
    });

    if (!employee) {
      throw new Error('"Employee not found"');
    }

    return {
      success: true,
      data: {
        candidates: JSON.parse(JSON.stringify(employee.savedCandidate)) || [],
      },
    };
  } catch (error) {
    console.error("Error fetching saved candidates:", error);
    return handleError(error) as ErrorResponse;
  }
}

// logo upload

export const employeeLogoUpload = async (
  userId: string,
  payload: { id?: string; url?: string }
): Promise<ActionResponse> => {
  try {
    await dbConnect();

    console.log(payload);

    if (!payload?.url) {
      throw new Error("Image URL is required");
    }
    const employee = await Employee.findOne({ user: userId });
    if (!employee) {
      throw new Error("Employee profile not found");
    }

    // Update photo atomically
    const updatedProfile = await Employee.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          companyLogo: {
            id: payload.id ?? employee.companyLogo?.id ?? "",
            url: payload.url ?? employee.companyLogo?.url ?? "",
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
      if (updatedProfile?.companyLogo?.url as string) {
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
    revalidatePath("/dashboard/employee/profile");

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export async function getEmployeeById(employeeId: string): Promise<ActionResponse<{ employee: IEmployerProfile }>> {
  const validationResult = await action({
    params: { employeeId },
    authorizeRole: "employee",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      throw new Error("Employee not found");
    }

    return {
      success: true,
      data: {
        employee: JSON.parse(JSON.stringify(employee)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
