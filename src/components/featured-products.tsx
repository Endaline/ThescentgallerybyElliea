"use client";

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
    <section className="py-20 ">
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
          <div className="relative max-w-md w-full">
            <Input
              defaultValue={query ?? ""}
              name="query"
              type="text"
              placeholder="Search Product..."
              className="max-w-md"
            />
            <Button className="bg-[#770a10] absolute top-0 right-0">
              <SearchIcon />
            </Button>
          </div>
        </form>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6">
          {products.length > 0 ?
            products.map((product) => {
              const images = product.images as ProductImage[];
              return (
                <div
                  key={product.id}
                  className="group overflow-hidden  hover:shadow-lg duration-300"
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

                  <div className="p-4">
                    <div className="space-y-3">
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="text-sm font-medium text-gray-900 leading-tight">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          ₦{product.price}
                        </span>
                        ₦
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
                            className="w-full border-gray-300 text-gray-700 hover:border-[#770a10] bg-transparent cursor-pointer"
                          >
                            Quick view
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          }
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer border-[#770a10] text-[#770a10] hover:bg-[#770a10] hover:text-white"
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
