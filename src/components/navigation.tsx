"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 shadow bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className=" max-content padding-x">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              width={1000}
              height={1000}
              src="/images/Logo.svg"
              alt="logo"
              className="h-20 w-auto"
            />
            <span className="text-2xl font-semibold text-[#512260] ">
              ThescentgallerybyElliea
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-[#512260]">
            <Link href="/" className=" hover:/80 font-medium transition-colors">
              Home
            </Link>
            <Link
              href="/products"
              className=" hover:/80 font-medium transition-colors"
            >
              Fragrances
            </Link>
            {/* <Link
              href="/collections"
              className=" hover:/80 font-medium transition-colors"
            >
              Collections
            </Link> */}
            <Link
              href="/about"
              className=" hover:/80 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className=" hover:/80 font-medium transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className=" hover:/80 hover:bg-white/10"
            >
              <User className="h-5 w-5" />
            </Button>
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className=" hover:/80 hover:bg-white/10 relative"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-white text-[#9b59b6] text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  3
                </span>
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden  hover:/80 hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className=" hover:/80 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/products"
                className=" hover:/80 font-medium transition-colors"
              >
                Fragrances
              </Link>
              {/* <Link
                href="/collections"
                className=" hover:/80 font-medium transition-colors"
              >
                Collections
              </Link> */}
              <Link
                href="/about"
                className=" hover:/80 font-medium transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className=" hover:/80 font-medium transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
