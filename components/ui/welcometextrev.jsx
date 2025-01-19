"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

const TextRevealByWord = ({ text, className }) => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh] w-full ", className)}>
      <div
        className={
          "sticky top-0 flex h-[50%] w-full items-center bg-transparent px-[1rem] py-[2rem]"
        }
      >
        <p
          ref={targetRef}
          className={
            "flex flex-wrap w-full p-2 text-2xl font-bold text-white/20 md:p-8 md:text-2xl lg:p-5 lg:text-3xl xl:text-4xl"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5 ">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span style={{ opacity: opacity }} className={"text-white "}>
        {children}
      </motion.span>
    </span>
  );
};

export { TextRevealByWord };
