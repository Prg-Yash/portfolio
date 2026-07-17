"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSoul } from "../../context/SoulContext";
import { SITE_CONTENT } from "../../data/content";

export const Navigation: React.FC = () => {
  const { activeStageIndex, scrollToStageIndex, isLoaded } = useSoul();
  const [isOpen, setIsOpen] = useState(false);

  if (!isLoaded) return null;

  const handleSelect = (idx: number) => {
    scrollToStageIndex(idx);
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Left Menu Button */}
      <div className="fixed top-3 left-3 sm:top-6 sm:left-6 z-50">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="group flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2.5 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 active:scale-95"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? (
            <X className="h-4 w-4 text-white" />
          ) : (
            <Menu className="h-4 w-4 text-white/70 group-hover:text-white" />
          )}
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/70 group-hover:text-white">
            {isOpen ? "CLOSE" : "INDEX"}
          </span>
        </button>
      </div>

      {/* Fullscreen Overlay Drawer */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-[#1d1d1d] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-8"
        }`}
      >
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-8 py-12 sm:py-16 max-h-screen overflow-y-auto">
          <div className="mb-8 border-b border-white/10 pb-4">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/40">
              THE 9 STAGES OF EVOLUTION
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {SITE_CONTENT.stages
              .filter((stage) => stage.enabled !== false)
              .map((stage) => {
                const originalIdx = SITE_CONTENT.stages.findIndex((s) => s.id === stage.id);
                const isActive = originalIdx === activeStageIndex;

                return (
                  <button
                    key={stage.id}
                    onClick={() => handleSelect(originalIdx)}
                    className={`group relative flex flex-col items-start rounded-lg border p-5 text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "border-white/40 bg-white/10 shadow-[0_0_25px_rgba(255,255,255,0.08)]"
                        : "border-white/5 bg-white/2 hover:border-white/20 hover:bg-white/5 hover:translate-x-1"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between mb-2">
                      <span
                        className="font-mono text-xs font-bold tracking-[0.2em]"
                        style={{ color: isActive ? stage.accentColor : "rgba(255,255,255,0.5)" }}
                      >
                        {stage.number}
                      </span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      )}
                    </div>

                    <h3 className="font-serif-italic text-lg tracking-wide text-white group-hover:text-white/90 flex items-center justify-between w-full">
                      <span>{stage.name}</span>
                      <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold text-[#ffc490]">
                        {stage.label}
                      </span>
                    </h3>
                    <p className="mt-1 text-[11px] font-sans text-white/50 line-clamp-1">
                      {stage.title}
                    </p>
                  </button>
                );
              })}
          </div>

          <div className="mt-12 flex justify-between items-center text-[10px] font-mono tracking-[0.25em] text-white/30 border-t border-white/10 pt-6">
            <span>THE JOURNEY OF THE SOUL</span>
            <span>AWWWARDS / FWA TIER INTERACTIVE PORTFOLIO</span>
          </div>
        </div>
      </div>
    </>
  );
};
