"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Search, Play } from "lucide-react"

export default function DemoPage() {
    const [activeSlide, setActiveSlide] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const carouselRef = useRef(null)

    const carouselItems = [
        {
            title: "HUFFLEPUFF",
            subtitle: "CREATIVE • 3D SUBMISSIONS",
            image: "/placeholder.svg?height=400&width=400",
            color: "#f59e0b",
        },
        {
            title: "GRYFFINDOR",
            subtitle: "ADVENTURE • GAME DESIGN",
            image: "/placeholder.svg?height=400&width=400",
            color: "#ef4444",
        },
        {
            title: "RAVENCLAW",
            subtitle: "STRATEGY • PUZZLE GAMES",
            image: "/placeholder.svg?height=400&width=400",
            color: "#3b82f6",
        },
        {
            title: "SLYTHERIN",
            subtitle: "STEALTH • DARK THEMES",
            image: "/placeholder.svg?height=400&width=400",
            color: "#10b981",
        },
    ]

    const projectItems = [
        {
            title: "Cozy Cafe",
            creator: "Shivanshu Singh",
            image: "/placeholder.svg?height=200&width=300",
        },
        {
            title: "Campfire Tales",
            creator: "Shivanshu Singh",
            image: "/placeholder.svg?height=200&width=300",
        },
        {
            title: "Pier View",
            creator: "Shivanshu Singh",
            image: "/placeholder.svg?height=200&width=300",
        },
        {
            title: "Space Journey",
            creator: "Shivanshu Singh",
            image: "/placeholder.svg?height=200&width=300",
        },
        {
            title: "City Nights",
            creator: "Shivanshu Singh",
            image: "/placeholder.svg?height=200&width=300",
        },
        {
            title: "Polar Friend",
            creator: "Shivanshu Singh",
            image: "/placeholder.svg?height=200&width=300",
        },
    ]

    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.clientX)
    }

    const handleTouchStart = (e) => {
        setIsDragging(true)
        setStartX(e.touches[0].clientX)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return
        const x = e.clientX
        const diff = startX - x

        if (diff > 50) {
            nextSlide()
            setIsDragging(false)
        } else if (diff < -50) {
            prevSlide()
            setIsDragging(false)
        }
    }

    const handleTouchMove = (e) => {
        if (!isDragging) return
        const x = e.touches[0].clientX
        const diff = startX - x

        if (diff > 50) {
            nextSlide()
            setIsDragging(false)
        } else if (diff < -50) {
            prevSlide()
            setIsDragging(false)
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleTouchEnd = () => {
        setIsDragging(false)
    }

    const nextSlide = () => {
        setActiveSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
        setActiveSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))
    }

    useEffect(() => {
        const carousel = carouselRef.current

        if (carousel) {
            carousel.addEventListener("mousedown", handleMouseDown)
            carousel.addEventListener("mousemove", handleMouseMove)
            carousel.addEventListener("mouseup", handleMouseUp)
            carousel.addEventListener("mouseleave", handleMouseUp)
            carousel.addEventListener("touchstart", handleTouchStart)
            carousel.addEventListener("touchmove", handleTouchMove)
            carousel.addEventListener("touchend", handleTouchEnd)

            return () => {
                carousel.removeEventListener("mousedown", handleMouseDown)
                carousel.removeEventListener("mousemove", handleMouseMove)
                carousel.removeEventListener("mouseup", handleMouseUp)
                carousel.removeEventListener("mouseleave", handleMouseUp)
                carousel.removeEventListener("touchstart", handleTouchStart)
                carousel.removeEventListener("touchmove", handleTouchMove)
                carousel.removeEventListener("touchend", handleTouchEnd)
            }
        }
    }, [isDragging, startX])

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Carousel Section */}
            <div
                ref={carouselRef}
                className="relative h-[400px] w-full overflow-hidden cursor-grab"
                style={{ perspective: "1000px" }}
            >
                <div className="relative h-full w-full">
                    {carouselItems.map((item, index) => {
                        // Calculate position based on active slide
                        const position = index - activeSlide
                        const zIndex = position === 0 ? 10 : 10 - Math.abs(position)
                        const opacity = position === 0 ? 1 : 0.7 - Math.abs(position) * 0.2
                        const scale = position === 0 ? 1 : 0.85 - Math.abs(position) * 0.05
                        const translateX = position * 20 + "%"
                        const translateZ = position === 0 ? 0 : -100 * Math.abs(position)
                        const rotateY = position * -15

                        return (
                            <div
                                key={index}
                                className="absolute top-0 left-0 w-full h-full transition-all duration-500 ease-out"
                                style={{
                                    transform: `translateX(${translateX}) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                                    opacity,
                                    zIndex,
                                }}
                            >
                                <div className="relative w-full h-full max-w-[500px] mx-auto rounded-xl overflow-hidden">
                                    <Image
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        priority={index === activeSlide}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                        <h2 className="text-xl font-bold">{item.title}</h2>
                                        <p className="text-sm text-gray-300">{item.subtitle}</p>
                                    </div>
                                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                        <Play className="w-5 h-5 text-white" fill="white" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Filter Section */}
            <div className="max-w-7xl mx-auto px-4 py-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                    <button className="px-4 py-1 rounded-full bg-white/10 text-sm hover:bg-white/20 transition-colors">
                        All
                    </button>
                    <button className="px-4 py-1 rounded-full bg-transparent text-sm hover:bg-white/10 transition-colors">
                        Intro
                    </button>
                    <button className="px-4 py-1 rounded-full bg-transparent text-sm hover:bg-white/10 transition-colors">
                        Software
                    </button>
                    <button className="px-4 py-1 rounded-full bg-transparent text-sm hover:bg-white/10 transition-colors">
                        Web
                    </button>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="pl-10 pr-4 py-2 rounded-full bg-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-white/30 w-[200px]"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectItems.map((project, index) => (
                    <div key={index} className="relative group rounded-xl overflow-hidden">
                        <div className="aspect-video relative">
                            <Image
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="font-medium text-sm">{project.creator}</h3>
                                <p className="text-xs text-gray-300">{project.title}</p>
                            </div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Play className="w-5 h-5 text-white" fill="white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

