import FeaturedProducts from "@/components/featured-products";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import Navigation from "@/components/navigation";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturedProducts />
      <Footer />
    </main>
  );
}
