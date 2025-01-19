'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

export default function NightPoster() {
    const bottomSvgsRef = useRef([])

    useEffect(() => {
        const elements = bottomSvgsRef.current.filter(Boolean)

        const tl = gsap.timeline({
            repeat: -1,
            defaults: { duration: 2, ease: "power2.inOut" }
        })

        // Initial positions
        gsap.set(elements, {
            x: (i) => [-300, 0, 300][i],
            scale: (i) => i === 1 ? 1.2 : 1
        })

        // Create the rotation animation
        tl.to(elements, {
            x: (i) => {
                const positions = [-300, 0, 300]
                return positions[(i + 1) % 3]
            },
            scale: (i) => {
                const nextPos = (i + 1) % 3
                return nextPos === 1 ? 1.2 : 1
            }
        })

        return () => tl.kill()
    }, [])

    return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center p-8">
            <div className="w-full max-w-5xl space-y-16">
                {/* Title Section */}
                <div className="text-center">
                    <div className="w-full max-w-[600px] mx-auto">
                        {/* Place your imported SVG here */}
                        <Image 
                            src="/reference/The Nights _ S 1.svg"  // Update this path
                            alt="The Nights: S1"
                            width={600}
                            height={150}
                        />
                    </div>
                </div>

                {/* SVG Container */}
                <div className="relative h-[200px]">
                    {/* Bottom rotating SVGs */}
                    <div className="absolute bottom-0 left-0 right-0 h-[200px] flex items-center justify-center">
                        <Image
                                                           src="/reference/WHO ARE WE.png"
                                                           height="400"
                                                           width="400"
                                                           className="max-w-[95%] ml-2 sm:max-w-[85%] sm:ml-4 md:max-w-[75%] md:ml-[-40px] lg:max-w-[65%] lg:ml-[-160px] xl:max-w-[60%] xl:ml-[-240px] 2xl:max-w-[55%] 2xl:ml-[-320px] h-auto object-contain rounded-xl group-hover/card:shadow-xl"
                                                           alt="Who Are We?"
                                                       />
                                                       <Image
                                                           src="/reference/_.png"
                                                           height="400"
                                                           width="400"
                                                           className="max-w-[60%] lg:ml-[-280px] max-h-[200px] ml-[-60px] mt-[200px] lg:mt-[100px] object-contain rounded-xl group-hover/card:shadow-xl"
                                                           alt="Who Are We?"
                                                       />
                       
                    </div>
                </div>
            </div>
        </div>
    )
}
