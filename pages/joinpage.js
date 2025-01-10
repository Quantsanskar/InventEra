import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import { useRouter } from 'next/router';

const LoadingText = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <motion.div
        animate={{ opacity: [0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-2xl text-blue-400 mb-4"
      >
        Counting our amazing builders{dots}
      </motion.div>
      <p className="text-gray-400">Our community grows every day</p>
    </div>
  );
};

const JoinPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [memberCount, setMemberCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (activeSection === 'members') {
      fetchMemberCount();
    }
  }, [activeSection]);

  const fetchMemberCount = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/member-count/'); // Update URL if needed
      const data = await response.json();
      setMemberCount(data.count);
    } catch (error) {
      console.error('Error fetching member count:', error);
      setMemberCount('237'); // Fallback number
    } finally {
      setIsLoading(false);
    }
  };
  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.05 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const gotoRegisPage = () => {
    router.push('/regispage');
  };

  const gotoLogin = () => {
    router.push('/login');
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gray-900 text-white flex flex-col"
    >
      <Header />
      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl mt-8 font-light tracking-wide">
            Builders' Space
          </h1>
          <p className="text-lg text-gray-400 mt-2">
            where creators meet possibility
          </p>
        </motion.div>

        <div className="flex justify-center space-x-6 mb-12 border-b border-gray-700 pb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('overview')}
            className={`${activeSection === 'overview' ? 'text-white' : 'text-gray-500'} hover:text-white transition`}
          >
            Overview
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('members')}
            className={`${activeSection === 'members' ? 'text-white' : 'text-gray-500'} hover:text-white transition`}
          >
            Members
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {activeSection === 'overview' && (
            <motion.div
              key="overview"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    staggerChildren: 0.3,
                    delayChildren: 0.2
                  }
                }
              }}
              className="space-y-6 flex-grow"
            >
              {["We're not just another community. We're a collective of dreamers, makers, and rebels who believe in turning wild ideas into reality.",
                'No fancy degrees. No boring rules. Just pure creativity and collaborative energy.',
                'Whether you code, design, write, or dream up something entirely new - you belong here.'].map((text, index) => (
                  <motion.p
                    key={index}
                    variants={textVariants}
                    className="text-xl md:text-2xl leading-relaxed"
                  >
                    {text}
                  </motion.p>
                ))}
            </motion.div>
          )}

          {activeSection === 'members' && (
            <motion.div
              key="members"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    staggerChildren: 0.3,
                    delayChildren: 0.2
                  }
                }
              }}
              className="space-y-6 text-center flex-grow flex flex-col justify-center"
            >
              <motion.h2
                variants={textVariants}
                className="text-3xl md:text-4xl font-light"
              >
                Our Growing Tribe
              </motion.h2>

              {isLoading ? (
                <LoadingText />
              ) : (
                <>
                  <motion.div
                    variants={textVariants}
                    className="text-6xl md:text-7xl font-bold text-blue-500"
                  >
                    {memberCount || '237'}
                  </motion.div>
                  <motion.p
                    variants={textVariants}
                    className="text-xl text-gray-400"
                  >
                    builders who refuse to follow the crowd
                  </motion.p>
                </>
              )}

              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
                className="flex flex-col space-y-4 pt-8 max-w-xs mx-auto w-full"
              >
                <motion.button
                  variants={textVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={gotoRegisPage}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
                >
                  Join as Member
                </motion.button>
                <motion.button
                  variants={textVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg transition"
                  onClick={gotoLogin}
                >
                  Login
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default JoinPage;