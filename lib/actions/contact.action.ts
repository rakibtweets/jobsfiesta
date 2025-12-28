"use server";

import Contact, { IContact } from "@/database/contact.model";

import action from "../handlers/action";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";
import { ContactFormValues, contactSchema } from "../validations/contact.validate";

export async function createNewContactMessage(
  params: ContactFormValues
): Promise<ActionResponse<{ contact: IContact }>> {
  // Here you can handle the form submission, e.g., send an email or store in a database
  const validationResult = await action({
    // role: "user",
    params,
    schema: contactSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    await dbConnect();
    const { email, message, name, subject } = validationResult.params!;
    const [contact] = await Contact.create([
      {
        name,
        email,
        subject,
        message,
      },
    ]);
    return {
      success: true,
      message: "Your message has been sent successfully.",
      data: {
        contact: JSON.parse(JSON.stringify(contact)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

// all all contact messages only for admin users
export async function getAllContacts(): Promise<ActionResponse<{ contacts: IContact[] }>> {
  const validationResult = await action({
    role: "admin",
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return {
      success: true,
      message: "Contacts retrieved successfully.",
      data: {
        contacts: JSON.parse(JSON.stringify(contacts)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

// delete a contact message by id only for admin users
export async function deleteContactById(id: string): Promise<ActionResponse<null>> {
  const validationResult = await action({
    role: "admin",
    params: { id },
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();
    await Contact.findByIdAndDelete(id);
    return {
      success: true,
      message: "Contact message deleted successfully.",
      data: null,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
