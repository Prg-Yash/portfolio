"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONTENT } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

export const Stage07Transform: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pillarsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 3D Reverse-Fragmentation Reconstruction of Pillars
    pillarsRef.current.forEach((pillar, idx) => {
      if (!pillar) return;
      gsap.fromTo(
        pillar,
        {
          opacity: 0,
          y: 120,
          rotateX: 45,
          rotateY: (idx - 1) * 30,
          scale: 0.8,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: pillar,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="stage-6"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 sm:px-12 py-32 z-20 overflow-hidden perspective-[1200px]"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-24 text-center sm:text-left">
          <div className="inline-flex items-center gap-4 mb-3">
            <span className="font-mono text-xs font-bold tracking-[0.3em] text-[#d4a5ff] animate-pulse">
              07 / TRANSFORMATION
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-r from-[#d4a5ff] to-transparent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/50">
              REBUILDING FROM THE ASHES
            </span>
          </div>
          <h2 className="font-serif-italic text-4xl sm:text-6xl tracking-wide text-white drop-shadow-md">
            The Methodology
          </h2>
        </div>

        {/* 3 Pillars of Reconstruction */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SITE_CONTENT.transformation.pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              ref={(el) => {
                pillarsRef.current[idx] = el;
              }}
              className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#d4a5ff]/15 via-black/80 to-black/95 p-8 sm:p-10 backdrop-blur-2xl transition-all duration-500 hover:border-[#d4a5ff]/60 hover:shadow-[0_0_50px_rgba(212,165,255,0.25)] hover:-translate-y-3 flex flex-col justify-between overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Glowing Top Energy Border Pulse */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4a5ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_15px_#d4a5ff]" />

              <div>
                <span className="block font-mono text-xs font-bold tracking-[0.25em] text-[#d4a5ff] mb-6 group-hover:translate-x-2 transition-transform duration-300">
                  {pillar.title}
                </span>
                <p className="font-sans text-sm sm:text-base leading-relaxed text-white/80">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-white/40 group-hover:text-white/70 transition-colors">
                <span>METHODOLOGY</span>
                <span>PILLAR 0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
