/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ProductFiltersProps {
  filters: {
    priceRange: string;
    brand: string;
  };
  onFiltersChange: (filters: any) => void;
}

export default function ProductFilters({
  filters,
  onFiltersChange,
}: ProductFiltersProps) {
  const brands = [
    "Luxe Parfum",
    "Essence Elite",
    "Royal Scents",
    "Premium Fragrances",
  ];

  const clearFilters = () => {
    onFiltersChange({
      priceRange: "",
      brand: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-charcoal">
          Filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-white hover:text-[#9b59b6]/80 bg-[#9b59b6] cursor-pointer"
        >
          Clear All
        </Button>
      </div>

      {/* Price Range */}
      <Card className="bg-slate-100 text-slate-900">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={filters.priceRange}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, priceRange: value })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="under-100" id="under-100" />
              <Label htmlFor="under-100" className="text-sm">
                Under $100
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="100-200" id="100-200" />
              <Label htmlFor="100-200" className="text-sm">
                $100 - $200
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="200-300" id="200-300" />
              <Label htmlFor="200-300" className="text-sm">
                $200 - $300
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="over-300" id="over-300" />
              <Label htmlFor="over-300" className="text-sm">
                Over $300
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Brand Filter */}
      <Card className="bg-slate-100 text-slate-900">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Brand</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={filters.brand === brand}
                onCheckedChange={(checked) =>
                  onFiltersChange({
                    ...filters,
                    brand: checked ? brand : "",
                  })
                }
              />
              <Label htmlFor={brand} className="text-sm font-normal">
                {brand}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
