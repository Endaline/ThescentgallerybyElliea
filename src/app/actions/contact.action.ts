"use server";

import { contactFormSchema } from "@/lib/validators";
import { prisma } from "../db/prismadb";
import { sendContactEmail } from "@/services/email/mailer";
import { formatError } from "@/lib/utils";

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
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function getAllContactMessages({
  limit = 10,
  page,
}: {
  limit?: number;
  page: number;
}) {
  try {
    const contactMessages = await prisma.contactMessage.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: "desc" },
    });

    const dataCount = await prisma.contactMessage.count();

    return {
      success: true,
      data: contactMessages,
      totalPages: Math.ceil(dataCount / limit),
      totalCount: dataCount,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
