"use client";
/**
 * Preloader.tsx — The Soul Archive Experience (Pure Code Awwwards Edition)
 * ============================================================================
 * 100% code-driven celestial singularity engine. Zero raster images.
 * Features:
 * - Sacred geometry rotating rings (`SoulCore`)
 * - Gravitational stardust vortex (`Particles`)
 * - Live memory reconstruction progress (`00% -> 100%`)
 * - Luxury editorial text sequence (`YASH NIMSE`)
 * - Cosmic shockwave reveal exit into the main portfolio
 */

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSoul } from "../../context/SoulContext";

// Sub-components
import { FilmGrain } from "./FilmGrain";
import { Glow } from "./Glow";
import { SoulCore } from "./SoulCore";
import { Particles } from "./Particles";
import { TextSequence, TEXT_LINES } from "./TextSequence";

// Styles
import "./preloader.css";

export const Preloader: React.FC = () => {
  const { isLoaded, setIsLoaded } = useSoul();

  const rootRef      = useRef<HTMLDivElement | null>(null);
  const soulRef      = useRef<HTMLDivElement | null>(null);
  const glowRef      = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLCanvasElement | null>(null);
  const textRef      = useRef<HTMLDivElement | null>(null);
  const progressRef  = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoaded) return;

    const root      = rootRef.current;
    const soul      = soulRef.current;
    const glow      = glowRef.current;
    const particles = particlesRef.current;
    const counter   = progressRef.current;

    if (!root || !soul || !glow || !particles || !counter) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.set(soul, { opacity: 0, scale: 1, filter: "blur(0px)" });
      gsap.set(particles, { opacity: 0.4 });
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(root, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => setIsLoaded(true),
          });
        },
      });
      tl.to(soul, { opacity: 1, duration: 0.8, ease: "power2.out" })
        .to("#line-3", { opacity: 1, y: 0, duration: 0.5 }, 0.8)
        .to("#line-3", { opacity: 0, duration: 0.4 }, 1.8);
      return () => { tl.kill(); };
    }

    // ── Full Cinematic Timeline ────────────────────────────────
    const glow1 = glow.querySelector("[data-glow='1']") as HTMLElement;
    const glow2 = glow.querySelector("[data-glow='2']") as HTMLElement;
    const glow3 = glow.querySelector("[data-glow='3']") as HTMLElement;

    gsap.set(soul,      { opacity: 0, scale: 0.65, filter: "blur(30px)" });
    gsap.set(particles, { opacity: 0 });
    gsap.set([glow1, glow2, glow3], { opacity: 0 });
    gsap.set(counter,   { opacity: 0 });

    TEXT_LINES.forEach(({ id }) => {
      gsap.set(`#${id}`, { opacity: 0, y: 8 });
    });

    const progressObj = { value: 0 };
    const progressEl = document.getElementById("preloader-progress-number");

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoaded(true);
      },
    });

    // ── 0.0s  Stardust vortex & live counter fade in ──────────
    tl.addLabel("start", 0);
    tl.to(particles, { opacity: 0.85, duration: 0.9, ease: "power2.out" }, "start");
    tl.to(counter,   { opacity: 1, duration: 0.7, ease: "power2.out" }, "start+=0.2");

    // Smooth counter count-up from 0 to 100 across 5.2 seconds
    tl.to(progressObj, {
      value: 100,
      duration: 5.2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (progressEl) {
          const val = Math.round(progressObj.value);
          progressEl.textContent = val < 10 ? `0${val}` : `${val}`;
        }
      },
    }, "start+=0.2");

    // ── 0.4s  "ARCHIVE // UNKNOWN" ───────────────────────────
    tl.addLabel("text-0", 0.4);
    tl.to("#line-0", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "text-0");
    tl.to("#line-0", { opacity: 0, y: -6, duration: 0.4, ease: "power2.in" }, "text-0+=0.85");

    // ── 0.8s  Soul Core Singularity materialises ─────────────
    tl.addLabel("soul-in", 0.8);
    tl.to(soul, { opacity: 1, duration: 1.8, ease: "power3.out" }, "soul-in");
    tl.to(soul, { scale: 1, duration: 1.6, ease: "expo.out" }, "soul-in");
    tl.to(soul, { filter: "blur(0px)", duration: 1.5, ease: "power2.out" }, "soul-in");

    tl.to(glow1, { opacity: 1, duration: 1.8, ease: "power2.out" }, "soul-in+=0.1");
    tl.to(glow2, { opacity: 1, duration: 1.6, ease: "power2.out" }, "soul-in+=0.2");
    tl.to(glow3, { opacity: 1, duration: 1.4, ease: "power2.out" }, "soul-in+=0.3");

    // Deep breathing pulses on the soul core
    tl.to(soul, { scale: 1.05, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: 2 }, "soul-in+=1.0");

    // ── 1.6s  "Recovering Memories..." ──────────────────────
    tl.addLabel("text-1", 1.6);
    tl.to("#line-1", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "text-1");
    tl.to("#line-1", { opacity: 0, y: -6, duration: 0.4, ease: "power2.in" }, "text-1+=0.85");

    // ── 2.7s  "Identity Located" ─────────────────────────────
    tl.addLabel("text-2", 2.7);
    tl.to("#line-2", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "text-2");
    tl.to("#line-2", { opacity: 0, y: -6, duration: 0.4, ease: "power2.in" }, "text-2+=0.85");

    // ── 3.8s  "YASH NIMSE" (name reveal — luxurious & prominent) ──
    tl.addLabel("text-3", 3.8);
    tl.to("#line-3", { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "text-3");
    tl.to("#line-3", { opacity: 0, y: -6, duration: 0.45, ease: "power2.in" }, "text-3+=1.0");

    // ── 4.8s  "Entering The Soul Archive..." ─────────────────
    tl.addLabel("text-4", 4.8);
    tl.to("#line-4", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "text-4");
    tl.to("#line-4", { opacity: 0, duration: 0.35, ease: "power2.in" }, "text-4+=0.6");

    // ── 5.4s  Cosmic Shockwave Singularity Pulse ─────────────
    tl.addLabel("pulse", 5.4);
    tl.to(soul, { scale: 3.5, opacity: 0, duration: 0.55, ease: "expo.in" }, "pulse");
    tl.to([glow1, glow2, glow3], { scale: 2.8, opacity: 0, duration: 0.55, ease: "power2.in" }, "pulse");
    tl.to(particles, { opacity: 0, duration: 0.45, ease: "power2.in" }, "pulse");
    tl.to(counter,   { opacity: 0, duration: 0.35, ease: "power2.in" }, "pulse");

    // ── 5.7s  Full preloader dissolves to transparent ────────
    tl.addLabel("exit", 5.7);
    tl.to(root, {
      opacity: 0,
      duration: 0.55,
      ease: "power2.inOut",
    }, "exit");
    tl.set(root, { display: "none" });

    return () => { tl.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoaded) return null;

  return (
    <div
      ref={rootRef}
      className="preloader-root"
      role="status"
      aria-label="Loading The Soul Archive"
    >
      <div className="preloader-vignette" aria-hidden="true" />
      <FilmGrain />
      <Particles ref={particlesRef} />
      <Glow ref={glowRef} />
      <SoulCore ref={soulRef} />
      <TextSequence ref={textRef} progressRef={progressRef} />
    </div>
  );
};
