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

  console.log("role", role);

  return (
    <nav className="bg-gray-50 border-b border-gray-200 color sticky top-0 z-50 ">
      <div className="max-content padding-x py-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center ">
            <Image
              width={1000}
              height={1000}
              src="/images/logo-3.png"
              alt="logo"
              className="h-20 w-auto object-contain"
            />

            <span className="text-2xl font-semibold color hidden lg:block ">
              ThescentgallerybyElliea
            </span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-charcoal hover:text-burgundy font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-charcoal hover:text-burgundy font-medium"
            >
              Fragrances
            </Link>

            <Link
              href="/contact"
              className="text-charcoal hover:text-burgundy font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-charcoal hover:color/80 cursor-pointer"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-50">
                {session ?
                  <>
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium">{name}</p>
                      <p className="text-xs text-gray-500">{email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href={role === "admin" ? "/admin" : "/account"}
                        className="flex items-center cursor-pointer"
                      >
                        <User className="mr-2 h-4 w-4" />
                        {role === "admin" ? "Admin" : "My Account"}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          role !== "admin" ? "/admin/orders" : "/account/orders"
                        }
                        className="flex items-center"
                      >
                        <Package className="mr-2 h-4 w-4" />
                        {role === "admin" ? "Orders" : "My Orders"}
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={async () => {
                        await signOutUser();

                        router.push("/login");
                      }}
                      className="text-red-600 focus:text-red-600 cursor-pointer"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </>
                : <div>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/login"
                        className="flex items-center cursor-pointer"
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/register"
                        className="flex items-center cursor-pointer"
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create Account
                      </Link>
                    </DropdownMenuItem>
                  </div>
                }
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-charcoal hover:color/90 relative cursor-pointer"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-slate-100 text-[#9b59b6] text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-charcoal hover:text-burgundy"
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
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/products"
                className="text-charcoal hover:text-burgundy font-medium"
              >
                Fragrances
              </Link>

              <Link
                href="/contact"
                className="text-charcoal hover:text-burgundy font-medium"
              >
                Contact
              </Link>

              <div className="border-t border-gray-100 pt-4 mt-4">
                {session ?
                  <>
                    <Link
                      href={role === "admin" ? "/admin" : "/account"}
                      className="block text-charcoal hover:text-burgundy font-medium mb-2 cursor-pointer"
                    >
                      {role === "admin" ? "Admin" : "My Account"}
                    </Link>
                    <Link
                      href={
                        role === "admin" ? "/admin/orders" : "/account/order"
                      }
                      className="block text-charcoal hover:text-burgundy font-medium mb-2"
                    >
                      {role === "admin" ? "Orders" : "My Orders"}
                    </Link>
                    <Link
                      href={
                        role === "admin" ? "/admin/settings" : (
                          "/account/wishlist"
                        )
                      }
                      className="block text-charcoal hover:text-burgundy font-medium mb-2"
                    >
                      {role === "admin" ? "Settings" : "Wishlist"}
                    </Link>
                    <button
                      onClick={async () => {
                        await signOutUser();

                        router.push("/login");
                      }}
                      className="block text-red-600 hover:text-red-700 font-medium cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </>
                : <>
                    <Link
                      href="/login"
                      className="block text-charcoal hover:text-burgundy font-medium mb-2 cursor-pointer"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="block text-charcoal hover:text-burgundy font-medium cursor-pointer"
                    >
                      Create Account
                    </Link>
                  </>
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
