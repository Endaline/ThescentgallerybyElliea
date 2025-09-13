import FeaturedProducts from "@/components/featured-products";
import HeroSection from "@/components/hero-section";
import { getAllFeaturedProducts } from "@/app/actions/product.action";
import { getMyCart } from "../actions/cart.actions";

export async function generateMetadata(props: {
  searchParams: Promise<{
    query: string;
  }>;
}) {
  const { query = "all" } = await props.searchParams;

  const isQuerySet = query && query !== "all" && query.trim() !== "";

  if (isQuerySet) {
    return {
      title: `Search ${query}`,
    };
  } else {
    return {
      title: "Our Products",
    };
  }
}

export default async function HomePage(props: {
  searchParams: Promise<{
    query: string;
  }>;
}) {
  const { query = "all" } = await props.searchParams;

  const featuredProducts = await getAllFeaturedProducts({ query });
  const cart = await getMyCart();
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedProducts products={featuredProducts} cart={cart} />
    </main>
  );
}
