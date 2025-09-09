"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  Trash2,
  Eye,
  Package,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Pencil,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface Brand {
  id: string;
  name: string;
  createdAt: Date;
}

interface ProductImage {
  id: string;
  url: string;
  name: string;
  key: string;
}
interface ProductData {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  concentration: string;
  sku: string;
  status: string;
  featured: boolean;
  limitedEdition: boolean;
  newArrival: boolean;
  price: number;
  originalPrice: number;
  stock: number;
  volume: string;
  weight: string;
  dimensions: string;
  longevity: string;
  sillage: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  images: ProductImage[];
  createdAt: Date;
  updatedAt: Date;
  brandId: string;
  brand: Brand;
}

interface ProductsResponse {
  data: ProductData[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

interface CountsResponse {
  counts: {
    totalCount: number;
    activeCount: number;
    lowCount: number;
    outCount: number;
  };
}

interface ProductProps {
  products: ProductsResponse;
  brands: Brand[];
  counts: CountsResponse;
}

export default function Product({ products, brands, counts }: ProductProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("name") || "";

  const [searchQuery, setSearchQuery] = useState(currentSearch);

  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || "all"
  );
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const currentPage = products.currentPage;
  const totalPages = products.totalPages;
  const productList = products.data;

  // Handle search
  const updateSearchParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    if ("name" in updates || "brand" in updates) {
      params.delete("page");
    }

    router.push(`?${params.toString()}`);
  };
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const timeoutId = setTimeout(() => {
      updateSearchParams({ name: value });
    }, 100);

    return () => clearTimeout(timeoutId);
  };

  // Handle brand filter
  const handleBrandFilter = (brandValue: string) => {
    setSelectedBrand(brandValue);
    const params = new URLSearchParams(searchParams);
    if (brandValue && brandValue !== "all") {
      params.set("brand", brandValue);
    } else {
      params.delete("brand");
    }
    params.set("page", "1"); // Reset to first page on filter
    router.push(`?${params.toString()}`);
  };

  // Handle pagination
  const handlePrevPage = () => {
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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(productList.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
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
              {counts.counts.totalCount}
            </p>
            <p className="text-sm text-gray-600">Total Products</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {counts.counts.activeCount}
            </p>
            <p className="text-sm text-gray-600">Active Products</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {counts.counts.lowCount}
            </p>
            <p className="text-sm text-gray-600">Low Stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {counts.counts.outCount}
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
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedBrand} onValueChange={handleBrandFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
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
                          selectedProducts.length === productList.length &&
                          productList.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left p-4 font-medium">Product</th>
                    <th className="text-left p-4 font-medium">Brand</th>
                    <th className="text-left p-4 font-medium">Price</th>
                    <th className="text-left p-4 font-medium">Stock</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map((product, index) => {
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
                              key={product.id}
                              width={48}
                              height={48}
                              src={
                                product.images?.[0]?.url || "/placeholder.svg"
                              }
                              alt={product.images?.[0]?.name || product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-600">
                                SKU: {product.sku}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <Badge variant="secondary">
                            {product.brand?.name || "No Brand"}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium">${product.price}</p>
                            {product.originalPrice &&
                              product.originalPrice > product.price && (
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
                          <Badge className={getStatusColor(product.status)}>
                            {product.status === "active"
                              ? "Active"
                              : "Inactive"}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Eye className="h-5 w-5 cursor-pointer text-neutral-800" />

                            <Link href={`/admin/products/${product.slug}`}>
                              {" "}
                              <Pencil className="h-5 w-5 cursor-pointer text-green-600" />
                            </Link>

                            <Trash2 className="h-5 w-5 cursor-pointer text-red-600" />
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {productList.length === 0 && (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing page {currentPage} of {totalPages} (
                  {products.totalCount} total products)
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={handlePrevPage}
                    disabled={currentPage <= 1}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="px-3 py-1 text-sm font-medium bg-gray-100 rounded">
                    {currentPage}
                  </span>
                  <Button
                    variant="outline"
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
