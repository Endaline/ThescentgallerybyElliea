"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

// Mock product data
const products = [
  {
    id: 1,
    name: "Midnight Rose",
    brand: "Luxe Parfum",
    price: 189,
    originalPrice: 220,
    image: "/images/pef-1.jpeg",
    category: "Floral",
    description: "A captivating blend of midnight roses and vanilla",
  },
  {
    id: 2,
    name: "Golden Amber",
    brand: "Luxe Parfum",
    price: 165,
    rating: 4.9,
    reviews: 89,
    image: "/images/pef-2.jpeg",
    category: "Oriental",
    description: "Warm amber with hints of sandalwood and musk",
  },
  {
    id: 3,
    name: "Ocean Breeze",
    brand: "Luxe Parfum",
    price: 145,
    image: "/images/pef-3.jpeg",
    category: "Fresh",
    description: "Fresh oceanic scent with citrus top notes",
  },
  {
    id: 4,
    name: "Velvet Orchid",
    brand: "Essence Elite",
    price: 210,
    image: "/images/pef-4.jpeg",
    category: "Floral",
    description: "Luxurious orchid with deep woody undertones",
  },
  {
    id: 5,
    name: "Spiced Cedar",
    brand: "Royal Scents",
    price: 175,
    image: "/images/pef-1.jpeg",
    category: "Woody",
    description: "Rich cedar wood with exotic spices",
  },
  {
    id: 6,
    name: "Citrus Burst",
    brand: "Premium Fragrances",
    price: 125,
    image: "/images/pef-2.jpeg",
    category: "Citrus",
    description: "Energizing blend of citrus fruits and herbs",
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
            {filteredProducts.length} products found
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
                  <div className="flex justify-between items-center gap-6">
                    <div className="flex flex-col items-start  ">
                      <div>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-serif text-xl font-semibold text-charcoal hover:text-[#A76BCF]">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-gray-600 mt-1">
                          {product.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xl text-charcoal">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="relative overflow-hidden">
                        <Link href={`/products/${product.id}`}>
                          <Image
                            width={1000}
                            height={1000}
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-40 h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                      </div>
                      <Button className="bg-[#A76BCF] hover:bg-[#A76BCF]/90 text-white cursor-pointer">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
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
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      width={1000}
                      height={1000}
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      {product.brand}
                    </p>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-serif text-xl font-semibold text-charcoal mb-2 hover:text-[#A76BCF]">
                        {product.name}
                      </h3>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xl text-charcoal">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#A76BCF] hover:bg-[#A76BCF]/90 text-white cursor-pointer"
                    >
                      Add to Cart
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
