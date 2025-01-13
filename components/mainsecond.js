import React from 'react';

const VibeSection = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-purple-800 px-4 py-16">
            {/* Background blur effect for crowd image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
                style={{
                    backgroundImage: "url('/images/crowd-background.jpg')"
                }}
            />

            {/* Content container */}
            <div className="relative max-w-3xl mx-auto">
                {/* Section Title */}
                <h2 className="text-6xl font-bold text-white mb-16">
                    WHAT'S THE VIBE?
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
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold mb-6">
                                IMAGINE A PLACE WHERE:
                            </h3>

                            <div className="space-y-4 text-lg font-medium">
                                <p>
                                    ARTISTS VIBE WITH DEVELOPERS.
                                </p>
                                <p>
                                    HACKERS TEAM UP WITH CHEFS.
                                </p>
                                <p>
                                    GAMERS SHARE TIPS WITH FILMMAKERS.
                                </p>
                                <p className="pt-4">
                                    YOU BRING THE SPARK, WE BRING THE FUEL (AND THE PIZZA 🍕). IT'S ALL
                                    ABOUT COLLABORATION, CREATIVITY, AND A LITTLE BIT OF CHAOS.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VibeSection;