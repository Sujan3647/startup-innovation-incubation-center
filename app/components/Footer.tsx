"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-[#333333] border-t border-gray-200/80" id="main-footer">
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12 md:pt-10 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Column 1: Brand & Logos */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="-mt-4 sm:-mt-10 mb-4 ml-0 sm:ml-14">
              <div className="relative w-28 h-20 sm:w-36 sm:h-26 flex-shrink-0">
                <Image
                  src="/Logos/Navbar-Logo/NAAC.png"
                  alt="NAAC Accredited"
                  fill
                  className="object-contain object-left"
                  unoptimized
                />
              </div>
            </div>

            <h3 className="text-base font-bold text-gray-900 tracking-wide font-[family-name:var(--font-heading)]">
              The ICFAI University, Tripura
            </h3>
            <p className="text-[12px] font-semibold text-accent uppercase tracking-wider mt-0.5">
              Institution&apos;s Innovation Council (IIC)
            </p>

            <p className="text-[12px] font-semibold text-accent uppercase tracking-wider mt-0.5 mb-3">
              Startup and Incubation Center (SIC)
            </p>
          </div>

          {/* Column 2: Campus Address */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-4 font-[family-name:var(--font-heading)]">
              Campus Address
            </h4>
            <div className="text-[14px] text-gray-600 space-y-2.5 leading-relaxed font-medium">
              <p className="font-bold text-gray-900 text-[15px]">
                ICFAI University, Tripura
              </p>
              <p>
                Kamalghat, Mohanpur,<br />
                West Tripura – 799210,<br />
                India.
              </p>
            </div>
          </div>

          {/* Column 3: Contact Information */}
          <div className="lg:col-span-4 flex flex-col">
            <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-4 font-[family-name:var(--font-heading)]">
              Contact Information
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-[14px]">
              {/* Left column */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                  Phone
                </span>
                <div className="flex flex-col gap-1">
                  <a href="tel:+918415952506" className="font-semibold text-gray-800 hover:text-accent transition-colors">
                    +91-8415952506
                  </a>
                  <a href="tel:03812865752" className="text-gray-600 hover:text-accent transition-colors">
                    0381-2865752 / 62
                  </a>
                </div>
              </div>

              {/* Right column */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                  WhatsApp
                </span>
                <a href="https://wa.me/916909879797" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-800 hover:text-accent transition-colors">
                  +91-6909879797
                </a>
              </div>

              {/* Left column */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                  Toll-Free Number
                </span>
                <a href="tel:18003453673" className="font-semibold text-gray-800 hover:text-accent transition-colors">
                  1800 345 3673
                </a>
              </div>

              {/* Right column */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                  Fax No.
                </span>
                <p className="text-gray-700 font-medium">0381 - 2865754</p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="border-t border-gray-200/80 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="w-full text-center text-[13px] text-black font-semibold tracking-wide">
            © 2026 Copyright All Rights Reserved by The ICFAI University, Tripura.
          </p>
          <div className="flex items-center text-[12px] text-gray-500 sm:flex-shrink-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-primary font-medium transition-colors whitespace-nowrap cursor-pointer"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
