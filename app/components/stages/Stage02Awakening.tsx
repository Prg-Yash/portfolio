"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONTENT } from "../../data/content";
import { StardustRiver } from "../ui/StardustRiver";

gsap.registerPlugin(ScrollTrigger);

export const Stage02Awakening: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const subRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    const subEl = subRef.current;
    if (!container || !textEl || !subEl) return;

    const words = textEl.querySelectorAll(".word-span");
    const contentEl = container.querySelector(".stage-content") as HTMLElement;

    const calculateOverflow = () => {
      if (!contentEl) return 0;
      const sectionPt = window.innerWidth < 640 ? 96 : 128;
      const totalHeight = contentEl.scrollHeight + sectionPt + 40;
      return Math.max(0, totalHeight - window.innerHeight);
    };

    const isMobile = window.innerWidth < 768;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: isMobile ? "+=100%" : "+=280%",
        pin: true,
        pinSpacing: true,
        scrub: isMobile ? 0.3 : 1.2,
        invalidateOnRefresh: true,
      },
    });

    // Next-Level Light Ignition Word Scrubbing (Optimized for 100+ words)
    tl.fromTo(
      words,
      {
        opacity: 0.15,
        rotateX: isMobile ? 0 : 50,
        rotateY: isMobile ? 0 : -15,
        y: 20,
        z: isMobile ? 0 : -40,
        scale: 0.95,
        filter: isMobile ? "none" : "blur(5px)",
        color: "#ffffff",
      },
      {
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        y: 0,
        z: 0,
        scale: 1,
        filter: isMobile ? "none" : "blur(0px)",
        color: "#ffc490",
        stagger: 0.025,
        ease: "expo.out",
      }
    ).to(
      words,
      {
        color: "#f5f0e8",
        stagger: 0.025,
        duration: 0.5,
      },
      "-=0.6"
    ).fromTo(
      subEl,
      { opacity: 0, y: 50, scale: 0.95, filter: isMobile ? "none" : "blur(10px)" },
      { opacity: 1, y: 0, scale: 1, filter: isMobile ? "none" : "blur(0px)", duration: 2.0, ease: "expo.out" },
      "-=1.2"
    );

    // If content exceeds window height, smoothly pan upward across the entire scrub duration
    // so every single word and the stats block gracefully rise into full view before pin release!
    if (contentEl) {
      tl.to(
        contentEl,
        {
          y: () => -calculateOverflow(),
          ease: "none",
          duration: tl.duration() || 3.5,
        },
        0
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, []);

  const statementWords = SITE_CONTENT.about.statement.trim().split(/\s+/);

  return (
    <>
      <section
        ref={containerRef}
        id="stage-1"
      className="relative flex h-[100vh] w-full flex-col items-center justify-start pt-24 sm:pt-32 z-20 overflow-hidden perspective-[1000px]"
    >
      {/* Cinematic Volumetric Light Dawn Aura (No Blurry Shards!) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[500px] sm:h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(255,196,144,0.12)_0%,rgba(255,196,144,0.03)_45%,transparent_80%)] blur-3xl md:animate-[pulse_8s_ease-in-out_infinite]" />
      </div>

      <div className="stage-content relative z-10 mx-auto max-w-5xl text-center sm:text-left px-6 sm:px-12 will-change-transform">
        {/* Stage Header */}
        <div className="mb-6 sm:mb-8 flex items-center justify-center sm:justify-start gap-4">
          <span className="font-mono text-xs font-bold tracking-[0.3em] text-[#ffc490] animate-pulse">
            02 / AWAKENING
          </span>
          <div className="h-[1px] w-16 bg-gradient-to-r from-[#ffc490] to-transparent" />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/50">
            THE BIRTH OF AWARENESS
          </span>
        </div>

        {/* 3D Kinetic Scrubbed Statement */}
        <p
          ref={textRef}
          className="font-serif-italic text-lg sm:text-2xl md:text-3xl lg:text-[1.8rem] leading-[1.45] sm:leading-[1.4] tracking-wide text-white select-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {statementWords.map((word, idx) => (
            <span
              key={idx}
              className="word-span inline-block mr-1.5 sm:mr-2.5 mb-0 sm:mb-0.5 transition-all duration-300 hover:text-[#ffc490] hover:-translate-y-1 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(255,196,144,0.8)] cursor-default select-none"
              style={{ transformStyle: "preserve-3d" }}
            >
              {word}
            </span>
          ))}
        </p>

        {/* Editorial Stats Row (No Boxed Cards!) */}
        <div
          ref={subRef}
          className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 border-t border-white/15 pt-6 sm:pt-10 text-left"
        >
          {/* Stat 01 */}
          <div className="group flex flex-col justify-between">
            <div>
              <span className="font-mono text-[11px] tracking-[0.25em] text-[#ffc490]/80 uppercase block mb-2">
                01 — EXPERIENCE
              </span>
              <div className="font-serif-italic text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-white mb-2 group-hover:text-[#ffc490] transition-colors duration-500 select-none">
                5+
              </div>
              <h3 className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-white/90">
                YEARS EXPERIENCE
              </h3>
              {/* <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light max-w-xs">
                Crafting scalable web architectures, AI-powered systems, and full-stack digital solutions with engineering precision.
              </p> */}
            </div>
          </div>

          {/* Stat 02 */}
          <div className="group flex flex-col justify-between md:border-l md:border-white/10 pl-0 md:pl-10">
            <div>
              <span className="font-mono text-[11px] tracking-[0.25em] text-[#ffc490]/80 uppercase block mb-2">
                02 — TRACK RECORD
              </span>
              <div className="font-serif-italic text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-white mb-2 group-hover:text-[#ffc490] transition-colors duration-500 select-none">
                25+
              </div>
              <h3 className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-white/90">
                CLIENT PROJECTS
              </h3>
              {/* <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light max-w-xs">
                Delivering bespoke SaaS platforms, high-conversion products, and award-winning experiences for ambitious founders.
              </p> */}
            </div>
          </div>

          {/* Stat 03 */}
          <div className="group flex flex-col justify-between md:border-l md:border-white/10 pl-0 md:pl-10">
            <div>
              <span className="font-mono text-[11px] tracking-[0.25em] text-[#ffc490]/80 uppercase block mb-2">
                03 — EXCELLENCE
              </span>
              <div className="font-serif-italic text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-white mb-2 group-hover:text-[#ffc490] transition-colors duration-500 select-none">
                5x
              </div>
              <h3 className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-white/90">
                HACKATHON WINNER
              </h3>
              {/* <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light max-w-xs">
                Proven ability to rapidly innovate, solve complex problems under pressure, and build championship-grade technical prototypes.
              </p> */}
            </div>
          </div>
        </div>

        {/* Kinetic Live Telemetry Bar */}
        {/* <div className="mt-16 sm:mt-20 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] sm:text-xs tracking-[0.25em] text-white/50 uppercase select-none">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffc490] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffc490]"></span>
            </span>
            <span className="text-white/90 font-bold">STATUS: AWAKENED</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>TARGET: 60 FPS PERFORMANCE</span>
            <span className="text-white/20">|</span>
            <span>CRAFT: 100% BESPOKE</span>
          </div>
          <div className="text-[#ffc490] font-bold">
            [EST. ETERNAL]
          </div>
        </div> */}
      </div>
      </section>

      {/* Standalone Full-Width Alive Stardust River (Outside Pinned Section to prevent GSAP overlap & lag!) */}
      <div className="relative z-10 w-full pt-0 pb-0 sm:pb-2 bg-transparent mt-12 sm:-mt-10">
        <StardustRiver />
      </div>
    </>
  );
};
