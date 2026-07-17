"use client";
/**
 * FilmGrain.tsx — Pure CSS film grain overlay.
 * Rendered as a static div; all animation is done in CSS
 * so it costs zero JS per frame.
 */

import React from "react";

interface FilmGrainProps {
  /** Opacity of the grain layer — typically 0.03–0.06 */
  opacity?: number;
}

export const FilmGrain: React.FC<FilmGrainProps> = ({ opacity = 0.042 }) => {
  return (
    <div
      className="preloader-grain"
      aria-hidden="true"
      style={{ opacity }}
    />
  );
};
