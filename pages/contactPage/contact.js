"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Navigation from '../components/homepage/Navigation'
import { Footer } from '../components/footer'
import { SocialLink } from './socialLink'
import { Instagram, Linkedin, Globe } from 'lucide-react'
import { IconBrandWhatsapp } from '@tabler/icons-react'

const SOCIAL_LINKS = [
  {
    name: 'Commudle',
    handle: 'Builders Space',
    url: "https://www.commudle.com/communities/builders-space",
    icon: Globe,
    color: 'from-green-400 to-blue-500'
  },
  {
    name: 'Instagram',
    handle: '@buildersspace',
    url: 'https://www.instagram.com/builders.space/?igsh=Y2p1MTJrNWQxZjdo',
    icon: Instagram,
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'LinkedIn',
    handle: 'Builders Space',
    url: 'https://www.linkedin.com/company/builder-s-space/',
    icon: Linkedin,
    color: 'from-blue-400 to-blue-600'
  },
  {
    name: 'WhatsApp',
    handle: 'Chat with Builders Space',
    url: 'https://chat.whatsapp.com/IXlpRAi0BJKD99DSCY3j4j',
    icon: IconBrandWhatsapp,
    color: 'from-green-400 to-green-600'
  },
]

const ANIMATION_DURATION = 0.5

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
}

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navigation />

      <main className="flex-grow flex flex-col items-center mt-16 justify-center p-4 sm:p-8">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Builders' Space
          </h1>
          <p className="text-xl text-gray-300">Connect with us everywhere</p>
        </motion.header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md space-y-4"
        >
          {SOCIAL_LINKS.map((link, index) => (
            <SocialLink key={index} {...link} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            Let's build something awesome together
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

export default ContactPage