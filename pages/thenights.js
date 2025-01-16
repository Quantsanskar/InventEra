"use client";

import React from "react";
import SparklesCore from "../components/SparklesCore";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconHome, IconMoonStars, IconMail } from "@tabler/icons-react";
import { FloatingNavbar } from "../components/floatingnavbar";
import { TechStickyScroll } from "../components/techstickyroll";
import { FlipWords } from "../components/flipwords";
import { ScrollDemo } from '../components/containerscroll'
import TextGenerateEffect from "../components/text-gen";
import { Compare } from "../components/compare";
import HeroParallax from "../components/HeroParallax";
import MacbookScroll from "../components/macbookgrid";
import { PageShowcase } from "../components/notionpage";
import { LayoutGrid } from "../components/gridcomponent";
import { LampImp } from "../components/lamp";
import { Footer } from "../components/footer";
import { CommunityLamp } from "../components/communityLamp";
import MacWindow from '../components/macbooktab';
import HeroSection from "../components/nightshero";
import WelcomeCard from "../components/nightswelcomecard";
import CrewSection from "../components/MediaCarousel/NightsMedia";
import WhoAreWe from "../components/nightsintro";
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

const eventThemes = [
    {
        title: "Tech Domains",
        link: "/static/TechDomain.html",
        thumbnail: "/images/TechDomain.png", // Add your image path here
    },
    {
        title: "Science & Research Domains",
        link: "/static/Science.html",
        thumbnail: "/images/Science.png", // Add your image path here
    },
    {
        title: "Creative Domains",
        link: "/static/Creative_Domains.html",
        thumbnail: "/images/CreativeDomain.png", // Add your image path here
    },
    {
        title: "Enterpreneurship & Management",
        link: "/static/Management.html",
        thumbnail: "/images/Enterpreneurship.png", // Add your image path here
    },
    {
        title: "Other Domains",
        link: "/static/Others.html",
        thumbnail: "/images/Others.png", // Add your image path here
    }
];
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
            icon: <IconMoonStars className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
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


    const pages = [
        {
            title: "BuilderSpace",
            value: "builderspace",
            description: "Welcome to Builder's Space—where innovation meets creativity! We're a platform for tech wizards, artists, and creators of all kinds. No degrees required, just passion and ambition. Join our community to build cool stuff with cooler people, access mentorship, workshops, and showcase opportunities. Whether you're coding the next big app or crafting digital art, this is your launchpad.",
            link: "/n1"
        },
        {
            title: "Community",
            value: "community",
            description: "Join our vibrant community of creators, developers, artists, and innovators! Nights: Season One offers a 3-week journey of learning, building, and networking. Connect with like-minded individuals, participate in interactive workshops, and showcase your work at our grand finale Demo Day. Experience the power of collaborative learning and creative growth.",
            link: "/notioncommunity"
        },
        {
            title: "Sponsors",
            value: "sponsors",
            description: "Our sponsors are industry leaders committed to empowering the next generation of creators. They provide essential resources, cutting-edge tools, mentorship opportunities, and valuable connections. Through our sponsorship program, participants gain access to premium technologies and platforms that accelerate their development journey.",
            link: "/notionsponsors"
        },
        {
            title: "Speakers",
            value: "speakers",
            description: "Learn from industry experts and thought leaders who share their journey, insights, and expertise. Our speaker series features diverse topics from technical skills to entrepreneurship. Each session is carefully curated to provide practical knowledge and inspiration for your creative journey. Connect with speakers who've walked the path you're on.",
            link: "/notionspeakers"
        },
        {
            title: "Schedule",
            value: "schedule",
            description: "Our 3-week program is carefully structured for maximum impact. Week 1: Foundation & Ideation - discover your path. Week 2: Build & Iterate - bring your ideas to life. Week 3: Polish & Present - prepare for the grand showcase. Each week includes workshops, speaker sessions, build time, and networking opportunities.",
            link: "/notionschedule"
        },
        {
            title: "Audience",
            value: "audience",
            description: "Builder's Space welcomes creators of all backgrounds and skill levels. Whether you're a developer, designer, artist, entrepreneur, or innovator, there's a place for you here. Our community includes students, professionals, and hobbyists united by their passion for building and creating. Join a diverse ecosystem that supports your growth.",
            link: "/notionsaudience"
        },
        {
            title: "Winner Selection",
            value: "winner selection",
            description: "Projects are evaluated based on innovation (40%), technical complexity (30%), execution (20%), and presentation (10%). Our diverse panel of judges provides constructive feedback to help you grow. Winners receive mentorship opportunities, resources for project development, and exposure to industry leaders. Every participant gets valuable feedback.",
            link: "/notionwinners"
        }
    ];

    const CardContent = ({ title, description }) => {
        return (
            <div>
                <p className="font-bold md:text-4xl text-xl text-white">{title}</p>
                <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                    {description}
                </p>
            </div>
        );
    };
    const data = [
        {
            type: 'image',
            category: "Featured",
            title: "Amazing Video Content",
            src: "/reference/WhatsApp Image 2025-01-12 at 10.02.27 PM - Yogesh Vashisth.jpeg", // Add your video path
        },
        {
            type: 'image',
            category: "Animation",
            title: "Engaging GIF Content",
            src: "/reference/IMG_9723 - Ali Nasir.PNG", // Add your GIF path
        },

        {
            type: 'image',
            category: "Featured",
            title: "Amazing Video Content",
            src: "/reference/IMG_1692 - Vishal Kumar Singh.png", // Add your video path
        },
        {
            type: 'image',
            category: "Animation",
            title: "Engaging GIF Content",
            src: "/reference/IMG_20250112_222134 - SWATI JHA.jpg", // Add your GIF path
        },
        {
            type: 'image',
            category: "Photography",
            title: "Beautiful Image",
            src: "/reference/IMG_20250113_115206 - Shreya Shristi.jpg", // Add your image path
        },
        {
            type: 'image',
            category: "Featured",
            title: "Amazing Video Content",
            src: "/reference/IMG-20250114-WA0003 - Mohd. Zubair.jpg", // Add your video path
        },
        {
            type: 'image',
            category: "Animation",
            title: "Engaging GIF Content",
            src: "/reference/Picsart_25-01-12_22-09-42-955 - Jack Sparrow.jpg", // Add your GIF path
        },
        {
            type: 'image',
            category: "Photography",
            title: "Beautiful Image",
            src: "/reference/this is me_20250113_010118_0000 - Abhinav Maurya.jpg", // Add your image path
        },
        {
            type: 'image',
            category: "Featured",
            title: "Amazing Video Content",
            src: "/reference/IMG-20250113-WA0005 - Kirti Goel.jpg", // Add your video path
        },
        {
            type: 'image',
            category: "Animation",
            title: "Engaging GIF Content",
            src: "/reference/ANSH - ANSH KUMAR.jpg", // Add your GIF path
        },
        {
            type: 'image',
            category: "Photography",
            title: "Beautiful Image",
            src: "/reference/aayushi - ANSH KUMAR.jpg", // Add your image path
        },
        // Add more items as needed
    ];
    const cards = [
        {
            id: 1,
            content: (
                <CardContent
                    title="Build & Learn"
                    description="Join hands-on workshops and build real projects with expert guidance."
                />
            ),
            className: "md:col-span-2 row-span-1",
            media: {
                type: "gif",
                src: "/gifs/215739.gif",
                alt: "Building projects",
            },
        },
        {
            id: 2,
            content: (
                <CardContent
                    title="Connect & Grow"
                    description="Network with fellow creators and industry leaders in our vibrant community."
                />
            ),
            className: "md:col-span-1 row-span-1",
            media: {
                type: "image",
                src: "/reference/images (6).jpeg",
                alt: "Community networking",
            },
        },
        {
            id: 3,
            content: (
                <CardContent
                    title="Showcase & Shine"
                    description="Present your work at our Demo Day and get recognition for your creativity."
                />
            ),
            className: "md:col-span-1 row-span-1",
            media: {
                type: "image",
                src: "/reference/images (7).jpeg",
                alt: "Project showcase",
            },
        },
        {
            id: 4,
            content: (
                <CardContent
                    title="Innovate & Transform"
                    description="Turn your ideas into reality with cutting-edge tools and technologies."
                />
            ),
            className: "md:col-span-2 row-span-1",
            media: {
                type: "gif",
                src: "/gifs/222787.gif",
                alt: "Innovation showcase",
            },
        },
    ];


    const mediacards = data.map((card, index) => (
        <CrewSection key={index} card={card} index={index} />
    ));
    return (
        <main className="flex flex-col min-h-screen bg-black dark:bg-black">
            {/* Navigation Section */}
            {/* <section className="w-full flex items-center justify-center py-8">
                <Nav />
            </section> */}

            <FloatingNavbar items={navigationItems} />
            {/* Hero Section with Sparkles */}
            <div><HeroSection /></div>
            {/* <section className="flex-1 w-full bg-black flex flex-col items-center justify-center overflow-hidden">
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
            </section> */}


            <div><WelcomeCard /></div>
            {/* <div className="text-center mb-8 md:mb-16 sm:mb-4">
                <TextGenerateEffect words={words} />

            </div> */}
            {/* <div className="w-full h-full py-20 bg-black">
                <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white dark:text-white font-sans text-center">
                    Our Members
                </h2>
                <Carousel items={mediacards} autoScrollInterval={5000} />
            </div> */}

            <div><CrewSection cards={data} /></div>


            <div className="mt-4 md:mt-8 sm:mt-2">
                <ScrollDemo />
            </div>





            {/* <div><WhoAreWe /></div> */}

            {/* Notion-like Season Description Section */}
            <section className="w-full px-4 md:px-8 py-12 bg-black dark:bg-black text-white dark:text-white">
                <div className="max-w-5xl mx-auto space-y-12 bg-black dark:bg-black text-white dark:text-white">
                    {/* Header */}
                    <div className="border-b border-gray-800 pb-8 bg-black dark:bg-black">
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                            The Nights: Season One
                        </h1>
                        <p className="text-gray-400 text-xl md:text-2xl mt-4">
                            A 3-week journey of creation, collaboration, and community 🚀
                        </p>
                    </div>

                    {/* Table of Contents */}
                    <div className="max-w-4xl mx-auto p-8 bg-[#191919] text-gray-200 bg-black dark:bg-black">
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
                                    <p className="text-lg leading-relaxed">Start Date: January 15th, 4</p>
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


            <div className="mb-20">
                <LampImp />
            </div>

            <div className="mb-20">
                <CommunityLamp />
            </div>

            <div className="min-h-screen bg-black dark:bg-black py-20 mb-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white mb-12 text-center">Everything about "The Nights"</h1>
                    <div className="h-[30rem] md:h-[40rem] [perspective:1000px] relative flex flex-col w-full items-start justify-start">
                        <PageShowcase
                            pages={pages}
                            containerClassName="mb-8"
                            activePageClassName="bg-gray-800"
                            pageClassName="hover:text-blue-400 transition-colors"
                        />
                    </div>
                </div>
            </div>



            <div className="bg-black dark:bg-black text-white dark:text-white">  {/* Removed extra spacing */}
                <HeroParallax products={eventThemes} />
            </div>



            {/* <div>
                <TechStickyScroll />
            </div> */}

            <div className="bg-background w-full"> {/* Updated container */}
                <LayoutGrid
                    cards={cards}
                    className="grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4 md:p-8"
                />
            </div>



            {/* Add Footer */}
            <Footer />
        </main>
    );
};

export default EventPage;