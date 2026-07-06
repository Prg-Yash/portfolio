"use client";

import React from "react";
import { useSoul } from "../../context/SoulContext";
import { SITE_CONTENT } from "../../data/content";

export const ProgressIndicator: React.FC = () => {
  const { activeStageIndex, scrollToStageIndex, isLoaded } = useSoul();

  if (!isLoaded) return null;

  // Only show uncommented/enabled stages
  const activeStages = SITE_CONTENT.stages.filter((stage) => stage.enabled !== false);

  // Calculate active fill percentage based on currently active stage position in activeStages
  const currentActiveOrder = activeStages.findIndex(
    (s) => SITE_CONTENT.stages.findIndex((orig) => orig.id === s.id) === activeStageIndex
  );
  const fillPercentage =
    currentActiveOrder >= 0
      ? ((currentActiveOrder + 1) / activeStages.length) * 100
      : 0;

  return (
    <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex select-none pointer-events-auto">
      {/* Overall vertical track */}
      <div className="relative flex flex-col items-end gap-6 py-4">
        
        {/* MASTER TRACK COLUMN: Occupies exact rightmost 24px (w-6) with flex justify-center to guarantee 100% mathematical center alignment without sub-pixel rounding errors */}
        <div className="absolute right-0 top-0 bottom-0 w-6 flex justify-center pointer-events-none">
          <div className="w-[2px] h-full bg-white/10 rounded-full" />
        </div>

        {/* ACTIVE FILL LINE: Occupies exact rightmost 24px (w-6) with flex justify-center */}
        <div className="absolute right-0 top-0 bottom-0 w-6 flex justify-center pointer-events-none">
          <div
            className="w-[2px] bg-gradient-to-b from-[#f5f0e8] via-[#ffc490] to-[#d4a5ff] shadow-[0_0_10px_rgba(255,255,255,0.8)] rounded-full transition-all duration-700 ease-out"
            style={{ height: `${fillPercentage}%` }}
          />
        </div>

        {/* Stage Tick Marks & Paired Telemetry Labels */}
        {activeStages.map((stage) => {
          const originalIdx = SITE_CONTENT.stages.findIndex((s) => s.id === stage.id);
          const isActive = originalIdx === activeStageIndex;
          const isPassed = currentActiveOrder >= 0 && activeStages.findIndex((s) => s.id === stage.id) < currentActiveOrder;

          return (
            <button
              key={stage.id}
              onClick={() => scrollToStageIndex(originalIdx)}
              className="group flex items-center gap-4 text-right focus:outline-none cursor-pointer"
              aria-label={`Jump to ${stage.number}: ${stage.name} (${stage.label})`}
            >
              {/* Paired Sci-Fi Telemetry Label (e.g. 05 // CREATION · [ PROJECTS ]) */}
              <span
                className={`font-mono text-[10px] tracking-[0.25em] transition-all duration-300 ${
                  isActive
                    ? "opacity-100 font-bold text-white translate-x-0 drop-shadow-md"
                    : "opacity-0 -translate-x-3 text-white/40 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white/80"
                }`}
                style={{ color: isActive ? stage.accentColor : undefined }}
              >
                <span className="font-semibold">{stage.number} // {stage.name}</span>
                <span className="ml-2 font-bold text-[#ffc490]">{stage.label}</span>
              </span>

              {/* CIRCLE CONTAINER: Exact 24px (w-6) box with flex items-center justify-center -> matches the line container 100% */}
              <div className="relative w-6 h-4 flex items-center justify-center shrink-0">
                <div
                  className={`relative transition-all duration-300 rounded-full ${
                    isActive
                      ? "w-6 h-2 shadow-[0_0_15px_currentColor]"
                      : isPassed
                      ? "w-2.5 h-2.5 bg-white/70 group-hover:w-3.5 group-hover:h-3.5"
                      : "w-1.5 h-1.5 bg-white/25 group-hover:w-3 group-hover:h-3 group-hover:bg-white/60"
                  }`}
                  style={{
                    backgroundColor: isActive ? stage.accentColor : undefined,
                  }}
                />
              </div>
            </button>
          );
        })}

      </div>
    </div>
  );
};
