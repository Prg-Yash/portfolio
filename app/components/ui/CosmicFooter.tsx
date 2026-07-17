"use client";

import React, { useEffect, useRef } from "react";

export const CosmicFooter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let t = 0;
    let w = 0, h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.parentElement?.clientWidth || window.innerWidth;
      h = 220;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Horizon stars — sparse, slow-drifting particles along the bottom
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * 4000 - 2000,
      y: Math.random() * 120 - 60,
      r: Math.random() * 1.2 + 0.2,
      speed: (Math.random() * 0.3 + 0.05) * (Math.random() > 0.5 ? 1 : -1),
      a: Math.random() * 0.6 + 0.15,
    }));

    const render = () => {
      raf = requestAnimationFrame(render);
      t += 0.008;

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Deep space gradient wash across the entire footer
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "rgba(29,29,29,0)");
      grad.addColorStop(0.3, "rgba(29,29,29,0.7)");
      grad.addColorStop(1, "rgba(10,8,6,0.98)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Horizon glow line — a thin golden sliver at the center
      const horizonY = cy + 30;
      const hGrad = ctx.createLinearGradient(cx - 420, 0, cx + 420, 0);
      hGrad.addColorStop(0, "rgba(255,196,144,0)");
      hGrad.addColorStop(0.2, "rgba(255,196,144,0.15)");
      hGrad.addColorStop(0.5, "rgba(255,220,180,0.55)");
      hGrad.addColorStop(0.8, "rgba(255,196,144,0.15)");
      hGrad.addColorStop(1, "rgba(255,196,144,0)");
      ctx.globalAlpha = 0.7 + 0.3 * Math.sin(t * 0.7);
      ctx.fillStyle = hGrad;
      ctx.fillRect(cx - 420, horizonY - 1, 840, 2);
      ctx.globalAlpha = 1;

      // Pulsing radial aura behind the name
      const auraR = 180 + 20 * Math.sin(t * 0.5);
      const aura = ctx.createRadialGradient(cx, horizonY, 0, cx, horizonY, auraR);
      aura.addColorStop(0, "rgba(255,196,144,0.06)");
      aura.addColorStop(0.5, "rgba(255,160,80,0.03)");
      aura.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.ellipse(cx, horizonY, auraR * 2.2, auraR * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Drifting horizon stars
      stars.forEach((s) => {
        s.x += s.speed;
        if (s.x > 2000) s.x = -2000;
        if (s.x < -2000) s.x = 2000;
        const sx = cx + s.x;
        const sy = horizonY + s.y + 8 * Math.sin(t * 0.4 + s.x * 0.002);
        if (sx < -10 || sx > w + 10) return;
        ctx.globalAlpha = s.a * (0.5 + 0.5 * Math.sin(t * 1.2 + s.x * 0.01));
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Scan line — subtle single moving horizontal light sweep
      const scanY = horizonY - 60 + (((t * 22) % 160) - 80);
      const scanGrad = ctx.createLinearGradient(0, scanY - 4, 0, scanY + 4);
      scanGrad.addColorStop(0, "rgba(255,196,144,0)");
      scanGrad.addColorStop(0.5, "rgba(255,196,144,0.04)");
      scanGrad.addColorStop(1, "rgba(255,196,144,0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 4, w, 8);
    };

    render();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <footer className="relative w-full bg-[#1d1d1d] overflow-hidden select-none">
      {/* Ambient canvas layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full pointer-events-none" style={{ height: "220px" }} />

      {/* Content stack */}
      <div className="relative z-10 flex flex-col items-center justify-end" style={{ height: "220px" }}>

        {/* Ultra-fine rule */}
        <div className="w-full mb-6 px-8 sm:px-16">
          <div
            className="w-full h-px"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,196,144,0.12) 20%, rgba(255,220,180,0.45) 50%, rgba(255,196,144,0.12) 80%, transparent 100%)",
            }}
          />
        </div>

        {/* Name — the centrepiece, massive and glowing */}
        <div className="relative flex items-center justify-center mb-2">
          {/* Diffuse glow behind name */}
          <span
            className="absolute inset-0 blur-[48px] opacity-30 font-serif-italic text-[#ffc490] pointer-events-none"
            aria-hidden="true"
            style={{ fontSize: "clamp(3rem, 10vw, 7rem)", letterSpacing: "0.08em", whiteSpace: "nowrap" }}
          >
            YASH NIMSE
          </span>

          <h2
            className="font-serif-italic tracking-wide"
            style={{
              fontSize: "clamp(2.8rem, 9vw, 6.5rem)",
              letterSpacing: "0.06em",
              background: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,220,180,0.90) 35%, rgba(255,196,144,1) 55%, rgba(255,255,255,0.45) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1,
            }}
          >
            YASH NIMSE
          </h2>
        </div>

        {/* Subline — a single whisper beneath the name */}
        <p
          className="font-mono text-white/20 tracking-[0.45em] uppercase mb-8"
          style={{ fontSize: "clamp(0.5rem, 1.2vw, 0.65rem)" }}
        >
          ✦ &nbsp; DESIGNED &amp; BUILT FROM SCRATCH &nbsp; ✦
        </p>
      </div>
    </footer>
  );
};
