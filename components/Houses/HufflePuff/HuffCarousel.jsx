"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"  

const slides = [
    {
        image: "/houses/HufflePuff/Ui-Ux.png",
        title: "UI/UX",
        description: `Adaptive UI Framework: A UI system that learns user behavior and dynamically adjusts interface elements for optimal accessibility and efficiency.

Neural UI Personalization: AI-driven UX that redesigns itself based on real-time user emotions (detected through facial recognition or input patterns).

Touchless Gesture Navigation: A website/app navigation system controlled entirely through gestures, reducing the need for physical input.

AR-Integrated Web Browsing: A browser that overlays information and interactive elements in real-world environments using augmented reality.

Accessibility-First UI Generator: A tool that auto-generates UI components tailored for visually impaired, motor-disabled, or neurodivergent users.`,
    },
    {
        image: "/houses/HufflePuff/Ui-Ux.png",
        title: "Graphic Design",
        description: `AI-Powered Dynamic Branding: A tool that creates brand visuals that adapt based on customer interactions and market trends.

Hyper-Interactive Infographics: Graphical reports that respond to user inputs, changing dynamically based on real-time data.

Algorithmic Art Generator: A software that uses machine learning to create unique, evolving artworks based on user input.

3D Printed Business Cards: Personalized, interactive business cards with embedded AR functionality.

Neon NFT Posters: Digital posters with animated neon effects, tradeable as NFTs with customizable elements.`,
    },
    {
        image: "/houses/HufflePuff/VideoEditing.png",
        title: "Motion Graphic",
        description: `Live AI-Generated Motion Graphics: A system that creates real-time animated visuals based on trending news and social media discussions.

AI-Powered Video Intro Generator: A tool that automatically creates dynamic intros for brands based on their niche and preferences.

4D Interactive Holograms: Motion graphics that can be interacted with in a mixed-reality environment.

Quantum Glitch Effect Simulator: A real-time tool that generates futuristic glitch effects based on physics-based simulations.

Personalized Music Visualizers: A motion graphics engine that reacts to user-uploaded music, creating hyper-customized visuals.`,
    },
    {
        image: "/houses/HufflePuff/PostProduction.png",
        title: "Post Production",
        description: `AI-Enhanced Film Restoration: A tool that remasters old films by automatically adding high-quality upscaling, color correction, and missing frames.

Real-Time Deepfake Editing: A software that allows live deepfake adjustments for dubbing and character enhancement.

Holographic Film Editing: A futuristic editing suite that enables creators to manipulate video elements in 3D space using hand gestures.

AI-Based Voice Dubbing: A post-production tool that syncs dubbed audio seamlessly with actors' lip movements using AI.

Emotion-Based Color Grading: A system that suggests and applies color grading based on the emotional tone of a scene.`,
    },
    {
        image: "/houses/HufflePuff/MusicProduction.png",
        title: "Music Production",
        description: `AI-Generated Personalized Soundtracks: A tool that composes background scores based on a user's emotions and surroundings.

Brainwave Music Composer: A system that generates music based on EEG readings, creating tracks that match a person's mood.

Virtual AI Collaborator: A software that allows musicians to collaborate with an AI co-producer that understands and builds upon their style.

Live AI Mastering Tool: A cloud-based mastering tool that applies industry-level mixing & mastering in real time.

Music-Driven NFTs: A platform that allows artists to mint interactive NFTs where music changes dynamically based on market trends.`,
    },
    {
        image: "/houses/HufflePuff/Blogging.png",
        title: "Blogs & Articles",
        description: `AI-Driven Auto-Blog Generator: A tool that writes high-quality blog posts based on trending topics and real-time news insights.

Blockchain-Powered Article Verification: A decentralized platform to verify the authenticity of online articles and news sources.

Hyper-Interactive Storytelling: A blog format where readers can change the direction of the story by making choices.

Emotionally Responsive Articles: A web app that changes the tone and style of articles based on the reader's engagement and reactions.

Crowdsourced Wisdom Blog: A dynamic blogging platform where users contribute micro-content that builds into larger, well-structured articles.`,
    },
]

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const imageRef = useRef(null)
    const textContainerRef = useRef(null)
    const [containerHeight, setContainerHeight] = useState("auto")

    // Adjust text container height to match image height
    useEffect(() => {
        if (imageRef.current && textContainerRef.current) {
            setContainerHeight(`${imageRef.current.clientHeight}px`)
        }
    }, [currentSlide])

    return (
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 border-2 border-[#492424] shadow-lg shadow-[#422222]/100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Image Container - Enforcing Square Shape */}
                <div 
                    ref={imageRef} 
                    className="relative aspect-square flex items-center justify-center overflow-hidden rounded-lg"
                >
                    <Image
                        src={slides[currentSlide].image || "/placeholder.svg"}
                        alt={slides[currentSlide].title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Text Container - Scrollable, Limited to Image Height */}
                <div 
                    ref={textContainerRef} 
                    className="text-white space-y-4 overflow-y-auto p-2 pr-3"
                    style={{
                        maxHeight: containerHeight,
                        scrollbarWidth: "thin",
                        scrollbarColor: "#888 #1a1a1a"
                    }}
                >
                    <h2 className="text-2xl font-light text-center">{slides[currentSlide].title}</h2>
                    <ul className="space-y-3">
                        {slides[currentSlide].description
                            .split("\n")
                            .map((line, index) => {
                                const trimmedLine = line.trim()
                                if (!trimmedLine) return null

                                return (
                                    <li 
                                        key={index} 
                                        className="relative pl-6 font-light bg-[#222] px-3 py-2 rounded-md shadow-md border border-[#333] transition-all duration-300 hover:scale-[1.02] hover:bg-[#292929]"
                                    >
                                        <span className="absolute left-2 text-lg text-green-400">✦</span> {trimmedLine}
                                    </li>
                                )
                            })}
                    </ul>
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "w-3 h-3 rounded-full transition-all duration-300 transform",
                            currentSlide === index ? "bg-white w-5 scale-125 shadow-lg shadow-white/60" : "bg-gray-600"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    )
}