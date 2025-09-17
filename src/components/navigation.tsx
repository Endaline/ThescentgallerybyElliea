"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Menu,
  X,
  User,
  LogIn,
  UserPlus,
  Package,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Session } from "next-auth";
import { signOutUser } from "@/app/actions/user.actions";
import { useRouter } from "next/navigation";

export default function Navigation({
  cartCount,
  session,
}: {
  cartCount: number;
  session: Session | null;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const email = session?.user.email;
  const name = session?.user.name;
  const role = session?.user.role;

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-content padding-x">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image
                width={60}
                height={60}
                src="/images/logo-3.png"
                alt="logo"
                className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="ml-3 hidden lg:block">
              <span className="text-xl font-bold color ">
                ThescentgallerybyElliea
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Fragrances" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-gray-800 hover:text-[#770a10]  font-medium transition-all duration-200 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#770a10] to-[#335235] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-10 w-10 rounded-full  
                   transition-all duration-200 group cursor-pointer"
                >
                  <User className="h-5 w-5" />
                  {session && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 bg-white/95 backdrop-blur-md border-gray-200/50 shadow-xl"
              >
                {session ?
                  <>
                    <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                      <p className="text-sm font-semibold text-gray-900">
                        {name}
                      </p>
                      <p className="text-xs text-gray-600 truncate">{email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-[#770a10] text-xs font-medium rounded-full">
                        {role === "admin" ? "Admin" : "Customer"}
                      </span>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href={role === "admin" ? "/admin" : "/account/profile"}
                        className="flex items-center px-4 py-2 hover:bg-purple-50 transition-colors cursor-pointer"
                      >
                        <User className="mr-3 h-4 w-4 text-[#770a10] cursor-pointer" />
                        <span className="font-medium">
                          {role === "admin" ? "Admin Dashboard" : "My Profile"}
                        </span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          role !== "admin" ? "/admin/orders" : "/account/orders"
                        }
                        className="flex items-center px-4 py-2 hover:bg-purple-50 transition-colors cursor-pointer"
                      >
                        <Package className="mr-3 h-4 w-4 text-[#770a10]" />
                        <span className="font-medium">
                          {role === "admin" ? "Manage Orders" : "My Orders"}
                        </span>
                      </Link>
                    </DropdownMenuItem>
                    {/* {role !== "admin" && (
                      <DropdownMenuItem asChild>
                        <Link
                          href="/account/wishlist"
                          className="flex items-center px-4 py-2 hover:bg-purple-50 transition-colors cursor-pointer"
                        >
                          <Heart className="mr-3 h-4 w-4 text-[#770a10]/90" />
                          <span className="font-medium">Wishlist</span>
                        </Link>
                      </DropdownMenuItem>
                    )} */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={async () => {
                        await signOutUser();
                        router.push("/login");
                      }}
                      className="text-red-600 focus:text-red-600 hover:bg-red-50 px-4 py-2 cursor-pointer font-medium"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </>
                : <>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/login"
                        className="flex items-center px-4 py-2 hover:bg-purple-50 transition-colors cursor-pointer"
                      >
                        <LogIn className="mr-3 h-4 w-4 text-[#770a10]" />
                        <span className="font-medium">Sign In</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/register"
                        className="flex items-center px-4 py-2 hover:bg-purple-50 transition-colors cursor-pointer"
                      >
                        <UserPlus className="mr-3 h-4 w-4 text-[#770a10]" />
                        <span className="font-medium">Create Account</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                }
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Shopping Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 rounded-full hover:bg-purple-50 hover:text-[#770a10]/90 transition-all duration-200 group"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <>
                    <span className="absolute -top-2 -right-2 text-[#770a10]  text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                    <span className="absolute -top-2 -right-2 text-[#770a10] rounded-full h-6 w-6 animate-ping opacity-75"></span>
                  </>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-10 w-10 rounded-full hover:bg-purple-50 hover:text-[#770a10]/90 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ?
                <X className="h-5 w-5" />
              : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="px-4 py-6 space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Fragrances" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:text-[#770a10]/90 hover:bg-purple-50 font-medium transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-gray-200 pt-4 mt-6">
                {session ?
                  <div className="space-y-3">
                    <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-900">
                        {name}
                      </p>
                      <p className="text-xs text-gray-600">{email}</p>
                    </div>
                    <Link
                      href={role === "admin" ? "/admin" : "/account/profile"}
                      className="block px-4 py-3 rounded-lg text-gray-700 hover:text-[#770a10]/90 hover:bg-purple-50 font-medium transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {role === "admin" ? "Admin Dashboard" : "My Profile"}
                    </Link>
                    <Link
                      href={
                        role === "admin" ? "/admin/orders" : "/account/orders"
                      }
                      className="block px-4 py-3 rounded-lg text-gray-700 hover:text-[#770a10]/90 hover:bg-purple-50 font-medium transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {role === "admin" ? "Manage Orders" : "My Orders"}
                    </Link>
                    <button
                      onClick={async () => {
                        await signOutUser();
                        router.push("/login");
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-all duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                : <div className="space-y-3">
                    <Link
                      href="/login"
                      className="block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button className="w-full bg-gradient-to-r from-[#770a10]/90 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                        Sign In
                      </Button>
                    </Link>
                    <Link
                      href="/register"
                      className="block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full border-purple-200 text-[#770a10]/90 hover:bg-purple-50 font-medium py-3 rounded-lg transition-all duration-200"
                      >
                        Create Account
                      </Button>
                    </Link>
                  </div>
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
