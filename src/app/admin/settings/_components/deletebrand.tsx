"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteBrand } from "@/app/actions/brand.action";

interface Props {
  brandId: string;
  brandName: string;
}

const DeleteBrand = ({ brandId, brandName }: Props) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteBrand(brandId);
      if (!res.success) {
        toast.error(res.message);
      } else {
        setOpen(false);
        toast.success(res.message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start cursor-pointer"
        >
          <Trash className="w-4 h-4 mr-2 text-red-600 cursor-pointer" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Brand</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the brand
            <span className="font-extrabold pl-2">{brandName}</span>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBrand;
