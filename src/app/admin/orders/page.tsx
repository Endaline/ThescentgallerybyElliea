import React from "react";
import AdminOrdersPage from "./_components/orders-page";
import { getAllOrders } from "@/app/actions/order.actions";
import { orderCounter } from "@/app/actions/order.actions";
import { requireAdmin } from "@/services/auth-guard";

const page = async (props: {
  searchParams: Promise<{ page: string; user: string }>;
}) => {
  const { page = "1", user: searchText } = await props.searchParams;
  await requireAdmin();

  const [ordersResult, counts] = await Promise.all([
    getAllOrders({
      query: searchText,
      page: Number(page),
    }),
    orderCounter(),
  ]);
  return (
    <AdminOrdersPage
      ordersResult={ordersResult}
      counts={counts.counts}
      currentPage={Number(page)}
      searchText={searchText}
    />
  );
};

export default page;
