"use client";

import { createOrder } from "@/app/actions/order.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { CartItem, ShippingAddressSchema } from "@/lib/validators";
import { Cart, User } from "@prisma/client";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRightCircleIcon, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import Image from "next/image";

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: unknown) => { openIframe: () => void };
    };
  }
}

type PaymentMethod = "paymentOnDelivery" | "paystack";

interface FormData {
  email: string;
  name: string;
  address: ShippingAddressSchema;
  paymentMethod: PaymentMethod;
  phone: string;
}

const CheckoutComp = ({
  cart,
  userInfo,
}: {
  cart: Cart | undefined;
  userInfo: User;
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: userInfo.email || "",
    name: userInfo.name || "",
    address: (userInfo.address as ShippingAddressSchema) || {
      streetAddress: "",
      city: "",
      lga: "",
      postalCode: "",
      country: "",
    },
    paymentMethod: "paystack",
    phone: userInfo.phone || "",
  });
  const router = useRouter();

  const [paystackReady, setPaystackReady] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleScriptLoad = () => {
    setPaystackReady(true);
  };

  const handlePaymentSuccess = async (
    response: { reference: string },
    orderId: string
  ) => {
    startTransition(() => {
      router.push(
        `order-confirmation/${orderId}/paystack-payment-success?reference=${response.reference}&cartId=${cart?.id}`
      );
    });
    // Send reference to your backend to verify & activate subscription
  };

  const getPaystackConfig = (orderId: string) => {
    return {
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: formData.email,
      amount: Number(cart?.totalPrice.toFixed()),
      currency: "NGN",
      ref: `sub_${new Date().getTime()}`,
      metadata: {
        plan: "Online Payment",
        id: orderId,
      },
      callback: (response: { reference: string }) =>
        handlePaymentSuccess(response, orderId),
      onClose: () => {
        console.log("Payment window closed");
        setLoading(false); //
      },
    };
  };

  const handleSubscribe = (orderId: string) => {
    if (!paystackReady || !window.PaystackPop) {
      toast.error("Payment system is not ready yet. Please try again.");
      return;
    }

    const config = getPaystackConfig(orderId);
    if (!config) return;

    const handler = window.PaystackPop.setup(config);
    handler.openIframe();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => {
      if (field.startsWith("address.")) {
        const key = field.split(".")[1] as keyof typeof prev.address;
        return {
          ...prev,
          address: {
            ...prev.address,
            [key]: value,
          },
        };
      }

      return { ...prev, [field]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    startTransition(async () => {
      // 1. Create order in your DB
      const res = await createOrder({
        data: formData,
      });

      if (!res.success || !res.id) {
        toast.error(res.message ?? "Could not create order");
        setLoading(false);
        return;
      }

      if (formData.paymentMethod === "paystack") {
        try {
          // 2. Call your Paystack service endpoint (server action or /api/paystack/initialize)
          const response = await fetch("/api/paystack/initialize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: res.id,
              email: formData.email,
              amount: cart?.totalPrice,
            }),
          });

          const { authorizationUrl } = await response.json();

          if (!authorizationUrl) {
            toast.error("Failed to start Paystack payment");
            setLoading(false);
            return;
          }

          // 3. Redirect user to Paystack checkout page
          window.location.href = authorizationUrl;
        } catch (err) {
          console.error(err);
          toast.error("Payment initialization failed");
          setLoading(false);
        }
      } else {
        // payment on delivery → direct confirm page
        router.push(`/order-confirmation/${res.id}`);
      }
    });
  };
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-charcoal hover:text-[#770a10]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-serif text-4xl font-bold text-charcoal">
              Checkout
            </h1>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <div>
                    <div className="flex items-center my-4">
                      <span className=" font-bold text-xl">
                        Contact Information
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="my-2">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="name" className="pb-2">
                        First Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="pb-2">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address.streetAddress" className="pb-2">
                        Address
                      </Label>
                      <Input
                        id="address"
                        value={formData.address.streetAddress}
                        onChange={(e) =>
                          handleInputChange(
                            "address.streetAddress",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="pb-2">
                          City
                        </Label>
                        <Input
                          id="city"
                          value={formData.address.city}
                          onChange={(e) =>
                            handleInputChange("address.city", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="pb-2">
                          State
                        </Label>
                        <Input
                          id="state"
                          value={formData.address.lga}
                          onChange={(e) =>
                            handleInputChange("address.lga", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="zipCode" className="pb-2">
                        ZIP Code
                      </Label>
                      <Input
                        id="zipCode"
                        value={formData.address.postalCode}
                        onChange={(e) =>
                          handleInputChange(
                            "address.postalCode",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="flex justify-between">
                <>
                  <Script
                    src="https://js.paystack.co/v1/inline.js"
                    strategy="lazyOnload"
                    onLoad={handleScriptLoad}
                  />

                  <div className="space-x-4 mt-4">
                    <Button
                      type="submit"
                      disabled={
                        (formData.paymentMethod === "paystack" &&
                          !paystackReady) ||
                        isPending
                      }
                      className="bg-[#770a10] hover:bg-[#770a10]/90 text-white ml-auto"
                      size="lg"
                    >
                      Place Order
                      {isPending || loading ?
                        <Loader className="w-4 h-4 animate-spin" />
                      : <ArrowRightCircleIcon />}
                    </Button>
                  </div>
                </>
              </div>
            </form>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="sticky top-8">
              <div>
                <span>Order Summary</span>
              </div>
              <div className="space-y-4">
                {(cart?.items as CartItem[]).map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        height={5000}
                        width={5000}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ₦{(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(cart?.itemsPrice ?? 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{formatCurrency(cart?.shippingPrice ?? 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>{formatCurrency(cart?.taxPrice ?? 0)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(cart?.totalPrice ?? 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutComp;
