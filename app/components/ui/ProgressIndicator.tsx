"use client";

import React from "react";
import { useSoul } from "../../context/SoulContext";
import { SITE_CONTENT } from "../../data/content";

export const ProgressIndicator: React.FC = () => {
  const { activeStageIndex, scrollProgress, scrollToStageIndex, isLoaded } = useSoul();

  if (!isLoaded) return null;

  return (
    <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
      {/* Overall vertical track */}
      <div className="relative flex flex-col items-end gap-5 py-4">
        {/* Progress line background */}
        <div className="absolute right-[5px] top-0 bottom-0 w-[1px] bg-white/10" />

        {/* Active glowing progress fill line (tracking activeStageIndex for zero-lag smooth updates) */}
        <div
          className="absolute right-[5px] top-0 w-[1.5px] bg-gradient-to-b from-[#f5f0e8] via-[#ffc490] to-[#d4a5ff] shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all duration-700 ease-out"
          style={{ height: `${((activeStageIndex + 1) / SITE_CONTENT.stages.length) * 100}%` }}
        />

        {/* Stage Tick Marks & Labels */}
        {SITE_CONTENT.stages.map((stage, idx) => {
          const isActive = idx === activeStageIndex;
          const isPassed = idx < activeStageIndex;

          return (
            <button
              key={stage.id}
              onClick={() => scrollToStageIndex(idx)}
              className="group flex items-center gap-3 text-right focus:outline-none"
              aria-label={`Jump to stage ${stage.number}: ${stage.name}`}
            >
              {/* Stage Label (visible on hover or when active) */}
              <span
                className={`font-mono text-[10px] tracking-[0.25em] transition-all duration-300 ${
                  isActive
                    ? "opacity-100 font-bold text-white translate-x-0"
                    : "opacity-0 -translate-x-2 text-white/40 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
                style={{ color: isActive ? stage.accentColor : undefined }}
              >
                {stage.number} / {stage.name}
              </span>

              {/* Tick Mark */}
              <div
                className={`relative h-2 transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-6 shadow-[0_0_12px_currentColor]"
                    : isPassed
                    ? "w-3 bg-white/60 group-hover:w-4"
                    : "w-2 bg-white/20 group-hover:w-4 group-hover:bg-white/50"
                }`}
                style={{
                  backgroundColor: isActive ? stage.accentColor : undefined,
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
