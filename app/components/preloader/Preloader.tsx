"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useSoul } from "../../context/SoulContext";
import { SpiralAnimation } from "../ui/spiral-animation";

export const Preloader: React.FC = () => {
  const { isLoaded, setIsLoaded } = useSoul();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [startVisible, setStartVisible] = useState(false);

  // Fade in the start button after animation loads
  useEffect(() => {
    if (isLoaded) return;
    
    const timer = setTimeout(() => {
      setStartVisible(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [isLoaded]);

  const handleEnterClick = () => {
    if (rootRef.current) {
      gsap.to(rootRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => setIsLoaded(true),
      });
    } else {
      setIsLoaded(true);
    }
  };

  if (isLoaded) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 w-full h-full overflow-hidden bg-[#1d1d1d] z-[100]"
      role="status"
      aria-label="Loading"
    >
      {/* Spiral Animation */}
      <div className="absolute inset-0">
        <SpiralAnimation />
      </div>
      
      {/* Simple Elegant Text Button with Pulsing Effect */}
      <div 
        className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 z-10
          transition-all duration-1500 ease-out
          ${startVisible ? 'translate-y-[-50%]' : 'translate-y-0'}
        `}
        style={{ 
          opacity: startVisible ? 1 : 0,
          pointerEvents: startVisible ? 'auto' : 'none'
        }}
      >
        <button 
          onClick={handleEnterClick}
          className="
            bg-transparent border-none outline-none appearance-none cursor-pointer
            text-[#f5f0e8] text-2xl tracking-[0.2em] uppercase font-extralight
            transition-all duration-700
            hover:tracking-[0.3em] hover:text-[#ffd890] hover:drop-shadow-[0_0_12px_rgba(255,216,144,0.6)] animate-pulse
          "
        >
          Enter
        </button>
      </div>
    </div>
  );
};
