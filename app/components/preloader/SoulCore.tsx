"use client";
/**
 * SoulCore.tsx — Pure Code Celestial Soul Engine
 * ================================================
 * Zero images! 100% mathematical canvas/CSS sacred geometry.
 * Features:
 * - A central radiant singularity core (`#ffc490`)
 * - Counter-rotating celestial orbital rings (`1px` ethereal golden lines)
 * - Orbiting stardust nodes that trace the soul's frequency
 */

import React, { forwardRef, useEffect, useRef } from "react";

export const SoulCore = forwardRef<HTMLDivElement>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let t = 0;
    let size = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      size = Math.min(window.innerWidth * 0.75, window.innerHeight * 0.75, 520);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      raf = requestAnimationFrame(render);
      t += 0.015;
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;

      // ── 1. Outer Ethereal Singularity Ring ─────────────────────
      const ring1R = size * 0.38 + Math.sin(t * 0.8) * 4;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.18);
      ctx.strokeStyle = "rgba(255, 196, 144, 0.18)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([8, 14, 2, 14]);
      ctx.beginPath();
      ctx.arc(0, 0, ring1R, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // ── 2. Middle Counter-Rotating Frequency Ring ──────────────
      const ring2R = size * 0.26 + Math.cos(t * 1.1) * 3;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-t * 0.28);
      ctx.strokeStyle = "rgba(255, 220, 175, 0.26)";
      ctx.lineWidth = 1.0;
      ctx.setLineDash([18, 22]);
      ctx.beginPath();
      ctx.arc(0, 0, ring2R, 0, Math.PI * 2);
      ctx.stroke();

      // Orbiting stardust electron on Ring 2
      const eAngle = t * 1.4;
      const ex = Math.cos(eAngle) * ring2R;
      const ey = Math.sin(eAngle) * ring2R;
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#ffc490";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(ex, ey, 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ── 3. Inner Sacred Geometry Ellipse ───────────────────────
      const ring3R = size * 0.15 + Math.sin(t * 1.5) * 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.45);
      ctx.strokeStyle = "rgba(255, 240, 210, 0.38)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.ellipse(0, 0, ring3R * 1.3, ring3R * 0.75, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Second electron on Ring 3
      const e2Angle = -t * 2.2;
      const e2x = Math.cos(e2Angle) * (ring3R * 1.3);
      const e2y = Math.sin(e2Angle) * (ring3R * 0.75);
      ctx.fillStyle = "#ffc490";
      ctx.beginPath();
      ctx.arc(e2x, e2y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ── 4. The Core Luminous Orb (The Soul Singularity) ────────
      const corePulse = 1 + 0.08 * Math.sin(t * 2.5);
      const coreR = (size * 0.07) * corePulse;
      
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 2.6);
      coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.98)");
      coreGrad.addColorStop(0.3, "rgba(255, 230, 190, 0.85)");
      coreGrad.addColorStop(0.6, "rgba(255, 180, 110, 0.40)");
      coreGrad.addColorStop(1, "rgba(255, 180, 110, 0)");

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 2.6, 0, Math.PI * 2);
      ctx.fill();

      // Solid bright white singularity heart
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 0.45, 0, Math.PI * 2);
      ctx.fill();
    };

    render();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="soul-core-wrapper"
      style={{
        opacity: 0,
        transform: "scale(0.75)",
        filter: "blur(30px)",
      }}
    >
      <canvas ref={canvasRef} className="pointer-events-none" />
    </div>
  );
});

SoulCore.displayName = "SoulCore";
