import { useState } from "react";
import Home from "@/components/Houses/Huff";
import Carousel from "@/components/Houses/HuffCarousel";
import Navigation from "@/components/homepage/Navigation";
import HeroParallax from "@/components/Houses/HeroParallax";
import { Footer } from "@/components/footer";
import CategoriesSection from "@/components/Houses/Hufflethemes";
export default function HufflePuff() {
    const eventThemes = [
        {
            title: "Gryffindor",
            link: "/notFoundPage/404.js",
            thumbnail: "/reference/ComingSoonThumb.png", // Add your image path here
        },
        {
            title: "HufflePuff",
            link: "/notFoundPage/404.js",
            thumbnail: "/reference/ComingSoonThumb.png", // Add your image path here
        },
        {
            title: "RavenClaw",
            link: "/notFoundPage/404.js",
            thumbnail: "/reference/ComingSoonThumb.png", // Add your image path here
        },
        {
            title: "Phoenix",
            link: "/notFoundPage/404.js",
            thumbnail: "/reference/ComingSoonThumb.png", // Add your image path here
        },
        {
            title: "Slytherin",
            link: "/notFoundPage/404.js",
            thumbnail: "/reference/ComingSoonThumb.png", // Add your image path here
        },
    ];


    const [currentSlide, setCurrentSlide] = useState(0)
    return (
        <div className="min-h-screen bg-[#121212]">
            <Navigation />
            <Home />
            <CategoriesSection setCurrentSlide={setCurrentSlide} />
            <Carousel currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />


            <div className="text-white dark:text-white">
                <HeroParallax products={eventThemes} />
            </div>

            <Footer />
        </div>
    );
}