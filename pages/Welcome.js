import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
// import {styles} from '../styles/welcome.module.css';
const Welcome = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Head>
        <title>Welcome to S1</title>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          body {
            background: black;
            margin: 0;
            font-family: 'Inter', sans-serif;
          }

          .hero-text {
            color: #ffffff;
            font-size: clamp(2.5rem, 8vw, 5rem);
            line-height: 1.2;
            font-weight: 600;
            text-align: center;
            letter-spacing: -0.04em;
          }

          .subtext {
            color: #8E8E8E;
            font-size: 1.25rem;
            line-height:1.5rem;
            text-align: center;
            font-weight: 400;
          }

          .info-text {
            color: #8E8E8E;
            font-size: 1.5rem;
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1;
          }

          .welcome-container {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }

          .logo-text {
            background: linear-gradient(to right, #fff, #999);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 700;
          }

          .header {
            border-bottom: 1px solid rgba(255,255,255,0.1);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
        `}</style>
      </Head>

      {/* Header */}
      <motion.header
        className="header fixed top-0 w-full z-50 bg-black/50"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-2"
            
          >
            <Sparkles className="w-6 h-6 text-white/80" />
            <span className="logo-text text-xl">builders' space</span>
          </motion.div>

        </div>
      </motion.header>

      {/* Main Content */}
      <div className="pt-24">
        <motion.div
          className="welcome-container"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="space-y-0.2" variants={fadeInUp}>
            <motion.h1
              className="hero-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              you made it.
            </motion.h1>
            <motion.h1
              className="hero-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              welcome to s1.
            </motion.h1>
          </motion.div>

          <motion.div
            className="space-y-1 mt-0"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="subtext" variants={fadeInUp}>hi :)</motion.p>
            <motion.p className="subtext" variants={fadeInUp}>
              welcome to The Nights season 1.
            </motion.p>
            <motion.p className="subtext" variants={fadeInUp}>
              we're excited as hell to have you.
            </motion.p>
          </motion.div>

          <motion.div
            className="space-y-2 mt-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="info-text" variants={fadeInUp}>
              this page is full of everything you need to know.
            </motion.p>
            <motion.p className="info-text" variants={fadeInUp}>
              it's a lot of information and it might be kinda boring...
            </motion.p>
            <motion.p className="info-text" variants={fadeInUp}>
              so, here's a song to listen to as you read through the pack:
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;