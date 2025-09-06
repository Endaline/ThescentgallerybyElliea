"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GenCart } from "@/lib/types/type";
import AddToCart from "../../products/_components/add-to-cart";
import RemoveBtn from "./remove-btn";
import { Shipping } from "@prisma/client";

export default function CartComp({
  cart,
  shippingInfo,
}: {
  cart?: GenCart;
  shippingInfo?: Shipping | null;
}) {
  if (!cart || cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="font-serif text-3xl font-bold text-charcoal mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Discover our luxury fragrances and add them to your cart.
            </p>
            <Link href="/products">
              <Button
                size="lg"
                className="bg-[#512260] hover:bg-[#512260]/90 text-white cursor-pointer"
              >
                Shop Fragrances
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen ">
      <div className="max-content padding-x py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-4xl font-bold text-charcoal mb-8">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item, index) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="bg-slate-100">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="w-24 h-24 flex-shrink-0">
                          <Image
                            width={1000}
                            height={1000}
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              {/* <p className="text-sm text-gray-500">
                                {item.brand}
                              </p> */}
                              <h3 className="font-serif text-lg font-semibold text-charcoal">
                                {item.name}
                              </h3>
                              {/* <p className="text-sm text-gray-600">
                                Size: {item.size}
                              </p> */}
                            </div>
                            <RemoveBtn id={item.productId} />
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <AddToCart item={item} cart={cart} isCartPage />

                            <div className="text-right">
                              {/* <div className="flex items-center gap-2">
                                <span className="font-bold text-lg text-charcoal">
                                  ₦{(item.price * item.quantity).toFixed(2)}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-sm text-gray-500 line-through">
                                    ₦
                                    {(
                                      item.originalPrice * item.quantity
                                    ).toFixed(2)}
                                  </span>
                                )}
                              </div> */}
                              <p className="text-sm text-gray-600">
                                ₦{item.price} each
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="sticky top-8 bg-slate-100">
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-serif text-xl font-semibold text-charcoal">
                    Order Summary
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>
                        Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}
                        items)
                      </span>
                      <span>₦{cart.itemsPrice.toFixed(2)}</span>
                    </div>

                    {/* {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Savings</span>
                        <span>-${savings.toFixed(2)}</span>
                      </div>
                    )}

                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo Code (WELCOME10)</span>
                        <span>-${promoDiscount.toFixed(2)}</span>
                      </div>
                    )} */}

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {shippingInfo?.shippingRate === 0
                          ? "Free"
                          : `₦${shippingInfo?.shippingRate.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>%{shippingInfo?.taxRate.toFixed(2)}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₦{cart.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  {/* {!promoApplied && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          onClick={applyPromoCode}
                          className="border-[#512260] text-[#512260] hover:bg-[#512260] hover:text-white bg-transparent"
                        >
                          Apply
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Try: WELCOME10 for 10% off
                      </p>
                    </div>
                  )} */}

                  <Link href="/checkout" className="block">
                    <Button
                      size="lg"
                      className="w-full bg-[#512260] hover:bg-[#512260]/90 text-white cursor-pointer"
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>

                  {/* <div className="text-center text-sm text-gray-500">
                    <p>Free shipping on orders over ₦100</p>
                    <p>30-day return policy</p>
                  </div> */}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
