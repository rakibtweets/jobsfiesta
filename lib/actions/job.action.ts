"use server";
import { Employee } from "@/database/employee.model";
import { IJob, Job } from "@/database/job.model";

import action from "../handlers/action";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";
import { jobFormSchema, JobFormValues } from "../validations/job";

export const createNewJob = async (
  employeeId: string,
  payload: JobFormValues
): Promise<ActionResponse<{ job: IJob }>> => {
  // Validate payload
  const validationResult = await action({
    params: payload,
    schema: jobFormSchema,
    authorizeRole: "employee",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();

    const { title, description, location, jobType, skillLelvel, yearOfExperieence, salary, skillsRequired } =
      validationResult.params!;

    // Ensure employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) throw new Error("Employee profile not found");

    // Create job
    const [job] = await Job.create([
      {
        employer: employee._id,
        title,
        description,
        location,
        jobType,
        skillLelvel,
        yearOfExperieence,
        salary,
        skillsRequired,
        companyName: employee.companyName,
      },
    ]);

    if (!job) throw new Error("Failed to create Job posting");

    return {
      success: true,
      data: {
        job: JSON.parse(JSON.stringify(job)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const updateExistingJobById = async (
  jobId: string,
  payload: Partial<JobFormValues>
): Promise<ActionResponse<{ job: IJob }>> => {
  try {
    await dbConnect();

    // Ensure employee exists
    const validationResult = await action({
      params: payload,
      schema: jobFormSchema,
      authorizeRole: "employee",
    });

    if (validationResult instanceof Error) {
      return handleError(validationResult) as ErrorResponse;
    }

    const updatedData = validationResult.params!;

    const job = await Job.findByIdAndUpdate(jobId, updatedData, {
      new: true,
    });
    if (!job) throw new Error("Job not found or failed to update");

    return {
      success: true,
      data: {
        job: JSON.parse(JSON.stringify(job)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
