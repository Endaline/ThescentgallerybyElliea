import { getOrderById } from "@/app/actions/order.actions";
import { notFound } from "next/navigation";
import React from "react";
import OrderDetailPage from "../_components/order-detail";
import { ShippingAddressSchema } from "@/lib/validators";
import { requireAdmin } from "@/services/auth-guard";

const page = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;

  const order = await getOrderById(id);
  if (!order) notFound();

  await requireAdmin();
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
