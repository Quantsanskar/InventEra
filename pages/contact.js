import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../components/Header';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Github, 
  Globe, 
  Send, 
  ArrowLeft 
} from 'lucide-react';

const socialLinks = [
  {
    name: 'Instagram',
    handle: '@buildersspace',
    url: 'https://www.instagram.com/builders.space/?igsh=Y2p1MTJrNWQxZjdo',
    icon: Instagram,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  {
    name: 'Twitter/X',
    handle: '@builders_space',
    url: 'https://twitter.com/builders_space',
    icon: Twitter,
    color: 'bg-[#1DA1F2]'
  },
  {
    name: 'LinkedIn',
    handle: 'Builders Space',
    url: 'https://www.linkedin.com/company/builder-s-space/',
    icon: Linkedin,
    color: 'bg-[#0077B5]'
  },
  // {
  //   name: 'GitHub',
  //   handle: 'builders-space',
  //   url: 'https://github.com/builders-space',
  //   icon: Github,
  //   color: 'bg-gray-800',
  // },
  {
    name: 'Commudle',
    handle: 'Builders Space',
    url: "https://www.commudle.com/communities/builders-space",
    icon: Globe,
    color: 'bg-gradient-to-r from-green-400 to-blue-500'
  },
  {
    name: 'Email',
    handle: 'hello@buildersspace.com',
    url: 'mailto:',
    icon: Send,
    color: 'bg-red-500'
  }
];

const ContactPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <Header/>
      

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-3xl md:text-5xl mt-20 font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          Builders' Space
        </h1>
        <p className="text-lg md:text-xl text-gray-300">Connect with us everywhere</p>
      </motion.div>


      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md space-y-6"
      >
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center justify-between 
              w-full p-4 rounded-xl 
              ${link.color} 
              text-white 
              transition-all 
              duration-300 
              hover:shadow-xl
            `}
          >
            <div className="flex items-center space-x-4">
              <link.icon size={24} />
              <div>
                <p className="font-semibold">{link.name}</p>
                <p className="text-sm opacity-75">{link.handle}</p>
              </div>
            </div>
            <span className="opacity-50">→</span>
          </motion.a>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-400">
          Let's build something awesome together
        </p>
      </motion.div>
    </div>
  );
};

export default ContactPage;