"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"

const categories = ["Robotics", "Hardware", "IOT", "Automation"]

const CategoriesSection = () => {
    return (
        <main className="min-h-screen bg-black p-4 md:p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Left Column (SVG + Video) */}
                <div className="flex flex-col items-end">
                    {/* SVG Section */}
                    <div className="relative z-10 flex justify-end lg:mr-[-12%]">
                        <img
                            src="/houses/RavenClaw/sidesvg.svg"
                            alt="SVG"
                            className="w-[270px] md:w-[340px] mb-[-10%] h-auto"
                        />
                    </div>

                    {/* Videos Section - Directly Below SVG */}
                    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-[#111111] rounded-2xl border border-[#222222] flex items-center justify-center h-[400px] sm:h-[400px] md:h-[500px]">
                        <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl px-4 text-center z-10">
                            video coming soon..
                        </p>
                    </div>
                </div>



                {/* Right Column (Categories) */}
                <div className="relative bg-[#5854E8] rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col h-full justify-between">

                    {/* SVG Decoration */}
                    <div className="flex justify-center">
                        <img
                            src="/houses/RavenClaw/RavenSVG.svg"
                            alt="Category Heading Decoration"
                            className="w-[100%] lg:w-[100%] ml-[15%]"
                        />
                    </div>

                    {/* Category List - Flex Grow for Equal Spacing */}
                    <div className="flex-1 flex flex-col justify-center gap-2 md:gap-6 w-full max-w-sm mt-6 mx-auto">
                        {categories.map((category) => (
                            <Link
                                key={category}
                                href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                                className="group flex items-center justify-between bg-black/90 hover:bg-black/80 text-white rounded-full px-6 py-4 transition-all duration-200 transform hover:scale-[1.02]"
                            >
                                <span className="text-base md:text-lg lg:text-xl font-medium flex-1 text-center">
                                    {category}
                                </span>
                                <ChevronRight className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-200 group-hover:translate-x-1" />
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </main >
    )
};

export default CategoriesSection;
