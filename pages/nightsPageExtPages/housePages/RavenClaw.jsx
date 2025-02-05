import Home from "@/components/Houses/RavenClaw/Raven";
import Carousel from "@/components/Houses/RavenClaw/RavenCaousel";
import Navigation from "@/components/homepage/Navigation";
import HeroParallax from "@/components/Houses/HeroParallax";
import { Footer } from "@/components/footer";
import CategoriesSection from "@/components/Houses/RavenClaw/Raventhemes";
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
    return (
        <div className="min-h-screen bg-[#121212]">
            <Navigation />
            <Home />
            <CategoriesSection />
            <Carousel />


                <div className="text-white dark:text-white">

                    <HeroParallax products={eventThemes} />
                </div>

            <Footer />
        </div>
    );
}