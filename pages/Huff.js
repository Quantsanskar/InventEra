// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
  // Change this to 'video', 'image', or 'gif' to switch background type
  const [bgType, setBgType] = useState('video');

  useEffect(() => {
    const heading = document.querySelector('.hero-heading');
    const tagline = document.querySelector('.hero-tagline');
    
    heading.classList.add('animate-rise');
    setTimeout(() => {
      tagline.classList.add('animate-fade-in');
    }, 1000);
  }, []);

  const BackgroundMedia = () => {
    switch(bgType) {
      case 'video':
        return (
          <video 
            autoPlay 
            muted 
            playsInline
            className="object-cover w-full h-full"
          >
            <source src="/videos/Huff1.mp4" type="video/mp4" />
          </video>
        );
      
      case 'image':
        return (
          <img 
            src="/images/background-image.jpg"
            alt="Background" 
            className="object-cover w-full h-full"
          />
        );
      
      case 'gif':
        return (
          <img 
            src="/gifs/Huff2.gif"
            alt="Background GIF" 
            className="object-cover w-full h-full"
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <BackgroundMedia />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">       

        <h1 
          className="hero-heading opacity-0 text-6xl md:text-8xl font-bold mb-6 tracking-wider"
          style={{
            transition: 'all 1.5s ease-out',
          }}
        >
          Welcome To HufflePuff
        </h1>
        
        <p 
          className="hero-tagline opacity-0 text-xl md:text-2xl text-center max-w-2xl"
          style={{
            transition: 'all 1s ease-out',
          }}
        >
          Showcase your creativity and connect with fellow HufflePuffs.
        </p>
      </div>

      <style jsx>{`
        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-rise {
          animation: rise 1.5s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .hero-heading {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}