"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface GSAPTimelineOptions {
  trigger: React.RefObject<HTMLElement | null>;
  start?: string | number | (() => string | number);
  end?: string | number | (() => string | number);
  scrub?: boolean | number;
  pin?: boolean | HTMLElement | string;
  pinSpacing?: boolean | string;
  invalidateOnRefresh?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  onUpdate?: (self: ScrollTrigger) => void;
  markers?: boolean;
}

export const useGSAPTimeline = (
  options: GSAPTimelineOptions,
  buildTimeline: (tl: gsap.core.Timeline) => void,
  deps: any[] = []
): React.RefObject<gsap.core.Timeline | null> => {
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const triggerEl = options.trigger.current;
    if (!triggerEl) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: options.start || "top top",
        end: options.end || "bottom top",
        scrub: options.scrub !== undefined ? options.scrub : true,
        pin: options.pin || false,
        pinSpacing: options.pinSpacing !== undefined ? options.pinSpacing : true,
        invalidateOnRefresh: options.invalidateOnRefresh || false,
        onEnter: options.onEnter,
        onLeave: options.onLeave,
        onEnterBack: options.onEnterBack,
        onLeaveBack: options.onLeaveBack,
        onUpdate: options.onUpdate,
        markers: options.markers || false,
      },
    });

    tlRef.current = tl;
    buildTimeline(tl);

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === triggerEl) st.kill();
      });
    };
  }, deps);

  return tlRef;
};
