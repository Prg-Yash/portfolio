"use client";
/**
 * TextSequence.tsx — Luxury Editorial Sequence & Live Counter
 * =============================================================
 * Bottom-left sequence + bottom-right 00% -> 100% counter.
 */

import React, { forwardRef } from "react";

export interface TextLine {
  id: string;
  text: string;
  isName?: boolean;
}

export const TEXT_LINES: TextLine[] = [
  { id: "line-0", text: "ARCHIVE // UNKNOWN" },
  { id: "line-1", text: "Recovering Memories..." },
  { id: "line-2", text: "Identity Located" },
  { id: "line-3", text: "YASH NIMSE", isName: true },
  { id: "line-4", text: "Entering The Soul Archive..." },
];

interface TextSequenceProps {
  progressRef: React.RefObject<HTMLDivElement | null>;
}

export const TextSequence = forwardRef<HTMLDivElement, TextSequenceProps>(
  ({ progressRef }, ref) => {
    return (
      <>
        {/* Bottom Left Editorial Sequence */}
        <div
          ref={ref}
          className="text-sequence-root"
          aria-live="polite"
          aria-label="Loading sequence"
        >
          {TEXT_LINES.map((line) => (
            <div
              key={line.id}
              id={line.id}
              className={`text-line ${line.isName ? "text-line-name" : ""}`}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                opacity: 0,
                transform: "translateY(8px)",
              }}
              aria-hidden={true}
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Bottom Right Live Telemetry Counter */}
        <div ref={progressRef} className="preloader-counter" style={{ opacity: 0 }}>
          <span id="preloader-progress-number">00</span>%
        </div>
      </>
    );
  }
);

TextSequence.displayName = "TextSequence";
