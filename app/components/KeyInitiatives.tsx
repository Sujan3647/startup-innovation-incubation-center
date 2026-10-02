"use client";

import { useEffect, useRef, useState } from "react";



const initiatives = [
  {
    title: "Aspirational Talukas Programme",
    description: "Focused development of underdeveloped talukas through targeted interventions in health, education, infrastructure and agriculture.",
    tag: "Flagship",
  },
  {
    title: "Tripura Vision 2047",
    description: "Long-term strategic roadmap for making Tripura a $1 trillion economy with inclusive and sustainable development.",
    tag: "Strategic",
  },
  {
    title: "Ease of Doing Business",
    description: "Streamlining regulatory processes and creating an investor-friendly ecosystem to attract global investments.",
    tag: "Reform",
  },
];



export default function KeyInitiatives() {
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
    <>

      {/* Key Initiatives */}
      <section
        ref={sectionRef}
        className="py-16 md:py-24 bg-bg-section"
        id="initiatives-section"
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
              Programmes
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mt-2">
              Key Initiatives
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary-light rounded-full mt-3 mx-auto" />
          </div>

          {/* Initiative cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initiatives.map((initiative, index) => (
              <div
                key={index}
                className={`
                  card-hover bg-white rounded-xl border border-border-light overflow-hidden group
                  ${isVisible ? "animate-fade-in-up" : "opacity-0"}
                `}
                style={{ animationDelay: `${index * 0.15}s` }}
                id={`initiative-${index}`}
              >
                {/* Top gradient bar */}
                <div className="h-1.5 bg-gradient-to-r from-primary via-primary-light to-accent" />
                <div className="p-6">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-primary/10 text-primary mb-3">
                    {initiative.tag}
                  </span>
                  <h3 className="text-lg font-bold text-text-dark mb-3 group-hover:text-primary transition-colors">
                    {initiative.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {initiative.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-accent hover:text-accent-light transition-colors"
                  >
                    Learn more
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
