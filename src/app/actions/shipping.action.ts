"use server";

import { formatError } from "@/lib/utils";
import { prisma } from "@/app/db/prismadb";
import { revalidatePath } from "next/cache";
import { MainShipping } from "@/lib/types/type";

export async function getAllShippingInfo() {
  console.log("first");
  try {
    const raw = await prisma.shipping.findMany({ take: 5 });
    return {
      success: true,
      data: raw,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function createShippingInfo(data: MainShipping) {
  try {
    // 1. Normalize: trim, dedupe
    const uniqueStates = [...new Set(data.state.map((s) => s.trim()))];

    // 2. Check if any of these states already exist in another record
    const conflicts = await prisma.shipping.findMany({
      where: {
        state: { hasSome: uniqueStates }, // Prisma MongoDB array operator
        ...(data.id && { NOT: { id: data.id } }), // exclude current record on update
      },
      select: { state: true },
    });

    if (conflicts.length > 0) {
      const conflictingStates = conflicts.flatMap((c) => c.state);
      const duplicateStates = uniqueStates.filter((s) =>
        conflictingStates.includes(s)
      );

      if (duplicateStates.length > 0) {
        return {
          success: false,
          message: `These states already exist in another record: ${duplicateStates.join(
            ", "
          )}`,
        };
      }
    }

    // 3. Update if ID is provided
    if (data.id) {
      await prisma.shipping.update({
        where: { id: data.id },
        data: {
          state: uniqueStates,
          shippingRate: data.shippingRate,
          taxRate: data.taxRate,
        },
      });
    } else {
      // 4. Otherwise create
      await prisma.shipping.create({
        data: {
          state: uniqueStates,
          shippingRate: data.shippingRate,
          taxRate: data.taxRate,
        },
      });
    }

    revalidatePath("/admin/settings/shipping");

    return { success: true, message: "Shipping info saved successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function updateShippingInfo(data: MainShipping) {
  try {
    if (!data.id) {
      return { success: false, message: "Missing record ID for update" };
    }

    // 1. Normalize: trim + dedupe
    const uniqueStates = [...new Set(data.state.map((s) => s.trim()))];

    // 2. Check for conflicting states in other records
    const conflicts = await prisma.shipping.findMany({
      where: {
        state: { hasSome: uniqueStates },
        NOT: { id: data.id }, // exclude current record
      },
      select: { state: true },
    });

    if (conflicts.length > 0) {
      const conflictingStates = conflicts.flatMap((c) => c.state);
      const duplicateStates = uniqueStates.filter((s) =>
        conflictingStates.includes(s)
      );

      if (duplicateStates.length > 0) {
        return {
          success: false,
          message: `These states already exist in another record: ${duplicateStates.join(
            ", "
          )}`,
        };
      }
    }

    // 3. Perform the update
    await prisma.shipping.update({
      where: { id: data.id },
      data: {
        state: uniqueStates,
        shippingRate: data.shippingRate,
        taxRate: data.taxRate,
      },
    });

    revalidatePath("/admin/settings/shipping");

    return { success: true, message: "Shipping info updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function deleteShippingInfo(id: string) {
  try {
    await prisma.shipping.delete({ where: { id } });
    revalidatePath("/admin/settings/shipping");
    return { success: true, message: "Shipping info deleted successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
