import { getProductBySlug } from "@/app/actions/product.action";
import { requireAdmin } from "@/services/auth-guard";
import React from "react";
import ProductViewPage from "../../_component/product-view";

const page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const product = await getProductBySlug(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  await requireAdmin();
  return <ProductViewPage product={product} />;
};

export default page;
