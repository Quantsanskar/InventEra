import React from 'react'
import { motion } from 'framer-motion'

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

export const SocialLink = ({ name, handle, url, icon: Icon, color }) => {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex items-center justify-between 
        w-full p-4 rounded-xl 
        bg-gradient-to-r ${color}
        text-white 
        transition-all 
        duration-300 
        hover:shadow-lg hover:shadow-gray-700/50
      `}
    >
      <div className="flex items-center space-x-4">
        <Icon size={24} />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm opacity-75">{handle}</p>
        </div>
      </div>
      <span className="opacity-50">→</span>
    </motion.a>
  )
}