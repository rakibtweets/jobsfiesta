import z from "zod";

export const createCandidateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email().optional(),
  phone: z.string(),
  headline: z.string().min(1, "Headline is required"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.date().optional(),
  location: z.object({
    country: z.string().min(1, "Country is required"),
    state: z.string().optional(),
  }),
  bio: z.string().min(1, "Bio is required"),
});

export const updateCandidateProfileSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email().optional(),
    phone: z.string(),
    headline: z.string().min(1, "Headline is required"),
    gender: z.string().min(1, "Gender is required"),
    dateOfBirth: z.date().optional(),
    location: z.object({
      country: z.string().min(1, "Country is required"),
      state: z.string().optional(),
    }),
    bio: z.string().min(1, "Bio is required"),
  })
  .optional();

export const deleteCandidateProfileSchema = z.object({
  id: z.string().min(1, "Candidate profile ID is required"),
});
