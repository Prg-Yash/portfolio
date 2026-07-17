"use client";

import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONTENT, TimelineMilestone, MilestoneType, MilestoneEra } from "../../data/content";
import {
  GraduationCap, Trophy, Award, Rocket, Terminal, Briefcase,
  Building2, Users, Sparkles, Globe, Cpu, Layers
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TYPE_COLOR: Record<MilestoneType, string> = {
  education: "#90d5ff",
  win: "#ffd890",
  hackathon: "#ff9f5a",
  internship: "#c8a0ff",
  venture: "#ff8080",
  leadership: "#a0ffc8",
  achievement: "#ffc490",
};

const TYPE_LABEL: Record<MilestoneType, string> = {
  education: "EDUCATION",
  win: "WIN",
  hackathon: "HACKATHON",
  internship: "INTERNSHIP",
  venture: "VENTURE",
  leadership: "LEADERSHIP",
  achievement: "ACHIEVEMENT",
};

const ERA_CONFIG: Record<MilestoneEra, {
  number: string; title: string; years: string;
  subtitle: string; color: string;
}> = {
  GENESIS: { number: "01", title: "GENESIS", years: "2022 – 2023", subtitle: "First sparks. Curiosity becomes code.", color: "#90d5ff" },
  MOMENTUM: { number: "02", title: "MOMENTUM", years: "2024", subtitle: "Velocity. Wins, internships, leadership.", color: "#ff9f5a" },
  LEADERSHIP: { number: "03", title: "LEADERSHIP", years: "2025", subtitle: "Giving back. Founding, teaching, scaling.", color: "#a0ffc8" },
  ASCENDANCE: { number: "04", title: "ASCENDANCE", years: "2026", subtitle: "National stage. The soul at full power.", color: "#ffd890" },
};

const ERAS: MilestoneEra[] = ["GENESIS", "MOMENTUM", "LEADERSHIP", "ASCENDANCE"];

// ── Safe bounds accounting for Navigation (top ~64px), ProgressIndicator (right ~80px), SectionIndicator (bottom ~50px) ──
const SAFE = { top: 100, right: 80, bottom: 50, left: 60 };

// ── Helper: Map milestone to sleek white Lucide icon ────────────────────────
const getMilestoneIcon = (item: TimelineMilestone) => {
  const t = item.title.toLowerCase();

  // Keyword matching for ultra-relevant icons
  if (t.includes("diploma") || t.includes("b.e.") || t.includes("degree") || t.includes("education")) return <GraduationCap className="w-4 h-4 text-white" />;
  if (t.includes("programming") || t.includes("c & c++") || t.includes("languages")) return <Terminal className="w-4 h-4 text-white" />;
  if (t.includes("web dev") || t.includes("html") || t.includes("wordpress") || t.includes("website")) return <Globe className="w-4 h-4 text-white" />;
  if (t.includes("hackathon") || t.includes("technothon") || t.includes("recursion") || t.includes("odoox")) return <Rocket className="w-4 h-4 text-white" />;
  if (t.includes("dsa") || t.includes("algorithm") || t.includes("logic")) return <Cpu className="w-4 h-4 text-white" />;
  if (t.includes("topper") || t.includes("1st place") || t.includes("rank") || t.includes("runner-up")) return <Trophy className="w-4 h-4 text-white" />;
  if (t.includes("competition") || t.includes("techspardha") || t.includes("dipex")) return <Award className="w-4 h-4 text-white" />;
  if (t.includes("internship") || t.includes("developer at") || t.includes("freelance") || t.includes("hertzsoft") || t.includes("unscrap") || t.includes("clients")) return <Briefcase className="w-4 h-4 text-white" />;
  if (t.includes("head") || t.includes("founded") || t.includes("devally") || t.includes("ieee") || t.includes("team") || t.includes("co-founded")) return <Building2 className="w-4 h-4 text-white" />;
  if (t.includes("taught") || t.includes("students") || t.includes("mentored") || t.includes("teaching")) return <Users className="w-4 h-4 text-white" />;

  // Fallback by type
  switch (item.type) {
    case "education": return <GraduationCap className="w-4 h-4 text-white" />;
    case "hackathon": return <Rocket className="w-4 h-4 text-white" />;
    case "win": return <Trophy className="w-4 h-4 text-white" />;
    case "internship": return <Briefcase className="w-4 h-4 text-white" />;
    case "venture": return <Layers className="w-4 h-4 text-white" />;
    case "leadership": return <Users className="w-4 h-4 text-white" />;
    case "achievement": return <Award className="w-4 h-4 text-white" />;
    default: return <Sparkles className="w-4 h-4 text-white" />;
  }
};

// ── Single milestone card ───────────────────────────────────────────────────
const Card: React.FC<{ item: TimelineMilestone }> = ({ item }) => {
  const color = TYPE_COLOR[item.type];
  const isWin = item.type === "hackathon" || item.type === "win";

  return (
    <div
      className="chronicle-item group relative rounded-2xl border p-4 overflow-hidden transition-all duration-400"
      style={{
        borderColor: `${color}18`,
        background: "rgba(255,255,255,0.025)",
        opacity: 0,
        transform: "translateY(20px)",
      }}
    >
      {/* Hover glow fill */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 100% 80% at 50% -10%, ${color}10, transparent 70%)` }}
      />
      {/* Top laser on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${color}70, transparent)` }}
      />

      <div className="relative z-10">
        {/* Row 1: icon + type + year */}
        <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
          <div
            className="p-1.5 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center select-none shadow-[0_0_10px_rgba(255,255,255,0.03)]"
            style={{ borderColor: `${color}35`, filter: isWin ? `drop-shadow(0 0 6px ${color})` : "none" }}
          >
            {getMilestoneIcon(item)}
          </div>
          <span
            className="font-mono text-[8px] tracking-[0.28em] uppercase font-bold px-2 py-0.5 rounded-full border"
            style={{ color, borderColor: `${color}35`, background: `${color}12` }}
          >
            {TYPE_LABEL[item.type]}
          </span>
          <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-white/25 ml-auto">
            {item.year}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-serif-italic text-[15px] sm:text-base text-white/90 leading-snug mb-1.5">
          {item.title}
        </h4>

        {/* Org */}
        <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/30 mb-2">
          {item.organization}{item.location ? ` · ${item.location}` : ""}
        </p>

        {/* Highlight */}
        <div className="border-l-[1.5px] pl-2.5" style={{ borderColor: `${color}40` }}>
          <span className="font-mono text-[9px] text-white/45 leading-relaxed">
            {item.highlight}
          </span>
        </div>
      </div>
    </div>
  );
};

