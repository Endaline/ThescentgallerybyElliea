"use client";

import React from "react";
import AddBrand from "./AddBrand";
import AdminLayout from "@/components/admin-layout";
import { motion } from "framer-motion";

const page = () => {
  return (
    <AdminLayout>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#A76BCF]">
              Products
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your perfume inventory and product catalog.
            </p>
          </div>

          <AddBrand />
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default page;
