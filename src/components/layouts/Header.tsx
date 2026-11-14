import React from "react";
import Link from "next/link";
import { MessageCircle, User, LogIn, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <div className="bg-[#1e2a4f]">
      <div className="container mx-auto flex items-center justify-between px-4 py-2.5">
        {/* Logo */}
        <div className="w-11 h-11 rounded-full bg-[#4a3f8f] ring-2 ring-white/10 flex items-center justify-center text-2xl shrink-0">
          <Link href="/">🚗</Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-5 sm:gap-7">
          {/* Phone number - hidden on small screens */}
          <Link
            href="tel:+8801708785180"
            className="text-white/90 text-sm hover:text-[#ffc20e] transition-colors hidden md:block"
          >
            Call us now +880170878-5180
          </Link>

          {/* WhatsApp icon button */}
          <Link
            href="tel:+8801708785180"
            className="text-white/90 hover:text-[#ffc20e] transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </Link>

          {/* User icon with shadcn dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-white/90 hover:text-[#ffc20e] transition-colors outline-none">
              <User className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                render={<Link href="/signin" />}
                className="cursor-pointer"
              >
                <LogIn />
                Sign In
              </DropdownMenuItem>
              <DropdownMenuItem
                render={<Link href="/signup" />}
                className="cursor-pointer"
              >
                <UserPlus />
                Sign Up
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
