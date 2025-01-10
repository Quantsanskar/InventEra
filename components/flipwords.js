// components/FlipWords.js
"use client";

import React, { useCallback, useEffect, useState, useRef } from "react"; // Add useRef
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../lib/utils";

export const FlipWords = ({
  words,
  duration = 2000,
  className
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Add visibility state
  const componentRef = useRef(null); // Add ref for the component

  const startAnimation = useCallback(() => {
    if (!isVisible) return; // Only animate if visible
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words, isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAnimating && isVisible) {
      const timer = setTimeout(() => {
        startAnimation();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration, startAnimation, isVisible]);

  return (
    <div className="bg-black w-full h-full p-2 sm:p-4" ref={componentRef}> {/* Adjusted padding for small screens */}
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          className={cn("inline-block text-white text-base sm:text-xl md:text-2xl lg:text-3xl", className)} // Added responsive text sizes
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => {
            setIsAnimating(false);
          }}
        >
          {currentWord.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-normal sm:whitespace-nowrap"> {/* Added whitespace handling */}
              {wordIndex > 0 && <span>&nbsp;</span>} {/* Add space between words */}
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: letterIndex * 0.05
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};