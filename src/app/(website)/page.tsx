import FeaturedProducts from "@/components/featured-products";
import HeroSection from "@/components/hero-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
    </main>
  );
}
