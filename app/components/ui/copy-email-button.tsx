"use client";

import { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import { cn } from "../../../lib/utils";

interface CopyEmailButtonProps {
  email: string;
  className?: string;
}

export function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [progress, setProgress] = useState(0);
  const duration = 2500; // Adjusted duration to feel snappy but give enough time

  useEffect(() => {
    if (copied) {
      // Delay showing confirmation to allow blur-out animation
      const showTimer = setTimeout(() => {
        setShowConfirmation(true);
      }, 400);

      setProgress(0);
      const startTime = Date.now();
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);
        
        if (elapsed >= duration) {
          clearInterval(interval);
          setShowConfirmation(false);
          setTimeout(() => {
            setCopied(false);
            setProgress(0);
          }, 400);
        }
      }, 16);

      return () => {
        clearInterval(interval);
        clearTimeout(showTimer);
      };
    }
  }, [copied]);

  const handleCopy = async () => {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(email);
    } catch (err) {
      // Fallback for when Clipboard API is blocked
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopied(true);
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={cn(
        "group relative overflow-hidden flex items-center justify-center rounded-full w-full",
        "border border-white/15 bg-black/40 hover:border-[#ffd890]/40",
        "transition-all duration-500 cursor-pointer outline-none",
        "px-4 sm:px-6 py-3 sm:py-4 min-h-[56px]",
        className
      )}
    >
      {/* Progress background */}
      <div 
        className="absolute left-0 top-0 bottom-0 bg-[#ffc490]/20"
        style={{ 
          width: `${progress}%`,
          opacity: copied ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      
      {/* Original content - Email and Copy Text/Icon */}
      <div 
        className="absolute inset-0 flex items-center justify-between px-4 sm:px-6"
        style={{
          opacity: copied ? 0 : 1,
          filter: copied ? 'blur(8px)' : 'blur(0px)',
          transform: copied ? 'scale(0.95)' : 'scale(1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: copied ? 'none' : 'auto',
          zIndex: copied ? 0 : 20,
        }}
      >
        <span className="truncate mr-4 font-mono font-bold tracking-[0.2em] uppercase text-[11px] sm:text-xs text-[#ffd890] transition-colors group-hover:text-white">
          {email}
        </span>
        <span className="flex items-center gap-2 text-xs tracking-[0.2em] shrink-0 text-white/60 transition-colors group-hover:text-[#ffd890]">
          <Copy className="h-4 w-4" />
          <span className="hidden sm:inline">COPY</span>
        </span>
      </div>

      {/* Confirmation content - Code Copied! */}
      <div 
        className="relative flex items-center gap-3"
        style={{
          opacity: showConfirmation ? 1 : 0,
          filter: showConfirmation ? 'blur(0px)' : 'blur(8px)',
          transform: showConfirmation ? 'scale(1)' : 'scale(1.05)',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#ffd890] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,216,144,0.4)]">
          <svg 
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M5 13l4 4L19 7"
              style={{
                strokeDasharray: 24,
                strokeDashoffset: showConfirmation ? 0 : 24,
                transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
              }}
            />
          </svg>
        </div>
        <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#ffd890]">
          COPIED TO CLIPBOARD
        </span>
      </div>
    </button>
  );
}
