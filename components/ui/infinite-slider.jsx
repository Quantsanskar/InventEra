"use client"
import { cn } from "@/lib/utils"
import { useMotionValue, animate, motion, useAnimationControls } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import useMeasure from "react-use-measure"

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 100, // Increased default duration to slow down movement
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}) {
  const [ref, { width, height }] = useMeasure()
  const translation = useMotionValue(0)
  const animationRef = useRef(null)
  const controls = useAnimationControls()
  const [contentSize, setContentSize] = useState(0)

  // Calculate content size once dimensions are available
  useEffect(() => {
    const size = direction === "horizontal" ? width : height
    if (size > 0) {
      setContentSize(size + gap)
    }
  }, [width, height, gap, direction])

  // Handle animation
  useEffect(() => {
    if (contentSize === 0) return

    const from = reverse ? -contentSize : 0
    const to = reverse ? 0 : -contentSize

    // Clear any existing animation
    if (animationRef.current) {
      animationRef.current.stop()
    }

    // Start a new smooth animation
    animationRef.current = animate(translation, [from, to], {
      ease: "linear",
      duration: duration,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      repeatDelay: 0,
    })

    return () => {
      if (animationRef.current) {
        animationRef.current.stop()
      }
    }
  }, [translation, duration, contentSize, reverse])

  // Handle hover speed change
  const handleHoverStart = () => {
    if (!durationOnHover || !animationRef.current) return

    const currentPosition = translation.get()
    animationRef.current.stop()

    const from = reverse ? -contentSize : 0
    const to = reverse ? 0 : -contentSize
    const progress = Math.abs((currentPosition - from) / (to - from))
    const startPosition = from + progress * (to - from)

    animationRef.current = animate(translation, [startPosition, to], {
      ease: "linear",
      duration: durationOnHover * (1 - progress),
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      repeatDelay: 0,
    })
  }

  const handleHoverEnd = () => {
    if (!durationOnHover || !animationRef.current) return

    const currentPosition = translation.get()
    animationRef.current.stop()

    const from = reverse ? -contentSize : 0
    const to = reverse ? 0 : -contentSize
    const progress = Math.abs((currentPosition - from) / (to - from))
    const startPosition = from + progress * (to - from)

    animationRef.current = animate(translation, [startPosition, to], {
      ease: "linear",
      duration: duration * (1 - progress),
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      repeatDelay: 0,
    })
  }

  const hoverProps = durationOnHover
    ? {
        onHoverStart: handleHoverStart,
        onHoverEnd: handleHoverEnd,
      }
    : {}

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === "horizontal" ? { x: translation } : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
          willChange: "transform", // Optimize for animations
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}

