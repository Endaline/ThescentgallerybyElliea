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
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { createCategory } from "@/app/actions/category.action";
import { Label } from "@/components/ui/label";
import { MainCategory } from "@/lib/types/type";

interface Props {
  isDashboard?: boolean;
}

const AddCategory = ({ isDashboard = false }: Props) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<MainCategory>({
    name: "",
  });
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (
    field: string,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const res = await createCategory({
        ...formData,
      });
      if (!res.success) {
        toast.error(res.message);
      } else {
        setOpen(false);
        setFormData({ name: "" });
        toast.success(res.message);
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <DialogTrigger>
        <button
          className={cn(
            "px-4 cursor-pointer flex gap-2 py-[6px] text-sm rounded font-semibold",
            isDashboard
              ? "rounded bg-transparent border border-[#9b59b6] text-[#9b59b6]"
              : "bg-[#9b59b6] hover:bg-[#9b59b6]/90 text-white cursor-pointer"
          )}
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </DialogTrigger>

      <DialogContent
        className="p-0 bg-gray-200 min-w-sm"
        // id="small-modal"
      >
        <DialogHeader className="">
          <DialogTitle className="border-b px-3 py-4 rounded-t-[10px]">
            Add Category
          </DialogTitle>
          <DialogDescription className="-mt-2"></DialogDescription>
        </DialogHeader>

        <form
          method="POST"
          onSubmit={onSubmit}
          className="grid bg-gray-100 -mt-5 py-5 px-5"
        >
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="e.g., Midnight Rose"
              required
            />
          </div>

          <div className="flex justify-end my-8 gap-4 items-center">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="bg-transparent rounded border border-sec text-sec"
            >
              Cancel
            </Button>
            <Button disabled={isPending} className="bg-[#9b59b6] rounded">
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
