import React from "react";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductViewMode = ({
  viewMode,
  setViewMode,
}: {
  viewMode: "grid" | "list";
  setViewMode: (viewMode: "grid" | "list") => void;
}) => {
  return (
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
  );
};

export default ProductViewMode;
