"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Sidebar from "@/components/dashboard/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Sidebar open/close state lives here, so the page content
  // can react when the sidebar is closed
  const [open, setOpen] = useState(true);

  // Admin pages get the admin sidebar, everything else the user sidebar
  const role: "admin" | "user" = pathname.startsWith("/admin")
    ? "admin"
    : "user";

  // Not logged in -> go to sign in
  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  // Wait for the session before showing the dashboard
  if (isPending || !session?.user) {
    return (
      <div className="min-h-screen bg-[#f5f4ef] flex items-center justify-center">
        <p className="text-[#1e2a4f] text-sm">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f4ef]">
      <Sidebar role={role} open={open} onToggle={() => setOpen(!open)} />

      {/* Content: pushes right when sidebar is open, centers when closed */}
      <main className={open ? "md:pl-64" : ""}>
        <div className="p-6 pt-14 md:pt-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
