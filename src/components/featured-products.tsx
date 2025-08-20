"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const featuredProducts = [
  {
    id: 1,
    name: "Midnight Rose",
    brand: "Luxe Parfum",
    price: 189,
    originalPrice: 220,
    image: "/images/pef-1.jpeg",
  },
  {
    id: 2,
    name: "Golden Amber",
    brand: "Luxe Parfum",
    price: 165,
    image: "/images/pef-2.jpeg",
  },
  {
    id: 3,
    name: "Ocean Breeze",
    brand: "Luxe Parfum",
    price: 145,
    image: "/images/pef-4.jpeg",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl font-bold text-purple-900 mb-4">
            Featured Fragrances
          </h2>
          <p className="text-lg text-purple-700 max-w-2xl mx-auto">
            Discover our most beloved scents, carefully selected for their
            exceptional quality and timeless appeal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 shadow-xl bg-gradient-to-br from-purple-200 to-purple-300 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardContent className="p-0">
                  {/* <div className="relative overflow-hidden rounded-t-3xl"> */}
                  {/* <div className="bg-gradient-to-br from-purple-300 to-purple-400 p-8 h-64 flex items-center justify-center"> */}
                  {/* <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-white rounded-2xl shadow-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-500"> */}
                  <Image
                    width={100}
                    height={100}
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-80 object-cover rounded-xl"
                  />
                  {/* </div> */}
                  {/* </div> */}
                  {/* </div> */}

                  <div className="p-6 space-y-4 bg-gradient-to-br from-purple-200 to-purple-300">
                    <div className="text-center">
                      <h3 className="font-serif text-xl font-semibold text-purple-900 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-purple-700 mb-3">
                        {product.brand}
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="font-bold text-2xl text-yellow-600">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-purple-600 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white px-8 py-3 bg-white/50 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
