"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Package,
  Truck,
  CreditCard,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GenOrder } from "@/lib/types/type";
import { formatDateTime } from "@/lib/utils";
import { useTransition } from "react";
import {
  deliverOrder,
  updateOrderToPaidCOD,
} from "@/app/actions/order.actions";
import { toast } from "sonner";

export default function OrderDetailPage({
  order,
}: {
  order: Omit<GenOrder, "paymentResult">;
}) {
  const {
    id,
    shippingAddress,
    orderitems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isDelivered,
    isPaid,
    paidAt,
    deliveredAt,
    createdAt,
  } = order;

  const orderStatus = isDelivered ? "delivered" : "pending";
  const paymentStatus = isPaid ? "paid" : "pending";

  // Button to mark order as paid
  const MarkAsPaidButton = () => {
    const [isPending, startTransition] = useTransition();

    return (
      <Button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToPaidCOD(order.id);
            toast(res.message);
          })
        }
      >
        {isPending ? "processing..." : "Mark As Paid"}
      </Button>
    );
  };

  const MarkAsDeliveredButton = () => {
    const [isPending, startTransition] = useTransition();

    return (
      <Button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await deliverOrder(order.id);
            toast(res.message);
          })
        }
      >
        {isPending ? "processing..." : "Mark As Delivered"}
      </Button>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Link href="/admin/orders">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Order {id}
            </h1>
            <p className="text-gray-600 mt-1">
              Placed on {formatDateTime(createdAt).dateTime}
            </p>
            {isDelivered && (
              <p className="text-gray-600 mt-1">
                Delivered on {formatDateTime(deliveredAt!).dateTime}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge className={getStatusColor(orderStatus)}>
            {isDelivered ? "Delivered" : "Pending"}
          </Badge>
          {isPaid && !isDelivered && <MarkAsDeliveredButton />}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-[#A76BCF]" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderitems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <Image
                        width={1000}
                        height={1000}
                        src={item.imageId || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        {/* <p className="text-sm text-gray-600">
                          {item.brand} • {item.size}
                        </p> */}
                        <p className="text-sm text-gray-600">
                          Quantity: {item.qty}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ₦{(item.price * item.qty).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          ₦{item.price} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₦{itemsPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shippingPrice === 0
                        ? "Free"
                        : `₦${shippingPrice.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₦{taxPrice.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₦{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order History */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#A76BCF]" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderDetail.orderHistory.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-2 h-2 bg-[#A76BCF] rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-gray-600">
                          {event.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(event.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div> */}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Image
                    width={1000}
                    height={1000}
                    src={order.user.image || "/placeholder.svg"}
                    alt={order.user.name || "User Name"}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{order.user.name}</p>
                    <p className="text-sm text-gray-600">Customer</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{order.user.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{order.user.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-[#A76BCF]" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Status</span>
                  <Badge className={getPaymentStatusColor(paymentStatus)}>
                    {paymentStatus.charAt(0).toUpperCase() +
                      paymentStatus.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Method</span>
                  <span className="text-sm">{paymentMethod}</span>
                </div>
                {isPaid && (
                  <p className="text-gray-600 mt-1">
                    Paid on {formatDateTime(paidAt!).dateTime}
                  </p>
                )}
                {!isPaid && <MarkAsPaidButton />}
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span className="font-medium">₦{totalPrice.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Shipping Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-[#A76BCF]" />
                  Shipping
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* <div>
                  <p className="font-medium mb-2">Method</p>
                  <p className="text-sm text-gray-600">
                    {orderDetail.shippingMethod}
                  </p>
                </div> */}

                {/* <div>
                  <p className="font-medium mb-2">Estimated Delivery</p>
                  <p className="text-sm text-gray-600">
                    {new Date(orderDetail.estimatedDelivery).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div> */}

                <div>
                  <p className="font-medium mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Shipping Address
                  </p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{shippingAddress.streetAddress}</p>
                    <p>{shippingAddress.city}</p>
                    <p>
                      {shippingAddress.lga},{" "}
                      {/* {shippingAddress.state}{" "} */}
                      {shippingAddress.postalCode}
                    </p>
                    <p>{shippingAddress.country}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
