"use client";

import { useState } from "react";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/#top-bar" },
  { label: "About", href: "/#objectives-section" },
  { label: "Startups", href: "/startups" },
  { label: "Projects", href: "/#event-highlights" },
  { label: "Events", href: "/#event-highlights-section" },
  { label: "Team", href: "/#leadership-section" },
  { label: "Contact", href: "/#contact-section" },
];


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const organizationLogos = [
    { src: "/Logos/Navbar-Logo/AICTE.png", alt: "AICTE Logo", className: "w-9 h-9 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" },
    { src: "/Logos/Navbar-Logo/Icfai logo.webp", alt: "ICFAI Logo", className: "w-11 h-11 sm:w-60 sm:h-20 md:w-72 md:h-24 lg:w-96 lg:h-28" },
    { src: "/Logos/Navbar-Logo/IIC logo.png", alt: "IIC Logo", className: "w-9 h-9 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-8 z-50 border-b border-border-light" id="main-header">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between py-2 min-h-[72px] sm:min-h-[90px] md:min-h-[120px] gap-2 sm:gap-4 relative">
          {/* MOBILE VIEW ONLY: ALL 3 logos centered in the middle of the header */}
          <div className="flex sm:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-3">
            {/* AICTE Logo (left) */}
            <div className="relative w-13 h-13 flex-shrink-0 transition-transform duration-300 hover:scale-105">
              <Image
                src="/Logos/Navbar-Logo/AICTE.png"
                alt="AICTE Logo"
                fill
                sizes="52px"
                className="object-contain"
                priority
              />
            </div>

            {/* ICFAI Logo (middle) */}
            <div className="relative w-16 h-16 flex-shrink-0 transition-transform duration-300 hover:scale-105">
              <Image
                src="/Logos/Navbar-Logo/Icfai logo.webp"
                alt="ICFAI Logo"
                fill
                sizes="64px"
                className="object-contain"
                priority
              />
            </div>

            {/* IIC Logo (right) */}
            <div className="relative w-13 h-13 flex-shrink-0 transition-transform duration-300 hover:scale-105">
              <Image
                src="/Logos/Navbar-Logo/IIC logo.png"
                alt="IIC Logo"
                fill
                sizes="52px"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Spacer to push menu button to right on mobile */}
          <div className="sm:hidden flex-1" />

          {/* Mobile menu toggle */}
          <button
            className="sm:hidden p-1.5 rounded-md hover:bg-gray-100 transition-colors text-primary relative z-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* DESKTOP & TABLET VIEW (sm and above) */}
          <div className="hidden lg:flex flex-1 items-center" />

          <div className="hidden sm:flex items-center justify-center gap-1 sm:gap-2 md:gap-2.5 flex-nowrap py-1 overflow-hidden">
            {organizationLogos.map((logo) => (
              <div key={logo.alt} className={`relative ${logo.className} flex-shrink-0 transition-transform duration-300 hover:scale-105`}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 768px) 300px, 450px"
                  className="object-contain"
                  priority
                />
              </div>
            ))}
          </div>

          <div className="hidden lg:flex flex-1 justify-end min-w-0" />

          {/* Tablet menu toggle (sm to lg) */}
          <button
            className="hidden sm:flex lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            id="tablet-menu-toggle"
          >
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation bar */}
        <nav className="hidden lg:block border-t border-border-light" id="main-nav">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.label} className="relative group">
                <a
                  href={item.href}
                  className={`
                    flex items-center px-5 py-3 text-[13px] font-[family-name:var(--font-heading)] font-semibold uppercase tracking-[0.08em] transition-all duration-300 relative
                    ${item.active
                      ? "text-primary"
                      : "text-text-dark/80 hover:text-primary"
                    }
                  `}
                  id={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.label}
                  {/* Active indicator line */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-primary transition-all duration-300 ${item.active ? "w-3/4" : "w-0 group-hover:w-3/4"}`}></span>
                </a>
              </li>
            ))}
            <li className="ml-4 flex items-center h-full">
              <a 
                href="#register" 
                className="bg-accent hover:bg-accent-light text-white px-4 py-1.5 rounded-none shadow-md text-[11px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                WANTS TO BE MEMBER
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-border-light mt-2 pt-3 animate-fade-in-up" style={{ animationDuration: "0.2s" }} id="mobile-nav">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      block px-4 py-2.5 text-sm font-medium rounded-md transition-colors
                      ${item.active
                        ? "bg-primary text-white"
                        : "text-text-dark hover:bg-primary/5"
                      }
                    `}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 px-4">
                <a 
                  href="#register" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-accent hover:bg-accent-light text-white block text-center py-2.5 rounded-none text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  WANTS TO BE MEMBER
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
