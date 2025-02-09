"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { Star, Dot } from "lucide-react"
import Tagline from "../Tagline"

const Home = () => {
  const containerRef = useRef(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 900], [1, 0])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [cursorX, cursorY]) // Added cursorX and cursorY as dependencies

  // const springConfig = { stiffness: 1000, damping: 100 }
  // const cursorXSpring = useSpring(cursorX, springConfig)
  // const cursorYSpring = useSpring(cursorY, springConfig)

  const titleVariants = {
    hidden: { opacity: 0, y: 200, scale: 1.2 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 2,
        ease: [0.33, 1, 0.68, 1],
        opacity: { duration: 2.5 },
        scale: { duration: 2.2 },
      },
    },
  }

  // const taglineVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       delay: 1.5,
  //       duration: 1.5,
  //       ease: [0.33, 1, 0.68, 1],
  //     },
  //   },
  // }

  const backgroundVariants = {
    hidden: { opacity: 0.3, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 3, ease: "easeOut" },
    },
  }

  const floatingFirefliesVariants = {
    animate: (i) => ({
      y: [0, -10, 0],
      x: [0, i * 5, 0],
      opacity: [0.2, 1, 0.2],
      scale: [1, 1.2, 1],
      transition: {
        duration: 8 + i * 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    }),
  }

  return (
    <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-[#372e29] mb-16">
      {/* Animated Background */}
      <motion.div variants={backgroundVariants} initial="hidden" animate="visible" className="absolute inset-0">
        <motion.div
          animate={{
            backgroundPosition: `${mousePosition.x * 0.005}px ${mousePosition.y * 0.005}px`,
          }}
          className="absolute inset-0 bg-gradient-to-b from-[#372e29]/80 via-[#5c4f3c]/70 to-[#372e29]"
          style={{
            backgroundImage: `url(${encodeURI("/houses//Gryffindor/Gryff-Hero-Bg.png/")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 100,
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-[#372e29] via-transparent to-transparent"
        />
        <div className="absolute inset-0 bg-black opacity-70" />
      </motion.div>

      {/* Floating Fireflies */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={floatingFirefliesVariants}
            animate="animate"
            style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <Dot size={Math.random() * 45 + 3} color="#E4080A" fill="#E4080A" />
          </motion.div>
        ))}
      </motion.div>

      {/* Content Container */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full h-screen flex flex-col items-center justify-center"
      >
        {/* Main Title with Animation */}
        <motion.div variants={titleVariants} initial="hidden" animate="visible" className="relative mb-8">
          <h1
            className="font-bold text-3xl md:text-7xl lg:text-8xl text-center"
            style={{ fontFamily: "Irish Grover, cursive" }}
          >
            {[
              "W",
              "e",
              "l",
              "c",
              "o",
              "m",
              "e",
              " ",
              "T",
              "o",
              " ",
              "G",
              "r",
              "y",
              "f",
              "f",
              "i",
              "n",
              "d",
              "o",
              "r",
              ].map((letter, index) => (
                           <motion.span
                             key={index}
                             className="inline-block hover-char"
                             style={{
                               animationDelay: `${index * 0.1}s`,
                               background: `linear-gradient(
                                135deg, 
                                rgb(255, 223, 0) 0%,
                                rgb(255, 193, 7) 25%,
                                rgb(139, 0, 0) 50%,
                                rgb(178, 34, 34) 75%,
                                rgb(220, 20, 60) 100%
                              )`,
                               WebkitBackgroundClip: "text",
                               backgroundClip: "text",
                               color: "transparent",
                               textShadow: `
            2px 2px 0 rgba(0, 0, 0, 0.3),
            0 0 20px rgba(255, 223, 0, 0.5),
            0 0 40px rgba(255, 193, 7, 0.3),
            0 0 60px rgba(178, 34, 34, 0.2)
          `,
                               filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.3))",
                             }}
                             whileHover={{
                               scale: 1.2,
                               rotate: Math.random() * 20 - 10,
                               transition: { duration: 0.3 },
                             }}
                           >
                             {letter === " " ? "\u00A0" : letter}
                           </motion.span>
                         ))}
                       </h1>
                     </motion.div>
             
                     {/* Animated Tagline */}
                     <Tagline text="Where hard work and loyalty forge unbreakable bonds." />
                     
                   </motion.div>
             
                   {/* Custom Cursor */}
                   {/* <motion.div
                     className="fixed w-6 h-6 rounded-full border-2 border-[#FFD700] pointer-events-none z-50 mix-blend-difference"
                     style={{
                       left: cursorXSpring,
                       top: cursorYSpring,
                     }}
                   /> */}
             
                   <style jsx global>{`
                     @import url('https://fonts.googleapis.com/css2?family=Irish+Grover&family=Cinzel:wght@400;700&display=swap');
             
                     .hover-char:hover {
                       transform: 
                         translateZ(20px) 
                         rotateX(10deg) 
                         rotateY(10deg);
                       background: linear-gradient(
                         135deg, 
                         #FFD700 0%,
                         #FFFFFF 50%,
                         #000000 100%
                       );
                       -webkit-background-clip: text;
                       background-clip: text;
                       text-shadow: 
                         2px 2px 0 rgba(0, 0, 0, 0.5),
                         4px 4px 0 rgba(255, 215, 0, 0.4),
                         0 0 20px rgba(255, 215, 0, 0.6),
                         0 0 40px rgba(255, 215, 0, 0.4),
                         0 0 60px rgba(255, 215, 0, 0.2);
                     }
                   `}</style>
                 </section>
               )
             }
             
             export default Home