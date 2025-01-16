// app/page.tsx
'use client';

import { Montserrat } from 'next/font/google';
import { motion } from 'framer-motion';
import { exp } from '@tensorflow/tfjs';

const montserrat = Montserrat({ subsets: ['latin'] });

const WhoAreWe=()=> {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className={`min-h-screen w-full ${montserrat.className} relative overflow-hidden`}>
            {/* Background gradient */}
            <div className="fixed inset-0 bg-gradient-to-b from-black via-[#1a1333] to-black opacity-90" />

            {/* Content container */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">
                {/* "WHO ARE WE?" section */}
                <motion.div
                    className="mb-16 md:mb-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative">
                        <div className="text-4xl md:text-6xl font-bold tracking-wider text-white/90 space-y-1">
                            <div className="bg-gradient-to-r from-white/90 to-white/80 text-transparent bg-clip-text">WHO</div>
                            <div className="bg-gradient-to-r from-white/90 to-white/80 text-transparent bg-clip-text">ARE</div>
                            <div className="bg-gradient-to-r from-white/90 to-white/80 text-transparent bg-clip-text">WE ?</div>
                        </div>
                        {/* <div className="absolute -right-4 top-8 text-6xl md:text-8xl font-bold text-white/90">?</div> */}
                    </div>
                </motion.div>

                {/* Main content */}
                <div className="space-y-12 text-white/90">
                    <motion.div
                        className="space-y-3"
                        {...fadeIn}
                    >
                        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white/90 to-white/80 text-transparent bg-clip-text">
                            The Nights: Season One
                        </h1>
                        <p className="text-lg md:text-xl text-white/70">
                            A 3-week journey of creation, collaboration, and community
                        </p>
                    </motion.div>

                    <motion.div
                        className="space-y-8"
                        {...fadeIn}
                    >
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-white/90 to-white/80 text-transparent bg-clip-text">
                                Program Overview
                            </h2>
                            <p className="text-white/70 leading-relaxed">
                                Welcome to The Nights: Season One, a unique 3-week program designed for creators, developers, artists, and innovators. Whether you're into tech, design, art, music, or any creative pursuit, this is your platform to learn, create, and showcase your work to the world.
                            </p>
                        </div>

                        <div className="space-y-2 text-white/70">
                            <p>Duration: 3 Weeks</p>
                            <p>Format: Hybrid (Virtual + Offline)</p>
                            <p>Final Event: Demo Day Showcase</p>
                        </div>

                        <div>
                            <h2 className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-white/90 to-white/80 text-transparent bg-clip-text">
                                What We Offer
                            </h2>
                            <div className="space-y-4 text-white/70">
                                <p>Interactive Workshops: Hands-on sessions with industry experts where you'll learn practical skills and insights.</p>
                                <p>Speaker Sessions (Labs): Learn directly from successful builders and creators who've been where you are.</p>
                                <p>Build Challenges: Put your skills to the test with real projects that matter. Work on what excites you most.</p>
                                <p>Networking: Connect with like-minded creators in a supportive community environment.</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-white/90 to-white/80 text-transparent bg-clip-text">
                                Important Details
                            </h2>
                            <div className="space-y-2 text-white/70">
                                <p>Start Date: January 15th, 4</p>
                                <p>Contact: buildersspace9@gmail.com</p>
                                <p>Format: Virtual + Offline Demo Day</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default WhoAreWe;