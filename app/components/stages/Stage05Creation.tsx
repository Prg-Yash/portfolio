"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ExternalLink, Sparkles } from "lucide-react";
import { SITE_CONTENT } from "../../data/content";
import { useSoul } from "../../context/SoulContext";
import { useGSAPTimeline } from "../../hooks/useGSAPTimeline";

export const Stage05Creation: React.FC = () => {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const { setCursorText, setCursorColor } = useSoul();

  useGSAPTimeline(
    {
      trigger: pinRef,
      start: "top top",
      end: () => {
        const trackEl = trackRef.current;
        const scrollWidth = trackEl ? trackEl.scrollWidth - window.innerWidth : 1000;
        return `+=${scrollWidth + window.innerHeight}`;
      },
      pin: true,
      scrub: 1.2,
    },
    (tl) => {
      const trackEl = trackRef.current;
      if (!trackEl) return;

      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      if (isTouch) return;

      const scrollWidth = trackEl.scrollWidth - window.innerWidth;
      tl.to(trackEl, {
        x: -scrollWidth,
        ease: "none",
      });

      // 3D Parallax Tilt & Zoom on individual project cards during horizontal scroll
      const cards = trackEl.querySelectorAll(".project-card");
      cards.forEach((card) => {
        const img = card.querySelector(".project-image");
        const content = card.querySelector(".project-content");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.25, filter: "brightness(0.6) saturate(0.8)" },
            {
              scale: 1.0,
              filter: "brightness(1.05) saturate(1.2)",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
        if (content) {
          gsap.fromTo(
            content,
            { rotateY: 15, x: 50 },
            {
              rotateY: -15,
              x: -50,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
      });
    }
  );

  return (
    <section
      id="stage-4"
      ref={pinRef}
      className="relative min-h-screen w-full bg-transparent z-20 py-24 md:py-0 overflow-hidden flex flex-col justify-center perspective-[1500px]"
    >
      {/* Section Header */}
      <div className="absolute top-10 left-6 sm:left-12 z-30 pointer-events-none">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-xs font-bold tracking-[0.3em] text-[#ffd890] animate-pulse">
            05 / CREATION
          </span>
          <div className="h-[1px] w-16 bg-gradient-to-r from-[#ffd890] to-transparent" />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/50">
            THE GALLERY OF MANIFESTATION
          </span>
        </div>
        <h2 className="font-serif-italic text-4xl sm:text-5xl text-white tracking-wide drop-shadow-md">
          Selected Works
        </h2>
      </div>

      {/* Horizontal Scroll Gallery Track */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row items-center gap-12 md:gap-24 px-6 md:px-24 pt-28 md:pt-16 w-full md:w-max"
      >
        {SITE_CONTENT.projects.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => {
              setCursorText("EXPLORE");
              setCursorColor("#ffd890");
            }}
            onMouseLeave={() => {
              setCursorText(null);
            }}
            className="project-card group relative w-full max-w-4xl md:w-[85vw] lg:w-[75vw] rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-black/80 to-black/95 overflow-hidden backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] transition-all duration-500 hover:border-[#ffd890]/50 hover:shadow-[0_0_80px_rgba(255,216,144,0.2)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex flex-col lg:flex-row min-h-[520px]">
              {/* Left/Top: Project Preview Image with 3D Zoom */}
              <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-full overflow-hidden bg-black/60">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="project-image object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/80" />
              </div>

              {/* Right/Bottom: Project Details & Asset Suggestions */}
              <div className="project-content w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#ffd890]">
                      {project.year}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.15em] text-white/60 uppercase font-bold">
                      {project.role}
                    </span>
                  </div>

                  <h3 className="font-serif-italic text-3xl sm:text-5xl text-white tracking-wide group-hover:text-[#ffd890] transition-colors drop-shadow-sm">
                    {project.title}
                  </h3>
                  <h4 className="font-mono text-xs tracking-[0.2em] text-white/70 uppercase mt-2 mb-6 font-semibold">
                    {project.subtitle}
                  </h4>

                  <p className="font-sans text-sm sm:text-base leading-relaxed text-white/80 mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-white/90 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="rounded-2xl bg-[#ffd890]/10 border border-[#ffd890]/30 p-4 mb-6">
                    <span className="block font-mono text-[9px] tracking-[0.25em] text-[#ffd890] uppercase font-bold mb-1">
                      ASSET RECOMMENDATION FOR REAL DEPLOYMENT
                    </span>
                    <p className="font-sans text-[11px] leading-relaxed text-white/70 italic">
                      {project.assetSuggestion}
                    </p>
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 py-4 font-mono text-xs tracking-[0.25em] uppercase text-white transition-all duration-300 hover:border-[#ffd890] hover:bg-[#ffd890] hover:text-black hover:scale-105 shadow-lg overflow-hidden"
                  >
                    <span className="relative z-10 font-bold">LAUNCH EXHIBITION</span>
                    <ExternalLink className="relative z-10 h-4 w-4" />
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
