import UserLayout from "@/components/user-layout";
import type React from "react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserLayout>{children}</UserLayout>;
}
