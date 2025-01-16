'use client'

import { motion } from 'framer-motion'

export default function WelcomeCard() {
  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] bg-gradient-to-br from-[#0A0A0A] via-[#121624] to-[#1B1E3C] flex items-center justify-center p-4">
      <motion.div 
        className="relative w-[95%] max-w-3xl rounded-[32px] bg-black/90 p-8 sm:p-10 md:p-12 backdrop-blur-sm"
        initial={{ 
          boxShadow: `
            0 0 100px -15px rgba(66, 71, 112, 0.3),
            0 0 50px -12px rgba(66, 71, 112, 0.3),
            0 0 25px -6px rgba(66, 71, 112, 0.3),
            0 0 15px -4px rgba(34, 211, 238, 0.2),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1)
          `,
        }}
        whileHover={{
          boxShadow: `
            0 0 100px -15px rgba(66, 71, 112, 0.4),
            0 0 50px -12px rgba(66, 71, 112, 0.4),
            0 0 25px -6px rgba(66, 71, 112, 0.4),
            0 0 15px -4px rgba(34, 211, 238, 0.6),
            0 0 65px -15px rgba(34, 211, 238, 0.5),
            inset 0 0 0 1px rgba(34, 211, 238, 0.4)
          `,
          scale: 1.01,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        <div className="text-center space-y-6 md:space-y-8">
          <p className="text-[1.35rem] sm:text-[1.75rem] md:text-[2rem] text-white/90 leading-[1.3] tracking-[-0.01em] px-2 sm:px-4 md:px-6">
            Hey! You've just landed at TheNights—the ultimate hub for creators and go-getters.
            Need support, ideas, or just good vibes?<br className="hidden sm:block" />
            We're here to help you grow and win. Let's do this!
          </p>
        </div>
      </motion.div>
    </div>
  )
}