import { useEffect, useState } from 'react';

const Home = () => {
    const [bgType, setBgType] = useState('image');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const heading = document.querySelector('.hero-heading');
        const tagline = document.querySelector('.hero-tagline');

        setLoaded(true);

        setTimeout(() => {
            tagline.classList.add('animate-fade-in');
        }, 2000);
    }, []);

    const BackgroundMedia = () => {
        switch (bgType) {
            case 'video':
                return (
                    <video
                        autoPlay
                        muted
                        playsInline
                        className="object-cover w-full h-full"
                    >
                        <source src="/videos/Raven1.mp4" type="video/mp4" />
                    </video>
                );

            case 'image':
                return (
                    <img
                        src="/houses/Slytherine/Chill Beats Records Art Vol_2 - Voyager__ 1 (2)_enhanced.png"
                        alt="Background"
                        className="object-cover w-full h-full"
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className="relative h-screen w-full overflow-hidden mb-16">
            <div className="absolute inset-0">
                <BackgroundMedia />
                <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/75">
                    {/* Animated snake border */}
                    {/* <div className="snake-border" /> */}
                </div>
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
                <div className={`hero-heading-wrapper ${loaded ? 'loaded' : ''}`}>
                    <h1 className="hero-heading text-6xl md:text-8xl font-bold mb-6 tracking-wider" style={{ fontFamily: 'Irish Grover, cursive' }}>
                        {"Welcome To Slytherin".split('').map((char, index) => (
                            <span
                                key={index}
                                className="inline-block hover-char"
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                }}
                            >
                                {char}
                            </span>
                        ))}
                    </h1>
                </div>

                <p className="hero-tagline opacity-0 text-xl md:text-2xl text-center max-w-2xl mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
                    Where ambition and cunning pave the path to greatness.
                </p>

                {/* Adding decorative elements */}
              
            </div>

            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Irish+Grover&family=Cinzel:wght@400;700&display=swap');
        
        .hero-heading-wrapper {
          position: relative;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .hero-heading {
          opacity: 0;
          transform: translateZ(-100px);
          transition: all 0.5s ease-out;
        }

        .hero-heading-wrapper.loaded .hero-heading {
          opacity: 1;
          transform: translateZ(0);
        }

        .hover-char {
          display: inline-block;
          transition: all 0.3s ease;
          transform-style: preserve-3d;
          animation: float-in 0.5s ease-out forwards;
          opacity: 0;
          background: linear-gradient(
            135deg, 
            #0F8A5F 0%,    /* Vibrant Slytherin Green */
            #DDDDDD 25%,   /* Bright Silver */
            #2A623D 50%,   /* Slytherin Medium Green */
            #DDDDDD 75%,   /* Bright Silver */
            #0F8A5F 100%   /* Vibrant Slytherin Green */
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 
            2px 2px 0 rgba(0, 0, 0, 0.5),
            0 0 20px rgba(15, 138, 95, 0.7),  /* Bright Green glow */
            0 0 40px rgba(42, 98, 61, 0.5),   /* Medium Green glow */
            0 0 60px rgba(221, 221, 221, 0.3); /* Silver glow */
          filter: drop-shadow(0 0 15px rgba(15, 138, 95, 0.4));
        }

        .hover-char:hover {
          transform: 
            translateZ(30px) 
            rotateX(15deg) 
            rotateY(15deg)
            scale(1.1);
          background: linear-gradient(
            135deg, 
            #0F8A5F 0%,    /* Vibrant Slytherin Green */
            #FFFFFF 50%,   /* Pure White */
            #1A472A 100%   /* Dark Green */
          );
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow: 
            2px 2px 0 rgba(0, 0, 0, 0.5),
            4px 4px 0 rgba(15, 138, 95, 0.6),
            0 0 20px rgba(15, 138, 95, 0.8),
            0 0 40px rgba(221, 221, 221, 0.6),
            0 0 60px rgba(15, 138, 95, 0.4);
        }

        .hero-tagline {
          text-shadow: 
            2px 2px 4px rgba(0, 0, 0, 0.7),
            0 0 20px rgba(15, 138, 95, 0.6),
            0 0 40px rgba(15, 138, 95, 0.4);
          animation: pulse 3s infinite;
        }

        .snake-border {
          position: absolute;
          inset: 0;
          border: 4px solid transparent;
          background: linear-gradient(45deg, #0F8A5F, #DDDDDD, #2A623D, #DDDDDD, #0F8A5F) border-box;
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          animation: borderGlow 4s infinite;
        }

        
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        @keyframes borderGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(15, 138, 95, 0.5)); }
          50% { filter: drop-shadow(0 0 20px rgba(15, 138, 95, 0.8)); }
        }

       

        @keyframes float-in {
          0% {
            opacity: 0;
            transform: 
              translateY(100px) 
              translateZ(-50px) 
              rotateX(-45deg);
          }
          100% {
            opacity: 1;
            transform: 
              translateY(0) 
              translateZ(0) 
              rotateX(0);
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

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
        </div>
    );
}

export default Home;