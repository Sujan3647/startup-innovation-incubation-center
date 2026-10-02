"use client";

import React, { useState, useRef, useEffect } from "react";

interface FormData {
  fullName: string;
  idNo: string;
  program: string;
  year: string;
  phoneNo: string;
  whatsappNo: string;
  email: string;
  whySelect: string;
  valueBring: string;
  timeContribute: string;
  expectToLearn: string;
  previousClub: string;
  linkedin: string;
}

export default function MembershipForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    idNo: "",
    program: "",
    year: "",
    phoneNo: "",
    whatsappNo: "",
    email: "",
    whySelect: "",
    valueBring: "",
    timeContribute: "",
    expectToLearn: "",
    previousClub: "",
    linkedin: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Hash-based open/close listener
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#register") {
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
    if (window.location.hash === "#register") {
      window.history.pushState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  };

  // Backdrop click handler removed per user request: only cross click closes the modal.

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


  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.idNo.trim()) newErrors.idNo = "ID Number is required";
    if (!formData.program.trim()) newErrors.program = "Program is required";
    if (!formData.year.trim()) newErrors.year = "Year/Semester is required";
    if (!formData.phoneNo.trim()) newErrors.phoneNo = "Phone Number is required";
    if (!formData.whatsappNo.trim()) newErrors.whatsappNo = "WhatsApp Number is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.whySelect.trim()) newErrors.whySelect = "This field is required";
    if (!formData.valueBring.trim()) newErrors.valueBring = "This field is required";
    if (!formData.timeContribute.trim()) newErrors.timeContribute = "This field is required";
    if (!formData.expectToLearn.trim()) newErrors.expectToLearn = "This field is required";
    if (!formData.previousClub.trim()) newErrors.previousClub = "This field is required";
    if (!formData.linkedin.trim()) {
      newErrors.linkedin = "LinkedIn Profile link is required";
    } else if (!/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(formData.linkedin)) {
      newErrors.linkedin = "Please enter a valid LinkedIn URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep(1);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setSending(true);
    setSendError(null);

    try {
      const res = await fetch("/api/send-membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          idNo: formData.idNo,
          program: formData.program,
          year: formData.year,
          phoneNo: formData.phoneNo,
          whatsappNo: formData.whatsappNo,
          email: formData.email,
          whySelect: formData.whySelect,
          valueBring: formData.valueBring,
          timeContribute: formData.timeContribute,
          expectToLearn: formData.expectToLearn,
          previousClub: formData.previousClub,
          linkedin: formData.linkedin,
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
      idNo: "",
      program: "",
      year: "",
      phoneNo: "",
      whatsappNo: "",
      email: "",
      whySelect: "",
      valueBring: "",
      timeContribute: "",
      expectToLearn: "",
      previousClub: "",
      linkedin: "",
    });
    setStep(1);
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
        <div className="hidden md:flex md:w-[32%] bg-[#1a237e] text-white p-8 flex-col justify-between relative overflow-hidden select-none flex-shrink-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rotate-45 transform translate-x-12 -translate-y-12"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full transform -translate-x-16 translate-y-16 blur-2xl"></div>
          
          <div className="text-left">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent/90 block mb-1" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
              IUT SIC
            </span>
            <h4 className="text-xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Georgia', 'Playfair Display', serif" }}>
              Startup & Innovation Cell
            </h4>
            <div className="w-10 h-0.5 bg-accent mb-8"></div>
            
            <p className="text-[13px] text-white/80 leading-relaxed mb-6 font-medium">
              Join a dynamic community of creators, builders, and entrepreneurs at ICFAI University Tripura.
            </p>

            <ul className="space-y-4 text-left">
              {[
                "Access to expert mentorship",
                "Ideation and product validation",
                "Prototyping & grant support",
                "Incubation & coworking spaces",
              ].map((perk, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[12.5px] text-white/90">
                  <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t border-white/10 pt-4 mt-auto text-left">
            <span className="text-[11px] text-white/50 block font-medium">Contact Support</span>
            <span className="text-[12px] font-bold text-accent">contact@sic.iutripura.in</span>
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
                Become a Member
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

        {/* Progress Tracker (Only show if not submitted) */}
        {!submitted && (
          <div className="flex border-b border-[#e0e4eb] flex-shrink-0">
            <div
              className={`flex-1 py-3 text-center text-[10px] md:text-xs font-bold uppercase tracking-wider ${
                step === 1 ? "bg-[#1a237e] text-white" : "bg-gray-50 text-gray-400"
              }`}
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              1. Personal Profile
            </div>
            <div
              className={`flex-1 py-3 text-center text-[10px] md:text-xs font-bold uppercase tracking-wider ${
                step === 2 ? "bg-[#1a237e] text-white" : "bg-gray-50 text-gray-400"
              }`}
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              2. Alignment & Motivation
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto px-6 md:px-10 py-6 flex-grow">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
              {step === 1 ? (
                /* STEP 1: PERSONAL DETAILS */
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="fullName"
                        className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-dark/80"
                        style={{ fontFamily: "'Courier New', Courier, monospace" }}
                      >
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleTextChange}
                        placeholder="John Doe"
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

                    {/* ID NO */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="idNo"
                        className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-dark/80"
                        style={{ fontFamily: "'Courier New', Courier, monospace" }}
                      >
                        ID NO *
                      </label>
                      <input
                        id="idNo"
                        name="idNo"
                        type="text"
                        value={formData.idNo}
                        onChange={handleTextChange}
                        placeholder="24UTSI001"
                        className={`w-full border rounded-none px-3.5 py-2.5 text-[14px] text-primary-dark placeholder-gray-400 bg-gray-50/30 focus:outline-none transition-all duration-200 ${
                          errors.idNo
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent"
                        }`}
                      />
                      {errors.idNo && (
                        <span className="text-red-500 text-[11px] font-semibold">
                          {errors.idNo}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Program */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="program"
                        className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-dark/80"
                        style={{ fontFamily: "'Courier New', Courier, monospace" }}
                      >
                        Program / Course *
                      </label>
                      <input
                        id="program"
                        name="program"
                        type="text"
                        value={formData.program}
                        onChange={handleTextChange}
                        placeholder="B.Tech CSE / MBA / BBA"
                        className={`w-full border rounded-none px-3.5 py-2.5 text-[14px] text-primary-dark placeholder-gray-400 bg-gray-50/30 focus:outline-none transition-all duration-200 ${
                          errors.program
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent"
                        }`}
                      />
                      {errors.program && (
                        <span className="text-red-500 text-[11px] font-semibold">
                          {errors.program}
                        </span>
                      )}
                    </div>

                    {/* Year */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="year"
                        className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-dark/80"
                        style={{ fontFamily: "'Courier New', Courier, monospace" }}
                      >
                        Year / Semester *
                      </label>
                      <input
                        id="year"
                        name="year"
                        type="text"
                        value={formData.year}
                        onChange={handleTextChange}
                        placeholder="3rd Year / 5th Sem"
                        className={`w-full border rounded-none px-3.5 py-2.5 text-[14px] text-primary-dark placeholder-gray-400 bg-gray-50/30 focus:outline-none transition-all duration-200 ${
                          errors.year
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent"
                        }`}
                      />
                      {errors.year && (
                        <span className="text-red-500 text-[11px] font-semibold">
                          {errors.year}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Ph No */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="phoneNo"
                        className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-dark/80"
                        style={{ fontFamily: "'Courier New', Courier, monospace" }}
                      >
                        Phone Number *
                      </label>
                      <input
                        id="phoneNo"
                        name="phoneNo"
                        type="tel"
                        value={formData.phoneNo}
                        onChange={handleTextChange}
                        placeholder="e.g. +91 9876543210"
                        className={`w-full border rounded-none px-3.5 py-2.5 text-[14px] text-primary-dark placeholder-gray-400 bg-gray-50/30 focus:outline-none transition-all duration-200 ${
                          errors.phoneNo
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent"
                        }`}
                      />
                      {errors.phoneNo && (
                        <span className="text-red-500 text-[11px] font-semibold">
                          {errors.phoneNo}
                        </span>
                      )}
                    </div>

                    {/* WhatsApp No */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="whatsappNo"
                        className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-dark/80"
                        style={{ fontFamily: "'Courier New', Courier, monospace" }}
                      >
                        WhatsApp Number *
                      </label>
                      <input
                        id="whatsappNo"
                        name="whatsappNo"
                        type="tel"
                        value={formData.whatsappNo}
                        onChange={handleTextChange}
                        placeholder="e.g. +91 9876543210"
                        className={`w-full border rounded-none px-3.5 py-2.5 text-[14px] text-primary-dark placeholder-gray-400 bg-gray-50/30 focus:outline-none transition-all duration-200 ${
                          errors.whatsappNo
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent"
                        }`}
                      />
                      {errors.whatsappNo && (
                        <span className="text-red-500 text-[11px] font-semibold">
                          {errors.whatsappNo}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="email"
                        className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-dark/80"
                        style={{ fontFamily: "'Courier New', Courier, monospace" }}
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleTextChange}
                        placeholder="john.doe@university.com"
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
                  </div>


                  {/* Navigation Buttons */}
                  <div className="flex justify-end pt-3">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="group inline-flex items-center gap-2 bg-accent hover:bg-primary-dark text-white font-bold text-[13px] tracking-wider px-7 py-3 rounded-none shadow-sm hover:shadow transition-all duration-300 active:scale-[0.98]"
                    >
                      Next Option
                      <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                /* STEP 2: MOTIVATIONAL & ALIGNMENT QUESTIONS */
                <div className="flex flex-col gap-5">
                  {/* Why select you */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="whySelect"
                      className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-dark/80 text-left"
                      style={{ fontFamily: "'Courier New', Courier, monospace" }}
                    >
                      Why should we select you? *
                    </label>
                    <textarea
                      id="whySelect"
                      name="whySelect"
                      rows={3}
                      value={formData.whySelect}
                      onChange={handleTextChange}
                      placeholder="Share your primary motivation, core strengths, and passion for entrepreneurship..."
                      className={`w-full border rounded-none px-3.5 py-2.5 text-[14px] text-primary-dark placeholder-gray-400 bg-gray-50/30 focus:outline-none transition-all duration-200 resize-none ${
                        errors.whySelect
                          ? "border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent"
                      }`}
                    />
                    {errors.whySelect && (
                      <span className="text-red-500 text-[11px] font-semibold">
                        {errors.whySelect}
                      </span>
                    )}
                  </div>

                  {/* Value bring */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="valueBring"
                      className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-dark/80 text-left"
                      style={{ fontFamily: "'Courier New', Courier, monospace" }}
                    >
                      What value can you bring to the Cell? *
                    </label>
                    <textarea
                      id="valueBring"
                      name="valueBring"
                      rows={3}
                      value={formData.valueBring}
                      onChange={handleTextChange}
                      placeholder="E.g. Technical skills, content creation, event management, creative design, unique viewpoints..."
                      className={`w-full border rounded-none px-3.5 py-2.5 text-[14px] text-primary-dark placeholder-gray-400 bg-gray-50/30 focus:outline-none transition-all duration-200 resize-none ${
                        errors.valueBring
                          ? "border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent"
                      }`}
                    />
                    {errors.valueBring && (
                      <span className="text-red-500 text-[11px] font-semibold">
                        {errors.valueBring}
                      </span>
                    )}
                  </div>

                  {/* Time contribute */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="timeContribute"
                      className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-dark/80 text-left"
                      style={{ fontFamily: "'Courier New', Courier, monospace" }}
                    >
                      How much time can you contribute each week? *
                    </label>
                    <input
                      id="timeContribute"
                      name="timeContribute"
                      type="text"
                      value={formData.timeContribute}
                      onChange={handleTextChange}
                      placeholder="e.g. 5-8 hours, 10 hours"
                      className={`w-full border rounded-none px-3.5 py-2.5 text-[14px] text-primary-dark placeholder-gray-400 bg-gray-50/30 focus:outline-none transition-all duration-200 ${
                        errors.timeContribute
                          ? "border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent"
                      }`}
                    />
                    {errors.timeContribute && (
                      <span className="text-red-500 text-[11px] font-semibold">
                        {errors.timeContribute}
                      </span>
                    )}
                  </div>

                  {/* Expect to learn */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="expectToLearn"
                      className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-dark/80 text-left"
                      style={{ fontFamily: "'Courier New', Courier, monospace" }}
                    >
                      What do you expect to learn from the Cell? *
                    </label>
                    <textarea
                      id="expectToLearn"
                      name="expectToLearn"
                      rows={3}
                      value={formData.expectToLearn}
                      onChange={handleTextChange}
                      placeholder="Mentorship, startup frameworks, networking opportunities, practical team leadership..."
                      className={`w-full border rounded-none px-3.5 py-2.5 text-[14px] text-primary-dark placeholder-gray-400 bg-gray-50/30 focus:outline-none transition-all duration-200 resize-none ${
                        errors.expectToLearn
                          ? "border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent"
                      }`}
                    />
                    {errors.expectToLearn && (
                      <span className="text-red-500 text-[11px] font-semibold">
                        {errors.expectToLearn}
                      </span>
                    )}
                  </div>

                  {/* Previous Club membership */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="previousClub"
                      className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-dark/80 text-left"
                      style={{ fontFamily: "'Courier New', Courier, monospace" }}
                    >
                      Have you been a member of any club, society, committee, or student organization before? *
                    </label>
                    <textarea
                      id="previousClub"
                      name="previousClub"
                      rows={3}
                      value={formData.previousClub}
                      onChange={handleTextChange}
                      placeholder="If yes, please state the organization name and your role. If no, write 'No' or 'N/A'..."
                      className={`w-full border rounded-none px-3.5 py-2.5 text-[14px] text-primary-dark placeholder-gray-400 bg-gray-50/30 focus:outline-none transition-all duration-200 resize-none ${
                        errors.previousClub
                          ? "border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent"
                      }`}
                    />
                    {errors.previousClub && (
                      <span className="text-red-500 text-[11px] font-semibold">
                        {errors.previousClub}
                      </span>
                    )}
                  </div>

                  {/* LinkedIn Profile link */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="linkedin"
                      className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary-dark/80 text-left"
                      style={{ fontFamily: "'Courier New', Courier, monospace" }}
                    >
                      LinkedIn Profile Link *
                    </label>
                    <input
                      id="linkedin"
                      name="linkedin"
                      type="url"
                      value={formData.linkedin}
                      onChange={handleTextChange}
                      placeholder="https://linkedin.com/in/username"
                      className={`w-full border rounded-none px-3.5 py-2.5 text-[14px] text-primary-dark placeholder-gray-400 bg-gray-50/30 focus:outline-none transition-all duration-200 ${
                        errors.linkedin
                          ? "border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent"
                      }`}
                    />
                    {errors.linkedin && (
                      <span className="text-red-500 text-[11px] font-semibold">
                        {errors.linkedin}
                      </span>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex flex-col gap-3 pt-3">
                    {sendError && (
                      <div className="border border-red-300 bg-red-50 px-4 py-3 text-red-700 text-[12px] font-semibold rounded-none">
                        ⚠ {sendError}
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={sending}
                        className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-600 font-bold text-[13px] tracking-wider px-5 py-3 rounded-none transition-colors duration-300 disabled:opacity-50"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={sending}
                        className="group inline-flex items-center gap-2 bg-[#1a237e] hover:bg-accent text-white font-bold text-[13px] tracking-wider px-7 py-3 rounded-none shadow-sm hover:shadow transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
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
                            Submit Application
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
                  Application Submitted!
                </h3>
                <p className="text-text-muted text-[14px] max-w-md mx-auto font-medium leading-relaxed">
                  Thank you, <span className="font-bold text-[#1a237e]">{formData.fullName}</span>. Your application for membership in the Startup, Innovation & Incubation Cell has been successfully recorded.
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
                    <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] block" style={{ fontFamily: "'Courier New', Courier, monospace" }}>ID Number</span>
                    <span className="font-semibold text-primary-dark">{formData.idNo}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] block" style={{ fontFamily: "'Courier New', Courier, monospace" }}>Program</span>
                    <span className="font-semibold text-primary-dark">{formData.program}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] block" style={{ fontFamily: "'Courier New', Courier, monospace" }}>Year / Semester</span>
                    <span className="font-semibold text-primary-dark">{formData.year}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] block" style={{ fontFamily: "'Courier New', Courier, monospace" }}>Phone & WhatsApp</span>
                    <span className="font-semibold text-primary-dark">{formData.phoneNo} / {formData.whatsappNo}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] block" style={{ fontFamily: "'Courier New', Courier, monospace" }}>Email Address</span>
                    <span className="font-semibold text-primary-dark">{formData.email}</span>
                  </div>
                </div>

                <div className="mt-3.5 pt-3.5 border-t border-gray-200 text-[12.5px]">
                  <div>
                    <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] block" style={{ fontFamily: "'Courier New', Courier, monospace" }}>LinkedIn Profile</span>
                    <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline break-all">
                      {formData.linkedin}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-gray-300 hover:border-accent hover:text-accent font-bold text-[10px] tracking-wider uppercase px-5 py-3 rounded-none transition-colors duration-300"
                >
                  Submit another
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
