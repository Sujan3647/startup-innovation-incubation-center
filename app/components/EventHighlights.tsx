"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const highlights = [
  {
    title: "TechNovate 2.0",
    image: "/Events/Technovate.jpg",
    position: "center",
  },
  {
    title: "MeitY TIDE 2.0 Northeast Techathon X-5",
    image: "/Events/iim.jpg",
    position: "top",
  },
  {
    title: "Innovation Carnival",
    image: "/Events/innovation carnival.jpg",
    position: "center",
  },
  {
    title: "Ideathon 2k25",
    image: "/Events/ideathon.jpg",
    position: "center",
  },
  {
    title: "ICKARIA technical Event",
    image: "/Events/ICARIA.jpg",
    position: "center",
  },
  {
    title: "TechNovate",
    image: "/Events/Technovate 1.0.jpg",
    position: "top",
  },
];

export default function EventHighlights() {
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
      className="pt-16 md:pt-24 pb-8 md:pb-12 scroll-mt-[150px]"
      id="event-highlights-section"
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
            Event Highlights
          </span>
          <h2
            className="text-[1.5rem] md:text-[1.85rem] lg:text-[2.15rem] font-bold text-accent mb-4 leading-[1.3] tracking-normal"
            style={{
              fontFamily: "'Georgia', 'Playfair Display', serif",
            }}
          >
            Celebrating innovation, technology, and entrepreneurial excellence
          </h2>
        </div>

        {/* Highlights Grid — sharp, editorial style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {highlights.map((item, index) => (
            <div
              key={index}
              className={`group relative ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.15 + index * 0.08}s` }}
            >
              <div className="relative overflow-hidden bg-white h-full">
                {/* Image */}
                <div className="relative h-56 sm:h-64 md:h-72 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: item.position }}
                    unoptimized
                  />
                  {/* Dark overlay — stronger on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500" />
                </div>

                {/* Title bar at the bottom */}
                <div className="absolute bottom-0 left-0 w-full px-5 pb-5 pt-8">
                  <div className="w-8 h-[2px] bg-gold mb-3 group-hover:w-14 transition-all duration-500" />
                  <h3 className="text-[15px] md:text-[16px] font-[family-name:var(--font-heading)] font-bold text-white leading-snug tracking-wide">
                    {item.title}
                  </h3>
                </div>

                {/* Top-right index badge */}
                <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[11px] font-bold text-white/60 border border-white/20 backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Events CTA */}
        <div className={`flex justify-center mt-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.6s" }}>
          <a
            href="#"
            id="cta-view-all-events"
            className="group inline-flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm tracking-wide px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.97]"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            View all Events
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
