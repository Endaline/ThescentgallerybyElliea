import React from "react";
import ProductViewPage from "../../_component/product-view";
import { getProductBySlug } from "@/app/actions/product.action";
import { notFound } from "next/navigation";

export default async function page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return <ProductViewPage product={product} />;
}
