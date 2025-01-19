import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Custom hook to get window size
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
  const [direction, setDirection] = useState("right");
  const { width } = useWindowSize();

  const sponsorData = [
    {
      name: "Sponsor 1",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor1.jpg",
    },
    {
      name: "Sponsor 2",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor2.jpg",
    },
    {
      name: "Sponsor 3",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor3.jpg",
    },
    {
      name: "Sponsor 4",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor4.jpg",
    },
    {
      name: "Sponsor 5",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor5.jpg",
    },
    {
      name: "Sponsor 6",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor6.jpg",
    },
    {
      name: "Sponsor 7",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor7.jpg",
    },
    {
      name: "Sponsor 8",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor8.jpg",
    },
    {
      name: "Sponsor 9",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor9.jpg",
    },
    {
      name: "Sponsor 10",
      url: "https://example.com",
      imageUrl: "/images/sponsors/sponsor10.jpg",
    },
  ];

  const itemsToShow = width <= 640 ? 1 : width <= 1024 ? 3 : 5;

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setDirection("right");
      setStartIndex((prev) => (prev + 1) % sponsorData.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isTransitioning, sponsorData.length]);

  useEffect(() => {
    const handleResize = () => setStartIndex(0); // Reset carousel on resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Reduced time interval
    return () => clearInterval(interval);
  }, [nextSlide]);

  const visibleSponsors = [
    ...sponsorData.slice(startIndex, startIndex + itemsToShow + 2), // Show more elements
    ...sponsorData.slice(
      0,
      Math.max(0, startIndex + itemsToShow + 2 - sponsorData.length)
    ),
  ];

  return (
    <div className="relative overflow-hidden flex justify-center items-center h-100 bg-theme-color px-4 sm:px-6 lg:px-8 py-16">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-30 scale-110 transition-all duration-1000"
          style={{ backgroundImage: `url(${visibleSponsors[0]?.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-theme-color" />
      </div>

      <div className="relative container mx-auto">
        <div className="flex items-center overflow-hidden">
          <div className="w-full overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${
                  isTransitioning
                    ? direction === "right"
                      ? "-1%"
                      : "1%"
                    : "0%"
                })`,
              }}
            >
              {visibleSponsors.map((sponsor, index) => {
                const isCenter = index === Math.floor((itemsToShow + 2) / 2); // Adjusted to account for the extra elements

                return (
                  <motion.a
                    key={startIndex + index}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-none transition-transform transform ${
                      isCenter ? "z-10" : "z-0"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      flex: `1 1 ${isCenter ? "60%" : "20%"}`, // Slightly increased width for the focused element
                      height: "375px", // Increased height
                      transition: "flex 0.5s",
                    }}
                  >
                    <img
                      src={sponsor.imageUrl}
                      alt={sponsor.name}
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-1/6 h-full bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/6 h-full bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
    </div>
  );
};

export default SponsorsCarousel;
