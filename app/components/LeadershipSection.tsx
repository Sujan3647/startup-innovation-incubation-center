"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const leaders = [
  {
    name: "Dr. Priyangshu Rana Borthakur",
    title: "IIC President, Dean, FST",
    org: "ICFAI University Tripura",
    description:
      "Visionary leadership guiding the Institution's Innovation Council, driving innovation, incubation, and institutional excellence to foster collaboration and growth.",
    image: "/leaders/IIC President.png",
  },
  {
    name: "Tufan Singha Mahapatra",
    title: "Convenor of IIC, Assistant Professor, Chemistry",
    org: "ICFAI University Tripura",
    description:
      "Dedicated coordinator managing IIC initiatives, promoting collaborative research, and fostering scientific innovation and entrepreneurship across departments.",
    image: "/leaders/Tufan-Singha-Mahapatra.webp",
  },
];

function FeaturedCard({ leader, isVisible }: { leader: typeof leaders[0]; isVisible: boolean }) {
  return (
    <div
      className={`group ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: "0.1s" }}
    >
      <div className="relative rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Photo — full display, no background */}
          <div className="relative h-[280px] md:h-[320px]">
            <Image
              src={leader.image}
              alt={leader.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Info — professional layout */}
          <div className="flex flex-col justify-center p-6 md:p-8">
            {/* Flag + Org */}
            <div className="flex items-center gap-2 mb-5">
              <Image src="/Logos/Navbar-Logo/Screenshot 2026-08-20 204540.png" alt="ICFAI" width={22} height={22} className="object-contain" />
              <span className="text-[11px] font-semibold tracking-wide text-black uppercase">
                {leader.org}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-xl md:text-2xl font-[family-name:var(--font-heading)] font-extrabold text-primary-dark leading-tight">
              {leader.name}
            </h3>

            {/* Title with accent bar */}
            <div className="mt-2 mb-5">
              <p className="text-accent text-[13px] font-semibold">{leader.title}</p>
              <div className="w-10 h-[2px] bg-gradient-to-r from-accent to-gold mt-2 rounded-full" />
            </div>

            {/* Description with left accent */}
            <div className="pl-4 border-l-2 border-primary/15">
              <p className="text-text-muted text-[12.5px] leading-[1.8] italic">
                {leader.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecondaryFeaturedCard({ leader, isVisible }: { leader: typeof leaders[0]; isVisible: boolean }) {
  return (
    <div
      className={`group ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: "0.2s" }}
    >
      <div className="relative rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Info — professional layout (Left side) */}
          <div className="flex flex-col justify-center p-6 md:p-8 order-2 md:order-1">
            {/* Flag + Org */}
            <div className="flex items-center gap-2 mb-5">
              <Image src="/Logos/Navbar-Logo/Screenshot 2026-08-20 204540.png" alt="ICFAI" width={22} height={22} className="object-contain" />
              <span className="text-[11px] font-semibold tracking-wide text-black uppercase">
                {leader.org}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-xl md:text-2xl font-[family-name:var(--font-heading)] font-extrabold text-primary-dark leading-tight">
              {leader.name}
            </h3>

            {/* Title with accent bar */}
            <div className="mt-2 mb-5">
              <p className="text-accent text-[13px] font-semibold">{leader.title}</p>
              <div className="w-10 h-[2px] bg-gradient-to-r from-accent to-gold mt-2 rounded-full" />
            </div>

            {/* Description with left accent */}
            <div className="pl-4 border-l-2 border-primary/15">
              <p className="text-text-muted text-[12.5px] leading-[1.8] italic">
                {leader.description}
              </p>
            </div>
          </div>

          {/* Photo — full display, no background (Right side) */}
          <div className="relative h-[280px] md:h-[320px] order-1 md:order-2">
            <Image
              src={leader.image}
              alt={leader.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default function LeadershipSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-20"
      id="leadership-section"
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-12 flex flex-col items-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-[15px] md:text-[16px] font-bold tracking-[0.25em] uppercase text-black block mb-3" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
            IIC Leadership
          </span>
          <h2 className="text-[1.5rem] md:text-[1.85rem] lg:text-[2.15rem] font-bold text-accent mb-5 leading-[1.3] tracking-normal" style={{ fontFamily: "'Georgia', 'Playfair Display', serif" }}>
            Leadership guiding the ICFAI University IIC
          </h2>
        </div>

        {/* First leader — featured banner style */}
        <div className="mb-5">
          <FeaturedCard leader={leaders[0]} isVisible={isVisible} />
        </div>

        {/* Second leader — secondary banner style */}
        <div className="mb-8">
          <SecondaryFeaturedCard leader={leaders[1]} isVisible={isVisible} />
        </div>

        {/* View All Members CTA */}
        <div className={`flex justify-center mt-10 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
          <a
            href="#sic-leadership-section"
            id="cta-view-all-members"
            className="group inline-flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm tracking-wide px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.97]"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            View All Members
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
