"use client";
import React from "react";
import { ScrollDemo } from "@/components/nightsPage/containerscroll";
import { PageShowcase } from "@/components/nightsPage/notionpage";
import { LayoutGrid } from "../components/nightsPage/gridcomponent";
import { LampImp } from "@/components/nightsPage/lamp";
import { Footer } from "../components/footer";
import { CommunityLamp } from "../components/nightsPage/communityLamp";
import HeroSection from "../components/nightsPage/nightshero";
import WelcomeCard from "@/components/nightsPage/nightswelcomecard";
import Navigation from "@/components/homepage/Navigation";
import DynamicMarquee from "@/components/homepage/ScrollNights"
import BackgroundImage from "@/components/ui/Gradient";
import DynamicMarqueeSponsComm from "@/components/nightsPage/ScrollSponsors";
import CTA from "@/components/homepage/ctanights";
import WhoAreWe from "@/components/nightsPage/newwhoarewe";
import WelcomePage from "@/components/nightsPage/Welc-Hogw";

const EventPage = () => {
  const pages = [
    {
      title: "BuilderSpace",
      value: "builderspace",
      description:
        "Welcome to Builder's Space—where innovation meets creativity! We're a platform for tech wizards, artists, and creators of all kinds. No degrees required, just passion and ambition. Join our community to build cool stuff with cooler people, access mentorship, workshops, and showcase opportunities. Whether you're coding the next big app or crafting digital art, this is your launchpad.",
      link: "/nightsPageExtPages/builderSpaceInfo",
    },
    {
      title: "Community",
      value: "community",
      description:
        "Join our vibrant community of creators, developers, artists, and innovators! Nights: Season One offers a 3-week journey of learning, building, and networking. Connect with like-minded individuals, participate in interactive workshops, and showcase your work at our grand finale Demo Day. Experience the power of collaborative learning and creative growth.",
      link: "/nightsPageExtPages/communityinfo",
    },

    {
      title: "Speakers",
      value: "speakers",
      description:
        "Learn from industry experts and thought leaders who share their journey, insights, and expertise. Our speaker series features diverse topics from technical skills to entrepreneurship. Each session is carefully curated to provide practical knowledge and inspiration for your creative journey. Connect with speakers who've walked the path you're on.",
      link: "/nightsPageExtPages/speakersinfo",
    },
    {
      title: "Schedule",
      value: "schedule",
      description:
        "Our 3-week program is carefully structured for maximum impact. Week 1: Foundation & Ideation - discover your path. Week 2: Build & Iterate - bring your ideas to life. Week 3: Polish & Present - prepare for the grand showcase. Each week includes workshops, speaker sessions, build time, and networking opportunities.",
      link: "/nightsPageExtPages/scheduleinfo",
    },
    {
      title: "Audience",
      value: "audience",
      description:
        "Builder's Space welcomes creators of all backgrounds and skill levels. Whether you're a developer, designer, artist, entrepreneur, or innovator, there's a place for you here. Our community includes students, professionals, and hobbyists united by their passion for building and creating. Join a diverse ecosystem that supports your growth.",
      link: "/nightsPageExtPages/audienceinfo",
    },
    {
      title: "Winner Selection",
      value: "winner selection",
      description:
        "Projects are evaluated based on innovation (40%), technical complexity (30%), execution (20%), and presentation (10%). Our diverse panel of judges provides constructive feedback to help you grow. Winners receive mentorship opportunities, resources for project development, and exposure to industry leaders. Every participant gets valuable feedback.",
      link: "/nightsPageExtPages/winnersinfo",
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

  return (
    <div className="flex flex-col min-h-screen bg-black dark:bg-black">
      <Navigation />
      <div>
        <HeroSection />
      </div>
      <div><DynamicMarquee /></div>
      <div>
        <WelcomeCard />
      </div>
      <div className="mt-4 md:mt-8 sm:mt-2">
        <ScrollDemo />
      </div>
      <div>
        <WhoAreWe />
      </div>
      <div><DynamicMarqueeSponsComm /></div>
      <div>
        <LampImp />
      </div>
      <div>
        <CommunityLamp />
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
      <div><WelcomePage /></div>
      <div className="bg-background w-full">
        <LayoutGrid
          cards={cards}
          className="grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4 md:p-8"
        />
      </div>
      <Footer />
    </div>
  );
};

export default EventPage;
