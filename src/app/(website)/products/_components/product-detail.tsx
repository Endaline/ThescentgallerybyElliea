"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GenCart, GenProduct } from "@/lib/types/type";
import { ProductImage } from "@prisma/client";
import AddToCart from "./add-to-cart";
import { CartItem } from "@/lib/validators";

export default function ProductDetailPage({
  product,
  cart,
  existItem,
}: {
  product: GenProduct;
  cart: GenCart | undefined;
  existItem: CartItem | undefined;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const images = product.images as ProductImage[];

  return (
    <main className="">
      <div className="max-content padding-x">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 border p-3"
          >
            <div className="relative">
              <Image
                width={1000}
                height={1000}
                src={images[selectedImage].url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg "
              />
            </div>

            <div className="flex gap-4 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-[#770a10]" : (
                      "border-gray-200"
                    )
                  }`}
                >
                  <Image
                    width={1000}
                    height={1000}
                    src={image.url || "/placeholder.svg"}
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
            className="space-y-6 border p-3"
          >
            <div>
              <p className="text-[#770a10] font-medium text-sm uppercase tracking-wide mb-2">
                {product.brand.name}
              </p>
              <h1 className="font-serif text-4xl font-bold text-charcoal mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="font-bold text-3xl text-charcoal">
                  ₦{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ₦{product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Save ₦{product.originalPrice - product.price}
                  </Badge>
                )}
              </div>

              {/* <div className="flex">
                <h3 className="font-semibold text-charcoal">Size--</h3>
                <p>{product.size}</p>
              </div> */}
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="font-semibold text-charcoal">Quantity</h3>
              <div className="flex items-center gap-3">
                {existItem ?
                  <>
                    {" "}
                    <AddToCart item={existItem} cart={cart} />
                  </>
                : <>
                    {" "}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </>
                }
                <span className="text-sm text-gray-500 ml-4">
                  {product.stock} in stock
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            {!existItem && product.stock > 0 && (
              <div className="flex gap-4 pt-4">
                <AddToCart
                  item={{
                    productId: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    qty: quantity,
                    image: images![0].url,
                  }}
                  cart={cart}
                />
                {
                  <AddToCart
                    item={{
                      productId: product.id,
                      name: product.name,
                      slug: product.slug,
                      price: product.price,
                      qty: quantity,
                      image: images![0].url,
                    }}
                    cart={cart}
                    isBuy={true}
                  />
                }
              </div>
            )}

            {/* Features */}
            <div className=" pt-6 border-t">
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Truck className="h-6 w-6 text-[#770a10] mx-auto mb-2" />
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders over $100</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 text-[#770a10] mx-auto mb-2" />
                  <p className="text-sm font-medium">Authentic</p>
                  <p className="text-xs text-gray-500">100% genuine</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-6 w-6 text-[#770a10] mx-auto mb-2" />
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-gray-500">10-day policy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
