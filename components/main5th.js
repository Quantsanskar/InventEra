import React from "react";

const TheNights = () => {
    const thenights = () => {
        window.location.href = "/thenights";
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-purple-800 px-4 py-16">
            {/* Background blur effect */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-100 mix-blend-overlay"
                style={{
                    backgroundImage: "url('/reference/wp12492907-dark-sky-4k-wallpapers.jpg')"
                }}
            />
            
            {/* Content container */}
            <div className="relative max-w-3xl mx-auto">
                {/* Header Title with Arrow and Message */}
                <div className="flex items-center gap-6 mb-16">
                    <div className="bg-[#f5f5f4] rounded-full px-6 py-3 w-fit cursor-pointer hover:shadow-lg transition-shadow" onClick={thenights}>
                        <h1 className="text-2xl md:text-3xl font-bold text-black">
                            THE NIGHTS
                        </h1>
                    </div>
                    
                    {/* Arrow and Message */}
                    <div className="flex items-center gap-4">
                        <div className="h-[2px] w-16 bg-white relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-white transform rotate-45"></div>
                        </div>
                        <div className="bg-[#2e3192] text-white px-4 py-2 rounded-lg border border-white/20 shadow-xl backdrop-blur-sm cursor-pointer" onClick={thenights}>
                            <p className="text-sm font-medium">Know more about our first season, click here</p>
                        </div>
                    </div>
                </div>

                {/* Introduction Window */}
                <div className="bg-black rounded-[2rem] p-1.5 shadow-2xl mb-8 w-11/12">
                    <div className="bg-[#f5f5f4] p-6 rounded-[1.85rem]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#24AA36]"></div>
                            </div>
                            <span className="font-bold text-black">INTRODUCTION</span>
                        </div>
                        <p className="text-black font-medium">
                            NIGHTS $1 IS MORE THAN AN EVENT; IT&apos;S A MOVEMENT. IT&apos;S A PLACE WHERE DREAMERS MEET DOERS, WHERE ARTISTS AND TECHNOLOGISTS COLLABORATE, AND WHERE CREATORS ACROSS ALL FIELDS COME TOGETHER TO INSPIRE AND INNOVATE.
                        </p>
                    </div>
                </div>

                {/* Our Mission Window */}
                <div className="bg-black rounded-[2rem] p-1.5 shadow-2xl mb-8 ml-auto w-11/12">
                    <div className="bg-[#f5f5f4] p-6 rounded-[1.85rem]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#24AA36]"></div>
                            </div>
                            <span className="font-bold text-black">OUR MISSION</span>
                        </div>
                        <p className="text-black font-medium">
                            TO PROVIDE A PLATFORM THAT NURTURES CREATIVITY, FOSTERS COLLABORATION, AND EMPOWERS INDIVIDUALS FROM DIVERSE DOMAINS TO TURN IDEAS INTO IMPACTFUL PROJECTS.
                        </p>
                    </div>
                </div>

                {/* Our Vision Window */}
                <div className="bg-black rounded-[2rem] p-1.5 shadow-2xl mb-8 w-11/12">
                    <div className="bg-[#f5f5f4] p-6 rounded-[1.85rem]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#24AA36]"></div>
                            </div>
                            <span className="font-bold text-black">OUR VISION</span>
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

export default TheNights;