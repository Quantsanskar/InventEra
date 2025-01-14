import React from 'react';

const WhatYouGetSection = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-purple-800 px-4 py-16">
            {/* Background blur effect */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-100 mix-blend-overlay"
                style={{
                    backgroundImage: "url('/reference/2140371.jpg')"
                }}
            />

            {/* Content container */}
            <div className="relative max-w-3xl mx-auto">
                {/* Section Title */}
                <h2 className="text-6xl font-bold text-white mb-16">
                    WHAT DO YOU GET?
                </h2>

                {/* MacOS-style Window */}
                <div className="bg-gray-900 rounded-[2rem] p-1.5 shadow-2xl">
                    <div className="bg-black text-white p-8 rounded-[1.85rem]">
                        {/* Window Controls */}
                        <div className="flex gap-2 mb-8">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#24AA36]"></div>
                        </div>

                        {/* Card Content */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-2 text-orange-500">
                                    A LAUNCHPAD FOR YOUR IDEAS
                                </h3>
                                <p className="text-white">
                                    START WITH A SKETCH, END WITH SOMETHING YOU CAN ACTUALLY SHOW OFF
                                    (OR SELL, NO PRESSURE).
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold mb-2 text-orange-500">
                                    A COMMUNITY OF BUILDERS
                                </h3>
                                <p className="text-white">
                                    FIND YOUR TRIBE. COLLABORATE, GET FEEDBACK, AND MAYBE EVEN FIND YOUR
                                    NEXT BUSINESS PARTNER.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold mb-2 text-orange-500">
                                    EVENTS THAT SLAP
                                </h3>
                                <p className="text-white">
                                    THINK HACKATHONS, ART EXPOS, FILM SCREENINGS, AND PROBABLY SOME
                                    KARAOKE (WE'RE SERIOUS ABOUT THIS ONE).
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold mb-2 text-orange-500">
                                    GLOBAL RECOGNITION
                                </h3>
                                <p className="text-white">
                                    YOUR WORK DESERVES THE SPOTLIGHT. WE'LL HELP YOU SHARE IT WITH THE WORLD.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatYouGetSection;