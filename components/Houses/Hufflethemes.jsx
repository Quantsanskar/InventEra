"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"

const categories = ["Animation", "Graphic Design", "Motion Graphic", "Music Production", "UI/UX", "Blogging"]

const CategoriesSection = () => {
  return (
    <main className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Video Section */}
        <div className="relative w-full h-full aspect-[4/3] md:aspect-[16/9] bg-[#111111] rounded-2xl border border-[#222222] flex items-center justify-center">
          
          <p className="text-white text-lg md:text-xl lg:text-2xl px-4 text-center z-10">
            videos here..
          </p>
        </div>

        {/* Categories Section */}
        <div className="relative bg-[#FFD700] rounded-2xl p-6 md:p-8">
         
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center space-y-3">
            {/* SVG Decoration */}
            <div className="relative w-[508px] h-24 flex justify-space-between">
              <img
                src="/houses/HufflePuff/Huff_Categ.svg"
                alt="Category Heading Decoration"
                className="w-full h-auto rotate-0"
              />
            </div>

            {/* Category List */}
            <div className="grid gap-3 md:gap-4 w-full max-w-lg">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group flex items-center justify-between bg-black/90 hover:bg-black/80 text-white rounded-full px-6 py-3.5 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <span className="text-base md:text-lg lg:text-xl font-medium">{category}</span>
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
};
export default CategoriesSection;
