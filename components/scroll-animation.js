"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const ContainerScroll = ({ children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const [isMobile, setIsMobile] = useState(false);
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };
    
    checkDevice();
    window.addEventListener("resize", checkDevice);
    window.addEventListener("orientationchange", checkDevice);
    
    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("orientationchange", checkDevice);
    };
  }, []);

  const getDeviceDimensions = () => {
    if (isMobile) {
      return orientation === 'portrait' 
        ? { width: '320px', height: '640px' }
        : { width: '640px', height: '320px' };
    }
    return { width: '70%', height: '600px' };
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const dimensions = getDeviceDimensions();

  return (
    <div
      className="h-[40rem] md:h-[50rem] flex items-center justify-center relative p-4 md:p-8"
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Card 
          rotate={rotate} 
          scale={scale} 
          dimensions={dimensions}
          isMobile={isMobile}
          orientation={orientation}
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

const Card = ({ rotate, scale, dimensions, isMobile, orientation, children }) => {
  const phoneFrame = isMobile ? {
    borderRadius: '30px',
    border: '12px solid #333',
    boxShadow: '0 0 0 2px #222',
    ...(orientation === 'portrait' ? {
      width: dimensions.width,
      height: dimensions.height,
    } : {
      width: dimensions.width,
      height: dimensions.height,
      transform: `rotate(${90}deg)`,
    })
  } : {};

  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        ...phoneFrame,
        margin: '0 auto',
        width: dimensions.width,
        height: dimensions.height,
        overflow: 'hidden',
      }}
      className={`relative border-4 border-[#6C6C6C] bg-[#222222] rounded-[30px] shadow-2xl 
        ${isMobile ? 'transition-all duration-300' : ''}`}
    >
      {isMobile && (
        <>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-[#222] rounded-b-2xl z-10" />
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-[#333] rounded-full z-20" />
        </>
      )}
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900">
        {children}
      </div>
    </motion.div>
  );
};