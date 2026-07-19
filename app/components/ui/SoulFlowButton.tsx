'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../../lib/utils';

type FlowVariant = 'gold' | 'cream' | 'dark';

interface SoulFlowButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  href?: string;
  target?: string;
  rel?: string;
  variant?: FlowVariant;
  className?: string;
  as?: 'button' | 'a';
  type?: 'button' | 'submit';
}

// Which color the circle fill uses, and what text/arrow color becomes after fill
const VARIANT: Record<FlowVariant, { bg: string; onFill: string; arrowColor: string }> = {
  gold:  { bg: 'bg-[#ffc490]', onFill: 'text-black',         arrowColor: 'stroke-[#ffc490]' },
  cream: { bg: 'bg-[#f5f0e8]', onFill: 'text-black',         arrowColor: 'stroke-[#f5f0e8]' },
  dark:  { bg: 'bg-[#2a2520]', onFill: 'text-[#ffc490]',     arrowColor: 'stroke-[#888]' },
};

export const SoulFlowButton = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  SoulFlowButtonProps
>(({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  href,
  target,
  rel,
  variant = 'gold',
  className,
  as = 'button',
  type = 'button',
}, ref) => {
  const { bg, onFill, arrowColor } = VARIANT[variant];

  const baseClass = cn(
    // CRITICAL: overflow-hidden must clip the expanding circle
    'group relative inline-flex items-center justify-center gap-2',
    'overflow-hidden',
    // Always keep rounded-full — never change on hover (that causes the rectangle glitch)
    'rounded-full',
    // Border
    'border border-white/20',
    // Background stays transparent — circle handles the fill
    'bg-transparent',
    // Spacing
    'px-8 py-3.5',
    // Typography
    'font-mono text-[11px] tracking-[0.25em] uppercase',
    // Default text
    'text-white/70',
    // Transition for border/shadow only
    'transition-colors duration-500 cursor-pointer',
    // Hover: just the border glows — no bg change, no shape change
    'hover:border-[#ffc490]/40',
    // Active
    'active:scale-[0.97]',
    className
  );

  const inner = (
    <>
      {/* ── Left arrow — flies in from the left on hover ── */}
      <ArrowRight className={cn(
        'absolute w-3.5 h-3.5 z-10 fill-none transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]',
        'left-[-20%] opacity-0 group-hover:left-3.5 group-hover:opacity-100',
        arrowColor,
        // After fill, arrow needs to contrast
        'group-hover:stroke-current',
        onFill.includes('black') ? 'group-hover:text-black' : 'group-hover:text-[#ffc490]',
      )} />

      {/* ── Label — shifts right on hover to make room for arrow ── */}
      <span className={cn(
        'relative z-10',
        'transition-all duration-[700ms] ease-out',
        'translate-x-0 group-hover:translate-x-2',
        // Text color flips after fill
        `group-hover:${onFill}`,
      )}>
        {children}
      </span>

      {/* ── Expanding fill circle ── */}
      <span className={cn(
        'pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'w-1 h-1 rounded-full opacity-0',
        // Expand to cover the button — clipped by overflow-hidden on the pill
        'group-hover:w-[400px] group-hover:h-[400px] group-hover:opacity-100',
        'transition-all duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)]',
        bg,
      )} />

      {/* ── Right arrow — flies out to the right on hover ── */}
      <ArrowRight className={cn(
        'absolute w-3.5 h-3.5 z-10 fill-none transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]',
        'right-3.5 opacity-100 group-hover:right-[-20%] group-hover:opacity-0',
        arrowColor,
      )} />
    </>
  );

  if (as === 'a') {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={baseClass}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        onMouseEnter={onMouseEnter as React.MouseEventHandler<HTMLAnchorElement>}
        onMouseLeave={onMouseLeave as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      className={baseClass}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      onMouseEnter={onMouseEnter as React.MouseEventHandler<HTMLButtonElement>}
      onMouseLeave={onMouseLeave as React.MouseEventHandler<HTMLButtonElement>}
    >
      {inner}
    </button>
  );
});

SoulFlowButton.displayName = 'SoulFlowButton';
