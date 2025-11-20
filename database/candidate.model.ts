import mongoose, { Schema, Document, Model } from "mongoose";

// ------------------------------
// 1. INTERFACES
// ------------------------------
export interface IExperience {
  _id?: mongoose.Types.ObjectId;
  position: string;
  company: string;
  startDate?: Date;
  endDate?: Date | null;
  description?: string;
}

export interface IEducation {
  _id?: mongoose.Types.ObjectId;
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
  name: string;
  email: string;
  accountType?: string;
  headline?: string;
  location?: {
    country?: string;
    state?: string;
  };
  dateOfBirth?: Date;
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
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date },
    accountType: { type: String, default: "candidate" },
    headline: { type: String, trim: true },
    location: {
      country: { type: String },
      state: { type: String },
    },
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
        _id: { type: Schema.Types.ObjectId, auto: true },
        position: { type: String, required: true },
        company: { type: String, required: true },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
      },
    ],

    education: [
      {
        _id: { type: Schema.Types.ObjectId, auto: true },
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
