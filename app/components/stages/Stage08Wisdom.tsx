"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SITE_CONTENT } from "../../data/content";

export const Stage08Wisdom: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = SITE_CONTENT.wisdom.testimonials;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="stage-7"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 sm:px-12 py-32 z-20 overflow-hidden perspective-[1500px]"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="w-full">
          {/* Header */}
          <div className="mb-16 text-center sm:text-left">
            <div className="inline-flex items-center gap-4 mb-3">
              <span className="font-mono text-xs font-bold tracking-[0.3em] text-[#a0f0d0] animate-pulse">
                08 / WISDOM
              </span>
              <div className="h-[1px] w-16 bg-gradient-to-r from-[#a0f0d0] to-transparent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/50">
                THE PATTERNS RECOGNIZED
              </span>
            </div>
            <h2 className="font-serif-italic text-4xl sm:text-6xl tracking-wide text-white drop-shadow-md">
              Reflections &amp; Testimonials
            </h2>
          </div>

          {/* 3D Deck Card Testimonial Carousel */}
          <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 via-black/80 to-black/95 p-8 sm:p-16 backdrop-blur-2xl shadow-[0_0_60px_rgba(160,240,208,0.15)] text-left overflow-hidden">
            <Quote className="absolute top-8 right-8 h-20 w-20 text-white/5 pointer-events-none" />

            <div className="min-h-[200px] flex items-center">
              <p
                key={currentIndex}
                className="font-serif-italic text-2xl sm:text-4xl leading-relaxed tracking-wide text-white animate-fade-in drop-shadow-sm"
              >
                &ldquo;{testimonials[currentIndex].quote}&rdquo;
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="font-mono text-base font-bold tracking-[0.15em] text-[#a0f0d0]">
                  {testimonials[currentIndex].author}
                </h3>
                <span className="font-mono text-xs tracking-[0.1em] text-white/60">
                  {testimonials[currentIndex].role} — {testimonials[currentIndex].company}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                <button
                  onClick={handlePrev}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 hover:border-[#a0f0d0] hover:bg-[#a0f0d0] hover:text-black transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 hover:border-[#a0f0d0] hover:bg-[#a0f0d0] hover:text-black transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
