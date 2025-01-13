import React from "react";

const BuilderSpacePlans = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-purple-800 px-4 py-16">
            {/* Background blur effect */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
                style={{
                    backgroundImage: "url('/images/blur-background.jpg')"
                }}
            />

            {/* Content container */}
            <div className="relative max-w-3xl mx-auto">
                {/* Section Title */}
                <div className="mb-16">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4">
                        WE&apos;VE GOT PLANS,<br />AND THEY&apos;RE SPICY
                    </h3>
                </div>

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
                        <div className="space-y-6 text-lg">
                            <p className="font-medium">
                                LAUNCHING BUILDER&apos;S SPACE (BIGGER, BETTER, SHINIER).
                            </p>
                            <p className="font-medium">
                                MORE EVENTS. MORE CHAOS. MORE MEMES.
                            </p>
                            <p className="font-medium">
                                BUILDING A PRODUCT THAT MAKES THIS WHOLE THING EVEN EASIER FOR YOU.
                            </p>
                            <p className="font-medium">
                                OH, AND WE&apos;RE HIRING!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuilderSpacePlans;