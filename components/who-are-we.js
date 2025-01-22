'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ParticleEffect } from './particles'
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import BackgroundImage from './ui/Gradient'

const WhoAreWe = () => {
    const contentVariants = {
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
        <BackgroundImage imagePath="/reference/Gradient1.png">
            <motion.div
                initial={{ opacity: 1, scale: 1 }}
                animate="visible"
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
                    {/* Who Are We Image Container */}
                    <div className="w-full lg:w-1/2 max-w-[300px] lg:max-w-[400px]">
                        <CardContainer className="inter-var">
                            <CardBody>
                                <CardItem translateZ="100" className="w-full flex flex-row lg:gap-60">
                                    {/* Who Are We Image - Updated with small screen optimizations */}
                                    <Image
                                        src="/reference/WHO ARE WE.png"
                                        height="400"
                                        width="400"
                                        className="
                            max-w-[45%] ml-0                    /* Base size for smallest screens */
                            sm:max-w-[60%] sm:ml-2             /* Slight increase for small screens */
                            md:max-w-[75%] md:ml-[-40px]       /* Original medium screen sizing */
                            lg:max-w-[65%] lg:ml-[-160px]      /* Original large screen sizing */
                            xl:max-w-[60%] xl:ml-[-240px]      /* Original xl screen sizing */
                            2xl:max-w-[55%] 2xl:ml-[-320px]    /* Original 2xl screen sizing */
                            h-auto object-contain rounded-xl group-hover/card:shadow-xl
                        "
                                        alt="Who Are We?"
                                    />

                                    {/* Underscore Image - Adjusted positioning for small screens */}
                                    <Image
                                        src="/reference/_.png"
                                        height="400"
                                        width="400"
                                        className="
                            max-w-[20%]                        /* Smaller base size for mobile */
                            ml-[-30px] mt-[150px]             /* Adjusted positioning for mobile */
                            sm:max-w-[50%] sm:ml-[-40px]      /* Slightly larger for small screens */
                            lg:max-w-[60%] lg:ml-[-280px]     /* Original large screen sizing */
                            max-h-[200px] 
                            lg:mt-[100px]
                            object-contain rounded-xl 
                            group-hover/card:shadow-xl
                        "
                                        alt="Who Are We?"
                                    />

                                    {/* Decorative SVG - New responsive positioning */}
                                    <Image
                                        src={"/reference/undraw_mello_uiud.svg"}
                                        fill
                                        className="
                            object-contain 
                             max-w-[65%] ml-0                    /* Base size for smallest screens */
                            sm:max-w-[80%]              /* Slight increase for small screens */
                            md:max-w-[85%]      /* Original medium screen sizing */
                            lg:max-w-[90%]   /* Original large screen sizing */
                            xl:max-w-[95%]      /* Original xl screen sizing */
                            2xl:max-w-[98%]   /* Original 2xl screen sizing */
                       
                            ml-[9rem]                      /* Increased margin for small screens */
                            md:ml-[15rem]                     /* Further increased for medium */
                            lg:ml-[17rem]                     /* Original large screen margin */
                            xl:ml-[20rem]                     /* Original xl screen margin */
                            2xl:ml-[23rem]                   /* Original 2xl screen margin */
                        "
                                        alt="Decorative SVG"
                                    />
                                </CardItem>
                            </CardBody>
                        </CardContainer>
                    </div>
                </div>

                {/* Content Section */}
                <motion.div
                    initial="visible"
                    animate="visible"
                    variants={contentVariants}
                    className="relative max-w-4xl mx-auto px-8 pb-16 text-white mt-[-60px] z-10"
                >
                    <motion.div
                        className="space-y-8  p-4 rounded-2xl bg-transparent"

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
                            className="transform hover:scale-[1.02] transition-all duration-300 rounded-xl "

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
                            className="transform hover:scale-[1.02] transition-all duration-300 rounded-xl "

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
                            className="transform hover:scale-[1.02] transition-all duration-300 rounded-xl"

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
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 mt-6 mb-6">
                                <a
                                    href="https://chat.whatsapp.com/IXlpRAi0BJKD99DSCY3j4j"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-900/40 to-emerald-800/30 text-white/90 hover:from-emerald-800/50 hover:to-emerald-700/40 transition-all duration-300 backdrop-blur-sm border border-emerald-700/20"
                                >
                                    WhatsApp
                                </a>

                                <a
                                    href="https://www.instagram.com/builders.space/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-900/40 to-pink-800/30 text-white/90 hover:from-purple-800/50 hover:to-pink-700/40 transition-all duration-300 backdrop-blur-sm border border-purple-700/20"
                                >
                                    Instagram
                                </a>

                                <a
                                    href="https://www.linkedin.com/company/builder-s-space/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-900/40 to-blue-800/30 text-white/90 hover:from-blue-800/50 hover:to-blue-700/40 transition-all duration-300 backdrop-blur-sm border border-blue-700/20"
                                >
                                    LinkedIn
                                </a>
                                <a
                                    href="https://linktr.ee/Builders_Space"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-teal-900/40 to-cyan-800/30 text-white/90 hover:from-teal-800/50 hover:to-cyan-700/40 transition-all duration-300 backdrop-blur-sm border border-teal-700/20"
                                >
                                    Linktree
                                </a>
                            </div>
                            <p className="text-xl font-semibold text-center italic bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                                Don’t miss out – be part of the journey!
                            </p>
                            <div className='text-center mt-[4rem]'>
                                <button className="relative text-base bg-transparent border-none px-6 py-4 text-[#ffedd3] uppercase cursor-pointer transition-all duration-500 ease-in-out hover:text-[#1e1e2b] overflow-hidden group" onClick={()=>window.location.href='https://www.commudle.com/communities/builders-space/events/the-nights-s1'}>
                                    <span className="relative z-10">
                                        JOIN US
                                    </span>
                                    {/* Bottom line animation */}
                                    <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#ffc506] transition-all duration-500 ease-in-out group-hover:w-full" />
                                    {/* Fill animation */}
                                    <div className="absolute left-0 bottom-0 h-0 w-full bg-[#ffc506] transition-all duration-400 ease-in-out group-hover:h-full -z-10 group-hover:transition-[height] group-hover:delay-[400ms]" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Decorative Effects */}
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
        </BackgroundImage>
    )
}

export default WhoAreWe;