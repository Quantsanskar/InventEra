import Home from "@/components/Houses/Gryffindor/Gryff";
import Carousel from "@/components/Houses/Gryffindor/GryffCaousel";
import Navigation from "@/components/homepage/Navigation";
import HeroParallax from "@/components/Houses/HeroParallax";
import { Footer } from "@/components/footer";
import CategoriesSection from "@/components/Houses/Gryffindor/Gryffthemes";
export default function Gryffindor() {
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