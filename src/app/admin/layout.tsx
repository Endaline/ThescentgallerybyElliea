import AdminLayout from "@/components/admin-layout";
import { SessionProvider } from "next-auth/react";
import type React from "react";
export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {" "}
      <AdminLayout>{children}</AdminLayout>
    </SessionProvider>
  );
}
