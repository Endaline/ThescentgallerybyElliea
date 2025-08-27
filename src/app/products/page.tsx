"use client";

import { useState } from "react";
import Navigation from "@/components/navigation";
import ProductGrid from "@/components/product-grid";
import ProductFilters from "@/components/product-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid, List } from "lucide-react";
import Footer from "@/components/footer";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: "",
    brand: "",
  });

  return (
    <main className="min-h-screen ">
      <Navigation />

      {/* Header */}
      <div className=" border-b ">
        <div className="max-content padding-x py-20">
          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl font-bold text-charcoal mb-4">
              Our Fragrances
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our complete collection of luxury perfumes, each crafted
              with the finest ingredients.
            </p>
          </div>
        </div>
      </div>

      <div className="max-content padding-x py-20">
        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between pb-10">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 h-5 w-5" />
            <Input
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          <div className="flex items-center gap-4">
            <p>View</p>
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-[#A76BCF] hover:bg-[#A76BCF]/90"
                    : ""
                }
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-[#A76BCF] hover:bg-[#A76BCF]/90"
                    : ""
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
            <ProductFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Products */}
          <div className="flex-1">
            <ProductGrid
              viewMode={viewMode}
              searchQuery={searchQuery}
              filters={filters}
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
