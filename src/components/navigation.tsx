// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { ShoppingBag, Menu, X, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// export default function Navigation() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <nav className="sticky top-0 z-50 shadow bg-gray-50 backdrop-blur-md border-b border-white/20">
//       <div className=" max-content padding-x">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <Image
//               width={1000}
//               height={1000}
//               src="/images/Logo.svg"
//               alt="logo"
//               className="h-20 w-auto"
//             />
//             <span className="text-2xl font-semibold text-[#512260] ">
//               ThescentgallerybyElliea
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8 text-[#512260]">
//             <Link href="/" className=" hover:/80 font-medium transition-colors">
//               Home
//             </Link>
//             <Link
//               href="/products"
//               className=" hover:/80 font-medium transition-colors"
//             >
//               Fragrances
//             </Link>
//             {/* <Link
//               href="/collections"
//               className=" hover:/80 font-medium transition-colors"
//             >
//               Collections
//             </Link> */}
//             <Link
//               href="/about"
//               className=" hover:/80 font-medium transition-colors"
//             >
//               About
//             </Link>
//             <Link
//               href="/contact"
//               className=" hover:/80 font-medium transition-colors"
//             >
//               Contact
//             </Link>
//           </div>

//           {/* Right side icons */}
//           <div className="flex items-center space-x-4">
//             <Link href="/auth" className=" hover:/80 hover:bg-white/10">
//               <User className="h-5 w-5" />
//             </Link>
//             <Link href="/cart">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className=" hover:/80 hover:bg-white/10 relative"
//               >
//                 <ShoppingBag className="h-5 w-5" />
//                 <span className="absolute -top-1 -right-1 bg-white text-[#9b59b6] text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
//                   3
//                 </span>
//               </Button>
//             </Link>

//             {/* Mobile menu button */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="md:hidden  hover:/80 hover:bg-white/10"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? (
//                 <X className="h-5 w-5" />
//               ) : (
//                 <Menu className="h-5 w-5" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden border-t border-white/20 py-4">
//             <div className="flex flex-col space-y-4">
//               <Link
//                 href="/"
//                 className=" hover:/80 font-medium transition-colors"
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/products"
//                 className=" hover:/80 font-medium transition-colors"
//               >
//                 Fragrances
//               </Link>
//               {/* <Link
//                 href="/collections"
//                 className=" hover:/80 font-medium transition-colors"
//               >
//                 Collections
//               </Link> */}
//               <Link
//                 href="/about"
//                 className=" hover:/80 font-medium transition-colors"
//               >
//                 About
//               </Link>
//               <Link
//                 href="/contact"
//                 className=" hover:/80 font-medium transition-colors"
//               >
//                 Contact
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

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
  Settings,
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

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  return (
    <nav className="bg-gray-50 border-b border-gray-200 text-[#512260] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
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

            {/* <Link
              href="/about"
              className="text-charcoal hover:text-burgundy font-medium"
            >
              About
            </Link> */}
            <Link
              href="/contact"
              className="text-charcoal hover:text-burgundy font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* <Button
              variant="ghost"
              size="icon"
              className="text-charcoal hover:text-burgundy"
            >
              <Search className="h-5 w-5" />
            </Button> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-charcoal hover:text-[#512260]/80 cursor-pointer"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-50">
                {isLoggedIn ? (
                  <>
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/account/orders"
                        className="flex items-center"
                      >
                        <Package className="mr-2 h-4 w-4" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href="/account/settings"
                        className="flex items-center"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setIsLoggedIn(false)}
                      className="text-red-600 focus:text-red-600"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <div>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/login" className="flex items-center">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/register" className="flex items-center">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create Account
                      </Link>
                    </DropdownMenuItem>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-charcoal hover:text-[#512260]/90 relative cursor-pointer"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-slate-100 text-[#9b59b6] text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  3
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
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/products"
                className="text-charcoal hover:text-burgundy font-medium"
              >
                Fragrances
              </Link>
              <Link
                href="/collections"
                className="text-charcoal hover:text-burgundy font-medium"
              >
                Collections
              </Link>
              <Link
                href="/about"
                className="text-charcoal hover:text-burgundy font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-charcoal hover:text-burgundy font-medium"
              >
                Contact
              </Link>

              <div className="border-t border-gray-100 pt-4 mt-4">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/account"
                      className="block text-charcoal hover:text-burgundy font-medium mb-2"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      className="block text-charcoal hover:text-burgundy font-medium mb-2"
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/account/wishlist"
                      className="block text-charcoal hover:text-burgundy font-medium mb-2"
                    >
                      Wishlist
                    </Link>
                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="block text-red-600 hover:text-red-700 font-medium"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="block text-charcoal hover:text-burgundy font-medium mb-2"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block text-charcoal hover:text-burgundy font-medium"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
