"use server";

import { formatError } from "@/lib/utils";
import bcrypt from "bcrypt";

import { signIn, signOut } from "../../services/auth";
import { redirect } from "next/navigation";
import { signInFormSchema, signUpFormSchema } from "@/lib/validators";
import { prisma } from "@/app/db/prismadb";
import { Prisma } from "@prisma/client";
import { getMyCart } from "./cart.actions";
import { sendResetEmail } from "@/services/email/mailer";
import crypto from "crypto";

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    // Handle redirect errors by re-throwing them
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    return { success: false, message: "Invalid email or password" };
  }
}

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const plainPassword = user.password;

    const saltRounds = 10;

    user.password = await bcrypt.hash(user.password, saltRounds);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    // Handle redirect errors by re-throwing them
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    return { success: false, message: formatError(error) };
  }
}

export async function resetPassword(prevState: unknown, formData: FormData) {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gt: new Date() },
    },
  });

  if (!user) {
    return { success: false, message: "Invalid or expired token" };
  }

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashed,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return { success: true, message: "Password has been reset successfully" };
}

export async function requestPasswordReset(
  prevState: unknown,
  formData: FormData
) {
  const email = formData.get("email") as string;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { success: false, message: "No account with that email" };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1h

  await prisma.user.update({
    where: { email },
    data: { resetToken: token, resetTokenExpiry: expiry },
  });

  await sendResetEmail(email, token);

  return { success: true, message: "Password reset email sent" };
}

// export async function changePassword(prevState: unknown, formData: FormData) {
//   try {
//     const user = signUpFormSchema.parse({
//       email: formData.get("email"),
//       password: formData.get("password"),
//       confirmPassword: formData.get("confirmPassword"),
//     });

//     let plainPassword = user.password;

//     const userExists = await prisma.user.findUnique({
//       where: { email: user.email },
//     });

//     if (!userExists) {
//       return { success: false, message: "User not found" };
//     }

//     const saltRounds = 10;

//     plainPassword = await bcrypt.hash(plainPassword, saltRounds);

//     await prisma.user.update({
//       where: { id: userExists.id },
//       data: { password: plainPassword },
//     });

//     return { success: true, message: "Password Changed successfully" };
//   } catch (error) {
//     // Handle redirect errors by re-throwing them
//     if (
//       error &&
//       typeof error === "object" &&
//       "digest" in error &&
//       typeof error.digest === "string" &&
//       error.digest.startsWith("NEXT_REDIRECT")
//     ) {
//       throw error;
//     }
//     return { success: false, message: formatError(error) };
//   }
// }

export async function signOutUser() {
  // get current users cart and delete it so it does not persist to next user
  const currentCart = await getMyCart();

  if (currentCart?.id) {
    await prisma.cart.delete({ where: { id: currentCart.id } });
  }
  await signOut();

  redirect("/login");
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });
  if (!user) redirect(`/login`);
  return user;
}

export async function getAllUsers({
  limit = 10,
  page,
  query,
}: {
  limit?: number;
  page: number;
  query: string;
}) {
  const queryFilter: Prisma.UserWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};

  const data = await prisma.user.findMany({
    where: {
      ...queryFilter,
      role: "user",
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.user.count({
    where: {
      ...queryFilter,
      role: "user",
    },
  });

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}
