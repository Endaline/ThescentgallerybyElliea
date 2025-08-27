"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  MapPin,
  Heart,
  CreditCard,
  Star,
  ArrowRight,
  Gift,
} from "lucide-react";
import Image from "next/image";

const recentOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 289.99,
    items: 2,
    image: "/luxury-perfume-bottle.png",
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "Shipped",
    total: 159.99,
    items: 1,
    image: "/elegant-perfume-bottle.png",
  },
];

const quickActions = [
  {
    name: "Track Orders",
    icon: Package,
    href: "/account/orders",
    color: "bg-blue-50 text-blue-600",
  },
  {
    name: "Manage Addresses",
    icon: MapPin,
    href: "/account/addresses",
    color: "bg-green-50 text-green-600",
  },
  {
    name: "View Wishlist",
    icon: Heart,
    href: "/account/wishlist",
    color: "bg-pink-50 text-pink-600",
  },
  {
    name: "Payment Methods",
    icon: CreditCard,
    href: "/account/settings",
    color: "bg-purple-50 text-purple-600",
  },
];

export default function AccountDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-serif text-3xl text-gray-900 mb-2">
          Welcome back, Jane!
        </h1>
        <p className="text-gray-600">
          Manage your orders, addresses, and account preferences
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <Package className="h-8 w-8 text-burgundy-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Wishlist Items</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
                <Heart className="h-8 w-8 text-burgundy-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Loyalty Points</p>
                  <p className="text-2xl font-bold text-gray-900">2,450</p>
                </div>
                <Star className="h-8 w-8 text-gold-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">$1,249</p>
                </div>
                <Gift className="h-8 w-8 text-burgundy-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-serif text-xl">
                Recent Orders
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-burgundy-600">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        width={1000}
                        height={1000}
                        src={order.image || "/placeholder.svg"}
                        alt="Product"
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">
                          {order.date} • {order.items} items
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ${order.total}
                      </p>
                      <Badge
                        variant={
                          order.status === "Delivered" ? "default" : "secondary"
                        }
                        className="mt-1"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-xl">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.name}
                      variant="ghost"
                      className="w-full justify-start h-auto p-4"
                      asChild
                    >
                      <a href={action.href}>
                        <div className={`p-2 rounded-lg mr-3 ${action.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium">{action.name}</span>
                        <ArrowRight className="ml-auto h-4 w-4" />
                      </a>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
