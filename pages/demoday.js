"use client"

import { useEffect, useRef, useState } from "react"
import Head from "next/head"
import { gsap } from "gsap"
import Navigation from "@/components/homepage/Navigation"
import { Footer } from "@/components/footer"
import { useRouter } from "next/router"
import { Heart, Github, Twitter, Linkedin, Instagram, ChevronRight, Loader2, Filter } from 'lucide-react'

export default function DemoDay() {
    const [searchQuery, setSearchQuery] = useState("")
    const carouselRef = useRef(null)
    const cardsRef = useRef([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [playingVideoId, setPlayingVideoId] = useState(null)
    const [isMuted, setIsMuted] = useState(true)
    const [isPlaying, setIsPlaying] = useState(true)
    const activeVideoRef = useRef(null)
    const videoRefs = useRef([])
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const router = useRouter()
    const [videoStates, setVideoStates] = useState({})
    const [likedProjects, setLikedProjects] = useState({})
    const [likingInProgress, setLikingInProgress] = useState({})
    const [selectedProject, setSelectedProject] = useState(null)
    const [showProjectModal, setShowProjectModal] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    // New state for house filtering
    const [selectedHouse, setSelectedHouse] = useState("All")

    // Houses for filtering
    const houses = ["All", "Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin", "Phoenix"]

    // Fallback YouTube link if no link is provided
    const FALLBACK_YOUTUBE_LINK = "https://youtu.be/WTSP_l0joZY"

    // Sample carousel data with local videos
    const carouselData = [
        {
            id: 1,
            title: "DEMO DAY",
            type: "PROJECTS",
            submissions: "SHOWCASE",
            color: "#e6a62c",
            bgColor: "#c94b28",
            videoUrl: "/videos/Buildspace intro.mp4", // Local video path
        },
        {
            id: 2,
            title: "BUILDERS",
            type: "COMMUNITY",
            submissions: "INNOVATION",
            color: "#b71c1c",
            bgColor: "#8a1515",
            videoUrl: "/videos/Buildspace intro.mp4", // Local video path
        },
        {
            id: 3,
            title: "CREATIVITY",
            type: "SHOWCASE",
            submissions: "TALENT",
            color: "#0d47a1",
            bgColor: "#082a60",
            videoUrl: "/videos/Buildspace intro.mp4", // Local video path
        },
        {
            id: 4,
            title: "PROJECTS",
            type: "INNOVATION",
            submissions: "TECHNOLOGY",
            color: "#1b5e20",
            bgColor: "#103613",
            videoUrl: "/videos/Buildspace intro.mp4", // Local video path
        },
        {
            id: 5,
            title: "COMMUNITY",
            type: "COLLABORATION",
            submissions: "LEARNING",
            color: "#ff6f00",
            bgColor: "#a34600",
            videoUrl: "/videos/Buildspace intro.mp4", // Local video path
        },
    ]

    // Function to extract YouTube ID from full URL
    const extractYoutubeId = (url) => {
        if (!url) return extractYoutubeId(FALLBACK_YOUTUBE_LINK)
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        return match && match[2].length === 11 ? match[2] : extractYoutubeId(FALLBACK_YOUTUBE_LINK)
    }

    // Function to get YouTube thumbnail URL from full YouTube URL
    const getYoutubeThumbnail = (youtubeUrl) => {
        const youtubeId = extractYoutubeId(youtubeUrl || FALLBACK_YOUTUBE_LINK)
        return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    }

    // Function to convert YouTube URL to embed URL
    const getYoutubeEmbedUrl = (youtubeUrl) => {
        const youtubeId = extractYoutubeId(youtubeUrl || FALLBACK_YOUTUBE_LINK)
        return `https://www.youtube.com/embed/${youtubeId}`
    }

    // Function to verify access token
    const verifyToken = async (token) => {
        try {
            const response = await fetch(
                "https://builderspace.onrender.com/api/verify-token/?CLIENT_ID=qwerty@buildersspace9999Revant&CLIENT_SECRET=asdfghjkwertyuicvbnmrevantsdfghjk2345678fghjrpeavaarnttkh",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                },
            )
            return response.ok
        } catch (error) {
            console.error("Token verification error:", error)
            return false
        }
    }

    // Function to refresh access token using refresh token
    const refreshAccessToken = async (refreshToken) => {
        try {
            const response = await fetch(
                "https://builderspace.onrender.com/api/token/refresh/?CLIENT_ID=qwerty@buildersspace9999Revant&CLIENT_SECRET=asdfghjkwertyuicvbnmrevantsdfghjk2345678fghjrpeavaarnttkh",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ refresh: refreshToken }),
                },
            )

            if (response.ok) {
                const data = await response.json()
                localStorage.setItem("access_token", data.access)
                return data.access
            }
            return null
        } catch (error) {
            console.error("Token refresh error:", error)
            return null
        }
    }

    // Function to get user details and store in localStorage
    const getUserDetails = async (accessToken) => {
        try {
            const response = await fetch("https://builderspace.onrender.com/api/get-user-details/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })

            if (response.ok) {
                const userData = await response.json()
                // Store user info in localStorage
                localStorage.setItem("user_info", JSON.stringify(userData))
                setUserInfo(userData)
                return userData
            }
            return null
        } catch (error) {
            console.error("Error fetching user details:", error)
            return null
        }
    }

    // Function to authenticate user - only called once when page loads
    const authenticateUser = async () => {
        // First check if user_info exists in localStorage
        const storedUserInfo = localStorage.getItem("user_info")
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo))
            setIsAuthenticated(true)
            return true
        }

        // If not, try to get valid access token
        const accessToken = await getValidAccessToken()
        if (!accessToken) {
            setIsAuthenticated(false)
            return false
        }

        // Get user details and store in localStorage
        const userData = await getUserDetails(accessToken)
        if (userData) {
            setIsAuthenticated(true)
            return true
        }

        setIsAuthenticated(false)
        return false
    }

    // Function to get valid access token
    const getValidAccessToken = async () => {
        // Check if access token exists
        const accessToken = localStorage.getItem("access_token")

        if (accessToken) {
            // Verify access token
            const isValid = await verifyToken(accessToken)
            if (isValid) {
                return accessToken
            }
        }

        // If access token doesn't exist or is invalid, try refresh token
        const refreshToken = localStorage.getItem("refresh_token")
        if (refreshToken) {
            const newAccessToken = await refreshAccessToken(refreshToken)
            if (newAccessToken) {
                return newAccessToken
            }
        }

        // If no valid tokens, redirect to sign in
        setError("Please sign in to view this page.")
        // router.push("/SignInPage/SignIn");
        return null
    }

    // OPTIMIZED: Function to check if a project is already liked by the logged-in user
    const checkLikedProjects = async () => {
        if (!userInfo || !userInfo.liked_projects) return

        // Create a map of liked projects by email for easy lookup
        const likedMap = {}

        // Loop through user's liked projects
        userInfo.liked_projects.forEach((like) => {
            // Find the project in our projects list
            const projectData = projects.find(p => p.id === like.project)
            if (projectData) {
                likedMap[projectData.participant_email] = true
            }
        })

        setLikedProjects(likedMap)
    }

    // OPTIMIZED: Function to like a project
    const likeProject = async (projectEmail) => {
        // If not authenticated, show error
        if (!isAuthenticated) {
            setError("Please sign in to like projects.")
            return
        }

        // If already liking, don't allow multiple requests
        if (likingInProgress[projectEmail]) return

        try {
            // Set liking in progress for this project
            setLikingInProgress((prev) => ({ ...prev, [projectEmail]: true }))

            const accessToken = await getValidAccessToken()
            if (!accessToken) {
                setLikingInProgress((prev) => ({ ...prev, [projectEmail]: false }))
                setError("Authentication failed. Please sign in again.")
                return
            }

            // Check if project is already liked
            if (likedProjects[projectEmail]) {
                // If already liked, unlike it
                await unlikeProject(projectEmail, accessToken)
            } else {
                // If not liked, like it
                const response = await fetch("https://builderspace.onrender.com/api/post-like/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ email: projectEmail }),
                })

                if (response.ok) {
                    // Update projects state with new like count
                    setProjects((prevProjects) =>
                        prevProjects.map((project) =>
                            project.participant_email === projectEmail
                                ? { ...project, like_counts: (project.like_counts || 0) + 1 }
                                : project
                        ),
                    )

                    // Mark this project as liked
                    setLikedProjects((prev) => ({ ...prev, [projectEmail]: true }))

                    // Update user_info in localStorage with the new liked project
                    if (userInfo) {
                        const updatedUserInfo = { ...userInfo }
                        if (!updatedUserInfo.liked_projects) {
                            updatedUserInfo.liked_projects = []
                        }

                        // Find the project ID from our projects list
                        const projectData = projects.find(p => p.participant_email === projectEmail)
                        if (projectData) {
                            updatedUserInfo.liked_projects.push({ project: projectData.id })
                            localStorage.setItem("user_info", JSON.stringify(updatedUserInfo))
                            setUserInfo(updatedUserInfo)
                        }
                    }

                    // Show visual feedback with heart animation
                    animateHeartButton(projectEmail)
                }
            }
        } catch (error) {
            console.error("Error liking project:", error)
        } finally {
            // Clear liking in progress state
            setLikingInProgress((prev) => ({ ...prev, [projectEmail]: false }))
        }
    }

    // OPTIMIZED: Function to unlike a project
    const unlikeProject = async (projectEmail, accessToken) => {
        try {
            const response = await fetch(`https://builderspace.onrender.com/api/delete-like/?email=${projectEmail}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })

            if (response.ok) {
                // Update projects state with new like count
                setProjects((prevProjects) =>
                    prevProjects.map((project) =>
                        project.participant_email === projectEmail
                            ? { ...project, like_counts: Math.max((project.like_counts || 0) - 1, 0) }
                            : project
                    ),
                )

                // Remove this project from liked projects
                setLikedProjects((prev) => {
                    const newLiked = { ...prev }
                    delete newLiked[projectEmail]
                    return newLiked
                })

                // Update user_info in localStorage by removing the liked project
                if (userInfo && userInfo.liked_projects) {
                    const updatedUserInfo = { ...userInfo }
                    const projectData = projects.find(p => p.participant_email === projectEmail)

                    if (projectData) {
                        updatedUserInfo.liked_projects = updatedUserInfo.liked_projects.filter(
                            like => like.project !== projectData.id
                        )
                        localStorage.setItem("user_info", JSON.stringify(updatedUserInfo))
                        setUserInfo(updatedUserInfo)
                    }
                }

                // Show visual feedback with heart animation
                animateHeartButton(projectEmail, false)
            }
        } catch (error) {
            console.error("Error unliking project:", error)
        }
    }

    // Function to animate heart button
    const animateHeartButton = (email, isLiking = true) => {
        const likeButton = document.getElementById(`like-btn-${email}`)
        if (likeButton) {
            gsap.timeline()
                .to(likeButton, {
                    scale: isLiking ? 1.3 : 0.8,
                    duration: 0.2,
                })
                .to(likeButton, {
                    scale: 1,
                    duration: 0.2,
                })
        }
    }

    // Function to open project details modal
    const openProjectDetails = (project) => {
        // Fetch social media links from the project data
        const socialLinks = {
            instagram: Array.isArray(project.instagram) ? project.instagram[0] : project.instagram,
            github: Array.isArray(project.github) ? project.github[0] : project.github,
            twitter: Array.isArray(project.twitter) ? project.twitter[0] : project.twitter,
            linkedin: Array.isArray(project.linkedin) ? project.linkedin[0] : project.linkedin,
        }

        // Set the selected project with social links
        setSelectedProject({
            ...project,
            ...socialLinks
        })

        setShowProjectModal(true)
        // Prevent body scrolling when modal is open
        document.body.style.overflow = "hidden"
    }

    // Function to close project details modal
    const closeProjectModal = () => {
        setShowProjectModal(false)
        setSelectedProject(null)
        // Re-enable body scrolling
        document.body.style.overflow = "auto"
    }

    // OPTIMIZED: Initialize app - authenticate user and fetch projects
    useEffect(() => {
        const initializeApp = async () => {
            // First authenticate the user - only happens once when page loads
            await authenticateUser()

            // Then fetch projects
            await fetchProjects()
        }

        initializeApp()
    }, [])

    // OPTIMIZED: Check liked projects whenever projects or userInfo changes
    useEffect(() => {
        if (projects.length > 0 && userInfo) {
            checkLikedProjects()
        }
    }, [projects, userInfo])

    // Fetch projects data
    const fetchProjects = async () => {
        try {
            setLoading(true)
            const response = await fetch(
                "https://builderspace.onrender.com/api/get-like-count-for-all-projects/?CLIENT_ID=qwerty@buildersspace9999Revant&CLIENT_SECRET=asdfghjkwertyuicvbnmrevantsdfghjk2345678fghjrpeavaarnttkh",
            )

            if (!response.ok) {
                throw new Error("Failed to fetch projects")
            }

            const data = await response.json()

            // Transform the data to match our component needs
            const transformedData = data.map((item, index) => ({
                id: index + 1,
                participant_name: Array.isArray(item.participant_name) ? item.participant_name[0] : item.participant_name,
                participant_email: Array.isArray(item.participant_email) ? item.participant_email[0] : item.participant_email,
                project_idea_title: Array.isArray(item.project_idea_title)
                    ? item.project_idea_title[0]
                    : item.project_idea_title,
                project_idea_description: Array.isArray(item.project_idea_description)
                    ? item.project_idea_description[0]
                    : item.project_idea_description,
                project_experience: Array.isArray(item.project_experience)
                    ? item.project_experience[0]
                    : item.project_experience,
                project_video_link: Array.isArray(item.project_video_link)
                    ? item.project_video_link[0]
                    : item.project_video_link,
                like_counts: Array.isArray(item.like_counts) ? parseInt(item.like_counts[0]) : parseInt(item.like_counts || 0),
                // Extract social media links
                instagram: Array.isArray(item.instagram) ? item.instagram[0] : item.instagram,
                github: Array.isArray(item.github) ? item.github[0] : item.github,
                twitter: Array.isArray(item.twitter) ? item.twitter[0] : item.twitter,
                linkedin: Array.isArray(item.linkedin) ? item.linkedin[0] : item.linkedin,
                house: Array.isArray(item.house) ? item.house[0] : item.house,
            }))

            // Sort projects by like count (most likes to least likes)
            const sortedProjects = transformedData.sort((a, b) => (b.like_counts || 0) - (a.like_counts || 0))

            setProjects(sortedProjects)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching projects:", error)
            setError("Failed to load projects. Please try again later.")
            setLoading(false)
        }
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
            const video = card.querySelector("video")
            if (video) {
                videoRefs.current[index] = video

                // Configure all videos - initially all muted
                video.muted = true

                // Initialize video states
                setVideoStates((prev) => ({
                    ...prev,
                    [index]: {
                        muted: true,
                        playing: index === 0,
                    },
                }))

                // Only play the front card video
                if (index === 0) {
                    activeVideoRef.current = video
                    video.play().catch((e) => console.error("Error playing video:", e))
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

    // Handle house filter change
    const handleHouseChange = (house) => {
        setSelectedHouse(house)
    }

    // Filter projects based on search query and selected house
    const filteredProjects = projects.filter((project) => {
        // First filter by search query
        const matchesSearch = !searchQuery || (
            (project.participant_name && project.participant_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (project.project_idea_title && project.project_idea_title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (project.project_idea_description && project.project_idea_description.toLowerCase().includes(searchQuery.toLowerCase()))
        )

        // Then filter by house
        const matchesHouse = selectedHouse === "All" ||
            (project.house && project.house.toLowerCase() === selectedHouse.toLowerCase())

        return matchesSearch && matchesHouse
    })

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

            // Update video state
            setVideoStates((prev) => ({
                ...prev,
                [currentIndex]: {
                    ...prev[currentIndex],
                    muted: newMuteState,
                },
            }))
        } else if (videoRefs.current[index]) {
            // Toggle mute for specific video
            const newMuteState = !videoRefs.current[index].muted
            videoRefs.current[index].muted = newMuteState

            // Update video state
            setVideoStates((prev) => ({
                ...prev,
                [index]: {
                    ...prev[index],
                    muted: newMuteState,
                },
            }))

            // If this is the active video, also update isMuted state
            if (index === currentIndex) {
                setIsMuted(newMuteState)
            }
        }
    }

    const togglePlayPause = (index) => {
        if (index === undefined && activeVideoRef.current) {
            // Toggle play/pause for active video
            const newPlayState = !isPlaying
            setIsPlaying(newPlayState)

            if (newPlayState) {
                activeVideoRef.current.play().catch((e) => console.error("Error playing video:", e))
            } else {
                activeVideoRef.current.pause()
            }

            // Update video state
            setVideoStates((prev) => ({
                ...prev,
                [currentIndex]: {
                    ...prev[currentIndex],
                    playing: newPlayState,
                },
            }))
        } else if (videoRefs.current[index]) {
            // Toggle play/pause for specific video
            const isPaused = videoRefs.current[index].paused

            // Pause all videos first
            videoRefs.current.forEach((video, i) => {
                if (video && i !== index) {
                    video.pause()
                    setVideoStates((prev) => ({
                        ...prev,
                        [i]: {
                            ...prev[i],
                            playing: false,
                        },
                    }))
                }
            })

            // Then play/pause the selected video
            if (isPaused) {
                videoRefs.current[index].play().catch((e) => console.error("Error playing video:", e))
            } else {
                videoRefs.current[index].pause()
            }

            // Update video state
            setVideoStates((prev) => ({
                ...prev,
                [index]: {
                    ...prev[index],
                    playing: isPaused,
                },
            }))

            // If this is the active video, also update isPlaying state
            if (index === currentIndex) {
                setIsPlaying(!isPaused)
            }
        }
    }

    const rewindVideo = (index) => {
        if (index === undefined && activeVideoRef.current) {
            // Rewind active video
            activeVideoRef.current.currentTime = 0
            if (!isPlaying) {
                activeVideoRef.current.play().catch((e) => console.error("Error playing video:", e))
                setIsPlaying(true)

                // Update video state
                setVideoStates((prev) => ({
                    ...prev,
                    [currentIndex]: {
                        ...prev[currentIndex],
                        playing: true,
                    },
                }))
            }
        } else if (videoRefs.current[index]) {
            // Rewind specific video
            videoRefs.current[index].currentTime = 0
            videoRefs.current[index].play().catch((e) => console.error("Error playing video:", e))

            // Update video state
            setVideoStates((prev) => ({
                ...prev,
                [index]: {
                    ...prev[index],
                    playing: true,
                },
            }))

            // If this is the active video, also update isPlaying state
            if (index === currentIndex) {
                setIsPlaying(true)
            }
        }
    }

    // Format like count for display (e.g., 5200 -> 5.2K)
    const formatLikeCount = (count) => {
        if (!count && count !== 0) return "0"
        if (count < 1000) return count.toString()
        return (count / 1000).toFixed(1) + "K"
    }

    // Function to check if a social link is valid
    const isValidUrl = (url) => {
        if (!url) return false
        try {
            new URL(url)
            return true
        } catch (e) {
            return false
        }
    }

    return (
        <div className="min-h-screen bg-black text-white font-manrope">
            <Navigation />
            <Head>
                <meta name="description" content="Builders Space Demo Day Video Platform" />
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
                
                .video-card {
                  position: relative;
                  overflow: hidden;
                  border-radius: 8px;
                  background-color: #111;
                  transition: transform 0.3s ease;
                }
                
                .video-card:hover {
                  transform: translateY(-5px);
                }
                
                .video-card .play-button {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 48px;
                  height: 48px;
                  background-color: rgba(255, 255, 255, 0.2);
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  opacity: 0.8;
                  transition: all 0.2s ease;
                }
                
                .video-card:hover .play-button {
                  opacity: 1;
                  background-color: rgba(255, 255, 255, 0.3);
                }
                
                .video-tag {
                  display: inline-block;
                  padding: 2px 8px;
                  border-radius: 4px;
                  font-size: 10px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  background-color: rgba(255, 255, 255, 0.1);
                  margin-right: 6px;
                }
                
                .action-button {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: #1e1e1e;
                  border-radius: 999px;
                  padding: 4px 10px;
                  font-size: 12px;
                  font-weight: 600;
                  color: white;
                  transition: all 0.2s ease;
                  cursor: pointer;
                }
                
                .action-button:hover {
                  background-color: #2a2a2a;
                }
                
                .action-button svg {
                  margin-right: 4px;
                }
                
                .like-button {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: #1e1e1e;
                  border-radius: 999px;
                  padding: 4px 10px;
                  font-size: 12px;
                  font-weight: 600;
                  color: white;
                  transition: all 0.2s ease;
                  cursor: pointer;
                }
                
                .like-button:hover {
                  background-color: #2a2a2a;
                }
                
                .like-button.liked {
                  background-color: rgba(255, 59, 48, 0.2);
                  color: #ff3b30;
                }
                
                .like-button.liked:hover {
                  background-color: rgba(255, 59, 48, 0.3);
                }
                
                .like-button svg {
                  margin-right: 4px;
                }
                
                .like-button.liking {
                  animation: pulse 1.5s infinite;
                }
                
                @keyframes pulse {
                  0% { transform: scale(1); }
                  50% { transform: scale(1.05); }
                  100% { transform: scale(1); }
                }
                
                .truncate-2 {
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                }
                
                .truncate-1 {
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                }
                
                .active-control {
                  background-color: rgba(255, 255, 255, 0.4);
                }
                
                .modal-overlay {
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background-color: rgba(0, 0, 0, 0.75);
                  z-index: 50;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  backdrop-filter: blur(4px);
                }
                
                .modal-content {
                  background-color: #111;
                  border-radius: 12px;
                  width: 90%;
                  max-width: 1000px;
                  max-height: 90vh;
                  overflow-y: auto;
                  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
                }
                
                .social-link {
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  width: 36px;
                  height: 36px;
                  border-radius: 50%;
                  background-color: rgba(255, 255, 255, 0.1);
                  color: white;
                  transition: all 0.2s ease;
                  margin-right: 8px;
                }
                
                .social-link:hover {
                  background-color: rgba(255, 255, 255, 0.2);
                  transform: translateY(-2px);
                }
                
                .heart-animation {
                  animation: heartBeat 0.3s ease-in-out;
                }
                
                @keyframes heartBeat {
                  0% { transform: scale(1); }
                  50% { transform: scale(1.3); }
                  100% { transform: scale(1); }
                }
                
                .house-filter {
                  display: inline-flex;
                  align-items: center;
                  background-color: rgba(255, 255, 255, 0.1);
                  border-radius: 8px;
                  padding: 4px;
                  margin-right: 8px;
                  margin-bottom: 8px;
                }
                
                .house-filter-button {
                  padding: 6px 12px;
                  border-radius: 6px;
                  font-size: 14px;
                  font-weight: 500;
                  transition: all 0.2s ease;
                  cursor: pointer;
                }
                
                .house-filter-button:hover {
                  background-color: rgba(255, 255, 255, 0.1);
                }
                
                .house-filter-button.active {
                  background-color: rgba(255, 255, 255, 0.2);
                  color: white;
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
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white video-control-button ${videoStates[index]?.playing ? "bg-white/30" : "bg-white/20"
                                                }`}
                                            title="Rewind"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor">
                                                <path
                                                    d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => togglePlayPause(index)}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white video-control-button ${videoStates[index]?.playing ? "bg-white/30" : "bg-white/20"
                                                }`}
                                            title={videoStates[index]?.playing ? "Pause" : "Play"}
                                        >
                                            {videoStates[index]?.playing ? (
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
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white video-control-button ${videoStates[index]?.muted ? "bg-white/20" : "bg-white/30"
                                                }`}
                                            title={videoStates[index]?.muted ? "Unmute" : "Mute"}
                                        >
                                            {videoStates[index]?.muted ? (
                                                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor">
                                                    <path
                                                        d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor">
                                                    <path
                                                        d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                                                        fill="currentColor"
                                                    />
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

                {/* Search and Filter Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    {/* House Filter Buttons */}
                    <div className="flex flex-wrap">
                        {houses.map((house) => (
                            <button
                                key={house}
                                onClick={() => handleHouseChange(house)}
                                className={`house-filter-button ${selectedHouse === house ? 'active' : ''}`}
                            >
                                {house}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent border-b border-gray-700 text-white px-2 py-1 w-full focus:outline-none focus:border-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <svg
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
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

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
                    </div>
                )}

                {/* Error State */}
                {error && <div className="bg-red-900/50 text-white p-4 rounded-lg mb-8 text-center">{error}</div>}

                {/* Empty State */}
                {!loading && filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-medium mb-2">No projects found</h3>
                        <p className="text-gray-400">Try adjusting your search criteria or house filter</p>
                    </div>
                )}

                {/* Video Grid - Redesigned to match the provided image */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="video-card">
                            <div className="relative">
                                <div className="aspect-w-16">
                                    {playingVideoId === project.id ? (
                                        <iframe
                                            src={`${getYoutubeEmbedUrl(project.project_video_link)}?autoplay=1`}
                                            title={project.project_idea_title || "Project Video"}
                                            className="w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <img
                                            src={getYoutubeThumbnail(project.project_video_link) || "/placeholder.svg"}
                                            alt={`Video by ${project.participant_name || "Unknown"}`}
                                            className="object-cover w-full h-full"
                                        />
                                    )}
                                </div>

                                {(!playingVideoId || playingVideoId !== project.id) && (
                                    <button className="play-button" onClick={() => handlePlayVideo(project.id)} aria-label="Play video">
                                        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor">
                                            <path d="M8 5v14l11-7z" fill="white" />
                                        </svg>
                                    </button>
                                )}

                                {/* House Badge */}
                                {project.house && (
                                    <div className="absolute top-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-xs font-semibold">
                                        {project.house}
                                    </div>
                                )}
                            </div>
                            <div className="p-3">
                                <h3 className="font-medium text-sm text-white mb-1 truncate-1">
                                    {project.participant_name || "Shivangi Singh"}
                                </h3>
                                <h4 className="text-xs text-gray-300 mb-2 truncate-1">
                                    {project.project_idea_title || "Untitled Project"}
                                </h4>
                                <p className="text-xs text-gray-400 mb-2 truncate-2">
                                    {project.project_idea_description || "No description available"}
                                </p>
                               
                            </div>
                            <div className="absolute bottom-3 right-3 z-10 flex space-x-2">
                                {/* Like Button */}
                                <button
                                    id={`like-btn-${project.participant_email}`}
                                    className={`like-button ${likedProjects[project.participant_email] ? "liked" : ""} ${likingInProgress[project.participant_email] ? "liking" : ""}`}
                                    onClick={() => likeProject(project.participant_email)}
                                    disabled={likingInProgress[project.participant_email] || !isAuthenticated}
                                >
                                    {likingInProgress[project.participant_email] ? (
                                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                    ) : (
                                        <Heart className={`w-4 h-4 mr-1 ${likedProjects[project.participant_email] ? "fill-current" : ""}`} />
                                    )}
                                    <span>{formatLikeCount(project.like_counts)}</span>
                                </button>

                                {/* View Details Button */}
                                <button
                                    className="action-button"
                                    onClick={() => openProjectDetails(project)}
                                    title="View project details"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Project Details Modal */}
                {showProjectModal && selectedProject && (
                    <div className="modal-overlay" onClick={closeProjectModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Video Section */}
                                <div className="p-6">
                                    <div className="aspect-w-16 mb-4">
                                        <iframe
                                            src={getYoutubeEmbedUrl(selectedProject.project_video_link)}
                                            title={selectedProject.project_idea_title || "Project Video"}
                                            className="w-full h-full rounded-lg"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    <h2 className="text-xl font-bold mb-2">{selectedProject.project_idea_title || "Untitled Project"}</h2>
                                    <p className="text-gray-300 text-sm mb-4">
                                        {selectedProject.project_idea_description || "No description available"}
                                    </p>

                                    {/* Project Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="video-tag">PARTICIPANT</span>
                                        {selectedProject.project_experience && (
                                            <span className="video-tag">{selectedProject.project_experience.toUpperCase()}</span>
                                        )}
                                        {selectedProject.house && (
                                            <span className="video-tag">{selectedProject.house.toUpperCase()}</span>
                                        )}
                                    </div>

                                    {/* Like Button in Modal */}
                                    <button
                                        className={`like-button ${likedProjects[selectedProject.participant_email] ? "liked" : ""} ${likingInProgress[selectedProject.participant_email] ? "liking" : ""}`}
                                        onClick={() => likeProject(selectedProject.participant_email)}
                                        disabled={likingInProgress[selectedProject.participant_email] || !isAuthenticated}
                                    >
                                        {likingInProgress[selectedProject.participant_email] ? (
                                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                        ) : (
                                            <Heart className={`w-4 h-4 mr-1 ${likedProjects[selectedProject.participant_email] ? "fill-current" : ""}`} />
                                        )}
                                        <span>{formatLikeCount(selectedProject.like_counts)}</span>
                                    </button>
                                </div>

                                {/* Creator Info Section */}
                                <div className="bg-gray-900 p-6 rounded-r-lg">
                                    <h3 className="text-2xl font-bold mb-1">
                                        Hello, I'm {selectedProject.participant_name || "Anonymous"}
                                    </h3>
                                    <p className="text-gray-400 mb-6">{selectedProject.project_experience || "Builder"} at buildspace</p>

                                    <h4 className="font-semibold mb-2">About this project</h4>
                                    <p className="text-gray-300 text-sm mb-4">
                                        {selectedProject.project_idea_description || "No description available"}
                                    </p>
                                    <p className="text-gray-400 mb-3">Say hi to {selectedProject.participant_name || "Builder"} at </p>

                                    {/* Social Links */}
                                    <div className="flex mb-6">
                                        {isValidUrl(selectedProject.twitter) && (
                                            <a
                                                href={selectedProject.twitter}
                                                className="social-link"
                                                title="Twitter"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Twitter size={18} />
                                            </a>
                                        )}

                                        {isValidUrl(selectedProject.github) && (
                                            <a
                                                href={selectedProject.github}
                                                className="social-link"
                                                title="GitHub"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Github size={18} />
                                            </a>
                                        )}

                                        {isValidUrl(selectedProject.linkedin) && (
                                            <a
                                                href={selectedProject.linkedin}
                                                className="social-link"
                                                title="LinkedIn"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Linkedin size={18} />
                                            </a>
                                        )}

                                        {isValidUrl(selectedProject.instagram) && (
                                            <a
                                                href={selectedProject.instagram}
                                                className="social-link"
                                                title="Instagram"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Instagram size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700"
                                onClick={closeProjectModal}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    )
}