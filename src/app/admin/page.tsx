"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  Eye,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

// Mock data for dashboard
const dashboardStats = {
  totalRevenue: 45280,
  revenueChange: 12.5,
  totalOrders: 324,
  totalCustomers: 1247,
  customersChange: 15.3,
  totalProducts: 89,
  productsChange: 2.1,
};

const recentOrders = [
  {
    id: "LX001234",
    customer: "Sarah Johnson",
    amount: 378,
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "LX001235",
    customer: "Michael Chen",
    amount: 189,
    status: "processing",
    date: "2024-01-15",
  },
  {
    id: "LX001236",
    customer: "Emma Davis",
    amount: 543,
    status: "shipped",
    date: "2024-01-14",
  },
  {
    id: "LX001237",
    customer: "James Wilson",
    amount: 165,
    status: "completed",
    date: "2024-01-14",
  },
];

const topProducts = [
  {
    name: "Midnight Rose",
    sales: 156,
    revenue: 29484,
    image: "/images/pef-1.jpeg",
  },
  {
    name: "Golden Amber",
    sales: 134,
    revenue: 22110,
    image: "/images/pef-3.jpeg",
  },
  {
    name: "Ocean Breeze",
    sales: 98,
    revenue: 14210,
    image: "/images/pef-4.jpeg",
  },
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#A76BCF]">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here&apos;s what&apos;s happening with your perfume
              business.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={timeRange === "7d" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("7d")}
              className={
                timeRange === "7d"
                  ? "bg-[#A76BCF] hover:bg-[#A76BCF]/90"
                  : "border-[#A76BCF] text-[#A76BCF] hover:bg-[#A76BCF] hover:text-white"
              }
            >
              7 Days
            </Button>
            <Button
              variant={timeRange === "30d" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("30d")}
              className={
                timeRange === "30d"
                  ? "bg-[#A76BCF] hover:bg-[#A76BCF]/90"
                  : "border-[#A76BCF] text-[#A76BCF] hover:bg-[#A76BCF] hover:text-white"
              }
            >
              30 Days
            </Button>
            <Button
              variant={timeRange === "90d" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("90d")}
              className={
                timeRange === "90d"
                  ? "bg-[#A76BCF] hover:bg-[#A76BCF]/90"
                  : "border-[#A76BCF] text-[#A76BCF] hover:bg-[#A76BCF] hover:text-white"
              }
            >
              90 Days
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-[#A76BCF]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${dashboardStats.totalRevenue.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Orders
                </CardTitle>
                <ShoppingBag className="h-4 w-4 text-[#A76BCF]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardStats.totalOrders}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Customers
                </CardTitle>
                <Users className="h-4 w-4 text-[#A76BCF]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardStats.totalCustomers}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Products
                </CardTitle>
                <Package className="h-4 w-4 text-[#A76BCF]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardStats.totalProducts}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#A76BCF] hover:text-[#A76BCF]/80"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{order.id}</p>
                        <p className="text-sm text-gray-600">
                          {order.customer}
                        </p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-semibold">${order.amount}</p>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Top Products</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#A76BCF] hover:text-[#A76BCF]/80"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <motion.div
                      key={product.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                      className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Image
                        width={1000}
                        height={1000}
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-gray-600">
                          {product.sales} sales
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${product.revenue.toLocaleString()}
                        </p>
                        <div className="flex items-center text-xs text-green-600">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          Revenue
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
