"use client";
/**
 * Particles.tsx — Gravitational Stardust Vortex (160+ Particles)
 * Pure requestAnimationFrame + canvas 2D API.
 * Features:
 * - Swirling orbital attraction toward the central Soul Core
 * - Subtle pulsing opacity (`0.15 to 0.65`)
 * - Golden amber embers (`#ffc490`) interspersed among crystal white stars
 */

import React, { useRef, useEffect, forwardRef } from "react";

const PARTICLE_COUNT = 165;

interface Particle {
  x: number;
  y: number;
  r: number;
  baseOpacity: number;
  opacity: number;
  angle: number;
  orbitRadius: number;
  speed: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
}

export const Particles = forwardRef<HTMLCanvasElement>((_, ref) => {
  const internalRef = useRef<HTMLCanvasElement | null>(null);
  const setRef = (el: HTMLCanvasElement | null) => {
    internalRef.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) (ref as React.MutableRefObject<HTMLCanvasElement | null>).current = el;
  };

  useEffect(() => {
    const canvas = internalRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let raf = 0;
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      init();
    };

    const init = () => {
      const maxDist = Math.hypot(w, h) * 0.6;
      particles = Array.from({ length: PARTICLE_COUNT }, (): Particle => {
        const isGolden = Math.random() < 0.22;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.8 + 0.6,
          baseOpacity: Math.random() * 0.45 + 0.15,
          opacity: Math.random() * 0.45 + 0.15,
          angle: Math.random() * Math.PI * 2,
          orbitRadius: Math.random() * maxDist + 20,
          speed: (0.003 + Math.random() * 0.006) * (Math.random() > 0.5 ? 1 : -1),
          color: isGolden ? "#ffc490" : "#ffffff",
          pulseSpeed: 0.01 + Math.random() * 0.02,
          pulsePhase: Math.random() * Math.PI * 2,
        };
      });
    };

    let t = 0;
    const render = () => {
      raf = requestAnimationFrame(render);
      ctx.clearRect(0, 0, w, h);
      t += 1;

      const cx = w / 2;
      const cy = h / 2;

      particles.forEach((p) => {
        // Orbit around center with subtle inward gravitational pull
        p.angle += p.speed;
        p.orbitRadius -= 0.12; // Slowly spiral inward toward the soul core

        if (p.orbitRadius < 15) {
          p.orbitRadius = Math.hypot(w, h) * 0.55;
          p.angle = Math.random() * Math.PI * 2;
        }

        p.x = cx + Math.cos(p.angle) * p.orbitRadius;
        p.y = cy + Math.sin(p.angle) * p.orbitRadius;

        // Pulse opacity
        p.pulsePhase += p.pulseSpeed;
        const op = p.baseOpacity * (0.65 + 0.35 * Math.sin(p.pulsePhase));

        ctx.globalAlpha = Math.max(0, Math.min(1, op));
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    };

    resize();
    window.addEventListener("resize", resize);
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={setRef}
      className="particles-canvas"
      aria-hidden="true"
      style={{ opacity: 0 }}
    />
  );
});

Particles.displayName = "Particles";
