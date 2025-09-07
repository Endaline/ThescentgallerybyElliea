"use server";

import { getAllBrand } from "@/app/actions/brand.action";
import AddProduct from "../_component/add-product";
import { requireAdmin } from "@/services/auth-guard";

export default async function NewProductPage() {
  const brandList = (await getAllBrand()).data;

  await requireAdmin();

  return <AddProduct brandList={brandList} />;
}
