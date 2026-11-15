"use client";

import React from "react";
import { CalendarDays, LayoutGrid, Megaphone, Users } from "lucide-react";
import { useSession } from "@/lib/auth-client";

const AdminDashboardPage = () => {
  const { data: session } = useSession();

  return (
    <>
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
    </>
  );
};

export default AdminDashboardPage;
