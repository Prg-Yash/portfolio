"use client";

import React, { useState } from "react";
import { useSoul } from "../../context/SoulContext";
import { ConstellationSkillMap } from "../ui/ConstellationSkillMap";

const CATEGORIES = ["ALL", "Frontend", "Backend", "AI & Automations", "Databases", "Tools"];

const CATEGORY_META: Record<string, { label: string; description: string; color: string }> = {
  "ALL": { label: "FULL ECOSYSTEM", description: "Complete technical architecture across frontend, backend, AI, databases, and tooling.", color: "#ffc490" },
  "Frontend": { label: "FRONTEND", description: "Modern reactive user interfaces, design engineering, and cross-platform web/mobile applications.", color: "#ffc490" },
  "Backend": { label: "BACKEND", description: "High-throughput server runtimes, RESTful/GraphQL APIs, ORMs, and scalable microservices.", color: "#90d5ff" },
  "AI & Automations": { label: "AI & AUTOMATIONS", description: "Autonomous cognitive agents, LLM pipelines, workflow orchestration, and generative AI systems.", color: "#c8a0ff" },
  "Databases": { label: "DATABASES", description: "Relational modeling, NoSQL document stores, real-time synchronization, and graph traversal.", color: "#ffd890" },
  "Tools": { label: "TOOLS", description: "Version control, automated CI/CD deployment pipelines, design systems, and rapid prototyping.", color: "#ff8080" },
};

export const Stage03Curiosity: React.FC = () => {
  const { setCursorText, setCursorColor } = useSoul();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const meta = CATEGORY_META[selectedCategory] || CATEGORY_META["ALL"];

  return (
    <section
      id="stage-2"
      className="relative w-full z-20 overflow-visible pt-4 sm:pt-8 pb-12 sm:pb-16"
    >
      {/* Subtle radial vignette behind the constellation */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,196,144,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-12">

        {/* ── Section Header ────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
            <span className="font-mono text-xs font-bold tracking-[0.35em] text-[#ffc490] animate-pulse">
              03 // CURIOSITY · [ SKILLS ]
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-r from-[#ffc490] to-transparent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/35">
              Every experience became knowledge
            </span>
          </div>
          <h2 className="font-serif-italic text-4xl sm:text-6xl md:text-7xl tracking-wide text-white drop-shadow-md">
            EVERY SKILL BEGAN AS CURIOSITY.
          </h2>
          <p className="mt-4 font-mono text-xs tracking-[0.2em] uppercase text-white/40 max-w-lg">
            This isn't just a list of technologies.
            It's a reflection of years spent learning, experimenting,
            failing, and creating products that solve real problems.
          </p>
        </div>

        {/* ── Category Filter Pills ─────────────────────────── */}
        <div className="mb-8 hidden md:flex flex-wrap items-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const catMeta = CATEGORY_META[cat] || CATEGORY_META["ALL"];
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                onMouseEnter={() => { setCursorText("FILTER"); setCursorColor(catMeta.color); }}
                onMouseLeave={() => { setCursorText(null); }}
                className={`
                  group relative px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase
                  transition-all duration-300 cursor-pointer overflow-hidden
                  ${
                    isActive
                      ? "text-black font-bold scale-[1.06]"
                      : "border border-white/15 bg-white/[0.03] text-white/50 hover:text-white hover:border-white/30 hover:bg-white/[0.07] hover:scale-[1.04]"
                  }
                `}
                style={isActive ? {
                  background: catMeta.color,
                  boxShadow: `0 0 20px ${catMeta.color}70, 0 0 50px ${catMeta.color}25`,
                } : {}}
              >
                {/* Scanline sweep on hover (inactive only) */}
                {!isActive && (
                  <span
                    className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(105deg, transparent 40%, ${catMeta.color}18 50%, transparent 60%)`,
                      backgroundSize: "200% 100%",
                      animation: "scanPill 0.6s ease forwards",
                    }}
                  />
                )}
                {/* Active glow ring pulse */}
                {isActive && (
                  <span
                    className="pointer-events-none absolute inset-0 rounded-full animate-ping opacity-20"
                    style={{ background: catMeta.color }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}

          {/* Category description beside pills */}
          <div className="ml-2 hidden lg:flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: meta.color }}
            />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/50 font-medium">
              {meta.description}
            </span>
          </div>
        </div>

        {/* ── Constellation Map (Orbital Galaxy) ────────────── */}
        <div className="relative">
          <ConstellationSkillMap
            selectedCategory={selectedCategory === "ALL" ? "ALL" : selectedCategory}
          />
        </div>

        {/* ── Bottom telemetry strip ────────────────────────── */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/25 border-t border-white/10 pt-5 sm:pt-6 select-none">
          <span>THE JOURNEY OF THE SOUL</span>
          <span>STAGE 03 · {meta.label}</span>
          <span>LIVE ECOSYSTEM TELEMETRY</span>
        </div>

      </div>
    </section>
  );
};
