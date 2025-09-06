"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PaymentResult } from "@/lib/types/type";
import { Order } from "@prisma/client";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Mail, Package, Truck } from "lucide-react";
import Link from "next/link";
import React from "react";

const ConfirmationInfo = ({
  order,
  reference,
  paymentResult,
}: {
  order: Order;
  reference: string | undefined;
  paymentResult: PaymentResult;
}) => {
  return (
    <motion.div className="max-w-2xl mx-auto mt-8 md:p-6">
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
          Thank you for your payment. Your order has been confirmed and you will
          receive an email receipt shortly.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-[#A76BCF] font-medium"
        >
          Order #{order.id}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex-between mt-3 text-xs"
        >
          <strong>Payment Reference:</strong> {reference}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex-between mt-3 text-xs"
        >
          <strong>Amount Paid:</strong> ₦{paymentResult.pricePaid}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 flex justify-end space-x-4"
        >
          <Button asChild className="bg-[#A76BCF]">
            <Link href={`/account/order/${order.id}`}>View Order Details</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/account">View All Orders</Link>
          </Button>
        </motion.div>
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
            <p className="text-sm text-gray-600">As soon as possible</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-[#A76BCF] mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Email Confirmation</h3>
            <p className="text-sm text-gray-600">Sent to your email address</p>
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
  );
};

export default ConfirmationInfo;
