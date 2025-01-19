import React from 'react';
import Image from 'next/image';

const BackgroundImage = ({ 
  className = '',
  style = {},
  children,
  imagePath = '/reference/Gradient1.png' // Update this with your actual image path
}) => {
  return (
    <div className={`relative w-full h-full min-h-screen ${className}`} style={style}>
      {/* Background Image */}
      <Image
        src={imagePath}
        alt="Background gradient"
        fill
        quality={100}
        priority
        className="object-cover z-0"
        sizes="100vw"
      />
      
      {/* Content Container */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundImage;