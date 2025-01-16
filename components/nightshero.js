'use client'

import { motion } from "framer-motion"
import SparklesCore from "./SparklesCore"

export default function HeroSection() {
    return (
        <section className="relative w-full min-h-screen overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div
                className="absolute inset-0 w-full h-full bg-cover opacity-50 bg-center z-0"
                style={{
                    backgroundImage: `url('/reference/wp14028114-alone-at-night-wallpapers.jpg')`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-purple-800/30 to-black/80 mix-blend-multiply" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center">
                {/* Main Heading with Rise Animation */}
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                        duration: 1.5,
                        ease: [0.33, 1, 0.68, 1],
                    }}
                    className="relative"
                >
                    <h1 className="text-5xl md:text-8xl font-bold text-center leading-tight">
                        <span className="bg-gradient-to-r from-purple-400 via-purple-200 to-white bg-clip-text text-transparent">
                            The Nights
                        </span>


                    </h1>

                </motion.div>

                {/* Sparkles Effect */}
                {/* <div className="w-full h-40 relative mt-8">
                    <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={1}
                        particleDensity={1200}
                        className="w-full h-full"
                        particleColor="#FFF"
                    />
                </div> */}

                {/* Subtitle with Fade In Animation */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        delay: 1,
                        ease: "easeOut"
                    }}
                    className="text-2xl md:text-3xl text-white/90 text-center mt-8 max-w-3xl mx-auto px-4"
                >
                    Let&apos;s build something amazing together!
                </motion.h2>

                {/* Additional Gradient Lines */}
                <div className="absolute inset-x-20 top-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-1/2 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-1/2 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-px w-1/4" />
            </div>
        </section>
    )
}

