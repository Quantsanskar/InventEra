"use client"

import { useEffect, useState } from "react"
export default function Home() {
  const [bgType, setBgType] = useState("image")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const heading = document.querySelector(".hero-heading")
    const tagline = document.querySelector(".hero-tagline")

    setLoaded(true)

    setTimeout(() => {
      tagline.classList.add("animate-fade-in")
    }, 2000)
  }, [])

  const BackgroundMedia = () => {
    switch (bgType) {
      case "video":
        return (
          <video autoPlay muted loop playsInline className="object-cover w-full h-full">
            <source src="/videos/Raven1.mp4" type="video/mp4" />
          </video>
        )

      case "image":
        return <img src="/images/Huff8.jpeg" alt="Ravenclaw Background" className="object-cover w-full h-full" />

      default:
        return null
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <BackgroundMedia />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <div className={`hero-heading-wrapper ${loaded ? "loaded" : ""}`}>
          <h1
            className="hero-heading text-5xl md:text-7xl font-bold mb-6 tracking-wide"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            {"Welcome to Ravenclaw".split("").map((char, index) => (
              <span
                key={index}
                className="inline-block hover-char"
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>

        <p
          className="hero-tagline opacity-0 text-xl md:text-2xl text-center max-w-2xl"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Where wit and wisdom shape the brightest minds of tomorrow.
        </p>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');
        
        .hero-heading-wrapper {
          position: relative;
          perspective: 1000px;
        }

        .hero-heading {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease-out;
        }

        .hero-heading-wrapper.loaded .hero-heading {
          opacity: 1;
          transform: translateY(0);
        }

        .hover-char {
          display: inline-block;
          transition: all 0.3s ease;
          animation: float-in 0.5s ease-out forwards;
          opacity: 0;
          color: #FFFFFF;
          text-shadow: 
            1px 1px 2px rgba(0, 102, 230, 0.3),
            -1px -1px 2px rgba(148, 107, 45, 0.3);
        }

        .hover-char:hover {
          transform: translateY(-5px);
          color: #F0F8FF;
          text-shadow: 
            2px 2px 4px rgba(0, 102, 230, 0.4),
            -2px -2px 4px rgba(148, 107, 45, 0.4);
        }

        .hero-tagline {
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        @keyframes float-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

