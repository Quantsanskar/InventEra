"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { Handshake, MoveRight, ChevronDown, Star } from "lucide-react"
import { Button } from "./ui/button"

const HeroSection = () => {
  const containerRef = useRef(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 900], [1, 0])
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const springConfig = { stiffness: 1000, damping: 100 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const titleVariants = {
    hidden: { opacity: 0, y: 200, scale: 1.2 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 2,
        ease: [0.33, 1, 0.68, 1],
        opacity: { duration: 2.5 },
        scale: { duration: 2.2 },
      },
    },
  }

  const taglineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5,
        duration: 1.5,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  }

  const backgroundVariants = {
    hidden: { opacity: 0.3, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 3, ease: "easeOut" },
    },
  }

  const floatingStarsVariants = {
    animate: (i) => ({
      y: [0, -10, 0],
      x: [0, i * 5, 0],
      transition: {
        duration: 8 + i * 2, // Increased from 4 + i to 8 + i * 2
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    }),
  }

  return (
    <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-[#0a1128]">
      {/* Animated Background */}
      <motion.div variants={backgroundVariants} initial="hidden" animate="visible" className="absolute inset-0">
        <motion.div
          animate={{
            backgroundPosition: `${mousePosition.x * 0.005}px ${mousePosition.y * 0.005}px`,
          }}
          className="absolute inset-0 bg-gradient-to-b from-[#1a365d]/80 via-[#1e3a8a]/70 to-[#0a1128]"
          style={{
            backgroundImage: `url(${encodeURI("/reference/NightsTree.png")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 100,
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-transparent to-transparent"
        />
      </motion.div>

      {/* Floating Stars */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={floatingStarsVariants}
            animate="animate"
            style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <Star size={Math.random() * 10 + 5} color="#fff" fill="#fff" opacity={Math.random() * 0.7 + 0.3} />
          </motion.div>
        ))}
      </motion.div>

      {/* Content Container */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full h-screen flex flex-col items-center justify-center"
      >
        {/* Main Title with Sunrise Animation */}
        <motion.div variants={titleVariants} initial="hidden" animate="visible" className="relative mb-8">
          <h1 className="font-bold text-5xl md:text-8xl lg:text-9xl xl:text-10xl 2xl:text-11xl 3xl:text-12xl text-center">
            {["T", "H", "E", " ", "N", "I", "G", "H", "T", "S"].map((letter, index) => (
              <motion.span
                key={index}
                className="text-[#A2D2FF] drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] inline-block"
                whileHover={{
                  scale: 1.2,
                  rotate: Math.random() * 20 - 10,
                  transition: { duration: 0.3 },
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Animated Tagline */}
        <motion.p
          variants={taglineVariants}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl text-center max-w-2xl mx-auto px-4 text-[#fff8c4]/90"
        >
          Let's Build Something Amazing Together
        </motion.p>

        <motion.div
          variants={taglineVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-3 mt-8"
        >
          <Button
            size="lg"
            className="gap-4 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300"
            variant="outline"
            onClick={() =>
              (window.location.href = "https://www.commudle.com/communities/builders-space/events/the-nights-s1")
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Join Us Now
            <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
              <Handshake className="w-4 h-4" />
            </motion.div>
          </Button>
          <Button
            size="lg"
            className="gap-4 bg-transparent text-white border-white hover:bg-white hover:text-gray-900 transition-all duration-300"
            variant="outline"
            onClick={() =>
              (window.location.href = "https://www.commudle.com/communities/builders-space")
            }
          >
            Learn More <MoveRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <p className="text-sm mb-2">Scroll to explore</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-4" />
        </motion.div>
      </motion.div>

      {/* Custom Cursor */}
      <motion.div
        className="fixed w-6 h-6 rounded-full border-2 border-white pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      />
    </section>
  )
}

export default HeroSection

