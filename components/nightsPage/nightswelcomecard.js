'use client'

import { motion } from 'framer-motion'
import BackgroundImage from '../ui/Gradient';
import { InfiniteSliderVertical } from '../homepage/InfiniteSliderVertical';
import { TextRevealByWord } from '../ui/welcometextrev';
export default function WelcomeCard() {
  return (
    <BackgroundImage imagePath="/reference/Gradient1.png">
      <div className="w-full text-white py-10 px-4 sm:px-6 lg:py-40 lg:px-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:gap-12 items-center lg:grid-cols-2">
            <div className="bg-muted rounded-md aspect-square mt-8 lg:mt-0">
              <InfiniteSliderVertical />
            </div>

            <div className="min-h-screen w-full flex flex-col items-center justify-start p-2 relative">
              {/* SVG Container - Centered */}

              <motion.div
                className="relative w-[95%] max-w-3xl rounded-[32px] bg-[#0C0C0C] p-2 backdrop-blur-sm"
                initial={{
                  boxShadow: `
            0 0 100px -15px rgba(66, 71, 112, 0.3),
            0 0 50px -12px rgba(66, 71, 112, 0.3),
            0 0 25px -6px rgba(66, 71, 112, 0.3),
            0 0 15px -4px rgba(34, 211, 238, 0.2),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1)
          `,
                }}
                whileHover={{
                  boxShadow: `
            0 0 100px -15px rgba(66, 71, 112, 0.4),
            0 0 50px -12px rgba(66, 71, 112, 0.4),
            0 0 25px -6px rgba(66, 71, 112, 0.4),
            0 0 15px -4px rgba(34, 211, 238, 0.6),
            0 0 65px -15px rgba(34, 211, 238, 0.5),
            inset 0 0 0 1px rgba(34, 211, 238, 0.4)
          `,
                  scale: 1.01,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut"
                }}
              ><div className="w-full flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-full w-full flex items-center justify-center"
                  >
                    <h1 className="text-5xl mt-2 font-bold" style={styles.heading}>WELCOME</h1>
                  </motion.div>
                </div>

                <div className='text-center'>
                  <TextRevealByWord
                    text="Build Cool Stuff. With Cooler People. 🛠Welcome to Builder's Space—where creativity meets chaos! Think Hogwarts for creators, but with fewer owls and way more memes. "
                  />
                  <button className="relative p-[0.1em]  h-[2.5em]" onClick={() => { window.location.href = 'https://www.commudle.com/communities/builders-space/events/the-nights-s1' }}>
                    <span className="relative flex justify-center items-center -bottom-[2.2em] w-[8.25em] h-[2.5em] mx-auto bg-black rounded-lg border-2 border-white text-white text-base 
                shadow-[0_0.4em_0.1em_0.019em_#fff,0_8px_16px_rgba(255,255,255,0.1)] 
                transition-all duration-300 
                hover:translate-y-[0.4em] hover:shadow-[0_0_0_0_#fff,0_4px_8px_rgba(255,255,255,0.2)]
                before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-b before:from-white/10 before:to-transparent before:rounded-lg mt-[1rem] lg:mt-[-2rem]">
                      Get Started
                    </span>
                  </button>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </BackgroundImage>
  )
}

const styles = {
  heading: {
    fontFamily: "'Product Sans', sans-serif",
    fontWeight: "bold"
  }
};