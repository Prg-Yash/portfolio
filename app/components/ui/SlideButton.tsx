"use client"

import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
  type JSX,
} from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion"
import { Check, Loader2, SendHorizontal, X, Sparkles } from "lucide-react"

import { cn } from "../../../lib/utils"

const TRACK_WIDTH = 280; // 280px
const THUMB_SIZE = 48; // 48px (h-12 w-12)
const PADDING = 4; // 4px padding matches left-1
const MAX_DRAG = TRACK_WIDTH - THUMB_SIZE - PADDING;
const DRAG_CONSTRAINTS = { left: 0, right: MAX_DRAG }
const DRAG_THRESHOLD = 0.85

const BUTTON_STATES = {
  initial: { width: `${TRACK_WIDTH}px` },
  completed: { width: `${TRACK_WIDTH}px` }, // Keep it full width for contact form
}

const ANIMATION_CONFIG = {
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 0.8,
  },
}

type StatusIconProps = {
  status: "idle" | "loading" | "success" | "error"
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  const iconMap: Record<StatusIconProps["status"], JSX.Element | null> = useMemo(
    () => ({
      idle: null,
      loading: <Loader2 className="animate-spin text-[#ffd890]" size={24} />,
      success: <Check size={24} className="text-[#ffd890]" />,
      error: <X size={24} className="text-red-400" />,
    }),
    []
  )

  if (!iconMap[status]) return null

  return (
    <motion.div
      key={status} // Change key based on status to trigger animation properly
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-3"
    >
      {iconMap[status]}
      {status === "loading" && <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#ffd890]">TRANSMITTING...</span>}
      {status === "success" && <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#ffd890]">SIGNAL RECEIVED</span>}
      {status === "error" && <span className="font-mono text-xs font-bold tracking-[0.2em] text-red-400">FAILED</span>}
    </motion.div>
  )
}

interface SlideButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  status: "idle" | "loading" | "success" | "error";
  onComplete: () => void;
  resetKey?: string | number;
}

export const SlideButton = forwardRef<HTMLButtonElement, SlideButtonProps>(
  ({ className, status, onComplete, resetKey, ...props }, ref) => {
    const [isDragging, setIsDragging] = useState(false)
    const [completed, setCompleted] = useState(false)
    const dragHandleRef = useRef<HTMLDivElement | null>(null)

    const dragX = useMotionValue(0)
    const springX = useSpring(dragX, ANIMATION_CONFIG.spring)
    const dragProgress = useTransform(
      springX,
      [0, DRAG_CONSTRAINTS.right],
      [0, 1]
    )

    // Handle reset
    useEffect(() => {
      if (status === "idle") {
        setCompleted(false);
        dragX.set(0);
      }
    }, [status, resetKey, dragX]);

    const handleDragStart = useCallback(() => {
      if (completed || status !== "idle") return
      setIsDragging(true)
    }, [completed, status])

    const handleDragEnd = () => {
      if (completed || status !== "idle") return
      setIsDragging(false)

      const progress = dragProgress.get()
      if (progress >= DRAG_THRESHOLD) {
        setCompleted(true)
        // Complete the slide visually to the end
        dragX.set(DRAG_CONSTRAINTS.right)
        onComplete()
      } else {
        dragX.set(0)
      }
    }

    const handleDrag = (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      if (completed || status !== "idle") return
      const newX = Math.max(0, Math.min(info.offset.x, DRAG_CONSTRAINTS.right))
      dragX.set(newX)
    }

    const handleThumbClick = () => {
      // If it's currently dragging, don't trigger click behavior
      if (completed || status !== "idle" || isDragging) return;
      
      // Visually slide the thumb to the right
      dragX.set(DRAG_CONSTRAINTS.right);
      
      // Wait for the spring animation to complete before changing state
      setTimeout(() => {
        setCompleted(true);
        onComplete();
      }, 350); // 350ms perfectly matches the spring timing
    }

    const adjustedWidth = useTransform(springX, (x) => x + THUMB_SIZE + PADDING)
    const textOpacity = useTransform(springX, [0, DRAG_CONSTRAINTS.right / 2], [1, 0])

    return (
      <motion.div
        animate={completed ? BUTTON_STATES.completed : BUTTON_STATES.initial}
        transition={ANIMATION_CONFIG.spring}
        className={cn(
          "relative flex h-14 items-center rounded-full border border-white/20 bg-black/40 overflow-hidden shadow-inner",
          className
        )}
      >
        {/* Background Fill */}
        {!completed && (
          <motion.div
            style={{ width: adjustedWidth }}
            className="absolute inset-y-0 left-0 z-0 bg-[#ffd890]/20 backdrop-blur-sm rounded-full"
          />
        )}

        {/* Text Prompt */}
        {!completed && (
          <motion.div
            style={{ opacity: textOpacity }}
            className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none pl-10"
          >
            <span className="font-mono text-[10px] sm:text-xs font-medium tracking-[0.25em] text-[#f5f0e8]/80 uppercase">
              SLIDE TO TRANSMIT
            </span>
          </motion.div>
        )}

        {/* Draggable Thumb */}
        <AnimatePresence key="draggable-thumb">
          {!completed && (
            <motion.div
              ref={dragHandleRef}
              drag="x"
              dragConstraints={DRAG_CONSTRAINTS}
              dragElastic={0.05}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrag={handleDrag}
              style={{ x: springX }}
              className="absolute left-1 z-10 flex !cursor-pointer items-center justify-center"
            >
              <button
                ref={ref}
                type="button"
                disabled={status !== "idle"}
                onClick={handleThumbClick}
                {...props}
                className={cn(
                  "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#ffd890] text-black shadow-[0_0_15px_rgba(255,216,144,0.3)] transition-transform",
                  isDragging && "scale-105 shadow-[0_0_25px_rgba(255,216,144,0.5)]"
                )}
              >
                <SendHorizontal className="size-5 translate-x-[2px]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completed State (Loading / Success / Error) */}
        <AnimatePresence key="completed-state">
          {completed && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm border border-[#ffd890]/30 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnimatePresence mode="wait">
                <StatusIcon status={status} />
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }
)

SlideButton.displayName = "SlideButton"