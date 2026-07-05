"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONTENT } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

export const Stage02Awakening: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const subRef = useRef<HTMLDivElement | null>(null);
  const shardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    const subEl = subRef.current;
    const shardsEl = shardsRef.current;
    if (!container || !textEl || !subEl) return;

    // Floating background geometric shards animation
    if (shardsEl) {
      const shards = shardsEl.querySelectorAll(".shard-piece");
      shards.forEach((shard, i) => {
        gsap.to(shard, {
          y: (i % 2 === 0 ? -1 : 1) * 150,
          rotateZ: 360,
          rotateX: 180,
          duration: 15 + i * 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }

    const words = textEl.querySelectorAll(".word-span");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=200%",
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    // Kinetic 3D Word Rotation Scrub
    tl.fromTo(
      words,
      {
        opacity: 0.08,
        rotateX: 75,
        rotateY: -30,
        z: -100,
        scale: 0.8,
        filter: "blur(8px)",
        color: "#ffffff",
      },
      {
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        scale: 1,
        filter: "blur(0px)",
        color: "#ffc490",
        stagger: 0.15,
        ease: "power3.out",
      }
    ).to(
      words,
      {
        color: "#f5f0e8",
        stagger: 0.15,
        duration: 0.5,
      },
      "-=1.0"
    ).fromTo(
      subEl,
      { opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" },
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 2, ease: "expo.out" },
      "-=2"
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, []);

  const statementWords = SITE_CONTENT.about.statement.split(" ");

  return (
    <section
      ref={containerRef}
      id="stage-1"
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 z-20 overflow-hidden bg-gradient-to-b from-transparent via-[#1d1d1d]/90 to-transparent perspective-[1000px]"
    >
      {/* Floating Geometric Glass Shards Background */}
      <div ref={shardsRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="shard-piece absolute top-[15%] left-[10%] h-32 w-32 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md opacity-30" />
        <div className="shard-piece absolute top-[70%] left-[80%] h-48 w-48 rounded-full border border-[#ffc490]/20 bg-[#ffc490]/5 backdrop-blur-lg opacity-25" />
        <div className="shard-piece absolute top-[40%] right-[15%] h-24 w-24 rotate-45 border border-[#d4a5ff]/20 bg-[#d4a5ff]/5 backdrop-blur-sm opacity-20" />
        <div className="shard-piece absolute bottom-[20%] left-[25%] h-36 w-36 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md opacity-30" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center sm:text-left">
        {/* Stage Header */}
        <div className="mb-12 flex items-center justify-center sm:justify-start gap-4">
          <span className="font-mono text-xs font-bold tracking-[0.3em] text-[#ffc490] animate-pulse">
            02 / AWAKENING
          </span>
          <div className="h-[1px] w-16 bg-gradient-to-r from-[#ffc490] to-transparent" />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/50">
            THE BIRTH OF AWARENESS
          </span>
        </div>

        {/* 3D Kinetic Scrubbed Statement */}
        <p
          ref={textRef}
          className="font-serif-italic text-3xl sm:text-5xl md:text-6xl leading-[1.3] sm:leading-[1.25] tracking-wide text-white select-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {statementWords.map((word, idx) => (
            <span
              key={idx}
              className="word-span inline-block mr-3 sm:mr-4 mb-2 transition-all duration-300 hover:text-[#ffc490] hover:scale-110 cursor-default"
              style={{ transformStyle: "preserve-3d" }}
            >
              {word}
            </span>
          ))}
        </p>

        {/* Sub-narrative block */}
        <div
          ref={subRef}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/10 pt-8 font-mono text-xs sm:text-sm text-white/70 leading-relaxed tracking-wider"
        >
          <div className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md hover:border-[#ffc490]/30 transition-all">
            <span className="block font-bold text-[#ffc490] mb-2">ORIGIN PROTOCOL</span>
            Every creative journey begins in the dark—an unformed spark seeking structure in an expanding digital void.
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md hover:border-[#ffc490]/30 transition-all">
            <span className="block font-bold text-white mb-2">THE MISSION</span>
            To bridge raw imagination with immaculate engineering, forging interactive digital monuments that endure.
          </div>
        </div>
      </div>
    </section>
  );
};
