"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  LayoutDashboard,
  LayoutGrid,
  Calendar,
  Users,
  CalendarDays,
  User,
  Megaphone,
  Mail,
  Phone,
  ChevronDown,
  CalendarPlus,
  Wallet,
  LogOut,
} from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";

type SubItem = {
  name: string;
  href: string;
};

type NavItem = {
  name: string;
  href?: string;
  icon: typeof LayoutDashboard;
  children?: SubItem[];
};

// Admin sidebar menu (same as the design)
const adminMenu: NavItem[] = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Services", href: "/admin/services", icon: LayoutGrid },
  { name: "Slots", href: "/admin/slots", icon: Calendar },
  {
    name: "User management",
    icon: Users,
    children: [
      { name: "All users", href: "/admin/users" },
      { name: "Add new user", href: "/admin/users/new" },
    ],
  },
  {
    name: "Booking",
    icon: CalendarDays,
    children: [
      { name: "All bookings", href: "/admin/bookings" },
      { name: "Create booking", href: "/admin/bookings/new" },
    ],
  },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Notice", href: "/admin/notices", icon: Megaphone },
];

// User sidebar menu
const userMenu: NavItem[] = [
  { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
  { name: "Book now", href: "/user/book-now", icon: CalendarPlus },
  { name: "My bookings", href: "/user/my-bookings", icon: CalendarDays },
  { name: "Payments", href: "/user/payments", icon: Wallet },
  { name: "Services", href: "/user/services", icon: LayoutGrid },
  { name: "Profile", href: "/user/profile", icon: User },
  { name: "Notice", href: "/user/notices", icon: Megaphone },
];

// Open/close state comes from the dashboard layout, so page content
// can react to it too
const Sidebar = ({
  role,
  open,
  onToggle,
}: {
  role: "admin" | "user";
  open: boolean;
  onToggle: () => void;
}) => {
  const { data: session } = useSession();
  const user = session?.user;

  // Phone is not a default better-auth field, so we read it safely
  const phone = (user as { phone?: string } | undefined)?.phone;

  const pathname = usePathname();
  const [openSection, setOpenSection] = useState("");

  // Pick the right menu for the role
  const menu = role === "admin" ? adminMenu : userMenu;

  // Open/close a submenu (only one open at a time)
  const toggleSection = (name: string) => {
    if (openSection === name) {
      setOpenSection("");
    } else {
      setOpenSection(name);
    }
  };

  return (
    <>
      {/* Toggle button (sits on the right edge of the sidebar) */}
      <button
        onClick={onToggle}
        className={`fixed top-8 z-50 bg-[#0d1526] text-white p-2 rounded-lg shadow-lg ${
          open ? "block" : "hidden"
        }`}
        style={{ left: "16rem" }}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Reopen button (shows when sidebar is closed) */}
      <button
        onClick={onToggle}
        className={`fixed top-8 left-0 z-50 bg-[#0d1526] text-white p-2 rounded-lg shadow-lg ${
          open ? "hidden" : "block"
        }`}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#0d1526] text-white z-40 overflow-y-auto ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="p-4 flex flex-col min-h-full">
          {/* Profile photo */}
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              className="w-full h-36 object-cover rounded-xl"
              width={144}
              height={144}
            />
          ) : (
            <div className="w-full h-36 rounded-xl bg-[#182238] flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          )}

          {/* Email and phone */}
          <div className="mt-3 space-y-1">
            <div className="flex flex-col items-center gap-2 text-sm text-gray-200 break-all">
              {user?.name}
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                {user?.email}
              </div>
            </div>
            {phone && (
              <div className="flex items-center gap-2 text-sm text-gray-200">
                <Phone className="w-4 h-4 shrink-0" />
                {phone}
              </div>
            )}
          </div>

          {/* Menu items */}
          <div className="mt-6 flex flex-col gap-1 flex-1">
            {menu.map((item) => {
              // Item with submenu
              if (item.children) {
                const isOpen = openSection === item.name;
                return (
                  <div key={item.name}>
                    <button
                      onClick={() => toggleSection(item.name)}
                      className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5"
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      <span className="flex-1 text-left truncate">
                        {item.name}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Submenu links */}
                    {isOpen && (
                      <div className="ml-9 flex flex-col">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="py-1.5 px-2 text-sm text-gray-400 hover:text-[#ffc20e]"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              // Normal link item
              return (
                <Link
                  key={item.name}
                  href={item.href ?? "#"}
                  className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm ${
                    pathname === item.href
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Sign out button pinned to the bottom */}
          <button
            onClick={() => authClient.signOut({ callbackURL: "/signin" })}
            className="mt-auto w-full flex items-center justify-center gap-2 px-2 py-2 rounded-lg text-sm text-white bg-[#1e2a4f] hover:bg-[#ffc20e] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
