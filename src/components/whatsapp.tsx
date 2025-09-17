"use client"; // Ensure this runs on the client-side
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export default function Whatsapp() {
  const handleClick = async (phone_no: string) => {
    if (typeof window !== "undefined") {
      // Remove '+' because wa.me format should not include it
      const cleanNumber = phone_no.replace("+", "");
      window.open(`https://wa.me/${cleanNumber}`, "_blank");
    }
  };

  return (
    <div className="fixed bottom-20 right-10 z-50">
      <motion.button
        className="cursor-pointer"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.6,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
        }}
        onClick={() => handleClick("+2349069521083")}
      >
        <Image
          width={40}
          height={40}
          src="/images/whatsapp.svg"
          alt="WhatsApp Logo"
          className="object-cover w-12 h-12 hover:scale-110 transition-transform"
        />
      </motion.button>
    </div>
  );
}
