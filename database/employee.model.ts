import mongoose, { Schema, Document, Model } from "mongoose";

// ------------------------------
// 1. INTERFACES
// ------------------------------
export interface ICompanyLogo {
  id?: string;
  url?: string;
}

export interface IEmployerProfile extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  email: string;
  accountType?: string;
  companyName: string;
  companyLogo?: ICompanyLogo;
  website?: string;
  location?: string;
  industry?: string;
  about?: string;
  jobsPosted: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// ------------------------------
// 2. SCHEMA
// ------------------------------
const employerProfileSchema = new Schema<IEmployerProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    accountType: { type: String, default: "employee" },

    companyName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    companyLogo: {
      id: { type: String },
      url: { type: String },
    },

    website: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    industry: {
      type: String,
      trim: true,
    },

    about: {
      type: String,
    },

    jobsPosted: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true }
);

// ------------------------------
// 3. EXPORT MODEL (Avoids recompiling in Next.js)
// ------------------------------
export const Employee: Model<IEmployerProfile> =
  mongoose.models.Employee || mongoose.model<IEmployerProfile>("Employee", employerProfileSchema);
