"use client";

import React, { useState, useEffect } from "react";
import { useSoul } from "../../context/SoulContext";
import { SITE_CONTENT } from "../../data/content";

export const LoadingScreen: React.FC = () => {
  const { isLoaded, setIsLoaded, setIsMuted } = useSoul();
  const [isExiting, setIsExiting] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Show prompt after a brief 1.5s breathing introduction
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = (withSound: boolean) => {
    if (withSound) {
      setIsMuted(false);
    }
    setIsExiting(true);
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  };

  if (isLoaded) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1d1d1d] text-white transition-opacity duration-1000 ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Central Breathing Point of Light */}
      <div className="relative flex items-center justify-center">
        {/* Outer ambient glow */}
        <div className="absolute h-32 w-32 rounded-full bg-[#f5f0e8]/10 blur-2xl animate-pulse" />
        
        {/* Mid intense glow */}
        <div className="absolute h-12 w-12 rounded-full bg-[#f5f0e8]/30 blur-md animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
        
        {/* Core dormant soul point */}
        <div className="h-2.5 w-2.5 rounded-full bg-[#f5f0e8] shadow-[0_0_20px_4px_#f5f0e8] transition-transform duration-700 hover:scale-150" />
      </div>

      {/* Narrative Intro & Enter Prompt */}
      <div
        className={`mt-16 flex flex-col items-center gap-6 text-center px-6 transition-all duration-1000 ${
          showPrompt ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <p className="max-w-md font-mono text-xs tracking-[0.3em] uppercase text-white/60 leading-relaxed">
          {SITE_CONTENT.hero.introText}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => handleEnter(true)}
            className="group relative px-8 py-3.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-xs font-mono tracking-[0.3em] uppercase text-white overflow-hidden transition-all duration-500 hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(245,240,232,0.4)] active:scale-95"
          >
            <span className="relative z-10 font-bold">ENTER WITH AUDIO</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>

          <button
            onClick={() => handleEnter(false)}
            className="px-6 py-3.5 text-[11px] font-mono tracking-[0.25em] uppercase text-white/40 hover:text-white/80 transition-colors duration-300"
          >
            SILENT ENTRY
          </button>
        </div>
      </div>

      {/* Bottom Minimal Branding */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/20">
          THE JOURNEY OF THE SOUL — AN IMMERSIVE EXPERIENCE
        </span>
      </div>
    </div>
  );
};
