"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONTENT } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

export const Stage06Failure: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef<HTMLQuoteElement | null>(null);
  const debrisRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const quote = quoteRef.current;
    const debrisEl = debrisRef.current;
    if (!container || !quote) return;

    // Floating broken debris shards animation
    if (debrisEl) {
      const shards = debrisEl.querySelectorAll(".broken-shard");
      shards.forEach((shard, i) => {
        gsap.to(shard, {
          y: (i % 2 === 0 ? 1 : -1) * 200,
          rotateZ: (i % 2 === 0 ? 1 : -1) * 360,
          duration: 12 + i * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }

    // CRT Monitor Glitch Flicker & Chromatic Aberration Reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        end: "top 30%",
        scrub: 1,
      },
    });

    tl.fromTo(
      quote,
      {
        opacity: 0.1,
        scale: 0.9,
        skewX: 15,
        filter: "blur(12px) contrast(200%)",
        textShadow: "-5px 0px 0px #ff0055, 5px 0px 0px #00ffff",
      },
      {
        opacity: 1,
        scale: 1.0,
        skewX: 0,
        filter: "blur(0px) contrast(100%)",
        textShadow: "0px 0px 0px #ff0055, 0px 0px 0px #00ffff",
        duration: 1.5,
        ease: "power3.out",
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="stage-5"
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 sm:px-12 py-32 z-20 bg-transparent text-center overflow-hidden"
    >
      {/* Floating Broken Debris Shards */}
      <div ref={debrisRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="broken-shard absolute top-[20%] left-[15%] h-24 w-12 bg-[#ff6060]/10 border border-[#ff6060]/30 rotate-12 backdrop-blur-sm" />
        <div className="broken-shard absolute top-[60%] right-[10%] h-36 w-20 bg-white/5 border border-white/15 -rotate-45 backdrop-blur-md" />
        <div className="broken-shard absolute bottom-[15%] left-[30%] h-16 w-16 bg-[#ff6060]/15 border border-[#ff6060]/20 rotate-6" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 inline-flex items-center gap-4">
          <span className="font-mono text-xs font-bold tracking-[0.3em] text-[#ff6060] animate-pulse">
            06 / FAILURE
          </span>
          <div className="h-[1px] w-16 bg-gradient-to-r from-[#ff6060] to-transparent" />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/50">
            THE DISSOLUTION OF CERTAINTY
          </span>
        </div>

        {/* CRT Glitch Philosophical Quote */}
        <blockquote
          ref={quoteRef}
          className="font-serif-italic text-3xl sm:text-5xl md:text-6xl leading-relaxed tracking-wide text-white drop-shadow-2xl select-none"
        >
          &ldquo;{SITE_CONTENT.failure.quote}&rdquo;
        </blockquote>

        {/* Story & Lesson */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/15 pt-16 text-left">
          <div className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl hover:border-[#ff6060]/40 transition-all duration-300">
            <span className="block font-mono text-xs tracking-[0.3em] uppercase text-[#ff6060] font-bold mb-4">
              THE COLLAPSE
            </span>
            <p className="font-sans text-sm sm:text-base leading-relaxed text-white/80">
              {SITE_CONTENT.failure.story}
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl hover:border-white/30 transition-all duration-300">
            <span className="block font-mono text-xs tracking-[0.3em] uppercase text-white/60 font-bold mb-4">
              THE LESSON LEARNED
            </span>
            <p className="font-sans text-sm sm:text-base leading-relaxed text-white/80">
              {SITE_CONTENT.failure.lesson}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
