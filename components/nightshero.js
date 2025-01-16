'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import StarryCanvas from "./StarryCanvas"

export default function HeroSection() {
    const containerRef = useRef(null)
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    // Text animation variants
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 1,
                ease: [0.33, 1, 0.68, 1]
            }
        })
    }

    return (
        <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-black">
                <StarryCanvas />
                <div
                    className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-blue-900/20 to-black/90"
                    style={{
                        backgroundImage: `url(${encodeURI('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6g5XeDcrJOrrcOzWyAZ6rVfsaMGgl8.png')})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.3,
                        mixBlendMode: 'soft-light'
                    }}
                />
            </div>

            {/* Content Container */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 w-full h-screen flex flex-col items-center justify-center"
            >
                {/* Main Title */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="relative mb-8"
                >
                    <motion.h1
                        variants={textVariants}
                        custom={0}
                        className="text-6xl md:text-9xl font-bold text-center"
                    >
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-gradient-to-b from-white via-white to-purple-200 bg-clip-text text-transparent">
                                The Nights
                            </span>
                            <span className="absolute inset-0 animate-pulse blur-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-30" />
                        </span>
                    </motion.h1>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    variants={textVariants}
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    className="text-xl md:text-2xl text-center max-w-2xl mx-auto px-4 text-purple-100/90"
                >
                    Where your skills illuminate the darkness and your knowledge shapes the future
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    variants={textVariants}
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    className="mt-12"
                >
                    <button className="group relative px-8 py-3 text-lg font-medium">
                        <span className="relative z-10 text-white">
                            Begin Your Journey
                        </span>
                        <div className="absolute inset-0 transform -skew-x-12 bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105" />
                        <div className="absolute inset-0 transform -skew-x-12 bg-gradient-to-r from-purple-600 to-blue-600 blur-xl opacity-50 transition-all duration-300 group-hover:opacity-75" />
                    </button>
                </motion.div>

                {/* Floating Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-purple-400 rounded-full"
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.5, 1, 0.5],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                duration: 3,
                                delay: i * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{
                                left: `${30 + i * 20}%`,
                                top: '40%'
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

