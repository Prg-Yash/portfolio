"use client";

import React, { useState, useEffect, useRef } from "react";
import { SITE_CONTENT, Skill } from "../../data/content";
import { useSoul } from "../../context/SoulContext";

export const Stage03Curiosity: React.FC = () => {
  const { setCursorText, setCursorColor } = useSoul();
  const [activeSkill, setActiveSkill] = useState<Skill | null>(SITE_CONTENT.skills[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [displayLevel, setDisplayLevel] = useState<number>(0);

  const categories = ["ALL", "3D & Motion", "Core", "Architecture", "Design"];
  const filteredSkills =
    selectedCategory === "ALL"
      ? SITE_CONTENT.skills
      : SITE_CONTENT.skills.filter((s) => s.category === selectedCategory);

  // Animated counter for skill proficiency
  useEffect(() => {
    if (!activeSkill) return;
    let start = displayLevel;
    const end = activeSkill.level;
    const duration = 600; // ms
    const startTime = performance.now();

    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const current = Math.floor(start + (end - start) * (1 - Math.pow(1 - progress, 3)));
      setDisplayLevel(current);
      if (progress < 1) requestAnimationFrame(animateCount);
    };

    requestAnimationFrame(animateCount);
  }, [activeSkill]);

  // 3D Card Tilt Handler
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${-y * 20}deg) rotateY(${x * 20}deg) scale3d(1.04, 1.04, 1.04)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <section
      id="stage-2"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 sm:px-12 py-32 z-20 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-xs font-bold tracking-[0.3em] text-[#ffc490] animate-pulse">
              03 / CURIOSITY
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-r from-[#ffc490] to-transparent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/40">
              REACHING OUTWARD INTO THE UNKNOWN
            </span>
          </div>
          <h2 className="font-serif-italic text-4xl sm:text-6xl tracking-wide text-white drop-shadow-md">
            The Ecosystem of Craft
          </h2>
        </div>

        {/* Category Filter with Neon Glitch Pills */}
        <div className="mb-12 flex flex-wrap gap-3 border-b border-white/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-6 py-2.5 rounded-full font-mono text-[11px] tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer overflow-hidden ${
                selectedCategory === cat
                  ? "bg-[#ffc490] text-black font-bold shadow-[0_0_25px_rgba(255,196,144,0.6)] scale-105"
                  : "border border-white/10 bg-white/5 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Main Interactive Skills Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left/Top: 3D Tilting Skill Node Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredSkills.map((skill) => {
              const isSelected = activeSkill?.name === skill.name;

              return (
                <div
                  key={skill.name}
                  onClick={() => setActiveSkill(skill)}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  onMouseEnter={() => {
                    setCursorText("INSPECT");
                    setCursorColor("#ffc490");
                  }}
                  className={`group relative cursor-pointer rounded-2xl border p-6 transition-all duration-300 backdrop-blur-xl ${
                    isSelected
                      ? "border-[#ffc490] bg-gradient-to-br from-[#ffc490]/20 via-black/80 to-black/90 shadow-[0_0_35px_rgba(255,196,144,0.25)] ring-1 ring-[#ffc490]/50"
                      : "border-white/10 bg-black/50 hover:border-white/30 hover:bg-white/10"
                  }`}
                  style={{ transition: "transform 0.15s ease-out, border-color 0.3s, background-color 0.3s" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#ffc490] font-bold">
                      {skill.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-white/70 group-hover:text-white">
                      {skill.level}%
                    </span>
                  </div>

                  <h3 className="font-serif-italic text-2xl text-white tracking-wide group-hover:text-[#ffc490] transition-colors">
                    {skill.name}
                  </h3>

                  {/* Proficiency Bar with Neon Pulse */}
                  <div className="mt-5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden p-[1px]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#ffc490] via-[#ffd890] to-[#ffffff] transition-all duration-1000 ease-out shadow-[0_0_10px_#ffc490]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right/Bottom: Cybernetic Scanline Deep-Dive Inspector Card */}
          <div className="lg:col-span-5 relative rounded-3xl border border-[#ffc490]/40 bg-gradient-to-b from-[#ffc490]/15 via-black/90 to-black p-8 sm:p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(255,196,144,0.15)] min-h-[360px] flex flex-col justify-between overflow-hidden">
            {/* Cybernetic Scanning Laser Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffc490] to-transparent animate-scanline pointer-events-none opacity-70" />

            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#ffc490] font-bold animate-pulse">
                  CYBERNETIC INSPECTOR
                </span>
                <span className="font-mono text-xs text-white/50">
                  {activeSkill ? activeSkill.category : "SELECT A NODE"}
                </span>
              </div>

              {activeSkill ? (
                <div className="space-y-6 animate-fade-in">
                  <h4 className="font-serif-italic text-4xl text-white drop-shadow-md">
                    {activeSkill.name}
                  </h4>
                  
                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                    <span className="font-mono text-xs tracking-[0.2em] text-white/70">
                      PROFICIENCY INDEX:
                    </span>
                    <span className="font-mono text-2xl font-bold text-[#ffc490] drop-shadow-[0_0_10px_rgba(255,196,144,0.8)]">
                      {displayLevel} / 100
                    </span>
                  </div>

                  <p className="font-sans text-sm sm:text-base leading-relaxed text-white/80 pt-2">
                    {activeSkill.description}
                  </p>
                </div>
              ) : (
                <p className="font-mono text-sm tracking-[0.2em] text-white/50">
                  CLICK ON ANY SKILL NODE TO REVEAL TECHNICAL SPECIFICATIONS &amp; ARCHITECTURAL IMPLEMENTATIONS.
                </p>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-white/40">
              <span>THE JOURNEY OF THE SOUL</span>
              <span>STAGE 03 / CURIOSITY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
