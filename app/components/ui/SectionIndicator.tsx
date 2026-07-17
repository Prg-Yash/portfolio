"use client";

import React, { useEffect, useState } from "react";
import { useSoul } from "../../context/SoulContext";
import { SITE_CONTENT } from "../../data/content";

export const SectionIndicator: React.FC = () => {
  const { activeStageIndex, isLoaded } = useSoul();
  const [displayStage, setDisplayStage] = useState(SITE_CONTENT.stages[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const nextStage = SITE_CONTENT.stages[activeStageIndex] || SITE_CONTENT.stages[0];
    if (nextStage.id !== displayStage.id) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayStage(nextStage);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [activeStageIndex, displayStage.id]);

  if (!isLoaded) return null;

  return (
    <div className="fixed top-3 right-3 sm:top-auto sm:right-auto sm:bottom-6 sm:left-6 z-40 flex items-center gap-2 sm:gap-4 pointer-events-none">
      {/* Animated accent glowing dot */}
      <div
        className="h-2 w-2 rounded-full transition-all duration-500 shadow-[0_0_10px_currentColor]"
        style={{
          backgroundColor: displayStage.accentColor,
          color: displayStage.accentColor,
        }}
      />

      {/* Stage Number & Name */}
      <div
        className={`flex items-baseline gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase transition-all duration-300 ${
          isAnimating
            ? "opacity-0 -translate-y-2 blur-[2px]"
            : "opacity-100 translate-y-0 blur-0"
        }`}
      >
        <span
          className="font-bold transition-colors duration-500"
          style={{ color: displayStage.accentColor }}
        >
          {displayStage.number}
        </span>
        <span className="text-white/30">/</span>
        <span className="text-white/80 font-medium tracking-[0.25em]">
          {displayStage.name} <span className="text-[#ffc490] font-bold ml-1">{displayStage.label}</span>
        </span>
      </div>
    </div>
  );
};
