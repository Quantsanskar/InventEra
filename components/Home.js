import React from 'react';
import Head from 'next/head';
import Header from './Header';
const HomePage=()=> {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Head>
        <title>Dream. Create.</title>
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
      <div className="relative z-20 flex items-center justify-center h-full">
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
    </div>
  );
}
export default HomePage;