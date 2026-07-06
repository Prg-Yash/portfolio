"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CRITICAL: useLenis() must be called INSIDE a child of <ReactLenis>,
 * NOT in the same component that renders <ReactLenis root>.
 * This inner component lives inside the provider so the context is available.
 */
function LenisGSAPBridge() {
  // This hook now correctly resolves to the Lenis instance
  // because LenisGSAPBridge renders as a child of <ReactLenis root>
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Drive Lenis's animation loop via GSAP ticker for perfect sync
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0); // Prevent GSAP lag compensation from breaking Lenis timing

    return () => {
      gsap.ticker.remove(tickerCallback);
    };
  }, [lenis]);

  // Keep GSAP ScrollTrigger in sync with every Lenis scroll event
  useLenis(() => {
    ScrollTrigger.update();
  });

  return null;
}

export const LenisScrollProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: false, // We drive the RAF via GSAP ticker in LenisGSAPBridge
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {/* Bridge must be a child of ReactLenis so useLenis() resolves */}
      <LenisGSAPBridge />
      {children}
    </ReactLenis>
  );
};
