"use client";

import { useState } from "react";
import { Globe, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CompanyInfo } from "@prisma/client";
import { useTransition } from "react";
import {
  createCompanyInfo,
  updateCompanyInfo,
} from "@/app/actions/companyInfo.action";
import { toast } from "sonner";

const BasicInfo = ({ info }: { info: CompanyInfo | null | undefined }) => {
  const [isPending, startTransition] = useTransition();
  const [settings, setSettings] = useState({
    storeName: info?.storeName || "",
    storeDescription: info?.storeDescription || "",
    contactEmail: info?.contactEmail || "",
    supportEmail: info?.supportEmail || "",
    phone: info?.phone || "",
    address: info?.address || "",
  });

  const handleSubmit = async () => {
    startTransition(async () => {
      if (!info) {
        const res = await createCompanyInfo(settings);

        if (!res.success) {
          toast.error(res.message);
          return;
        } else {
          toast.success(res.message);
        }
      } else {
        const res = await updateCompanyInfo(settings, info.id);

        if (!res.success) {
          toast.error(res.message);
          return;
        } else {
          toast.success(res.message);
        }
      }
    });
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Store Information
          </CardTitle>
          <CardDescription>Basic information about your store</CardDescription>
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
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name</Label>
            <Input
              id="storeName"
              value={settings.storeName}
              onChange={(e) => handleSettingChange("storeName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              type="email"
              value={settings.contactEmail}
              onChange={(e) =>
                handleSettingChange("contactEmail", e.target.value)
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="storeDescription">Store Description</Label>
          <Textarea
            id="storeDescription"
            value={settings.storeDescription}
            onChange={(e) =>
              handleSettingChange("storeDescription", e.target.value)
            }
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={settings.phone}
              onChange={(e) => handleSettingChange("phone", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supportEmail">Support Email</Label>
            <Input
              id="supportEmail"
              type="email"
              value={settings.supportEmail}
              onChange={(e) =>
                handleSettingChange("supportEmail", e.target.value)
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Business Address</Label>
          <Textarea
            id="address"
            value={settings.address}
            onChange={(e) => handleSettingChange("address", e.target.value)}
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfo;
