"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSoul } from "../../context/SoulContext";

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  vx: number;
  vy: number;
  color: string;
}

export const CustomCursor: React.FC = () => {
  const { cursorColor } = useSoul();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const lastMousePos = useRef({ x: -100, y: -100 });
  const particlesRef = useRef<Particle[]>([]);
  const cursorColorRef = useRef(cursorColor || "#ffc490");

  useEffect(() => {
    cursorColorRef.current = cursorColor || "#ffc490";
  }, [cursorColor]);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      const newPos = { x: e.clientX, y: e.clientY };
      mousePos.current = newPos;

      // Check distance moved to spawn stardust trail particles into ref array (zero DOM churn!)
      const dx = newPos.x - lastMousePos.current.x;
      const dy = newPos.y - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 12 && !isHovered) {
        lastMousePos.current = newPos;
        particlesRef.current.push({
          x: newPos.x + (Math.random() - 0.5) * 10,
          y: newPos.y + (Math.random() - 0.5) * 10,
          size: Math.random() * 3 + 1.5,
          alpha: 0.8,
          vx: -dx * 0.05 + (Math.random() - 0.5) * 1.5,
          vy: -dy * 0.05 + (Math.random() - 0.5) * 1.5,
          color: cursorColorRef.current,
        });
        if (particlesRef.current.length > 25) {
          particlesRef.current.shift();
        }
      }

      const target = e.target as HTMLElement;
      const interactive = target.closest("button, a, input, [role='button'], [data-cursor], .interactive-node");
      setIsHovered(!!interactive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, isHovered]);

  // 120fps zero-DOM-re-render animation loop via canvas and direct style refs
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const animateLoop = () => {
      // 1. Update DOM ref position directly without React re-render
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(${isHovered ? 0 : 1})`;
      }

      // 2. Clear canvas and draw particles
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.035;
        p.size *= 0.96;

        if (p.alpha <= 0.05) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animateLoop);
    };

    animationFrameId = requestAnimationFrame(animateLoop);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* 2D Hardware-accelerated particle canvas (Zero DOM churn!) */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Primary sharp glowing core dot */}
      <div
        ref={coreRef}
        className="absolute top-0 left-0 rounded-full transition-all duration-100 ease-out"
        style={{
          width: isClicking ? "4px" : "8px",
          height: isClicking ? "4px" : "8px",
          backgroundColor: cursorColor || "#ffc490",
          boxShadow: `0 0 15px 3px ${cursorColor || "#ffc490"}`,
        }}
      />
    </div>
  );
};
