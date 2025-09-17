"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Package, LogOut, Menu, X, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { signOutUser } from "@/app/actions/user.actions";

const navigation = [
  { name: "My Orders", href: "/account", icon: Package },
  { name: "Profile", href: "/account/profile", icon: User },
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const session = useSession();

  const email = session.data?.user.email;
  const name = session.data?.user.name;
  const img = session.data?.user.image;
  const router = useRouter();

  return (
    <div className="min-h-screen ">
      {/* Mobile sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : "-100%" }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-100  shadow-xl lg:hidden"
      >
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <h2 className="font-serif text-xl text-burgundy-600">My Account</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 mb-1 rounded-lg text-sm font-medium transition-colors ${
                  isActive ?
                    "bg-[#770a10] text-slate-50"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </motion.div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w4 lg:flex-col">
        <div className="flex flex-col flex-grow bg-slate-100 border-r border-gray-200">
          <div className="flex items-center h-16 px-6 border-b">
            <h2 className="font-serif text-xl text-burgundy-600">My Account</h2>
          </div>

          <div className="flex flex-col items-center py-6 px-6 border-b">
            <Avatar className="h-16 w-16 mb-3">
              <AvatarImage src={img ?? "/elegant-woman-profile.png"} />
              <AvatarFallback className="bg-burgundy-100 text-burgundy-600 text-lg">
                {name?.charAt(0).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{email}</p>
          </div>

          <nav className="flex-1 px-3 py-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 mb-1 rounded-lg text-sm font-medium transition-colors ${
                    isActive ?
                      "bg-[#770a10] text-slate-50"
                    : "hover:bg-[#770a10]/10 text-slate-800"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t">
            <Button
              variant="ghost"
              onClick={async () => {
                await signOutUser();

                router.push("/");
              }}
              className="w-full justify-start text-gray-600 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="flex h-16 items-center justify-between px-4 border-b bg-white lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-serif text-lg text-burgundy-600">My Account</h1>
          <div className="w-10" />
        </div>

        {/* Page content */}
        <main className="flex-1">{children}</main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
