"use client";

import { useEffect, RefObject } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSoul } from "../context/SoulContext";
import { SITE_CONTENT } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

export const useSmoothScroll = (mainRef: RefObject<HTMLElement | null>) => {
  const lenis = useLenis();
  const {
    isLoaded,
    setActiveStageIndex,
    setCursorColor,
    registerScrollToStage,
  } = useSoul();

  useEffect(() => {
    if (!isLoaded) return;

    // 1. Register Scroll-to-Stage Function using the global Lenis root instance
    registerScrollToStage((stageIndex: number) => {
      const targetEl = document.getElementById(`stage-${stageIndex}`);
      if (targetEl && lenis) {
        lenis.scrollTo(targetEl, {
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          offset: 0,
        });
      } else if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });

    // 2. Track Active Stage and Update Color Accent
    SITE_CONTENT.stages.forEach((stage, idx) => {
      const stageEl = document.getElementById(`stage-${idx}`);
      if (!stageEl) return;

      ScrollTrigger.create({
        trigger: stageEl,
        start: "top 60%",
        end: "bottom 60%",
        onEnter: () => {
          setActiveStageIndex(idx);
          setCursorColor(stage.accentColor);
        },
        onEnterBack: () => {
          setActiveStageIndex(idx);
          setCursorColor(stage.accentColor);
        },
      });
    });

    // 3. Refresh ScrollTrigger after DOM and fonts settle.
    // Deferred via rAF so refresh never interrupts a Lenis tick in progress.
    let raf1: number, raf2: number;
    const t1 = setTimeout(() => { raf1 = requestAnimationFrame(() => ScrollTrigger.refresh(true)); }, 600);
    const t2 = setTimeout(() => { raf2 = requestAnimationFrame(() => ScrollTrigger.refresh(true)); }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isLoaded, lenis, registerScrollToStage, setActiveStageIndex, setCursorColor]);

  return lenis;
};
