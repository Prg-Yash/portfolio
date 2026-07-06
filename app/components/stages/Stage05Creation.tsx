"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, ArrowUpRight, Sparkles, Disc, Plus, Minus } from "lucide-react";
import { SITE_CONTENT, Project } from "../../data/content";
import { useSoul } from "../../context/SoulContext";

gsap.registerPlugin(ScrollTrigger);

type FilterCategory = "ALL" | "3D & WEBGL" | "SHADERS & AUDIO" | "INTERACTIVE & GSAP";

const FEATURED_LIMIT = 3;

export const Stage05Creation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const { setCursorText, setCursorColor } = useSoul();

  const [activeFilter, setActiveFilter] = useState<FilterCategory>("ALL");
  const [openId, setOpenId] = useState<string | null>(SITE_CONTENT.projects[0]?.id || null);
  const [showAll, setShowAll] = useState<boolean>(false);

  // Smart filtering logic
  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL") return SITE_CONTENT.projects;
    return SITE_CONTENT.projects.filter((p) => {
      const tags = p.tags.map((t) => t.toUpperCase());
      if (activeFilter === "3D & WEBGL") {
        return tags.some((t) => t.includes("THREE") || t.includes("WEBGL") || t.includes("FIBER") || t.includes("PHOTOGRAMMETRY"));
      }
      if (activeFilter === "SHADERS & AUDIO") {
        return tags.some((t) => t.includes("GLSL") || t.includes("SHADER") || t.includes("AUDIO") || t.includes("CANVAS"));
      }
      if (activeFilter === "INTERACTIVE & GSAP") {
        return tags.some((t) => t.includes("GSAP") || t.includes("LENIS") || t.includes("NEXT") || t.includes("TAILWIND") || t.includes("TYPESCRIPT"));
      }
      return true;
    });
  }, [activeFilter]);

  // Projects to actually display based on showAll state
  const displayedProjects = useMemo(() => {
    return showAll ? filteredProjects : filteredProjects.slice(0, FEATURED_LIMIT);
  }, [filteredProjects, showAll]);

  // Ensure an item is open when switching filters
  useEffect(() => {
    if (filteredProjects.length > 0 && !filteredProjects.some((p) => p.id === openId)) {
      setOpenId(filteredProjects[0].id);
    }
    // Reset pagination on filter change
    setShowAll(false);
  }, [filteredProjects, openId]);

  // ScrollTrigger entrance animation for the rows
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const rows = el.querySelectorAll(".codex-row");
    gsap.fromTo(
      rows,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, [displayedProjects]);

  return (
    <section
      ref={containerRef}
      id="stage-4"
      className="relative min-h-screen w-full z-20 overflow-hidden"
      style={{ paddingTop: "140px", paddingBottom: "120px" }}
    >
      {/* Subtle ambient cosmic gradient behind the archive */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,196,144,0.035) 0%, transparent 75%)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12 relative z-10">
        
        {/* ── Section Header & Text Filter Bar ───────────────────────── */}
        <div className="mb-16 sm:mb-24">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs font-bold tracking-[0.35em] text-[#ffc490] animate-pulse">
              05 / CREATION
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-r from-[#ffc490] to-transparent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/35">
              THE ARCHIVE OF MANIFESTATION
            </span>
          </div>
          
          <h2 className="font-serif-italic text-5xl sm:text-7xl tracking-wide text-white drop-shadow-md mb-8">
            Selected Works
          </h2>

          {/* Minimalist Editorial Text Filters */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 font-mono text-xs tracking-[0.25em] uppercase border-b border-white/10 pb-6">
            <span className="text-white/30 text-[10px]">SECTOR //</span>
            {(["ALL", "3D & WEBGL", "SHADERS & AUDIO", "INTERACTIVE & GSAP"] as FilterCategory[]).map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative py-1 transition-all duration-300 ${
                    isActive
                      ? "text-[#ffc490] font-bold"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {cat}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#ffc490] shadow-[0_0_8px_#ffc490]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── The Codex Archive (Boxless Horizontal Slabs) ───────────── */}
        <div ref={listRef} className="border-t border-white/15">
          {displayedProjects.length === 0 ? (
            <div className="py-24 text-center">
              <Sparkles className="w-8 h-8 text-[#ffc490]/40 mx-auto mb-3 animate-pulse" />
              <p className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">
                No projects found in this sector.
              </p>
            </div>
          ) : (
            displayedProjects.map((project, idx) => {
              const isOpen = openId === project.id;
              
              return (
                <div
                  key={project.id}
                  className="codex-row border-b border-white/15 transition-colors duration-500 hover:border-white/30 group"
                >
                  {/* Row Header Slab (Click to expand/collapse) */}
                  <button
                    onClick={() => setOpenId(isOpen ? null : project.id)}
                    onMouseEnter={() => {
                      setCursorText(isOpen ? "CLOSE" : "INSPECT");
                      setCursorColor("#ffc490");
                    }}
                    onMouseLeave={() => setCursorText(null)}
                    className="w-full py-8 sm:py-12 flex flex-col md:flex-row md:items-baseline justify-between gap-4 text-left focus:outline-none"
                  >
                    {/* Left: Ordinal + Title */}
                    <div className="flex items-baseline gap-6 sm:gap-10 max-w-4xl">
                      <span
                        className={`font-mono text-xs sm:text-sm tracking-[0.3em] font-bold transition-colors duration-500 shrink-0 ${
                          isOpen ? "text-[#ffc490]" : "text-white/40 group-hover:text-[#ffc490]"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")} //
                      </span>
                      
                      <div>
                        <h3
                          className={`font-serif-italic text-3xl sm:text-5xl lg:text-6xl transition-all duration-500 leading-tight ${
                            isOpen
                              ? "text-[#ffc490] translate-x-3 sm:translate-x-6 drop-shadow-[0_0_20px_rgba(255,196,144,0.3)]"
                              : "text-white/90 group-hover:text-white group-hover:translate-x-3"
                          }`}
                        >
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Right: Subtitle + Year + Indicator */}
                    <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10 shrink-0 pl-12 md:pl-0">
                      <span className="font-mono text-[11px] tracking-[0.2em] text-white/40 uppercase hidden sm:block">
                        {project.role}
                      </span>
                      <span className="font-mono text-xs tracking-[0.2em] text-white/60">
                        {project.year}
                      </span>
                      
                      {/* Animated indicator button */}
                      <div
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                          isOpen
                            ? "border-[#ffc490] bg-[#ffc490] text-black shadow-[0_0_20px_rgba(255,196,144,0.5)] rotate-45"
                            : "border-white/20 text-white group-hover:border-[#ffc490] group-hover:text-[#ffc490]"
                        }`}
                      >
                        <ArrowUpRight className="w-5 h-5 transition-transform" />
                      </div>
                    </div>
                  </button>

                  {/* Accordion Expandable Showcase Area (60FPS Grid Reveal) */}
                  <div
                    className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "grid-rows-[1fr] opacity-100 pb-12 sm:pb-16" : "grid-rows-[0fr] opacity-0 pb-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-2 pl-2 sm:pl-16">
                        
                        {/* Widescreen Cinematic Image Banner */}
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block relative w-full aspect-[21/9] sm:aspect-[24/9] rounded-2xl overflow-hidden bg-black/80 mb-10 border border-white/15 group/img"
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="100vw"
                            className="object-cover object-center transition-transform duration-1000 ease-out group-hover/img:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
                          <div className="absolute inset-0 bg-radial-vignette opacity-50" />

                          {/* Inline Launch Badge on Image */}
                          <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md border border-[#ffc490]/50 rounded-full px-6 py-2.5 flex items-center gap-2.5 shadow-2xl transition-transform duration-300 group-hover/img:scale-105">
                            <Disc className="w-4 h-4 text-[#ffc490] animate-spin" style={{ animationDuration: "8s" }} />
                            <span className="font-mono text-xs tracking-[0.25em] text-white font-bold">
                              LAUNCH EXHIBITION
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#ffc490]" />
                          </div>
                        </a>

                        {/* Project Details Grid below Image */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                          
                          {/* Left 7 cols: Description & Story */}
                          <div className="lg:col-span-7 space-y-6">
                            <h4 className="font-mono text-xs tracking-[0.25em] text-[#ffc490] uppercase">
                              // PROJECT OVERVIEW
                            </h4>
                            <p className="font-sans text-base sm:text-lg leading-relaxed text-white/80 max-w-2xl">
                              {project.description}
                            </p>
                            
                            {/* Tech Stack Pills */}
                            <div className="pt-4">
                              <span className="block font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase mb-3">
                                ARCHITECTURAL STACK
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 font-mono text-[10px] tracking-[0.2em] text-white/90"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right 5 cols: Telemetry Note & Action Link */}
                          <div className="lg:col-span-5 bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full space-y-8">
                            <div>
                              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#ffc490] uppercase mb-3 font-bold">
                                <Sparkles className="w-3.5 h-3.5" />
                                ASSET RECOMMENDATION
                              </div>
                              <p className="font-sans text-xs sm:text-sm leading-relaxed text-white/60 italic">
                                "{project.assetSuggestion || "Verified 60FPS WebGL build ready for production deployment."}"
                              </p>
                            </div>

                            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                              <span className="font-mono text-[10px] tracking-[0.2em] text-white/40">
                                STATUS // LIVE
                              </span>
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.2em] text-[#ffc490] hover:text-white transition-colors group/link"
                              >
                                <span>OPEN SITE</span>
                                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                              </a>
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── View More / Explore Full Archive Toggle Button ─────────── */}
        {filteredProjects.length > FEATURED_LIMIT && (
          <div className="pt-16 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              onMouseEnter={() => {
                setCursorText(showAll ? "COLLAPSE" : "EXPAND");
                setCursorColor("#ffc490");
              }}
              onMouseLeave={() => setCursorText(null)}
              className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full border border-white/20 bg-white/[0.02] hover:bg-[#ffc490] hover:border-[#ffc490] hover:text-black font-mono text-xs tracking-[0.25em] uppercase text-white transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(255,196,144,0.4)] hover:scale-105"
            >
              {showAll ? (
                <>
                  <Minus className="w-4 h-4 text-[#ffc490] group-hover:text-black transition-colors" />
                  <span className="font-bold">COLLAPSE ARCHIVE [ - ]</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-[#ffc490] group-hover:text-black transition-colors" />
                  <span className="font-bold">
                    EXPLORE FULL ARCHIVE [ +{filteredProjects.length - FEATURED_LIMIT} MORE EXHIBITION{filteredProjects.length - FEATURED_LIMIT > 1 ? "S" : ""} ]
                  </span>
                </>
              )}
            </button>
          </div>
        )}

        {/* ── Bottom Telemetry Strip ─────────────────────────────────── */}
        <div className="mt-24 flex items-center justify-between font-mono text-[9px] tracking-[0.3em] uppercase text-white/15 border-t border-white/8 pt-6 select-none">
          <span>THE CODEX OF MANIFESTATION</span>
          <span>STAGE 05 · CREATION</span>
          <span>
            SHOWING {displayedProjects.length} OF {filteredProjects.length} ARCHIVED WORKS
          </span>
        </div>

      </div>
    </section>
  );
};
