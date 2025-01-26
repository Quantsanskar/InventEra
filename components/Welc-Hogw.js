"use client"

import { useState, useEffect } from "react"

const FloatingWord = ({ children, delay, top, left, size, isMobile }) => {
  return (
    <div
      className={`absolute transition-all duration-500 text-white font-semibold
        ${size === "small" ? "text-sm md:text-base" : size === "medium" ? "text-base md:text-lg" : "text-lg md:text-xl"}`}
      style={{
        top: `${isMobile ? top.sm : top.md}%`,
        left: `${isMobile ? left.sm : left.md}%`,
        opacity: 0,
        animation: `float 3s ease-in-out ${delay}s infinite alternate, fadeIn 1s ease-in-out ${delay}s forwards`,
      }}
    >
      {children}
    </div>
  )
}

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
        { text: "Courage", top: { sm: 10, md: 15 }, left: { sm: 10, md: 25 }, size: "small" },
        { text: "Bravery", top: { sm: 25, md: 35 }, left: { sm: 70, md: 75 }, size: "medium" },
        { text: "Honor", top: { sm: 40, md: 50 }, left: { sm: 65, md: 75 }, size: "small" },
        { text: "Strength", top: { sm: 55, md: 66 }, left: { sm: 50, md: 60 }, size: "small" },
        { text: "Noble", top: { sm: 70, md: 40 }, left: { sm: 60, md: 45 }, size: "medium" },
      ],
      svg: "/reference/gryffindor-crest.svg",
      gradient: "linear-gradient(to bottom, #FFD700, #8B0000)",
    },
    {
      words: [
        { text: "Ambition", top: { sm: 15, md: 20 }, left: { sm: 20, md: 30 }, size: "large" },
        { text: "Cunning", top: { sm: 35, md: 40 }, left: { sm: 65, md: 70 }, size: "medium" },
        { text: "Power", top: { sm: 55, md: 60 }, left: { sm: 15, md: 25 }, size: "large" },
        { text: "Legacy", top: { sm: 65, md: 70 }, left: { sm: 60, md: 65 }, size: "medium" },
        { text: "Pride", top: { sm: 30, md: 35 }, left: { sm: 40, md: 45 }, size: "small" },
      ],
      svg: "/reference/slytherin-crest.svg",
      gradient: "linear-gradient(to bottom, #1a472a, #2a623d)",
    },
    {
      words: [
        { text: "Wisdom", top: { sm: 20, md: 25 }, left: { sm: 15, md: 20 }, size: "large" },
        { text: "Learning", top: { sm: 40, md: 45 }, left: { sm: 70, md: 75 }, size: "medium" },
        { text: "Wit", top: { sm: 65, md: 70 }, left: { sm: 25, md: 30 }, size: "small" },
        { text: "Knowledge", top: { sm: 60, md: 65 }, left: { sm: 55, md: 60 }, size: "large" },
        { text: "Creativity", top: { sm: 25, md: 30 }, left: { sm: 45, md: 50 }, size: "medium" },
      ],
      svg: "/reference/ravenclaw-crest.svg",
      gradient: "linear-gradient(to bottom, #0e1a40, #222f5b)",
    },
    {
      words: [
        { text: "Loyalty", top: { sm: 15, md: 16 }, left: { sm: 10, md: 14 }, size: "small" },
        { text: "Patience", top: { sm: 30, md: 36 }, left: { sm: 15, md: 6 }, size: "small" },
        { text: "Justice", top: { sm: 45, md: 52 }, left: { sm: 65, md: 70 }, size: "small" },
        { text: "Kindness", top: { sm: 60, md: 38 }, left: { sm: 55, md: 65 }, size: "small" },
        { text: "Hard Work", top: { sm: 70, md: 64 }, left: { sm: 70, md: 68 }, size: "small" },
      ],
      svg: "/reference/hufflepuff-crest.svg",
      gradient: "linear-gradient(to bottom, #ecb939, #f0c75e)",
    },
    {
      words: [
        { text: "Rebirth", top: { sm: 15, md: 20 }, left: { sm: 10, md: 15 }, size: "large" },
        { text: "Renewal", top: { sm: 35, md: 40 }, left: { sm: 70, md: 75 }, size: "medium" },
        { text: "Healing", top: { sm: 55, md: 60 }, left: { sm: 20, md: 25 }, size: "small" },
        { text: "Immortality", top: { sm: 70, md: 75 }, left: { sm: 60, md: 65 }, size: "medium" },
        { text: "Hope", top: { sm: 40, md: 45 }, left: { sm: 40, md: 45 }, size: "large" },
      ],
      svg: "/reference/phoenix-crest.svg",
      gradient: "linear-gradient(to bottom, #FFA500, #FF4500)",
    },
  ]

  // Background images for each house
  const bgImages = [
    "url(/reference/Gryffindor-bg.png)",
    "url(/reference/Slytherine-bg.png)",
    "url(/reference/RavenClaw-bg.png)",
    "url(/reference/HufflePuff-bg.png)",
    "url(/reference/Phoenix-bg.png)", // Add this line
  ]

  return (
    <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between">
      {/* Navigation buttons */}
      <div
        className={`flex flex-wrap ${isMobile ? "flex-row justify-center w-full gap-2 top-1/2 mt-[30%] mb-4" : "flex-row lg:justify-center lg:mt-[30%] md:mt-[-2%] gap-2 fixed lg:left-[-3%] md:left-[3rem] md:gap-6 lg:gap-4 -translate-y-1/2"}`}
      >
        <div className="flex w-full justify-center gap-2 md:gap-6 lg:gap-4 mb-2">
          {items.slice(0, 3).map((_, index) => (
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
              className={`w-20 h-20 md:w-36 md:h-36 lg:w-32 lg:h-32 rounded-full transition-all duration-500 hover:scale-110 focus:outline-none 
                ${index === activeIndex ? "scale-110 ring-4 ring-opacity-50 ring-white" : "opacity-70"}`}
              aria-label={`View item ${index + 1}`}
            />
          ))}
        </div>
        <div className="flex w-full justify-center gap-2 md:gap-6 lg:gap-4">
          {items.slice(3).map((_, index) => (
            <button
              key={index + 3}
              onClick={() => handleButtonClick(index + 3)}
              style={{
                backgroundImage: bgImages[index + 3],
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow:
                  index + 3 === activeIndex
                    ? `0 0 30px rgba(222, 219, 210, 0.3), 
                     inset 0 0 20px rgba(255, 255, 255, 0.2)`
                    : "inset 0 0 10px rgba(0, 0, 0, 0.3)",
                border: "3px solid rgba(222, 219, 210, 0.3)",
              }}
              className={`w-20 h-20 md:w-36 md:h-36 lg:w-36 lg:h-36 rounded-full transition-all duration-500 hover:scale-110 focus:outline-none 
                ${index + 3 === activeIndex ? "scale-110 ring-4 ring-opacity-50 ring-white" : "opacity-70"}`}
              aria-label={`View item ${index + 4}`}
            />
          ))}
        </div>
      </div>

      {/* Rotating Carousel */}
      <div
        className={`${isMobile ? "w-full h-full mr-[3rem]" : "fixed right-2 bottom-4 lg:bottom-0 h-full md:w-[30vw] md:h-[8vw] lg:w-[43vw] xl:w-[48vw] 2xl:w-[52vw]  3xl:w-[56vw]"}`}
      >
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
                    width: isActive ? (isMobile ? "310px" : "560px") : isMobile ? "240px" : "400px",
                    height: isActive ? (isMobile ? "310px" : "560px") : isMobile ? "240px" : "400px",
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
                  {/* {houseContent[index].words.map((word, i) => (
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
                  ))} */}

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

export default function WelcomePage() {
  useEffect(() => {
    // Load Irish Grover font
    const font = new FontFace("Irish Grover", "url(https://fonts.googleapis.com/css2?family=Irish+Grover&display=swap)")
    font.load().then(() => {
      document.fonts.add(font)
    })
  }, [])

  const carouselItems = [
    {
      title: "GRYFFINDOR",
      words: ["Courage", "Bravery", "Honor", "Strength", "Noble"],
    },
    {
      title: "SLYTHERIN",
      words: ["Ambition", "Cunning", "Power", "Legacy", "Pride"],
    },
    {
      title: "RAVENCLAW",
      words: ["Wisdom", "Learning", "Wit", "Knowledge", "Creativity"],
    },
    {
      title: "HUFFLEPUFF",
      words: ["Loyalty", "Patience", "Justice", "Kindness", "Hard Work"],
    },
    {
      title: "PHOENIX",
      words: ["Rebirth", "Renewal", "Healing", "Immortality", "Hope"],
    },
  ]

  return (
    <main
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: "url(/reference/Gradient1.png)",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center pt-4 md:pt-10">
        <div
          className="rounded-lg border border-[#FEFEFE] flex flex-col items-center relative"
          style={{
            width: "95%",
            height: "95vh",
            backgroundColor: "rgba(30, 22, 42, 0.65)",

            backdropFilter: "blur(2px)",
          }}
        >
          <h1
            className="text-center mt-6 lg:ml-[-28rem] text-[40px] md:text-[68px] lg:text-6xl"
            style={{
              fontFamily: "Irish Grover, cursive",
              fontWeight: 400,
              lineHeight: "1.2",
              color: "#DEDBD2",
              filter: "drop-shadow(5px 7px 4px rgba(0, 0, 0, 0.58))",
            }}
          >
            THE HOUSES OF NIGHT
          </h1>
          <RotatingCarousel items={carouselItems} />
        </div>
      </div>
    </main>
  )
}

