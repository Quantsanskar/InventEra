"use client"

import React, { useState, useEffect, useRef } from "react"
import gsap from "gsap"

// Custom hook to get window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}

const SponsorsCarousel = () => {
  const [startIndex, setStartIndex] = useState(0)
  const carouselRef = useRef(null)
  const backgroundRef = useRef(null)
  const { width } = useWindowSize()

  const sponsorData = [
    {
      name: "Sponsor 1",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor1.jpg",
    },
    {
      name: "Sponsor 2",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor2.jpg",
    },
    {
      name: "Sponsor 3",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor3.jpg",
    },
    {
      name: "Sponsor 4",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor4.jpg",
    },
    {
      name: "Sponsor 5",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor5.jpg",
    },
    {
      name: "Sponsor 6",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor6.jpg",
    },
    {
      name: "Sponsor 7",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor7.jpg",
    },
    {
      name: "Sponsor 8",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor8.jpg",
    },
    {
      name: "Sponsor 9",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor9.jpg",
    },
    {
      name: "Sponsor 10",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor10.jpg",
    },
  ]

  const itemsToShow = width <= 640 ? 1 : width <= 1024 ? 3 : 5

  const nextSlide = () => {
    const tl = gsap.timeline()

    // Animate current slides out
    tl.to(carouselRef.current.children, {
      duration: 0.5,
      x: `-=${width / itemsToShow}`,
      ease: "power2.inOut",
    })

    // Update background with smooth transition
    tl.to(
      backgroundRef.current,
      {
        duration: 0.5,
        opacity: 0,
        ease: "power2.inOut",
        onComplete: () => {
          const nextIndex = (startIndex + 1) % sponsorData.length
          setStartIndex(nextIndex)
          gsap.to(backgroundRef.current, {
            duration: 0.5,
            opacity: 0.3,
            ease: "power2.inOut",
          })
        },
      },
      "-=0.5",
    )
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000)
    return () => clearInterval(interval)
  }, [startIndex])

  useEffect(() => {
    // Reset carousel position on resize
    setStartIndex(0)
    gsap.set(carouselRef.current.children, { x: 0 })
  }, [width])

  const visibleSponsors = [
    ...sponsorData.slice(startIndex, startIndex + itemsToShow + 2),
    ...sponsorData.slice(0, Math.max(0, startIndex + itemsToShow + 2 - sponsorData.length)),
  ]

  return (
    <div className="relative overflow-hidden flex justify-center items-center h-100 bg-black px-4 sm:px-6 lg:px-8 py-16">
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={backgroundRef}
          className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-30 scale-110"
          style={{ backgroundImage: `url(${visibleSponsors[0]?.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative container mx-auto">
        <div className="flex items-center overflow-hidden">
          <div className="w-full overflow-hidden">
            <div ref={carouselRef} className="flex gap-4">
              {visibleSponsors.map((sponsor, index) => {
                const isCenter = index === Math.floor((itemsToShow + 2) / 2)

                return (
                  <a
                    key={`${startIndex}-${index}`}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-none transition-all duration-500 ease-out transform 
                      ${isCenter ? "z-10 scale-110" : "z-0 scale-100"} 
                      hover:scale-105`}
                    style={{
                      flex: `1 1 ${isCenter ? "60%" : "20%"}`,
                      height: "375px",
                    }}
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={sponsor.imageUrl || "/placeholder.svg"}
                        alt={sponsor.name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-1/6 h-full bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/6 h-full bg-gradient-to-l from-black to-transparent pointer-events-none" />
    </div>
  )
}

export default SponsorsCarousel

