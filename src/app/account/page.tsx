import React from "react";
import { auth } from "@/services/auth";
import { GenOrder } from "@/lib/types/type";
import { getMyOrders } from "@/app/actions/order.actions";
import OrdersList from "./order/_components/orders-list";

const page = async (props: {
  searchParams: Promise<{
    page: string;
    name: string;
    category: string;
  }>;
}) => {
  const session = await auth();
  const userId = session?.user?.id;

  const searchParams = await props.searchParams;

  if (!userId) throw new Error("User not found");

  const orders: GenOrder[] = (
    await getMyOrders({ page: Number(searchParams.page ?? 1) })
  ).data;
  return (
    <div>
      <OrdersList data={orders} query={searchParams.name} />
    </div>
  );
};

export default page;
