import React from "react";
import CartComp from "./_components/cart";
import { getMyCart } from "@/app/actions/cart.actions";
import { getAllShippingInfo } from "@/app/actions/shipping.action";

export default async function page() {
  const cart = await getMyCart();
  const { data } = await getAllShippingInfo();
  return <CartComp cart={cart} shippingInfo={data} />;
}
