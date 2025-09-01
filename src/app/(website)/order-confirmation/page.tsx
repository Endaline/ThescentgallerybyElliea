"use client";

import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package, Truck, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const orderNumber =
    "LX" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-12 w-12 text-green-600" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-serif text-4xl font-bold text-charcoal mb-4"
            >
              Order Confirmed!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-gray-600 mb-2"
            >
              Thank you for your purchase. Your order has been received and is
              being processed.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-[#A76BCF] font-medium"
            >
              Order #{orderNumber}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <Card>
              <CardContent className="p-6 text-center">
                <Package className="h-8 w-8 text-[#A76BCF] mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Order Processing</h3>
                <p className="text-sm text-gray-600">
                  Your order is being prepared for shipment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="h-8 w-8 text-[#A76BCF] mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Estimated Delivery</h3>
                <p className="text-sm text-gray-600">{estimatedDelivery}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-[#A76BCF] mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Confirmation</h3>
                <p className="text-sm text-gray-600">
                  Sent to your email address
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#A76BCF] text-[#A76BCF] hover:bg-[#A76BCF] hover:text-white bg-transparent"
                >
                  Continue Shopping
                </Button>
              </Link>
              <Button
                size="lg"
                className="bg-[#A76BCF] hover:bg-[#A76BCF]/90 text-white"
              >
                Track Your Order
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-8">
              Questions about your order? Contact our customer service team at{" "}
              <a
                href="mailto:support@luxeparfum.com"
                className="text-[#A76BCF] hover:underline"
              >
                support@luxeparfum.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
