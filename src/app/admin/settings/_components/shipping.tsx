"use client";

import React from "react";
import { useState } from "react";
import { Loader, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  createShippingInfo,
  updateShippingInfo,
} from "@/app/actions/shipping.action";
import type { Shipping } from "@prisma/client";

const Shipping = ({ info }: { info: Shipping | null | undefined }) => {
  const [isPending, startTransition] = useTransition();
  const [settings, setSettings] = useState({
    shippingRate: info?.shippingRate || 0,
    taxRate: info?.taxRate || 0,
  });

  const handleSubmit = async () => {
    startTransition(async () => {
      if (!info) {
        const res = await createShippingInfo(settings);

        if (!res.success) {
          toast.error(res.message);
          return;
        } else {
          toast.success(res.message);
        }
      } else {
        const res = await updateShippingInfo(settings, info.id);

        if (!res.success) {
          toast.error(res.message);
          return;
        } else {
          toast.success(res.message);
        }
      }
    });
  };

  const handleSettingChange = (key: string, value: string | number) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Truck className="w-5 h-5 mr-2" />
            Shipping Options
          </CardTitle>
          <CardDescription>Configure shipping rates and Tax</CardDescription>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isPending}
          className={cn(
            "px-4 cursor-pointer flex gap-2 py-[6px] text-sm rounded font-semibold",
            "bg-[#9b59b6] hover:bg-[#9b59b6]/90 text-white cursor-pointer"
          )}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              Submitting..
              <Loader className="w-4 h-4 animate-spin" />
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="shippingRate">Shipping Rate</Label>
            <div className="flex items-center space-x-2">
              <span className="text-sm">₦</span>
              <Input
                id="shippingRate"
                type="number"
                step="0.01"
                value={settings.shippingRate}
                onChange={(e) =>
                  handleSettingChange(
                    "shippingRate",
                    Number.parseFloat(e.target.value)
                  )
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxRate">Tax Rate</Label>
            <div className="flex items-center space-x-2">
              <span className="text-sm">%</span>
              <Input
                id="taxRate"
                type="number"
                step="0.01"
                value={settings.taxRate}
                onChange={(e) =>
                  handleSettingChange(
                    "taxRate",
                    Number.parseFloat(e.target.value)
                  )
                }
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Shipping;
