"use client";
import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "../../lib/utils";

export const CarouselContext = createContext({
    onCardClose: () => { },
    currentIndex: 0,
});

export const Carousel = ({ items, autoScrollInterval = 3000 }) => {
    const carouselRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const autoScrollRef = useRef(null);

    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const startAutoScroll = () => {
        if (autoScrollRef.current) return;

        autoScrollRef.current = setInterval(() => {
            if (carouselRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

                if (scrollLeft + clientWidth >= scrollWidth) {
                    // Reset to start when reaching the end
                    carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    scroll('right');
                }
            }
        }, autoScrollInterval);
    };

    useEffect(() => {
        startAutoScroll();
        return () => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current);
            }
        };
    }, []);

    const handleCardClose = (index) => {
        if (carouselRef.current) {
            const cardWidth = window.innerWidth < 768 ? 230 : 384;
            const gap = window.innerWidth < 768 ? 4 : 8;
            const scrollPosition = (cardWidth + gap) * (index + 1);
            carouselRef.current.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            });
            setCurrentIndex(index);
        }
    };

    return (
        <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
            <div className="relative w-full">
                <div
                    className="flex w-full overflow-x-scroll py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
                    ref={carouselRef}
                    onScroll={checkScrollability}
                    onMouseEnter={() => {
                        if (autoScrollRef.current) {
                            clearInterval(autoScrollRef.current);
                            autoScrollRef.current = null;
                        }
                    }}
                    onMouseLeave={startAutoScroll}
                >
                    <div className="flex flex-row justify-start gap-4 pl-4 max-w-7xl mx-auto">
                        {items.map((item, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.5,
                                        delay: 0.2 * index,
                                        ease: "easeOut",
                                    },
                                }}
                                key={`card-${index}`}
                                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
                            >
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end gap-2 mr-10">
                    <button
                        className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                    >
                        <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
                    </button>
                    <button
                        className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                    >
                        <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
                    </button>
                </div>
            </div>
        </CarouselContext.Provider>
    );
};
