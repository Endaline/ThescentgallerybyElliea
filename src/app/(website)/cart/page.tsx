import React from "react";
import CartComp from "./_components/cart";
import { getMyCart } from "@/app/actions/cart.actions";

export default async function page() {
  const cart = await getMyCart();
  return <CartComp cart={cart} />;
}
