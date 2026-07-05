"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { SITE_CONTENT } from "../data/content";

interface SoulContextType {
  activeStageIndex: number;
  setActiveStageIndex: (index: number) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  cursorText: string | null;
  setCursorText: (text: string | null) => void;
  cursorColor: string;
  setCursorColor: (color: string) => void;
  scrollToStageIndex: (index: number) => void;
  registerScrollToStage: (fn: (index: number) => void) => void;
}

const SoulContext = createContext<SoulContextType | undefined>(undefined);

export const SoulProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [cursorColor, setCursorColor] = useState<string>(SITE_CONTENT.stages[0].accentColor);
  const [scrollToStageFn, setScrollToStageFn] = useState<((index: number) => void) | null>(null);

  const registerScrollToStage = useCallback((fn: (index: number) => void) => {
    setScrollToStageFn(() => fn);
  }, []);

  const scrollToStageIndex = useCallback((index: number) => {
    if (scrollToStageFn) {
      scrollToStageFn(index);
    }
  }, [scrollToStageFn]);

  return (
    <SoulContext.Provider
      value={{
        activeStageIndex,
        setActiveStageIndex,
        scrollProgress,
        setScrollProgress,
        isLoaded,
        setIsLoaded,
        isMuted,
        setIsMuted,
        cursorText,
        setCursorText,
        cursorColor,
        setCursorColor,
        scrollToStageIndex,
        registerScrollToStage,
      }}
    >
      {children}
    </SoulContext.Provider>
  );
};

export const useSoul = (): SoulContextType => {
  const context = useContext(SoulContext);
  if (!context) {
    throw new Error("useSoul must be used within a SoulProvider");
  }
  return context;
};
