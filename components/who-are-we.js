'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion'
import { ParticleEffect } from './particles'
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
const WhoAreWe = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const controls = useAnimation()

    useEffect(() => {
        if (isInView) {
            controls.start('visible')
        }
    }, [isInView, controls])

    const scrollVariants = {
        hidden: {
            scale: 0.9,
            opacity: 0,
            rotateX: 60,
            transformOrigin: 'top right',
            filter: 'blur(10px)'
        },
        visible: {
            scale: 1,
            opacity: 1,
            rotateX: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 1.4,
                ease: [0.25, 0.1, 0.25, 1],
                staggerChildren: 0.15
            }
        }
    }

    const contentVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            filter: 'blur(5px)'
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={scrollVariants}
            className="relative min-h-screen w-full max-w-6xl mx-auto rounded-lg overflow-hidden"
            style={{
                background: `
                    linear-gradient(45deg, rgba(10,10,15,1) 0%, rgba(17,17,22,0.98) 25%, rgba(22,22,29,0.95) 50%, rgba(25,25,35,0.98) 75%, rgba(30,30,45,1) 100%),
                    linear-gradient(135deg, rgba(20,20,30,0.9) 0%, rgba(25,25,40,0.8) 50%, rgba(30,30,50,0.9) 100%),
                    linear-gradient(225deg, rgba(15,15,25,0.95) 0%, rgba(20,20,35,0.9) 50%, rgba(25,25,45,0.95) 100%),
                    radial-gradient(circle at 50% 50%, rgba(40,40,60,0.5) 0%, rgba(20,20,30,0.7) 100%),
                    conic-gradient(from 45deg at 50% 50%, rgba(60,60,90,0.2) 0%, rgba(30,30,45,0.2) 25%, rgba(40,40,60,0.2) 50%, rgba(30,30,45,0.2) 75%, rgba(60,60,90,0.2) 100%)
                `
            }}
        >
            <ParticleEffect />

            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-lg"
                style={{
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
                    filter: 'blur(1px)',
                    animation: 'borderGlow 8s ease-in-out infinite'
                }}
            />

            {/* Responsive Image and SVG Container */}
            <div className="flex flex-row justify-center items-center gap-4 px-4 w-full mb-8 mt-4 flex-wrap lg:flex-nowrap">



                {/* Who Are We Image */}
                <div className="w-full lg:w-1/2 max-w-[300px] lg:max-w-[400px]">
                    <CardContainer className="inter-var">
                        <CardBody>
                            <CardItem translateZ="100" className="w-full flex flex-row lg:gap-60">
                                <Image
                                    src="/reference/WHO ARE WE.png"
                                    height="400"
                                    width="400"
                                    className="max-w-[95%] ml-2 sm:max-w-[85%] sm:ml-4 md:max-w-[75%] md:ml-[-40px] lg:max-w-[65%] lg:ml-[-160px] xl:max-w-[60%] xl:ml-[-240px] 2xl:max-w-[55%] 2xl:ml-[-320px] h-auto object-contain rounded-xl group-hover/card:shadow-xl"
                                    alt="Who Are We?"
                                />
                                <Image
                                    src="/reference/_.png"
                                    height="400"
                                    width="400"
                                    className="max-w-[60%] lg:ml-[-280px] max-h-[200px] ml-[-60px] mt-[200px] lg:mt-[100px] object-contain rounded-xl group-hover/card:shadow-xl"
                                    alt="Who Are We?"
                                />


                            </CardItem>
                        </CardBody>
                    </CardContainer>
                </div>


            </div>


            {/* Enhanced Content Section with Glass Effect */}
            <motion.div
                variants={contentVariants}
                className="relative max-w-4xl mx-auto px-8 pb-16 text-white mt-[-60px] z-10"
            >
                <motion.div
                    className="space-y-8  p-8 rounded-2xl bg-transparent"

                >
                    {/* Title Section with enhanced styling */}
                    <motion.div
                        variants={contentVariants}
                        className="mb-12 lg:mt-20"

                    >
                        <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                            The Nights: Season One

                        </h2>
                        <p className="text-xl text-gray-200/90">
                            A 3-week rollercoaster of creativity, code, and connections
                        </p>
                    </motion.div>

                    {/* Program Overview with enhanced styling */}
                    <motion.div
                        variants={contentVariants}
                        className="transform hover:scale-[1.02] transition-all duration-300 p-4 rounded-xl "

                    >
                        <h3 className="text-2xl font-semibold mb-3 text-white/90"> Program Overview</h3>
                        <p className="text-gray-200/90">
                            Welcome to the coolest way to kick off 2024!
                            The Nights: Season One is a one-of-a-kind 3-week program where creators, developers, artists, and innovators come together to learn, build, and show off their awesomeness. Think of it as a mashup of work, fun, and "look what I made!" moments.

                        </p>
                    </motion.div>

                    {/* What We Offer with enhanced styling */}
                    <motion.div
                        variants={contentVariants}
                        className="transform hover:scale-[1.02] transition-all duration-300 p-4 rounded-xl "

                    >
                        <h3 className="text-2xl font-semibold mb-3 text-white/90">What We Offer</h3>
                        <div className="space-y-8 text-gray-200/90">
                            {/* Workshops */}
                            <motion.div
                                className="space-y-2"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h4 className="text-lg font-semibold text-white/90">Workshops that won't put you to sleep</h4>
                                <p className="text-sm">Hands-on sessions to sharpen your skills.</p>
                            </motion.div>

                            {/* Speaker Labs */}
                            <motion.div
                                className="space-y-2"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h4 className="text-lg font-semibold text-white/90">Speaker Labs</h4>
                                <p className="text-sm">Talks by people who know their stuff and will inspire you to create better.</p>
                            </motion.div>

                            {/* Build Challenges */}
                            <motion.div
                                className="space-y-2"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h4 className="text-lg font-semibold text-white/90">Build Challenges</h4>
                                <p className="text-sm">Think hackathons, but cooler.</p>
                            </motion.div>

                            {/* Networking */}
                            <motion.div
                                className="space-y-2"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h4 className="text-lg font-semibold text-white/90">Networking</h4>
                                <p className="text-sm">Meet people who are just as passionate (or nerdy) as you!</p>
                            </motion.div>

                            {/* The Plan */}
                            <motion.div
                                className="space-y-4 mt-8 pt-8 border-t border-white/10"
                            >
                                <h4 className="text-xl font-semibold text-white/90">The Plan</h4>
                                <div className="space-y-4">
                                    <div>
                                        <h5 className="text-lg font-medium text-white/90">3 Weeks of Virtual Magic</h5>
                                        <p className="text-sm">From the comfort of your couch, desk, or wherever you vibe best.</p>
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-medium text-white/90">The Grand Finale: Offline Demo Day</h5>
                                        <p className="text-sm">A real-world gathering to showcase what you've built and cheer for others.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Important Details with enhanced styling */}
                    <motion.div
                        variants={contentVariants}
                        className="transform hover:scale-[1.02] transition-all duration-300 p-4 rounded-xl"

                    >
                        <h3 className="text-2xl font-semibold mb-3 text-white/90"> Important Details</h3>
                        <ul className="space-y-2 text-gray-200/90">
                            <motion.li className="transition-transform">
                                Start Date: March 15th, 2025
                            </motion.li>
                            <motion.li className="transition-transform">
                                Format: Virtual (3 weeks) + Offline Demo Day (get ready to shine in person!)

                            </motion.li>
                            <motion.li className="transition-transform">
                                Contact: buildersspace9@gmail.com
                            </motion.li>
                        </ul>
                    </motion.div>

                    {/* Quote with enhanced styling */}
                    <motion.div
                        variants={contentVariants}
                        className="pt-6"

                    >
                        <p className="text-xl font-semibold text-center italic bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                            Because at The Nights, “Builders create, and creators build!”

                            PS: No coding or art skills? No worries. Bring your enthusiasm; we’ve got the rest. 🛠🎨
                            Stay in the Loop!  </p>
                        <p className="text-xl font-semibold text-center italic bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                            For updates, behind-the-scenes sneak peeks, and all the buzz, join us on our socials:

                            📱 [Insert Social Media Handles Here]

                            Don’t miss out – be part of the journey!
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Enhanced Decorative Effects */}
            <motion.div
                className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"
                animate={{
                    opacity: [0.1, 0.15, 0.1],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-white/10 to-transparent rounded-full blur-3xl"
                animate={{
                    opacity: [0.1, 0.15, 0.1],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />
        </motion.div>
    )
}

export default WhoAreWe;

