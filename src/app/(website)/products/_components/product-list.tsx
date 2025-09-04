"use client";

import { useState } from "react";
import ProductGrid from "@/app/(website)/products/_components/product-grid";
import ProductFilters from "@/app/(website)/products/_components/product-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid, List, SearchIcon } from "lucide-react";
import { GenProduct } from "@/lib/types/type";

const ProductList = ({
  products,
  brands,
}: {
  products: GenProduct[];
  brands: string[];
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: "",
    brand: "",
  });

  return (
    <div className="max-content padding-x py-20">
      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between pb-10">
        <form
          action="/products"
          method="GET"
          className="relative flex-1 max-w-md"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 h-5 w-5" />
          <Input placeholder="Search fragrances..." className="pl-10 h-12" />
          <Button className="bg-[#A76BCF] absolute top-1/2 right-0">
            <SearchIcon />
          </Button>
        </form>

        <div className="flex items-center gap-4">
          <p>View</p>
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={
                viewMode === "grid" ? "bg-[#A76BCF] hover:bg-[#A76BCF]/90" : ""
              }
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={
                viewMode === "list" ? "bg-[#A76BCF] hover:bg-[#A76BCF]/90" : ""
              }
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block w-64 flex-shrink-0`}
        >
          <ProductFilters
            brands={brands}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Products */}
        <div className="flex-1">
          <ProductGrid
            products={products}
            viewMode={viewMode}
            searchQuery={searchQuery}
            filters={filters}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
