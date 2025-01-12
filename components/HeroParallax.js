import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <div className="max-w-7xl relative mx-auto py-6 md:py-12 px-4 md:px-8 w-full">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold dark:text-white">
                Explore Our <br className="hidden sm:block" /> Event Themes
            </h1>
            <p className="max-w-2xl text-sm sm:text-base md:text-xl mt-4 dark:text-neutral-200">
                Dive into cutting-edge technology domains featuring AI/ML, AR/VR, Creative Design,
                Hardware Innovation, and more.
            </p>
        </div>
    );
};

const ProductCard = ({ product, translate }) => {
    return (
        <motion.div
            style={{
                x: translate,
            }}
            whileHover={{
                y: -20,
                transition: { duration: 0.3 }
            }}
            key={product.title}
            className="group/product h-48 sm:h-60 md:h-72 w-[280px] sm:w-[320px] md:w-[24rem] relative flex-shrink-0"
        >
            <Link href={product.link} className="block group-hover/product:shadow-2xl">
                <Image
                    src={product.thumbnail}
                    height="600"
                    width="600"
                    className="object-cover object-center absolute h-full w-full inset-0 rounded-xl"
                    alt={product.title}
                />
                <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none transition-opacity duration-300 rounded-xl"></div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover/product:opacity-100 transition-opacity duration-300">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">
                        {product.title}
                    </h2>
                </div>
            </Link>
        </motion.div>
    );
};

const HeroParallax = ({ products }) => {
    const rows = {
        row1: products.slice(0, 2),
        row2: products.slice(2, 4),
        row3: products.slice(3, 5)
    };

    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 300, damping: 40, bounce: 0 };

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 200]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -200]),
        springConfig
    );

    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [15, 0]),
        springConfig
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0.3, 1]),
        springConfig
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [20, 0]),
        springConfig
    );
    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [-200, 0]),
        springConfig
    );

    return (
        <div ref={ref} className="h-[200vh] sm:h-[250vh] py-5 sm:py-10 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
            <Header />
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
                className="flex flex-col gap-8 sm:gap-12 md:gap-16 sticky top-0 pt-10 sm:pt-20 pb-10 sm:pb-20"
            >
                <motion.div className="flex justify-center sm:justify-end space-x-6 sm:space-x-8 md:space-x-12 px-4 sm:px-8 md:px-10">
                    {rows.row1.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex justify-center sm:justify-start space-x-6 sm:space-x-8 md:space-x-12 px-4 sm:px-8 md:px-10 ml-0 sm:ml-[5%]">
                    {rows.row2.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateXReverse}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex justify-center sm:justify-end space-x-6 sm:space-x-8 md:space-x-12 px-4 sm:px-8 md:px-10">
                    {rows.row3.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HeroParallax;