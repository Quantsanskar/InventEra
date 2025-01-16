'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
export default function HeroSection() {
    const containerRef = useRef(null)
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

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
            <div className="absolute inset-0 bg-[#0a1128]">
                {/* Van Gogh Background */}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-[#1a365d]/80 via-[#1e3a8a]/70 to-[#0a1128]"
                    style={{
                        backgroundImage: `url(${encodeURI('/reference/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg')})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 100,
                        mixBlendMode: 'soft-light'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-transparent to-transparent opacity-70" />
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
                            <span className="relative z-10 bg-gradient-to-b from-[#ffd700] via-[#fff8c4] to-[#fff] bg-clip-text text-transparent">
                                The Nights
                            </span>
                        </span>
                    </motion.h1>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    variants={textVariants}
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    className="text-xl md:text-2xl text-center max-w-2xl mx-auto px-4 text-[#fff8c4]/90"
                >
                    Let's Build Something Amazing Together
                </motion.p>

            </motion.div>
        </section>
    )
}

