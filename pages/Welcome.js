import { React, useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import Navigation from '@/components/homepage/Navigation';
import { Footer } from '@/components/footer';
import Image from 'next/image';
const WelcomePage = () => {
  const userData = {
    name: "John Builder",
    houseName: "Builder's Space",
    projectDescription: "Creating interactive digital experiences",
    videoUrl: "https://youtube.com/embed/example",
    socialHandles: [
      { platform: "Twitter", handle: "@johnbuilder" },
      { platform: "GitHub", handle: "johnbuilder" },
      { platform: "Instagram", handle: "@johnbuilds" },
      { platform: "LinkedIn", handle: "john-builder" }
    ]
  };
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('1:24');
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  // Format time in MM:SS
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
    }

    // Set initial duration once audio is loaded
    const handleLoadedMetadata = () => {
      setDuration(formatTime(audioRef.current.duration));
    };

    // Update time and progress during playback
    const handleTimeUpdate = () => {
      setCurrentTime(formatTime(audioRef.current.currentTime));
      const progressPercent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progressPercent);
    };

    // Add event listeners
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const progressBar = progressRef.current;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * audioRef.current.duration;

    audioRef.current.currentTime = newTime;
    setProgress(clickPosition * 100);
  };
  return (

    <div className="min-h-screen bg-black text-gray-300 p-8 font-mono relative">
      <div className="absolute inset-0 bg-[url('/reference/Gradient1.png')] bg-center opacity-60"></div>
      <div className="relative z-10">
        <div className='lg:mb-24'>
          <Navigation />
        </div>


        {/* Main content container */}
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header text */}
          <div className="space-y-1 text-center text-[25px] font-inconsolata mb-4">
            <p className='text-[34px] font-bold'>Oh, you made it? Damn right, you did </p>
            <p className='text-[34px] font-bold text-center'>^_^ </p>
            <p className='text-[28px] font-bold'>Welcome to <span className='text-[32px] underline'><strong>"The Nights"</strong></span> (Season 1).</p>
            <p className='text-center text-[40px]'>:)</p>
            <p>This page? It's got everything you need to know.</p>
            <p>Yeah, it's a lot, but we trust you can handle it.</p>
            <p>To make it less of a drag, here's a song. Hit</p>
            <p>play, tune in, and let's get to it.</p>
          </div>
          <div className="w-full max-w-3xl bg-black rounded-lg overflow-hidden">
            <audio
              ref={audioRef}
              src="/Welcome/lazy-day-stylish-futuristic-chill-239287.mp3"  // Replace with your audio file path
              preload="metadata"
            />

            <div className="p-2 flex items-center gap-4">
              <button
                onClick={handlePlayPause}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isPlaying ? (
                  <Pause size={20} />
                ) : (
                  <Play size={20} />
                )}
              </button>

              <span className="text-gray-400 text-sm min-w-[80px]">
                {currentTime}/{duration}
              </span>

              <div
                ref={progressRef}
                className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-white hover:bg-gray-300 transition-colors"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
          {/* Black box with message */}

          <div className="relative w-full max-w-xl h-[400px] lg:h-[800px] mx-auto"> {/* Adjust height as needed */}
            <Image
              src="/signup/Group 118.png" // Add your image path here
              alt="Welcome Letter"
              fill
              className="object-contain rounded-md"
              priority
            />

          </div>


          {/* Upload box */}
          {/* <div className="border border-gray-700 rounded-lg p-4 mt-8 text-center text-gray-500">
          Upload your video here
        </div> */}
        </div>

        <div>
          <Footer />
        </div>

      </div>
    </div>
  );
};

export default WelcomePage;