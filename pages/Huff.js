"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Create the magical sparkle effect
    const createSparkle = () => {
      const sparkle = document.createElement("div")
      sparkle.className = "absolute w-1 h-1 bg-yellow-300/40 rounded-full"
      sparkle.style.left = `${Math.random() * 100}%`
      sparkle.style.top = `${Math.random() * 100}%`
      sparkle.style.animation = `sparkleFloat ${Math.random() * 3 + 2}s linear forwards`
      document.getElementById("sparkle-container")?.appendChild(sparkle)

      setTimeout(() => sparkle.remove(), 5000)
    }

    const interval = setInterval(() => {
      for (let i = 0; i < 3; i++) {
        createSparkle()
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#1a1a1a]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-yellow-900/20" />

      {/* Animated Background Image */}
      <div className="absolute inset-0">
        <img
          src="/gifs/Huff2.gif"
          alt="Background GIF"
          className="object-cover w-full h-full opacity-60 scale-105 transform transition-transform duration-[20s] hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Magical Sparkles Container */}
      <div id="sparkle-container" className="absolute inset-0 overflow-hidden pointer-events-none" />

      {/* Ambient Light Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: "6s" }}
        />
      </div>

      {/* Main Content */}
      <AnimatePresence>
        {mounted && (
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-center space-y-8"
            >
              {/* Decorative Top Element */}
              {/* <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-6"
              >
                <Sparkles className="w-8 h-8 text-yellow-300/70 mx-auto animate-pulse" />
              </motion.div> */}

              {/* Main Heading */}
              <motion.h1
                className="text-6xl md:text-8xl font-bold tracking-wider"
                style={{
                  background: "linear-gradient(to right, #FFD700, #FFA500)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 30px rgba(255, 215, 0, 0.3)",
                }}
              >
                Welcome To HufflePuff
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light"
                style={{
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                }}
              >
                Showcase your creativity and connect with fellow HufflePuffs.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-12"
              >
                {/* <button className="group relative px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-medium text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:from-yellow-500 hover:to-yellow-700">
                  <span className="relative z-10">Join the Magic</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                </button> */}
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
                @keyframes sparkleFloat {
                    0% {
                        transform: translateY(0) scale(0);
                        opacity: 0;
                    }
                    50% {
                        transform: translateY(-100px) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-200px) scale(0);
                        opacity: 0;
                    }
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
            `}</style>
    </div>
  )
}

