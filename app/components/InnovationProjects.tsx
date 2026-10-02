"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    name: "Project Name 1",
    category: "AI & ML",
    description: "An advanced machine learning model for predicting crop yields.",
  },
  {
    name: "Project Name 2",
    category: "Robotics",
    description: "Autonomous delivery drones designed for urban environments.",
  },
  {
    name: "Project Name 3",
    category: "IoT",
    description: "Smart home automation systems for energy conservation.",
  },
  {
    name: "Project Name 4",
    category: "Data Science",
    description: "Predictive analytics platform for retail businesses.",
  },
  {
    name: "Project Name 5",
    category: "Web3",
    description: "Decentralized identity verification for secure transactions.",
  },
  {
    name: "Project Name 6",
    category: "AR/VR",
    description: "Immersive training simulations for medical students.",
  },
];

export default function InnovationProjects() {
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
      className="pt-16 md:pt-24 pb-8 md:pb-12 bg-gray-50"
      id="innovation-projects-section"
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
            Our Innovations
          </span>
          <h2
            className="text-[1.5rem] md:text-[1.85rem] lg:text-[2.15rem] font-bold text-accent mb-5 leading-[1.3] tracking-normal max-w-3xl"
            style={{
              fontFamily: "'Georgia', 'Playfair Display', serif",
            }}
          >
            Innovation Projects
          </h2>
          <p className="text-text-muted text-[14px] md:text-[15px] leading-[1.8] max-w-2xl font-[family-name:var(--font-heading)]">
            Explore cutting-edge projects developed by our talented innovators, pushing the boundaries of technology and problem-solving.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.15 + index * 0.1}s` }}
            >
              <div className="relative p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-xl transition-all duration-300 h-full flex flex-col items-start text-left">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary-dark text-[11px] font-bold tracking-wider uppercase rounded-full mb-4">
                  {project.category}
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-3 font-[family-name:var(--font-heading)] group-hover:text-accent transition-colors duration-300">
                  {project.name}
                </h3>
                <p className="text-gray-600 text-[14px] leading-relaxed flex-1">
                  {project.description}
                </p>
                <div className="w-10 h-[2px] bg-gradient-to-r from-accent to-gold mt-6 rounded-full group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className={`flex justify-center mt-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.6s" }}>
          <a
            href="#"
            id="cta-view-all-projects"
            className="group inline-flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm tracking-wide px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.97]"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            View all Projects
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
