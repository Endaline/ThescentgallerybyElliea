"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { GenProduct } from "@/lib/types/type";
import { ProductImage } from "@prisma/client";

// Mock product data

interface ProductGridProps {
  viewMode: "grid" | "list";
  searchQuery: string;
  filters: {
    priceRange: string;
    brand: string;
  };
  products: GenProduct[];
}

export default function ProductGrid({
  viewMode,
  searchQuery,
  filters,
  products,
}: ProductGridProps) {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.brand.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category filter

      // Brand filter
      if (filters.brand && product.brand.name !== filters.brand) {
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
          {filteredProducts.map((product, index) => {
            const images = product.images as ProductImage[];

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="hover:shadow-lg transition-shadow bg-slate-100">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      {/* Product Image - Left */}
                      <div className="flex-shrink-0">
                        <Link href={`/products/${product.id}`}>
                          <Image
                            width={120}
                            height={120}
                            src={images[0].url || "/placeholder.svg"}
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
                        {/* <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-lg text-gray-900">
                            {product.hasVariants ? "From " : ""}₦
                            {product.price.toLocaleString()}.00
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ₦{product.originalPrice.toLocaleString()}.00
                            </span>
                          )}
                        </div> */}
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
            );
          })}
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
        {filteredProducts.map((product, index) => {
          const images = product.images as ProductImage[];
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card
                key={product.id}
                className="group overflow-hidden border border-gray-200 bg-slate-100 hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative overflow-hidden bg-slate-100">
                    <Image
                      width={300}
                      height={300}
                      src={images[0].url || "/placeholder.svg"}
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
          );
        })}
      </div>
    </div>
  );
}
