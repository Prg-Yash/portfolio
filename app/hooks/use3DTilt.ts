"use client";

import { useEffect, useState, RefObject } from "react";
import gsap from "gsap";

export interface TiltTarget {
  ref: RefObject<HTMLElement | null>;
  xMult?: number;
  yMult?: number;
  rotateXMult?: number;
  rotateYMult?: number;
  duration?: number;
  perspective?: number;
}

export const use3DTilt = (targets: TiltTarget[], deps: any[] = []): { x: number; y: number } => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Commented out 3D tilt parallax calculations and listeners to eliminate mousemove lag
    /*
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });

      targets.forEach((target) => {
        const el = target.ref.current;
        if (!el) return;

        const xMult = target.xMult !== undefined ? target.xMult : 10;
        const yMult = target.yMult !== undefined ? target.yMult : 10;
        const duration = target.duration !== undefined ? target.duration : 1.0;

        const animProps: gsap.TweenVars = {
          x: x * xMult,
          y: y * yMult,
          duration,
          ease: "power2.out",
        };

        if (target.rotateXMult !== undefined || target.rotateYMult !== undefined) {
          const rxMult = target.rotateXMult !== undefined ? target.rotateXMult : 5;
          const ryMult = target.rotateYMult !== undefined ? target.rotateYMult : 5;
          animProps.rotateX = -y * rxMult;
          animProps.rotateY = x * ryMult;
          animProps.transformPerspective = target.perspective || 1000;
        }

        gsap.to(el, animProps);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
    */
  }, deps);

  return mousePos;
};
