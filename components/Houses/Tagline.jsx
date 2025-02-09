import React from "react"
import { motion } from "framer-motion"

const taglineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.5,
      duration: 1.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
}

const Tagline = ({ text }) => {
  return (
    <motion.p
      variants={taglineVariants}
      initial="hidden"
      animate="visible"
      className="text-xl md:text-2xl text-center max-w-2xl mx-auto px-4 text-white relative"
      style={{
        fontFamily: "Cinzel, serif",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(223, 23, 16, 0.4)",
      }}
    >
      {/* Falling Text Effect */}
      <motion.span
        className="inline-block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ opacity: 0, y: -20, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: 1.5 + index * 0.05,
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>

      {/* Animated Star */}
      <motion.span
        className="inline-block ml-2"
        style={{
          fontFamily: "Irish Grover, cursive",
          color: "#FFD700",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.6)",
        }}
        whileHover={{
          scale: 1.2,
          rotate: Math.random() * 20 - 10,
          transition: { duration: 0.3 },
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
          transition: {
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        ★
      </motion.span>
    </motion.p>
  )
}

export default Tagline