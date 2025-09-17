"use client";

import { useState } from "react";
import ProductGrid from "@/app/(website)/products/_components/product-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SearchIcon } from "lucide-react";
import { GenCart, GenProduct } from "@/lib/types/type";
import ProductViewMode from "./product-view-mode";

const ProductList = ({
  products,
  query,
  cart,
}: {
  products: GenProduct[];
  query?: string;
  cart: GenCart | undefined;
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="md:col-span-2 lg:col-span-3 padding-x">
      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between pb-10">
        <form
          action="/products"
          method="GET"
          className="relative flex-1 max-w-md"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 h-5 w-5" />
          <Input
            defaultValue={query ?? ""}
            name="query"
            type="text"
            placeholder="Search fragrances..."
            className="pl-10 h-12"
          />
          <Button className="bg-[#770a10] absolute top-2 right-2">
            <SearchIcon />
          </Button>
        </form>

        <ProductViewMode viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="flex-1">
          <ProductGrid products={products} viewMode={viewMode} cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
