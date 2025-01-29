"use client"

import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const carouselItems = [
    {
        title: "Robotics",
        shortContent: "Explore the magical world of intelligent machines",
        fullContent:
            "Dive deep into the realm of Robotics, where Ravenclaw ingenuity meets cutting-edge technology. Learn about AI, machine learning, and how these magical contraptions are shaping our future.",
        icon: "🤖",
    },
    {
        title: "Hardware",
        shortContent: "Craft the physical foundations of magical technology",
        fullContent:
            "Discover the art of Hardware creation, from enchanted circuit boards to mystical processors. Uncover the secrets of building devices that bridge the magical and Muggle worlds.",
        icon: "🔧",
    },
    {
        title: "Science",
        shortContent: "Unravel the mysteries of the magical universe",
        fullContent:
            "Embark on a journey through magical Scientific discovery. From Potions to Astronomy, explore how Ravenclaw wisdom contributes to our understanding of both magical and natural phenomena.",
        icon: "🔬",
    },
    {
        title: "Arithmancy",
        shortContent: "Master the magical art of numbers and predictions",
        fullContent:
            "Delve into the complex world of Arithmancy, where numbers hold the key to magical predictions. Learn how this ancient art intersects with modern data science and probability theory.",
        icon: "🔢",
    },
    {
        title: "Magical Theory",
        shortContent: "Understand the fundamental laws of magic",
        fullContent:
            "Explore the theoretical underpinnings of magic itself. From spell creation to the nature of magical energy, uncover the intellectual foundations that drive magical innovation.",
        icon: "📚",
    },
]

const MagicalCarousel = () => {
    const [expandedIndex, setExpandedIndex] = useState(null)
    const carouselRef = useRef(null)
    const cardsRef = useRef([])

    useEffect(() => {
        const carousel = carouselRef.current
        const cards = cardsRef.current

        if (carousel && cards.length > 0) {
            gsap.to(carousel, {
                x: `-${(cards.length - 1) * 100}%`,
                ease: "none",
                scrollTrigger: {
                    trigger: carousel,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (cards.length - 1),
                    end: () => `+=${carousel.offsetWidth}`,
                },
            })

            cards.forEach((card, index) => {
                gsap.to(card, {
                    rotateY: () => (index % 2 === 0 ? 5 : -5),
                    rotateX: () => (index % 2 === 0 ? 2 : -2),
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: gsap.getById("carouselAnim"),
                        start: "left right",
                        end: "right left",
                        scrub: true,
                    },
                })
            })
        }
    }, [])

    const handleCardClick = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index)
    }

    return (
        <div className="w-full overflow-x-hidden py-20 bg-gradient-to-b from-[#0A1828] to-[#0F2D4A]">
            <div ref={carouselRef} className="flex gap-8 px-4">
                {carouselItems.map((item, index) => (
                    <div
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                        className={`flex-shrink-0 w-80 h-96 bg-[#1A3C5A] rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-105 ${expandedIndex === index ? "w-96 h-[28rem]" : ""
                            }`}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className="p-6 h-full flex flex-col">
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="text-2xl font-bold mb-2 text-[#E2A331]">{item.title}</h3>
                            <p className="text-[#B0C4DE] mb-4">{expandedIndex === index ? item.fullContent : item.shortContent}</p>
                            {expandedIndex !== index && (
                                <div className="mt-auto text-[#4A90E2] hover:text-[#E2A331] transition-colors duration-200">
                                    Click to learn more
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MagicalCarousel

