"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const slides = [
    {
        image: "/houses/Gryffindor/Development.jpeg",
        title: "Development",
        description: `Decentralized Finance (DeFi) Platforms: Blockchain-powered financial ecosystems enabling secure, transparent, and trustless transactions without intermediaries.

Edge AI Processing: AI models deployed on edge devices for real-time analytics and decision-making, reducing latency and cloud dependency.

Quantum-Resistant Cryptography: Next-gen encryption algorithms designed to withstand quantum computing threats, ensuring future-proof data security.

Blockchain for Social Development: A decentralized system that enhances transparency, reduces corruption, and improves access to financial and social services for underprivileged communities.

Human-Centered Technological Development: Innovation focused on ethical AI, user experience, and inclusivity to ensure technology serves diverse populations effectively and responsibly.

`,
    },
    {
        image: "/houses/Gryffindor/Web3.jpeg",
        title: "Web 3",
        description: `The Decentralized Internet : A blockchain-powered evolution of the web that enables peer-to-peer interactions, digital ownership, and trustless transactions, shifting control from centralized entities to users.

Identity & Privacy : A self-sovereign identity system where users control their data and digital presence using decentralized authentication and blockchain-based credentials.

Smart Contracts : Self-executing contracts on blockchain networks that automate agreements, ensuring transparency, security, and efficiency without intermediaries.

Decentralized Applications (dApps) : Web3 applications running on blockchain networks, offering censorship-resistant services, transparent governance, and enhanced security.

`,
    },
    {
        image: "/houses/Gryffindor/AIML.jpeg",
        title: "AI/ML",
        description: `Adaptive AI Models : AI/ML systems that continuously learn from real-world interactions, improving performance and decision-making over time.

Explainable Machine Learning (XML) : AI models designed for transparency, allowing users to understand how and why predictions or decisions are made.

Automated Machine Learning (AutoML) : AI-driven tools that automate data preprocessing, model selection, and hyperparameter tuning, accelerating ML development.

Federated Machine Learning : A privacy-focused approach where AI models train across decentralized devices without sharing sensitive user data.

Generative AI in Machine Learning : Deep learning models that create realistic text, images, and audio, revolutionizing content generation and automation.

`,
    },
    {
        image: "/houses/Gryffindor/DSA.jpeg",
        title: "DSA",
        description: `Optimized Sorting Algorithms : Advanced data structures and algorithms designed to enhance efficiency in sorting large datasets with minimal time complexity.

Graph Algorithms for Network Optimization : Powerful algorithms like Dijkstra's and Floyd-Warshall used for pathfinding, social networks, and real-world connectivity problems.

Dynamic Programming for Problem Solving : An optimization technique that breaks complex problems into smaller subproblems, improving computational efficiency.

Trie Data Structure for Fast Searching : A specialized tree-based structure enabling efficient storage and retrieval of strings, widely used in search engines and autocomplete features.

Balanced Trees for Efficient Data Retrieval : Self-balancing trees like AVL and Red-Black trees that ensure optimal search, insert, and delete operations.

`,
    },
    {
        image: "/houses/Gryffindor/Cybersecurity.jpeg",
        title: "Cybersecurity",
        description: `Zero Trust Security Architecture : A security model that requires continuous verification of users and devices, minimizing attack surfaces and preventing unauthorized access.

AI-Driven Threat Detection : Machine learning-powered cybersecurity systems that analyze patterns and detect anomalies in real time to prevent cyber attacks.

Blockchain for Secure Transactions : A decentralized ledger technology ensuring transparency, immutability, and security in financial and data exchanges.

Multi-Factor Authentication (MFA) : An advanced authentication system requiring multiple forms of verification to enhance security against unauthorized access.

Ethical Hacking & Penetration Testing : Simulated cyberattacks conducted by security professionals to identify and fix vulnerabilities before hackers exploit them.

`,
    },
    {
        image: "/houses/Gryffindor/GD.jpeg",
        title: "Game Development",
        description: `Concept and Design: The game development process begins with formulating a game concept, defining the storyline, characters, and gameplay mechanics. This stage sets the foundation for creating engaging levels, immersive environments, and user interactions.

Programming and Mechanics: Developers implement game mechanics and functionality through coding, using languages like C++ or C#. Game engines such as Unity or Unreal Engine are employed to bring the game elements and logic into action.

Art and Animation: Artists design the visual assets, including 2D/3D models, textures, and animations. These visuals create the game’s aesthetic, with tools like Photoshop and Blender used to bring characters and environments to life.

Testing and Optimization: Rigorous testing identifies bugs, performance issues, and gameplay imbalances. Developers then optimize performance, ensuring the game runs efficiently across various platforms and offers a smooth user experience.


`,
    },
    {
        image: "/houses/Gryffindor/ARVR.jpeg",
        title: "AR/VR",
        description: `Immersive Experience Design: AR and VR development focuses on creating highly interactive and immersive environments. Designers craft experiences that blend virtual elements with the real world (AR) or create entirely simulated worlds (VR), offering users a sense of presence and engagement.

Real-time Rendering and Graphics: Advanced rendering techniques are used to ensure seamless, real-time interactions in AR/VR environments. High-quality graphics and low latency are critical to maintaining immersion and preventing motion sickness during VR gameplay or AR applications.

Spatial Mapping and Interaction: AR/VR systems utilize sensors, cameras, and depth-tracking technologies to map the physical environment and allow intuitive interactions. This enables users to manipulate virtual objects and interact with the environment naturally through gestures and motion.

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