/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";
import Image from "next/image";

export default function DeleteProductModal(product: any) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-red-50  cursor-pointer"
        >
          <Trash2 className="h-5 w-5 cursor-pointer text-red-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                Delete Product
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center gap-4 p-4  rounded-lg">
            <Image
              src={product.images?.[0]?.url}
              alt={product?.name}
              width={60}
              height={60}
              className="rounded-lg object-cover w-full h-50"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{product?.name}</h4>
              <p className="text-sm text-gray-600">SKU: {product?.sku}</p>
              <p className="text-sm text-gray-600">
                Brand: {product?.brand?.name}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-700">
            Are you sure you want to delete this product? This will permanently
            remove the product from your inventory and cannot be undone.
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="min-w-[100px] cursor-pointer"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
