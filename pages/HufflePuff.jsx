import Home from "@/components/Houses/Huff";
import Carousel from "@/components/Houses/HuffCarousel";
import Navigation from "@/components/homepage/Navigation";
import { Footer } from "@/components/footer";
export default function HufflePuff() {
    return (
        <div className="min-h-screen bg-[#121212]">
            <Navigation />
            <Home />
            <Carousel />
            <Footer />
        </div>
    );
}