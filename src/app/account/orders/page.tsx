"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Package,
  Truck,
  CheckCircle,
  Clock,
  Eye,
  Download,
} from "lucide-react";

const orders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 289.99,
    items: [
      {
        name: "Chanel No. 5 Eau de Parfum",
        quantity: 1,
        price: 159.99,
        image: "/chanel-perfume.png",
      },
      {
        name: "Tom Ford Black Orchid",
        quantity: 1,
        price: 130.0,
        image: "/tom-ford-perfume.png",
      },
    ],
    shipping: {
      address: "123 Main St, New York, NY 10001",
      method: "Express Shipping",
      tracking: "TRK123456789",
    },
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "Shipped",
    total: 159.99,
    items: [
      {
        name: "Dior Sauvage Eau de Toilette",
        quantity: 1,
        price: 159.99,
        image: "/dior-sauvage.png",
      },
    ],
    shipping: {
      address: "123 Main St, New York, NY 10001",
      method: "Standard Shipping",
      tracking: "TRK987654321",
    },
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "Processing",
    total: 199.99,
    items: [
      {
        name: "Creed Aventus",
        quantity: 1,
        price: 199.99,
        image: "/creed-aventus.png",
      },
    ],
    shipping: {
      address: "123 Main St, New York, NY 10001",
      method: "Express Shipping",
      tracking: null,
    },
  },
];

const statusIcons = {
  Processing: Clock,
  Shipped: Truck,
  Delivered: CheckCircle,
  Cancelled: Package,
};

const statusColors = {
  Processing: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-serif text-3xl text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your order history</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order, index) => {
          const StatusIcon =
            statusIcons[order.status as keyof typeof statusIcons];
          const isExpanded = selectedOrder === order.id;

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className="h-5 w-5 text-gray-600" />
                        <div>
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          <p className="text-sm text-gray-600">
                            Placed on {order.date}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge
                        className={
                          statusColors[
                            order.status as keyof typeof statusColors
                          ]
                        }
                      >
                        {order.status}
                      </Badge>
                      <p className="font-semibold text-lg">${order.total}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSelectedOrder(isExpanded ? null : order.id)
                        }
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {isExpanded ? "Hide" : "View"} Details
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="border-t">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
                      {/* Order Items */}
                      <div>
                        <h4 className="font-semibold mb-4">Order Items</h4>
                        <div className="space-y-3">
                          {order.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center space-x-3 p-3 border rounded-lg"
                            >
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-12 w-12 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-sm">
                                  {item.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                              <p className="font-semibold">${item.price}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Info */}
                      <div>
                        <h4 className="font-semibold mb-4">
                          Shipping Information
                        </h4>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-lg">
                            <p className="text-sm font-medium text-gray-900">
                              Delivery Address
                            </p>
                            <p className="text-sm text-gray-600">
                              {order.shipping.address}
                            </p>
                          </div>
                          <div className="p-3 border rounded-lg">
                            <p className="text-sm font-medium text-gray-900">
                              Shipping Method
                            </p>
                            <p className="text-sm text-gray-600">
                              {order.shipping.method}
                            </p>
                          </div>
                          {order.shipping.tracking && (
                            <div className="p-3 border rounded-lg">
                              <p className="text-sm font-medium text-gray-900">
                                Tracking Number
                              </p>
                              <p className="text-sm text-gray-600 font-mono">
                                {order.shipping.tracking}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex space-x-2 mt-4">
                          {order.shipping.tracking && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 bg-transparent"
                            >
                              <Truck className="h-4 w-4 mr-2" />
                              Track Package
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Invoice
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No orders found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}
    </div>
  );
}
