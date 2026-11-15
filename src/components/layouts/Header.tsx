"use client";

import Link from "next/link";
import { MessageCircle, User, LogIn, UserPlus, LayoutDashboard, LogOut } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
  // Get the logged in user (null when not logged in)
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

  return (
    <div className="bg-[#1e2a4f]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2.5">

        {/* Logo */}
        <div className="w-11 h-11 rounded-full bg-[#4a3f8f] ring-2 ring-white/10 flex items-center justify-center text-2xl shrink-0">
          🚗
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

          {/* User icon with dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-white/90 hover:text-[#ffc20e] transition-colors outline-none">
              {/* Show profile image when logged in, plain icon otherwise */}
              {user?.image ? (
                <div className="flex items-center">
                  <Image
                    src={user.image}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white/20"
                    width={32}
                    height={32}
                  />
                  <div className="text-white/90 text-sm ml-2 hidden sm:inline">{user.name}</div>
                </div>
              ) : (
                <User className="w-5 h-5" />
              )}
            </DropdownMenuTrigger>

            {/* Not logged in: show sign in / sign up */}
            {!isPending && !user && (
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
            )}

            {/* Logged in: show dashboard / sign out */}
            {!isPending && user && (
              <DropdownMenuContent align="end" className="w-44">
                {/* User info at the top */}
                <div className="px-2 py-1.5 border-b border-gray-100">
                  <p className="text-sm font-semibold text-[#1e2a4f] truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>

                <DropdownMenuItem
                  render={
                    <Link
                      href={
                        (user as { role?: string }).role === "admin"
                          ? "/admin/dashboard"
                          : "/user/dashboard"
                      }
                    />
                  }
                  className="cursor-pointer mt-1"
                >
                  <LayoutDashboard />
                  Dashboard
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Sign out button */}
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    authClient.signOut({ callbackURL: "/" });
                    router.push("/"); // Redirect to sign-in page after sign out
                    router.refresh(); // Refresh the page to update the UI after sign out
                  }}
                >
                  <LogOut />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
