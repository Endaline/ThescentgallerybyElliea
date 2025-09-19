"use server";

import { auth } from "@/services/auth";
import { cookies } from "next/headers";
import { prisma } from "../db/prismadb";
import { convertToPlainObject, formatError, round2 } from "@/lib/utils";
import { Cart, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  cartItemSchema,
  insertCartSchema,
  ShippingAddressSchema,
} from "@/lib/validators";
import { getUserById } from "./user.actions";
import { redirect } from "next/navigation";

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

// Calculate cart prices
const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
  );

  return {
    itemsPrice: itemsPrice,
  };
};

// --- Types for clarity ---
type ShippingInfo = {
  shippingRate: number;
  taxRate: number;
  state: string[];
  id: string;
};

// ✅ Helper: Always returns a normalized shipping object
const findShipping = async (lga: string | null): Promise<ShippingInfo> => {
  const shippingList = await prisma.shipping.findMany();

  // Try exact match, else default
  const shipping =
    (lga
      ? shippingList.find((s) => s.state.includes(lga))
      : shippingList.find((s) => s.state.includes("Default"))) ?? null;

  // Fallback to safe default
  return (
    shipping ?? {
      shippingRate: 0,
      taxRate: 0,
      state: ["Default"],
      id: "",
    }
  );
};

// ✅ Helper: Calculate totals
export const calcShippingPrice = async (
  items: CartItem[],
  userAddress?: ShippingAddressSchema
) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect(`/login?callbackUrl=/checkout`);
  }

  const user = await getUserById(userId);

  const address = userAddress ?? (user.address as ShippingAddressSchema);

  // Pick LGA from provided address, user’s address, or null (for default)
  const lga = address?.lga ?? null;
  const shipping = await findShipping(lga);

  // Items subtotal
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
  );

  // Shipping + tax
  const shippingPrice = round2(shipping.shippingRate);
  const taxPrice = round2(shipping.taxRate * itemsPrice);
  const totalPrice = round2(itemsPrice + taxPrice + shippingPrice);

  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};

// ✅ Update cart and revalidate
export async function updateCartItems(
  cart: Cart,
  userAddress?: ShippingAddressSchema
) {
  const shippingPrice = await calcShippingPrice(
    cart.items as CartItem[],
    userAddress
  );

  console.log("shippingPrice", shippingPrice);

  await prisma.cart.update({
    where: { id: cart.id },
    data: { ...shippingPrice },
  });

  revalidatePath("/checkout");
}

export async function addItemToCart(data: CartItem) {
  try {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    console.log("sessionCartId", sessionCartId);

    if (!sessionCartId) throw new Error("Cart session not found");

    // Get session and user ID
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    // Get cart
    const cart = await getMyCart();

    // Parse and validate item
    const item = cartItemSchema.parse(data);

    // Find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });
    if (!product) throw new Error("Product not found");

    if (!cart) {
      // Create new cart object
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });

      // Add to database
      await prisma.cart.create({
        data: newCart,
      });

      // Revalidate product page
      revalidatePath(`/products/${product.slug}`);

      return {
        success: true,
        message: `${product.name} added to cart`,
      };
    } else {
      // Check if item is already in cart
      const existItem = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId
      );

      if (existItem) {
        // Check stock
        if (product.stock < existItem.qty + 1) {
          throw new Error("Not enough stock");
        }

        // Increase the quantity
        (cart.items as CartItem[]).find(
          (x) => x.productId === item.productId
        )!.qty = existItem.qty + 1;
      } else {
        // If item does not exist in cart
        // Check stock
        if (product.stock < 1) throw new Error("Not enough stock");

        // Add item to the cart.items
        cart.items.push(item);
      }

      // Save to database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items as CartItem[]),
        },
      });

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} ${
          existItem ? "updated in" : "added to"
        } cart`,
      };
    }
  } catch (error) {
    console.log(formatError(error));
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function removeTotallyFromCart(productId: string) {
  try {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");

    // Get Product
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("Product not found");

    // Get user cart
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    // Check for item
    const exist = (cart.items as CartItem[]).find(
      (x) => x.productId === productId
    );
    if (!exist) throw new Error("Item not found");

    cart.items = (cart.items as CartItem[]).filter(
      (x) => x.productId !== exist.productId
    );

    // Update cart in database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as CartItem[]),
      },
    });

    revalidatePath(`/products/${product.slug}`);

    return {
      success: true,
      message: `${product.name} was removed from cart`,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function removeItemFromCart(productId: string) {
  try {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");

    // Get Product
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("Product not found");

    // Get user cart
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    // Check for item
    const exist = (cart.items as CartItem[]).find(
      (x) => x.productId === productId
    );
    if (!exist) throw new Error("Item not found");

    // Check if only one in qty
    if (exist.qty === 1) {
      // Remove from cart
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.productId !== exist.productId
      );
    } else {
      // Decrease qty
      (cart.items as CartItem[]).find((x) => x.productId === productId)!.qty =
        exist.qty - 1;
    }

    // Update cart in database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as CartItem[]),
      },
    });

    revalidatePath(`/products/${product.slug}`);

    return {
      success: true,
      message: `${product.name} was removed from cart`,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
