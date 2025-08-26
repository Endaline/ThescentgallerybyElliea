"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-[#512260] border-slate-200">
      <div className="max-content padding-x py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-200">Perf</h3>
            <p className="text-gray-200 leading-relaxed">
              Discover luxury fragrances that define your signature style.
              Premium perfumes crafted for the discerning individual.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-200 hover:text-[#9b59b6] hover:bg-slate-800 cursor-pointer"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-200 hover:text-[#9b59b6] hover:bg-slate-800 cursor-pointer"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-200 hover:text-[#9b59b6] hover:bg-slate-800 cursor-pointer"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-200">Quick Links</h4>
            <div className="space-y-2">
              <Link
                href="/shop"
                className="block text-gray-200 hover:text-[#9b59b6] transition-colors"
              >
                Shop All
              </Link>
              <Link
                href="/new-arrivals"
                className="block text-gray-200 hover:text-[#9b59b6] transition-colors"
              >
                New Arrivals
              </Link>
              <Link
                href="/bestsellers"
                className="block text-gray-200 hover:text-[#9b59b6] transition-colors"
              >
                Best Sellers
              </Link>
              <Link
                href="/gift-sets"
                className="block text-gray-200 hover:text-[#9b59b6] transition-colors"
              >
                Gift Sets
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-200">
              Customer Service
            </h4>
            <div className="space-y-2">
              <Link
                href="/contact"
                className="block text-gray-200 hover:text-[#9b59b6] transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/shipping"
                className="block text-gray-200 hover:text-[#9b59b6] transition-colors"
              >
                Shipping Info
              </Link>
              <Link
                href="/returns"
                className="block text-gray-200 hover:text-[#9b59b6] transition-colors"
              >
                Returns
              </Link>
              <Link
                href="/faq"
                className="block text-gray-200 hover:text-[#9b59b6] transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-200">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-200">
                <Mail className="h-4 w-4 text-[#9b59b6]" />
                <span>hello@perf.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-200">
                <Phone className="h-4 w-4 text-[#9b59b6]" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-200">
                <MapPin className="h-4 w-4 text-[#9b59b6]" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-200 text-sm">
            © 2024 Perf. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-gray-200 hover:text-[#9b59b6] text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-200 hover:text-[#9b59b6] text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
