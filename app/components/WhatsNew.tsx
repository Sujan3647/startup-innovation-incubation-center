"use client";

import { useState, useEffect, useCallback } from "react";

const newsItems = [
  {
    id: 1,
    text: "Pre-Proposal Conference/ Pre-Bid Meeting Date and Time. [Consultancy Services for Preparing Detailed Project Report (DPR) of Flood Risk Mitigation Plan in Krishna River Basin including Survey, Design and Cost Estimates of Flood Mitigation Works.",
    link: "#",
    date: "25 Oct 2023",
  },
  {
    id: 2,
    text: "Pre-Proposal Conference/ Pre-Bid Meeting Date and Time. [Consultancy Services for Preparing Detailed Project Report (DPR) of Flood Risk Mitigation Plan in Krishna River Basin including Survey, Design and Cost Estimates of Flood Mitigation Works.]",
    link: "#",
    date: "22 Oct 2023",
  },
  {
    id: 3,
    text: "ICFAI University Tripura Startup, Innovation & Incubation Center invites proposals for collaborative projects and startup incubation.",
    link: "#",
    date: "20 Oct 2023",
  },
  {
    id: 4,
    text: "Notice regarding the submission of Expression of Interest (EOI) for empanelment of agencies for district-level monitoring.",
    link: "#",
    date: "18 Oct 2023",
  },
];

export default function WhatsNew() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    const timer = setInterval(nextPage, 8000);
    return () => clearInterval(timer);
  }, [nextPage]);

  const visibleItems = newsItems.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <section className="py-12 md:py-16 bg-white" id="whats-new-section">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
              Updates
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mt-1">
              What&apos;s New
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary-light rounded-full mt-2" />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300"
              aria-label="Previous news"
              id="news-prev"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextPage}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark transition-all duration-300"
              aria-label="Next news"
              id="news-next"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* News cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="card-hover bg-white rounded-xl border border-border-light p-6 group"
              id={`news-card-${item.id}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-text-dark leading-relaxed line-clamp-4">
                    {item.text}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-[11px] text-text-muted">{item.date}</span>
                    <a
                      href={item.link}
                      className="text-xs font-semibold text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1 group-hover:underline"
                    >
                      More...
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
