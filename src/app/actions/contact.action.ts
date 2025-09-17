"use server";

import { contactFormSchema } from "@/lib/validators";
import { prisma } from "../db/prismadb";
import { sendContactEmail } from "@/services/email/mailer";

export async function submitContact(_: unknown, formData: FormData) {
  try {
    const values = contactFormSchema.parse({
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      //   newsletter: formData.get("newsletter") === "on",
    });

    // Save to DB
    await prisma.contactMessage.create({
      data: values,
    });

    // Send email
    await sendContactEmail(values);

    return { success: true, message: "Message sent successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
}
