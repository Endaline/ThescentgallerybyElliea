import React from "react";
import { getAllBrand } from "@/app/actions/brand.action";
import AddBrand from "../_components/add-brand";
import Brand from "../_components/brand";
import { requireAdmin } from "@/services/auth-guard";

const page = async () => {
  const brand = await getAllBrand();

  await requireAdmin();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-xl font-bold text-[#9b59b6]">Brand</h1>
          <p className="text-gray-600 mt-1">Manage your brand.</p>
        </div>
        <AddBrand />
      </div>
      <Brand brands={brand.data ?? []} />
    </div>
  );
};

export default page;
