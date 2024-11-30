import React, { useRef } from 'react';
import Head from 'next/head';
import Header from './Header';

const HomePage = () => {
  const bottomRef = useRef(null);

  const handleExploreClick = () => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen w-full ">
      <Head>
        <title>Builders' Space</title>
        <meta name="description" content="Inspiring landing page" />
      </Head>

      {/* Navbar Component */}
      <Header />

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("/images/main-bg.jpg")',
          filter: 'brightness(0.7)'
        }}
      />

      {/* Centered Text */}
      <div className="relative z-9 flex items-center justify-center h-full">
        <div className="text-center">
          <h1
            className="text-6xl md:text-8xl font-bold text-white
            drop-shadow-lg tracking-wide animate-fade-in"
          >
            Dream.
          </h1>
          <h2
            className="text-4xl md:text-6xl font-light text-white
            drop-shadow-md mt-4 animate-fade-in-delay"
          >
            Create.
          </h2>
        </div>
      </div>

      {/* Explore Button */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-9">
        <button
          className="bg-white bg-opacity-30 hover:bg-opacity-50 text-white font-medium py-3 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300"
          onClick={handleExploreClick}
        >
          Explore
        </button>
      </div>

      {/* Scrolled Content */}
      <div
        ref={bottomRef}
        className="pt-40 pb-80 px-8 md:px-16 bg-gray-900 text-white"
      >
        <h1 className="text-4xl md:text-6xl font-medium text-left mb-8">
          hey.
        </h1>
        <p className="text-1xl md:text-2xl font-medium text-left mb-8">
          this is like a 10-minute read.
        </p>
        <p className="text-1xl md:text-2xl font-medium text-left mb-8">
          usually, i think being concise is far superior -- but, in this case, i let
          myself just write and tell our story in a really raw way. this company
          is over four years old now, and i want to bring everybody on the same
          page.
        </p>
        <p className="text-1xl md:text-2xl font-medium text-left mb-8">
          so, if you want to dig into stuff like where we messed up, where we
          were geniuses, and what's next then read on.
        </p>
        <p className="text-1xl md:text-2xl font-medium text-left mb-8">
          else. tldr:
        </p>
        <ul className="text-1xl md:text-2xl font-medium text-left">
          <li>we killed a $1.5m biz.</li>
          <li>in 2023 we got huge.</li>
          <li>saying "no" to a $2m gov deal.</li>
          <li>we wanna do better in 2024.</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;