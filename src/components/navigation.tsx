"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className=" sticky top-0 z-50 shadow bg-gradient-to-br from-purple-300 to-purple-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-12 h-12"
            >
              <circle cx="32" cy="32" r="30" fill="white" />
              <path
                d="M32 18c-4 6-4 10 0 14s4 8 0 14"
                stroke="#9b59b6"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-2xl font-semibold text-white">
              The Scent Gallery
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-white/80 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-white hover:text-white/80 font-medium transition-colors"
            >
              Fragrances
            </Link>
            {/* <Link
              href="/collections"
              className="text-white hover:text-white/80 font-medium transition-colors"
            >
              Collections
            </Link> */}
            <Link
              href="/about"
              className="text-white hover:text-white/80 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-white/80 font-medium transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-white/80 hover:bg-white/10"
            >
              <User className="h-5 w-5" />
            </Button>
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white/80 hover:bg-white/10 relative"
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
              className="md:hidden text-white hover:text-white/80 hover:bg-white/10"
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
                className="text-white hover:text-white/80 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-white hover:text-white/80 font-medium transition-colors"
              >
                Fragrances
              </Link>
              {/* <Link
                href="/collections"
                className="text-white hover:text-white/80 font-medium transition-colors"
              >
                Collections
              </Link> */}
              <Link
                href="/about"
                className="text-white hover:text-white/80 font-medium transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-white/80 font-medium transition-colors"
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
