import { getAllUsers } from "@/app/actions/user.actions";
import React from "react";
import CustomersPage from "./_components/customers";
import { requireAdmin } from "@/services/auth-guard";

const page = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
  }>;
}) => {
  const { page = "1", query: searchText } = await props.searchParams;

  const users = await getAllUsers({ page: Number(page), query: searchText });
  console.log("users", users);

  await requireAdmin();
  return <CustomersPage />;
};

export default page;
