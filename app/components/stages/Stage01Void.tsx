"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useSoul } from "../../context/SoulContext";
import { HyperText } from "../ui/HyperText";

const ROLES = [
  "SOFTWARE DEVELOPER",
  "A FOUNDER",
  "PROBLEM SOLVER",
  "AI ENGINEER",
  "ENTREPRENEUR",
];

export const Stage01Void: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const roleRef = useRef<HTMLDivElement | null>(null);
  const sublineRef = useRef<HTMLDivElement | null>(null);
  const { isLoaded } = useSoul();

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // 1. Initial Hero Text One-Time Morph Reveal on Load
  useEffect(() => {
    const title = titleRef.current;
    if (!title || !isLoaded) return;

    // One-time smooth liquid blur & threshold morph entrance
    gsap.fromTo(
      title,
      {
        opacity: 0,
        filter: "blur(20px) contrast(160%)",
        y: 25,
        scale: 0.94,
      },
      {
        opacity: 1,
        filter: "blur(0px) contrast(100%)",
        y: 0,
        scale: 1,
        duration: 1.6,
        ease: "power3.out",
        delay: 0.15,
      }
    );
  }, [isLoaded]);

  // 2. Magic UI HyperText Scramble Rotator
  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isLoaded]);

  return (
    <section
      ref={sectionRef}
      id="stage-0"
      className="relative flex min-h-screen min-h-[100dvh] w-full flex-col justify-between z-20 overflow-hidden perspective-[1200px]"
    >
      {/* SVG Threshold Morphing Filter */}
      <svg className="fixed h-0 w-0 pointer-events-none opacity-0" aria-hidden="true">
        <defs>
          <filter id="morph-threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      {/* Background Banner Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/banner.webp"
          alt="Yash Portfolio Hero Banner"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-center opacity-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d1d1d]/60 via-transparent to-[#1d1d1d]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1d1d1d]/80 via-transparent to-[#1d1d1d]/80" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />
      </div>

      {/* ── Layout: Three-row flex-col ── */}
      {/* ROW 1: Top status bar */}
      <div className="relative z-30 flex items-center gap-3 pl-[85px] pr-5 sm:pl-[140px] sm:pr-12 lg:pl-[160px] lg:pr-20 pt-16 sm:pt-8 pb-4 sm:pb-6 border-b border-white/10 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/70 select-none">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffc490] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffc490]"></span>
        </span>
        <span className="font-bold text-white">YASH NIMSE</span>
        <span className="text-white/30">/</span>
        <span>A HUSTLER</span>
      </div>

      {/* ROW 3: Hero content — sits in the center of the viewport */}
      <div
        className="relative z-30 flex flex-col items-start px-5 sm:px-12 lg:px-20 my-auto"
      >
        {/* Label */}
        <div className="mb-3 sm:mb-5 font-mono text-xs sm:text-sm font-semibold tracking-[0.35em] text-[#ffc490] uppercase flex items-center gap-3">
          <span className="inline-block w-8 h-[1px] bg-[#ffc490]" />
          THE ORIGIN
        </div>

        {/* Massive Hero Title - One-Time Morphing Entrance */}
        <h1
          ref={titleRef}
          className="font-serif-italic uppercase leading-[0.88] text-[#f5f0e8] select-none cursor-default mb-5 sm:mb-8 drop-shadow-[0_0_60px_rgba(0,0,0,0.9)] opacity-0 will-change-transform"
          style={{
            fontSize: "clamp(4.5rem, 18vw, 10rem)",
          }}
        >
          <span className="inline-block mr-4 sm:mr-6">I</span>
          <span className="inline-block mr-4 sm:mr-6">AM</span>
          <span className="inline-block text-[#ffc490] hover:text-[#ffc490] transition-colors duration-500">
            ETERNAL.
          </span>
        </h1>

        {/* Rotating Role */}
        <div
          ref={roleRef}
          className="flex items-center gap-3 sm:gap-5"
        >
          <div className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 shrink-0">
            <div className="absolute inset-0 rounded-full bg-[#ffc490]/20 animate-ping opacity-75" />
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#ffc490] animate-[spinSlow_12s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" stroke="#ffc490" strokeWidth="1.5" strokeOpacity="0.6" />
              <path d="M12 6V18M6 12H18M7.75 7.75L16.25 16.25M7.75 16.25L16.25 7.75" stroke="#ffc490" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <HyperText
            duration={850}
            className="font-mono tracking-[0.18em] sm:tracking-[0.22em] text-white uppercase select-none"
            style={{ fontSize: "clamp(0.75rem, 3.5vw, 2.25rem)" } as React.CSSProperties}
          >
            {ROLES[currentRoleIndex]}
          </HyperText>
        </div>
      </div>

      {/* ROW 4: Bottom footer bar */}
      <div
        ref={sublineRef}
        className="relative z-30 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 sm:gap-8 border-t border-white/10 px-5 sm:px-12 lg:px-20 pt-5 sm:pt-8 pb-8 sm:pb-10"
      >
        <div className="max-w-sm sm:max-w-md xl:max-w-lg self-end sm:self-auto text-right sm:text-left">
          <p className="font-mono text-[10px] sm:text-sm leading-relaxed tracking-[0.12em] sm:tracking-[0.15em] text-white/70 uppercase">
            &ldquo;The soul remembers what the mind forgets. I simply build those memories.&rdquo;
          </p>
        </div>

        <div
          onClick={() => {
            const el = document.getElementById("stage-1");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex items-center gap-4 group cursor-pointer select-none self-end sm:self-auto"
        >
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-white/90 font-medium uppercase group-hover:text-[#ffc490] transition-colors duration-300">
              BEGIN THE JOURNEY
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-white/40 uppercase">
              SCROLL TO AWAKEN
            </span>
          </div>
          <div className="relative flex flex-col items-center justify-center w-9 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm group-hover:border-[#ffc490]/60 group-hover:shadow-[0_0_20px_rgba(255,196,144,0.2)] transition-all duration-500">
            <span className="text-white/80 group-hover:text-[#ffc490] group-hover:translate-y-1 transition-all duration-500 text-sm font-mono font-bold">↓</span>
            <div className="absolute top-0 w-full h-full rounded-full overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-1/2 bg-gradient-to-b from-transparent via-[#ffc490] to-transparent animate-[scanline_2s_linear_infinite]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
