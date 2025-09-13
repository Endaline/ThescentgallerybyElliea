/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import AdminOrdersPage from "./_components/orders-page";
import { getAllOrders } from "@/app/actions/order.actions";
import { orderCounter } from "@/app/actions/order.actions";
import { requireAdmin } from "@/services/auth-guard";

// Map API result (GenOrder) to Order type expected by AdminOrdersPage
const mapGenOrdersToOrders = (genOrders: any[]): any[] => {
  return genOrders.map((order) => ({
    ...order,
    // Fix shippingAddress
    shippingAddress: {
      address: order.shippingAddress.streetAddress || "",
      city: order.shippingAddress.city || "",
      postalCode: order.shippingAddress.postalCode || "",
      country: order.shippingAddress.country || "",
    },
    // Fix paymentResult
    paymentResult: order.paymentResult
      ? {
          id: order.paymentResult.id || "",
          status: order.paymentResult.status || "",
          update_time: order.paymentResult.update_time || "",
          email_address: order.paymentResult.email_address || "",
        }
      : null,
  }));
};

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

  // Map GenOrder[] → Order[]
  const mappedOrdersResult = {
    ...ordersResult,
    data: mapGenOrdersToOrders(ordersResult.data),
  };

  return (
    <AdminOrdersPage
      ordersResult={mappedOrdersResult}
      currentPage={Number(page)}
      searchText={searchText}
      counts={counts.counts}
    />
  );
};

export default page;
