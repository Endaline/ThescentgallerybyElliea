"use client";

import { useState, useTransition } from "react";
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
import { toast } from "sonner";
import { deleteProduct } from "@/app/actions/product.action";
import { GenProduct } from "@/lib/types/type";
import { ProductImage } from "@prisma/client";
import { deleteFile } from "@/hooks/delete-uploadthing";

export default function DeleteProductModal({
  product,
}: {
  product: GenProduct;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const imageUrlList = product?.images as ProductImage[];
  function deleteSelectedProduct() {
    startTransition(async () => {
      let deleted: {
        success: boolean;
      }[];

      if (imageUrlList.length > 0) {
        deleted = await Promise.all(
          imageUrlList.map((img) => deleteFile(img.key))
        );

        if (!deleted.every((res) => res.success)) {
          toast.error("Failed to delete product images");
          return;
        }
      }

      const res = await deleteProduct(product?.id);

      if (!res.success) {
        toast.error(res.message);
      } else {
        setOpen(false);
        toast.success(res.message);
      }
    });
  }

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
              src={imageUrlList[0]?.url}
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
            onClick={deleteSelectedProduct}
            disabled={isPending}
            className="min-w-[100px] cursor-pointer"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
