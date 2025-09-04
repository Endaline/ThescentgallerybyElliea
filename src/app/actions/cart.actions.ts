import { auth } from "@/services/auth";
import { cookies } from "next/headers";
import { prisma } from "../db/prismadb";
import { convertToPlainObject } from "@/lib/utils";

type CartItem = {
  image: string;
  name: string;
  productId: string;
  slug: string;
  qty: number;
  price: number;
};

export async function getMyCart() {
  // Check for cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) {
    return undefined;
  }

  // Get session and user ID
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  // Convert decimals and return
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice,
    totalPrice: cart.totalPrice,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
  });
}
