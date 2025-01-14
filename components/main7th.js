import React from "react";
const NetworkingLounges = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-purple-800 px-4 py-16">
            {/* Background blur effect with network pattern */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-100 mix-blend-overlay"
                style={{
                    backgroundImage: "url('/reference/wp14867625-4k-dark-night-wallpapers.webp')"
                }}
            />

            {/* Content container */}
            <div className="relative max-w-3xl mx-auto">
                {/* Section Title */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-16">
                    NETWORKING<br />LOUNGES
                </h2>

                {/* MacOS-style Window */}
                <div className="bg-gray-900 rounded-[2rem] p-1.5 shadow-2xl">
                    <div className="bg-black p-6 rounded-[1.85rem]">
                        {/* Window Controls */}
                        <div className="flex gap-2 mb-8">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#24AA36]"></div>
                        </div>

                        {/* Content */}
                        <ul className="space-y-6 text-orange-500 font-bold text-lg">
                            <li className="flex items-start">
                                <span className="mr-4">•</span>
                                <span>ENGAGE IN ONE-ON-ONE DISCUSSIONS WITH MENTORS AND PEERS.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-4">•</span>
                                <span>SPECIALIZED LOUNGES FOR TECH, ARTS, AND BUSINESS.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkingLounges;