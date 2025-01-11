"use client";
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

    // Dynamic scaling based on screen size
    const getInitialScale = () => {
        if (dimensions.width < 640) return 0.35;
        if (dimensions.width < 768) return 0.5;
        return 1;
    };

    const getFinalScale = () => {
        if (dimensions.width < 640) return 1;
        if (dimensions.width < 768) return 1.2;
        return 1.5;
    };

    // Animation transforms
    const scaleX = useTransform(scrollYProgress, [0, 0.3], [1.2, getFinalScale()]);
    const scaleY = useTransform(scrollYProgress, [0, 0.3], [0.6, getFinalScale()]);
    const translate = useTransform(scrollYProgress, [0, 1], [0, dimensions.height]);
    const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);

    return (
        <div ref={containerRef} className="w-full">
            <div
                ref={ref}
                className="min-h-[200vh] flex items-center justify-center py-0 md:py-80 [perspective:800px] transform"
                style={{ scale: getInitialScale() }}
            >
                <div className="relative [perspective:800px]">
                    {/* MacBook lid back */}
                    <div
                        style={{
                            transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
                            transformOrigin: "bottom",
                            transformStyle: "preserve-3d",
                        }}
                        className="h-[12rem] w-[32rem] bg-[#010101] rounded-2xl p-2 relative"
                    >
                        <div
                            style={{
                                boxShadow: "0px 2px 0px 2px var(--neutral-900) inset",
                            }}
                            className="absolute inset-0 bg-[#010101] rounded-lg"
                        />
                    </div>

                    {/* MacBook screen with image */}
                    <motion.div
                        style={{
                            scaleX: scaleX,
                            scaleY: scaleY,
                            rotateX: rotate,
                            translateY: translate,
                            transformStyle: "preserve-3d",
                            transformOrigin: "top",
                        }}
                        className="h-96 w-[32rem] absolute inset-0 bg-[#010101] rounded-2xl p-2"
                    >
                        <div className="absolute inset-0 bg-[#272729] rounded-lg">
                            <Image
                                src={src}
                                alt="screen content"
                                fill
                                className="object-cover object-left-top rounded-lg"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* MacBook base */}
                    <div className="h-[22rem] w-[32rem] bg-[#010101] rounded-2xl relative -z-10">
                        {/* Trackpad */}
                        <div
                            className="w-[40%] mx-auto h-32 rounded-xl my-1"
                            style={{
                                boxShadow: "0px 0px 1px 1px #ffffff20 inset",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MacbookScroll;