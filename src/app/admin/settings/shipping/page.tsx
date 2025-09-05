import React from "react";
import Shipping from "../_components/shipping";
import { getAllShippingInfo } from "@/app/actions/shipping.action";

const page = async () => {
  const { data } = await getAllShippingInfo();

  return <Shipping info={data} />;
};

export default page;
