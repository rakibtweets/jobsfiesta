"use server";

import { Application, IApplication } from "@/database/applicaton.model";
import { Candidate } from "@/database/candidate.model";
import { Job } from "@/database/job.model";

import action from "../handlers/action";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";

export async function applyToJob(candidateId: string, jobId: string): Promise<ActionResponse> {
  const validationResult = await action({
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();

    // Validate candidate
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) throw new Error("Candidate not found");
    if (!candidate.resume?.url) throw new Error("Candidate has no uploaded resume");
    // Validate job
    const job = await Job.findById(jobId);
    if (!job) throw new Error("Job not found");

    // Check if already applied
    const existingApplication = await Application.findOne({
      candidate: candidateId,
      job: jobId,
    });

    if (existingApplication) throw new Error("You have already applied for this job");

    await Application.create({
      candidate: candidateId,
      job: jobId,
      resumeSnapshot: candidate.resume.url,
    });

    return {
      success: true,
      message: "Application submitted successfully",
    };
  } catch (error) {
    console.error("Error applying to job:", error);
    return handleError(error) as ErrorResponse;
  }
}

export async function getAppliedJobs(candidateId: string): Promise<ActionResponse<{ applications: IApplication[] }>> {
  const validationResult = await action({
    authorizeRole: "candidate",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();

    const applications = await Application.find({ candidate: candidateId })
      .populate({
        path: "job",
        model: Job,
        select: "title companyName location salary jobType skillsRequired",
      })
      .sort({ createdAt: -1 });

    return {
      success: true,
      data: {
        applications: JSON.parse(JSON.stringify(applications)),
      },
    };
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return handleError(error) as ErrorResponse;
  }
}
