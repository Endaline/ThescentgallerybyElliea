"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[80vh] flex items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-image.webp')" }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative z-10"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white">
              The Scent Gallery
            </h1>
            <p className="mt-4 text-lg text-gray-200">
              Discover timeless scents crafted with elegance.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
