"use server";

import { APIError } from "better-auth";
import { headers } from "next/headers";

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
    return {
      success: true,
      data: {
        employee: JSON.parse(JSON.stringify(updatedProfile)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
