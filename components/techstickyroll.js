"use client";
import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const techContent = [
  {
    title: "Artificial Intelligence & Machine Learning",
    description:
      "Dive into the world of AI/ML where algorithms learn and evolve. From neural networks to deep learning, discover how machines are being trained to think, analyze, and solve complex problems. Our season explores cutting-edge applications in natural language processing, computer vision, and predictive analytics.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="text-3xl font-bold">AI/ML</div>
          <div className="text-sm opacity-80">Neural Networks • Deep Learning • NLP</div>
        </div>
      </div>
    ),
  },
  {
    title: "Web3 & Blockchain Technology",
    description:
      "Enter the decentralized future with Web3. Understand the revolutionary impact of blockchain technology, smart contracts, and decentralized applications (dApps). Learn about cryptocurrency innovations, NFTs, and how they're reshaping digital ownership and transactions in our connected world.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-emerald-600 to-cyan-600 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="text-3xl font-bold">Web3</div>
          <div className="text-sm opacity-80">Blockchain • Smart Contracts • DeFi</div>
        </div>
      </div>
    ),
  },
  {
    title: "Augmented & Virtual Reality",
    description:
      "Step into immersive experiences with AR/VR technologies. Explore how mixed reality is transforming entertainment, education, and professional training. From virtual worlds to augmented environments, discover the tools and platforms shaping our perception of reality.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-pink-600 to-orange-600 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="text-3xl font-bold">AR/VR</div>
          <div className="text-sm opacity-80">Mixed Reality • Immersive Tech • Metaverse</div>
        </div>
      </div>
    ),
  },
  {
    title: "Hardware & IoT Innovation",
    description:
      "Delve into the physical layer of technology with cutting-edge hardware and IoT developments. From quantum computing to smart devices, explore how innovative hardware solutions are enabling new possibilities in connectivity, processing power, and automated systems.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-yellow-500 to-red-600 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="text-3xl font-bold">Hardware & IoT</div>
          <div className="text-sm opacity-80">Quantum Computing • Robotics • Smart Devices</div>
        </div>
      </div>
    ),
  },
];

export const TechStickyScroll = ({ contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = techContent.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = techContent.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div className="min-h-screen w-full bg-black p-8">
      <motion.div
        className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 bg-black/50 backdrop-blur-sm"
        ref={ref}>
        <div className="div relative flex items-start px-4">
          <div className="max-w-2xl">
            {techContent.map((item, index) => (
              <div key={item.title + index} className="my-20">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  className="text-2xl font-bold text-white">
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  className="text-kg text-gray-300 max-w-sm mt-10">
                  {item.description}
                </motion.p>
              </div>
            ))}
            <div className="h-40" />
          </div>
        </div>
        <div
          className={cn(
            "hidden lg:block h-60 w-80 rounded-md sticky top-10 overflow-hidden shadow-xl",
            contentClassName
          )}>
          {techContent[activeCard].content}
        </div>
      </motion.div>
    </div>
  );
};

// export default function DarkTechScrollDemo() {
//   return (
//     <div className="w-full min-h-screen bg-black">
//       <TechStickyScroll />
//     </div>
//   );
// }
export default TechStickyScroll;