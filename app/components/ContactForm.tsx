"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="pb-20 md:pb-28 bg-white relative overflow-hidden scroll-mt-[150px]"
      id="contact-section"
    >
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Contact Info */}
          <div
            className={`flex flex-col items-start text-left pt-4 lg:pt-10 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <span
              className="text-[15px] md:text-[16px] font-bold tracking-[0.25em] uppercase text-black block mb-3"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              Contact Information
            </span>
            <h2
              className="text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem] font-bold text-accent mb-6 leading-[1.2] tracking-normal"
              style={{ fontFamily: "'Georgia', 'Playfair Display', serif" }}
            >
              Let&apos;s discuss your<br />ideas & queries.
            </h2>
            
            <p className="text-text-muted text-[15px] leading-[1.8] max-w-md font-[family-name:var(--font-heading)] mb-10">
              Whether you&apos;re a student with a startup idea, an entrepreneur looking for mentorship, or an investor seeking opportunities — we&apos;re here to help. Drop us a message or reach out directly.
            </p>

            {/* Contact Details - Simple */}
            <div className="mt-2 flex flex-col gap-6">
              <div>
                <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-primary-dark/60 block mb-1">
                  Email Us
                </span>
                <a href="mailto:contact@sic.iutripura.in" className="text-[16px] font-[family-name:var(--font-heading)] font-bold text-accent hover:underline decoration-accent/50 underline-offset-4 transition-all duration-200">
                  contact@sic.iutripura.in
                </a>
              </div>

              <div>
                <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-primary-dark/60 block mb-1">
                  Call Us
                </span>
                <a href="tel:+919647820644" className="text-[16px] font-[family-name:var(--font-heading)] font-bold text-accent hover:underline decoration-accent/50 underline-offset-4 transition-all duration-200">
                  +91 96478 20644
                </a>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div
            className={`w-full ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 p-8 md:p-10"
              >
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary-dark/70"
                    style={{ fontFamily: "'Courier New', Courier, monospace" }}
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3.5 text-[14px] text-primary-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 bg-gray-50/50"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary-dark/70"
                    style={{ fontFamily: "'Courier New', Courier, monospace" }}
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3.5 text-[14px] text-primary-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 bg-gray-50/50"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary-dark/70"
                    style={{ fontFamily: "'Courier New', Courier, monospace" }}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your idea, project, or query..."
                    className="w-full border border-gray-200 rounded-lg px-4 py-3.5 text-[14px] text-primary-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 bg-gray-50/50 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="group mt-4 inline-flex items-center justify-center gap-2 bg-accent hover:bg-[#1a2d50] text-white font-bold text-sm tracking-wide px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
                >
                  Send Message
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </form>
            ) : (
              /* Success State */
              <div className="flex flex-col items-center justify-center gap-4 bg-white border border-gray-100 rounded-2xl shadow-sm p-12 text-center h-full min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3
                  className="text-[1.4rem] font-bold text-primary-dark"
                  style={{ fontFamily: "'Georgia', 'Playfair Display', serif" }}
                >
                  Message Sent!
                </h3>
                <p className="text-text-muted text-[15px] leading-[1.8] max-w-sm">
                  Thank you for reaching out. We&apos;ve received your query and will get back to you shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-4 text-[12px] font-bold tracking-[0.15em] uppercase text-accent hover:text-primary-dark transition-colors duration-200"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
