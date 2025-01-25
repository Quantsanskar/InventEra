"use client"

import { useState, useEffect } from "react"
import FloatingWord from "./FloatingWord"

const RotatingCarousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleButtonClick = (index) => {
    setActiveIndex(index)
  }

  // House-specific content with responsive positioning
  const houseContent = [
    {
      words: [
        { text: "", top: { sm: 10, md: 15 }, left: { sm: 10, md: 25 }, size: "small" },
        { text: "", top: { sm: 25, md: 35 }, left: { sm: 70, md: 75 }, size: "medium" },
        { text: "", top: { sm: 40, md: 50 }, left: { sm: 65, md: 75 }, size: "small" },
        { text: "", top: { sm: 55, md: 66 }, left: { sm: 50, md: 60 }, size: "small" },
        { text: "", top: { sm: 30, md: 36 }, left: { sm: 15, md: 20 }, size: "medium" },
        { text: "", top: { sm: 45, md: 50 }, left: { sm: 5, md: 6 }, size: "small" },
        { text: "", top: { sm: 60, md: 56 }, left: { sm: 20, md: 6 }, size: "small" },
        { text: "", top: { sm: 70, md: 40 }, left: { sm: 60, md: 45 }, size: "medium" },
      ],
      svg: "/reference/none.svg",
      gradient: "linear-gradient(to bottom, #FFD700, #8B0000)",
    },
    {
      words: [
        { text: "", top: { sm: 15, md: 20 }, left: { sm: 20, md: 30 }, size: "large" },
        { text: "", top: { sm: 35, md: 40 }, left: { sm: 65, md: 70 }, size: "medium" },
        { text: "", top: { sm: 55, md: 60 }, left: { sm: 15, md: 25 }, size: "large" },
        { text: "", top: { sm: 65, md: 70 }, left: { sm: 60, md: 65 }, size: "medium" },
        { text: "", top: { sm: 30, md: 35 }, left: { sm: 40, md: 45 }, size: "small" },
      ],
      svg: "/reference/slytherin-crest.svg",
      gradient: "linear-gradient(to bottom, #1a472a, #2a623d)",
    },
    {
      words: [
        { text: "", top: { sm: 20, md: 25 }, left: { sm: 15, md: 20 }, size: "large" },
        { text: "", top: { sm: 40, md: 45 }, left: { sm: 70, md: 75 }, size: "medium" },
        { text: "", top: { sm: 65, md: 70 }, left: { sm: 25, md: 30 }, size: "small" },
        { text: "", top: { sm: 60, md: 65 }, left: { sm: 55, md: 60 }, size: "large" },
        { text: "", top: { sm: 25, md: 30 }, left: { sm: 45, md: 50 }, size: "medium" },
      ],
      svg: "/reference/ravenclaw-crest.svg",
      gradient: "linear-gradient(to bottom, #0e1a40, #222f5b)",
    },
    {
      words: [
        { text: "", top: { sm: 50, md: 56 }, left: { sm: 5, md: 7 }, size: "small" },
        { text: "", top: { sm: 55, md: 60 }, left: { sm: 20, md: 7 }, size: "small" },
        { text: "", top: { sm: 15, md: 16 }, left: { sm: 10, md: 14 }, size: "small" },
        { text: "", top: { sm: 20, md: 16 }, left: { sm: 45, md: 50 }, size: "small" },
        { text: "", top: { sm: 30, md: 36 }, left: { sm: 15, md: 6 }, size: "small" },
        { text: "", top: { sm: 35, md: 40 }, left: { sm: 30, md: 6 }, size: "small" },
        { text: "", top: { sm: 40, md: 44 }, left: { sm: 45, md: 6 }, size: "small" },
        { text: "", top: { sm: 45, md: 52 }, left: { sm: 65, md: 70 }, size: "small" },
        { text: "", top: { sm: 50, md: 56 }, left: { sm: 80, md: 65 }, size: "small" },
        { text: "", top: { sm: 60, md: 38 }, left: { sm: 55, md: 65 }, size: "small" },
        { text: "", top: { sm: 70, md: 64 }, left: { sm: 70, md: 68 }, size: "small" },
      ],
      // svg: "/reference/hermione.png",
      gradient: "linear-gradient(to bottom, #ecb939, #f0c75e)",
    },
  ]

  // Background images for each house
  const bgImages = [
    "url(/reference/Gryffindor-bg.png)",
    "url(/reference/Slytherine-bg.png)",
    "url(/reference/RavenClaw-bg.png)",
    "url(/reference/HufflePuff-bg.png)",
  ]

  return (
    <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-4 md:p-8">
      {/* Navigation buttons */}
      <div
        className={`flex ${isMobile ? "flex-row justify-center w-full mt-12 mb-4" : "flex-col gap-8 fixed lg:left-[6rem] md:left-[3rem] top-1/2 -translate-y-1/2"}`}
      >
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
            className={`w-20 h-20 md:w-24 md:h-24 rounded-full transition-all duration-500 hover:scale-110 focus:outline-none 
              ${index === activeIndex ? "scale-110 ring-4 ring-opacity-50 ring-white" : "opacity-70"}`}
            aria-label={`View item ${index + 1}`}
          />
        ))}
      </div>

      {/* Rotating Carousel */}
      <div className={`${isMobile ? "w-full h-[60vh]" : "fixed bottom-4 right-8 w-[76vw] h-[76vh]"} overflow-hidden`}>
        <div className="relative w-full h-full">
          {items.map((item, index) => {
            const angle = ((index - activeIndex + items.length) % items.length) * (360 / items.length)
            const isActive = index === activeIndex
            return (
              <div
                key={index}
                className={`absolute right-0 bottom-0 transition-all duration-700 ease-in-out ${
                  isActive ? "z-10 opacity-100" : "opacity-30"
                }`}
                style={{
                  transform: `rotate(${angle}deg) translateX(${isActive ? "0px" : isMobile ? "100px" : "200px"}) rotate(-${angle}deg)`,
                }}
              >
                <div
                  className={`rounded-full transition-all duration-500 flex items-center justify-center relative overflow-hidden`}
                  style={{
                    width: isActive ? (isMobile ? "310px" : "450px") : isMobile ? "240px" : "400px",
                    height: isActive ? (isMobile ? "310px" : "450px") : isMobile ? "240px" : "400px",
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
                    <FloatingWord
                      key={i}
                      delay={i * 0.5}
                      top={word.top}
                      left={word.left}
                      size={word.size}
                      isMobile={isMobile}
                    >
                      {word.text}
                    </FloatingWord>
                  ))}

                  {/* Central content */}
                  <div className="relative z-10 flex flex-col items-center">
                    <h2
                      className={`text-3xl md:text-6xl mt-12 md:mt-28 transition-all duration-500`}
                      style={{
                        fontFamily: "Irish Grover, cursive",
                        background: houseContent[index].gradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                        transform: `scale(${isActive ? 1.1 : 1})`,
                      }}
                    >
                      {/* {item.title} */}
                    </h2>
                    {/* House crest SVG */}
                    <div
                      className={`w-40 h-40 md:w-80 md:h-80 transition-all duration-500 transform`}
                      style={{
                        backgroundImage: `url(${houseContent[index].svg})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        filter: "drop-shadow(0 0 10px rgba(0,0,0,0.5))",
                        transform: `scale(${isActive ? 1.1 : 1}) translateY(20px)`,
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

