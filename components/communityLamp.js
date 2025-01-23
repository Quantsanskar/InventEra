"use client"
import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const CommunityCard = ({ name, logo, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.5 }}
    className="relative p-6 bg-black/50 backdrop-blur-sm rounded-xl border border-neutral-800 group hover:border-purple-500/50 transition-all"
  >
    <div className="relative w-full h-40 mb-4">
      <Image src={logo || "/placeholder.svg"} alt={name} fill className="object-contain" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
    <p className="text-neutral-300 text-sm">{description}</p>
    <div className="absolute inset-0 -z-10 bg-purple-500/20 blur-2xl group-hover:bg-purple-500/30 transition-colors rounded-xl opacity-0 group-hover:opacity-100" />
  </motion.div>
)

const communities = [
  {
    name: "Eventsinfo",
    logo: "/Communities/1.jpg",
    description: "Connecting event enthusiasts and organizers.",
  },
  {
    name: "Kotlin Delhi NCR",
    logo: "/Communities/2.png",
    description: "A hub for Kotlin developers in Delhi NCR.",
  },
  {
    name: "DEVSource",
    logo: "/Communities/3.png",
    description: "Empowering developers with resources and support.",
  },
  {
    name: "GDG Community",
    logo: "/Communities/4.png",
    description: "Google Developer Group fostering tech innovation.",
  },
  {
    name: "Tech Innovators",
    logo: "/Communities/5.jpg",
    description: "Pushing the boundaries of technology.",
  },
  {
    name: "theDevArmy",
    logo: "/Communities/6.png",
    description: "A collective of passionate developers.",
  },
  {
    name: "SheBuilds",
    logo: "/Communities/7.jpg",
    description: "Empowering women in tech and development.",
  },
]

const CommunityLampContainer = ({ children }) => (
  <div className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden bg-slate-950 w-full rounded-md z-0">
    <div className="relative flex w-full flex-1 scale-y-125 items-start justify-center isolate z-0 pt-40">
      <motion.div
        initial={{ opacity: 0.5, width: "15rem" }}
        whileInView={{ opacity: 1, width: "30rem" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-purple-500 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
      >
        <div className="absolute w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        <div className="absolute w-40 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0.5, width: "15rem" }}
        whileInView={{ opacity: 1, width: "30rem" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-purple-500 [--conic-position:from_290deg_at_center_top]"
      >
        <div className="absolute w-40 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
        <div className="absolute w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
      </motion.div>

      <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
      <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
      <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-purple-500 opacity-50 blur-3xl"></div>
      <div className="absolute top-[60%] inset-x-0 h-96 bg-purple-500/20 blur-3xl opacity-50" />
    </div>

    <div className="relative z-50 flex flex-col items-center px-5 w-full">{children}</div>
  </div>
)

export function CommunityLamp() {
  return (
    <CommunityLampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="mt-8 bg-gradient-to-br from-purple-200 to-purple-400 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Our Communities & Collaborators
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8 max-w-7xl mx-auto"
      >
        {communities.map((community, i) => (
          <CommunityCard key={i} {...community} />
        ))}
      </motion.div>
    </CommunityLampContainer>
  )
}

