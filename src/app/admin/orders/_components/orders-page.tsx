"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Eye, Package, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GenOrder } from "@/lib/types/type";
import { Order } from "@prisma/client";

// Type definitions based on your API structure

interface OrderCounts {
  totalCount: number;
  deliveredCount: number;
  paidCount: number;
  unpaidCount: number;
}

interface OrdersResult {
  data: GenOrder[];
  totalPages: number;
  totalCount: number;
}

interface AdminOrdersPageProps {
  ordersResult: OrdersResult;
  counts: OrderCounts;
  currentPage: number;
  searchText?: string;
}

export default function AdminOrdersPage({
  ordersResult,
  currentPage,
  searchText = "",
}: AdminOrdersPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchText);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all");

  // Helper functions moved BEFORE their usage
  const getOrderStatus = (order: Order): string => {
    if (order.isDelivered) return "delivered";
    if (order.isPaid && !order.isDelivered) return "shipped";
    if (order.isPaid) return "processing";
    return "pending";
  };

  const getPaymentStatus = (order: GenOrder): string => {
    if (order.isPaid) return "paid";
    if (order.paymentResult?.status === "failed") return "failed";
    return "pending";
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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  // Filter orders based on local filters (since API handles search)
  const filteredOrders = ordersResult.data.filter((order) => {
    const matchesStatus =
      selectedStatus === "all" || getOrderStatus(order) === selectedStatus;
    const matchesPaymentStatus =
      selectedPaymentStatus === "all" ||
      getPaymentStatus(order) === selectedPaymentStatus;

    return matchesStatus && matchesPaymentStatus;
  });

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      params.set("user", searchQuery.trim());
    } else {
      params.delete("user");
    }
    params.set("page", "1"); // Reset to first page on search
    router.push(`?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  console.log("orderResult", ordersResult);

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
            <p className="text-2xl font-bold text-blue-600 ">
              {ordersResult.totalCount}
            </p>
            <p className="text-sm ">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {ordersResult.data.filter((o) => o.isPaid).length}
            </p>
            <p className="text-sm text-gray-600">Paid</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {ordersResult.data.filter((o) => !o.isPaid).length}
            </p>
            <p className="text-sm text-gray-600">Unpaid</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {ordersResult.data.filter((o) => o.isDelivered).length}
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
                    placeholder="Search by customer name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-10"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="bg-[#A76BCF] hover:bg-[#A76BCF]/90 cursor-pointer"
                >
                  Search
                </Button>

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
                  </SelectContent>
                </Select>
              </div>
            </div>
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
                        <div>
                          <p className="font-medium">
                            #{order.id.slice(-8).toUpperCase()}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {order.paymentMethod}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {order.user.name && (
                            <div className="w-8 h-8 rounded-full bg-[#A76BCF] flex items-center justify-center text-white text-sm font-medium">
                              {order?.user?.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-sm">
                              {order.user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {order.user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm">
                            {order.orderitems.length} item
                            {order.orderitems.length > 1 ? "s" : ""}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.orderitems
                              .map((item) => item.name)
                              .slice(0, 2)
                              .join(", ")}
                            {order.orderitems.length > 2 && "..."}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-medium">
                          {formatCurrency(order.totalPrice)}
                        </span>
                      </td>
                      <td className="p-4">
                        <Badge
                          className={getStatusColor(getOrderStatus(order))}
                        >
                          {getOrderStatus(order).charAt(0).toUpperCase() +
                            getOrderStatus(order).slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          className={getPaymentStatusColor(
                            getPaymentStatus(order)
                          )}
                        >
                          {getPaymentStatus(order).charAt(0).toUpperCase() +
                            getPaymentStatus(order).slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{formatDate(order.createdAt)}</p>
                      </td>
                      <td className="p-4">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="flex items-center text-gray-600 hover:text-gray-800"
                        >
                          <Eye className="h-5 w-5 mr-2 cursor-pointer" />
                        </Link>
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

      {/* Pagination */}
      {ordersResult.totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center items-center gap-4"
        >
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="flex items-center gap-2 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {ordersResult.totalPages}
          </span>

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= ordersResult.totalPages}
            className="flex items-center gap-2 cursor-pointer "
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
