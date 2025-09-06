"use server";

import { getAllBrand } from "@/app/actions/brand.action";
import EditProduct from "../_component/edit-product";
import { getProductBySlug } from "@/app/actions/product.action";

export default async function page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const brandList = (await getAllBrand()).data;
  const product = await getProductBySlug(id);

  return <EditProduct product={product} brandList={brandList} />;
}
