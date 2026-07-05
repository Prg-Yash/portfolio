"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useSoul } from "../../context/SoulContext";
import { useGSAPTimeline } from "../../hooks/useGSAPTimeline";
import { HyperText } from "../ui/HyperText";

const ROLES = [
  "SOFTWARE DEVELOPER",
  "FOUNDER & ARCHITECT",
  "CREATIVE FREELANCER",
  "PROBLEM SOLVER",
];

export const Stage01Void: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const roleRef = useRef<HTMLDivElement | null>(null);
  const sublineRef = useRef<HTMLDivElement | null>(null);
  const { isLoaded } = useSoul();

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // 1. Initial Hero 3D Character Reveal on Load & Scroll Out
  useGSAPTimeline(
    { trigger: sectionRef, start: "top top", end: "bottom top", scrub: true },
    (tl) => {
      const title = titleRef.current;
      if (!title || !isLoaded) return;

      const letters = title.querySelectorAll(".hero-char");
      gsap.fromTo(
        letters,
        {
          opacity: 0,
          rotateX: -90,
          rotateY: 25,
          z: -180,
          scale: 1.3,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          scale: 1,
          filter: "blur(0px)",
          stagger: 0.045,
          duration: 1.8,
          ease: "expo.out",
          delay: 0.2,
        }
      );

      // On scroll down, letters gracefully blur out and elevate into 3D space
      tl.to(letters, {
        opacity: 0,
        z: 250,
        rotateX: 60,
        filter: "blur(15px)",
        stagger: 0.02,
        ease: "power2.inOut",
      })
        .to(
          roleRef.current,
          { opacity: 0, y: -40, filter: "blur(10px)", ease: "power2.out" },
          "<"
        )
        .to(
          sublineRef.current,
          { opacity: 0, y: -60, filter: "blur(10px)", ease: "power2.out" },
          "<"
        );
    },
    [isLoaded]
  );

  // 2. Magic UI HyperText Scramble Rotator
  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isLoaded]);

  // Helper to split text into 3D animated character spans
  const renderSplitText = (text: string, className: string = "hero-char") => {
    return text.split("").map((char, idx) => (
      <span
        key={idx}
        className={`${className} inline-block transition-colors duration-300 hover:text-[#ffc490] select-none`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="stage-0"
      className="relative flex min-h-screen w-full flex-col justify-between px-6 sm:px-12 lg:px-20 py-16 sm:py-20 z-20 overflow-hidden perspective-[1200px]"
    >
      {/* Background Banner Image with Atmospheric Darkening & GPU Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none animate-camera-breathe-bg">
        <Image
          src="/images/banner.webp"
          alt="Yash Portfolio Hero Banner"
          fill
          priority
          className="object-cover object-center opacity-75 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Deep cinematic vignette & contrast grading */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d1d1d]/60 via-transparent to-[#1d1d1d]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1d1d1d]/80 via-transparent to-[#1d1d1d]/80" />

        {/* Subtle 100% GPU-accelerated atmospheric grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />
      </div>

      {/* Top Header Bar: Movie Sync & Status */}
      <div className="relative z-30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 font-mono text-xs tracking-[0.2em] uppercase text-white/70 select-none">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffc490] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffc490]"></span>
          </span>
          <span className="font-bold text-white tracking-[0.25em]">YASH NIMSE</span>
          <span className="text-white/40">/</span>
          <span>A HUSTLER</span>
        </div>

        {/* <div className="flex items-center gap-6">
          <span className="hidden md:inline-block text-white/50">AVAILABLE FOR PROJECTS 2026</span>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] tracking-[0.25em] text-white">SYSTEM: ONLINE</span>
          </div>
        </div> */}
      </div>

      {/* Center Hooking Area: Section 1 ("I AM HIM") & Section 2 (Rotating Roles) */}
      <div className="relative z-30 my-auto flex flex-col items-start justify-center py-12 sm:py-20 animate-camera-breathe-content">
        {/* Section 1: The Massive Hook */}
        <div className="mb-4 sm:mb-6 font-mono text-xs sm:text-sm font-semibold tracking-[0.35em] text-[#ffc490] uppercase drop-shadow-md flex items-center gap-3">
          <span className="inline-block w-8 h-[1px] bg-[#ffc490]" />
          THE ORIGIN
        </div>

        <h1
          ref={titleRef}
          className="font-serif-italic text-6xl sm:text-8xl md:text-8xl lg:text-[10rem] xl:text-[10rem] font-normal tracking-tight uppercase leading-[0.85] text-[#f5f0e8] select-none drop-shadow-[0_0_60px_rgba(0,0,0,0.9)] cursor-default mb-6 sm:mb-8"
          style={{ transformStyle: "preserve-3d" }}
        >
          {renderSplitText("I AM ETERNAL.")}
        </h1>

        {/* Section 2: Magic UI HyperText Terminal Scramble Rotator */}
        <div
          ref={roleRef}
          className="flex items-center gap-3 sm:gap-5 text-base sm:text-2xl md:text-3xl lg:text-4xl font-mono tracking-[0.15em] sm:tracking-[0.2em] text-white/90 uppercase h-14 sm:h-16 overflow-hidden"
        >
          {/* Glowing Cyber Star Icon */}
          <div className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 shrink-0">
            <div className="absolute inset-0 rounded-full bg-[#ffc490]/20 animate-ping opacity-75" />
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#ffc490] animate-[spinSlow_12s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" stroke="#ffc490" strokeWidth="1.5" strokeOpacity="0.6" />
              <path d="M12 6V18M6 12H18M7.75 7.75L16.25 16.25M7.75 16.25L16.25 7.75" stroke="#ffc490" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* HyperText Scramble Decryption Animation */}
          <div className="inline-flex items-center py-2 overflow-hidden">
            <HyperText
              duration={850}
              className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-mono tracking-[0.18em] sm:tracking-[0.22em] text-white select-none"
            >
              {ROLES[currentRoleIndex]}
            </HyperText>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar: Movie Trailer Bio & Action Trigger */}
      <div
        ref={sublineRef}
        className="relative z-30 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 border-t border-white/10 pt-8"
      >
        <div className="max-w-md xl:max-w-lg">
          <p className="font-mono text-xs sm:text-sm leading-relaxed tracking-[0.15em] text-white/80 uppercase">
            &ldquo;The soul remembers what the mind forgets. I simply build those memories.&rdquo;
          </p>
        </div>

        {/* Cinematic Scroll Exploration Invitation (No Buttons!) */}
        <div
          onClick={() => {
            const el = document.getElementById("stage-1");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex items-center gap-4 group cursor-pointer select-none py-2"
        >
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-xs sm:text-sm tracking-[0.35em] text-white/90 font-medium uppercase group-hover:text-[#ffc490] transition-colors duration-300">
              BEGIN THE JOURNEY
            </span>
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
              SCROLL TO AWAKEN
            </span>
          </div>

          {/* Animated Down Arrow & Starlight Track */}
          <div className="relative flex flex-col items-center justify-center w-9 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm group-hover:border-[#ffc490]/60 group-hover:shadow-[0_0_20px_rgba(255,196,144,0.2)] transition-all duration-500">
            <span className="text-white/80 group-hover:text-[#ffc490] group-hover:translate-y-1 transition-all duration-500 text-sm font-mono font-bold">
              ↓
            </span>
            <div className="absolute top-0 w-full h-full rounded-full overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-1/2 bg-gradient-to-b from-transparent via-[#ffc490] to-transparent animate-[scanline_2s_linear_infinite]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
