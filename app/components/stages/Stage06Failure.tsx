"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ShieldAlert, Zap } from "lucide-react";
import { SITE_CONTENT } from "../../data/content";
import { useSoul } from "../../context/SoulContext";

gsap.registerPlugin(ScrollTrigger);

export const Stage06Failure: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef<HTMLQuoteElement | null>(null);
  const slabsRef = useRef<HTMLDivElement | null>(null);
  const { setCursorText, setCursorColor } = useSoul();

  useEffect(() => {
    const container = containerRef.current;
    const quote = quoteRef.current;
    const slabsEl = slabsRef.current;
    if (!container || !quote || !slabsEl) return;

    // ── 1. CRT Glitch & Chromatic Reconstruction on Quote ───────────
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top 75%",
      end: "top 25%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        // As progress goes 0 -> 1, glitch dissolves into pure harmony
        const skew = Math.max(0, (1 - progress) * 15);
        const split = Math.max(0, (1 - progress) * 8);
        
        quote.style.transform = `skewX(${skew}deg) scale(${0.95 + progress * 0.05})`;
        quote.style.textShadow = progress < 0.95 
          ? `-${split}px 0px 0px rgba(255,0,85,0.7), ${split}px 0px 0px rgba(0,255,255,0.7)` 
          : "0px 0px 30px rgba(255,255,255,0.2)";
      },
    });

    // ── 2. Sequential Slab Entrance ─────────────────────────────────
    const slabs = slabsEl.querySelectorAll(".editorial-slab");
    gsap.fromTo(
      slabs,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: slabsEl,
          start: "top 80%",
        },
      }
    );

    // ── 3. Floating background shards ───────────────────────────────
    const shards = container.querySelectorAll(".broken-shard");
    shards.forEach((shard, i) => {
      gsap.to(shard, {
        y: (i % 2 === 0 ? 1 : -1) * 150,
        rotateZ: (i % 2 === 0 ? 1 : -1) * 180,
        duration: 15 + i * 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="stage-5"
      className="relative w-full z-20 overflow-hidden bg-transparent"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      {/* Ambient red/cosmic warning glow that fades into gold */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,96,96,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Floating Broken Wireframe Shards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="broken-shard absolute top-[15%] left-[10%] h-24 w-12 border border-[#ff6060]/20 rotate-12" />
        <div className="broken-shard absolute top-[60%] right-[15%] h-36 w-20 border border-white/10 -rotate-45" />
        <div className="broken-shard absolute bottom-[20%] left-[40%] h-16 w-16 border border-[#ffc490]/20 rotate-6" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-12">
        
        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs font-bold tracking-[0.35em] text-[#ff6060] animate-pulse flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 inline" />
              06 / FAILURE
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-r from-[#ff6060] to-transparent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/35">
              THE DISSOLUTION OF CERTAINTY
            </span>
          </div>
          
          <h2 className="font-serif-italic text-5xl sm:text-7xl tracking-wide text-white drop-shadow-md">
            The Architecture of Resilience
          </h2>
        </div>

        {/* ── CRT Glitch & Reconstruction Philosophical Quote ────────── */}
        <div
          onMouseEnter={() => {
            setCursorText("REBUILD");
            setCursorColor("#ffc490");
          }}
          onMouseLeave={() => setCursorText(null)}
          className="my-16 sm:my-24 py-12 px-6 sm:px-12 border-y border-white/10 relative group cursor-default"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#ff6060] via-transparent to-[#ffc490] opacity-40 group-hover:opacity-100 transition-opacity" />
          
          <blockquote
            ref={quoteRef}
            className="font-serif-italic text-3xl sm:text-5xl md:text-6xl leading-tight sm:leading-relaxed tracking-wide text-white drop-shadow-2xl select-none transition-colors duration-500 group-hover:text-[#ffc490]"
          >
            &ldquo;{SITE_CONTENT.failure.quote}&rdquo;
          </blockquote>
          
          <div className="mt-6 flex items-center justify-end gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
            <Zap className="w-3.5 h-3.5 text-[#ffc490]" />
            <span>SYSTEM RECONSTRUCTION COMPLETE // 60FPS STABILITY</span>
          </div>
        </div>

        {/* ── Dual Editorial Slabs (Zero Boxy Cards!) ────────────────── */}
        <div ref={slabsRef} className="space-y-10">
          
          {/* Slab 01: The Collapse */}
          <div className="editorial-slab border-l-2 border-[#ff6060]/60 pl-6 sm:pl-10 py-4 transition-all duration-500 hover:border-[#ff6060] group">
            <div className="flex items-center gap-4 mb-3">
              <span className="font-mono text-xs font-bold tracking-[0.3em] text-[#ff6060]">
                01 // THE COLLAPSE
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            <p className="font-sans text-base sm:text-lg leading-relaxed text-white/80 max-w-4xl group-hover:text-white transition-colors">
              {SITE_CONTENT.failure.story}
            </p>
          </div>

          {/* Slab 02: The Lesson Learned */}
          <div className="editorial-slab border-l-2 border-[#ffc490]/60 pl-6 sm:pl-10 py-4 transition-all duration-500 hover:border-[#ffc490] group">
            <div className="flex items-center gap-4 mb-3">
              <span className="font-mono text-xs font-bold tracking-[0.3em] text-[#ffc490] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                02 // THE RESILIENCE & AWAKENING
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            <p className="font-sans text-base sm:text-lg leading-relaxed text-white/90 max-w-4xl font-medium group-hover:text-[#ffd890] transition-colors">
              {SITE_CONTENT.failure.lesson}
            </p>
          </div>

        </div>

        {/* ── Bottom Telemetry Strip ─────────────────────────────────── */}
        <div className="mt-24 flex items-center justify-between font-mono text-[9px] tracking-[0.3em] uppercase text-white/15 border-t border-white/8 pt-6 select-none">
          <span>THE DISSOLUTION OF CERTAINTY</span>
          <span>STAGE 06 · FAILURE</span>
          <span>FROM COLLAPSE TO MASTERY</span>
        </div>

      </div>
    </section>
  );
};
