import { getProductBySlug } from "@/app/actions/product.action";
import { notFound } from "next/navigation";
import ProductDetailPage from "../_components/product-detail";
import { getMyCart } from "@/app/actions/cart.actions";

export const dynamic = "force-dynamic";

export default async function page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const cart = await getMyCart();
  const existItem = cart?.items.find((x) => x.productId === product.id);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-content padding-x lg:py-20 md:py-12 py-8">
        <ProductDetailPage
          product={product}
          cart={cart}
          existItem={existItem}
        />
      </div>
    </main>
  );
}
