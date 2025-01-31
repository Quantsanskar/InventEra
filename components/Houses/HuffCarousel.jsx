"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const slides = [
    {
        image: "/houses/HufflePuff/Ui-Ux.png",
        title: "Ui/Ux",
        description: "efwkfniwnfwnfwjnfijwjqwjwje wnjenjwnvwfwenfnfenieniene nienfienfeniefenfnenef",
    },
    {
        image: "/houses/HufflePuff/Ui-Ux.png",
        title: "Graphic Design",
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
]

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const totalSlides = slides.length

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides)
        }, 5000)

        return () => clearInterval(interval)
    }, [totalSlides])

    return (
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 border-2 border-[#A26427] shadow-lg shadow-[#A26427]/20">
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
                        <p className="font-light">{slides[currentSlide].description}</p>
                    </div>
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
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