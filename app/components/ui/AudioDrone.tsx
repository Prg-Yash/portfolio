"use client";

import React, { useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useSoul } from "../../context/SoulContext";

export const AudioDrone: React.FC = () => {
  const { isMuted, setIsMuted, isLoaded } = useSoul();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  // Initialize Web Audio API drone synth
  const startDrone = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create an ethereal chord (D minor / space drone: 58.27Hz A#1 / D2 / A2 / F3)
      const freqs = [73.42, 110.0, 146.83, 220.0, 329.63];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        
        // Use sine and triangle waves for smooth ethereal warmth
        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Slight detune for organic chorus effect
        osc.detune.setValueAtTime((idx - 2) * 5, ctx.currentTime);

        // Lower frequencies louder, higher frequencies softer
        const vol = 1 / (idx + 1) * 0.4;
        oscGain.gain.setValueAtTime(vol, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        oscs.push(osc);
      });

      oscillatorsRef.current = oscs;
    } catch (e) {
      console.warn("Web Audio API not supported or blocked:", e);
    }
  };

  const stopDrone = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1);
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => osc.stop());
        oscillatorsRef.current = [];
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
          audioCtxRef.current = null;
        }
      }, 1000);
    }
  };

  useEffect(() => {
    if (!isLoaded) return;

    if (!isMuted) {
      startDrone();
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    } else {
      stopDrone();
    }

    return () => {
      // Cleanup on unmount
    };
  }, [isMuted, isLoaded]);

  if (!isLoaded) return null;

  return (
    <div className="fixed top-6 right-6 z-40 flex items-center gap-3">
      <button
        onClick={() => setIsMuted((prev) => !prev)}
        className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:scale-105 active:scale-95"
        aria-label={isMuted ? "Unmute ambient audio" : "Mute ambient audio"}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4 text-white/50 transition-colors group-hover:text-white" />
        ) : (
          <Volume2 className="h-4 w-4 text-white animate-pulse" />
        )}
      </button>
      <span className="hidden text-[10px] tracking-[0.3em] font-mono uppercase text-white/40 md:inline-block">
        {isMuted ? "SOUND OFF" : "AMBIENT DRONE"}
      </span>
    </div>
  );
};
