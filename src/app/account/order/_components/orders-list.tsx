"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Package, Eye } from "lucide-react";
import Image from "next/image";
import { GenOrder } from "@/lib/types/type";
import { formatDateTime, formatId } from "@/lib/utils";
import Link from "next/link";

export default function OrdersList({
  data,
  query,
}: {
  data: GenOrder[];
  query: string;
}) {
  return (
    <div className="p-6 max-content padding-x">
      {/* Header */}
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
            value={query}
            className="pl-10"
            readOnly
          />
        </div>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border rounded-lg overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              data.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    Order #{formatId(order.id)}
                  </TableCell>
                  <TableCell>
                    {formatDateTime(order.createdAt).dateTime}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {order.orderitems.slice(0, 3).map((item, index) => (
                          <Image
                            key={index}
                            width={32}
                            height={32}
                            src={
                              item.imageId ||
                              "/placeholder.svg?height=32&width=32"
                            }
                            alt={item.name}
                            className="h-12 w-12 rounded-full border-2 border-white object-contain"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {order.orderitems.length} item
                        {order.orderitems.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge>{order.paymentResult?.status ?? "PENDING"}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${order.totalPrice}
                  </TableCell>
                  <TableCell>
                    <Link href={`/account/order/${order.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No orders found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
