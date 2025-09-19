"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const heroImages = [
    { src: "/images/heroImage1.jpg", alt: "Artistic curved perfume bottle" },
    {
      src: "/images/heroImage.jpg",
      alt: "Elegant luxury perfume with flowing smoke",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, i) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={i === index}
              className="object-cover "
            />
            <div className="absolute inset-0 bg-gradient-hero opacity-60" />
          </motion.div>
        ))}
      </div>

      {/* Content aligned left */}
      <div className="relative z-10 w-full">
        <div className="max-content padding-x flex items-center min-h-screen">
          <div className="max-w-2xl text-left">
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Capture Your
              <span className="text-[#770a10]"> Essence</span>
            </h1>

            <p className="font-inter text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Discover The Scent Gallery by Elliea – luxury fragrances crafted
              with the finest ingredients to create unforgettable scents that
              define your essence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => router.push("/products")}
                size="lg"
                className="bg-[#770a10] hover:bg-primary-glow text-primary-foreground font-inter font-medium px-8 py-4 shadow-luxury transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
              >
                Explore Collection
              </Button>

              <Button
                onClick={() => router.push("/contact")}
                variant="outline"
                size="lg"
                className="border-[#770a10] bg-transparent text-white cursor-pointer font-inter font-medium px-8 py-4 transition-all duration-300 hover:scale-105"
              >
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
    </section>
  );
};

export default Hero;
