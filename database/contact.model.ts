import { Schema, models, model, Document, Model } from "mongoose";

// Mongoose schema
export interface IContact extends Document {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

const ContactFormSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    subject: String,
    message: {
      type: String,
      required: [true, "Message is required"],
    },
  },
  { timestamps: true }
);

const Contact: Model<IContact> = models.Contact || model("Contact", ContactFormSchema);

export default Contact;
