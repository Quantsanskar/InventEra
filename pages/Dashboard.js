"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/homepage/Navigation"
import { Footer } from "@/components/footer"
import SocialLinksEditor from "@/components/dashboard/socialhandles"
import EditableYoutubeCard from "@/components/dashboard/videos"
import EditableDescriptionCard from "@/components/dashboard/description"
import ProfileIcon from "@/components/dashboard/profileicon"
import { Play, Pause, Download, Users, Calendar, ExternalLink, House } from "lucide-react"
import { Twitter, Instagram, Linkedin, Globe } from 'lucide-react';
const API_BASE_URL = "https://builderspace.onrender.com/api"

// Inline components for the enhanced dashboard
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="w-full max-w-xs lg:max-w-sm bg-zinc-800/50 lg:ml-8 rounded-xl px-1 py-2 lg:px-2 lg:py-4 border border-purple-500/20 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-16">
          <Button
            onClick={togglePlay}
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full lg:-ml-16 bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <div className="lg:-ml-8">
            <h3 className="text-sm font-medium">Builder's Space Playlist</h3>
            <p className="text-xs text-zinc-400">Season 1 Vibes</p>
          </div>
        </div>
      </div>
      <audio ref={audioRef} className="hidden">
        <source src="/music/musicplist.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

const AcceptanceCard = ({ title, content }) => (
  <div className="bg-zinc-800/30 border border-purple-500/20 rounded-xl p-6 mb-8 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 shadow-lg">
    <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
      {title}
    </h2>
    <div className="text-zinc-300 space-y-4">{content}</div>
  </div>
)

