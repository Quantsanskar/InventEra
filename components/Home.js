import React, { useRef } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from './Header';
import { useRouter } from 'next/router';


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};



const MainPage = () => {
  const bottomRef = useRef(null);
  const additionalContentRef = useRef(null);
  const router = useRouter();

  const handleExploreClick = () => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const openBuildersSpace=()=>{
    router.push('/joinpage');
  }

  const handleAdditionalContentClick = () => {
    additionalContentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen w-full">
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
          filter: 'brightness(0.7)',
        }}
      />

      {/* Centered Text */}
      <div className="relative z-9 flex items-center justify-center h-full">
        <div className="text-center">
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg tracking-wide"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            Dream.
          </motion.h1>
          <motion.h2
            className="text-4xl md:text-6xl font-light text-white drop-shadow-md mt-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Create.
          </motion.h2>
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

      {/* Bottom Content */}
      <div
        ref={bottomRef}
        className="pt-40 pb-80 px-8 md:px-16 bg-gray-900 text-white"
      >
        <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: false, amount: 0.1 }}>
          <motion.h1
            className="text-4xl md:text-6xl font-medium text-left mb-8"
            variants={fadeInUp}
          >
            Hey.
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-medium text-left mb-8"
            variants={fadeInUp}
          >
            This is like a 10-minute read.
          </motion.p>
          <motion.p
            className="text-xl md:text-2xl font-medium text-left mb-8"
            variants={fadeInUp}
          >
            Usually, I think being concise is far superior — but, in this case, I let
            myself just write and tell our story in a really raw way.
          </motion.p>
          <motion.ul
            className="text-xl md:text-2xl font-medium text-left mb-8"
            variants={stagger}
          >
            {['We killed a $1.5m biz.', 'In 2023 we got huge.', 'Saying "no" to a $2m gov deal.', 'We wanna do better in 2024.'].map(
              (item, index) => (
                <motion.li key={index} variants={fadeInUp}>
                  {item}
                </motion.li>
              )
            )}
          </motion.ul>
        </motion.div>

   
        <div className="mt-12 flex justify-center">
          <button
            className="bg-white bg-opacity-30 hover:bg-opacity-50 text-white font-medium py-3 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300"
            onClick={handleAdditionalContentClick}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Additional Content */}
      <div
        ref={additionalContentRef}
        className="pt-40 pb-80 px-8 md:px-16 bg-background dark:bg-background text-white"
      >
        <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: false, amount: 0.1 }}>
          <motion.h1
            className="text-4xl md:text-6xl font-medium text-left mb-8"
            variants={fadeInUp}
          >
            Builder's Space
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-medium text-left mb-8"
            variants={fadeInUp}
          >
            Build cool stuff. With cooler people.
          </motion.p>

          <motion.div variants={stagger}>
            <motion.div variants={fadeInUp} className="mb-8">
              <motion.h2
                className="text-3xl font-bold mb-4"
                variants={fadeInUp}
              >
                Okay, so...what is this?
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl mb-4"
                variants={fadeInUp}
              >
                We're <strong>Builder's Space</strong>—a platform where anyone from <strong>tech wizards</strong> to <strong>paintbrush-wielding maniacs</strong> can build, showcase, and share their wildest ideas. It's like Hogwarts for creators but with fewer owls and more memes.
              </motion.p>
              <motion.p
                className="text-xl md:text-2xl mb-4"
                variants={fadeInUp}
              >
                Whether you're coding a groundbreaking app, directing a short film, crafting a new Michelin-star recipe, or creating the next viral dance trend—this is where you belong.
              </motion.p>
              <motion.p
                className="text-xl md:text-2xl mb-4"
                variants={fadeInUp}
              >
                Oh, and did we mention? <strong>No degrees. No boring lectures. Just you, your passion, and a gang of equally ambitious misfits.</strong>
              </motion.p>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-8">
              <motion.h2
                className="text-3xl font-bold mb-4"
                variants={fadeInUp}
              >
                What's the vibe?
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl mb-4"
                variants={fadeInUp}
              >
                Imagine a place where:
              </motion.p>
              <motion.ul
                className="text-xl md:text-2xl list-none pl-0 mb-4"
                variants={stagger}
              >
                {[
                  '🎨 Artists vibe with developers.',
                  '🛠 Hackers team up with chefs.',
                  '🎮 Gamers share tips with filmmakers.'
                ].map((item, index) => (
                  <motion.li key={index} variants={fadeInUp}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.p
                className="text-xl md:text-2xl"
                variants={fadeInUp}
              >
                You bring the spark, we bring the fuel (and the pizza 🍕). It's all about collaboration, creativity, and a little bit of chaos.
              </motion.p>
            </motion.div>

            {/* Continue adding the rest of the content with motion variants */}
            <motion.div variants={fadeInUp} className="mb-8">
              <motion.h2
                className="text-3xl font-bold mb-4"
                variants={fadeInUp}
              >
                What's the point of all this?
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl mb-4"
                variants={fadeInUp}
              >
                Good question. We're building a <strong>new system for creators</strong>, one that's not stuck in the hamster wheel of "get a degree → grind at a job you hate → repeat."
              </motion.p>
              <motion.p
                className="text-xl md:text-2xl mb-4"
                variants={fadeInUp}
              >
                Here's what we think:
              </motion.p>
              <motion.ul
                className="text-xl md:text-2xl list-disc pl-8 mb-4"
                variants={stagger}
              >
                {[
                  'Passion > Prestige',
                  'Collaboration > Competition',
                  'Building > Dreaming (but dreaming is cool too)'
                ].map((item, index) => (
                  <motion.li key={index} variants={fadeInUp}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
              {/* Continue with the remaining content... */}
            </motion.div>
            <motion.div variants={fadeInUp} className="mb-8">
              <motion.h2
                className="text-3xl font-bold mb-4"
                variants={fadeInUp}
              >
                Our goal?
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl mb-4"
                variants={fadeInUp}
              >
                To help you create what you love and turn it into something real—whether that's your next paycheck, a viral hit, or just a killer portfolio piece.
              </motion.p>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-8">
              <motion.h2
                className="text-3xl font-bold mb-4"
                variants={fadeInUp}
              >
                What do you get?
              </motion.h2>
              <motion.ul
                className="text-xl md:text-2xl list-none pl-0 mb-4"
                variants={stagger}
              >
                {[
                  '🚀 **A Launchpad for Your Ideas**\nStart with a sketch, end with something you can actually show off (or sell, no pressure).',
                  '🤝 **A Community of Builders**\nFind your tribe. Collaborate, get feedback, and maybe even find your next business partner.',
                  '🎉 **Events That Slap**\nThink hackathons, art expos, film screenings, and probably some karaoke (we\'re serious about this one).',
                  '🌐 **Global Recognition**\nYour work deserves the spotlight. We\'ll help you share it with the world.'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={fadeInUp}
                    className="mb-4"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </motion.ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-8">
              <motion.h2
                className="text-3xl font-bold mb-4"
                variants={fadeInUp}
              >
                Wait, can I join?
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl mb-4"
                variants={fadeInUp}
              >
                <em>Can you build stuff?</em>
              </motion.p>
              <motion.p
                className="text-xl md:text-2xl mb-4"
                variants={fadeInUp}
              >
                No? Cool. We'll teach you.
              </motion.p>
              <motion.p
                className="text-xl md:text-2xl mb-4"
                variants={fadeInUp}
              >
                Yes? Cool. Come show off.
              </motion.p>
              <motion.p
                className="text-xl md:text-2xl mb-4"
                variants={fadeInUp}
              >
                Basically, if you've got ideas and a desire to create, you're in. Doesn't matter if you're a noob or a pro—<strong>we've got room for everyone.</strong>
              </motion.p>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-8">
              <motion.h2
                className="text-3xl font-bold mb-4"
                variants={fadeInUp}
              >
                2024 is BIG.
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl mb-4"
                variants={fadeInUp}
              >
                We've got plans, and they're spicy 🌶️:
              </motion.p>
              <motion.ul
                className="text-xl md:text-2xl list-disc pl-8 mb-4"
                variants={stagger}
              >
                {[
                  'Launching **Builder\'s Space 2.0** (*bigger, better, shinier*).',
                  'More events. More chaos. More memes.',
                  'Building a product that makes this whole thing *even easier* for you.',
                  'Oh, and *we\'re hiring*!'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={fadeInUp}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </motion.ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-8 text-center">
              <motion.h2
                className="text-4xl font-bold mb-4"
                variants={fadeInUp}
              >
                Ready to build?
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl mb-4"
                variants={fadeInUp}
              >
                We're here to help you turn your ideas into reality. It's time to stop thinking, start creating, and maybe even change the world. (Or at least impress your friends.)
              </motion.p>
              <motion.button
                className="bg-white bg-opacity-30 hover:bg-opacity-50 text-white font-medium py-3 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300 mt-4"
                variants={fadeInUp}
                onClick={openBuildersSpace}
              >
                👉 Join Builder's Space
              </motion.button>
              <motion.p
                className="text-xl md:text-2xl mt-4"
                variants={fadeInUp}
              >
                Let's build something awesome together.
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default MainPage;