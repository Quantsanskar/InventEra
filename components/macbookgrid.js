import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const MacbookScroll = ({ src }) => {
    const ref = useRef(null);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const getInitialScale = () => {
        if (dimensions.width < 480) return 0.25;
        if (dimensions.width < 640) return 0.35;
        if (dimensions.width < 768) return 0.5;
        return 1;
    };

    // Animation sequences
    const lidRotate = useTransform(
        scrollYProgress,
        [0, 0.2],
        [-90, 0]
    );

    const screenOpacity = useTransform(
        scrollYProgress,
        [0, 0.2],
        [0, 1]
    );

    // Image expand animation (only happens after lid is fully opened)
    const imageWidth = useTransform(
        scrollYProgress,
        [0.2, 0.3],
        ["100%", "120%"]  // Only expand to 120% after lid opens
    );

    const imageHeight = useTransform(
        scrollYProgress,
        [0.2, 0.3],
        ["100%", "120%"]  // Only expand to 120% after lid opens
    );

    return (
        <div ref={containerRef} className="w-full">
            <div
                ref={ref}
                className="min-h-[200vh] flex items-start justify-center py-0 md:py-40 [perspective:1000px] transform px-4 sm:px-0"
                style={{ scale: getInitialScale() }}
            >
                <div className="relative [perspective:1000px] sticky top-20">
                    {/* MacBook lid */}
                    <motion.div
                        style={{
                            rotateX: lidRotate,
                            transformOrigin: "bottom",
                            transformStyle: "preserve-3d",
                        }}
                        className="h-[8rem] sm:h-[10rem] md:h-[12rem] w-[20rem] sm:w-[26rem] md:w-[32rem] bg-gradient-to-b from-[#272729] to-[#0a0a0a] rounded-2xl p-2 relative"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 opacity-20">
                                <svg viewBox="0 0 24 24" fill="white">
                                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    {/* Screen */}
                    <motion.div
                        style={{
                            rotateX: lidRotate,
                            transformStyle: "preserve-3d",
                            transformOrigin: "top",
                        }}
                        className="h-[16rem] sm:h-[20rem] md:h-96 w-[20rem] sm:w-[26rem] md:w-[32rem] absolute inset-0 bg-[#010101] rounded-2xl p-2"
                    >
                        <motion.div
                            style={{ opacity: screenOpacity }}
                            className="absolute inset-0 bg-[#272729] rounded-lg overflow-hidden"
                        >
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black z-10">
                                <div className="absolute inset-0.5 rounded-full bg-[#272729]" />
                            </div>

                            {/* Image Container */}
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    width: imageWidth,
                                    height: imageHeight,
                                    left: "50%",
                                    top: "50%",
                                    translateX: "-50%",
                                    translateY: "-50%",
                                }}
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={src}
                                        alt="screen content"
                                        fill
                                        className="object-contain rounded-lg"
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* MacBook base with updated trackpad */}
                    <div className="h-[16rem] sm:h-[18rem] md:h-[22rem] w-[20rem] sm:w-[26rem] md:w-[32rem] bg-gradient-to-b from-[#272729] to-[#0a0a0a] rounded-2xl relative -z-10">
                        {/* Keyboard section remains the same */}
                        <div className="absolute inset-4 sm:inset-6 md:inset-8 top-2 sm:top-3 md:top-4">
                            <div className="flex justify-between px-2 sm:px-3 md:px-4 mb-1 sm:mb-2">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="w-3 sm:w-4 md:w-6 h-1 sm:h-1.5 bg-[#272729] rounded-sm" />
                                ))}
                            </div>

                            {[...Array(4)].map((_, row) => (
                                <div key={row} className="flex justify-between px-2 sm:px-3 md:px-4 mb-1 sm:mb-2">
                                    {[...Array(14)].map((_, i) => (
                                        <div key={i} className="w-4 sm:w-6 md:w-8 h-1 sm:h-1.5 md:h-2 bg-[#272729] rounded-sm" />
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Updated Trackpad with Register Button */}
                        <div
                            className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-[45%] h-20 sm:h-24 md:h-32 rounded-xl flex items-center justify-center overflow-hidden"
                            style={{
                                background: "linear-gradient(to bottom right, #272729, #1a1a1a)",
                                boxShadow: "0px 0px 1px 1px #ffffff10 inset, 0 0 2px rgba(255,255,255,0.05)",
                            }}
                        >
                            

                        </div>


                        <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-b from-[#272729] to-black" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MacbookScroll;