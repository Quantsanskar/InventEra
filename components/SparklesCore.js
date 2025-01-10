"use client";

import React, { useId, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "../lib/utils";

const SparklesCore = ({
    id,
    className,
    background = "transparent",
    minSize = 0.4,
    maxSize = 1,
    speed = 4,
    particleColor = "#FFFFFF",
    particleDensity = 1200,
}) => {
    const [init, setInit] = useState(false);
    const controls = useAnimation();
    const generatedId = useId();

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container) => {
        if (container) {
            await controls.start({
                opacity: 1,
                transition: {
                    duration: 1,
                },
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
            className={cn("opacity-0", className)}
        >
            {init && (
                <Particles
                    id={id || generatedId}
                    className={cn("h-full w-full")}
                    particlesLoaded={particlesLoaded}
                    options={{
                        background: {
                            color: {
                                value: background,
                            },
                        },
                        fullScreen: {
                            enable: false,
                            zIndex: 1,
                        },
                        particles: {
                            color: {
                                value: particleColor,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: {
                                    default: "out",
                                },
                                random: false,
                                speed: {
                                    min: 0.1,
                                    max: 1,
                                },
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    width: 400,
                                    height: 400,
                                },
                                value: particleDensity,
                            },
                            opacity: {
                                value: {
                                    min: 0.1,
                                    max: 1,
                                },
                                animation: {
                                    enable: true,
                                    speed: speed,
                                    sync: false,
                                },
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: {
                                    min: minSize,
                                    max: maxSize,
                                },
                            },
                        },
                        detectRetina: true,
                    }}
                />
            )}
        </motion.div>
    );
};

export default SparklesCore;