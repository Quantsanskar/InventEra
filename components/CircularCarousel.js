"use client"

import { useState } from "react"
import FloatingWord from "./FloatingWord"

const RotatingCarousel = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(0)

    const handleButtonClick = (index) => {
        setActiveIndex(index)
    }

    // House-specific content
    const houseContent = [
        {
            words: [
                { text: "Courage", top: 15, left: 25, size: "large" },
                { text: "Bravery", top: 35, left: 75, size: "medium" },
                { text: "Honor", top: 65, left: 20, size: "medium" },
                { text: "Strength", top: 75, left: 70, size: "large" },
                { text: "Noble", top: 45, left: 45, size: "small" },
            ],
            svg: "/reference/harry.svg",
            gradient: "linear-gradient(to bottom, #FFD700, #8B0000)",
        },
        {
            words: [
                { text: "Ambition", top: 20, left: 30, size: "large" },
                { text: "Cunning", top: 40, left: 70, size: "medium" },
                { text: "Power", top: 60, left: 25, size: "large" },
                { text: "Legacy", top: 70, left: 65, size: "medium" },
                { text: "Pride", top: 35, left: 45, size: "small" },
            ],
            svg: "/reference/slytherin-crest.svg",
            gradient: "linear-gradient(to bottom, #1a472a, #2a623d)",
        },
        {
            words: [
                { text: "Wisdom", top: 25, left: 20, size: "large" },
                { text: "Learning", top: 45, left: 75, size: "medium" },
                { text: "Wit", top: 70, left: 30, size: "small" },
                { text: "Knowledge", top: 65, left: 60, size: "large" },
                { text: "Creativity", top: 30, left: 50, size: "medium" },
            ],
            svg: "/reference/ravenclaw-crest.svg",
            gradient: "linear-gradient(to bottom, #0e1a40, #222f5b)",
        },
        {
            words: [
                { text: "Loyalty", top: 20, left: 25, size: "large" },
                { text: "Patience", top: 40, left: 70, size: "medium" },
                { text: "Justice", top: 60, left: 30, size: "large" },
                { text: "Kindness", top: 75, left: 65, size: "medium" },
                { text: "Dedication", top: 35, left: 45, size: "small" },
            ],
            svg: "/reference/Hermione Granger 1.png",
            gradient: "linear-gradient(to bottom, #ecb939, #f0c75e)",
        },
    ]

    // Background images for each house
    const bgImages = [
        "url(/reference/Gryffindor-bg.png)",
        "url(/reference/Slytherin-bg.png)",
        "url(/reference/Ravenclaw-bg.png)",
        "url(/reference/HufflePuff-bg.png)",
    ]

    return (
        <div className="absolute inset-0 flex items-center justify-between p-8">
            {/* Larger buttons on the left */}
            <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-8">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleButtonClick(index)}
                        style={{
                            backgroundImage: bgImages[index],
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            boxShadow:
                                index === activeIndex
                                    ? `0 0 30px rgba(222, 219, 210, 0.3), 
                   inset 0 0 20px rgba(255, 255, 255, 0.2)`
                                    : "inset 0 0 10px rgba(0, 0, 0, 0.3)",
                            border: "3px solid rgba(222, 219, 210, 0.3)",
                        }}
                        className={`w-28 h-28 rounded-full transition-all duration-500 hover:scale-110 focus:outline-none 
              ${index === activeIndex ? "scale-110 ring-4 ring-opacity-50 ring-white" : "opacity-70"}`}
                        aria-label={`View item ${index + 1}`}
                    />
                ))}
            </div>

            {/* Rotating Carousel positioned bottom-right */}
            <div className="fixed bottom-4 overflow-hidden right-8 w-[76vw] h-[76vh]">
                <div className="relative w-full h-full">
                    {items.map((item, index) => {
                        const angle = ((index - activeIndex + items.length) % items.length) * (360 / items.length)
                        const isActive = index === activeIndex
                        return (
                            <div
                                key={index}
                                className={`absolute right-0 bottom-0 transition-all duration-700 ease-in-out ${isActive ? "z-10 opacity-100" : "opacity-30"
                                    }`}
                                style={{
                                    transform: `rotate(${angle}deg) translateX(${isActive ? "0px" : "200px"}) rotate(-${angle}deg)`,
                                }}
                            >
                                <div
                                    className={`rounded-full transition-all duration-500 flex items-center justify-center relative overflow-hidden`}
                                    style={{
                                        width: isActive ? "520px" : "400px",
                                        height: isActive ? "520px" : "400px",
                                        backgroundImage: bgImages[index],
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        boxShadow: isActive
                                            ? "0 25px 50px -12px rgba(0,0,0,0.7), inset 0 0 100px rgba(0,0,0,0.5)"
                                            : "0 10px 30px -12px rgba(0,0,0,0.6)",
                                        transform: `scale(${isActive ? 1 : 0.6})`,
                                    }}
                                >
                                    {/* Dark overlay with radial gradient */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: "radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
                                        }}
                                    />

                                    {/* Floating words */}
                                    {houseContent[index].words.map((word, i) => (
                                        <FloatingWord key={i} delay={i * 0.5} top={word.top} left={word.left} size={word.size}>
                                            {word.text}
                                        </FloatingWord>
                                    ))}

                                    {/* Central content */}
                                    <div className="relative z-10 flex flex-col items-center">
                                        <h2
                                            className="text-6xl mt-28  transition-all duration-500"
                                            style={{
                                                fontFamily: "Irish Grover, cursive",
                                                background: houseContent[index].gradient,
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                                                transform: `scale(${isActive ? 1.1 : 1})`,
                                            }}
                                        >
                                            {item.title}
                                        </h2>
                                        {/* House crest SVG */}
                                        <div
                                            className="w-80 h-80 transition-all duration-500 transform"
                                            style={{
                                                backgroundImage: `url(${houseContent[index].svg})`,
                                                backgroundSize: "contain",
                                                backgroundPosition: "center",
                                                backgroundRepeat: "no-repeat",
                                                filter: "drop-shadow(0 0 10px rgba(0,0,0,0.5))",
                                                transform: `scale(${isActive ? 1.1 : 1}) translateY(50px)`, // Shift downward
                                            }}
                                        />

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default RotatingCarousel

