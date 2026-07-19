"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Check, ArrowUpRight, Sparkles, Send, CheckCircle2, Radio } from "lucide-react";
import { SITE_CONTENT } from "../../data/content";
import { useSoul } from "../../context/SoulContext";
import { SlideButton } from "../ui/SlideButton";
import { SoulFlowButton } from "../ui/SoulFlowButton";

gsap.registerPlugin(ScrollTrigger);

export const Stage09Legacy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);
  const { scrollToStageIndex, setCursorText, setCursorColor } = useSoul();

  const [copied, setCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [resetKey, setResetKey] = useState(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(SITE_CONTENT.legacy.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  useEffect(() => {
    if (isSubmitted && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { scale: 0.8, opacity: 0, filter: "blur(20px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "back.out(1.7)" }
      );
    }
  }, [isSubmitted]);

  const handleSlideComplete = async () => {
    if (!formRef.current) return;

    if (!formRef.current.reportValidity()) {
      setSubmitStatus("error");
      setErrorMessage("Please complete all required fields.");
      setTimeout(() => setSubmitStatus("idle"), 2500);
      return;
    }

    if (submitStatus === "loading") return;

    setSubmitStatus("loading");
    setErrorMessage(null);
    setCursorText("SENDING...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      // ── Crazy GSAP Form Dissolve into Cosmic Confirmation ──────────
      setSubmitStatus("success");

      const tl = gsap.timeline({
        onComplete: () => {
          setIsSubmitted(true);
          setCursorText(null);
        },
      });

      tl.to(formRef.current, {
        scale: 0.95,
        opacity: 0,
        filter: "blur(15px)",
        y: -30,
        duration: 0.6,
        ease: "power3.in",
      });
    } catch (err: any) {
      console.error("Transmission error:", err);
      setErrorMessage(err.message || "Failed to send transmission. Please try again.");
      setSubmitStatus("error");
      setCursorText(null);
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSubmitStatus("idle");
    setResetKey(prev => prev + 1);
    setErrorMessage(null);
    setFormData({ name: "", email: "", phone: "", message: "" });
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { scale: 0.95, opacity: 0, filter: "blur(15px)", y: 30 },
        { scale: 1, opacity: 1, filter: "blur(0px)", y: 0, duration: 0.7, ease: "power3.out" }
      );
    }
  };

  // GSAP Entrance animation for form fields
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const fields = el.querySelectorAll(".form-field-anim");
    gsap.fromTo(
      fields,
      { opacity: 0, y: 40, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      id="stage-5"
      className="relative w-full z-20 overflow-hidden bg-transparent"
      style={{ paddingTop: "140px", paddingBottom: "100px" }}
    >
      {/* Ambient golden portal glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,216,144,0.05) 0%, transparent 75%)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12 relative z-10">

        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="mb-16 sm:mb-24 text-center sm:text-left">
          <div className="inline-flex items-center gap-4 mb-4">
            <span className="font-mono text-xs font-bold tracking-[0.35em] text-[#ffd890] animate-pulse flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 inline text-[#ffd890]" />
              06 / LEGACY
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-r from-[#ffd890] to-transparent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/35">
              THE TRANSMISSION PORTAL
            </span>
          </div>
          <h2 className="font-serif-italic text-5xl sm:text-7xl md:text-8xl tracking-wide text-white drop-shadow-lg">
            {SITE_CONTENT.legacy.closingLine}
          </h2>
          <p className="mt-4 max-w-2xl font-mono text-xs sm:text-sm tracking-[0.2em] text-white/60 uppercase leading-relaxed">
            {SITE_CONTENT.legacy.subline}
          </p>
        </div>

        {/* ── Interactive GSAP Form vs Social Footprint Grid ─────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left 7 cols: The Astral Transmission Form (Zero Boxy Inputs!) */}
          <div className="lg:col-span-7 relative min-h-[520px]">

            {!isSubmitted ? (
              <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="space-y-12">

                {/* Field 1: Identification */}
                <div className="form-field-anim relative group">
                  <label className="block font-mono text-xs font-bold tracking-[0.3em] text-[#ffd890] uppercase mb-3">
                    01 // IDENTIFICATION [ NAME OR STUDIO ]
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name..."
                    className="w-full bg-transparent border-b border-white/20 py-4 font-serif-italic text-2xl sm:text-4xl text-white placeholder-white/20 focus:outline-none focus:border-[#ffd890] transition-colors duration-300"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ffd890] transition-all duration-500 group-focus-within:w-full shadow-[0_0_12px_#ffd890]" />
                </div>

                {/* Field 2: Coordinates */}
                <div className="form-field-anim relative group">
                  <label className="block font-mono text-xs font-bold tracking-[0.3em] text-[#ffd890] uppercase mb-3">
                    02 // ELECTRONIC COORDINATES [ EMAIL ]
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-transparent border-b border-white/20 py-4 font-serif-italic text-2xl sm:text-4xl text-white placeholder-white/20 focus:outline-none focus:border-[#ffd890] transition-colors duration-300"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ffd890] transition-all duration-500 group-focus-within:w-full shadow-[0_0_12px_#ffd890]" />
                </div>

                {/* Field 3: Telemetry Contact (Phone - Optional) */}
                <div className="form-field-anim relative group">
                  <label className="block font-mono text-xs font-bold tracking-[0.3em] text-[#ffd890] uppercase mb-3">
                    03 // TELEMETRY CONTACT [ PHONE (OPTIONAL) ]
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 80000 00000"
                    className="w-full bg-transparent border-b border-white/20 py-4 font-serif-italic text-2xl sm:text-4xl text-white placeholder-white/20 focus:outline-none focus:border-[#ffd890] transition-colors duration-300"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ffd890] transition-all duration-500 group-focus-within:w-full shadow-[0_0_12px_#ffd890]" />
                </div>

                {/* Field 4: Message */}
                <div className="form-field-anim relative group">
                  <label className="block font-mono text-xs font-bold tracking-[0.3em] text-[#ffd890] uppercase mb-3">
                    04 // MESSAGE [ PROJECT DETAILS & VISION ]
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe the architecture of what we shall build..."
                    className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-base sm:text-lg text-white placeholder-white/20 focus:outline-none focus:border-[#ffd890] transition-colors duration-300 resize-none"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ffd890] transition-all duration-500 group-focus-within:w-full shadow-[0_0_12px_#ffd890]" />
                </div>

                {/* Submit Action Pill Button */}
                <div className="form-field-anim pt-4 space-y-4">
                  {errorMessage && (
                    <div className="p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 font-mono text-xs tracking-[0.1em] uppercase">
                      ⚠️ ERROR: {errorMessage}
                    </div>
                  )}
                  <div
                    onMouseEnter={() => {
                      if (submitStatus === "idle") {
                        setCursorText("TRANSMIT");
                        setCursorColor("#ffd890");
                      }
                    }}
                    onMouseLeave={() => setCursorText(null)}
                    className="inline-block"
                  >
                    <SlideButton
                      status={submitStatus}
                      onComplete={handleSlideComplete}
                      resetKey={resetKey}
                    />
                  </div>
                </div>

              </form>
            ) : (
              /* ── Confirmation State (GSAP Dissolve Result) ────────── */
              <div
                ref={successRef}
                className="py-16 px-8 rounded-3xl border border-[#ffd890]/40 bg-gradient-to-b from-[#ffd890]/10 via-black/90 to-black/95 text-center space-y-6 shadow-[0_0_80px_rgba(255,216,144,0.2)]"
              >
                <div className="w-20 h-20 rounded-full bg-[#ffd890]/20 border border-[#ffd890] flex items-center justify-center mx-auto shadow-[0_0_30px_#ffd890]">
                  <CheckCircle2 className="w-10 h-10 text-[#ffd890] animate-pulse" />
                </div>
                <h3 className="font-serif-italic text-4xl sm:text-5xl text-white">
                  Transmission Received
                </h3>
                <p className="font-mono text-xs tracking-[0.25em] text-[#ffd890] uppercase max-w-md mx-auto leading-relaxed">
                  SIGNAL CHARGED BY THE VOID · WE SHALL INITIATE TELEMETRY CONTACT WITHIN 24 HOURS.
                </p>
                <div className="pt-4">
                  <SoulFlowButton
                    onClick={resetForm}
                    variant="dark"
                    className="mx-auto text-white/50 text-[10px] border-white/10"
                  >
                    SEND ANOTHER TRANSMISSION
                  </SoulFlowButton>
                </div>
              </div>
            )}

          </div>

          {/* Right 5 cols: Direct Email Copy & Digital Footprint ─────── */}
          <div className="lg:col-span-5 space-y-10">

            {/* Direct Email Transmission Box */}
            <div className="form-field-anim rounded-3xl border border-white/15 bg-black/60 p-8 sm:p-10 hover:border-[#ffd890]/40 transition-all duration-500">
              <span className="block font-mono text-xs tracking-[0.25em] text-[#ffd890] uppercase font-bold mb-3">
                DIRECT TRANSMISSION LINK
              </span>
              <p className="font-sans text-sm leading-relaxed text-white/70 mb-6">
                Prefer direct client email? Copy my electronic address below for immediate studio outreach.
              </p>

                <SoulFlowButton
                  onClick={handleCopy}
                  onMouseEnter={() => {
                    setCursorText("COPY");
                    setCursorColor("#ffd890");
                  }}
                  onMouseLeave={() => setCursorText(null)}
                  variant="gold"
                  className="w-full border-white/15 bg-black/40"
                >
                  {copied ? "COPIED ✓" : SITE_CONTENT.legacy.contact.email}
                </SoulFlowButton>
            </div>

            {/* Social Links Slab */}
            <div className="form-field-anim rounded-3xl border border-white/15 bg-black/60 p-8 sm:p-10 hover:border-white/30 transition-all duration-500">
              <span className="block font-mono text-xs tracking-[0.25em] text-white/60 uppercase font-bold mb-6">
                DIGITAL FOOTPRINT
              </span>

              <div className="space-y-2">
                {SITE_CONTENT.legacy.socials.map((social) => (
                  <SoulFlowButton
                    key={social.name}
                    as="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="gold"
                    className="w-full border-white/10 bg-white/[0.03] hover:border-[#ffd890]/50"
                  >
                    {social.name}
                  </SoulFlowButton>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-white/40">
                <span>LOCATION // {SITE_CONTENT.legacy.contact.location}</span>
                <span>EST. 2026</span>
              </div>
            </div>

          </div>

        </div>

        {/* ── Footer & Return to Void ────────────────────────────────── */}
        <footer className="mt-24 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
            {SITE_CONTENT.legacy.copyright}
          </p>

          <SoulFlowButton
            onClick={() => scrollToStageIndex(0)}
            variant="cream"
            className="text-[10px]"
          >
            RETURN TO THE VOID ↑
          </SoulFlowButton>
        </footer>

      </div>
    </section>
  );
};