"use client";

import Image from "next/image";

export default function TopBar() {
  return (
    <div className="bg-primary text-white text-xs sticky top-0 z-[60] shadow-sm" id="top-bar">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
        {/* Left / Info section */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 -my-1.5 flex-shrink-0">
              <Image
                src="/Logos/Navbar-Logo/Screenshot 2026-08-20 204540.png"
                alt="ICFAI University Tripura Logo"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
            <span className="font-semibold tracking-wide text-gold-light text-xs">ICFAI University Tripura</span>
          </div>

          <span className="text-white/40 hidden sm:inline">|</span>
          <span className="text-white/90 font-medium text-[11px] whitespace-nowrap hidden sm:inline">
            Startup Innovation & Incubation Center
          </span>

          <span className="text-white/40 hidden md:inline">|</span>
          <span className="text-white/80 font-normal text-[11px] whitespace-nowrap hidden md:inline">
            Open 09:15 AM - 06:00 PM
          </span>

          <span className="text-white/40 hidden lg:inline">|</span>
          <span className="text-gold-light font-bold text-[11px] tracking-wide whitespace-nowrap hidden lg:inline animate-pulse">
            Monday to Friday Open
          </span>
        </div>

        {/* Right section for smaller screens */}
        <div className="flex md:hidden items-center gap-2 text-[10px] text-gold-light font-bold animate-pulse">
          <span>Mon - Fri Open</span>
        </div>
      </div>
    </div>
  );
}
