"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONTENT } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

export const Stage04Learning: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const lineEl = lineRef.current;
    if (!container || !lineEl) return;

    // Laser Beam Timeline Scrub
    gsap.fromTo(
      lineEl,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    // Supernova Ignition & 3D Card Tilt Reveal for each Milestone
    itemsRef.current.forEach((item, idx) => {
      if (!item) return;
      const dot = item.querySelector(".constellation-star");
      const shockwave = item.querySelector(".star-shockwave");
      const card = item.querySelector(".milestone-card");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });

      // Star ignition & shockwave ring expansion
      if (dot) {
        tl.fromTo(
          dot,
          { scale: 0, opacity: 0.2, boxShadow: "0 0 0px #ffc490" },
          { scale: 1.3, opacity: 1, boxShadow: "0 0 30px 6px #ffc490", duration: 0.5, ease: "back.out(2)" }
        );
      }
      if (shockwave) {
        tl.fromTo(
          shockwave,
          { scale: 0.2, opacity: 1 },
          { scale: 3.5, opacity: 0, duration: 0.8, ease: "power2.out" },
          "<"
        );
      }

      // 3D Perspective Card Tilt
      if (card) {
        const isEven = idx % 2 === 0;
        tl.fromTo(
          card,
          {
            opacity: 0,
            x: isEven ? -100 : 100,
            rotateY: isEven ? 25 : -25,
            rotateX: 15,
            scale: 0.85,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.0,
            ease: "power3.out",
          },
          "-=0.6"
        );
      }
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
      id="stage-3"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 sm:px-12 py-32 z-20 overflow-hidden perspective-[1200px]"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-24 text-center">
          <div className="inline-flex items-center gap-4 mb-3">
            <span className="font-mono text-xs font-bold tracking-[0.3em] text-[#ffc490] animate-pulse">
              04 / LEARNING
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-r from-[#ffc490] to-transparent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/50">
              THE CONSTELLATION OF KNOWLEDGE
            </span>
          </div>
          <h2 className="font-serif-italic text-4xl sm:text-6xl tracking-wide text-white drop-shadow-md">
            Milestones of Understanding
          </h2>
        </div>

        {/* Constellation Timeline */}
        <div className="relative mx-auto w-full">
          {/* Background Dormant Track */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/10" />

          {/* Active Laser Ignition Spine */}
          <div
            ref={lineRef}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 origin-top bg-gradient-to-b from-[#ffc490] via-[#ffd890] to-[#ffc490] shadow-[0_0_20px_2px_#ffc490]"
          />

          <div className="space-y-20 md:space-y-32">
            {SITE_CONTENT.timeline.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.year + item.title}
                  ref={(el) => {
                    itemsRef.current[idx] = el;
                  }}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                >
                  {/* Central Star Node & Supernova Shockwave */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                    <div className="star-shockwave absolute h-12 w-12 rounded-full border border-[#ffc490] pointer-events-none opacity-0" />
                    <div className="constellation-star h-6 w-6 rounded-full border-2 border-white bg-[#ffc490] shadow-[0_0_20px_#ffc490]" />
                  </div>

                  {/* Content Card with 3D Perspective */}
                  <div
                    className={`milestone-card w-full md:w-1/2 pl-16 md:pl-0 ${
                      isEven ? "md:pr-16 md:text-right" : "md:ml-auto md:pl-16 md:text-left"
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 via-black/80 to-black/90 p-8 sm:p-10 backdrop-blur-2xl transition-all duration-500 hover:border-[#ffc490]/50 hover:shadow-[0_0_40px_rgba(255,196,144,0.2)] hover:-translate-y-2">
                      <span className="inline-block rounded-full bg-[#ffc490]/20 px-3 py-1 font-mono text-xs font-bold tracking-[0.2em] text-[#ffc490] mb-4 shadow-sm">
                        {item.year}
                      </span>

                      <h3 className="font-serif-italic text-2xl sm:text-3xl text-white group-hover:text-[#ffc490] transition-colors">
                        {item.title}
                      </h3>
                      <h4 className="font-mono text-xs tracking-[0.2em] text-white/70 uppercase mt-1 mb-4">
                        {item.organization}
                      </h4>

                      <p className="font-sans text-sm sm:text-base leading-relaxed text-white/80 mb-6">
                        {item.description}
                      </p>

                      <div className="rounded-xl bg-[#ffc490]/10 border border-[#ffc490]/20 px-5 py-3.5 text-left">
                        <span className="block font-mono text-[9px] tracking-[0.25em] text-[#ffc490] uppercase font-bold mb-1">
                          MILESTONE HIGHLIGHT
                        </span>
                        <span className="font-sans text-xs font-medium text-white">
                          {item.highlight}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