const AcceptancePackCard = () => {
  const acceptanceImages = [1, 2, 3, 4, 5].map((num) => ({
    id: num,
    src: `/images/acceptance-${num}.png`, // Replace with actual image paths
    alt: `Acceptance Pack Design ${num}`,
  }));

  const downloadImage = (image) => {
    const link = document.createElement("a"); // Create a temporary anchor element
    link.href = image.src; // Set image source as href
    link.download = `Acceptance-${image.id}.png`; // Set default file name
    document.body.appendChild(link); // Append to body
    link.click(); // Trigger download
    document.body.removeChild(link); // Remove after download
  };
  const shiningLinkStyle = "text-blue-400 hover:text-blue-300 relative overflow-hidden transition-colors duration-300 after:absolute after:content-[''] after:h-full after:w-4 after:top-0 after:-left-8 after:skew-x-12 after:bg-white/20 after:opacity-0 hover:after:animate-shine";
  return (
    <div className="bg-zinc-800/30 border border-purple-500/20 rounded-xl px-4 sm:px-8 py-4 mb-8 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        04 — Your Acceptance Pack
      </h2>
      <p className="text-zinc-300 mb-6">
        This is huge—you made it into season 1! Celebrate it. We've designed 5 different acceptance images.
      </p>

      {/* Responsive grid: 1 column on small screens, 2 on medium, 3 on large */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6">
        {acceptanceImages.map((image) => (
          <div
            key={image.id}
            className={`relative group ${image.id === 5 ? "lg:col-span-1 lg:mx-auto" : ""
              }`}
          >
            <div className="overflow-hidden rounded-lg">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={600}
                height={700}
                className="object-cover w-full h-auto"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
              />
            </div>
            <Button
              onClick={() => downloadImage(image)}
              className="absolute bottom-2 right-2 bg-blue-600/80 hover:bg-blue-700 rounded-full h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:h-10 sm:w-10"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-zinc-900/70 to-black/80 border border-zinc-800 rounded-xl p-5 shadow-lg">
        <div className="text-zinc-300">
          <p className="font-semibold mb-2">What to do:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Pick the one you vibe with, download it, and share it anywhere.</li>
            <li>Tag us so we can hype you up:</li>
            <li className="ml-6 flex items-center gap-2">
              <Twitter size={16} className="text-blue-400" />
              <span>twitter: </span>
              <a
                href="https://x.com/Builders_space9?t=FMH0JZVCbW0_ovV2R8IS_g&s=08"
                target="_blank"
                rel="noopener noreferrer"
                className={shiningLinkStyle}
              >
                @Builders_space9
              </a>
            </li>
            <li className="ml-6 flex items-center gap-2">
              <Instagram size={16} className="text-pink-500" />
              <span>insta: </span>
              <a
                href="https://www.instagram.com/builders.space"
                target="_blank"
                rel="noopener noreferrer"
                className={shiningLinkStyle}
              >
                @builders.space
              </a>
            </li>
            <li className="ml-6 flex items-center gap-2">
              <Linkedin size={16} className="text-blue-600" />
              <span>linkedin: </span>
              <a
                href="https://www.linkedin.com/company/builder-s-space/"
                target="_blank"
                rel="noopener noreferrer"
                className={shiningLinkStyle}
              >
                @builder-s-space
              </a>
            </li>
            <li className="ml-6 flex items-center gap-2 mt-2">
              <Globe size={16} className="text-green-500" />
              <span>commudle: </span>
              <a
                href="https://www.commudle.com/communities/builders-space"
                target="_blank"
                rel="noopener noreferrer"
                className={shiningLinkStyle}
              >
                @builders-space
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
const styleTag = typeof document !== 'undefined' ? document.createElement('style') : null;
if (styleTag) {
  styleTag.textContent = `
    @keyframes shine {
      0% {
        left: -100%;
        opacity: 0.6;
      }
      100% {
        left: 200%;
        opacity: 0;
      }
    }
    
    .animate-shine {
      animation: shine 1.5s ease-in-out;
    }
  `;
  document.head.appendChild(styleTag);
}
const BuddyPassCard = () => (
  <div className="bg-zinc-800/30 border border-purple-500/20 rounded-xl p-6 mb-8 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 shadow-lg">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        02 — Buddy Passes
      </h2>

    </div>

    <p className="text-zinc-300 mb-4">
      Doing this solo? Totally fine. But having a buddy can make it even better. You get buddy passes to invite people
      to Builder's Space Nights. Got friends who've always wanted to build something? Send them a pass.
    </p>

    <div className="bg-zinc-900/50 rounded-lg p-4 mb-4 border border-zinc-700/50">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-zinc-400">invite link:</p>
        <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-400 hover:text-blue-300" onClick={() => {
          navigator.clipboard.writeText("https://www.commudle.com/fill-form/3154");
          alert("Copied to clipboard");
        }}>
          Copy
        </Button>
      </div>
      <p className="text-xs bg-zinc-800 p-2 rounded border border-zinc-700 text-zinc-300 truncate">
        https://www.commudle.com/fill-form/3154
      </p>
    </div>


  </div>
)

const KickoffDetailsCard = () => (
  <div className="bg-zinc-800/30 border border-purple-500/20 rounded-xl p-6 mb-8 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 shadow-lg">
    <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
      01 — Kickoff Details
    </h2>

    <div className="flex flex-col md:flex-row gap-6 mb-6">
      <div className="flex-1 bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/50">
        <div className="flex items-center mb-2">
          <Calendar className="h-5 w-5 mr-2 text-purple-400" />
          <h3 className="font-medium">Date: 15th March</h3>
        </div>
        <p className="text-zinc-300">This Saturday</p>
      </div>

      <div className="flex-1 bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/50">
        <div className="flex items-center mb-2">
          <Clock className="h-5 w-5 mr-2 text-blue-400" />
          <h3 className="font-medium">Time</h3>
        </div>
        <p className="text-zinc-300">10:00 AM PST</p>
      </div>
    </div>

    <p className="text-zinc-300 mb-4">
      Kickoff is a live online stream and lasts about an hour. We'll break down how Builder's Space Nights works, the
      schedule, and more. Nearly all your questions will be answered here.
    </p>

    <div className="bg-zinc-900/50 rounded-lg p-4 mb-4 border border-zinc-700/50">
      <h3 className="font-medium mb-2">What to do now:</h3>
      <ul className="list-disc list-inside space-y-1 text-sm text-zinc-300">
        <li>RSVP using the button below</li>
        <li>Set up reminders: a phone alarm, a sticky note on your fridge, whatever works</li>
        <li>Be somewhere quiet with headphones. We recommend watching on a laptop or desktop</li>
      </ul>
    </div>

    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white" onClick={() => window.location.href = "https://lu.ma/mp4dualo"}>
      RSVP to Kickoff
    </Button>
  </div>
)

// Main Dashboard Component
const Dashboard = () => {
  const router = useRouter()
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [house, setHouse] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const houseImages = {
    Gryffindor: "/reference/Gryffindor.png",
    Slytherin: "/reference/Slytherine.png",
    Hufflepuff: "/reference/Hufflepuff.png",
    Ravenclaw: "/reference/Ravenclaw.png",
    Phoenix: "/reference/Phoenix.png",
  };
  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = localStorage.getItem("access_token")
      const userInfo = localStorage.getItem("user_info")

      if (!accessToken || !userInfo) {
        setError("No token found. Please sign in.")
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`${API_BASE_URL}/verify-token/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: accessToken }),
        })

        if (response.ok) {
          // Token is valid
          const user = JSON.parse(userInfo)
          if (!user.is_participant) {
            setError("Access denied. This dashboard is for participants only.")
          } else {
            setUserData(user)
          }
        } else {
          // Token is invalid, try to refresh it
          const refreshed = await refreshToken()
          if (!refreshed) {
            setError("Your session has expired. Please sign in again.")
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")  
            localStorage.removeItem("user_info")
            window.location.href = "/SignInPage/SignIn"
          }
        }
      } catch (err) {
        console.error("Token verification failed:", err)
        setError("An error occurred while verifying your session. Please try again.")
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")  
        localStorage.removeItem("user_info")
        window.location.href = "/SignInPage/SignIn"
      } finally {
        setLoading(false)
      }
    }

    verifyToken()
  }, [])

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const response = await fetch("https://builderspace.onrender.com/api/get-user-details/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setHouse(data.house);
          console.log(data.house);

          if (houseImages[data.house]) {
            setImageSrc(houseImages[data.house]);
          }
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token")
    if (!refreshToken) return false

    try {
      const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("access_token", data.access)
        return true
      } else {
        return false
      }
    } catch (err) {
      console.error("Token refresh failed:", err)
      return false
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen font-inconsolata bg-gradient-to-b from-black to-zinc-900 text-white flex items-center justify-center">
        <div className="animate-pulse text-2xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen font-inconsolata bg-gradient-to-b from-black to-zinc-900 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl mb-4">Oops! Something went wrong.</h1>
        <p className="text-xl mb-8">{error}</p>
        <Button
          onClick={() => router.push("/SignInPage/SignIn")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Sign In
        </Button>
      </div>
    )
  }

  if (!userData) {
    router.push("/SignInPage/SignIn")
    return null
  }
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

          {/* Custom positioning */}
          <ProfileIcon customPosition="absolute right-[-2%] bottom-[-15%] z-50" customData={userData} />
        </div>

        {/* Welcome section with animated border */}
        <div className="text-center lg:mt-8 mb-12 max-w-2xl p-8 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-50 rounded-2xl"></div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-gradient-x"></div>
          <h1 className="text-5xl font-mono mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-bold">
            Welcome to Nights - Season 1.
          </h1>
          <p className="text-xl mb-4 text-zinc-200">Oh, you made it? Damn right, you did ^_^</p>
          <p className="text-center text-zinc-300 leading-relaxed">
            This page? It's got everything you need to know.
            <br />
            Yeah, it's a lot, but we trust you can handle it.
            <br />
            To make it less of a drag, here's a song. Hit play, tune in, and let's get to it.
          </p>
        </div>

        {/* Music Player */}
        <div className="mb-12 w-full max-w-md">
          <MusicPlayer />
        </div>

        {/* Builder's Space card grp wise with glowing effect */}
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
          <div className="flex items-center justify-center rounded-xl mb-1 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-2xl rounded-full"></div>
            <Image
              src={imageSrc}
              alt="House Image"
              width={480}
              height={480}
              className="object-contain relative z-10 hover:scale-105 transition-all duration-500 drop-shadow-2xl"
            />
          </div>

          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = imageSrc;
              link.download = `${house}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-download">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Image
          </button>
        </div>

        {/* Acceptance Letter */}
        <div className="w-full max-w-3xl mb-12">
          <AcceptanceCard
            title="First things first, your acceptance letter"
            content={
              <>
                <p>We've pulled together an incredible group for season 1.</p>
                <p>
                  Creators, engineers, designers, writers, musicians, and more. If you're here, you're already part of
                  something awesome.
                </p>
                <p>
                  Some of you know exactly what you're building. Some of you just have a vague idea, and that's totally
                  cool. And some of you? You're just here to figure it all out. That's what we're here for—to help you
                  start building, and stay building.
                </p>
                <p className="font-bold">No matter where you're starting, you belong here.</p>
              </>
            }
          />

          <AcceptanceCard
            title='"Wait... do I really wanna do this?"'
            content={
              <>
                <p>If you're feeling unsure, let's talk:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Most of us have jobs, classes, or full schedules. You're not alone.</li>
                  <li>We'll guide you step by step. No pressure—just progress.</li>
                  <li>At least join the kickoff and see what it's about. Take it from there.</li>
                </ul>
                <p className="font-bold mt-4">This isn't about being perfect. It's about showing up.</p>
              </>
            }
          />
        </div>

        {/* Kickoff Details */}
        <div className="w-full max-w-3xl mb-12">
          <KickoffDetailsCard />
        </div>

        {/* Buddy Passes */}
        <div className="w-full max-w-3xl mb-12">
          <BuddyPassCard />
        </div>

        {/* Partners & Teams */}
        <div className="w-full max-w-3xl mb-12">
          <AcceptanceCard
            title="03 — Partners & Teams"
            content={
              <>
                <p>90% of participants go solo, but if you've got a partner or team, here's the deal:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Each teammate needs their own account.</li>
                  <li>Not registered yet? Send them a buddy pass to join.</li>
                </ul>
                <p className="mt-4">There's no way to "link" accounts, so just focus on building together.</p>
              </>
            }
          />
        </div>

        {/* Acceptance Pack */}
        <div className="w-full max-w-3xl mb-12">
          <AcceptancePackCard />
        </div>

        {/* What's Next */}
        <div className="w-full max-w-3xl mb-12">
          <AcceptanceCard
            title="What's Next?"
            content={
              <>
                <p className="font-bold">Just one thing: show up to kickoff.</p>
                <p>Don't worry about what's coming after that.</p>
                <p className="mt-4">
                  We'll go over everything—grants, demo days, and the big stuff at kickoff. All we need from you right
                  now is to show up.
                </p>
                <p className="mt-4 font-bold">See you there, builder. Let's create something epic. 🚀</p>
              </>
            }
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
        <div className="relative group mb-16 w-full max-w-[260px] lg:max-w-sm">
          <SocialLinksEditor />
        </div>
      </div>
      <Footer />
    </div>
  )
}

// Missing component definition for Clock
const Clock = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  )
}

export default Dashboard

