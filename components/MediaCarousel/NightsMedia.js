'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import Image from 'next/image'

const MediaCard = ({ card }) => {
    return (
        <motion.div
            className="relative shrink-0 mx-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
        >
            {/* Outer Glow Container */}
            <div className="p-4">
                {/* Card Frame with Glow */}
                <div
                    className="relative rounded-[24px] p-[1px] bg-black"
                    style={{
                        boxShadow: `
              0 0 50px -12px rgba(255, 255, 255, 0.1),
              0 0 30px -8px rgba(255, 255, 255, 0.1),
              0 0 20px -4px rgba(255, 255, 255, 0.1)
            `
                    }}
                >
                    {/* Main Card Container */}
                    <div className="w-[280px] h-[400px] sm:w-[320px] sm:h-[440px] rounded-[24px] overflow-hidden bg-neutral-900">
                        {/* Content Container */}
                        <div className="relative w-full h-full">
                            {/* User Header */}
                            <div className="absolute top-0 left-0 right-0 z-10 p-3 bg-gradient-to-b from-black/70 to-transparent">
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-800">
                                        <Image
                                            src={card.avatar || card.src}
                                            width={24}
                                            height={24}
                                            className="object-cover"
                                            alt="Avatar"
                                        />
                                    </div>
                                    <span className="text-white/90 text-sm font-medium">
                                        {card.username || 'thenights'}
                                    </span>
                                </div>
                            </div>

                            {/* Main Image */}
                            <div className="relative w-full h-full">
                                <Image
                                    src={card.src || "/placeholder.svg"}
                                    fill
                                    className="object-contain"
                                    alt={card.title || 'Team member'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const CrewCarousel = ({ cards = [] }) => {
    const controls = useAnimationControls()
    const containerRef = useRef(null)

    useEffect(() => {
        const startAnimation = async () => {
            if (!containerRef.current) return

            const containerWidth = containerRef.current.scrollWidth
            const viewportWidth = containerRef.current.offsetWidth

            await controls.start({
                x: [-viewportWidth, -containerWidth],
                transition: {
                    duration: 60, // Reduced speed by increasing duration
                    ease: "linear",
                    repeat: Infinity,
                }
            })
        }

        startAnimation()
    }, [controls])

    // Function to pause animation
    const handleMouseEnter = () => {
        controls.stop()
    }

    // Function to resume animation
    const handleMouseLeave = () => {
        const containerWidth = containerRef.current?.scrollWidth || 0
        const viewportWidth = containerRef.current?.offsetWidth || 0

        controls.start({
            x: [-viewportWidth, -containerWidth],
            transition: {
                duration: 60, // Keep the slow speed
                ease: "linear",
                repeat: Infinity,
            }
        })
    }

    // Double the cards array to create a seamless loop
    const extendedCards = [...cards, ...cards]

    return (
        <section className="py-20 bg-[#0A0A0A] overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-5xl font-bold text-white">ORGANISERS</h2>
                    <p className="text-2xl text-white/80">Get to know the faces of The Nights.</p>
                </div>

                <div className="relative w-full">
                    {/* Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#0A0A0A] to-transparent" />

                    {/* Carousel Container */}
                    <div
                        ref={containerRef}
                        className="relative overflow-hidden"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <motion.div
                            className="flex"
                            animate={controls}
                        >
                            {extendedCards.map((card, index) => (
                                <MediaCard key={index} card={card} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CrewCarousel
