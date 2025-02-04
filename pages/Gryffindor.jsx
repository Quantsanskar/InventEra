import Home from "@/components/Houses/Gryffindor/Gry";
import Carousel from "@/components/Houses/Gryffindor/GryCarousel";
import Navigation from "@/components/homepage/Navigation";
import HeroParallax from "@/components/Houses/HeroParallax";
import { Footer } from "@/components/footer";
import CategoriesSection from "@/components/Houses/Gryffindor/GryThemes";
export default function HufflePuff() {
    const eventThemes = [
        {
            title: "Gryffindor",
            link: "/404",
            thumbnail: "/reference/ComingSoonThumb.png", // Add your image path here
        },
        {
            title: "HufflePuff",
            link: "/404",
            thumbnail: "/reference/ComingSoonThumb.png", // Add your image path here
        },
        {
            title: "RavenClaw",
            link: "/404",
            thumbnail: "/reference/ComingSoonThumb.png", // Add your image path here
        },
        {
            title: "Phoenix",
            link: "/404",
            thumbnail: "/reference/ComingSoonThumb.png", // Add your image path here
        },
        {
            title: "Slytherin",
            link: "/404",
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