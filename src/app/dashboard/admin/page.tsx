"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, LayoutGrid, Megaphone, Users } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import Sidebar from "@/components/dashboard/Sidebar";

const AdminDashboardPage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Only admins can stay here
  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.replace("/signin");
      return;
    }
    const role = (session.user as { role?: string }).role;
    if (role !== "admin") {
      router.replace("/dashboard/user");
    }
  }, [isPending, session, router]);

  return (
    <div className="min-h-screen bg-[#f5f4ef] md:pl-64">
      <Sidebar role="admin" />

      <div className="p-6 pt-14 md:pt-6">
        <h1 className="text-2xl font-bold text-[#1e2a4f]">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back, {session?.user?.name}
        </p>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <Users className="w-5 h-5 text-[#ffc20e]" />
            <p className="text-2xl font-bold text-[#1e2a4f] mt-2">0</p>
            <p className="text-sm text-gray-500">Total users</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <CalendarDays className="w-5 h-5 text-[#ffc20e]" />
            <p className="text-2xl font-bold text-[#1e2a4f] mt-2">0</p>
            <p className="text-sm text-gray-500">Total bookings</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <LayoutGrid className="w-5 h-5 text-[#ffc20e]" />
            <p className="text-2xl font-bold text-[#1e2a4f] mt-2">0</p>
            <p className="text-sm text-gray-500">Active services</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <Megaphone className="w-5 h-5 text-[#ffc20e]" />
            <p className="text-2xl font-bold text-[#1e2a4f] mt-2">0</p>
            <p className="text-sm text-gray-500">Notices sent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
