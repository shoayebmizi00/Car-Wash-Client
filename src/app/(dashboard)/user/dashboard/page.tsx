"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const DashboardPage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Wait until the session is loaded
    if (isPending) return;

    // Not logged in -> go to sign in
    if (!session?.user) {
      router.replace("/signin");
      return;
    }

    // Role is not a default better-auth field, so we read it safely
    const role = (session.user as { role?: string }).role;

    if (role === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/user");
    }
  }, [isPending, session, router]);

  return (
    <div className="min-h-screen bg-[#f5f4ef] flex items-center justify-center">
      <p className="text-[#1e2a4f] text-sm">Loading dashboard...</p>
    </div>
  );
};

export default DashboardPage;
