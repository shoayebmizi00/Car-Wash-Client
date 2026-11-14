"use client";

import React, { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

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
  { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Services", href: "/dashboard/admin/services", icon: LayoutGrid },
  { name: "Slots", href: "/dashboard/admin/slots", icon: Calendar },
  {
    name: "User management",
    icon: Users,
    children: [
      { name: "All users", href: "/dashboard/admin/users" },
      { name: "Add new user", href: "/dashboard/admin/users/new" },
    ],
  },
  {
    name: "Booking",
    icon: CalendarDays,
    children: [
      { name: "All bookings", href: "/dashboard/admin/bookings" },
      { name: "Create booking", href: "/dashboard/admin/bookings/new" },
    ],
  },
  {
    name: "Profile",
    icon: User,
    children: [
      { name: "View profile", href: "/dashboard/admin/profile" },
      { name: "Change password", href: "/dashboard/admin/profile/password" },
    ],
  },
  {
    name: "Notice",
    icon: Megaphone,
    children: [{ name: "All notices", href: "/dashboard/admin/notices" }],
  },
];

// User sidebar menu
const userMenu: NavItem[] = [
  { name: "Dashboard", href: "/dashboard/user", icon: LayoutDashboard },
  { name: "Book now", href: "/dashboard/user/book", icon: CalendarPlus },
  { name: "My bookings", href: "/dashboard/user/bookings", icon: CalendarDays },
  { name: "Payments", href: "/dashboard/user/payments", icon: Wallet },
  { name: "Services", href: "/dashboard/user/services", icon: LayoutGrid },
  {
    name: "Profile",
    icon: User,
    children: [
      { name: "View profile", href: "/dashboard/user/profile" },
      { name: "Change password", href: "/dashboard/user/profile/password" },
    ],
  },
  {
    name: "Notice",
    icon: Megaphone,
    children: [{ name: "All notices", href: "/dashboard/user/notices" }],
  },
];

const Sidebar = ({ role }: { role: "admin" | "user" }) => {
  const { data: session } = useSession();
  const user = session?.user;

  // Phone is not a default better-auth field, so we read it safely
  const phone = (user as { phone?: string } | undefined)?.phone;

  const pathname = usePathname();
  const [open, setOpen] = useState(true);
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
        onClick={() => setOpen(!open)}
        className="fixed top-8 z-50 bg-[#0d1526] text-white p-2 rounded-lg shadow-lg"
        style={{ left: open ? "16rem" : "0rem" }}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#0d1526] text-white z-40 overflow-y-auto transition-all duration-200 ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="p-4">
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
            <p className="flex items-center gap-2 text-sm text-gray-200 break-all">
              <Mail className="w-4 h-4 shrink-0" />
              {user?.email}
            </p>
            {phone && (
              <p className="flex items-center gap-2 text-sm text-gray-200">
                <Phone className="w-4 h-4 shrink-0" />
                {phone}
              </p>
            )}
          </div>

          {/* Menu items */}
          <div className="mt-6 flex flex-col gap-1">
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
                      <span className="flex-1 text-left truncate">{item.name}</span>
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
        </div>
      </div>
    </>
  );
};

export default Sidebar;
