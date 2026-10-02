"use client";

import { useEffect, useRef, useState } from "react";

const focusSectors = [
  "Tourism",
  "IT",
  "Agro-processing",
  "Oil & Gas",
  "Bamboo Industries",
  "Healthcare",
  "Education",
  "Technology",
];

export default function ParticipatingCountries() {
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
      className="pt-8 md:pt-12 pb-8 md:pb-12"
      id="participating-countries-section"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 flex flex-col items-center ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <span
            className="text-[15px] md:text-[16px] font-bold tracking-[0.25em] uppercase text-black block mb-3"
            style={{ fontFamily: "'Courier New', Courier, monospace" }}
          >
            Participating Countries
          </span>
          <h2
            className="text-[1.5rem] md:text-[1.85rem] lg:text-[2.15rem] font-bold text-accent mb-5 leading-[1.3] tracking-normal max-w-3xl"
            style={{
              fontFamily: "'Georgia', 'Playfair Display', serif",
            }}
          >
            Open to global investors, businesses, institutions, and trade bodies
          </h2>
          <p className="text-text-muted text-[14px] md:text-[15px] leading-[1.8] max-w-2xl font-[family-name:var(--font-heading)]">
            Our ecosystem is open to innovators, startups, institutional investors,
            academic collaborators, and delegates from across the world.
          </p>
        </div>

        {/* Three key points — horizontal strip */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-light mb-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.25s" }}
        >
          {/* Global Participation */}
          <div className="flex flex-col items-center text-center py-8 md:py-6 px-6">
            <div className="text-accent mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-[16px] font-bold text-primary-dark mb-1.5 font-[family-name:var(--font-heading)]">
              Global Participation
            </h3>
            <p className="text-text-muted text-[13px] leading-[1.7]">
              Open to all countries.
            </p>
          </div>

          {/* Partner Country */}
          <div className="flex flex-col items-center text-center py-8 md:py-6 px-6">
            <div className="text-accent mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
            </div>
            <h3 className="text-[16px] font-bold text-primary-dark mb-1.5 font-[family-name:var(--font-heading)]">
              Partner Country
            </h3>
            <p className="text-text-muted text-[13px] leading-[1.7]">
              Russian Federation has been invited as the Partner Country.
            </p>
          </div>

          {/* Official Updates */}
          <div className="flex flex-col items-center text-center py-8 md:py-6 px-6">
            <div className="text-accent mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-[16px] font-bold text-primary-dark mb-1.5 font-[family-name:var(--font-heading)]">
              Official Updates
            </h3>
            <p className="text-text-muted text-[13px] leading-[1.7]">
              More international participation details will be updated as
              officially announced.
            </p>
          </div>
        </div>

        {/* Focus Collaborations */}
        <div
          className={`text-center ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.4s" }}
        >
          <p className="text-[14px] md:text-[15px] text-text-muted mb-6 font-[family-name:var(--font-heading)]">
            <span className="font-semibold text-primary-dark">Focus collaborations:</span>{" "}
            {focusSectors.map((sector, i) => (
              <span key={i}>
                <span className="text-accent font-medium">{sector}</span>
                {i < focusSectors.length - 1 && (
                  <span className="text-text-muted/40 mx-1.5">·</span>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
