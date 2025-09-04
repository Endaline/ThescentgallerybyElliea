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
  Plus,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Package,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Mock product data
const products = [
  {
    id: 1,
    name: "Midnight Rose",
    brand: "Luxe Parfum",
    category: "Floral",
    price: 189,
    originalPrice: 220,
    stock: 45,
    status: "active",
    image: "/placeholder.svg?height=80&width=80",
    sales: 156,
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "Golden Amber",
    brand: "Luxe Parfum",
    category: "Oriental",
    price: 165,
    stock: 23,
    status: "active",
    image: "/placeholder.svg?height=80&width=80",
    sales: 134,
    createdAt: "2024-01-08",
  },
  {
    id: 3,
    name: "Ocean Breeze",
    brand: "Luxe Parfum",
    category: "Fresh",
    price: 145,
    stock: 8,
    status: "active",
    image: "/placeholder.svg?height=80&width=80",
    sales: 98,
    createdAt: "2024-01-05",
  },
  {
    id: 4,
    name: "Velvet Orchid",
    brand: "Essence Elite",
    category: "Floral",
    price: 210,
    stock: 0,
    status: "inactive",
    image: "/placeholder.svg?height=80&width=80",
    sales: 78,
    createdAt: "2024-01-03",
  },
  {
    id: 5,
    name: "Spiced Cedar",
    brand: "Royal Scents",
    category: "Woody",
    price: 175,
    stock: 67,
    status: "active",
    image: "/placeholder.svg?height=80&width=80",
    sales: 92,
    createdAt: "2024-01-01",
  },
];

const Product = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("name");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: number, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "text-red-600" };
    if (stock < 10) return { label: "Low Stock", color: "text-yellow-600" };
    return { label: "In Stock", color: "text-green-600" };
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
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#A76BCF]">
              Products
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your perfume inventory and product catalog.
            </p>
          </div>

          <Link href="/admin/products/new">
            <Button className="bg-burgundy hover:bg-burgundy/90 text-purple-900 cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-charcoal">
                {products.length}
              </p>
              <p className="text-sm text-gray-600">Total Products</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {products.filter((p) => p.status === "active").length}
              </p>
              <p className="text-sm text-gray-600">Active Products</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {products.filter((p) => p.stock < 10 && p.stock > 0).length}
              </p>
              <p className="text-sm text-gray-600">Low Stock</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-red-600">
                {products.filter((p) => p.stock === 0).length}
              </p>
              <p className="text-sm text-gray-600">Out of Stock</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Brands</SelectItem>
                      <SelectItem value="Floral">Floral</SelectItem>
                      <SelectItem value="Oriental">Oriental</SelectItem>
                      <SelectItem value="Fresh">Fresh</SelectItem>
                      <SelectItem value="Woody">Woody</SelectItem>
                      <SelectItem value="Citrus">Citrus</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="stock">Stock</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="created">Date Created</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {selectedProducts.length > 0 && (
                <div className="flex items-center gap-4 mt-4 p-3 bg-burgundy/10 rounded-lg">
                  <span className="text-sm font-medium">
                    {selectedProducts.length} products selected
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-burgundy border-burgundy bg-transparent"
                    >
                      Bulk Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-600 bg-transparent"
                    >
                      Delete Selected
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
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
                            selectedProducts.length ===
                              filteredProducts.length &&
                            filteredProducts.length > 0
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="text-left p-4 font-medium">Product</th>
                      <th className="text-left p-4 font-medium">Brands</th>
                      <th className="text-left p-4 font-medium">Price</th>
                      <th className="text-left p-4 font-medium">Stock</th>
                      <th className="text-left p-4 font-medium">Sales</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product, index) => {
                      const stockStatus = getStockStatus(product.stock);
                      return (
                        <motion.tr
                          key={product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.3 + index * 0.05,
                            duration: 0.4,
                          }}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="p-4">
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={(checked) =>
                                handleSelectProduct(
                                  product.id,
                                  checked as boolean
                                )
                              }
                            />
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Image
                                width={1000}
                                height={1000}
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-gray-600">
                                  {product.brand}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="secondary">
                              {product.category}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">${product.price}</p>
                              {product.originalPrice && (
                                <p className="text-sm text-gray-500 line-through">
                                  ${product.originalPrice}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className={stockStatus.color}>
                                {product.stock}
                              </span>
                              {product.stock < 10 && product.stock > 0 && (
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              )}
                              {product.stock === 0 && (
                                <Package className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                            <p className={`text-xs ${stockStatus.color}`}>
                              {stockStatus.label}
                            </p>
                          </td>
                          <td className="p-4">
                            <span className="font-medium">{product.sales}</span>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(product.status)}>
                              {product.status === "active"
                                ? "Active"
                                : "Inactive"}
                            </Badge>
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
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your search or filter criteria.
                  </p>
                  <Link href="/admin/products/new">
                    <Button className="bg-burgundy hover:bg-burgundy/90 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Product
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default Product;
