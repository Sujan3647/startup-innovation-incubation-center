"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const sicMembers = [
  {
    name: "Dr. Pritam Majumder",
    title: "Convenor of SIC, Assistant Professor, ME",
    org: "ICFAI University Tripura",
    description:
      "Visionary leadership heading the Startup Innovation Center, fostering entrepreneurial culture and guiding startup ventures towards sustainable impact.",
    image: "/leaders/Dr. Pritam Majumder.png",
  },
  {
    name: "Dr. Yagnyasenee Sen Gupta",
    title: "Co-Convenor of SIC, Assistant Professor, CSE",
    org: "ICFAI University Tripura",
    description:
      "Passionate educator and Co-Convenor guiding the SIC, nurturing tech-driven innovation, supporting student-led startups, and bridging the gap between academia and industry.",
    image: "/leaders/Dr. Yagnyasenee Sen Gupta.png",
  },
];

function FeaturedCard({ member, isVisible }: { member: typeof sicMembers[0]; isVisible: boolean }) {
  return (
    <div
      className={`group ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: "0.1s" }}
    >
      <div className="relative rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Photo */}
          <div className="relative h-[280px] md:h-[320px]">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <Image src="/Logos/Navbar-Logo/Screenshot 2026-08-20 204540.png" alt="ICFAI" width={22} height={22} className="object-contain" />
              <span className="text-[11px] font-semibold tracking-wide text-black uppercase">
                {member.org}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-[family-name:var(--font-heading)] font-extrabold text-primary-dark leading-tight">
              {member.name}
            </h3>

            <div className="mt-2 mb-5">
              <p className="text-accent text-[13px] font-semibold">{member.title}</p>
              <div className="w-10 h-[2px] bg-gradient-to-r from-accent to-gold mt-2 rounded-full" />
            </div>

            <div className="pl-4 border-l-2 border-primary/15">
              <p className="text-text-muted text-[12.5px] leading-[1.8] italic">
                {member.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecondaryFeaturedCard({ member, isVisible }: { member: typeof sicMembers[0]; isVisible: boolean }) {
  return (
    <div
      className={`group ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: "0.2s" }}
    >
      <div className="relative rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Info — Left side */}
          <div className="flex flex-col justify-center p-6 md:p-8 order-2 md:order-1">
            <div className="flex items-center gap-2 mb-5">
              <Image src="/Logos/Navbar-Logo/Screenshot 2026-08-20 204540.png" alt="ICFAI" width={22} height={22} className="object-contain" />
              <span className="text-[11px] font-semibold tracking-wide text-black uppercase">
                {member.org}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-[family-name:var(--font-heading)] font-extrabold text-primary-dark leading-tight">
              {member.name}
            </h3>

            <div className="mt-2 mb-5">
              <p className="text-accent text-[13px] font-semibold">{member.title}</p>
              <div className="w-10 h-[2px] bg-gradient-to-r from-accent to-gold mt-2 rounded-full" />
            </div>

            <div className="pl-4 border-l-2 border-primary/15">
              <p className="text-text-muted text-[12.5px] leading-[1.8] italic">
                {member.description}
              </p>
            </div>
          </div>

          {/* Photo — Right side */}
          <div className="relative h-[280px] md:h-[320px] order-1 md:order-2">
            <Image
              src={member.image}
              alt={member.name}
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

export default function SICLeadershipSection() {
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
      id="sic-leadership-section"
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-12 flex flex-col items-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-[15px] md:text-[16px] font-bold tracking-[0.25em] uppercase text-black block mb-3" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
            SIC Leadership
          </span>
          <h2 className="text-[1.5rem] md:text-[1.85rem] lg:text-[2.15rem] font-bold text-accent mb-5 leading-[1.3] tracking-normal" style={{ fontFamily: "'Georgia', 'Playfair Display', serif" }}>
            Leadership guiding the ICFAI University SIC
          </h2>
        </div>

        {/* First member */}
        <div className="mb-5">
          <FeaturedCard member={sicMembers[0]} isVisible={isVisible} />
        </div>

        {/* Second member */}
        <div className="mb-8">
          <SecondaryFeaturedCard member={sicMembers[1]} isVisible={isVisible} />
        </div>

        {/* View All Members CTA */}
        <div className={`flex justify-center mt-10 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
          <a
            href="#"
            id="cta-sic-view-all-members"
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
