import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router'; // Import the useRouter hook

const MainContent = () => {
  const router = useRouter(); // Initialize the router

  const styles = {
    mainContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '3rem 2rem',
      background: '#000',
      color: 'white',
    },
    contentWrapper: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    imageContainer: {
      display: 'flex',
      marginRight: '3rem',
      perspective: '1000px',
    },
    image: {
      width: '180px',
      height: '420px',
      marginRight: '0.5rem',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      transition: 'all 0.4s ease',
      transform: 'rotateY(-15deg)',
      filter: 'grayscale(20%) brightness(0.9)',
    },
    textContent: {
      maxWidth: '500px',
      background: 'rgba(255,255,255,0.05)',
      padding: '2rem',
      borderRadius: '16px',
      backdropFilter: 'blur(10px)',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    paragraph: {
      fontSize: '1.1rem',
      color: '#b0b0b0',
      margin: '0.5rem 0',
      lineHeight: '1.6',
    },
    button: {
      padding: '10px 20px',
      background: 'transparent',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '6px',
      color: '#c0c0c0',
      fontFamily: 'monospace',
      fontSize: '0.9rem',
      letterSpacing: '1px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      outline: 'none',
      textTransform: 'lowercase',
      position: 'relative',
      overflow: 'hidden',
    },
  };

  const passions = [
    'build an app',
    'create a youtube channel',
    'get your first 1,000 subscribers',
    'launch your own game',
    'sell your art online',
    'research new ai models',
  ];

  const images = [
    '/image1.png',
    '/image2.png',
    '/image3.png',
  ];

  const handleButtonClick = () => {
    router.push('/Welcome'); // Navigate to the Welcome.js page
  };

  return (
    <motion.div
      style={styles.mainContent}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div style={styles.contentWrapper}>
        <div style={styles.imageContainer}>
          {images.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              alt={`Image ${index + 1}`}
              style={styles.image}
              whileHover={{
                transform: 'scale(1.05) rotateY(0deg)',
                filter: 'grayscale(0%) brightness(1)',
                zIndex: 10,
              }}
            />
          ))}
        </div>
        <motion.div
          style={styles.textContent}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1 style={styles.title}>Work on Ideas That Ignite You</h1>
          {passions.map((passion, index) => (
            <motion.p
              key={index}
              style={styles.paragraph}
              whileHover={{
                x: 10,
                color: '#00ffff',
              }}
            >
              {passion}
            </motion.p>
          ))}
          <motion.p
            style={{ ...styles.paragraph, fontStyle: 'italic', marginTop: '1rem' }}
            whileHover={{ scale: 1.02 }}
          >
            No idea is too big, or too small. We don't care if you're making robots,
            or producing dope beats. Pursue your passions.
          </motion.p>
        </motion.div>
      </div>

      <motion.button
        style={styles.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleButtonClick} // Add the click handler
      >
        welcome to the nights
      </motion.button>
    </motion.div>
  );
};

export default MainContent;
