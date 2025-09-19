"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const CollapsibleBrandsFilter = ({
  allBrandList,
  brand,
}: {
  allBrandList: string[];
  brand: string;
}) => {
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const searchParams = useSearchParams();

  const getFilterUrl = (newBrand: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("brand", newBrand);
    return `/products?${params.toString()}`;
  };

  return (
    <Card className="bg-slate-100 text-slate-900">
      <CardHeader className="pb-3">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsBrandsOpen(!isBrandsOpen)}
        >
          <CardTitle className="text-base">Brand</CardTitle>
          {isBrandsOpen ?
            <ChevronUp className="h-4 w-4 text-slate-600" />
          : <ChevronDown className="h-4 w-4 text-slate-600" />}
        </div>
      </CardHeader>

      {isBrandsOpen && (
        <CardContent className="space-y-3 pt-0">
          {allBrandList.map((item, index) => {
            return (
              <Link
                href={getFilterUrl(item.toLowerCase())}
                key={index}
                className="flex items-center space-x-2"
              >
                <div
                  className={cn(
                    "rounded-full border",
                    brand === item.toLowerCase() ?
                      "border-[#770a10]"
                    : "border-neutral-400"
                  )}
                >
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full m-0.5",
                      brand === item.toLowerCase() ?
                        "bg-[#770a10]"
                      : "bg-transparent border border-neutral-400"
                    )}
                  ></div>
                </div>

                <p
                  className={`text-sm hover:text-[#770a10] transition-all ${
                    brand === item.toLowerCase() && "font-bold text-[#770a10]"
                  }`}
                >
                  {item}
                </p>
              </Link>
            );
          })}
        </CardContent>
      )}
    </Card>
  );
};

export default CollapsibleBrandsFilter;
