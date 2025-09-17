"use client";

import { usePathname } from "next/navigation";

export default function Loading() {
  const path = usePathname();

  // Remove 'admin/' and format nicely
  const formattedPath =
    path ?
      path
        .replace("/admin/", "") // remove 'admin/' from path
        .split("/")
        .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
        .join(" / ")
    : "Page";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-[#770a10] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading {formattedPath}...</p>
      </div>
    </div>
  );
}
