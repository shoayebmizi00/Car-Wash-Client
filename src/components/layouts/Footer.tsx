'use client';
import Link from "next/link";
import { ArrowUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

// Footer link columns in arrays
const importantLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Booking", href: "/booking" },
  { name: "Slots", href: "/slots" },
  { name: "Upcoming booking", href: "/upcoming-booking" },
];

const aboutLinks = [
  { name: "About us", href: "/about" },
  { name: "Meet our hero", href: "/meet-our-hero" },
  { name: "Provide service", href: "/provide-service" },
  { name: "Booking", href: "/booking" },
];

const supportLinks = [
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

// Payment methods shown as small white badges
const payments = [
  { label: "CQ", color: "text-blue-600" },
  { label: "VISA", color: "text-blue-700" },
  { label: "MC", color: "text-orange-500" },
  { label: "bK", color: "text-pink-600" },
  { label: "R", color: "text-purple-600" },
  { label: "upay", color: "text-orange-500" },
  { label: "OK", color: "text-green-600" },
  { label: "togo", color: "text-teal-600" },
  { label: "EBL", color: "text-red-600" },
  { label: "AMEX", color: "text-blue-500" },
];

// Social icons (lucide removed brand icons, so we use small inline svgs)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const Footer = () => {
  return (
    <div className="bg-[#0d1526] text-white">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-10 flex flex-col md:flex-row items-start justify-between gap-10">

        {/* Important Links column */}
        <div>
          <h3 className="text-lg font-bold mb-4">Important Links</h3>
          <div className="flex flex-col gap-3">
            {importantLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-[#ffc20e]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* About column */}
        <div>
          <h3 className="text-lg font-bold mb-4">About</h3>
          <div className="flex flex-col gap-3">
            {aboutLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-[#ffc20e]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Center circle */}
        <div className="w-64 h-64 rounded-full bg-[#182238] flex flex-col items-center justify-center gap-3 shrink-0">
          <div className="w-12 h-12 rounded-full bg-[#4a3f8f] ring-2 ring-white/10 flex items-center justify-center text-xl">
            🚗
          </div>
          <h2 className="text-3xl font-bold">Cleanify</h2>
          <p className="font-semibold">Established . 2021</p>
          <div className="w-8 h-0.5 bg-[#ffc20e]"></div>
          <div className="flex items-center gap-3 mt-1">
            <Link
              href="/facebook"
              className="w-10 h-10 rounded-full border-2 border-[#ffc20e] bg-[#101b30] flex items-center justify-center hover:bg-[#ffc20e] hover:text-[#0d1526] text-white"
            >
              <FacebookIcon />
            </Link>
            <Link
              href="/twitter"
              className="w-10 h-10 rounded-full border-2 border-[#ffc20e] bg-[#101b30] flex items-center justify-center hover:bg-[#ffc20e] hover:text-[#0d1526] text-white"
            >
              <TwitterIcon />
            </Link>
            <Link
              href="/github"
              className="w-10 h-10 rounded-full border-2 border-[#ffc20e] bg-[#101b30] flex items-center justify-center hover:bg-[#ffc20e] hover:text-[#0d1526] text-white"
            >
              <GithubIcon />
            </Link>
          </div>
        </div>

        {/* Support column */}
        <div>
          <h3 className="text-lg font-bold mb-4">Support</h3>
          <div className="flex flex-col gap-3">
            {supportLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-[#ffc20e]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#0a0f1c]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left links */}
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <Link href="/terms" className="hover:text-[#ffc20e]">
              Terms of use
            </Link>
            <Link href="/privacy" className="hover:text-[#ffc20e]">
              Privacy policy
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-300">
            Copyright @ 2026 - All rights reserved by{" "}
            <span className="text-[#ffc20e] font-bold">Cleanify</span>
          </p>

          {/* Right side: calculator + payments */}
          <div className="flex items-center gap-3">
            <Button className="bg-[#3a4152] hover:bg-[#4a5162] text-white text-sm h-8">
              Calculator
            </Button>
            <span className="text-[10px] text-gray-400">Pay With</span>
            <div className="flex items-center gap-1">
              {payments.map((pay) => (
                <div
                  key={pay.label}
                  className={`bg-white rounded px-1 py-0.5 text-[8px] font-bold ${pay.color}`}
                >
                  {pay.label}
                </div>
              ))}
              <div className="flex items-center text-[#f97316] font-bold text-sm pl-1">
                <Zap className="w-3 h-3" />
                amarPay
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient line at the very bottom */}
      <div className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></div>

      {/* Scroll to top button */}
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-5 right-4 z-50 size-11 rounded-full bg-[#ffc20e] hover:bg-[#e6ae0c] text-[#0d1526]"
      >
        <ArrowUp />
      </Button>
    </div>
  );
};

export default Footer;
