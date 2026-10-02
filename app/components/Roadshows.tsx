"use client";

import { useEffect, useRef, useState } from "react";

const events = [
  {
    name: "Ideathon",
    tag: "Innovation",
    description:
      "Structured idea generation challenges where students pitch solutions to real-world problems in business, tech, and social impact.",
    accent: "#e11d48",
  },
  {
    name: "Hackathon",
    tag: "Build",
    description:
      "Intensive coding and product-building sprints where teams develop working prototypes in 24–48 hours.",
    accent: "#7c3aed",
  },
  {
    name: "Founder Workshops",
    tag: "Mentorship",
    description:
      "Interactive sessions led by startup founders sharing real-world lessons on building, scaling, and sustaining a business.",
    accent: "#0891b2",
  },
  {
    name: "Business Consulting",
    tag: "Advisory",
    description:
      "Expert-led consulting sessions covering business strategy, project planning, IT solutions, and go-to-market approaches.",
    accent: "#16a34a",
  },
  {
    name: "Entrepreneur Meet",
    tag: "Networking",
    description:
      "Curated meetups connecting students with entrepreneurs, investors, and industry professionals for mentorship and collaboration.",
    accent: "#d97706",
  },
  {
    name: "IT & Tech Clinics",
    tag: "Technology",
    description:
      "Hands-on tech workshops on software development, AI, digital tools, and emerging technologies for startups.",
    accent: "#4f46e5",
  },
];

const tags = ["Ideathons & Hackathons", "Founder Mentorship", "Business Consulting"];

export default function Roadshows() {
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
      className="pb-16 md:pb-24"
      id="events-programs-section"
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
            What We Organise
          </span>
          <h2
            className="text-[1.5rem] md:text-[1.85rem] lg:text-[2.15rem] font-bold text-accent mb-4 leading-[1.3] tracking-normal max-w-3xl"
            style={{
              fontFamily: "'Georgia', 'Playfair Display', serif",
            }}
          >
            Events, Programs & Expert Sessions
          </h2>
          <p className="text-text-muted text-[14px] md:text-[15px] leading-[1.8] max-w-2xl font-[family-name:var(--font-heading)]">
            From ideathons and hackathons to founder-led workshops and business consulting — IIC creates hands-on opportunities for students to grow, build, and connect.
          </p>
        </div>

        {/* Events Grid */}
        <div
          className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0 px-1 sm:px-0">
            {events.map((event, index) => (
              <div
                key={index}
                className={`group relative flex items-start gap-5 py-7 border-b border-border-light/50 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.25 + index * 0.08}s` }}
              >
                {/* Large ghost number */}
                <span
                  className="text-[48px] font-black leading-none select-none opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-400 flex-shrink-0 -mt-1"
                  style={{
                    fontFamily: "'Georgia', 'Playfair Display', serif",
                    color: event.accent,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="flex-1 pt-1">
                  {/* Tag */}
                  <span
                    className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1.5 block"
                    style={{ color: event.accent }}
                  >
                    {event.tag}
                  </span>
                  <h3 className="text-[17px] md:text-[18px] font-[family-name:var(--font-heading)] font-bold text-primary-dark mb-1.5 group-hover:text-accent transition-colors duration-300">
                    {event.name}
                  </h3>
                  <p className="text-text-muted text-[13px] leading-[1.7]">
                    {event.description}
                  </p>
                </div>

                {/* Accent dot */}
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-3 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"
                  style={{ backgroundColor: event.accent }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tags strip */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-10 pt-6 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.55s" }}
        >
          {tags.map((tag, index) => (
            <span key={index} className="flex items-center gap-3">
              <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-primary-dark/50">
                {tag}
              </span>
              {index < tags.length - 1 && (
                <span className="w-[1px] h-4 bg-border-light" />
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
