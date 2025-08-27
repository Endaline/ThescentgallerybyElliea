"use client";
import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Armaf Club De Nuit Intense Man EDT 105ml",
    price: "₦69,000.00",
    image: "/images/pef-1.jpg",
  },
  {
    id: 2,
    name: "AFNAN 9 Pm For Men EDP 100ML",
    price: "₦56,000.00",
    image: "/images/pef-1.jpeg",
  },
  {
    id: 3,
    name: "FRANCK OLIVIER Oud Touch EDP 100ml",
    price: "₦45,000.00",
    image: "/images/pef-3.jpg",
  },
  {
    id: 4,
    name: "Armaf Club De Nuit Women EDP 105ml",
    price: "₦66,000.00",
    image: "/images/pef-4.jpeg",
  },
  {
    id: 5,
    name: "Armaf Club De Nuit Intense Man Edp 200ml",
    price: "₦102,000.00",
    image: "/images/pef-1.jpg",
  },
  {
    id: 6,
    name: "ELIZABETH ARDEN Beauty Ladies EDP 100ml",
    price: "₦50,000.00",
    originalPrice: "₦55,000.00",
    image: "/images/pef-1.jpeg",
  },
  {
    id: 7,
    name: "Armaf Club De Nuit Intense Woman 105ml",
    price: "₦64,000.00",
    image: "/images/pef-4.jpeg",
  },
  {
    id: 8,
    name: "GIORGIO PINK Special Edition EDP 100ml",
    price: "₦30,000.00",
    image: "/images/pef-3.jpeg",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-content padding-x">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-[">
            Featured Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked fragrances that define luxury and elegance
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6">
          {products.map((product) => (
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
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer border-[#9b59b6] text-[#9b59b6] hover:bg-[#9b59b6] hover:text-white"
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
