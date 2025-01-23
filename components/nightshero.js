'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Handshake, MoveRight, PhoneCall } from "lucide-react";
import { Button } from "./ui/button";

export default function HeroSection() {
    const containerRef = useRef(null)
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 900], [1, 0])

    const titleVariants = {
        hidden: {
            opacity: 0,
            y: 200,
            scale: 1.2,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 2,
                ease: [0.33, 1, 0.68, 1],
                opacity: { duration: 2.5 },
                scale: { duration: 2.2 }
            }
        }
    }

    const taglineVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 1.5,
                duration: 1.5,
                ease: [0.33, 1, 0.68, 1]
            }
        }
    }

    const backgroundVariants = {
        hidden: {
            opacity: 0.3,
            scale: 1.1
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 3,
                ease: "easeOut"
            }
        }
    }

    return (
        <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden">
            {/* Animated Background */}
            <motion.div
                variants={backgroundVariants}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 bg-[#0a1128]"
            >
                <div
                    className="absolute inset-0 bg-gradient-to-b from-[#1a365d]/80 via-[#1e3a8a]/70 to-[#0a1128]"
                    style={{
                        backgroundImage: `url(${encodeURI('/reference/NightsTree.png')})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 100,
                        // mixBlendMode: 'soft-light'
                    }}
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-transparent to-transparent"
                />
            </motion.div>

            {/* Content Container */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 w-full h-screen flex flex-col items-center justify-center"
            >
                {/* Main Title with Sunrise Animation */}
                <motion.div
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative mb-8"
                >
                    <h1 className="text-6xl md:text-9xl font-bold text-center">
                        <span className="relative inline-block">
                            <span className="relative z-10 text-[#F9F9F9] drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                                The Nights
                            </span>
                        </span>
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
                    animate="visible" className="flex flex-row gap-3">
                    <Button size="lg" className="gap-4 mt-[4rem] bg-gray-900 text-white" variant="outline" onClick={() => window.location.href = "https://www.commudle.com/communities/builders-space/events/the-nights-s1"}>
                        Join Us Now <Handshake className="w-4 h-4" />
                    </Button>
                </motion.div>



            </motion.div>
        </section>
    )
}