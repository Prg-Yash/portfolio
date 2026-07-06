"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Check, ArrowUpRight, Sparkles, Send, CheckCircle2, Radio } from "lucide-react";
import { SITE_CONTENT } from "../../data/content";
import { useSoul } from "../../context/SoulContext";

gsap.registerPlugin(ScrollTrigger);

type ScopeOption = "WEBGL & 3D" | "FULL-STACK APP" | "CREATIVE DIRECTION" | "AI & SHADERS";

export const Stage09Legacy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);
  const { scrollToStageIndex, setCursorText, setCursorColor } = useSoul();

  const [copied, setCopied] = useState(false);
  const [selectedScopes, setSelectedScopes] = useState<ScopeOption[]>(["WEBGL & 3D"]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const toggleScope = (scope: ScopeOption) => {
    if (selectedScopes.includes(scope)) {
      if (selectedScopes.length > 1) {
        setSelectedScopes(selectedScopes.filter((s) => s !== scope));
      }
    } else {
      setSelectedScopes([...selectedScopes, scope]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(SITE_CONTENT.legacy.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || !successRef.current) return;

    // ── Crazy GSAP Form Dissolve into Cosmic Confirmation ──────────
    const tl = gsap.timeline({
      onComplete: () => {
        setIsSubmitted(true);
        gsap.fromTo(
          successRef.current,
          { scale: 0.8, opacity: 0, filter: "blur(20px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "back.out(1.7)" }
        );
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
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({ name: "", email: "", message: "" });
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
      id="stage-8"
      className="relative w-full z-20 overflow-hidden bg-transparent"
      style={{ paddingTop: "120px", paddingBottom: "100px" }}
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
              09 / LEGACY
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
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
                
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

                {/* Field 3: Scope Selector Pills */}
                <div className="form-field-anim">
                  <label className="block font-mono text-xs font-bold tracking-[0.3em] text-[#ffd890] uppercase mb-4">
                    03 // COMMISSION SCOPE [ SELECT ALL THAT APPLY ]
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {(["WEBGL & 3D", "FULL-STACK APP", "CREATIVE DIRECTION", "AI & SHADERS"] as ScopeOption[]).map((scope) => {
                      const isSelected = selectedScopes.includes(scope);
                      return (
                        <button
                          key={scope}
                          type="button"
                          onClick={() => toggleScope(scope)}
                          className={`px-5 py-2.5 rounded-full font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-2 ${
                            isSelected
                              ? "bg-[#ffd890] text-black font-bold shadow-[0_0_20px_rgba(255,216,144,0.4)] scale-105"
                              : "border border-white/15 bg-white/[0.02] text-white/70 hover:border-white/40 hover:text-white"
                          }`}
                        >
                          <Sparkles className={`w-3.5 h-3.5 ${isSelected ? "text-black" : "text-[#ffd890]"}`} />
                          {scope}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Field 4: The Vision */}
                <div className="form-field-anim relative group">
                  <label className="block font-mono text-xs font-bold tracking-[0.3em] text-[#ffd890] uppercase mb-3">
                    04 // THE VISION [ PROJECT SCOPE & TIMELINE ]
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
                <div className="form-field-anim pt-4">
                  <button
                    type="submit"
                    onMouseEnter={() => {
                      setCursorText("TRANSMIT");
                      setCursorColor("#ffd890");
                    }}
                    onMouseLeave={() => setCursorText(null)}
                    className="group/btn relative w-full sm:w-auto inline-flex items-center justify-center gap-4 rounded-full border border-[#ffd890] bg-[#ffd890] px-12 py-6 font-mono text-sm font-bold tracking-[0.3em] uppercase text-black transition-all duration-500 hover:bg-white hover:border-white hover:scale-105 shadow-[0_0_40px_rgba(255,216,144,0.3)] overflow-hidden cursor-pointer"
                  >
                    <span className="relative z-10">INITIATE TRANSMISSION ✦</span>
                    <Send className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </button>
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
                  <button
                    onClick={resetForm}
                    className="font-mono text-xs text-white/60 hover:text-white underline underline-offset-8 tracking-[0.2em] uppercase transition-colors"
                  >
                    [ SEND ANOTHER TRANSMISSION ]
                  </button>
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

              <button
                onClick={handleCopy}
                onMouseEnter={() => {
                  setCursorText("COPY");
                  setCursorColor("#ffd890");
                }}
                onMouseLeave={() => setCursorText(null)}
                className="w-full flex items-center justify-between rounded-2xl border border-white/20 bg-black/60 px-6 py-4 font-mono text-xs sm:text-sm tracking-[0.15em] text-white hover:border-[#ffd890] transition-all duration-300 group/btn cursor-pointer"
              >
                <span className="truncate mr-4 text-[#ffd890] font-bold">
                  {SITE_CONTENT.legacy.contact.email}
                </span>
                <div className="flex items-center gap-2 text-xs tracking-[0.2em] text-white/60 group-hover/btn:text-white shrink-0">
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-[#ffc490]" />
                      <span className="text-[#ffc490] font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>COPY</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Social Links Slab */}
            <div className="form-field-anim rounded-3xl border border-white/15 bg-black/60 p-8 sm:p-10 hover:border-white/30 transition-all duration-500">
              <span className="block font-mono text-xs tracking-[0.25em] text-white/60 uppercase font-bold mb-6">
                DIGITAL FOOTPRINT
              </span>

              <div className="space-y-3">
                {SITE_CONTENT.legacy.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 font-mono text-xs tracking-[0.2em] uppercase text-white/80 hover:border-[#ffd890] hover:text-white hover:bg-white/10 transition-all duration-300 group/social"
                  >
                    <span className="group-hover/social:translate-x-1 transition-transform font-semibold">{social.name}</span>
                    <ArrowUpRight className="h-4 w-4 text-white/40 group-hover/social:text-[#ffd890] transition-colors" />
                  </a>
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

          <button
            onClick={() => scrollToStageIndex(0)}
            className="group relative px-6 py-3 rounded-full border border-white/20 bg-white/5 flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-white/80 hover:border-[#ffc490] hover:text-[#ffc490] hover:bg-[#ffc490]/10 transition-all duration-300 cursor-pointer shadow-lg"
          >
            <span>RETURN TO THE VOID</span>
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1 font-bold text-base">&uarr;</span>
          </button>
        </footer>

      </div>
    </section>
  );
};
