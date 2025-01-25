"use client"

import { useEffect } from "react"
import RotatingCarousel from "../components/CircularCarousel"

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
  ]

  return (
    <main
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: "url(/reference/hogwarts_bg2.jpg)",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center pt-4 md:pt-10">
        <div
          className="rounded-lg border border-[#FEFEFE] flex flex-col items-center relative"
          style={{
            width: "95%",
            height: "95vh",
            backgroundColor: "#676767A6",
            backdropFilter: "blur(2px)",
          }}
        >
          <h1
            className="text-center mt-2 md:mt-0 text-3xl md:text-5xl lg:text-[60px]"
            style={{
              fontFamily: "Irish Grover, cursive",
              fontWeight: 400,
              lineHeight: "1.2",
              color: "#DEDBD2",
              filter: "drop-shadow(5px 7px 4px rgba(0, 0, 0, 0.58))",
            }}
          >
            THE HOUSE OF NIGHT
          </h1>
          <RotatingCarousel items={carouselItems} />
        </div>
      </div>
    </main>
  )
}

