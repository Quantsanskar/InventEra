"use client"

import Image from "next/image"

export default function WhoAreWe() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background Image */}
            <Image src="/reference/whoarewebg.png" alt="Cosmic background" fill className="object-cover" priority />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col lg:flex-row min-h-screen w-full items-center justify-between p-4 sm:p-8 lg:p-12">
                {/* Left Column - Who Are We Text */}
                <div className="w-full lg:w-1/3 flex justify-center lg:justify-start mb-8 lg:mb-0">
                    <div className="relative">
                        <Image
                            src="/reference/WHO ARE WE.svg"
                            alt="Who Are We text"
                            height={250}
                            width={250}
                            className="object-contain"
                            priority
                        />
                        <Image
                            src="/reference/_.svg"
                            alt="Question mark"
                            height={140}
                            width={140}
                            className="object-contain absolute -right-12 top-[55%] transform rotate-6"
                            priority
                        />
                    </div>
                </div>

                {/* Right Column - Text Content */}
                <div className="w-full lg:w-2/3 max-w-3xl h-[calc(100vh-2rem)] lg:h-[calc(100vh-6rem)]">
                    <div className="rounded-3xl bg-black/70 p-4 sm:p-6 lg:p-8 backdrop-blur-sm h-full overflow-hidden">
                        <div className="prose prose-invert max-w-none h-full overflow-y-auto scrollbar-thin text-white scrollbar-thumb-gray-400 scrollbar-track-gray-900">
                            <h1 className="text-3xl font-bold mb-4 text-center">The Nights: Season One</h1>
                            <h2 className="text-xl font-semibold mb-2 text-center">
                                A 3-week rollercoaster of creativity, code, and connections
                            </h2>

                            <h3 className="text-lg font-semibold mt-6 mb-2">Program Overview</h3>
                            <p>
                                Welcome to the coolest way to kick off 2024! The Nights: Season One is a one-of-a-kind 3-week program
                                where creators, developers, artists, and innovators come together to learn, build, and show off their
                                awesomeness. Think of it as a mashup of work, fun, and "look what I made!" moments.
                            </p>

                            <h3 className="text-lg font-semibold mt-6 mb-2">What We Offer</h3>
                            <ul>
                                <li>
                                    <strong>Workshops that won't put you to sleep:</strong> Hands-on sessions to sharpen your skills.
                                </li>
                                <li>
                                    <strong>Speaker Labs:</strong> Talks by people who know their stuff and will inspire you to create
                                    better.
                                </li>
                                <li>
                                    <strong>Build Challenges:</strong> Think hackathons, but cooler.
                                </li>
                                <li>
                                    <strong>Networking:</strong> Meet people who are just as passionate (or nerdy) as you!
                                </li>
                            </ul>

                            <h3 className="text-lg font-semibold mt-6 mb-2">The Plan</h3>
                            <ul>
                                <li>
                                    <strong>3 Weeks of Virtual Magic:</strong> From the comfort of your couch, desk, or wherever you vibe
                                    best.
                                </li>
                                <li>
                                    <strong>The Grand Finale: Offline Demo Day:</strong> A real-world gathering to showcase what you've
                                    built and cheer for others.
                                </li>
                            </ul>

                            <h3 className="text-lg font-semibold mt-6 mb-2 text-center">Important Details</h3>
                            <ul className="text-center">
                                <li>
                                    <strong>Start Date:</strong> March 15th, 2025
                                </li>
                                <li>
                                    <strong>Format:</strong> Virtual (3 weeks) + Offline Demo Day (get ready to shine in person!)
                                </li>
                                <li>
                                    <strong>Contact : </strong> buildersspace9@gmail.com
                                </li>
                            </ul>

                            <p className="mt-6 text-center">
                                Because at The Nights, "Builders create, and creators build!" PS: No coding or art skills? No worries.
                                Bring your enthusiasm; we've got the rest. 🛠🎨
                            </p>

                            <h3 className="text-lg text-center font-semibold mt-6 mb-2">Stay in the Loop!</h3>
                            <p className="text-center">Don't miss out – be part of the journey!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

