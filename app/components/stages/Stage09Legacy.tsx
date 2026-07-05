"use client";

import React, { useState } from "react";
import { Copy, Check, ArrowUpRight, Download } from "lucide-react";
import { SITE_CONTENT } from "../../data/content";
import { useSoul } from "../../context/SoulContext";

export const Stage09Legacy: React.FC = () => {
  const { scrollToStageIndex } = useSoul();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SITE_CONTENT.legacy.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section
      id="stage-8"
      className="relative flex min-h-screen w-full flex-col justify-between px-6 sm:px-12 pt-32 pb-12 z-20 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl flex flex-col justify-between flex-1">
        <div>
          {/* Header */}
          <div className="mb-12 text-center sm:text-left">
            <div className="inline-flex items-center gap-4 mb-3">
              <span className="font-mono text-xs font-bold tracking-[0.3em] text-[#ffd890] animate-pulse">
                09 / LEGACY
              </span>
              <div className="h-[1px] w-16 bg-gradient-to-r from-[#ffd890] to-transparent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/50">
                WHAT REMAINS
              </span>
            </div>
            <h2 className="font-serif-italic text-5xl sm:text-7xl md:text-8xl tracking-wide text-white drop-shadow-lg">
              {SITE_CONTENT.legacy.closingLine}
            </h2>
            <p className="mt-6 max-w-2xl font-mono text-xs sm:text-sm tracking-[0.2em] text-white/70 uppercase leading-relaxed">
              {SITE_CONTENT.legacy.subline}
            </p>
          </div>

          {/* Action Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16">
            {/* Main Interactive Email Card */}
            <div className="lg:col-span-7 rounded-3xl border border-white/20 bg-gradient-to-br from-white/15 via-black/80 to-black/95 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_0_60px_rgba(255,216,144,0.15)] flex flex-col justify-between hover:border-[#ffd890]/50 transition-all duration-500 group">
              <div>
                <span className="block font-mono text-xs tracking-[0.25em] text-[#ffd890] uppercase font-bold mb-4">
                  DIRECT TRANSMISSION
                </span>
                <p className="font-sans text-sm sm:text-base leading-relaxed text-white/80 mb-8">
                  Open for select award-winning digital commissions, creative direction, and visionary front-end architecture.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-between rounded-2xl border border-white/20 bg-black/60 px-6 py-4 font-mono text-sm tracking-[0.1em] text-white hover:border-[#ffd890] transition-all duration-300 group/btn cursor-pointer"
                >
                  <span className="truncate mr-4 text-[#ffd890] font-bold">
                    {SITE_CONTENT.legacy.contact.email}
                  </span>
                  <div className="flex items-center gap-2 text-xs tracking-[0.2em] text-white/70 group-hover/btn:text-white shrink-0">
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-[#ffc490]" />
                        <span className="text-[#ffc490] font-bold">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>COPY</span>
                      </>
                    )}
                  </div>
                </button>

                <a
                  href={`mailto:${SITE_CONTENT.legacy.contact.email}`}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#ffd890] px-8 py-4 font-mono text-xs font-bold tracking-[0.2em] uppercase text-black hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(255,216,144,0.4)] active:scale-95"
                >
                  <span>SEND</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Social Links & Resume Card */}
            <div className="lg:col-span-5 rounded-3xl border border-white/15 bg-black/50 p-8 sm:p-12 backdrop-blur-2xl flex flex-col justify-between hover:border-white/30 transition-all duration-500">
              <div>
                <span className="block font-mono text-xs tracking-[0.25em] text-white/60 uppercase font-bold mb-6">
                  DIGITAL FOOTPRINT
                </span>

                <div className="space-y-4">
                  {SITE_CONTENT.legacy.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 font-mono text-xs tracking-[0.2em] uppercase text-white/80 hover:border-[#ffd890] hover:text-white hover:bg-white/10 transition-all duration-300 group/social"
                    >
                      <span className="group-hover/social:translate-x-1 transition-transform font-semibold">{social.name}</span>
                      <ArrowUpRight className="h-4 w-4 text-white/40 group-hover/social:text-[#ffd890] transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs tracking-[0.15em] text-white/50">
                <span>LOCATION: {SITE_CONTENT.legacy.contact.location}</span>
                <span>EST. 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer & Kinetic Back to Top */}
        <footer className="mt-24 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
            {SITE_CONTENT.legacy.copyright}
          </p>

          <button
            onClick={() => scrollToStageIndex(0)}
            className="group relative px-6 py-3 rounded-full border border-white/20 bg-white/5 flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-white/80 hover:border-[#ffc490] hover:text-[#ffc490] hover:bg-[#ffc490]/10 transition-all duration-300 cursor-pointer shadow-lg"
          >
            <span>RETURN TO THE VOID</span>
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1 font-bold text-base">&uarr;</span>
          </button>
        </footer>
      </div>
    </section>
  );
};
