import mongoose, { Schema, Document, Model } from "mongoose";

// ------------------------------
// 1. INTERFACES
// ------------------------------
export interface ISalary {
  min?: number;
  max?: number;
  currency?: string; // e.g. "USD"
  period?: string; // e.g. "Annual", "Hourly"
}

interface ICompanyLogo {
  id?: string;
  url?: string;
}

export interface IJob extends Document {
  employer: mongoose.Types.ObjectId; // ref: EmployerProfile
  title: string;
  description: string;
  location: string;
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
  salary?: ISalary;
  skillsRequired: string[];
  status: "open" | "closed" | "filled";
  deadline?: Date;
  companyName?: string;
  companyLogo?: ICompanyLogo;
  applications: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// ------------------------------
// 2. SCHEMA
// ------------------------------
const jobSchema = new Schema<IJob>(
  {
    employer: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
    },

    salary: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String },
      period: { type: String },
    },

    skillsRequired: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    status: {
      type: String,
      enum: ["open", "closed", "filled"],
      default: "open",
      index: true,
    },

    deadline: {
      type: Date,
    },

    companyName: {
      type: String,
    },

    companyLogo: {
      id: { type: String },
      url: { type: String },
    },

    applications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

// ------------------------------
// 3. FULL-TEXT SEARCH INDEX
// ------------------------------
jobSchema.index({
  title: "text",
  description: "text",
  skillsRequired: "text",
});

// ------------------------------
// 4. EXPORT MODEL
// ------------------------------
export const Job: Model<IJob> = mongoose.models.Job || mongoose.model<IJob>("Job", jobSchema);
