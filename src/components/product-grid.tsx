"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

// Mock product data
const products = [
  {
    id: 1,
    name: "Armaf Club De Nuit Intense Man EDT 105ml",
    brand: "Armaf",
    price: 69000,
    originalPrice: null,
    image: "/images/pef-1.jpg",
    category: "Oriental",
    description: "Intense masculine fragrance with woody and spicy notes",
    hasVariants: false,
  },
  {
    id: 2,
    name: "AFNAN 9 Pm For Men EDP 100ML",
    brand: "Afnan",
    price: 56000,
    originalPrice: null,
    image: "/images/pef-3.jpeg",
    category: "Oriental",
    description: "Evening fragrance with rich and sophisticated blend",
    hasVariants: false,
  },
  {
    id: 3,
    name: "FRANCK OLIVIER Oud Touch EDP 100ml",
    brand: "Franck Olivier",
    price: 45000,
    originalPrice: null,
    image: "/images/pef-4.jpeg",
    category: "Oud",
    description: "Luxurious oud fragrance with oriental touches",
    hasVariants: false,
  },
  {
    id: 4,
    name: "Givenchy Gentleman EDP Boisée",
    brand: "Givenchy",
    price: 217000,
    originalPrice: null,
    image: "/images/pef-5.jpeg",
    category: "Woody",
    description: "Sophisticated woody fragrance for the modern gentleman",
    hasVariants: true,
  },
  {
    id: 5,
    name: "JEANNE ARTHES Boum Candy Land Edp 100ml",
    brand: "Jeanne Arthes",
    price: 15000,
    originalPrice: 25000,
    image: "/images/pef-1.jpg",
    category: "Sweet",
    description: "Sweet and playful fragrance with candy notes",
    hasVariants: false,
  },
  {
    id: 6,
    name: "BVLGARI Man In Black Edp",
    brand: "Bvlgari",
    price: 151000,
    originalPrice: 167000,
    image: "/images/pef-3.jpeg",
    category: "Oriental",
    description: "Dark and mysterious fragrance with spicy accords",
    hasVariants: true,
  },
];

interface ProductGridProps {
  viewMode: "grid" | "list";
  searchQuery: string;
  filters: {
    priceRange: string;
    brand: string;
  };
}

export default function ProductGrid({
  viewMode,
  searchQuery,
  filters,
}: ProductGridProps) {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category filter

      // Brand filter
      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const price = product.price;
        switch (filters.priceRange) {
          case "under-100":
            if (price >= 100) return false;
            break;
          case "100-200":
            if (price < 100 || price > 200) return false;
            break;
          case "200-300":
            if (price < 200 || price > 300) return false;
            break;
          case "over-300":
            if (price <= 300) return false;
            break;
        }
      }

      return true;
    });
  }, [searchQuery, filters]);

  if (viewMode === "list") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Showing 1 - {filteredProducts.length} of {filteredProducts.length}{" "}
            products
          </p>
        </div>

        <div className="space-y-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    {/* Product Image - Left */}
                    <div className="flex-shrink-0">
                      <Link href={`/products/${product.id}`}>
                        <Image
                          width={120}
                          height={120}
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-[120px] h-[120px] object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    </div>

                    {/* Product Details - Center */}
                    <div className="flex-1">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-lg text-gray-900 hover:text-[#512260] mb-2">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-lg text-gray-900">
                          {product.hasVariants ? "From " : ""}₦
                          {product.price.toLocaleString()}.00
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₦{product.originalPrice.toLocaleString()}.00
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons - Right */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <Button className="px-6 py-2 min-w-[140px] bg-[#512260] hover:bg-[#512260]/50 text-white cursor-pointer">
                        Add to cart
                      </Button>
                      <Button
                        variant="outline"
                        className="px-6 py-2 min-w-[140px] border-gray-300 text-gray-700 hover:border-[#512260] bg-transparent cursor-pointer"
                      >
                        Quick view
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredProducts.length} products found
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card
              key={product.id}
              className="group overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative overflow-hidden bg-gray-50">
                  <Image
                    width={300}
                    height={300}
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-sm font-medium text-gray-900 leading-tight">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-[#512260] hover:bg-[#512260]/50 text-white cursor-pointer">
                      Add to cart
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700 hover:border-[#512260] bg-transparent cursor-pointer"
                    >
                      Quick view
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
