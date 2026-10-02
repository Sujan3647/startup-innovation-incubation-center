"use client";

import React, { useState, useRef, useEffect } from "react";

interface FormData {
  fullName: string;
  email: string;
  contactNo: string;
  purpose: string;
}

export default function CollaborationForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    contactNo: "",
    purpose: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Hash-based open/close listener
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#collaborate") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Check initial hash on mount
    checkHash();

    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setErrors({});
    
    // Remove the hash from URL without page reload
    if (window.location.hash === "#collaborate") {
      window.history.pushState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };


  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.contactNo.trim()) newErrors.contactNo = "Contact Number is required";
    if (!formData.purpose.trim()) newErrors.purpose = "Purpose of collaboration is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSending(true);
    setSendError(null);

    try {
      const res = await fetch("/api/send-collaboration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          contactNo: formData.contactNo,
          purpose: formData.purpose,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to send");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setSendError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      contactNo: "",
      purpose: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-6 animate-fade-in-up"
      style={{ animationDuration: "0.25s" }}
    >
      {/* Modal Box (Landscape Split Layout) */}
      <div
        ref={modalContentRef}
        className="relative bg-white w-full max-w-5xl border border-[#e0e4eb] shadow-2xl rounded-none flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] overflow-hidden animate-fade-in-up"
        style={{ animationDelay: "0.05s", animationDuration: "0.3s" }}
      >
        {/* Left Column: Visual Sidebar */}
        <div className="hidden md:flex md:w-[32%] bg-[#e65100] text-white p-8 flex-col justify-between relative overflow-hidden select-none flex-shrink-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rotate-45 transform translate-x-12 -translate-y-12"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-dark/20 rounded-full transform -translate-x-16 translate-y-16 blur-2xl"></div>
          
          <div className="text-left">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/90 block mb-1" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
              IUT SIC Partner
            </span>
            <h4 className="text-xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Georgia', 'Playfair Display', serif" }}>
              Collaboration Portal
            </h4>
            <div className="w-10 h-0.5 bg-white mb-8"></div>
            
            <p className="text-[13px] text-white/85 leading-relaxed mb-6 font-medium">
              Partner with the Startup & Innovation Cell to drive research, support builders, and foster talent.
            </p>

            <ul className="space-y-4 text-left">
              {[
                "Industry & CSR partnerships",
                "Incubation & startup mentoring",
                "Cohort sponsorships & grants",
                "Co-working & lab collaboration",
              ].map((perk, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[12.5px] text-white/90">
                  <svg className="w-4 h-4 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t border-white/10 pt-4 mt-auto text-left">
            <span className="text-[11px] text-white/55 block font-medium">Contact Office</span>
            <span className="text-[12px] font-bold text-white">contact@sic.iutripura.in</span>
          </div>
        </div>

        {/* Right Column: Form Area */}
        <div className="flex-grow flex flex-col max-h-[90vh] md:max-h-[85vh] overflow-hidden">
          {/* Modal Header */}
          <div className="flex justify-between items-center px-6 md:px-8 py-5 border-b border-[#e0e4eb] flex-shrink-0">
            <div className="text-left">
              <h3
                className="text-[1.4rem] md:text-[1.6rem] font-bold text-[#1a237e]"
                style={{ fontFamily: "'Georgia', 'Playfair Display', serif" }}
              >
                Collaborate With Us
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-2 border border-transparent hover:border-gray-300 hover:bg-gray-50 text-gray-500 hover:text-black transition-all duration-200 rounded-none flex items-center justify-center w-10 h-10"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto px-6 md:px-10 py-6 flex-grow">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="collab-fullName"
                  className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-dark/80"
                  style={{ fontFamily: "'Courier New', Courier, monospace" }}
                >
                  Full Name *
                </label>
                <input
                  id="collab-fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleTextChange}
                  placeholder="E.g. Dr. Jane Smith / TechCorp Solutions"
                  className={`w-full border rounded-none px-3.5 py-2.5 text-[14px] text-primary-dark placeholder-gray-400 bg-gray-50/30 focus:outline-none transition-all duration-200 ${
                    errors.fullName
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent"
                  }`}
                />
                {errors.fullName && (
                  <span className="text-red-500 text-[11px] font-semibold">
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="collab-email"
                    className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-dark/80"
                    style={{ fontFamily: "'Courier New', Courier, monospace" }}
                  >
                    Email Address *
                  </label>
                  <input
                    id="collab-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleTextChange}
                    placeholder="partner@company.com"
                    className={`w-full border rounded-none px-3.5 py-2.5 text-[14px] text-primary-dark placeholder-gray-400 bg-gray-50/30 focus:outline-none transition-all duration-200 ${
                      errors.email
                        ? "border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-[11px] font-semibold">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Contact No */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="collab-contactNo"
                    className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-dark/80"
                    style={{ fontFamily: "'Courier New', Courier, monospace" }}
                  >
                    Contact No *
                  </label>
                  <input
                    id="collab-contactNo"
                    name="contactNo"
                    type="tel"
                    value={formData.contactNo}
                    onChange={handleTextChange}
                    placeholder="E.g. +91 98765 43210"
                    className={`w-full border rounded-none px-3.5 py-2.5 text-[14px] text-primary-dark placeholder-gray-400 bg-gray-50/30 focus:outline-none transition-all duration-200 ${
                      errors.contactNo
                        ? "border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent"
                    }`}
                  />
                  {errors.contactNo && (
                    <span className="text-red-500 text-[11px] font-semibold">
                      {errors.contactNo}
                    </span>
                  )}
                </div>
              </div>

              {/* Purpose */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="collab-purpose"
                  className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-dark/80"
                  style={{ fontFamily: "'Courier New', Courier, monospace" }}
                >
                  Purpose *
                </label>
                <textarea
                  id="collab-purpose"
                  name="purpose"
                  rows={4}
                  value={formData.purpose}
                  onChange={handleTextChange}
                  placeholder="Describe how you wish to collaborate (e.g. Industry Partnership, Mentorship, Guest Speaking, Startup Incubation, Funding)..."
                  className={`w-full border rounded-none px-3.5 py-2.5 text-[14px] text-primary-dark placeholder-gray-400 bg-gray-50/30 focus:outline-none transition-all duration-200 resize-none ${
                    errors.purpose
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent"
                  }`}
                />
                {errors.purpose && (
                  <span className="text-red-500 text-[11px] font-semibold">
                    {errors.purpose}
                  </span>
                )}
              </div>


              {/* Submit Button */}
              <div className="flex flex-col gap-3 pt-3">
                {sendError && (
                  <div className="border border-red-300 bg-red-50 px-4 py-3 text-red-700 text-[12px] font-semibold rounded-none">
                    ⚠ {sendError}
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={sending}
                    className="group inline-flex items-center gap-2 bg-[#1a237e] hover:bg-accent text-white font-bold text-[13px] tracking-wider px-8 py-3.5 rounded-none shadow-sm hover:shadow transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Proposal
                        <svg className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* SUCCESS STATE & SUBMISSION SUMMARY */
            <div className="py-6 text-center flex flex-col items-center justify-center gap-5">
              <div className="w-14 h-14 bg-[#eaf8f4] border border-[#a2e3cc] flex items-center justify-center text-[#0e6655] rounded-none mb-1">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3
                  className="text-[1.6rem] font-bold text-[#1a237e] mb-1.5"
                  style={{ fontFamily: "'Georgia', 'Playfair Display', serif" }}
                >
                  Proposal Submitted!
                </h3>
                <p className="text-text-muted text-[14px] max-w-md mx-auto font-medium leading-relaxed">
                  Thank you for reaching out, <span className="font-bold text-[#1a237e]">{formData.fullName}</span>. We&apos;ve received your collaboration query and will review it shortly.
                </p>
              </div>

              {/* Submitted Details Summary Card */}
              <div className="w-full text-left bg-gray-50 border border-gray-200 p-5 md:p-6 mt-2 rounded-none">
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent mb-3 border-b border-gray-200 pb-1.5" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
                  Submission Summary
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5 text-[12.5px]">
                  <div>
                    <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] block" style={{ fontFamily: "'Courier New', Courier, monospace" }}>Full Name</span>
                    <span className="font-semibold text-primary-dark">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] block" style={{ fontFamily: "'Courier New', Courier, monospace" }}>Email Address</span>
                    <span className="font-semibold text-primary-dark">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] block" style={{ fontFamily: "'Courier New', Courier, monospace" }}>Contact Number</span>
                    <span className="font-semibold text-primary-dark">{formData.contactNo}</span>
                  </div>
                </div>

                <div className="mt-3.5 pt-3.5 border-t border-gray-200 text-[12.5px]">
                  <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] block" style={{ fontFamily: "'Courier New', Courier, monospace" }}>Purpose of Collaboration</span>
                  <p className="font-medium text-primary-dark mt-1 whitespace-pre-line leading-relaxed">
                    {formData.purpose}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-gray-300 hover:border-accent hover:text-accent font-bold text-[10px] tracking-wider uppercase px-5 py-3 rounded-none transition-colors duration-300"
                >
                  Send another
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-[#1a237e] hover:bg-accent text-white font-bold text-[10px] tracking-wider uppercase px-5 py-3 rounded-none transition-colors duration-300"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
