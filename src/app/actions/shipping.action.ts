"use server";

import { formatError } from "@/lib/utils";
import { prisma } from "@/app/db/prismadb";
import { revalidatePath } from "next/cache";
import { MainShipping } from "@/lib/types/type";

export async function getAllShippingInfo() {
  try {
    const shippingInfo = await prisma.shipping.findFirst();

    return {
      success: true,
      data: shippingInfo,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function createShippingInfo(data: MainShipping) {
  console.log("data", data);
  try {
    await prisma.shipping.create({
      data: {
        ...data,
      },
    });

    revalidatePath("/admin/settings");

    return {
      success: true,
      message: "Shipping info created successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function updateShippingInfo(data: MainShipping, id: string) {
  try {
    const shippingInfoExists = await prisma.shipping.findUnique({
      where: { id },
    });

    if (!shippingInfoExists) throw new Error("Shipping info not found");

    await prisma.shipping.update({
      where: { id },
      data: { ...data },
    });

    revalidatePath("/admin/settings");

    return {
      success: true,
      message: "Shipping info updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
