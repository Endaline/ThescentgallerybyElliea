import React from "react";
import AdminDashboard from "./_components/dashboard";
import { getOrderSummary } from "@/app/actions/order.actions";

const page = async () => {
  const summary = await getOrderSummary();
  console.log(summary);
  return <AdminDashboard />;
};

export default page;
