"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSoul } from "../../context/SoulContext";
import { SpiralAnimation } from "../ui/spiral-animation";
import { FilmGrain } from "./FilmGrain";

export const Preloader: React.FC = () => {
  const { isLoaded, setIsLoaded } = useSoul();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (isLoaded) return;

    const progressObj = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        if (rootRef.current) {
          gsap.to(rootRef.current, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
            onComplete: () => setIsLoaded(true),
          });
        }
      },
    });

    // Counter runs over 6 seconds
    tl.to(progressObj, {
      value: 100,
      duration: 6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (progressRef.current) {
          const val = Math.round(progressObj.value);
          progressRef.current.textContent = val < 10 ? `0${val}` : `${val}`;
        }
      },
    });

    return () => {
      tl.kill();
    };
  }, [isLoaded, setIsLoaded]);

  if (isLoaded) return null;

  return (
    <div
      ref={rootRef}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "#1d1d1d", overflow: "hidden" }}
      role="status"
      aria-label="Loading"
    >
      <FilmGrain />

      {/* Full-screen spiral canvas – no blend modes for perf */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <SpiralAnimation />
      </div>

      {/* Bottom HUD */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "2.5rem 3rem",
          pointerEvents: "none",
        }}
      >
        {/* Left: Branding */}
        <div style={{ fontFamily: "monospace" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#ffd890",
                boxShadow: "0 0 8px #ffd890",
                display: "inline-block",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.9)",
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              SYSTEM AWAKENING
            </span>
          </div>
          <div
            style={{
              marginTop: "0.4rem",
              paddingLeft: "1.25rem",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,216,144,0.65)",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            YASH NIMSE // ARCHIVE
          </div>
        </div>

        {/* Right: Numeric counter */}
        <div
          style={{
            fontFamily: "monospace",
            display: "flex",
            alignItems: "flex-end",
            lineHeight: 1,
          }}
        >
          <span
            ref={progressRef}
            style={{
              fontSize: "clamp(3.5rem, 8vw, 6rem)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.95)",
              letterSpacing: "0.05em",
              textShadow: "0 0 30px rgba(255,255,255,0.25)",
            }}
          >
            00
          </span>
          <span
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              color: "#ffd890",
              marginLeft: "0.2rem",
              marginBottom: "0.3rem",
              textShadow: "0 0 12px rgba(255,216,144,0.6)",
            }}
          >
            %
          </span>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};
