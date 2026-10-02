"use client";

import Image from "next/image";

const highlights = [
  { title: "Open Doors", desc: "Always welcoming researchers, innovators, and entrepreneurs" },
  { title: "IIC Network", desc: "Connect with our Institution's Innovation Council" },
  { title: "Research Hub", desc: "A thriving space for academic and industry collaboration" },
  { title: "Innovation First", desc: "A campus culture that celebrates ideas and impact" },
];


export default function GlobalPartnerships() {

  return (
    <section
      className="pb-16 md:pb-24 bg-white relative overflow-hidden"
      id="global-partnerships-section"
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left - Text block matching "About the event" design */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left px-4">
            <span
              className="text-[15px] md:text-[16px] font-bold tracking-[0.25em] uppercase text-black block mb-3"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              Collaborations & Partnerships
            </span>
            <h2
              className="text-[1.5rem] md:text-[1.85rem] lg:text-[2.15rem] font-bold text-accent mb-5 leading-[1.3] tracking-normal"
              style={{ fontFamily: "'Georgia', 'Playfair Display', serif" }}
            >
              Strengthening Collaborations<br />for a Stronger Innovation Future
            </h2>

            <div className="space-y-5 text-[14px] md:text-[15px] text-[#4b5563] leading-[1.8] font-[family-name:var(--font-heading)] font-medium tracking-wide max-w-2xl">
              <p>
                You are always welcome at <strong className="font-bold text-primary-dark">ICFAI University Tripura</strong>. Our campus is a place where ideas are nurtured, innovation is celebrated, and every visitor is embraced as part of our growing community.
              </p>
              <p>
                Whether you are a researcher, entrepreneur, mentor, or industry leader — our doors are open. Come, collaborate, and be part of something meaningful with us through the <strong className="font-bold text-accent">Institution&apos;s Innovation Council (IIC)</strong>.
              </p>
            </div>
          </div>

          {/* Right - Photo section & Highlights stacked below */}
          <div className="lg:col-span-5 flex flex-col gap-8 w-full">
            {/* Image - professional full-bleed with gradient overlay */}
            <div className="relative w-full h-[260px] md:h-[320px] lg:h-[360px] rounded-2xl overflow-hidden shadow-xl group">
              <Image
                src="/Banner/Icfaicampus.png"
                alt="ICFAI University Tripura Campus"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              {/* Caption badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block bg-white/90 backdrop-blur-sm text-[#1a2d50] text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md shadow-sm">
                  ICFAI University Tripura Campus
                </span>
              </div>
            </div>

            {/* Highlights Grid below image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-accent mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-[13.5px] font-[family-name:var(--font-heading)] font-bold text-[#1a2d50] tracking-wide">
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-text-muted mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
