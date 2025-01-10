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
        "firstly, let's get to know each other",
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

            <div className="text-center mb-8 md:mb-16 sm:mb-4">
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                    {" "}
                    <FlipWords
                        words={words}
                        duration={3000}
                        className="text-blue-400"
                    />
                </h1>
            </div>

            <div className="mt-4 md:mt-8 sm:mt-2">
                <ScrollDemo/>
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
                    <div className="bg-[#212121] rounded-xl p-6 space-y-2">
                        <h3 className="text-2xl font-semibold mb-4">Quick Navigation</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                "🎯 Program Overview",
                                "💡 What We Offer",
                                "📅 Timeline & Schedule",
                                "🤝 Community Benefits",
                                "🎨 Who Can Join",
                                "📍 Important Details"
                            ].map((item) => (
                                <div key={item} className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors">
                                    <span className="text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-16">
                        {/* Program Overview */}
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-blue-400">🎯 Program Overview</h2>
                            <div className="bg-[#212121] rounded-xl p-6 space-y-4">
                                <p className="text-xl text-gray-300">
                                    The Nights is a unique 3-week program designed to help creators turn their ideas into reality. 
                                    Whether you're a developer, designer, artist, or innovator, this is your platform to build, learn, and grow.
                                </p>
                                <div className="grid md:grid-cols-3 gap-4 mt-6">
                                    {[
                                        { title: "Duration", value: "3 Weeks" },
                                        { title: "Format", value: "Hybrid (Virtual + Offline)" },
                                        { title: "Final Event", value: "Demo Day Showcase" }
                                    ].map((item) => (
                                        <div key={item.title} className="bg-[#191919] p-4 rounded-lg">
                                            <h4 className="text-gray-400">{item.title}</h4>
                                            <p className="text-lg font-semibold text-white">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* What We Offer */}
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-purple-400">💡 What We Offer</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    {
                                        title: "Interactive Workshops",
                                        description: "Hands-on sessions with industry experts",
                                        icon: "🎓"
                                    },
                                    {
                                        title: "Speaker Sessions (Labs)",
                                        description: "Learn from successful builders and creators",
                                        icon: "🎙️"
                                    },
                                    {
                                        title: "Build Challenges",
                                        description: "Put your skills to test with real projects",
                                        icon: "🚀"
                                    },
                                    {
                                        title: "Networking",
                                        description: "Connect with like-minded creators",
                                        icon: "🤝"
                                    }
                                ].map((item) => (
                                    <div key={item.title} className="bg-[#212121] p-6 rounded-xl hover:bg-[#252525] transition-colors">
                                        <div className="text-3xl mb-4">{item.icon}</div>
                                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                        <p className="text-gray-400">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Important Details Card */}
                        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-gray-800">
                            <h3 className="text-3xl font-bold mb-6">📍 Important Details</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-blue-400 text-lg">Start Date</h4>
                                        <p className="text-xl">January 15th, 2024</p>
                                    </div>
                                    <div>
                                        <h4 className="text-blue-400 text-lg">Contact</h4>
                                        <p className="text-xl">buildersspace9@gmail.com</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-blue-400 text-lg">Format</h4>
                                        <p className="text-xl">Virtual + Offline Demo Day</p>
                                    </div>
                                    <div>
                                        <h4 className="text-blue-400 text-lg">Website</h4>
                                        <p className="text-xl">buildersspace.tech</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Quote */}
                        <div className="text-center border-t border-gray-800 pt-8">
                            <p className="text-2xl md:text-3xl italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                "Where builders create and creators build!"
                            </p>
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