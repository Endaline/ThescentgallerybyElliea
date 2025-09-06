import React from "react";
import { getMyCart } from "@/app/actions/cart.actions";
import { auth } from "@/services/auth";
import { getUserById } from "@/app/actions/user.actions";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import CheckoutComp from "./_components";

const page = async () => {
  const cart = await getMyCart();

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const user = await getUserById(userId);

  if (!cart || cart.items.length === 0) redirect("/cart");

  const userInfo = user as User;

  return <CheckoutComp cart={cart} userInfo={userInfo} />;
};

export default page;
