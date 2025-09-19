"use client";

import Link from "next/link";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { GenCart, GenProduct } from "@/lib/types/type";
import { ProductImage } from "@prisma/client";
import AddToCart from "./add-to-cart";

// Mock product data

interface ProductGridProps {
  viewMode: "grid" | "list";
  products: GenProduct[];
  cart: GenCart | undefined;
}

export default function ProductGrid({
  viewMode,
  products,
  cart,
}: ProductGridProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value);
  };
  if (viewMode === "list") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Showing 1 - {products.length} of {products.length} products
          </p>
        </div>
        <div className="space-y-4">
          {products.map((product, index) => {
            const images = product.images as ProductImage[];

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className=" bg-slate-100 border p-4">
                  {/* <div className="p-4 border"> */}
                  <div className="flex items-center md:gap-10 gap-2  ">
                    {/* Product Image - Left */}
                    <div className="flex-shrink-0">
                      <Link href={`/products/${product.slug}`}>
                        <Image
                          width={120}
                          height={120}
                          src={images[0].url || "/placeholder.svg"}
                          alt={product.name}
                          className="md:w-30 md:h-30 w-20 h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    </div>
                    <div className="flex w-full flex-col md:flex-row items-start md:items-start justify-between gap-4">
                      {/* Product Details - Left */}
                      <div className="flex-1">
                        <Link href={`/products/${product.slug}`}>
                          <h3 className="font-semibold text-lg text-gray-900 hover:text-[#770a10] mb-2">
                            {product.name}
                          </h3>
                        </Link>

                        {/* <div className="flex md:flex-row flex-col items-center gap-2 mb-1">
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

                        <div className="flex md:flex-row flex-col items-center gap-2 mb-1">
                          <span className="font-bold text-lg text-gray-900">
                            {product.hasVariants ? "From " : ""}
                            {formatCurrency(product.price)}
                          </span>

                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatCurrency(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons - Right */}
                      <div className="flex flex-col gap-2 md:w-40">
                        <AddToCart
                          item={{
                            productId: product.id,
                            name: product.name,
                            slug: product.slug,
                            price: product.price,
                            qty: 1,
                            image: images![0].url,
                          }}
                          cart={cart}
                        />
                        <Link href={`/products/${product.slug}`}>
                          <Button
                            variant="outline"
                            className="w-full border-gray-300 text-gray-700 hover:border-[#770a10] bg-transparent cursor-pointer"
                          >
                            Quick view
                          </Button>
                        </Link>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
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
        <p className="text-gray-600">{products.length} products found</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3  p-2">
        {products.map((product, index) => {
          const images = product.images as ProductImage[];
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div
                key={product.id}
                className="group overflow-hidden bg-slate-100 hover:shadow-lg duration-300 rounded-lg border border-gray-200 m-2"
                // 👆 added margin so borders won’t touch
              >
                <Link href={`/products/${product.slug}`}>
                  <div className="flex items-center justify-center gap-y-4 p-4">
                    <Image
                      width={300}
                      height={300}
                      src={images[0].url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-30 h-40 object-cover group-hover:scale-105 transition-transform duration-300 rounded-md"
                    />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <div>
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="text-sm font-medium text-gray-900 leading-tight">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex md:flex-row flex-col items-center md:space-x-2 space-x-0">
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 mt-2">
                      <AddToCart
                        item={{
                          productId: product.id,
                          name: product.name,
                          slug: product.slug,
                          price: product.price,
                          qty: 1,
                          image: images![0].url,
                        }}
                        cart={cart}
                      />
                      <Link href={`/products/${product.slug}`}>
                        <Button
                          variant="outline"
                          className="w-full border-gray-300 text-gray-700 hover:border-[#770a10] bg-transparent cursor-pointer rounded-md"
                        >
                          Quick view
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
