"use client";

import React from "react";
import SparklesCore from "../components/SparklesCore";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconHome, IconMusic, IconMail } from "@tabler/icons-react";
import { FloatingNavbar } from "../components/floatingnavbar";
import { TechStickyScroll } from "../components/techstickyroll";
import { FlipWords } from "../components/flipwords";
import { ScrollDemo } from '../components/containerscroll'
import TextGenerateEffect from "../components/text-gen";
// Simple NavItem component
const NavItem = ({ href, children }) => (
    <Link href={href}>
        <motion.span
            whileHover={{ opacity: 0.8 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer text-black dark:text-white text-lg font-medium"
        >
            {children}
        </motion.span>
    </Link>
);

// Simplified Nav component
const Nav = () => (
    <nav className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-8 px-8 py-6">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/the-nights">The Nights</NavItem>
        <NavItem href="/contact">Contact</NavItem>
    </nav>
);



const EventPage = () => {
    const navigationItems = [
        {
            title: "Home",
            icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "/",
        },
        {
            title: "The Nights",
            icon: <IconMusic className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "/thenights",
        },
        {
            title: "Contact",
            icon: <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "/contact",
        },
    ];
    // Memoize gradient elements
    const GradientOverlays = (
        <>
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
        </>
    );

    const sparklesConfig = {
        background: "transparent",
        minSize: 0.4,
        maxSize: 1,
        particleDensity: 1200,
        particleColor: "#FFFFFF",
    };

    const words = [
        "Heyy, welcome to The Nights",
        "are you ready to build something amazing?",
        "but want a platform and community to help you?",
        "then you're in the right place",
        "we're here to help you grow and succeed",
        "so, let's get started",
    ];

    return (
        <main className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900">
            {/* Navigation Section */}
            {/* <section className="w-full flex items-center justify-center py-8">
                <Nav />
            </section> */}

            <FloatingNavbar items={navigationItems} />
            {/* Hero Section with Sparkles */}
            <section className="flex-1 w-full bg-black flex flex-col items-center justify-center overflow-hidden">
                <div className="relative">
                    <h1 className="md:text-8xl text-4xl lg:text-9xl font-bold text-center text-white relative z-20 mt-60 md:mt-60 sm:mt-40">
                        The Nights
                    </h1>

                    <div className="w-[40rem] h-40 relative mb-60 md:mb-60 sm:mb-20">
                        {GradientOverlays}

                        <SparklesCore
                            {...sparklesConfig}
                            className="w-full h-full"
                        />

                        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
                    </div>
                </div>
            </section>

            {/* <div className="text-center mb-8 md:mb-16 sm:mb-4">
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                    {" "}
                    <FlipWords
                        words={words}
                        duration={3000}
                        className="text-blue-400"
                    />
                </h1>
            </div> */}
            <div className="text-center mb-8 md:mb-16 sm:mb-4">
                <TextGenerateEffect words={words} />
            </div>

            <div className="mt-4 md:mt-8 sm:mt-2">
                <ScrollDemo />
            </div>

            {/* Notion-like Season Description Section */}
            <section className="w-full px-4 md:px-8 py-12 bg-[#191919] text-white">
                <div className="max-w-5xl mx-auto space-y-12">
                    {/* Header */}
                    <div className="border-b border-gray-800 pb-8">
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                            The Nights: Season One
                        </h1>
                        <p className="text-gray-400 text-xl md:text-2xl mt-4">
                            A 3-week journey of creation, collaboration, and community 🚀
                        </p>
                    </div>

                    {/* Table of Contents */}
                    <div className="max-w-4xl mx-auto p-8 bg-[#191919] text-gray-200">
                        {/* Title Section */}
                        <div className="mb-12">
                            <h1 className="text-4xl font-bold mb-4 text-white">The Nights: Season One</h1>
                            <p className="text-xl text-gray-400">A 3-week journey of creation, collaboration, and community.</p>
                        </div>

                        {/* Content Sections */}
                        <div className="space-y-10">
                            {/* Program Overview */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-white">🎯 Program Overview</h2>
                                <p className="text-lg leading-relaxed mb-6">
                                    Welcome to The Nights: Season One, a unique 3-week program designed for creators, developers, artists, and innovators. Whether you're into tech, design, art, music, or any creative pursuit, this is your platform to learn, create, and showcase your work to the world.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    Duration: 3 Weeks
                                    Format: Hybrid (Virtual + Offline)
                                    Final Event: Demo Day Showcase
                                </p>
                            </div>

                            {/* What We Offer */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-white">💡 What We Offer</h2>
                                <div className="space-y-4">
                                    <p className="text-lg leading-relaxed">
                                        🎓 Interactive Workshops: Hands-on sessions with industry experts where you'll learn practical skills and insights.
                                    </p>
                                    <p className="text-lg leading-relaxed">
                                        🎙️ Speaker Sessions (Labs): Learn directly from successful builders and creators who've been where you are.
                                    </p>
                                    <p className="text-lg leading-relaxed">
                                        🚀 Build Challenges: Put your skills to the test with real projects that matter. Work on what excites you most.
                                    </p>
                                    <p className="text-lg leading-relaxed">
                                        🤝 Networking: Connect with like-minded creators in a supportive community environment.
                                    </p>
                                </div>
                            </div>

                            {/* Important Details */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-white">📍 Important Details</h2>
                                <div className="space-y-4">
                                    <p className="text-lg leading-relaxed">Start Date: January 15th, 2024</p>
                                    <p className="text-lg leading-relaxed">Contact: buildersspace9@gmail.com</p>
                                    <p className="text-lg leading-relaxed">Format: Virtual + Offline Demo Day</p>
                                    {/* <p className="text-lg leading-relaxed">Website: buildersspace.tech</p> */}
                                </div>
                            </div>

                            {/* Closing */}
                            <div className="pt-8 border-t border-gray-800">
                                <p className="text-xl italic text-gray-400">
                                    "Where builders create and creators build!"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div>
                <TechStickyScroll />
            </div>
        </main>
    );
};

export default EventPage;