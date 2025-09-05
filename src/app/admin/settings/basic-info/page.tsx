import React from "react";
import BasicInfo from "../_components/basic-info";
import { getAllCompanyInfo } from "@/app/actions/companyInfo.action";

const page = async () => {
  const { data } = await getAllCompanyInfo();

  return <BasicInfo info={data} />;
};

export default page;
