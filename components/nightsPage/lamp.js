"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../ui/lampui";
import Image from "next/image";

const SponsorCard = ({ name, logo, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.5 }}
    className="relative p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-neutral-800 group hover:border-cyan-800/100 transition-all"
  >
    <div className="relative w-full h-40 mb-4">
      <Image
        src={logo}
        alt={name}
        fill
        className="object-contain"
      />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
    <p className="text-neutral-300 text-sm">{description}</p>
    <div className="absolute inset-0 -z-10 bg-cyan-500/20 blur-2xl group-hover:bg-cyan-500/30 transition-colors rounded-xl opacity-0 group-hover:opacity-100" />
  </motion.div>
);

const sponsors = [
  {
    name: "COMMUDLE",
    logo: "/sponsors/COMMUDLE.png", // Add your sponsor logos
    description: ""
  },
  {
    name: "ONNOFF",
    logo: "/sponsors/ONNOFF.png",
    description: ""
  },
  {
    name: "Sponsor 3(searching)",
    logo: "/reference/SponsorsCall.jpg",
    description: "..."
  },
  {
    name: "Sponsor 4(searching)",
    logo: "/reference/SponsorsCall.jpg",
    description: "..."
  }
];

export function LampImp() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Our Sponsors
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 max-w-7xl mx-auto"
      >
        {sponsors.map((sponsor, i) => (
          <SponsorCard key={i} {...sponsor} />
        ))}
      </motion.div>
    </LampContainer>
  );
}