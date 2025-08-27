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
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-[#512260]">Perf</h3>
            <p className="text-[#512260] leading-relaxed">
              Discover luxury fragrances that define your signature style.
              Premium perfumes crafted for the discerning individual.
            </p>
            <div className="flex space-x-4 mt-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#512260] hover:text-[#9b59b6] hover:bg-gray-100 cursor-pointer"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#512260] hover:text-[#9b59b6] hover:bg-gray-100 cursor-pointer"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#512260] hover:text-[#9b59b6] hover:bg-gray-100 cursor-pointer"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-[#512260]">
              Customer Service
            </h4>
            <div className="space-y-2">
              <Link
                href="/contact"
                className="block text-[#512260] hover:text-[#9b59b6] transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/shipping"
                className="block text-[#512260] hover:text-[#9b59b6] transition-colors"
              >
                Shipping Info
              </Link>
              <Link
                href="/returns"
                className="block text-[#512260] hover:text-[#9b59b6] transition-colors"
              >
                Returns
              </Link>
              <Link
                href="/faq"
                className="block text-[#512260] hover:text-[#9b59b6] transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-[#512260]">
              Get in Touch
            </h4>
            <div className="space-y-3 text-[#512260]">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#9b59b6]" />
                <span>hello@perf.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#9b59b6]" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-[#9b59b6]" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Newsletter / Call to Action */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-[#512260]">
              Stay Updated
            </h4>
            <p className="text-[#512260] leading-relaxed">
              Subscribe to our newsletter to get the latest updates and offers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#512260]"
              />
              <Button className="bg-[#512260] hover:bg-[#9b59b6] text-white px-6 py-2 rounded-md">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#512260] text-sm">
            &copy; 2024 Perf. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-[#512260] hover:text-[#9b59b6] text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[#512260] hover:text-[#9b59b6] text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
