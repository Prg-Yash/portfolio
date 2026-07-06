"use client";

import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONTENT, TimelineMilestone, MilestoneType, MilestoneEra } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const TYPE_COLOR: Record<MilestoneType, string> = {
  education:   "#90d5ff",
  win:         "#ffd890",
  hackathon:   "#ff9f5a",
  internship:  "#c8a0ff",
  venture:     "#ff8080",
  leadership:  "#a0ffc8",
  achievement: "#ffc490",
};

const TYPE_LABEL: Record<MilestoneType, string> = {
  education:   "EDUCATION",
  win:         "WIN",
  hackathon:   "HACKATHON",
  internship:  "INTERNSHIP",
  venture:     "VENTURE",
  leadership:  "LEADERSHIP",
  achievement: "ACHIEVEMENT",
};

const ERA_CONFIG: Record<MilestoneEra, {
  number: string; title: string; years: string;
  subtitle: string; color: string;
}> = {
  GENESIS:    { number: "01", title: "GENESIS",    years: "2022 – 2023", subtitle: "First sparks. Curiosity becomes code.",       color: "#90d5ff" },
  MOMENTUM:   { number: "02", title: "MOMENTUM",   years: "2024",        subtitle: "Velocity. Wins, internships, leadership.",    color: "#ff9f5a" },
  LEADERSHIP: { number: "03", title: "LEADERSHIP", years: "2025",        subtitle: "Giving back. Founding, teaching, scaling.",  color: "#a0ffc8" },
  ASCENDANCE: { number: "04", title: "ASCENDANCE", years: "2026",        subtitle: "National stage. The soul at full power.",     color: "#ffd890" },
};

const ERAS: MilestoneEra[] = ["GENESIS", "MOMENTUM", "LEADERSHIP", "ASCENDANCE"];

// ── Safe bounds accounting for Navigation (top ~52px) and ProgressIndicator (right ~64px) ──
const SAFE = { top: 60, right: 80, bottom: 32, left: 0 };

// ── Single milestone card ───────────────────────────────────────────────────
const Card: React.FC<{ item: TimelineMilestone }> = ({ item }) => {
  const color  = TYPE_COLOR[item.type];
  const isWin  = item.type === "hackathon" || item.type === "win";

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
        {/* Row 1: badge + type + year */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-lg select-none leading-none" style={{ filter: isWin ? `drop-shadow(0 0 6px ${color})` : "none" }}>
            {item.badge}
          </span>
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
      className="era-panel flex-shrink-0 w-screen h-full flex flex-col"
      data-era={era}
      style={{
        paddingTop:    SAFE.top,
        paddingBottom: SAFE.bottom,
        paddingLeft:   60,
        paddingRight:  SAFE.right,
      }}
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

          {/* Era title — inline flow, no absolute, no bleeding */}
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
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 pb-4">
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
  const sectionRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const eraLabelRef = useRef<HTMLSpanElement>(null);

  const byEra = useMemo(() => {
    const map: Record<MilestoneEra, TimelineMilestone[]> = {
      GENESIS: [], MOMENTUM: [], LEADERSHIP: [], ASCENDANCE: [],
    };
    SITE_CONTENT.timeline.forEach((m) => { map[m.era].push(m); });
    return map;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const NUM_ERAS = ERAS.length;
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
          if (eraLabelRef.current && counterRef.current) {
            const idx = Math.min(Math.floor(self.progress * NUM_ERAS), NUM_ERAS - 1);
            const era = ERAS[idx];
            eraLabelRef.current.textContent = ERA_CONFIG[era].title;
            counterRef.current.textContent  = ERA_CONFIG[era].number;
          }
        },
      },
    });

    // Per-era panel animations
    track.querySelectorAll<HTMLDivElement>(".era-panel").forEach((panel) => {
      const era     = panel.dataset.era as MilestoneEra;
      const cfg     = ERA_CONFIG[era];
      const title   = panel.querySelector(".era-title");
      const accent  = panel.querySelector(".era-accent-line");
      const subtitle = panel.querySelector(".era-subtitle");
      const header  = panel.querySelector(".era-header");
      const cards   = panel.querySelectorAll<HTMLDivElement>(".chronicle-item");

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
        className="relative w-full overflow-hidden bg-[#111111]"
        style={{ height: "100vh" }}
      >
        {/* ── Thin HUD bar just below Nav ─────────────────────── */}
        <div
          className="absolute left-0 right-0 z-30 pointer-events-none flex items-center justify-between px-[60px]"
          style={{
            top: SAFE.top - 6,
            paddingRight: SAFE.right,
            height: "24px",
          }}
        >
          <span className="font-mono text-[8px] tracking-[0.45em] uppercase text-white/20">
            04 // LEARNING · [ EXPERIENCE ] ·&nbsp;
            <span ref={eraLabelRef} className="text-white/40">GENESIS</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/20">ERA</span>
            <span ref={counterRef} className="font-mono text-sm font-bold tabular-nums" style={{ color: "#ff9f5a" }}>01</span>
            <span className="font-mono text-[8px] text-white/20">/ 04</span>
          </div>
        </div>

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

        {/* ── Thin progress bar at very bottom ────────────────── */}
        <div className="absolute bottom-0 left-0 z-30 h-[2px] bg-white/5" style={{ right: SAFE.right }}>
          <div
            ref={progressRef}
            className="h-full"
            style={{
              width: "0%",
              background: "linear-gradient(90deg, #90d5ff, #ff9f5a, #a0ffc8, #ffd890)",
            }}
          />
        </div>

        {/* ── Era dots ─────────────────────────────────────────── */}
        <div
          className="absolute bottom-5 z-30 pointer-events-none flex items-center gap-6"
          style={{ left: "60px" }}
        >
          {ERAS.map((era) => {
            const cfg = ERA_CONFIG[era];
            return (
              <div key={era} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full" style={{ background: `${cfg.color}60` }} />
                <span className="font-mono text-[7px] tracking-[0.3em] uppercase hidden sm:inline" style={{ color: `${cfg.color}50` }}>
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
