import UserLayout from "@/components/user-layout";
import { SessionProvider } from "next-auth/react";
import type React from "react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {" "}
      <UserLayout>{children}</UserLayout>;
    </SessionProvider>
  );
}