// ── Era panel ───────────────────────────────────────────────────────────────
const EraPanel: React.FC<{ era: MilestoneEra; items: TimelineMilestone[] }> = ({ era, items }) => {
  const cfg = ERA_CONFIG[era];

  return (
    <div
      className="era-panel flex-shrink-0 w-screen h-full flex flex-col pt-14 sm:pt-16 pb-8 sm:pb-10 px-5 sm:px-12 lg:pl-16 lg:pr-20"
      data-era={era}
    >
      {/* ── Era header ──────────────────────────────────────────── */}
      <div className="era-header flex items-end justify-between mb-6 flex-shrink-0 pb-4 border-b" style={{ borderColor: `${cfg.color}12` }}>
        {/* Left: era identity */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase font-bold" style={{ color: cfg.color }}>
              ERA {cfg.number}
            </span>
            <div className="h-[1px] w-8 opacity-30" style={{ background: cfg.color }} />
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/25">{cfg.years}</span>
          </div>

          {/* Era title */}
          <h3
            className="era-title font-serif-italic leading-none"
            style={{
              fontSize: "clamp(40px, 5.5vw, 72px)",
              color: "#f5f0e8",
              letterSpacing: "-0.03em",
            }}
          >
            {cfg.title}
          </h3>

          {/* Accent line */}
          <div
            className="era-accent-line mt-3 h-[1.5px] origin-left"
            style={{
              background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}00)`,
              width: "200px",
              transform: "scaleX(0)",
            }}
          />
        </div>

        {/* Right: subtitle + count */}
        <div className="text-right flex-shrink-0 ml-8">
          <p className="era-subtitle font-mono text-[10px] tracking-[0.15em] text-white/35 leading-relaxed mb-3">
            {cfg.subtitle}
          </p>
          <div className="flex items-baseline gap-1.5 justify-end">
            <span
              className="font-serif-italic text-4xl leading-none"
              style={{ color: `${cfg.color}50` }}
            >
              {String(items.length).padStart(2, "0")}
            </span>
            <span className="font-mono text-[8px] tracking-[0.35em] uppercase text-white/20">
              MILESTONES
            </span>
          </div>
        </div>
      </div>

      {/* ── Milestone card grid ──────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 pb-4">
          {items.map((item) => (
            <Card key={item.year + item.title} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Main component ──────────────────────────────────────────────────────────
export const Stage04Learning: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const byEra = useMemo(() => {
    const map: Record<MilestoneEra, TimelineMilestone[]> = {
      GENESIS: [], MOMENTUM: [], LEADERSHIP: [], ASCENDANCE: [],
    };
    SITE_CONTENT.timeline.forEach((m) => { map[m.era].push(m); });
    return map;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollDist = () => track.scrollWidth - window.innerWidth;

    const mainTween = gsap.to(track, {
      x: () => -getScrollDist(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1.4,
        start: "top top",
        end: () => "+=" + getScrollDist(),
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`;
          }
        },
      },
    });

    // Per-era panel animations
    track.querySelectorAll<HTMLDivElement>(".era-panel").forEach((panel) => {
      const era = panel.dataset.era as MilestoneEra;
      const cfg = ERA_CONFIG[era];
      const title = panel.querySelector(".era-title");
      const accent = panel.querySelector(".era-accent-line");
      const subtitle = panel.querySelector(".era-subtitle");
      const header = panel.querySelector(".era-header");
      const cards = panel.querySelectorAll<HTMLDivElement>(".chronicle-item");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          containerAnimation: mainTween,
          start: "left 90%",
          end: "left 5%",
          scrub: 0.9,
        },
      });

      if (header) {
        tl.fromTo(header,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0
        );
      }
      if (title) {
        tl.fromTo(title,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power4.out" }, 0.05
        );
      }
      if (accent) {
        tl.fromTo(accent,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power3.inOut", transformOrigin: "left center" }, 0.25
        );
      }
      if (subtitle) {
        tl.fromTo(subtitle,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.3
        );
      }

      cards.forEach((card, i) => {
        tl.to(card,
          { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
          0.3 + i * 0.04
        );
      });
    });

    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  return (
    <section id="stage-3" className="relative w-full">
      <div
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* ── Horizontal track ────────────────────────────────── */}
        <div
          ref={trackRef}
          className="absolute top-0 left-0 h-full flex will-change-transform"
          style={{ width: `${ERAS.length * 100}vw` }}
        >
          {ERAS.map((era) => (
            <EraPanel key={era} era={era} items={byEra[era]} />
          ))}
        </div>

        {/* ── Thin progress bar at very bottom (spans full screen width, no AI gradients) ── */}
        <div className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-white/5">
          <div
            ref={progressRef}
            className="h-full transition-none shadow-[0_0_10px_rgba(255,196,144,0.5)]"
            style={{
              width: "0%",
              background: "#ffc490",
            }}
          />
        </div>

        {/* ── Era dots (centered at bottom to avoid overlapping left/right indicators) ── */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center gap-6">
          {ERAS.map((era) => {
            const cfg = ERA_CONFIG[era];
            return (
              <div key={era} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_6px_currentColor]" style={{ background: cfg.color, color: cfg.color }} />
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase font-medium hidden sm:inline" style={{ color: `${cfg.color}80` }}>
                  {cfg.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
