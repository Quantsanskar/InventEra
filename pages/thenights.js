"use client";

import React from "react";
import SparklesCore from "../components/SparklesCore";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconHome, IconMoonStars, IconMail } from "@tabler/icons-react";
import { FloatingNavbar } from "../components/floatingnavbar";
import { TechStickyScroll } from "../components/techstickyroll";
import { FlipWords } from "../components/flipwords";
import { ScrollDemo } from "../components/containerscroll";
import TextGenerateEffect from "../components/text-gen";
import { Compare } from "../components/compare";
import HeroParallax from "../components/HeroParallax";
import MacbookScroll from "../components/macbookgrid";
import { PageShowcase } from "../components/notionpage";
import { LayoutGrid } from "../components/gridcomponent";
import SponsorsCarousel from "../components/sponsorscarousel";
import { LampImp } from "../components/lamp";
import { Footer } from "../components/footer";
import { CommunityLamp } from "../components/communityLamp";
import MacWindow from "../components/macbooktab";
import HeroSection from "../components/nightshero";
import WelcomeCard from "../components/nightswelcomecard";
import CrewSection from "../components/MediaCarousel/NightsMedia";
// import WhoAreWe from "@/components/who-are-we";
import Navigation from "@/components/homepage/Navigation";
import DynamicMarquee from "@/components/homepage/ScrollNights"
import { TextRevealByWord } from "@/components/ui/text-reveal";
import CommunityCarousel from "@/components/communitycarousel";
import BackgroundImage from "@/components/ui/Gradient";
import DynamicMarqueeSponsComm from "@/components/homepage/ScrollSponsors";
import CTA from "@/components/homepage/ctanights";
import WhoAreWe from "@/components/newwhoarewe";
import WelcomeSection from "@/components/hogwarts-welcome";
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
    link: "/404",
    thumbnail: "/reference/ComingSoonThumb.png", // Add your image path here
  },
  {
    title: "Science & Research Domains",
    link: "/404",
    thumbnail: "/reference/ComingSoonThumb.png", // Add your image path here
  },
  {
    title: "Creative Domains",
    link: "/404",
    thumbnail: "/reference/ComingSoonThumb.png", // Add your image path here
  },
  {
    title: "Enterpreneurship & Management",
    link: "/404",
    thumbnail: "/reference/ComingSoonThumb.png", // Add your image path here
  },
  {
    title: "Other Domains",
    link: "/404",
    thumbnail: "/reference/ComingSoonThumb.png", // Add your image path here
  },
];

