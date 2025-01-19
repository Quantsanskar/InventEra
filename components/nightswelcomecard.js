'use client'

import { motion } from 'framer-motion'
import BackgroundImage from './ui/Gradient'
import ImageVertical, { InfiniteSliderVertical } from './homepage/InfiniteSliderVertical';
import { TextRevealByWord } from './ui/welcometextrev';
export default function WelcomeCard() {
  return (
    <BackgroundImage imagePath="/reference/Gradient1.png">
      <div className="w-full text-white py-10 px-4 sm:px-6 lg:py-40 lg:px-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:gap-12 items-center lg:grid-cols-2">
            <div className="bg-muted rounded-md aspect-square mt-8 lg:mt-0">
              <InfiniteSliderVertical />
            </div>

            <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 relative">
              {/* SVG Container - Centered */}

              <motion.div
                className="relative w-[95%] max-w-3xl rounded-[32px] bg-[#0C0C0C] p-8 sm:p-10 md:p-12 backdrop-blur-sm"
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
              ><div className="w-full flex justify-center mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                  >
                    <img
                      src="/reference/WELCOME !.svg"
                      height="400"
                      width="400"
                      className="max-h-[200px] object-contain"
                      alt="Who Are We?"
                    />
                  </motion.div>
                </div>

                <div>
                  <TextRevealByWord
                    text="Build Cool Stuff. With Cooler People. 🛠Welcome to Builder's Space—where creativity meets chaos! Think Hogwarts for creators, but with fewer owls and way more memes. "
                  />
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </BackgroundImage>
  )
}