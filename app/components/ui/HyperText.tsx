"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HyperTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  characterSet?: readonly string[];
}

const DEFAULT_CHARACTER_SET = Object.freeze(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?".split("")
) as readonly string[];

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

export function HyperText({
  children,
  className,
  style,
  duration = 900,
  characterSet = DEFAULT_CHARACTER_SET,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState<string[]>(() => children.split(""));
  const iterationCount = useRef(0);

  useEffect(() => {
    let animationFrameId: number | null = null;
    const maxIterations = children.length;
    const startTime = performance.now();
    iterationCount.current = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      iterationCount.current = progress * maxIterations;

      setDisplayText(() =>
        children.split("").map((letter, index) =>
          letter === " "
            ? " "
            : index <= iterationCount.current
              ? children[index]
              : characterSet[getRandomInt(characterSet.length)]
        )
      );

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayText(children.split(""));
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [children, duration, characterSet]);

  return (
    <div className={cn("inline-flex items-center py-1", className)} style={style}>
      {displayText.map((letter, index) => (
        <span
          key={index}
          className={cn(
            "font-mono inline-block transition-colors duration-150 select-none",
            letter === " " ? "w-2 sm:w-3.5" : "",
            index > iterationCount.current
              ? "text-[#ffc490] font-medium"
              : "text-white font-bold"
          )}
        >
          {letter.toUpperCase()}
        </span>
      ))}
    </div>
  );
}
