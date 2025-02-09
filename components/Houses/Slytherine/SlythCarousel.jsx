"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const slides = [
    {
        image: "/houses/Slytherine/Dancing.png",
        title: "Dancing",
        description: ` > Dancing is an expressive movement that tells stories through rhythm and energy. It allows individuals to connect with emotions and cultures in a profound way.
        
        > It enhances physical fitness, flexibility, and mental well-being. Regular practice improves coordination, strength, and overall endurance.
        
        >Dance styles range from ballet and hip-hop to contemporary and traditional folk dances. Each style has unique movements and cultural significance.
        
        >It is used in various celebrations, performances, and competitions. Many societies preserve their history and traditions through dance.
        
        >Dancing fosters creativity, self-expression, and confidence. It provides an artistic outlet that encourages personal and collective growth.
        
        `
    },
    {
        image: "/houses/Slytherine/Singing.png",
        title: "Singing",
        description: `>Singing is the art of vocal expression, using melody and harmony to convey emotions. It is a universal form of communication across cultures and time periods.
        
        >It strengthens breathing control, vocal range, and articulation. Proper vocal techniques enhance clarity, tone, and endurance.
        
        >Singing is a powerful storytelling medium, evoking deep emotional connections. Lyrics and melodies shape the message conveyed to listeners.
        
        >It encompasses various genres like classical, pop, jazz, and opera. Each genre brings a distinct style and history to vocal performances.
        
        >Singing has therapeutic effects, reducing stress and improving mood. It fosters self-confidence and provides an avenue for artistic expression.
        
        `
    },
    {
        image: "/houses/Slytherine/Acting.png",
        title: "Acting",
        description: `> Acting is the craft of portraying characters and bringing stories to life. Actors use emotions, expressions, and gestures to create compelling performances.
        
        > It requires skills such as voice modulation, body language, and improvisation. Training helps actors refine their ability to engage audiences authentically.
        
        > Acting is performed in theater, film, television, and digital media. Each medium requires unique approaches to character development and storytelling.
        
        > It helps individuals develop empathy, communication, and confidence. Understanding different perspectives enhances both personal and professional relationships.
        
        >Actors collaborate with directors, writers, and fellow performers. Teamwork and dedication are essential in creating successful productions.
        
        `
    },
    {
        image: "/houses/Slytherine/TheatreArt.png",
        title: "Theatre Art",
        description: `> Theatre art is a multidisciplinary field combining drama, music, set design, and storytelling. It creates immersive live performances that captivate audiences.
        
        > It engages audiences with real-time storytelling, requiring precise execution. Every element, from acting to lighting, contributes to the overall impact.
        
        > Theatre encompasses various styles, including classical, contemporary, and experimental. Each style provides unique ways of expressing narratives and themes.
    
        > It has cultural and historical significance, preserving traditions and societal themes. Many theatrical works reflect political and social movements throughout history.
        
        > Theatre encourages teamwork, creativity, and innovation. Actors, directors, designers, and technicians work together to bring artistic visions to life.
        
        `
    }
]

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0)

    return (
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 border-2 border-[#0B2919] shadow-lg shadow-[#0B2919]/100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative aspect-square rounded-lg overflow-hidden transition-opacity duration-300">
                    <Image
                        src={slides[currentSlide].image || "/placeholder.svg"}
                        alt={slides[currentSlide].title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="text-white space-y-6">
                    <h2 className="text-4xl font-light text-center">{slides[currentSlide].title}</h2>
                    <div className="space-y-4 text-gray-300">
                        <p className="font-light whitespace-pre-line">{slides[currentSlide].description}</p>
                    </div>
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            currentSlide === index ? "bg-white w-4" : "bg-gray-600",
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    )
}
