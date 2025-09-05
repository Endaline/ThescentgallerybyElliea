"use server";

import { formatError } from "@/lib/utils";
import { prisma } from "@/app/db/prismadb";
import { revalidatePath } from "next/cache";
import { MainCompanyInfo } from "@/lib/types/type";

export async function getAllCompanyInfo() {
  try {
    const companyInfo = await prisma.companyInfo.findFirst();

    return {
      success: true,
      data: companyInfo,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function createCompanyInfo(data: MainCompanyInfo) {
  console.log("data", data);
  try {
    await prisma.companyInfo.create({
      data: {
        ...data,
      },
    });

    revalidatePath("/admin/settings");

    return {
      success: true,
      message: "Company info created successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function updateCompanyInfo(data: MainCompanyInfo, id: string) {
  try {
    const companyInfoExists = await prisma.companyInfo.findUnique({
      where: { id },
    });

    if (!companyInfoExists) throw new Error("Company info not found");

    await prisma.companyInfo.update({
      where: { id },
      data: { ...data },
    });

    revalidatePath("/admin/settings");

    return {
      success: true,
      message: "Company info updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
