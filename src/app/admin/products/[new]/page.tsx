"use client";

import type React from "react";

import { useState } from "react";
import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload, X, Plus } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    shortDescription: "",
    category: "",
    price: "",
    originalPrice: "",
    stock: "",
    sku: "",
    weight: "",
    dimensions: "",
    concentration: "",
    volume: "",
    longevity: "",
    sillage: "",
    topNotes: [""],
    middleNotes: [""],
    baseNotes: [""],
    status: "active",
    featured: false,
    newArrival: false,
    limitedEdition: false,
  });

  const [images, setImages] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotesChange = (
    type: "topNotes" | "middleNotes" | "baseNotes",
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].map((note, i) => (i === index ? value : note)),
    }));
  };

  const addNote = (type: "topNotes" | "middleNotes" | "baseNotes") => {
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ""],
    }));
  };

  const removeNote = (
    type: "topNotes" | "middleNotes" | "baseNotes",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = () => {
    // Mock image upload - in real app, this would handle file upload
    const mockImageUrl = `/placeholder.svg?height=200&width=200&text=Product+Image+${
      images.length + 1
    }`;
    setImages([...images, mockImageUrl]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Product data:", formData);
    console.log("Images:", images);
    // Redirect to products page
    window.location.href = "/admin/products";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <Link href="/admin/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Add New Product
            </h1>
            <p className="text-gray-600 mt-1">
              Create a new perfume product for your catalog.
            </p>
          </div>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Main Product Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="e.g., Midnight Rose"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="brand">Brand *</Label>
                      <Input
                        id="brand"
                        value={formData.brand}
                        onChange={(e) =>
                          handleInputChange("brand", e.target.value)
                        }
                        placeholder="e.g., Luxe Parfum"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shortDescription">Short Description</Label>
                    <Input
                      id="shortDescription"
                      value={formData.shortDescription}
                      onChange={(e) =>
                        handleInputChange("shortDescription", e.target.value)
                      }
                      placeholder="Brief product description for listings"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Full Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Detailed product description..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Floral">Floral</SelectItem>
                          <SelectItem value="Oriental">Oriental</SelectItem>
                          <SelectItem value="Fresh">Fresh</SelectItem>
                          <SelectItem value="Woody">Woody</SelectItem>
                          <SelectItem value="Citrus">Citrus</SelectItem>
                          <SelectItem value="Spicy">Spicy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="sku">SKU</Label>
                      <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) =>
                          handleInputChange("sku", e.target.value)
                        }
                        placeholder="e.g., LX-MR-50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pricing & Inventory */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Inventory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                          handleInputChange("price", e.target.value)
                        }
                        placeholder="189.00"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="originalPrice">Original Price</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={formData.originalPrice}
                        onChange={(e) =>
                          handleInputChange("originalPrice", e.target.value)
                        }
                        placeholder="220.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock Quantity *</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={(e) =>
                          handleInputChange("stock", e.target.value)
                        }
                        placeholder="50"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="concentration">Concentration</Label>
                      <Select
                        value={formData.concentration}
                        onValueChange={(value) =>
                          handleInputChange("concentration", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select concentration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Eau de Parfum">
                            Eau de Parfum
                          </SelectItem>
                          <SelectItem value="Eau de Toilette">
                            Eau de Toilette
                          </SelectItem>
                          <SelectItem value="Eau de Cologne">
                            Eau de Cologne
                          </SelectItem>
                          <SelectItem value="Parfum">Parfum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="volume">Volume</Label>
                      <Input
                        id="volume"
                        value={formData.volume}
                        onChange={(e) =>
                          handleInputChange("volume", e.target.value)
                        }
                        placeholder="50ml / 100ml"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="longevity">Longevity</Label>
                      <Input
                        id="longevity"
                        value={formData.longevity}
                        onChange={(e) =>
                          handleInputChange("longevity", e.target.value)
                        }
                        placeholder="8-10 hours"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sillage">Sillage</Label>
                      <Input
                        id="sillage"
                        value={formData.sillage}
                        onChange={(e) =>
                          handleInputChange("sillage", e.target.value)
                        }
                        placeholder="Moderate to Strong"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Fragrance Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Fragrance Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {["topNotes", "middleNotes", "baseNotes"].map((noteType) => (
                    <div key={noteType}>
                      <Label className="capitalize">
                        {noteType === "topNotes"
                          ? "Top Notes"
                          : noteType === "middleNotes"
                          ? "Middle Notes"
                          : "Base Notes"}
                      </Label>
                      <div className="space-y-2 mt-2">
                        {Array.isArray(
                          formData[noteType as keyof typeof formData]
                        ) &&
                          (
                            formData[
                              noteType as keyof typeof formData
                            ] as string[]
                          ).map((note: string, index: number) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={note}
                                onChange={(e) =>
                                  handleNotesChange(
                                    noteType as
                                      | "topNotes"
                                      | "middleNotes"
                                      | "baseNotes",
                                    index,
                                    e.target.value
                                  )
                                }
                                placeholder={`${
                                  noteType === "topNotes"
                                    ? "Top"
                                    : noteType === "middleNotes"
                                    ? "Middle"
                                    : "Base"
                                } note`}
                              />
                              {(
                                formData[
                                  noteType as keyof typeof formData
                                ] as string[]
                              ).length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() =>
                                    removeNote(
                                      noteType as
                                        | "topNotes"
                                        | "middleNotes"
                                        | "baseNotes",
                                      index
                                    )
                                  }
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            addNote(
                              noteType as
                                | "topNotes"
                                | "middleNotes"
                                | "baseNotes"
                            )
                          }
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Note
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <Image
                          width={1000}
                          height={1000}
                          src={image || "/placeholder.svg"}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-dashed border-[#A76BCF] text-[#A76BCF] hover:bg-[#A76BCF] hover:text-white bg-transparent"
                    onClick={handleImageUpload}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                  <p className="text-xs text-gray-500">
                    Upload up to 5 images. First image will be the main product
                    image.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Product Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        handleInputChange("status", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) =>
                          handleInputChange("featured", checked as boolean)
                        }
                      />
                      <Label htmlFor="featured">Featured Product</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newArrival"
                        checked={formData.newArrival}
                        onCheckedChange={(checked) =>
                          handleInputChange("newArrival", checked as boolean)
                        }
                      />
                      <Label htmlFor="newArrival">New Arrival</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="limitedEdition"
                        checked={formData.limitedEdition}
                        onCheckedChange={(checked) =>
                          handleInputChange(
                            "limitedEdition",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="limitedEdition">Limited Edition</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-3"
            >
              <Button
                type="submit"
                className="w-full bg-[#A76BCF] hover:bg-[#A76BCF]/90 text-white"
              >
                Create Product
              </Button>
              <Link href="/admin/products" className="block">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  Cancel
                </Button>
              </Link>
            </motion.div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
