"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/footer";

// Mock product data - in real app, this would come from API
const productData = {
  1: {
    id: 1,
    name: "Midnight Rose",
    brand: "Luxe Parfum",
    price: 189,
    originalPrice: 220,
    images: ["/images/pef-1.jpeg", "/images/pef-2.jpeg", "/images/pef-3.jpeg"],
    description:
      "A captivating blend of midnight roses and vanilla that creates an enchanting and mysterious aura. This sophisticated fragrance opens with fresh rose petals, develops into a heart of deep crimson roses, and settles into a warm base of vanilla and musk.",
    // notes: {
    //   top: ["Rose Petals", "Bergamot", "Pink Pepper"],
    //   middle: ["Crimson Rose", "Jasmine", "Peony"],
    //   base: ["Vanilla", "Musk", "Sandalwood"],
    // },
    // details: {
    //   concentration: "Eau de Parfum",
    //   volume: "50ml / 100ml",
    //   longevity: "8-10 hours",
    //   sillage: "Moderate to Strong",
    // },
    size: "100ml",
    inStock: true,
    stockCount: 15,
  },
  2: {
    id: 2,
    name: "Midnight Rose",
    brand: "Luxe Parfum",
    price: 189,
    originalPrice: 220,
    images: ["/images/pef-2.jpeg", "/images/pef-4.jpeg", "/images/pef-3.jpeg"],
    description:
      "A captivating blend of midnight roses and vanilla that creates an enchanting and mysterious aura. This sophisticated fragrance opens with fresh rose petals, develops into a heart of deep crimson roses, and settles into a warm base of vanilla and musk.",
    // notes: {
    //   top: ["Rose Petals", "Bergamot", "Pink Pepper"],
    //   middle: ["Crimson Rose", "Jasmine", "Peony"],
    //   base: ["Vanilla", "Musk", "Sandalwood"],
    // },
    // details: {
    //   concentration: "Eau de Parfum",
    //   volume: "50ml / 100ml",
    //   longevity: "8-10 hours",
    //   sillage: "Moderate to Strong",
    // },
    size: "50ml",
    inStock: true,
    stockCount: 15,
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number.parseInt(params.id as string);
  const product = productData[productId as keyof typeof productData];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="relative">
              <Image
                width={1000}
                height={1000}
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>

            <div className="flex gap-4 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-[#9b59b6]"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    width={1000}
                    height={1000}
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <p className="text-[#9b59b6] font-medium text-sm uppercase tracking-wide mb-2">
                {product.brand}
              </p>
              <h1 className="font-serif text-4xl font-bold text-charcoal mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="font-bold text-3xl text-charcoal">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Save ${product.originalPrice - product.price}
                  </Badge>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
              <div className="flex">
                <h3 className="font-semibold text-charcoal">Size--</h3>
                <p>{product.size}</p>
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="font-semibold text-charcoal">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setQuantity(Math.min(product.stockCount, quantity + 1))
                  }
                  disabled={quantity >= product.stockCount}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-500 ml-4">
                  {product.stockCount} in stock
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1 border border-[#9b59b6] hover:bg-[#9b59b6]/90 bg-white hover:text-white text-[#512260] h-12 cursor-pointer"
                disabled={!product.inStock}
              >
                Add to Cart
              </Button>
              <Button
                size="lg"
                className="flex-1 bg-[#9b59b6] hover:border-[#9b59b6] border hover:text-slate-700 hover:bg-white text-white h-12 cursor-pointer"
                disabled={!product.inStock}
              >
                Buy it now
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-6 w-6 text-[#9b59b6] mx-auto mb-2" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-500">On orders over $100</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-[#9b59b6] mx-auto mb-2" />
                <p className="text-sm font-medium">Authentic</p>
                <p className="text-xs text-gray-500">100% genuine</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 text-[#9b59b6] mx-auto mb-2" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-500">10-day policy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
