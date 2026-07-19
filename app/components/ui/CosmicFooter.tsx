"use client";

import React from "react";
import { SITE_CONTENT } from "../../data/content";

export const CosmicFooter: React.FC = () => {
  return (
    <footer className="relative w-full border-t border-white/5 bg-[#1d1d1d]">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Name + tagline */}
        <div className="flex items-center gap-3">
          <span
            className="font-serif-italic tracking-wide"
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              background: "linear-gradient(120deg, rgba(255,255,255,0.6), rgba(255,196,144,1))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Yash Nimse
          </span>
          <span className="text-white/10 text-xs">·</span>
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/25">
            Mumbai, India
          </span>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-5">
          {SITE_CONTENT.legacy.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/25 hover:text-white/70 transition-colors duration-200"
            >
              {social.name}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/15 whitespace-nowrap">
          © 2026 Yash Nimse
        </p>

      </div>
    </footer>
  );
};
