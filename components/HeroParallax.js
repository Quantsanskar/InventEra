import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <div className="max-w-7xl relative mx-auto py-12 px-4 w-full left-0 top-0">
            <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
                Explore Our <br /> Event Themes
            </h1>
            <p className="max-w-2xl text-base md:text-xl mt-4 dark:text-neutral-200">
                Dive into cutting-edge technology domains featuring AI/ML, AR/VR, Creative Design,
                Hardware Innovation, and more. Each theme opens up a world of possibilities
                for innovation and learning.
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
            className="group/product h-72 w-[24rem] relative flex-shrink-0"
        >
            <Link href={product.link} className="block group-hover/product:shadow-2xl">
                <Image
                    src={product.thumbnail}
                    height="600"
                    width="600"
                    className="object-cover object-center absolute h-full w-full inset-0 rounded-xl"
                    alt={product.title}
                />
            </Link>
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none transition-opacity duration-300 rounded-xl"></div>
            <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white transition-opacity duration-300 text-xl font-bold">
                {product.title}
            </h2>
        </motion.div>
    );
};

const HeroParallax = ({ products }) => {
    // Distribute products more evenly
    const firstRow = products.slice(0, 3);
    const secondRow = products.slice(2, 4);
    const thirdRow = products.slice(3, 5);

    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 300, damping: 40, bounce: 0 };

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 400]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -400]),
        springConfig
    );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [10, 0]),
        springConfig
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0.4, 1]),
        springConfig
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [5, 0]),
        springConfig
    );
    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [-300, 100]),
        springConfig
    );

    return (
        <div
            ref={ref}
            className="h-[250vh] py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
        >
            <Header />
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
                className="flex flex-col gap-16 sticky top-0 pb-40" // Increased gap and added bottom padding
            >
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-12 px-10">
                    {firstRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row space-x-12 px-10 ml-[5%]">
                    {secondRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateXReverse}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-12 px-10 mb-20"> {/* Added bottom margin */}
                    {thirdRow.map((product) => (
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