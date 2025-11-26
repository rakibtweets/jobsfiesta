"use server";

import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { auth, User } from "@/lib/auth";

import action from "../handlers/action";
import handleError from "../handlers/error";
import {
  adminUserCreateSchema,
  AdminUserCreateValues,
  adminUserUpdateSchema,
  AdminUserUpdateValues,
} from "../validations/admin.validate";

// -----------------------------
// Create New User
// -----------------------------
export async function createNewUser(params: AdminUserCreateValues): Promise<ActionResponse<{ user: User }>> {
  const validationResult = await action({
    role: "admin",
    params,
    schema: adminUserCreateSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name, email, password, role, accountType } = validationResult.params!;
  try {
    const newUser = await auth.api.createUser({
      body: {
        email,
        password,
        name,
        role,
        data: {
          accountType,
          role,
        },
      },
      headers: await headers(),
    });

    revalidatePath("/admin/users");
    return {
      success: true,
      message: "User created successfully",
      data: {
        user: JSON.parse(JSON.stringify(newUser)),
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
}

// -----------------------------
// Update User by ID
// -----------------------------
export async function updateUserById(
  userId: string,
  data: Partial<AdminUserUpdateValues>
): Promise<ActionResponse<{ user: User }>> {
  const validationResult = await action({
    role: "admin",
    params: data,
    schema: adminUserUpdateSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    const updatedUser = await auth.api.adminUpdateUser({
      body: { userId, data: { ...data } },
      headers: await headers(),
    });

    revalidatePath("/admin/users");
    return {
      success: true,
      message: "User updated successfully",
      data: {
        user: JSON.parse(JSON.stringify(updatedUser)),
      },
    };
  } catch (error) {
    console.log("🚀 ~ updateUserById ~ error:", error);
    if (error instanceof APIError) {
      return {
        success: false,
        status: error.statusCode,
        error: {
          message: error.message || `${error.statusCode} Error: ${error.status || ""}`,
        },
      };
    }

    return handleError(error) as ErrorResponse;
  }
}

// -----------------------------
// Delete User
// -----------------------------
export async function deleteUser(userId: string) {
  try {
    const deletedUser = await auth.api.removeUser({
      body: { userId },
    });
    revalidatePath("/admin/users");
    return deletedUser;
  } catch (err) {
    console.error("Error deleting user:", err);
    throw err;
  }
}

// -----------------------------
// Get All Users
// -----------------------------
export async function getAllUsers(): Promise<ActionResponse<{ users: User[] }>> {
  const validationResult = await action({
    role: "admin",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    const data = await auth.api.listUsers({
      headers: await headers(),
      query: {
        limit: 10000,
      },
    });

    return {
      success: true,
      message: "Users fetched successfully",
      data: {
        users: JSON.parse(JSON.stringify(data.users)),
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
}

// -----------------------------
// Make User Admin
// -----------------------------
export async function makeUserAdmin(userId: string, role: "user" | "admin" = "admin") {
  try {
    const result = await auth.api.setRole({
      body: { userId, role },
      headers: await headers(),
    });
    return result;
  } catch (err) {
    console.error("Error setting user role:", err);
    throw err;
  }
}

export async function updateUserPassword(userId: string, password: string): Promise<ActionResponse<{ user: User }>> {
  const validationResult = await action({
    role: "admin",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    const updatedUser = await auth.api.setUserPassword({
      body: {
        userId,
        newPassword: password,
      },
      headers: await headers(),
    });

    revalidatePath("/admin/users");
    return {
      success: true,
      message: "Password updated successfully",
      data: {
        user: JSON.parse(JSON.stringify(updatedUser)),
      },
    };
  } catch (error) {
    console.log("🚀 ~ updateUserById ~ error:", error);
    if (error instanceof APIError) {
      return {
        success: false,
        status: error.statusCode,
        error: {
          message: error.message || `${error.statusCode} Error: ${error.status || ""}`,
        },
      };
    }

    return handleError(error) as ErrorResponse;
  }
}
