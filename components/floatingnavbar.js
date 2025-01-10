"use client";

import { cn } from "../lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export const FloatingNavbar = ({
    items,
    desktopClassName,
    mobileClassName
}) => {
    return (
        <>
            <DesktopNav items={items} className={desktopClassName} />
            <MobileNav items={items} className={mobileClassName} />
        </>
    );
};

// Mobile Navigation Component
const MobileNav = ({ items, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={cn("fixed bottom-8 right-8 z-50 block md:hidden", className)}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        layoutId="mobileNav"
                        className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2">
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                    transition: { delay: idx * 0.05 }
                                }}
                                transition={{ delay: (items.length - 1 - idx) * 0.05 }}>
                                <Link
                                    href={item.href}
                                    className="h-10 w-10 rounded-full bg-black border border-neutral-800 flex items-center justify-center hover:bg-neutral-900 transition-colors">
                                    <span className="h-4 w-4 text-neutral-400">{item.icon}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-10 w-10 rounded-full bg-black border border-neutral-800 flex items-center justify-center hover:bg-neutral-900 transition-colors">
                <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-400" />
            </button>
        </div>
    );
};

// Desktop Navigation Component
const DesktopNav = ({ items, className }) => {
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex h-16 gap-4 items-end rounded-2xl bg-black border border-neutral-800 px-4 pb-3 shadow-lg",
                className
            )}>
            {items.map((item) => (
                <NavItem mouseX={mouseX} key={item.title} {...item} />
            ))}
        </motion.div>
    );
};

// Navigation Item Component
const NavItem = ({ mouseX, title, icon, href }) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const springConfig = {
        mass: 0.1,
        stiffness: 150,
        damping: 12
    };

    const width = useSpring(
        useTransform(distance, [-150, 0, 150], [40, 80, 40]),
        springConfig
    );

    const height = useSpring(
        useTransform(distance, [-150, 0, 150], [40, 80, 40]),
        springConfig
    );

    const iconSize = useSpring(
        useTransform(distance, [-150, 0, 150], [20, 40, 20]),
        springConfig
    );

    return (
        <Link href={href}>
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="aspect-square rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center relative hover:bg-neutral-800 transition-colors">
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className="px-2 py-0.5 whitespace-pre rounded-md bg-black border border-neutral-800 text-neutral-400 absolute left-1/2 -translate-x-1/2 -top-8 text-xs shadow-sm">
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    style={{ width: iconSize, height: iconSize }}
                    className="flex items-center justify-center text-neutral-400">
                    {icon}
                </motion.div>
            </motion.div>
        </Link>
    );
};

export default FloatingNavbar;