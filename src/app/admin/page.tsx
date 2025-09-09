import React from "react";
import AdminDashboard from "./_components/dashboard";
import { getOrderSummary } from "@/app/actions/order.actions";
import { requireAdmin } from "@/services/auth-guard";

const page = async () => {
  const summary = await getOrderSummary();
  console.log(summary);
  await requireAdmin();
  return <AdminDashboard />;
};

export default page;
