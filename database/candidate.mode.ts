import mongoose, { Schema, Document, Model } from "mongoose";

// ------------------------------
// 1. INTERFACES
// ------------------------------
export interface IExperience {
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date | null;
  description?: string;
}

export interface IEducation {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: Date;
  endDate?: Date;
}

export interface IResume {
  id?: string;
  url?: string;
}

export interface ICandidateProfile extends Document {
  user: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  headline?: string;
  location?: string;
  bio?: string;
  resume?: IResume;
  skills: string[];
  experience: IExperience[];
  education: IEducation[];
  createdAt: Date;
  updatedAt: Date;
}

// ------------------------------
// 2. SCHEMA
// ------------------------------
const candidateProfileSchema = new Schema<ICandidateProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    headline: { type: String, trim: true },
    location: { type: String, trim: true },
    bio: { type: String },

    resume: {
      id: { type: String },
      url: { type: String },
    },

    skills: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    experience: [
      {
        title: { type: String },
        company: { type: String },
        location: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
      },
    ],

    education: [
      {
        institution: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

// ------------------------------
// 3. EXPORT MODEL (Avoid recompile issues in Next.js)
// ------------------------------
export const Candidate: Model<ICandidateProfile> =
  mongoose.models.Candidate || mongoose.model<ICandidateProfile>("Candidate", candidateProfileSchema);
