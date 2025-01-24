"use client"

import { useEffect, useRef } from "react"
import styles from "../styles/welcome-section.module.css"

const houses = [
  {
    name: "Gryffindor",
    cover: "/reference/Gryffindor.gif",
    title: "/reference/harry.jpg",
    character: "/reference/harry.jpg",
  },
  {
    name: "Ravenclaw",
    cover: "/reference/Ravenclaw.gif",
    // title: "/images/ravenclaw-title.png",
    character: "/reference/Raven_team.jpg",
  },
  {
    name: "Hufflepuff",
    cover: "/reference/HufflePuff.gif",
    // title: "/images/hufflepuff-title.png",
    character: "/reference/Cedric.webp",
  },
  {
    name: "Slytherin",
    cover: "/reference/Slytherine.gif",
    // title: "/images/slytherin-title.png",
    character: "/reference/Alan.jpg",
  },
  {
    name: "Phoenix",
    cover: "/images/phoenix-cover.jpg",
    // title: "/images/phoenix-title.png",
    character: "/images/phoenix-character.webp",
  },
]

export default function WelcomeSection() {
  const sectionRef = useRef(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            animateElements()
            hasAnimatedRef.current = true
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const animateElements = () => {
    const letters = document.querySelectorAll(`.${styles.glowingText} span`)
    letters.forEach((letter, index) => {
      letter.style.animationDelay = `${index * 0.1}s`
      letter.classList.add(styles.animate)
    })

    const subheading = document.querySelector(`.${styles.subheading}`)
    subheading.classList.add(styles.animate)

    const cards = document.querySelectorAll(`.${styles.card}`)
    cards.forEach((card, index) => {
      card.style.animationDelay = `${(index + 1) * 0.2}s`
      card.classList.add(styles.animate)
    })
  }

  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className={styles.letter}>
        {char === " " ? "\u00A0" : char}
      </span>
    ))
  }

  return (
    <section ref={sectionRef} className={styles.welcomeSection}>
      <div className={styles.magicalOverlay}></div>
      <div className={styles.overlay}>
        <h1 className={styles.glowingText}>{splitText("Welcome to Hogwarts")}</h1>
        <h2 className={styles.subheading}>Discover Our Magical Houses</h2>
        <div className={styles.housesContainer}>
          {houses.map((house) => (
            <a href="#" key={house.name} className={styles.cardLink}>
              <div className={styles.card}>
                <div className={styles.wrapper}>
                  <img
                    src={house.cover || "/placeholder.svg"}
                    className={styles.coverImage}
                    alt={`${house.name} cover`}
                  />
                </div>
               
                <img
                  src={house.character || "/placeholder.svg"}
                  className={styles.character}
                  alt={`${house.name} character`}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
      
    </section>
  )
}

