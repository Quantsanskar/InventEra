import { useEffect, useState } from 'react';

export default function Home() {
    const [bgType, setBgType] = useState('video');
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
                        src="/gifs/Huff5.gif"
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
            <div className="absolute inset-0">
                <BackgroundMedia />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
                <div className={`hero-heading-wrapper ${loaded ? 'loaded' : ''}`}>
                    <h1 className="hero-heading text-6xl md:text-8xl font-bold mb-6 tracking-wider">
                        {"Welcome To HufflePuff".split('').map((char, index) => (
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

                <p className="hero-tagline opacity-0 text-xl md:text-2xl text-center max-w-2xl">
                    Showcase your creativity and connect with fellow HufflePuffs.
                </p>
            </div>

            <style jsx>{`
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
            #FFD700 0%,    /* Hufflepuff Gold */
            #FFFFFF 25%,   /* White */
            #FFB81C 50%,   /* Darker Hufflepuff Yellow */
            #FFFFFF 75%,   /* White */
            #FFD700 100%   /* Hufflepuff Gold */
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 
            2px 2px 0 rgba(0, 0, 0, 0.3),
            0 0 20px rgba(255, 215, 0, 0.5),
            0 0 40px rgba(255, 215, 0, 0.3),
            0 0 60px rgba(255, 215, 0, 0.2);
          filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
        }

        .hover-char:hover {
          transform: 
            translateZ(20px) 
            rotateX(10deg) 
            rotateY(10deg);
          background: linear-gradient(
            135deg, 
            #FFD700 0%,    /* Hufflepuff Gold */
            #FFFFFF 50%,   /* White */
            #FFB81C 100%   /* Darker Hufflepuff Yellow */
          );
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow: 
            2px 2px 0 rgba(0, 0, 0, 0.5),
            4px 4px 0 rgba(255, 215, 0, 0.4),
            0 0 20px rgba(255, 215, 0, 0.6),
            0 0 40px rgba(255, 215, 0, 0.4),
            0 0 60px rgba(255, 215, 0, 0.2);
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