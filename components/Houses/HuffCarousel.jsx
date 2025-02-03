"use client"

import { useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"


const slides = [
    {
        image: "/houses/HufflePuff/Ui-Ux.png",
        title: "UI/UX",
        description: "efwkfniwnfwnfwjnfijwjqwjwje wnjenjwnvwfwenfnfenieniene nienfienfeniefenfnenef",
    },
    {
        image: "/houses/HufflePuff/Ui-Ux.png",
        title: "Graphic Design",
        description: "efwkfniwnfwnfwjnfijwjqwjwje wnjenjwnvwfwenfnfenieniene nienfienfeniefenfnenef",
    },
    {
        image: "/houses/HufflePuff/VideoEditing.png",
        title: "Motion Graphic",
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

export default function Carousel({ 
    currentSlide, 
    setCurrentSlide 
  }) {
    if (!slides || slides.length === 0) {
      return <div className="text-white">No slides available</div>;
    }
  
    const totalSlides = slides.length
  
    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     setCurrentSlide(prev => totalSlides > 0 ? (prev + 1) % totalSlides : 0)
    //   }, 5000)
  
    //   return () => clearInterval(interval)
    // }, [totalSlides, setCurrentSlide])
  
    return (
      <div 
        id="carousel"
        className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 border-2 border-[#A26427] shadow-lg shadow-[#A26427]/20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-square rounded-lg overflow-hidden transition-opacity duration-300">
            <Image
              src={slides[currentSlide]?.image || "/placeholder.svg"}
              alt={slides[currentSlide]?.title || "Slide image"}
              fill
              className="object-cover"
              priority
            />
          </div>
  
          <div className="text-white space-y-6">
            <h2 className="text-4xl font-light text-center">
              {slides[currentSlide]?.title || "Slide title"}
            </h2>
            <div className="space-y-4 text-gray-300">
              <p className="font-light">
                {slides[currentSlide]?.description || "Slide description"}
              </p>
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