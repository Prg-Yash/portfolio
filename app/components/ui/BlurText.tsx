"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";

export interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, any>;
  animationTo?: Record<string, any>;
  easing?: any;
  onAnimationComplete?: () => void;
  stepDuration?: number;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  delay = 120,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = [0.25, 0.4, 0.25, 1],
  onAnimationComplete,
  stepDuration = 0.5,
}) => {
  const elements = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy]
  );

  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Immediate fallback trigger so text is 100% guaranteed to animate and never stay hidden
    const timer = setTimeout(() => setInView(true), 20);

    if (!ref.current) return () => clearTimeout(timer);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () => ({
      filter: "blur(12px)",
      opacity: 0,
      y: direction === "top" ? -40 : 40,
    }),
    [direction]
  );

  const defaultTo = useMemo(
    () => ({
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
    }),
    []
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshot = animationTo ?? defaultTo;

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {elements.map((segment, index) => {
        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={inView ? toSnapshot : fromSnapshot}
            transition={{
              duration: stepDuration,
              delay: (index * delay) / 1000,
              ease: easing,
            }}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </span>
  );
};

export default BlurText;
