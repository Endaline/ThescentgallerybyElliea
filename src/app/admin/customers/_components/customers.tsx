"use client";
import type React from "react";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Mail, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomerProfileView from "./viewcustomers";
import { User } from "@prisma/client";

interface CustomersPageProps {
  users: User[];
  totalPages: number;
  currentPage: number;
  searchQuery: string;
}

export default function CustomersPage({
  users,
  totalPages,
  currentPage,
  searchQuery,
}: CustomersPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCustomers = users.filter((user) => {
    const matchesStatus =
      statusFilter === "all" || user.role.toLowerCase() === statusFilter;
    return matchesStatus;
  });

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    params.set("page", "1"); // Reset to first page on search
    router.push(`?${params.toString()}`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const params = new URLSearchParams(searchParams);
      params.set("page", (currentPage - 1).toString());
      router.push(`?${params.toString()}`);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const params = new URLSearchParams(searchParams);
      params.set("page", (currentPage + 1).toString());
      router.push(`?${params.toString()}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getStatusColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "user":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "premium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#770a10]">Customers</h1>
          <p className="text-gray-600">
            Manage your customer relationships and profiles
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-[#770a10] hover:bg-[#770a10]/90"
            >
              Search
            </Button>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>
            Showing {filteredCustomers.length} customers (Page {currentPage} of{" "}
            {totalPages}){searchQuery && ` - Search: "${searchQuery}"`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center">Email Verified</TableHead>
                <TableHead className="text-center">Joined</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ?
                filteredCustomers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {user.name && (
                          <Avatar>
                            <AvatarImage
                              src={user.image || "/placeholder.svg"}
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {user?.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900">
                              {user.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-3 h-3 mr-1" />
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-3 h-3 mr-1" />
                        {user.phone || "Not provided"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        {user.paymentMethod || "Not set"}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={getStatusColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div>
                        <p className="text-sm text-gray-600">
                          {user.emailVerified ? "✓ Verified" : "✗ Not verified"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {formatDate(user.createdAt)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center flex justify-center">
                      <CustomerProfileView user={user} />
                    </TableCell>
                  </motion.tr>
                ))
              : <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-8 text-gray-500"
                  >
                    No customers found
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handlePreviousPage}
                  disabled={currentPage <= 1}
                  className="flex items-center gap-2 bg-transparent cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
