"use client";

import { useParams } from "next/navigation";
import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Package,
  Truck,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Mock order detail data
const orderDetail = {
  id: "LX001234",
  customer: {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  items: [
    {
      id: 1,
      name: "Midnight Rose",
      brand: "Luxe Parfum",
      size: "50ml",
      quantity: 2,
      price: 189,
      image: "/images/pef-1.jpeg",
    },
    {
      id: 2,
      name: "Golden Amber",
      brand: "Luxe Parfum",
      size: "100ml",
      quantity: 1,
      price: 165,
      image: "/images/pef-2.jpeg",
    },
  ],
  subtotal: 543,
  shipping: 0,
  tax: 43.44,
  total: 586.44,
  status: "processing",
  paymentStatus: "paid",
  paymentMethod: "Credit Card (**** 4242)",
  shippingMethod: "Standard Shipping",
  orderDate: "2024-01-15T10:30:00",
  estimatedDelivery: "2024-01-22",
  shippingAddress: {
    name: "Sarah Johnson",
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  },
  billingAddress: {
    name: "Sarah Johnson",
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  },
  orderHistory: [
    {
      status: "Order Placed",
      date: "2024-01-15T10:30:00",
      description: "Order has been placed and payment confirmed",
    },
    {
      status: "Processing",
      date: "2024-01-15T14:20:00",
      description: "Order is being prepared for shipment",
    },
  ],
};

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AdminLayout>
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
                Order {orderDetail.id}
              </h1>
              <p className="text-gray-600 mt-1">
                Placed on {formatDate(orderDetail.orderDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge className={getStatusColor(orderDetail.status)}>
              {orderDetail.status.charAt(0).toUpperCase() +
                orderDetail.status.slice(1)}
            </Badge>
            <Select defaultValue={orderDetail.status}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-[#A76BCF] hover:bg-[#A76BCF]/90 text-white">
              Update Status
            </Button>
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
                    {orderDetail.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 border rounded-lg"
                      >
                        <Image
                          width={1000}
                          height={1000}
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            {item.brand} • {item.size}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            ${item.price} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${orderDetail.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {orderDetail.shipping === 0
                          ? "Free"
                          : `$${orderDetail.shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${orderDetail.tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${orderDetail.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Order History */}
            <motion.div
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
            </motion.div>
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
                      src={orderDetail.customer.avatar || "/placeholder.svg"}
                      alt={orderDetail.customer.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{orderDetail.customer.name}</p>
                      <p className="text-sm text-gray-600">Customer</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        {orderDetail.customer.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        {orderDetail.customer.phone}
                      </span>
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
                    <Badge
                      className={getPaymentStatusColor(
                        orderDetail.paymentStatus
                      )}
                    >
                      {orderDetail.paymentStatus.charAt(0).toUpperCase() +
                        orderDetail.paymentStatus.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Method</span>
                    <span className="text-sm">{orderDetail.paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total</span>
                    <span className="font-medium">
                      ${orderDetail.total.toFixed(2)}
                    </span>
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
                  <div>
                    <p className="font-medium mb-2">Method</p>
                    <p className="text-sm text-gray-600">
                      {orderDetail.shippingMethod}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium mb-2">Estimated Delivery</p>
                    <p className="text-sm text-gray-600">
                      {new Date(
                        orderDetail.estimatedDelivery
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Shipping Address
                    </p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{orderDetail.shippingAddress.name}</p>
                      <p>{orderDetail.shippingAddress.street}</p>
                      <p>
                        {orderDetail.shippingAddress.city},{" "}
                        {orderDetail.shippingAddress.state}{" "}
                        {orderDetail.shippingAddress.zipCode}
                      </p>
                      <p>{orderDetail.shippingAddress.country}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
