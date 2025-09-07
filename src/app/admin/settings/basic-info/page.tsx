import React from "react";
import BasicInfo from "../_components/basic-info";
import { getAllCompanyInfo } from "@/app/actions/companyInfo.action";
import { requireAdmin } from "@/services/auth-guard";

const page = async () => {
  const { data } = await getAllCompanyInfo();
  await requireAdmin();

  return <BasicInfo info={data} />;
};

export default page;
