"use client";

import Image from "next/image";

const featuresList = [
  {
    title: "Startup Mentorship",
    description: "Guidance from experienced industry leaders and academic experts.",
    bgColor: "bg-orange-50",
  },
  {
    title: "Innovation & R&D",
    description: "Cutting-edge research facilities and patent support.",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Industry Partnerships",
    description: "Collaborations with top corporate and technology leaders.",
    bgColor: "bg-teal-50",
  },
  {
    title: "Incubation & Acceleration",
    description: "Structured support for scaling early-stage innovations and student ventures.",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Prototyping Labs",
    description: "State-of-the-art incubation labs and maker facilities.",
    bgColor: "bg-amber-50",
  },
  {
    title: "Global Networking",
    description: "Connecting local innovators with national and international ecosystems.",
    bgColor: "bg-cyan-50",
  },
];

export default function ObjectivesSection() {

  return (
    <section
      className="py-16 md:py-24 bg-white relative overflow-hidden animate-fade-in scroll-mt-[150px]"
      id="objectives-section"
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left - VC Photo section */}
          <div className="lg:col-span-5 relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[550px] ml-0 lg:-ml-6">
            <Image
              src="/leaders/ICFAI UNIVERSITY TRIPURA VC.png"
              alt="Vice Chancellor, ICFAI University Tripura"
              fill
              className="object-contain object-center"
              priority
            />
          </div>

          {/* Right - Centered Text block matching image reference */}
          <div className="lg:col-span-7 flex flex-col items-center justify-start text-center px-4 md:px-8">
            <div className="mb-3">
              <span className="text-[13px] md:text-[14px] font-bold tracking-[0.25em] uppercase text-primary/70 block mb-1" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
                Leadership & Vision
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#1a2d50] font-[family-name:var(--font-heading)] tracking-tight">
                Prof. (Dr.) Biplab Halder
              </h3>
              <span className="text-xs md:text-sm font-bold text-accent uppercase tracking-wider block mt-0.5">
                Vice Chancellor, ICFAI University Tripura
              </span>
            </div>

            <h2 className="text-[1.35rem] md:text-[1.65rem] lg:text-[1.95rem] font-bold text-accent mb-4 leading-[1.3] tracking-normal" style={{ fontFamily: "'Georgia', 'Playfair Display', serif" }}>
              Fostering Innovation, Entrepreneurship<br />& Academic Excellence
            </h2>

            <div className="space-y-4 text-[14px] md:text-[15px] text-[#4b5563] leading-[1.8] font-[family-name:var(--font-heading)] font-medium tracking-wide max-w-2xl">
              <p>
                At <strong className="font-bold text-primary-dark">ICFAI University Tripura</strong>, the <strong className="font-bold text-accent">Startup Innovation & Incubation Center</strong> is dedicated to empowering aspiring entrepreneurs, igniting creative problem-solving, and driving transformative socio-economic development across Northeast India.
              </p>
              <p>
                Under the visionary guidance of <strong className="font-bold text-primary-dark">Prof. (Dr.) Biplab Halder</strong>, we offer comprehensive incubation support — from ideation and advanced prototyping to expert workshops and industry mentorship — translating high-potential ideas into thriving, sustainable enterprises.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 mt-8 w-full text-left max-w-2xl">
              {featuresList.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-accent">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-[13px] font-[family-name:var(--font-heading)] font-bold text-[#1a2d50] tracking-wide">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
