'use client';
import React, { useState } from "react";
import Link from "next/link";
import { LayoutGrid, ArrowLeftRight, Info, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// All links in one array
const links = [
  {
    name: "Services",
    href: "/services",
    icon: LayoutGrid,
  },
  {
    name: "Compare",
    href: "/compare",
    icon: ArrowLeftRight,
  },
  {
    name: "About Us",
    href: "/about",
    icon: Info,
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#f5f4ef]">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-2 text-[#1e2a4f] font-medium hover:text-[#ffc20e]"
            >
              <link.icon className="w-4 h-4" />
              <span>{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-[#1e2a4f] md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>

        {/* Book Now button */}
        <Button className="bg-[#ffc20e] hover:bg-[#e6ae0c] text-white px-6 sm:px-16 h-9 text-sm sm:text-base">
          Book Now
        </Button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#f5f4ef] border-t border-[#1e2a4f]/10 px-4 py-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-2 text-[#1e2a4f] font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              <link.icon className="w-4 h-4" />
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
