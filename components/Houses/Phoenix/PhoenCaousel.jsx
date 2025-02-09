"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const slides = [
    {
        image: "/houses/Phoenix/ProductMan.jpeg",
        title: "Product Management",
        description: `> Strategic Vision : Setting the product's long-term goals, aligning with market needs, and defining the roadmap for development.

        > Cross-Functional Leadership : Collaborating with design, engineering, marketing, and sales teams to build and deliver the product.

        > Customer-Centric : Prioritizing user needs through research, feedback, and data analysis to create valuable solutions.

        > Lifecycle Management : Overseeing the product's journey from concept to launch, and driving continuous improvements post-launch.

        > Prioritization : Balancing features, improvements, and resource allocation to maximize product impact.

        > Customer Focus: Gathering user feedback, analyzing customer behavior, and ensuring the product meets customer demands.

`,
    },
    {
        image: "/houses/Phoenix/BuisnessDev.jpeg",
        title: "Business Development",
        description: `> Market Expansion: Exploring new markets, customer segments, or regions to expand the companys reach and revenue.

        > Partnerships & Alliances: Building strategic relationships with other businesses to drive mutual growth, such as joint ventures, collaborations, or distribution deals.

        > Sales Strategy: Developing and refining sales strategies to acquire new customers, increase sales, and build long-term relationships.

        > Networking: Engaging with industry stakeholders, attending events, and building connections that could lead to business opportunities.

        > Competitive Analysis: Monitoring competitors and market trends to identify gaps, opportunities, and potential risks.

        `,
    },
    {
        image: "/houses/Phoenix/Marketing.jpeg",
        title: "Marketing",
        description: `> Market Research: Gathering data to understand consumer preferences, trends, competitors, and target markets for informed decision-making.

        > Brand Development: Creating and maintaining a strong brand identity that resonates with customers, including messaging, visuals, and overall perception.

        > Content Creation: Developing engaging and relevant content (blogs, videos, social media posts) that informs, entertains, and attracts potential customers.

        > Digital Marketing: Utilizing online channels such as social media, search engines, email marketing, and websites to reach and engage audiences.

        > Advertising & Promotion: Running targeted advertising campaigns (online and offline) to raise awareness, drive traffic, and boost conversions.
        
        `,
    },
    {
        image: "/houses/Phoenix/StartupPitch.jpeg",
        title: "Startup Pitching",
        description: `> Problem Statement: Identify the problem your startup solves and why it's important.

       > Unique Solution: Explain your product or service and how it uniquely addresses the problem.

       > Market Opportunity: Define your target market, its size, and potential for growth.

       > Business Model: Describe how your startup plans to generate revenue and sustain profitability.
       
       > Traction & Milestones: Share any progress, such as product development, customer acquisition, or partnerships.

       > Team Strength: Highlight the expertise and experience of your team that makes them capable of executing the plan successfully.

       `,
    },
    {
        image: "/houses/Phoenix/Communitymanage.jpeg",
        title: "Community Building",
        description: `> Shared Purpose: Establishing a clear mission or common goal that brings individuals together and fosters a sense of belonging.

        > Engagement & Interaction: Encouraging active participation through discussions, events, and activities that promote meaningful interactions.

        > Trust & Support: Building an environment of trust where members feel supported, heard, and valued by the community and its leaders.

        > Content & Value: Providing valuable resources, information, and opportunities that keep members engaged and motivated to participate.

        > Leadership & Moderation: Appointing community leaders or moderators who guide discussions, maintain a positive atmosphere, and resolve conflicts.

        `,
    },
    {
        image: "/houses/Phoenix/EventManage.jpeg",
        title: "Event Management",
        description: `> Planning & Coordination: Defining the event's goals, developing a detailed plan, and coordinating logistics such as venue, time, and resources.

        > Budget Management: Creating and managing the event budget to ensure all aspects, from venue to marketing, fit within financial constraints.

        > Venue & Vendors: Selecting the right location, negotiating contracts, and coordinating with vendors (e.g., catering, audiovisual, decor) for event success.
    
        > Marketing & Promotion: Developing strategies to promote the event and attract attendees through social media, email campaigns, and advertising.

        > Attendee Experience: Designing an engaging experience for participants, including registration, entertainment, and interactive elements.

`,
    },
    
]

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0)

    return (
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 border-2 border-[#250440] shadow-lg shadow-[#250440]/100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative aspect-square rounded-lg overflow-hidden transition-opacity duration-300">
                    <Image
                        src={slides[currentSlide].image || "/placeholder.svg"}
                        alt={slides[currentSlide].title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="text-white space-y-6">
                    <h2 className="text-4xl font-light text-center">{slides[currentSlide].title}</h2>
                    <div className="space-y-4 text-gray-300 whitespace-pre-line">
                        <p className="font-light">{slides[currentSlide].description}</p>
                    </div>
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            currentSlide === index ? "bg-white w-4" : "bg-gray-600",
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    )
}