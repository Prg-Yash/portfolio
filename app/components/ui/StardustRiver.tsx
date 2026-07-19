"use client";

import React, { useEffect, useRef } from "react";

interface StardustRiverProps {
  className?: string;
  text?: string;
}

interface Particle {
  x: number;
  y: number;
  baseY: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  baseOpacity: number;
  twinkleSpeed: number;
  type: "dust" | "star" | "orb";
  color: string;
  angle: number;
  amplitude: number;
  frequency: number;
}

export const StardustRiver: React.FC<StardustRiverProps> = ({
  className = "",
  text = "EXISTS. ACROSS CULTURES, THESE PATTERNS HAVE SERVED AS TOOLS FOR NAVIGATION, STORYTELLING, AND ORIENTATION.",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = window.innerWidth < 768 ? 250 : 450);

    // Handle high-DPI Retina screens for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      width = window.innerWidth;
      height = width < 768 ? 250 : 450;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Generate Celestial Stream Particles (Optimized for 60fps buttery smooth rendering!)
    const particles: Particle[] = [];
    const totalDust = 900;
    const totalStars = 70;
    const totalOrbs = 20;

    const createParticle = (type: "dust" | "star" | "orb"): Particle => {
      const x = Math.random() * width;
      const riverCenter = height / 2;
      const maxSpread = (height / 2) - 15; // Keep particles at least 15px away from the edges
      
      let baseSpread = 50;
      if (type === "star") baseSpread = 110;
      if (type === "orb") baseSpread = 90;

      // Use a triangle distribution [-1, 1] for a natural clustered look.
      // Scale it by baseSpread * 2 (the original intended width), but cap it at maxSpread so nothing clips.
      const actualSpread = Math.min(baseSpread * 2, maxSpread);
      const randNormal = Math.random() - 0.5 + Math.random() - 0.5;
      
      const baseY = riverCenter + (randNormal * actualSpread);

      let size = Math.random() * 1.2 + 0.4;
      let opacity = Math.random() * 0.7 + 0.2;
      let color = Math.random() > 0.8 ? "#ffc490" : "#ffffff";
      let speedX = Math.random() * 0.4 + 0.15;

      if (type === "star") {
        size = Math.random() * 2.2 + 1.2;
        opacity = Math.random() * 0.8 + 0.2;
        color = Math.random() > 0.6 ? "#ffc490" : "#ffffff";
        speedX = Math.random() * 0.3 + 0.1;
      } else if (type === "orb") {
        size = Math.random() * 6 + 3; // Major navigation spheres (3px to 9px)
        opacity = Math.random() * 0.8 + 0.25;
        color = Math.random() > 0.4 ? "#ffc490" : "#ffffff";
        speedX = Math.random() * 0.2 + 0.05;
      }

      return {
        x,
        y: baseY,
        baseY,
        size,
        speedX,
        speedY: (Math.random() - 0.5) * 0.1,
        opacity,
        baseOpacity: opacity,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        type,
        color,
        angle: Math.random() * Math.PI * 2,
        amplitude: Math.random() * 25 + 10,
        frequency: Math.random() * 0.008 + 0.002,
      };
    };

    for (let i = 0; i < totalDust; i++) particles.push(createParticle("dust"));
    for (let i = 0; i < totalStars; i++) particles.push(createParticle("star"));
    for (let i = 0; i < totalOrbs; i++) particles.push(createParticle("orb"));

    let time = 0;
    let isVisible = true;

    // IntersectionObserver: automatically pause 60fps rendering when off-screen!
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            cancelAnimationFrame(animationFrameId);
            render();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Animation Loop (Zero CPU overhead!)
    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      // Draw River Flow
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        if (p.x > width + 20) {
          p.x = -20;
          p.baseY = height / 2 - 30 + (Math.random() - 0.5 + Math.random() - 0.5) * (p.type === "dust" ? 100 : 200);
        }

        const wave1 = Math.sin(p.x * p.frequency + time) * p.amplitude;
        const wave2 = Math.cos(p.x * (p.frequency * 2) - time * 0.8) * (p.amplitude * 0.4);
        let targetY = p.baseY + wave1 + wave2;

        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = targetY - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;
          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 35;
            const angle = Math.atan2(dy, dx);
            targetY += Math.sin(angle) * force;
          }
        }

        p.y += (targetY - p.y) * 0.1;

        p.angle += p.twinkleSpeed;
        p.opacity = p.baseOpacity + Math.sin(p.angle) * 0.25;
        if (p.opacity < 0.05) p.opacity = 0.05;
        if (p.opacity > 1) p.opacity = 1;

        ctx.fillStyle = p.color;

        // Draw fast glow without expensive CPU shadowBlur!
        if (p.type === "orb") {
          ctx.globalAlpha = p.opacity * 0.2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse handlers for interactive river parting
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden py-0 ${className}`}>
      {/* 60FPS Flowing Stardust River Canvas */}
      <div className="relative w-full flex justify-center items-center">
        <canvas
          ref={canvasRef}
          className="w-full h-[250px] md:h-[450px] block cursor-crosshair select-none"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};
