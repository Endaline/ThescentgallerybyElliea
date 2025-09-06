import { getOrderById } from "@/app/actions/order.actions";
import { auth } from "@/services/auth";
import { notFound, redirect } from "next/navigation";
import React from "react";
import OrderDetailPage from "../_components/order-detail";
import { GenOrder } from "@/lib/types/type";
import { ShippingAddressSchema } from "@/lib/validators";

const page = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;

  const order = await getOrderById(id);
  if (!order) notFound();

  const session = await auth();

  // Redirect the user if they don't own the order
  // if (session?.user.role !== "admin") {
  //   return redirect("/unauthorized");
  // }
  return (
    <OrderDetailPage
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddressSchema,
      }}
    />
  );
};

export default page;
