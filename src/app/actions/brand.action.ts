"use server";

import { formatError } from "@/lib/utils";
import { prisma } from "@/app/db/prismadb";
import { revalidatePath } from "next/cache";

export async function getAllBrand() {
  try {
    const [brands, totalCount] = await prisma.$transaction([
      prisma.productBrand.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.productBrand.count(),
    ]);

    const totalPages = Math.ceil(totalCount / 10);

    return {
      success: true,
      data: brands,
      totalCount,
      totalPages,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function createBrand(data: { name: string }) {
  try {
    const { name } = data;

    const brandExists = await prisma.productBrand.findUnique({
      where: { name },
    });

    if (brandExists) throw new Error("Brand already exists");

    await prisma.productBrand.create({
      data: { name },
    });

    revalidatePath("/admin/brand");

    return {
      success: true,
      message: "Category created successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
