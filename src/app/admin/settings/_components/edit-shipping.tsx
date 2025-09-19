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
import { updateShippingInfo } from "@/app/actions/shipping.action";
import { nigeriaData } from "@/app/(website)/contact";
import { Edit, Plus } from "lucide-react";

type ShippingRecord = Omit<Shipping, "id" | "createdAt" | "updatedAt"> & {
  id?: string | undefined;
};

interface Props {
  isDashboard?: boolean;
  info: ShippingRecord;
}

const EditShipping = ({ isDashboard = false, info }: Props) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [record, setRecord] = useState<ShippingRecord>({
    state: info?.state ?? [],
    shippingRate: info?.shippingRate ?? 0,
    taxRate: info?.taxRate ?? 0,
    id: info?.id ?? "",
  });

  // Handle input change
  const handleChange = (
    key: keyof ShippingRecord,
    value: string | number | string[]
  ) => {
    setRecord((prev) => ({ ...prev, [key]: value }));
  };

  const states = [...Object.keys(nigeriaData)];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isStateValid = record.state.length > 0;
    if (!isStateValid) {
      toast.error("Please select at least one state.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await updateShippingInfo(record);

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

  const containsDefault = record?.state.includes("Default");

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
            "bg-green-50 hover:bg-green-50/90 text-green-500 cursor-pointer"
          )}
        >
          <Edit className="w-4 h-4" />
        </button>
      </DialogTrigger>

      <DialogContent
        className="p-0 bg-gray-200 min-w-sm overflow-auto"
        // id="small-modal"
      >
        <DialogHeader className="">
          <DialogTitle className="border-b px-3 py-4 rounded-t-[10px]">
            Edit Shipping
          </DialogTitle>
          <DialogDescription className="-mt-2"></DialogDescription>
        </DialogHeader>

        <form
          method="POST"
          onSubmit={(e) => handleSubmit(e)}
          className="grid bg-gray-100 -mt-5 py-5 px-5 space-y-5"
        >
          {containsDefault ? null : (
            <div>
              <Label htmlFor="state">State *</Label>
              <MultiSelect
                options={states.map((s) => ({ label: s, value: s }))}
                value={record.state ?? []}
                onChange={(values) => handleChange("state", values)}
                placeholder="Select states"
              />
            </div>
          )}

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
              {isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditShipping;
