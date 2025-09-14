"use client";

import Link from "next/link";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Image
              width={1000}
              height={1000}
              src="/images/logo-3.png"
              alt="logo"
              className="h-26 w-auto object-contain"
            />

            <p className="color leading-relaxed">
              Discover The Scent Gallery by Elliea that define your signature
              style. Premium perfumes crafted for the discerning individual.
            </p>
            <div className="flex space-x-4 mt-2">
              {/* <Button
                variant="ghost"
                size="icon"
                className="color hover:color/80 hover:bg-gray-100 cursor-pointer"
              >
                <Facebook className="h-5 w-5" />
              </Button> */}

              <Link
                href="https://www.instagram.com/thescentgallery_byelliea"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 color hover:color/80 hover:bg-gray-100 px-2 py-1 rounded-lg cursor-pointer"
              >
                <Instagram className="h-5 w-5" />
              </Link>

              <Link
                href="https://www.tiktok.com/@thescentgallery_byelliea"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 color hover:color/80 hover:bg-gray-100 px-2 py-1 rounded-lg cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 48 48"
                  className="h-5 w-5"
                >
                  <path d="M41 15.3a9.6 9.6 0 0 1-6.9-2.9 9.6 9.6 0 0 1-2.9-6.9H26v27.3a6.1 6.1 0 1 1-6.1-6.1c.5 0 1 .1 1.5.2v-6.2c-.5 0-1-.1-1.5-.1a12.4 12.4 0 1 0 12.4 12.4V19.9a15.5 15.5 0 0 0 9.2 3V15.3z" />
                </svg>
              </Link>

              {/* Twitter */}
              {/* <Button
                variant="ghost"
                size="icon"
                className="color hover:color/80 hover:bg-gray-100 cursor-pointer"
              >
                <Twitter className="h-5 w-5" />
              </Button> */}
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold color">Customer Service</h4>
            <div className="space-y-2">
              <Link
                href="/"
                className="block color hover:color/80 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/contact"
                className="block color hover:color/80 transition-colors"
              >
                Contact us
              </Link>
              <Link
                href="/products"
                className="block color hover:color/80 transition-colors"
              >
                Frangrances
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold color">Get in Touch</h4>
            <div className="space-y-3 color">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 color" />
                <span>Thescentgallerybyelliea@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 color" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 color" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="color text-sm">
            &copy; {new Date().getFullYear()} TheScentGallerybyElliea. All
            rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="color hover:color/80 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="color hover:color/80 text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
