"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export const LayoutGrid = ({ cards, className }) => {
    const [selected, setSelected] = useState(null);
    const [lastSelected, setLastSelected] = useState(null);

    const handleClick = (card) => {
        setLastSelected(selected);
        setSelected(card);
    };

    const handleOutsideClick = () => {
        setLastSelected(selected);
        setSelected(null);
    };

    return (
        <div className="bg-black min-h-screen w-full flex items-center justify-center p-4 md:p-8">
            <div
                className={cn(
                    "w-full max-w-7xl mx-auto grid grid-cols-1 auto-rows-[400px] gap-4 md:gap-6",
                    className
                )}
            >
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={cn(
                            "relative rounded-xl overflow-hidden",
                            card.className,
                            "hover:scale-[1.02] transition-transform duration-300"
                        )}
                    >
                        <motion.div
                            onClick={() => handleClick(card)}
                            className={cn(
                                "relative w-full h-full cursor-pointer",
                                selected?.id === card.id
                                    ? "absolute inset-0 z-50"
                                    : lastSelected?.id === card.id
                                        ? "z-40"
                                        : ""
                            )}
                            layoutId={`card-${card.id}`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
                            
                            {/* Media Background */}
                            <MediaComponent card={card} />

                            {/* Content Overlay */}
                            <motion.div
                                className={cn(
                                    "relative h-full w-full p-4 md:p-8 flex flex-col justify-end z-20",
                                    selected?.id === card.id ? "text-white" : "text-white/90"
                                )}
                            >
                                {/* <motion.h2
                                    className="text-2xl md:text-3xl font-bold mb-2 md:mb-4"
                                    layoutId={`title-${card.id}`}
                                >
                                    {card.content.props.title}
                                </motion.h2>
                                <motion.p
                                    className="text-sm md:text-base opacity-90"
                                    layoutId={`description-${card.id}`}
                                >
                                    {card.content.props.description}
                                </motion.p> */}
                            </motion.div>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Overlay for selected state */}
            <motion.div
                onClick={handleOutsideClick}
                className={cn(
                    "fixed inset-0 bg-black/60 z-40",
                    selected?.id ? "pointer-events-auto" : "pointer-events-none opacity-0"
                )}
                animate={{ opacity: selected?.id ? 1 : 0 }}
            />
        </div>
    );
};

const MediaComponent = ({ card }) => {
    const { media } = card;

    if (media.type === "video") {
        return (
            <motion.video
                layoutId={`media-${card.id}`}
                className="absolute inset-0 w-full h-full object-cover"
                poster={media.poster}
                loop
                muted
                autoPlay
                playsInline
            >
                <source src={media.src} type="video/mp4" />
            </motion.video>
        );
    }

    return (
        <motion.img
            layoutId={`media-${card.id}`}
            src={media.src}
            alt={media.alt || ""}
            className="absolute inset-0 w-full h-full object-cover"
        />
    );
};