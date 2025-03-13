"use client"

import { useEffect, useRef, useState } from "react"
import Head from "next/head"
import { gsap } from "gsap"
import Navigation from "@/components/homepage/Navigation"
import { Footer } from "@/components/footer"
export default function DemoDay() {
    const [activeCategory, setActiveCategory] = useState("All")
    const carouselRef = useRef(null)
    const cardsRef = useRef([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [playingVideoId, setPlayingVideoId] = useState(null)
    const [isMuted, setIsMuted] = useState(true)
    const [isPlaying, setIsPlaying] = useState(true)
    const activeVideoRef = useRef(null)
    const videoRefs = useRef([])

    // Sample carousel data with local videos
    const carouselData = [
        {
            id: 1,
            title: "HUFFLEPUFF",
            type: "CREATIVE",
            submissions: "30 SUBMISSIONS",
            color: "#e6a62c",
            bgColor: "#c94b28",
            videoUrl: "/videos/Buildspace intro.mp4", // Local video path
        },
        {
            id: 2,
            title: "GRYFFINDOR",
            type: "BRAVE",
            submissions: "25 SUBMISSIONS",
            color: "#b71c1c",
            bgColor: "#8a1515",
            videoUrl: "/videos/Buildspace intro.mp4", // Local video path
        },
        {
            id: 3,
            title: "RAVENCLAW",
            type: "WISDOM",
            submissions: "28 SUBMISSIONS",
            color: "#0d47a1",
            bgColor: "#082a60",
            videoUrl: "/videos/Buildspace intro.mp4", // Local video path
        },
        {
            id: 4,
            title: "SLYTHERIN",
            type: "AMBITION",
            submissions: "32 SUBMISSIONS",
            color: "#1b5e20",
            bgColor: "#103613",
            videoUrl: "/videos/Buildspace intro.mp4", // Local video path
        },
        {
            id: 5,
            title: "PHOENIX",
            type: "REBIRTH",
            submissions: "20 SUBMISSIONS",
            color: "#ff6f00",
            bgColor: "#a34600",
            videoUrl: "/videos/Buildspace intro.mp4", // Local video path
        },
    ]

    // Sample video data with full YouTube links
    const videoData = [
        {
            id: 1,
            creator: "Shivangii Singh",
            youtubeUrl: "https://youtu.be/MYlIZZISHMA?si=HU_gs2pEt4f4MZcK", // Full YouTube URL
            house: "Gryffindor",
            title: "Brave Adventures",
        },
        {
            id: 2,
            creator: "Shivangii Singh",
            youtubeUrl: "https://youtu.be/MYlIZZISHMA?si=HU_gs2pEt4f4MZcK", // Full YouTube URL
            house: "Hufflepuff",
            title: "Creative Journeys",
        },
        {
            id: 3,
            creator: "Shivangii Singh",
            youtubeUrl: "https://youtu.be/MYlIZZISHMA?si=HU_gs2pEt4f4MZcK", // Full YouTube URL
            house: "Ravenclaw",
            title: "Wisdom Tales",
        },
        {
            id: 4,
            creator: "Shivangii Singh",
            youtubeUrl: "https://youtu.be/MYlIZZISHMA?si=HU_gs2pEt4f4MZcK", // Full YouTube URL
            house: "Slytherin",
            title: "Ambitious Quests",
        },
        {
            id: 5,
            creator: "Shivangii Singh",
            youtubeUrl: "https://youtu.be/MYlIZZISHMA?si=HU_gs2pEt4f4MZcK", // Full YouTube URL
            house: "Phoenix",
            title: "Rebirth Stories",
        },
        {
            id: 6,
            creator: "Shivangii Singh",
            youtubeUrl: "https://youtu.be/MYlIZZISHMA?si=HU_gs2pEt4f4MZcK", // Full YouTube URL
            house: "Gryffindor",
            title: "Courage Chronicles",
        },
    ]

    // Function to extract YouTube ID from full URL
    const extractYoutubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // Function to get YouTube thumbnail URL from full YouTube URL
    const getYoutubeThumbnail = (youtubeUrl) => {
        const youtubeId = extractYoutubeId(youtubeUrl);
        return youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : '';
    }

    // Function to convert YouTube URL to embed URL
    const getYoutubeEmbedUrl = (youtubeUrl) => {
        const youtubeId = extractYoutubeId(youtubeUrl);
        return youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : '';
    }

    useEffect(() => {
        // Setup carousel
        if (carouselRef.current) {
            // Create refs for each card
            cardsRef.current = Array.from(carouselRef.current.children)
            // Initialize video refs array
            videoRefs.current = new Array(cardsRef.current.length)
            initializeCarousel()
            setupCarouselVideos()
        }
    }, [])

    const setupCarouselVideos = () => {
        // Get all video elements from cards
        cardsRef.current.forEach((card, index) => {
            const video = card.querySelector('video')
            if (video) {
                videoRefs.current[index] = video
                
                // Configure all videos
                video.muted = true
                
                // Only play the front card video
                if (index === 0) {
                    activeVideoRef.current = video
                    video.play()
                } else {
                    video.pause()
                }
            }
        })
    }

    const initializeCarousel = () => {
        // Position cards in a stacked formation
        gsap.set(cardsRef.current, {
            x: (i) => (i === 0 ? 0 : -30 - i * 15),
            y: 0,
            opacity: (i) => (i === 0 ? 1 : 0.7 - i * 0.15),
            scale: (i) => 1 - i * 0.08,
            zIndex: (i) => cardsRef.current.length - i,
        })
    }

    const handleNext = () => {
        if (isAnimating) return
        setIsAnimating(true)

        const nextIndex = (currentIndex + 1) % carouselData.length

        // Pause current video if it's playing
        if (activeVideoRef.current) {
            activeVideoRef.current.pause()
        }

        // Animate current card out to the left
        gsap.to(cardsRef.current[0], {
            x: -100,
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            onComplete: () => {
                // Move the first card to the end of the DOM
                const firstCard = cardsRef.current[0]
                carouselRef.current.appendChild(firstCard)

                // Update refs array
                cardsRef.current = Array.from(carouselRef.current.children)
                
                // Reset positions with the new order
                initializeCarousel()
                
                // Update video refs and control playback
                setupCarouselVideos()

                setCurrentIndex(nextIndex)
                setIsAnimating(false)

                // Add pixel dust animation effect
                createPixelDustEffect()
            },
        })

        // Animate other cards forward
        gsap.to(cardsRef.current.slice(1), {
            x: (i) => (i === 0 ? 0 : -30 - (i - 1) * 15),
            opacity: (i) => (i === 0 ? 1 : 0.7 - (i - 1) * 0.15),
            scale: (i) => 1 - (i - 1) * 0.08,
            duration: 0.5,
            stagger: 0.05,
        })
    }

    const handlePrev = () => {
        if (isAnimating) return
        setIsAnimating(true)

        const prevIndex = (currentIndex - 1 + carouselData.length) % carouselData.length

        // Pause current video if it's playing
        if (activeVideoRef.current) {
            activeVideoRef.current.pause()
        }

        // Get the last card and prepare to move it to the front
        const lastCard = cardsRef.current[cardsRef.current.length - 1]

        // Set initial position for the card coming in
        gsap.set(lastCard, {
            x: -100,
            opacity: 0,
            scale: 0.8,
            zIndex: cardsRef.current.length + 1,
        })

        // Move the last card to the beginning of the DOM
        carouselRef.current.prepend(lastCard)

        // Update refs array
        cardsRef.current = Array.from(carouselRef.current.children)

        // Animate the new first card in
        gsap.to(cardsRef.current[0], {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            onComplete: () => {
                // Update video refs and control playback
                setupCarouselVideos()
                
                setCurrentIndex(prevIndex)
                setIsAnimating(false)

                // Add pixel dust animation effect
                createPixelDustEffect()
            },
        })

        // Animate other cards backward
        gsap.to(cardsRef.current.slice(1), {
            x: (i) => -30 - i * 15,
            opacity: (i) => 0.7 - i * 0.15,
            scale: (i) => 1 - i * 0.08,
            duration: 0.5,
            stagger: 0.05,
        })
    }

    const createPixelDustEffect = () => {
        const container = document.createElement("div")
        container.className = "absolute inset-0 pointer-events-none"
        carouselRef.current.appendChild(container)

        // Create pixel dust particles
        for (let i = 0; i < 20; i++) {
            const pixel = document.createElement("div")
            pixel.className = "absolute w-2 h-2 bg-white"

            // Random position
            const x = Math.random() * carouselRef.current.offsetWidth
            const y = Math.random() * carouselRef.current.offsetHeight

            gsap.set(pixel, { x, y, opacity: 1 })
            container.appendChild(pixel)

            // Animate pixel
            gsap.to(pixel, {
                x: x + (Math.random() * 100 - 50),
                y: y + (Math.random() * 100 - 50),
                opacity: 0,
                duration: 0.8 + Math.random() * 0.6,
                onComplete: () => {
                    container.removeChild(pixel)
                    if (container.children.length === 0) {
                        carouselRef.current.removeChild(container)
                    }
                },
            })
        }
    }

    const filteredVideos =
        activeCategory === "All" ? videoData : videoData.filter((video) => video.house === activeCategory)

    const handlePlayVideo = (videoId) => {
        setPlayingVideoId(videoId === playingVideoId ? null : videoId)
    }

    // Video playback control functions for carousel
    const toggleMute = (index) => {
        if (index === undefined && activeVideoRef.current) {
            // Toggle mute for active video
            const newMuteState = !isMuted
            setIsMuted(newMuteState)
            activeVideoRef.current.muted = newMuteState
        } else if (videoRefs.current[index]) {
            // Toggle mute for specific video
            videoRefs.current[index].muted = !videoRefs.current[index].muted
        }
    }

    const togglePlayPause = (index) => {
        if (index === undefined && activeVideoRef.current) {
            // Toggle play/pause for active video
            const newPlayState = !isPlaying
            setIsPlaying(newPlayState)
            if (newPlayState) {
                activeVideoRef.current.play()
            } else {
                activeVideoRef.current.pause()
            }
        } else if (videoRefs.current[index]) {
            // Toggle play/pause for specific video
            if (videoRefs.current[index].paused) {
                videoRefs.current[index].play()
            } else {
                videoRefs.current[index].pause()
            }
        }
    }

    const rewindVideo = (index) => {
        if (index === undefined && activeVideoRef.current) {
            // Rewind active video
            activeVideoRef.current.currentTime = 0
            if (!isPlaying) {
                activeVideoRef.current.play()
                setIsPlaying(true)
            }
        } else if (videoRefs.current[index]) {
            // Rewind specific video
            videoRefs.current[index].currentTime = 0
            videoRefs.current[index].play()
        }
    }

    return (
        <div className="min-h-screen bg-black text-white font-manrope">
             <Navigation />
            <Head>
                <meta name="description" content="Builders Space Houses Video Platform" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <style jsx global>{`
                @font-face {
                  font-family: 'Manrope';
                  src: url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
                }
                
                .font-manrope {
                  font-family: 'Manrope', sans-serif;
                }
                
                .pixel-border {
                  box-shadow: 
                    0 0 0 2px #000,
                    0 0 0 4px #fff,
                    0 0 0 6px #000;
                }
                
                .pixel-button {
                  image-rendering: pixelated;
                  transition: all 0.1s;
                }
                
                .pixel-button:hover {
                  transform: translateY(-2px);
                }
                
                .pixel-button:active {
                  transform: translateY(1px);
                }
                
                .aspect-w-16 {
                  position: relative;
                  padding-bottom: 56.25%;
                }
                
                .aspect-w-16 > * {
                  position: absolute;
                  height: 100%;
                  width: 100%;
                  top: 0;
                  right: 0;
                  bottom: 0;
                  left: 0;
                }

                .video-control-button {
                  backdrop-filter: blur(4px);
                  transition: all 0.2s ease;
                }
                
                .video-control-button:hover {
                  transform: scale(1.1);
                  background-color: rgba(255, 255, 255, 0.3);
                }
            `}</style>

            <main className="container mx-auto px-4 py-8">
               
                {/* Stacked Carousel with Local Videos */}
                <div className="relative h-96 mb-16">
                    <div ref={carouselRef} className="relative w-full h-full max-w-4xl mx-auto">
                        {carouselData.map((card, index) => (
                            <div
                                key={card.id}
                                className="absolute w-full h-full rounded-lg overflow-hidden shadow-lg transition-all duration-300"
                                style={{
                                    transformOrigin: "center left",
                                }}
                            >
                                <div className="relative w-full h-full">
                                    {/* Local video playing in each card */}
                                    <div className="absolute inset-0 bg-black">
                                        <video
                                            src={card.videoUrl}
                                            className="w-full h-full object-cover"
                                            muted={true}
                                            playsInline
                                            ref={(el) => {
                                                if (el) videoRefs.current[index] = el
                                            }}
                                        ></video>
                                        {/* Overlay to ensure text is readable */}
                                        <div className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none"></div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-6">
                                        <h3 className="text-3xl font-bold tracking-wider">{card.title}</h3>
                                        <div className="flex items-center text-sm mt-2">
                                            <span className="mr-4">{card.type}</span>
                                            <span className="text-gray-300">|</span>
                                            <span className="ml-4">{card.submissions}</span>
                                        </div>
                                    </div>

                                    {/* Video Controls - display for all cards */}
                                    <div className="absolute top-6 right-6 flex space-x-3">
                                        <button
                                            onClick={() => rewindVideo(index)}
                                            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white video-control-button"
                                            title="Rewind"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor">
                                                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" fill="currentColor" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => togglePlayPause(index)}
                                            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white video-control-button"
                                            title={(index === 0 && isPlaying) || (index !== 0 && !videoRefs.current[index]?.paused) ? "Pause" : "Play"}
                                        >
                                            {(index === 0 && isPlaying) || (index !== 0 && videoRefs.current[index] && !videoRefs.current[index].paused) ? (
                                                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor">
                                                    <path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor" />
                                                </svg>
                                            ) : (
                                                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor">
                                                    <path d="M8 5v14l11-7z" fill="currentColor" />
                                                </svg>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => toggleMute(index)}
                                            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white video-control-button"
                                            title={(index === 0 && isMuted) || (index !== 0 && videoRefs.current[index]?.muted) ? "Unmute" : "Mute"}
                                        >
                                            {(index === 0 && isMuted) || (index !== 0 && videoRefs.current[index] && videoRefs.current[index].muted) ? (
                                                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor">
                                                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor" />
                                                </svg>
                                            ) : (
                                                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor">
                                                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>

                                    {/* Navigation Controls */}
                                    <div className="absolute bottom-6 right-6 flex space-x-4">
                                        <button
                                            onClick={handleNext}
                                            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor">
                                                <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
                    <div className="flex space-x-2 md:space-x-4 overflow-x-auto pb-2 w-full md:w-auto">
                        {["All", "Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin", "Phoenix"].map((category) => (
                            <button
                                key={category}
                                className={`px-3 py-2 text-xs md:text-sm rounded ${activeCategory === category
                                        ? "bg-yellow-500 text-black pixel-border"
                                        : "bg-gray-800 hover:bg-gray-700 text-white"
                                    } pixel-button`}
                                onClick={() => setActiveCategory(category)}
                                style={{ imageRendering: "pixelated" }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-gray-800 text-white rounded px-4 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            style={{ imageRendering: "pixelated" }}
                        />
                        <svg
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Video Grid with YouTube Embeds from full URLs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVideos.map((video) => (
                        <div
                            key={video.id}
                            className="bg-gray-800 rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all duration-200"
                        >
                            <div className="relative">
                                <div className="aspect-w-16">
                                    {playingVideoId === video.id ? (
                                        <iframe
                                            src={`${getYoutubeEmbedUrl(video.youtubeUrl)}?autoplay=1`}
                                            title={video.title}
                                            className="w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <img
                                            src={getYoutubeThumbnail(video.youtubeUrl)}
                                            alt={`Video by ${video.creator}`}
                                            className="object-cover w-full h-full"
                                            style={{ imageRendering: "pixelated" }}
                                        />
                                    )}
                                </div>

                                {!playingVideoId || playingVideoId !== video.id ? (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity cursor-pointer"
                                        onClick={() => handlePlayVideo(video.id)}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center pixel-button">
                                            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor">
                                                <path d="M8 5v14l11-7z" fill="currentColor" />
                                            </svg>
                                        </div>
                                    </div>
                                ) : null}

                                {/* Pixel art overlay effect */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-20"
                                    style={{
                                        backgroundImage:
                                            'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEklEQVQImWNgYGD4z/D/////AA4EBAGEaRX5AAAASUVORK5CYII=")',
                                        backgroundSize: "2px 2px",
                                        imageRendering: "pixelated",
                                    }}
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium mb-1 text-sm">{video.title}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-400">{video.creator}</span>
                                    <span className="text-xs px-2 py-1 bg-gray-700 rounded-full">{video.house}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pixel art decorative elements */}
                <div
                    className="fixed bottom-0 left-0 w-full h-4 bg-repeat-x"
                    style={{
                        backgroundImage:
                            'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAFElEQVQYlWNgYGD4z4AGGBkZsYoDAFQxBAYlTOqzAAAAAElFTkSuQmCC")',
                        backgroundSize: "8px 8px",
                        imageRendering: "pixelated",
                    }}
                />
                
            </main>
            <Footer/>
        </div>
    )
}