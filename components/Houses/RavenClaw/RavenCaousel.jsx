"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const slides = [
    {
        image: "/houses/RavenClaw/Robotics.png",
        title: "Robotics",
        description: `Adaptive Robotics Framework: A robotic control system that learns from user interactions, optimizing its movements and responses for efficiency and safety.

Emotion-Aware Robotics: AI-driven robots that adjust their behavior in real-time based on human emotions detected through facial recognition and biometric sensors.

Gesture-Based Robot Control: A fully touchless interface allowing users to control robots through hand gestures and motion tracking, eliminating the need for physical controllers.

Augmented Reality Robotics Interface: A system that overlays real-time robot diagnostics, controls, and environmental data through AR, enhancing operational efficiency.

Accessibility-First Robotics Design: A robotics platform that dynamically adapts to users with physical disabilities, eye tracking, or brain-computer interfaces.

`,
    },
    {
        image: "/houses/RavenClaw/Hardware.png",
        title: "Hardware",
        description: `Modular Design : Hardware components are designed for easy upgrades and customization, allowing flexibility in various applications.

High-Performance Processors : Advanced multi-core processors deliver faster computation, improved multitasking, and higher efficiency.

Energy Efficiency : Optimized power consumption mechanisms enhance battery life and reduce overall energy wastage. Low-power architectures and intelligent power management help devices run longer without overheating or excessive power drain.

Durability & Materials : High-strength materials such as reinforced alloys, carbon composites, and nanomaterials improve longevity and resilience. These materials ensure that hardware can withstand extreme conditions, reducing wear and tear over time.

`,
    },
    
    {
        image: "/houses/RavenClaw/IoT.png",
        title: "IOT",
        description: `Seamless Connectivity : IoT enables smart devices to communicate and share data in real-time, creating a highly connected and automated ecosystem across industries, homes, and cities.

Real-Time Data & Analytics : Sensors and embedded systems collect and process data instantly, allowing businesses and users to monitor, analyze, and optimize performance for better decision-making.

Automation & Efficiency : IoT-driven automation reduces manual tasks by integrating AI and smart controls, improving operational efficiency in industries, healthcare, agriculture, and smart homes.

Security & Privacy : Strong encryption, secure authentication, and advanced cybersecurity measures protect IoT networks, ensuring data privacy and safeguarding against cyber threats.

`,
    },
    {
        image: "/houses/RavenClaw/Automation.png",
        title: "Automation",
        description: `Smart Industrial Automation: AI-driven automation systems optimizing workflows and reducing human intervention in manufacturing and logistics.

Home Automation AI: A self-learning home automation system that adapts to user behavior for energy efficiency and convenience.

Automated Quality Control: AI-powered vision systems that detect defects and irregularities in real-time, ensuring high production standards.

Predictive Maintenance: AI-driven predictive analytics for machinery and systems, preventing failures and optimizing maintenance schedules.

Autonomous Supply Chain: Intelligent automation managing inventory, logistics, and distribution for seamless supply chain operations.

`,
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