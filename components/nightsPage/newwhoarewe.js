"use client"

import Image from "next/image"

export default function WhoAreWe() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background Image */}
            <Image src="/reference/Gradient1.png" alt="Cosmic background" fill className="object-cover" priority />

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
                            height={180}
                            width={180}
                            className="h-[175px] md:h-[235px] lg:h-[235px] w-[175px] md:w-[235px] lg:w-[235px] object-contain absolute -right-20 top-[54%] md:-right-36 md:top-[45%] lg:-right-36 lg:top-[45%] transform rotate-[3deg]"
                            priority
                        />
                    </div>
                </div>

  
                {/* Right Column - Text Content */}
                <div className="w-full lg:w-2/3 max-w-3xl h-[calc(100vh-2rem)] lg:h-[calc(100vh-6rem)]">
                    <div className="rounded-3xl bg-black/30 p-4 sm:p-6 lg:p-8 backdrop-blur-sm h-full overflow-hidden">
                        <div className="prose prose-invert max-w-none h-full overflow-y-auto scrollbar-thin text-white scrollbar-thumb-gray-400 scrollbar-track-gray-900">
                            <h1 className="text-3xl font-bold mb-4 text-center">What is The Nights Season 1?</h1>

                            <p className="text-center font-semibold mb-4">
                                Nights Season 1 is an exciting event where people from all fields come together to work on their ideas and create amazing projects. Whether you're into tech, design, business, entertainment, or robotics, there's a theme (or house) for everyone!
                            </p>

                            <h2 className="text-xl font-semibold mt-6 mb-2">How It Works</h2>
                            <ol className="list-decimal pl-6">
                                <li>
                                    <strong>Choose Your Theme (House):</strong>
                                    <p>Pick a theme that matches your interest and skills, like Tech, Creative Arts, Entrepreneurship, Robotics, or Entertainment.</p>
                                </li>
                                <li>
                                    <strong>Work on Your Idea:</strong>
                                    <p>Over 3 weeks, you will work virtually on a project or idea that fits your theme. Your goal is to turn your idea into a real project by the end of the event.</p>
                                </li>
                                <li>
                                    <strong>Weekly Labs & Mentorship:</strong>
                                    <p>Each week, you'll attend <strong>speaker sessions</strong> and <strong>mentorship labs</strong> to help you develop your project. Mentors will guide you, provide feedback, and share valuable insights.</p>
                                </li>
                                <li>
                                    <strong>Submit Weekly Reports:</strong>
                                    <p>At the end of each week, submit a short report showing your progress. This helps track your journey and keeps you on track.</p>
                                </li>
                                <li>
                                    <strong>Demo Day:</strong>
                                    <p>After 3 weeks, there will be an <strong>offline Demo Day</strong> where you'll present your project. Pitch your idea to an audience, including experts and judges, and showcase what you've created.</p>
                                </li>
                            </ol>

                            <h2 className="text-xl font-semibold mt-6 mb-2">Why Join Nights Season 1?</h2>
                            <ul className="list-disc pl-6">
                                <li>
                                    <strong>Learn and Grow:</strong>
                                    <p>Gain hands-on experience in your field. Learn from top speakers and mentors.</p>
                                </li>
                                <li>
                                    <strong>Build Something Amazing:</strong>
                                    <p>Turn your idea into a real project. Collaborate with like-minded people.</p>
                                </li>
                                <li>
                                    <strong>Showcase Your Work:</strong>
                                    <p>Present your project on Demo Day. Get feedback from experts and recognition for your hard work.</p>
                                </li>
                                <li>
                                    <strong>Have Fun!</strong>
                                    <p>Be part of an inspiring community. Make new friends and enjoy the creative process.</p>
                                </li>
                            </ul>

                            <h2 className="text-xl font-semibold mt-6 mb-2">Key Highlights</h2>
                            <ul className="list-disc pl-6">
                                <li><strong>3 Weeks of Creation:</strong> Work virtually at your own pace with the support of mentors.</li>
                                <li><strong>Weekly Labs:</strong> Interactive sessions to learn and improve.</li>
                                <li><strong>Offline Demo Day:</strong> Showcase your work and pitch your idea in person.</li>
                                <li><strong>Themes for Everyone:</strong> Choose from diverse themes (houses) to match your passion.</li>
                            </ul>

                            <h2 className="text-xl font-semibold mt-6 mb-2 text-center">Ready to Join?</h2>
                            <p className="text-center">
                                Get ready to unleash your creativity, build amazing projects, and make unforgettable memories at Nights Season 1. No matter your field or experience, there's a place for you here. Let's make something incredible together!
                            </p>

                            <h3 className="text-lg font-semibold mt-6 mb-2 text-center">Important Details</h3>
                            <ul className="text-center list-none">
                                <li>
                                    <strong>Start Date:</strong> March 15th, 2025
                                </li>
                                <li>
                                    <strong>Format:</strong> Virtual (3 weeks) + Offline Demo Day
                                </li>
                                <li>
                                    <strong>Contact:</strong> buildersspace9@gmail.com
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

