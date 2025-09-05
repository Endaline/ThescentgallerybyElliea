"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Truck,
  Package,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

// Mock order data
const orders = [
  {
    id: "LX001234",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    items: [
      { name: "Midnight Rose", quantity: 2, price: 189 },
      { name: "Golden Amber", quantity: 1, price: 165 },
    ],
    total: 543,
    status: "processing",
    paymentStatus: "paid",
    shippingMethod: "Standard",
    orderDate: "2024-01-15T10:30:00",
    estimatedDelivery: "2024-01-22",
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "LX001235",
    customer: {
      name: "Michael Chen",
      email: "michael.chen@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    items: [{ name: "Ocean Breeze", quantity: 1, price: 145 }],
    total: 145,
    status: "shipped",
    paymentStatus: "paid",
    shippingMethod: "Express",
    orderDate: "2024-01-14T15:45:00",
    estimatedDelivery: "2024-01-18",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
    trackingNumber: "1Z999AA1234567890",
  },
  {
    id: "LX001236",
    customer: {
      name: "Emma Davis",
      email: "emma.davis@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    items: [
      { name: "Velvet Orchid", quantity: 1, price: 210 },
      { name: "Spiced Cedar", quantity: 2, price: 175 },
    ],
    total: 560,
    status: "delivered",
    paymentStatus: "paid",
    shippingMethod: "Standard",
    orderDate: "2024-01-12T09:15:00",
    estimatedDelivery: "2024-01-19",
    shippingAddress: "789 Pine St, Chicago, IL 60601",
    trackingNumber: "1Z999AA1234567891",
  },
  {
    id: "LX001237",
    customer: {
      name: "James Wilson",
      email: "james.wilson@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    items: [{ name: "Midnight Rose", quantity: 1, price: 189 }],
    total: 189,
    status: "pending",
    paymentStatus: "pending",
    shippingMethod: "Standard",
    orderDate: "2024-01-15T16:20:00",
    estimatedDelivery: "2024-01-25",
    shippingAddress: "321 Elm St, Miami, FL 33101",
  },
  {
    id: "LX001238",
    customer: {
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    items: [
      { name: "Golden Amber", quantity: 2, price: 165 },
      { name: "Ocean Breeze", quantity: 1, price: 145 },
    ],
    total: 475,
    status: "cancelled",
    paymentStatus: "refunded",
    shippingMethod: "Express",
    orderDate: "2024-01-13T11:30:00",
    estimatedDelivery: "2024-01-20",
    shippingAddress: "654 Maple Dr, Seattle, WA 98101",
  },
];

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    const matchesPaymentStatus =
      selectedPaymentStatus === "all" ||
      order.paymentStatus === selectedPaymentStatus;
    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map((o) => o.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    }
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#A76BCF]">
            Orders
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and track customer orders and fulfillment.
          </p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-charcoal">{orders.length}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "processing").length}
            </p>
            <p className="text-sm text-gray-600">Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {orders.filter((o) => o.status === "shipped").length}
            </p>
            <p className="text-sm text-gray-600">Shipped</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {orders.filter((o) => o.status === "delivered").length}
            </p>
            <p className="text-sm text-gray-600">Delivered</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search orders, customers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Order Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={selectedPaymentStatus}
                  onValueChange={setSelectedPaymentStatus}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Payment Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {selectedOrders.length > 0 && (
              <div className="flex items-center gap-4 mt-4 p-3 bg-[#A76BCF]/10 rounded-lg">
                <span className="text-sm font-medium">
                  {selectedOrders.length} orders selected
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-[#A76BCF] border-[#A76BCF] bg-transparent"
                  >
                    Update Status
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-[#A76BCF] border-[#A76BCF] bg-transparent"
                  >
                    Export Selected
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="text-left p-4 w-12">
                      <Checkbox
                        checked={
                          selectedOrders.length === filteredOrders.length &&
                          filteredOrders.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left p-4 font-medium">Order</th>
                    <th className="text-left p-4 font-medium">Customer</th>
                    <th className="text-left p-4 font-medium">Items</th>
                    <th className="text-left p-4 font-medium">Total</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Payment</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.4 + index * 0.05,
                        duration: 0.4,
                      }}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <Checkbox
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={(checked) =>
                            handleSelectOrder(order.id, checked as boolean)
                          }
                        />
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          {order.trackingNumber && (
                            <p className="text-xs text-gray-500">
                              Tracking: {order.trackingNumber}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Image
                            width={1000}
                            height={1000}
                            src={order.customer.avatar || "/placeholder.svg"}
                            alt={order.customer.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-sm">
                              {order.customer.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {order.customer.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm">
                            {order.items.length} item
                            {order.items.length > 1 ? "s" : ""}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.items.map((item) => item.name).join(", ")}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-medium">${order.total}</span>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          className={getPaymentStatusColor(order.paymentStatus)}
                        >
                          {order.paymentStatus.charAt(0).toUpperCase() +
                            order.paymentStatus.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{formatDate(order.orderDate)}</p>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Package className="h-4 w-4 mr-2" />
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Truck className="h-4 w-4 mr-2" />
                              Add Tracking
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">
                  No orders found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
