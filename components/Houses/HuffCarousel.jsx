"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"

const slides = [
    {
        image: "/houses/HufflePuff/Ui-Ux.png",
        title: "Ui/Ux & Graphic Design",
        description: "efwkfniwnfwnfwjnfijwjqwjwje wnjenjwnvwfwenfnfenieniene nienfienfeniefenfnenef",
    },
    {
        image: "/houses/HufflePuff/VideoEditing.png",
        title: "Video Editing",
        description: "efwkfniwnfwnfwjnfijwjqwjwje wnjenjwnvwfwenfnfenieniene nienfienfeniefenfnenef",
    },
    {
        image: "/houses/HufflePuff/PostProduction.png",
        title: "Post Production",
        description: "efwkfniwnfwnfwjnfijwjqwjwje wnjenjwnvwfwenfnfenieniene nienfienfeniefenfnenef",
    },
    {
        image: "/houses/HufflePuff/MusicProduction.png",
        title: "Music Production",
        description: "efwkfniwnfwnfwjnfijwjqwjwje wnjenjwnvwfwenfnfenieniene nienfienfeniefenfnenef",
    },
    {
        image: "/houses/HufflePuff/Blogging.png",
        title: "Blogs & Articles",
        description: "efwkfniwnfwnfwjnfijwjqwjwje wnjenjwnvwfwenfnfenieniene nienfienfeniefenfnenef",
    },
    // Add more slides as needed
]

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const totalSlides = slides.length
    const slideRef = useRef(null)
    const textRef = useRef(null)

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000) // Change slide every 5 seconds

        return () => clearInterval(interval)
    }, [nextSlide]) // Added nextSlide to dependencies

    useEffect(() => {
        // GSAP animations
        gsap.to(slideRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                gsap.to(slideRef.current, { opacity: 1, duration: 0.5 })
            },
        })

        gsap.from(textRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            delay: 0.2,
        })
    }, [currentSlide])

    return (
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl bg-[#1a1a1a] p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                <div ref={slideRef} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                        src={slides[currentSlide].image || "/placeholder.svg"}
                        alt={slides[currentSlide].title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div ref={textRef} className="text-white space-y-6">
                    <h2 className="text-4xl font-light text-center">{slides[currentSlide].title}</h2>
                    <div className="space-y-4 text-gray-300">
                        <p className="font-light">{slides[currentSlide].description}</p>
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

