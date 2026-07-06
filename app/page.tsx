"use client";

import React, { useRef } from "react";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

// UI Components
import { LoadingScreen } from "./components/ui/LoadingScreen";
import { CustomCursor } from "./components/ui/CustomCursor";
import { ProgressIndicator } from "./components/ui/ProgressIndicator";
import { SectionIndicator } from "./components/ui/SectionIndicator";
import { Navigation } from "./components/ui/Navigation";
import { AudioDrone } from "./components/ui/AudioDrone";
import { FilmGrain } from "./components/ui/FilmGrain";

// 3D Canvas Engine
// import { SoulCanvas } from "./components/canvas/SoulCanvas";

// The 9 Sequential Stages
import { Stage01Void } from "./components/stages/Stage01Void";
import { Stage02Awakening } from "./components/stages/Stage02Awakening";
import { Stage03Curiosity } from "./components/stages/Stage03Curiosity";
import { Stage04Learning } from "./components/stages/Stage04Learning";
import { Stage05Creation } from "./components/stages/Stage05Creation";
import { Stage06Failure } from "./components/stages/Stage06Failure";
import { Stage07Transform } from "./components/stages/Stage07Transform";
import { Stage08Wisdom } from "./components/stages/Stage08Wisdom";
import { Stage09Legacy } from "./components/stages/Stage09Legacy";

export default function Home() {
  const mainRef = useRef<HTMLElement | null>(null);

  // Initialize Lenis smooth scroll and stage tracking via modular hook
  useSmoothScroll(mainRef);

  return (
    <main
      ref={mainRef}
      className="relative flex min-h-screen flex-col w-full bg-[#1d1d1d] overflow-x-hidden selection:bg-white/20"
    >
      {/* UI Overlays (Commented out heavy visual/interactive overlays to ensure 100% zero lag) */}
      <LoadingScreen />
      {/* <FilmGrain /> */}
      {/* <CustomCursor /> */}
      {/* <AudioDrone /> */}
      <Navigation />
      <ProgressIndicator />
      <SectionIndicator />

      {/* 3D Persistent Particle Soul Engine (Commented out for now) */}
      {/* <SoulCanvas /> */}

      {/* The 9 Sequential Stages of Evolution */}
      <div className="relative z-20 w-full block">
        <Stage01Void />
        <Stage02Awakening />
        <Stage03Curiosity />
        <Stage04Learning />
        <Stage05Creation />
        <Stage06Failure />
        {/* <Stage07Transform />
        <Stage08Wisdom />*/}
        <Stage09Legacy />
      </div>
    </main>
  );
}
