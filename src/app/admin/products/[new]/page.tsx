"use server";

import { getAllBrand } from "@/app/actions/brand.action";
import AddProduct from "../_component/add-product";

export default async function NewProductPage() {
  const brandList = (await getAllBrand()).data;

  return <AddProduct brandList={brandList} />;
}
