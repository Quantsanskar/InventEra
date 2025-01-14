import React from "react";
const EventHighlights = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-purple-800 px-4 py-16">
            {/* Background blur effect */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-100 mix-blend-overlay"
                style={{
                    backgroundImage: "url('/reference/2140373.jpg')"
                }}
            />

            {/* Content container */}
            <div className="relative max-w-3xl mx-auto">
                {/* Section Title */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-16">
                    EVENT HIGHLIGHTS
                </h2>

                {/* Keynote Speakers Window */}
                <div className="bg-black rounded-[2rem] p-1.5 shadow-2xl mb-8 w-11/12">
                    <div className="bg-[#f5f5f4] p-6 rounded-[1.85rem]">
                        {/* Window Controls */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#24AA36]"></div>
                            </div>
                            <span className="font-bold text-black">KEYNOTE SPEAKERS</span>
                        </div>
                        <p className="text-black font-medium">
                            NIGHTS $1 IS MORE THAN AN EVENT; IT&apos;S A MOVEMENT. IT&apos;S A PLACE WHERE DREAMERS MEET DOERS, WHERE ARTISTS AND TECHNOLOGISTS COLLABORATE, AND WHERE CREATORS ACROSS ALL FIELDS COME TOGETHER TO INSPIRE AND INNOVATE.
                        </p>
                    </div>
                </div>

                {/* Workshops Window */}
                <div className="bg-black rounded-[2rem] p-1.5 shadow-2xl mb-8 ml-auto w-11/12">
                    <div className="bg-[#f5f5f4] p-6 rounded-[1.85rem]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#24AA36]"></div>
                            </div>
                            <span className="font-bold text-black">WORKSHOPS</span>
                        </div>
                        <p className="text-black font-medium">
                            TO PROVIDE A PLATFORM THAT NURTURES CREATIVITY, FOSTERS COLLABORATION, AND EMPOWERS INDIVIDUALS FROM DIVERSE DOMAINS TO TURN IDEAS INTO IMPACTFUL PROJECTS.
                        </p>
                    </div>
                </div>

                {/* Competitions Window */}
                <div className="bg-black rounded-[2rem] p-1.5 shadow-2xl mb-8 w-11/12">
                    <div className="bg-[#f5f5f4] p-6 rounded-[1.85rem]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#24AA36]"></div>
                            </div>
                            <span className="font-bold text-black">COMPETITIONS</span>
                        </div>
                        <p className="text-black font-medium">
                            A WORLD WHERE EVERY CREATOR HAS THE TOOLS, COMMUNITY, AND OPPORTUNITIES TO BRING THEIR VISION TO LIFE.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventHighlights;