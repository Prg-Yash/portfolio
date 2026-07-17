"use client";
/**
 * Glow.tsx — Three layered radial gradient discs that simulate
 * the breathing energy aura behind the soul image.
 *
 * GSAP controls opacity and subtle scale on each layer.
 * The refs are forwarded to Preloader.tsx for timeline control.
 */

import React, { forwardRef } from "react";

interface GlowProps {
  /** Additional class for absolute positioning inside preloader */
  className?: string;
}

/**
 * We export individual layer refs as a wrapper ref pattern:
 * the parent (Preloader.tsx) will query `[data-glow]` children
 * inside this component's container ref.
 */
export const Glow = forwardRef<HTMLDivElement, GlowProps>(
  ({ className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={`absolute inset-0 flex items-center justify-center pointer-events-none z-[3] ${className}`}
        aria-hidden="true"
      >
        {/* Layer 1 — Largest outer aura */}
        <div
          className="glow-layer glow-layer-1 absolute"
          data-glow="1"
          style={{ opacity: 0 }} /* GSAP animates this */
        />

        {/* Layer 2 — Mid warm pulse */}
        <div
          className="glow-layer glow-layer-2 absolute"
          data-glow="2"
          style={{ opacity: 0 }}
        />

        {/* Layer 3 — Innermost bright core */}
        <div
          className="glow-layer glow-layer-3 absolute"
          data-glow="3"
          style={{ opacity: 0 }}
        />
      </div>
    );
  }
);

Glow.displayName = "Glow";
