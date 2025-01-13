"use client";
import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "../../lib/utils";


export const MediaCard = ({ card, index }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                handleClose();
            }
        };

        if (open) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "auto";
        }

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open]);

    const handleClose = () => {
        setOpen(false);
        // onCardClose(index);
    };

    const renderMedia = () => {
        switch (card.type) {
            case 'video':
                return (
                    <video
                        src={card.src}
                        className="object-cover absolute z-10 inset-0"
                        autoPlay
                        muted
                        loop
                    />
                );
            case 'gif':
                return (
                    <Image
                        src={card.src}
                        fill
                        className="object-cover absolute z-10 inset-0"
                        unoptimized
                    />
                );
            default:
                return (
                    <Image
                        src={card.src}
                        fill
                        className="object-cover absolute z-10 inset-0"
                    />
                );
        }
    };

    return (
        <>
            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 h-screen z-50 overflow-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-gray-600 backdrop-blur-lg h-full w-full fixed inset-0"
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            ref={containerRef}
                            className="max-w-5xl mx-auto bg-black dark:bg-black h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
                        >
                            <button
                                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                                // onClick={handleClose}
                            >
                                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
                            </button>
                            
                            {/* <div className="py-10">{card.content}</div> */}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <motion.button
                // onClick={() => setOpen(true)}
                className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
            >
                <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
                
                {renderMedia()}
            </motion.button>
        </>
    );
};