const EventPage = () => {

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


  const pages = [
    {
      title: "BuilderSpace",
      value: "builderspace",
      description:
        "Welcome to Builder's Space—where innovation meets creativity! We're a platform for tech wizards, artists, and creators of all kinds. No degrees required, just passion and ambition. Join our community to build cool stuff with cooler people, access mentorship, workshops, and showcase opportunities. Whether you're coding the next big app or crafting digital art, this is your launchpad.",
      link: "/n1",
    },
    {
      title: "Community",
      value: "community",
      description:
        "Join our vibrant community of creators, developers, artists, and innovators! Nights: Season One offers a 3-week journey of learning, building, and networking. Connect with like-minded individuals, participate in interactive workshops, and showcase your work at our grand finale Demo Day. Experience the power of collaborative learning and creative growth.",
      link: "/notioncommunity",
    },

    {
      title: "Speakers",
      value: "speakers",
      description:
        "Learn from industry experts and thought leaders who share their journey, insights, and expertise. Our speaker series features diverse topics from technical skills to entrepreneurship. Each session is carefully curated to provide practical knowledge and inspiration for your creative journey. Connect with speakers who've walked the path you're on.",
      link: "/notionspeakers",
    },
    {
      title: "Schedule",
      value: "schedule",
      description:
        "Our 3-week program is carefully structured for maximum impact. Week 1: Foundation & Ideation - discover your path. Week 2: Build & Iterate - bring your ideas to life. Week 3: Polish & Present - prepare for the grand showcase. Each week includes workshops, speaker sessions, build time, and networking opportunities.",
      link: "/notionschedule",
    },
    {
      title: "Audience",
      value: "audience",
      description:
        "Builder's Space welcomes creators of all backgrounds and skill levels. Whether you're a developer, designer, artist, entrepreneur, or innovator, there's a place for you here. Our community includes students, professionals, and hobbyists united by their passion for building and creating. Join a diverse ecosystem that supports your growth.",
      link: "/notionsaudience",
    },
    {
      title: "Winner Selection",
      value: "winner selection",
      description:
        "Projects are evaluated based on innovation (40%), technical complexity (30%), execution (20%), and presentation (10%). Our diverse panel of judges provides constructive feedback to help you grow. Winners receive mentorship opportunities, resources for project development, and exposure to industry leaders. Every participant gets valuable feedback.",
      link: "/notionwinners",
    },
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
      type: "image",
      category: "Featured",
      title: "Amazing Video Content",
      src: "/reference/WhatsApp Image 2025-01-12 at 10.02.27 PM - Yogesh Vashisth.jpeg", // Add your video path
    },
    {
      type: "image",
      category: "Animation",
      title: "Engaging GIF Content",
      src: "/reference/IMG_9723 - Ali Nasir.PNG", // Add your GIF path
    },

    {
      type: "image",
      category: "Featured",
      title: "Amazing Video Content",
      src: "/reference/IMG_1692 - Vishal Kumar Singh.png", // Add your video path
    },
    {
      type: "image",
      category: "Animation",
      title: "Engaging GIF Content",
      src: "/reference/IMG_20250112_222134 - SWATI JHA.jpg", // Add your GIF path
    },
    {
      type: "image",
      category: "Photography",
      title: "Beautiful Image",
      src: "/reference/IMG_20250113_115206 - Shreya Shristi.jpg", // Add your image path
    },
    {
      type: "image",
      category: "Featured",
      title: "Amazing Video Content",
      src: "/reference/IMG-20250114-WA0003 - Mohd. Zubair.jpg", // Add your video path
    },
    {
      type: "image",
      category: "Animation",
      title: "Engaging GIF Content",
      src: "/reference/Picsart_25-01-12_22-09-42-955 - Jack Sparrow.jpg", // Add your GIF path
    },
    {
      type: "image",
      category: "Photography",
      title: "Beautiful Image",
      src: "/reference/this is me_20250113_010118_0000 - Abhinav Maurya.jpg", // Add your image path
    },
    {
      type: "image",
      category: "Featured",
      title: "Amazing Video Content",
      src: "/reference/IMG-20250113-WA0005 - Kirti Goel.jpg", // Add your video path
    },
    {
      type: "image",
      category: "Animation",
      title: "Engaging GIF Content",
      src: "/reference/ANSH - ANSH KUMAR.jpg", // Add your GIF path
    },
    {
      type: "image",
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
        src: "/reference/Nightshift (2).jpeg",
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
        src: "/reference/Nightshift.jpeg",
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
    <div className="flex flex-col min-h-screen bg-black dark:bg-black">


      <Navigation />


      <div>
        <HeroSection />
      </div>
      <div><DynamicMarquee /></div>

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




      <div>
        <WelcomeCard />
      </div>






      {/* <BackgroundImage imagePath="/reference/Gradient1.png">

        <CrewSection cards={data} />
      </BackgroundImage> */}

      <div className="mt-4 md:mt-8 sm:mt-2">
        <ScrollDemo />
      </div>

      <div className="">
        {/* <WhoAreWe /> */}
        <WhoAreWe />
      </div>
      <div><DynamicMarqueeSponsComm /></div>

      <div className=""><LampImp /></div>
      <div className="">
        <CommunityLamp />
        {/* <CommunityCarousel /> */}
      </div>
      <BackgroundImage imagePath="/reference/Gradient1.png">
        <div className="min-h-screen py-20 mb-20">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-12 text-center">
              Everything about "The Nights"
            </h1>
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
      </BackgroundImage>
      <div><CTA /></div>

      <div className="w-full h-full"><WelcomeSection /></div>
      <BackgroundImage imagePath="/reference/Gradient1.png">
        <div className="text-white dark:text-white">

          <HeroParallax products={eventThemes} />
        </div>
      </BackgroundImage>

      {/* <div className="bg-background w-full">
       
        <LayoutGrid
          cards={cards}
          className="grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4 md:p-8"
        />
      </div> */}

      {/* Add Footer */}
      <Footer />
    </div>
  );
};

export default EventPage;
