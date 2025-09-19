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
import { MultiSelect } from "@/components/ui/multi-select";
import React, { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Shipping } from "@prisma/client";
import { createShippingInfo } from "@/app/actions/shipping.action";
import { nigeriaData } from "@/app/(website)/contact";
import { Plus } from "lucide-react";

interface Props {
  isDashboard?: boolean;
}

type ShippingRecord = Omit<Shipping, "id" | "createdAt" | "updatedAt"> & {
  id?: string | undefined;
};

const AddShipping = ({ isDashboard = false }: Props) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [record, setRecord] = useState<ShippingRecord>({
    state: [],
    shippingRate: 0,
    taxRate: 0,
    id: "",
  });

  // Handle input change
  const handleChange = (
    key: keyof ShippingRecord,
    value: string | number | string[]
  ) => {
    setRecord((prev) => ({ ...prev, [key]: value }));
  };

  const states = ["Default", ...Object.keys(nigeriaData)];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isStateValid = record.state.length > 0;
    if (!isStateValid) {
      toast.error("Please select at least one state.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await createShippingInfo(record);

        if (!res.success) {
          toast.error(res.message);
          return;
        }
        toast.success(res.message);
        setOpen(!open);
        setRecord({ state: [], shippingRate: 0, taxRate: 0, id: "" });
      } catch (error: any) {
        toast.error("Something went wrong.");
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
              ? "rounded bg-transparent border border-[#770a10] text-[#770a10]"
              : "bg-[#770a10] hover:bg-[#770a10]/90 text-white cursor-pointer"
          )}
        >
          <Plus className="w-4 h-4" />
          Add Shipping
        </button>
      </DialogTrigger>

      <DialogContent
        className="p-0 bg-gray-200 min-w-sm overflow-auto"
        // id="small-modal"
      >
        <DialogHeader className="">
          <DialogTitle className="border-b px-3 py-4 rounded-t-[10px]">
            Add Shipping
          </DialogTitle>
          <DialogDescription className="-mt-2"></DialogDescription>
        </DialogHeader>

        <form
          method="POST"
          onSubmit={(e) => handleSubmit(e)}
          className="grid bg-gray-100 -mt-5 py-5 px-5 space-y-5"
        >
          <div>
            <Label htmlFor="state">State *</Label>
            <MultiSelect
              options={states.map((s) => ({ label: s, value: s }))}
              value={record.state ?? []}
              onChange={(values) => handleChange("state", values)}
              placeholder="Select states"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shippingRate">Shipping Rate</Label>
            <div className="flex items-center space-x-2">
              <span className="text-sm">₦</span>
              <Input
                id="shippingRate"
                type="number"
                step="0.01"
                value={record.shippingRate}
                onChange={(e) =>
                  handleChange(
                    "shippingRate",
                    Number.parseFloat(e.target.value)
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm">%</span>
                <Input
                  id="taxRate"
                  type="number"
                  step="0.01"
                  value={record.taxRate}
                  onChange={(e) =>
                    handleChange("taxRate", Number.parseFloat(e.target.value))
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end my-8 gap-4 items-center">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="bg-transparent rounded border border-sec text-sec"
            >
              Cancel
            </Button>
            <Button disabled={isPending} className="bg-[#770a10] rounded">
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddShipping;
