"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import { motion } from "framer-motion";
import { ProductBrand } from "@prisma/client";
import EditBrand from "./EditBrand";
import DeleteBrand from "./deletebrand";

const Brand = ({ brands }: { brands: ProductBrand[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <Card>
        <CardContent className="p-0">
          <div className="">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium">Brand</th>
                  <th className="text-left p-4 font-medium">Created At</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand, index) => {
                  return (
                    <motion.tr
                      key={brand.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.3 + index * 0.05,
                        duration: 0.4,
                      }}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <Badge variant="secondary">{brand.name}</Badge>
                      </td>
                      <td className="p-4">
                        <span className="font-medium">
                          {brand.createdAt.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="">
                          <EditBrand
                            brandId={brand.id}
                            brandName={brand.name}
                          />
                          <DeleteBrand
                            brandId={brand.id}
                            brandName={brand.name}
                          />
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {brands.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">
                No brands found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Brand;
