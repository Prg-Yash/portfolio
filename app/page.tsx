"use client";

import React, { useRef } from "react";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

// UI Components
import { Preloader } from "./components/preloader/Preloader";
import { CustomCursor } from "./components/ui/CustomCursor";
import { ProgressIndicator } from "./components/ui/ProgressIndicator";
import { SectionIndicator } from "./components/ui/SectionIndicator";
import { Navigation } from "./components/ui/Navigation";
import { AudioDrone } from "./components/ui/AudioDrone";
import { FilmGrain } from "./components/ui/FilmGrain";

// 3D Canvas Engine
// import { SoulCanvas } from "./components/canvas/SoulCanvas";

import dynamic from "next/dynamic";

// The 9 Sequential Stages
import { Stage01Void } from "./components/stages/Stage01Void";

// Dynamically import off-screen components for performance
const Stage02Awakening = dynamic(() => import("./components/stages/Stage02Awakening").then((mod) => mod.Stage02Awakening));
const Stage03Curiosity = dynamic(() => import("./components/stages/Stage03Curiosity").then((mod) => mod.Stage03Curiosity));
const Stage04Learning = dynamic(() => import("./components/stages/Stage04Learning").then((mod) => mod.Stage04Learning));
const Stage05Creation = dynamic(() => import("./components/stages/Stage05Creation").then((mod) => mod.Stage05Creation));
const Stage09Legacy = dynamic(() => import("./components/stages/Stage09Legacy").then((mod) => mod.Stage09Legacy));

const CosmicFooter = dynamic(() => import("./components/ui/CosmicFooter").then((mod) => mod.CosmicFooter));

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
      <Preloader />
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

        <Stage09Legacy />
      </div>

      {/* ── Cosmic Footer ───────────────────────────────────────── */}
      <CosmicFooter />
    </main>
  );
}
