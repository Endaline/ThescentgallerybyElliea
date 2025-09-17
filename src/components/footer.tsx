"use client";

import Link from "next/link";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white py-10">
      <div className="max-content padding-x  ">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Logo + Socials */}
          <div>
            <Image
              width={120}
              height={120}
              src="/images/logo-3.png"
              alt="logo"
              className="h-16 w-auto object-contain"
            />

            <p className="mt-4 text-sm  leading-relaxed">
              Discover timeless fragrances crafted with elegance and passion.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              <Link
                href="https://www.instagram.com/thescentgallery_byelliea"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full  hover:bg-pink-600 transition-colors"
              >
                <Instagram className="h-5 w-5 " />
              </Link>

              <Link
                href="https://www.tiktok.com/@thescentgallery_byelliea"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full  hover:bg-pink-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 48 48"
                  className="h-5 w-5 "
                >
                  <path d="M41 15.3a9.6 9.6 0 0 1-6.9-2.9 9.6 9.6 0 0 1-2.9-6.9H26v27.3a6.1 6.1 0 1 1-6.1-6.1c.5 0 1 .1 1.5.2v-6.2c-.5 0-1-.1-1.5-.1a12.4 12.4 0 1 0 12.4 12.4V19.9a15.5 15.5 0 0 0 9.2 3V15.3z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold  mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover: transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover: transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover: transition-colors">
                  Fragrances
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold  mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 color" />
                <span>Thescentgallerybyelliea@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 color" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 color" />
                <span>New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm ">
          <p>
            &copy; {new Date().getFullYear()} TheScentGallerybyElliea. All
            rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="hover: transition-colors hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover: transition-colors hover:underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
