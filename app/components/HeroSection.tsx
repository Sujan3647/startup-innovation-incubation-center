"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" id="hero-section">
      {/* Hero image area */}
      <div className="relative w-full h-[200px] sm:h-[340px] md:h-[420px] lg:h-[480px]">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="/Banner/ICFAI Banner.png"
            alt="ICFAI University Tripura Banner"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex justify-start">
            <div className="max-w-3xl translate-x-0 sm:-translate-x-2 md:-translate-x-8 lg:-translate-x-12">
              <h2 className="text-[1.15rem] sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-heading)] font-extrabold text-white leading-[1.15] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                <span className="block text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  ICFAI University Tripura
                </span>
                <span className="block mt-0.5 sm:mt-1 text-[#ffae34] font-black tracking-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  Startup, Innovation
                </span>
                <span className="block mt-1 sm:mt-2.5 text-base sm:text-2xl md:text-3xl lg:text-[2.25rem] font-semibold tracking-wide">
                  <span className="inline-block bg-white/95 text-primary font-extrabold px-2.5 sm:px-4 py-0.5 rounded-md sm:rounded-lg shadow-lg not-italic">
                    Incubation Center
                  </span>
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Conclave Highlights strip — below hero on mobile, overlapping on desktop */}
      <div className="relative sm:absolute sm:-bottom-1 sm:left-0 sm:right-0 z-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/95 backdrop-blur-md sm:rounded-t-xl shadow-[0_5px_20px_rgba(0,0,0,0.08)] sm:border-t sm:border-x border-white/60 px-3 sm:px-6 py-2.5 sm:py-2.5">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-1">
              {[
                { 
                  label: "Active Startups",
                  icon: (
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )
                },
                { 
                  label: "Innovative Projects",
                  icon: (
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                { 
                  label: "Ideation & Incubation",
                  icon: (
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )
                },
                { 
                  label: "Co-working & Prototyping",
                  icon: (
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )
                },
              ].map((highlight, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 justify-center md:border-r border-gray-200/50 last:border-r-0 px-1 sm:px-2 py-1"
                >
                  <div className="p-1 sm:p-1.5 rounded-full bg-orange-50/90 flex-shrink-0">
                    {highlight.icon}
                  </div>
                  <span className="text-[10px] sm:text-xs md:text-[13px] font-[family-name:var(--font-heading)] font-bold text-primary tracking-wide">
                    {highlight.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
