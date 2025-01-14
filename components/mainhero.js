import React from 'react';

const BuildersSpaceHero = () => {
    return (
        <div className="min-h-screen bg-black">
            {/* Top Section with Background Image */}
            <div
                className="relative h-64 bg-gradient-to-b from-amber-500 to-amber-600"
                style={{
                    backgroundImage: `url('/reference/city-bg.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {/* Logo in top right */}
                <div className="absolute top-4 right-4">
                    <div className="w-20 h-20 bg-white dark:bg-white rounded-full flex items-center justify-center">
                        <img src="/reference/Logo_transparent.jpg" alt="Custom Logo" className="w-14 h-14" />
                    </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-8 transform translate-y-1/2">
                    <h1 className="text-6xl font-bold text-white leading-tight">
                        Builder's<br /><span className='font-bold z-20 text-white bg-black bg-opacity-100 px-2'></span>
                    </h1>
                </div>
            </div>

            {/* Content Section with Background Image and Gradient */}
            <div
                className="relative px-8 pt-20 z-1 pb-12 text-white opacity-100"
                style={{
                    backgroundImage: `url('/reference/wp14028114-alone-at-night-wallpapers.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay',
                    // backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }}
            >

                <h1 className="text-6xl font-bold text-white leading-tight -mt-20" >
                    <span className="font-bold text-white" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>Space</span>
                </h1>


                {/* Tagline */}
                <p className="relative text-orange-500 font-bold text-xl mb-8 mt-10">
                    BUILD COOL STUFF, WITH COOLER PEOPLE.
                </p>

                {/* "What is this" Section */}
                <h2 className="relative text-4xl mb-8 mt-10 text-center">Okay, so...what is this?</h2>

                {/* Info Card Container */}
                <div className="relative flex justify-center items-center">

                    {/* Info Card */}
                    <div className="bg-black dark:bg-black text-white dark:text-white p-8 rounded-3xl max-w-2xl">
                        {/* Window Controls */}
                        <div className="flex gap-2 mb-6">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#24AA36]"></div>
                        </div>

                        {/* Card Content */}
                        <div className="space-y-6 font-medium">

                            <p>
                                WE'RE BUILDER'S SPACE—A PLATFORM WHERE ANYONE FROM TECH WIZARDS TO
                                PAINTBRUSH-WIELDING MANIACS CAN BUILD, SHOWCASE, AND SHARE THEIR WILDEST
                                IDEAS. IT'S LIKE HOGWARTS FOR CREATORS BUT WITH FEWER OWLS AND MORE MEMES.
                            </p>

                            <p>
                                WHETHER YOU'RE CODING A GROUNDBREAKING APP, DIRECTING A SHORT
                                FILM, CRAFTING A NEW MICHELIN-STAR RECIPE, OR CREATING THE NEXT VIRAL
                                DANCE TREND—THIS IS WHERE YOU BELONG.
                            </p>

                            <p>
                                OH, AND DID WE MENTION? NO DEGREES. NO BORING LECTURES. JUST YOU, YOUR
                                PASSION, AND A GANG OF EQUALLY AMBITIOUS MISFITS.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildersSpaceHero;