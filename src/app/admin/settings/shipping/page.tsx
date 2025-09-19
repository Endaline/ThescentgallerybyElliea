import React from "react";
import Shipping from "../_components/shipping";
import { getAllShippingInfo } from "@/app/actions/shipping.action";
import { requireAdmin } from "@/services/auth-guard";

const page = async () => {
  const { data } = await getAllShippingInfo();

  await requireAdmin();

  return <Shipping info={data} />;
};

export default page;
