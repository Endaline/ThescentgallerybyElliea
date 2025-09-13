"use client";

import { CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "./ui/input";
import { Product, ProductImage } from "@prisma/client";
import AddToCart from "@/app/(website)/products/_components/add-to-cart";
import { GenCart } from "@/lib/types/type";
import { Search, SearchIcon } from "lucide-react";

const FeaturedProducts = ({
  products,
  cart,
  query,
}: {
  products: Product[];
  query?: string;
  cart: GenCart | undefined;
}) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-content padding-x">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked fragrances that define luxury and elegance
          </p>
        </div>

        {/* 🔎 Search Input */}
        <form
          action="/products"
          method="GET"
          className=" flex justify-center mb-10 w-full"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 h-5 w-5" />
          <div className="relative max-w-md w-full">
            <Input
              defaultValue={query ?? ""}
              name="query"
              type="text"
              placeholder="Search Product..."
              className="max-w-md"
            />
            <Button className="bg-[#A76BCF] absolute top-0 right-0">
              <SearchIcon />
            </Button>
          </div>
        </form>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => {
              const images = product.images as ProductImage[];
              return (
                <div
                  key={product.id}
                  className="group overflow-hidden bg-white hover:shadow-lg duration-300"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative overflow-hidden bg-gray-50">
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
                            className="w-full border-gray-300 text-gray-700 hover:border-[#512260] bg-transparent cursor-pointer"
                          >
                            Quick view
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </div>
              );
            })
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer border-[#512260] text-[#512260] hover:bg-[#512260] hover:text-white"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
