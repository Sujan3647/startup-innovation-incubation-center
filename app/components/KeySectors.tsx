"use client";

import { useEffect, useRef, useState } from "react";

const sectors = [
  {
    name: "Healthcare",
    description: "Scope for hospitals, diagnostics, medical services, and wellness infrastructure.",
    link: "Health Department",
    url: "https://health.tripura.gov.in/",
    accent: "#e11d48",
  },
  {
    name: "Tourism",
    description: "Opportunities in destination experiences, hospitality, and cultural circuits.",
    link: "Tripura Tourism",
    url: "https://tripuratourism.gov.in/",
    accent: "#0d9488",
  },
  {
    name: "Education",
    description: "Potential for institutions, training centers, and skill development partnerships.",
    link: "Higher Education",
    url: "https://highereducation.tripura.gov.in/",
    accent: "#4f46e5",
  },
  {
    name: "Information Technology",
    description: "Growth opportunities in digital services, IT parks, and tech-enabled jobs.",
    link: "Invest India IT & BPM",
    url: "https://www.investindia.gov.in/sector/it-bpm",
    accent: "#7c3aed",
  },
  {
    name: "Renewable Energy",
    description: "Investment potential in clean power, distributed energy, and green infrastructure.",
    link: "TREDA",
    url: "https://treda.tripura.gov.in/",
    accent: "#d97706",
  },
  {
    name: "Real Estate",
    description: "Urban growth opportunities in commercial, residential, and mixed-use projects.",
    link: "Invest India Real Estate",
    url: "https://www.investindia.gov.in/sector/real-estate",
    accent: "#475569",
  },
  {
    name: "Agro-processing",
    description: "Value creation across local produce, supply chains, and export-ready processing.",
    link: "Agriculture Department",
    url: "https://agri.tripura.gov.in/",
    accent: "#16a34a",
  },
  {
    name: "Logistics",
    description: "Regional connectivity potential through warehousing, transport, and trade facilitation.",
    link: "Industries & Commerce",
    url: "https://industries.tripura.gov.in/",
    accent: "#0891b2",
  },
  {
    name: "Food Processing",
    description: "Opportunities in packaged foods, cold chains, and value-added products.",
    link: "Invest India Food Processing",
    url: "https://www.investindia.gov.in/sector/food-processing",
    accent: "#ea580c",
  },
  {
    name: "Bamboo",
    description: "Opportunities in bamboo-based industries, value-added products, and sustainable manufacturing.",
    link: "Industries & Commerce",
    url: "https://industries.tripura.gov.in/",
    accent: "#65a30d",
  },
  {
    name: "Rubber",
    description: "Investment potential in rubber processing and downstream industries.",
    link: "Industries & Commerce",
    url: "https://industries.tripura.gov.in/",
    accent: "#78716c",
  },
  {
    name: "Agar / Agarwood",
    description: "Scope in cultivation, processing, fragrance, wellness, and export-oriented products.",
    link: "Industries & Commerce",
    url: "https://industries.tripura.gov.in/",
    accent: "#059669",
  },
  {
    name: "Oil & Gas",
    description: "Collaboration potential in energy resources, services, and supporting infrastructure.",
    link: "Invest India Oil & Gas",
    url: "https://www.investindia.gov.in/about",
    accent: "#b45309",
  },
  {
    name: "Technology",
    description: "Partnerships in emerging technologies, innovation, and digital transformation.",
    link: "Invest India Technology",
    url: "https://www.investindia.gov.in/sector/it-bpm",
    accent: "#2563eb",
  },
];

export default function KeySectors() {
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
    <section ref={sectionRef} className="pt-8 md:pt-12 pb-16 md:pb-24" id="sectors-section">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-14 flex flex-col items-center ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2
            className="text-[1.5rem] md:text-[1.85rem] lg:text-[2.15rem] font-bold text-accent mb-4 leading-[1.3] tracking-normal max-w-3xl"
            style={{
              fontFamily: "'Georgia', 'Playfair Display', serif",
            }}
          >
            Priority sectors for investment and collaboration
          </h2>
          <p className="text-text-muted text-[14px] md:text-[15px] leading-[1.8] max-w-2xl">
            Sector conversations will focus on practical opportunities,
            facilitation support, and partnership pathways.
          </p>
        </div>

        {/* Sector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sectors.map((sector, index) => (
            <div
              key={index}
              className={`group cursor-pointer bg-white relative ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.1 + (index % 8) * 0.06}s` }}
            >
              <div className="relative h-full p-6 md:p-7 transition-all duration-400 hover:bg-[#fafbfd]">
                {/* Large index number */}
                <span
                  className="absolute top-4 right-5 text-[40px] font-black leading-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-400 select-none"
                  style={{
                    fontFamily: "'Georgia', 'Playfair Display', serif",
                    color: sector.accent,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Accent dot */}
                <div
                  className="w-2.5 h-2.5 rounded-full mb-5 group-hover:scale-125 transition-transform duration-300"
                  style={{ backgroundColor: sector.accent }}
                />

                {/* Name */}
                <h3
                  className="text-[15px] md:text-[16px] font-[family-name:var(--font-heading)] font-bold text-primary-dark leading-snug mb-2.5 group-hover:translate-x-1 transition-transform duration-300"
                >
                  {sector.name}
                </h3>

                {/* Description */}
                <p className="text-text-muted text-[12.5px] leading-[1.75] mb-5">
                  {sector.description}
                </p>

                {/* Department Link */}
                <a
                  href={sector.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-auto group/link text-black"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="w-4 h-[1.5px] rounded-full transition-all duration-300 group-hover:w-6 group-hover/link:w-6"
                    style={{ backgroundColor: "black" }}
                  />
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    {sector.link}
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
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
