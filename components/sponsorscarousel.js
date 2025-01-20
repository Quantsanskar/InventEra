import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const SponsorsCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { width } = useWindowSize();

  const sponsorData = [
    {
      name: "Sponsor 1",
      url: "https://example.com",
      imageUrl: "/reference/SponsorsCall.jpg",
    },
    {
      name: "Sponsor 2",
      url: "https://example.com",
      imageUrl: "/reference/SponsorsCall.jpg",
    },
    {
      name: "Sponsor 3",
      url: "https://example.com",
      imageUrl: "/reference/SponsorsCall.jpg",
    },
    {
      name: "Sponsor 4",
      url: "https://example.com",
      imageUrl: "/reference/SponsorsCall.jpg",
    },
   
    {
      name: "Sponsor 5",
      url: "https://example.com",
      imageUrl: "/reference/SponsorsCall.jpg",
    },
   
    {
      name: "Sponsor 6",
      url: "https://example.com",
      imageUrl: "/reference/SponsorsCall.jpg",
    },
   
    {
      name: "Sponsor 7",
      url: "https://example.com",
      imageUrl: "/reference/SponsorsCall.jpg",
    },
   
    {
      name: "Sponsor 8",
      url: "https://example.com",
      imageUrl: "/reference/SponsorsCall.jpg",
    },
   
  ];

  const itemsToShow = width <= 640 ? 1 : width <= 1024 ? 3 : 5;

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setStartIndex((prev) => (prev + 1) % sponsorData.length);
      setTimeout(() => setIsTransitioning(false), 750); // Increased transition time
    }
  }, [isTransitioning, sponsorData.length]);

  useEffect(() => {
    const handleResize = () => setStartIndex(0);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000); // Increased interval for smoother perception
    return () => clearInterval(interval);
  }, [nextSlide]);

  const visibleSponsors = [
    ...sponsorData.slice(startIndex, startIndex + itemsToShow + 2),
    ...sponsorData.slice(
      0,
      Math.max(0, startIndex + itemsToShow + 2 - sponsorData.length)
    ),
  ];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 2,
      },
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  return (
    <div className="relative overflow-hidden flex justify-center items-center h-100 bg-theme-color px-4 sm:px-6 lg:px-8 py-16">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          key={startIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center filter blur-xl scale-110"
          style={{ backgroundImage: `url(${visibleSponsors[0]?.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-theme-color bg-opacity-70" />
      </div>

      <div className="relative container mx-auto">
        <div className="flex items-center overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div className="w-full flex gap-4">
              {visibleSponsors.map((sponsor, index) => {
                const isCenter = index === Math.floor((itemsToShow + 2) / 2);

                return (
                  <motion.a
                    key={`${sponsor.name}-${startIndex + index}`}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-none ${isCenter ? "z-10" : "z-0"}`}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={slideVariants}
                    custom={index}
                    style={{
                      flex: `1 1 ${isCenter ? "60%" : "20%"}`,
                      height: "375px",
                    }}
                    whileHover={{ 
                      scale: isCenter ? 1.05 : 1.02,
                      transition: { duration: 0.2 } 
                    }}
                  >
                    <motion.div
                      className="w-full h-full rounded-lg shadow-lg overflow-hidden"
                      layoutId={`card-${sponsor.name}`}
                    >
                      <motion.img
                        src={sponsor.imageUrl}
                        alt={sponsor.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                  </motion.a>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-1/6 h-full bg-gradient-to-r from-black to-transparent opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/6 h-full bg-gradient-to-l from-black to-transparent opacity-50 pointer-events-none" />
    </div>
  );
};

export default SponsorsCarousel;