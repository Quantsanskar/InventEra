import Image from "next/image"
import Link from "next/link"
import { Instagram, Github, Twitter, Linkedin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/homepage/Navigation"
import { Footer } from "@/components/footer"
import SocialLinksEditor from "@/components/dashboard/socialhandles"
import EditableYoutubeCard from "@/components/dashboard/videos"
import EditableDescriptionCard from "@/components/dashboard/description"
import ProfileIcon from "@/components/dashboard/profileicon"

const Dashboard = () => {
    return (
        <div>
            <Navigation />
            <div className="min-h-screen font-inconsolata bg-gradient-to-b from-black to-zinc-900 text-white flex flex-col items-center px-4">
                

                {/* Header Image with Profile Icon - Enhanced with gradient overlay */}
                <div className="w-full max-w-6xl relative h-[260px] mb-16 mt-6 mx-auto rounded-xl shadow-2xl">

                    <Image
                        src="/images/main-bg.jpg"
                        alt="Decorative header with books and coffee"
                        fill
                        priority
                        className="object-cover opacity-70 rounded-lg transform hover:scale-105 transition-transform duration-700"
                    />


                    {/* // Custom positioning */}
                    <ProfileIcon customPosition="absolute right-[-2%] bottom-[-15%] z-50" />






                </div>

                {/* Welcome section with animated border */}
                <div className="text-center lg:mt-8 mb-12 max-w-2xl p-8 rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-50 rounded-2xl"></div>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-gradient-x"></div>
                    <h1 className="text-5xl font-mono mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-bold">Welcome to Nights - Season 1.</h1>
                    <p className="text-xl mb-4 text-zinc-200">Oh, you made it? Damn right, you did ^_^</p>
                    <p className="text-center text-zinc-300 leading-relaxed">
                        This page? It's got everything you need to know.
                        <br />
                        Yeah, it's a lot, but we trust you can handle it.
                        <br />
                        To make it less of a drag, here's a song. Hit play, tune in, and let's get to it.
                    </p>
                </div>

                {/* Logo with glowing effect */}
                <div className="flex items-center justify-center rounded-xl mb-12 max-w-2xl w-full relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-2xl rounded-full"></div>
                    <Image
                        src="/Welcome/Group 131.png"
                        alt="Builder's Space Logo"
                        width={480}
                        height={480}
                        className="object-contain relative z-10 hover:scale-105 transition-all duration-500 drop-shadow-2xl"
                    />
                </div>

                {/* Cards with animated hover effects */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 w-full max-w-5xl">
                    <div className="lg:col-span-7 mt-24 mb-16 lg:mt-24 lg:mb-28 transform transition-all duration-300">
                        <EditableYoutubeCard />
                    </div>

                    <div className="lg:col-span-5 mb-20 lg:mt-24 lg:mb-28 transform transition-all duration-300">
                        <EditableDescriptionCard />
                    </div>
                </div>

                {/* Social links with subtle hover animation */}
                <div className="relative group mb-16 w-full max-w-2xl">
                   
                    <SocialLinksEditor />
                </div>

                {/* Enhanced footer */}
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard;