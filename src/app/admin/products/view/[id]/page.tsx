/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  Link,
  Package,
  Palette,
  Star,
  Wind,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@prisma/client";

interface Brand {
  id: string;
  name: string;
  createdAt: Date;
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

export default function ProductViewPage(product: ProductData) {
  const getStatusColor = (status: string) => {
    return status === "active" ?
        "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "text-red-600" };
    if (stock < 10) return { label: "Low Stock", color: "text-yellow-600" };
    return { label: "In Stock", color: "text-green-600" };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="outline" size="sm" className="cursor-pointer">
            <ArrowLeft className="h-4 w-4 mr-2 cursor-pointer" />
          </Button>
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#A76BCF]">
            Product Details
          </h1>
          <p className="text-gray-600 mt-1">
            View detailed information about this product.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Images */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.images?.[0]?.url || "/placeholder.svg"}
                alt={"hhh"}
                fill
                className="object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {product.images.slice(1, 5).map((image: any, index: number) => (
                  <div
                    key={image.id}
                    className="aspect-square relative rounded-md overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={`${product.name} ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{product.name}</span>
                <div className="flex gap-2">
                  {product?.featured && (
                    <Badge variant="secondary">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {product?.newArrival && (
                    <Badge className="bg-blue-100 text-blue-800">
                      New Arrival
                    </Badge>
                  )}
                  {product?.limitedEdition && (
                    <Badge className="bg-purple-100 text-purple-800">
                      Limited Edition
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Brand</p>
                  <p className="text-lg">{product?.brand?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">SKU</p>
                  <p className="text-lg font-mono">{product?.sku}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <Badge className={getStatusColor(product?.status)}>
                    {product?.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Concentration
                  </p>
                  <p className="text-lg">{product?.concentration}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Description
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {product?.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Stock */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing & Inventory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Current Price
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {/* ${product?.d} */}
                  </p>
                </div>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Original Price
                      </p>
                      <p className="text-lg text-gray-500 line-through">
                        ${product.originalPrice}
                      </p>
                    </div>
                  )}
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Stock Level
                  </p>
                  <p className={`text-2xl font-bold ${stockStatus.color}`}>
                    {product.stock}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Stock Status
                  </p>
                  <p className={`font-medium ${stockStatus.color}`}>
                    {stockStatus.label}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Specifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Specifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Volume</p>
                  <p className="text-lg">{product.volume}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Weight</p>
                  <p className="text-lg">{product.weight}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Dimensions
                  </p>
                  <p className="text-lg">{product.dimensions}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Longevity
                    </p>
                    <p className="text-lg">{product.longevity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Sillage</p>
                    <p className="text-lg">{product.sillage}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fragrance Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Fragrance Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Top Notes
                </p>
                <div className="flex flex-wrap gap-2">
                  {product?.topNotes?.map((note: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-yellow-50 text-yellow-800 border-yellow-200"
                    >
                      {note}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Middle Notes
                </p>
                <div className="flex flex-wrap gap-2">
                  {product?.middleNotes?.map((note: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-pink-50 text-pink-800 border-pink-200"
                    >
                      {note}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Base Notes
                </p>
                <div className="flex flex-wrap gap-2">
                  {product?.baseNotes?.map((note: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-amber-50 text-amber-800 border-amber-200"
                    >
                      {note}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Created</p>
                  <p className="text-lg">
                    {product?.createdAt?.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Last Updated
                  </p>
                  <p className="text-lg">
                    {product?.updatedAt?.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
