"use client";

import { useEffect, useRef, useState } from "react";

const startups = [
  {
    name: "CareMe",
    category: "HealthTech",
    description: "You're Not Alone. We're Here for You. Understanding compassion and guided by empathy every step of the healing way.",
    link: "Visit Website",
    url: "https://www.talkcare.in/",
    accent: "#4f46e5", // Indigo
  },
  {
    name: "AQUAR",
    category: "Technology",
    description: "Innovative technology solutions for the future. (Description pending)",
    link: "Visit Website",
    url: "#",
    accent: "#0ea5e9", // Sky blue
  },
  {
    name: "DigiChain",
    category: "Web3",
    description: "Blockchain-based document verification and secure management solutions. Ensuring transparency, immutability, and efficiency for modern enterprises.",
    link: "Visit Website",
    url: "#",
    accent: "#d97706", // Amber
  },
  {
    name: "HexaPod",
    category: "Robotics",
    description: "Six-legged walking robot designed for uneven terrain. Uses multiple-joint legs for stable movement and supports obstacle detection via camera, LiDAR, and IMU sensors. Ideal for search & rescue, agriculture, and surveillance.",
    link: "Visit Website",
    url: "#",
    accent: "#7c3aed", // Violet
  },
  {
    name: "Biped Humanoid Robot",
    category: "Robotics",
    description: "Advanced two-legged humanoid robot designed for versatile applications and research. Equipped with AI for dynamic balancing and natural interaction.",
    link: "Visit Website",
    url: "#",
    accent: "#16a34a", // Green
  },
];

export default function IncubatedStartups({ 
  hideViewAll = false,
  subtitle = "Our Portfolio"
}: { 
  hideViewAll?: boolean;
  subtitle?: string;
} = {}) {
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
      className="pt-16 md:pt-24 pb-8 md:pb-12 bg-white"
      id="incubated-startups-section"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-14 flex flex-col items-center ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <span
            className="text-[15px] md:text-[16px] font-bold tracking-[0.25em] uppercase text-black block mb-3"
            style={{ fontFamily: "'Courier New', Courier, monospace" }}
          >
            {subtitle}
          </span>
          <h2
            className="text-[1.5rem] md:text-[1.85rem] lg:text-[2.15rem] font-bold text-accent mb-4 leading-[1.3] tracking-normal max-w-3xl"
            style={{
              fontFamily: "'Georgia', 'Playfair Display', serif",
            }}
          >
            New Generation Innovation Network
          </h2>
          <p className="text-text-muted text-[14px] md:text-[15px] leading-[1.8] max-w-2xl">
            Selected startup projects receive a grant of ₹1 lakh from DIT to support the development and growth of their innovative ideas
          </p>
        </div>

        {/* 2026 Batch Heading */}
        <div className={`mb-8 flex flex-col items-start ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          <h3 
            className="text-[1.35rem] md:text-[1.6rem] font-bold text-primary-dark tracking-wide"
            style={{ fontFamily: "'Georgia', 'Playfair Display', serif" }}
          >
            2026 Batch
          </h3>
          <div className="w-16 h-1 bg-accent mt-3 rounded-full"></div>
        </div>

        {/* Startups Grid - matching KeySectors design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups.map((startup, index) => (
            <div
              key={index}
              onClick={() => {
                if (startup.url && startup.url !== "#") {
                  window.open(startup.url, "_blank");
                }
              }}
              className={`group cursor-pointer bg-white border border-gray-100 rounded-lg relative ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.1 + (index % 6) * 0.06}s` }}
            >
              <div className="relative h-full p-6 md:p-7 transition-all duration-400 hover:bg-[#fafbfd] flex flex-col items-start rounded-lg">
                {/* Large index number */}
                <span
                  className="absolute top-4 right-5 text-[40px] font-black leading-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-400 select-none"
                  style={{
                    fontFamily: "'Georgia', 'Playfair Display', serif",
                    color: startup.accent,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Accent dot & Category */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-2.5 h-2.5 rounded-full group-hover:scale-125 transition-transform duration-300"
                    style={{ backgroundColor: startup.accent }}
                  />
                  <span className="text-[11px] font-bold tracking-wider uppercase text-gray-500">
                    {startup.category}
                  </span>
                </div>

                {/* Name */}
                <h3
                  className="text-[16px] md:text-[18px] font-[family-name:var(--font-heading)] font-bold text-primary-dark leading-snug mb-3 group-hover:translate-x-1 transition-transform duration-300"
                >
                  {startup.name}
                </h3>

                {/* Description */}
                <p className="text-text-muted text-[13px] leading-[1.75] mb-6 flex-1">
                  {startup.description}
                </p>

                {/* Link */}
                {startup.url !== "#" && (
                  <div className="inline-flex items-center gap-2 mt-auto group/link text-black">
                    <div
                      className="w-4 h-[1.5px] rounded-full transition-all duration-300 group-hover:w-6 group-hover/link:w-6"
                      style={{ backgroundColor: "black" }}
                    />
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      Visit Website
                    </span>
                    <svg
                      className="w-3 h-3 opacity-60 group-hover/link:opacity-100 transition-opacity duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "black" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Startups CTA */}
        {!hideViewAll && (
          <div className={`flex justify-center mt-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.6s" }}>
            <a
              href="/startups"
              id="cta-view-all-startups"
              className="group inline-flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm tracking-wide px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.97]"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              View all
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
