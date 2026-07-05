"use client";

import { useEffect, useRef, RefObject } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSoul } from "../context/SoulContext";
import { SITE_CONTENT } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

export const useSmoothScroll = (mainRef: RefObject<HTMLElement | null>) => {
  const lenisRef = useRef<Lenis | null>(null);
  const {
    isLoaded,
    setScrollProgress,
    setActiveStageIndex,
    setCursorColor,
    registerScrollToStage,
  } = useSoul();

  useEffect(() => {
    if (!isLoaded) return;

    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0, 0);

    // 2. Register Scroll-to-Stage Function in Context
    registerScrollToStage((stageIndex: number) => {
      const targetEl = document.getElementById(`stage-${stageIndex}`);
      if (targetEl && lenisRef.current) {
        lenisRef.current.scrollTo(targetEl, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          offset: 0,
        });
      }
    });

    // 3. Track Overall Scroll Progress (Commented out setScrollProgress to prevent global re-renders on every scroll pixel)
    const mainEl = mainRef.current;
    if (mainEl) {
      ScrollTrigger.create({
        trigger: mainEl,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          // setScrollProgress(self.progress);
        },
      });
    }

    // 4. Track Active Stage and Update Color Accent
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

    // Sort and refresh ScrollTriggers after DOM and fonts settle
    const handleRefresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleRefresh);
    const t1 = setTimeout(handleRefresh, 100);
    const t2 = setTimeout(handleRefresh, 500);
    const t3 = setTimeout(handleRefresh, 1500);

    return () => {
      window.removeEventListener("load", handleRefresh);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isLoaded, mainRef, registerScrollToStage, setActiveStageIndex, setCursorColor, setScrollProgress]);

  return lenisRef;
};
