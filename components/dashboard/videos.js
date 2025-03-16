"use client"

import { useState, useEffect } from "react"
import { X, Youtube, Edit2, AlertCircle, Loader2, Upload } from "lucide-react"

const EditableYoutubeCard = ({ apiEndpoint, cardId }) => {
    const [videoUrl, setVideoUrl] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [userData, setUserData] = useState(null)

    // Function to extract YouTube video ID from various YouTube URL formats
    const extractVideoId = (url) => {
        // Handle different YouTube URL formats
        const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/
        const match = url?.match(regExp)

        if (match && match[2].length === 11) {
            return match[2]
        }

        return null
    }

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem("refresh_token")
        if (!refreshToken) {
            return false
        }

        try {
            const response = await fetch(`https://builderspace.onrender.com/api/token/refresh/`, {
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
            setError("An error occurred while refreshing your session. Please try again.")
            return false
        }
    }
    const fetchVideoData = async () => {
        setIsLoading(true)
        try {
            const token = localStorage.getItem("access_token")

            if (!token) {
                await refreshToken()
                if (!refreshToken()) {
                    window.localStorage.removeItem("access_token")
                    window.localStorage.removeItem("refresh_token")
                    window.localStorage.removeItem("user_info")
                    window.location.href = "/SignInPage/SignIn"
                }
            }

            const response = await fetch(`https://builderspace.onrender.com/api/get-user-details/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })

            const data = await response.json()
            const fetchedVideoUrl = data.project_video_link // Fetch project video link

            if (fetchedVideoUrl) {
                const videoId = extractVideoId(fetchedVideoUrl)
                if (videoId) {
                    setVideoUrl(`https://www.youtube.com/embed/${videoId}`)
                    setInputValue(fetchedVideoUrl)
                } else {
                    setError("Invalid YouTube URL received from API")
                }
            } else {
                setVideoUrl(null) // No video link case
            }
        } catch (err) {
            setError("Failed to load video data")
            console.error("API fetch error:", err)
        } finally {
            setIsLoading(false)
        }
    }
    // Fetch video URL from the API on component mount
    useEffect(() => {
        const fetchVideoData = async () => {
            setIsLoading(true)
            try {
                const token = localStorage.getItem("access_token")

                if (!token) {
                    await refreshToken()
                    if (!refreshToken()) {
                        window.localStorage.removeItem("access_token")
                        window.localStorage.removeItem("refresh_token")
                        window.localStorage.removeItem("user_info")
                        window.location.href = "/SignInPage/SignIn"
                    }
                }

                const response = await fetch(`https://builderspace.onrender.com/api/get-user-details/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                const data = await response.json()
                const fetchedVideoUrl = data.project_video_link // Fetch project video link

                if (fetchedVideoUrl) {
                    const videoId = extractVideoId(fetchedVideoUrl)
                    if (videoId) {
                        setVideoUrl(`https://www.youtube.com/embed/${videoId}`)
                        setInputValue(fetchedVideoUrl)
                    } else {
                        setError("Invalid YouTube URL received from API")
                    }
                } else {
                    setVideoUrl(null) // No video link case
                }
            } catch (err) {
                setError("Failed to load video data")
                console.error("API fetch error:", err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchVideoData()
    }, [apiEndpoint, cardId])

    useEffect(() => {
        const verifyToken = async () => {
            const accessToken = localStorage.getItem("access_token")
            const userInfo = localStorage.getItem("user_info")
            if (!accessToken || !userInfo) {
                await refreshToken()
                if (!refreshToken || !userInfo) {
                    setError("You need to sign in to access this page.")
                    localStorage.removeItem("access_token")
                    localStorage.removeItem("refresh_token")
                    localStorage.removeItem("user_info")
                    window.location.href = "/SignInPage/SignIn"
                    setIsLoading(false)
                    return
                }
            }

            try {
                const response = await fetch(`https://builderspace.onrender.com/api/verify-token/`, {
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
                setIsLoading(false)
            }
        }

        verifyToken()
    }, [])

    const handleSave = async () => {
        const videoId = extractVideoId(inputValue)

        if (videoId) {
            const embedUrl = `https://www.youtube.com/embed/${videoId}`

            try {
                const token = localStorage.getItem("access_token")

                if (!token) {
                    await refreshToken()
                    throw new Error("No authentication token found")
                }

                const formData = new FormData()
                formData.append("project_video_link", inputValue)

                const response = await fetch(`https://builderspace.onrender.com/api/update-all-details/`, {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                })

                if (!response.ok) {
                    throw new Error("Failed to update video")
                }

                setVideoUrl(embedUrl)
                setIsEditing(false)
            } catch (err) {
                alert("Failed to update video. Please try again.")
                console.error("API update error:", err)
            }
        } else {
            alert("Please enter a valid YouTube URL")
        }
    }

    if (isLoading) {
        return (
            <div className="lg:col-span-6 bg-[#0B090A] border border-white/50 rounded-[22px] shadow-md flex items-center justify-center relative  w-[323px] h-[367px] lg:w-[553px] lg:h-[587px] flex-shrink-0 backdrop-blur-lg overflow-hidden">
                <div className="p-8 text-center space-y-4">
                    <Loader2 size={28} className="text-white animate-spin mx-auto" />
                    <div className="text-white text-sm">Loading your video...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="lg:col-span-6 bg-[#0B090A] border border-white/50 rounded-[22px] shadow-md flex items-center justify-center relative w-[323px] h-[367px] lg:w-[553px] lg:h-[587px] flex-shrink-0">
                <div className="p-8 text-center space-y-4">
                    <AlertCircle size={36} className="text-red-500 mx-auto" />
                    <div className="text-red-400 font-medium">Please check your youtube video link again.</div>
                    <button
                        onClick={fetchVideoData}
                        className="px-4 py-2 bg-[#0B090A] border border-white/50 rounded-[22px] shadow-md text-sm text-zinc-200 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="lg:col-span-6 relative group">
            {/* Label */}


            {/* YouTube iframe or upload icon */}
            <div className="aspect-video relative bg-[#0B090A] flex items-center justify-center border border-white/50 rounded-[22px] shadow-md w-[323px] h-[367px] lg:w-[553px] lg:h-[587px] flex-shrink-0

">
                {videoUrl ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="z-10 relative"
                    ></iframe>
                ) : (
                    <div className="flex flex-col items-center justify-center text-zinc-500">
                        <Upload size={40} className="mb-2 text-zinc-600" />
                        <span className="text-sm">No video uploaded</span>
                    </div>
                )}
            </div>

            {/* Edit Button */}
            <button
                className={`absolute bottom-[-5%] md:bottom-[-12%] lg:bottom-[-4%] right-[-1%] lg:right-[4%] w-10 h-10 bg-black rounded-full flex items-center justify-center border border-white/50 shadow-lg z-20 ${isEditing ? 'opacity-0 cursor-default' : 'opacity-100'}`}
                aria-label="Edit video"
                onClick={() => setIsEditing(true)}
            >
                <Edit2 size={16} className={`text-white z-20`} />
            </button>

            {/* Edit Modal with improved UI */}
            {isEditing && (
                <div className="fixed inset-0 mb-32 flex items-center justify-center z-50 p-4 w-[323px] h-[367px] lg:w-[553px] lg:h-[587px] flex-shrink-0 backdrop-blur-lg">
                    <div
                        className="bg-gradient-to-b from-zinc-900 to-black border border-white/50 rounded-[22px] shadow-md p-6 w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium text-zinc-100 flex items-center gap-2">
                                <Youtube size={18} className="text-red-500" />
                                Edit YouTube Video
                            </h2>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="text-zinc-400 hover:text-zinc-100 rounded-full h-8 w-8 flex items-center justify-center hover:bg-zinc-800 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">YouTube Video URL</label>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-full bg-zinc-800/80 border border-zinc-700 rounded-lg px-3 py-3 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                />
                                <p className="mt-2 text-xs text-zinc-500">Paste any YouTube URL format (watch, share, or embed)</p>
                            </div>

                            <div className="pt-1">
                                <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700/50">
                                    <h3 className="text-sm text-zinc-300 mb-3 flex items-center gap-2">
                                        <Youtube size={14} className="text-red-500" />
                                        Preview
                                    </h3>
                                    <div className="aspect-video bg-zinc-950 flex items-center justify-center overflow-hidden rounded-lg border border-zinc-800 shadow-inner">
                                        {extractVideoId(inputValue) ? (
                                            <div className="relative w-full h-full">
                                                <img
                                                    src={`https://img.youtube.com/vi/${extractVideoId(inputValue)}/0.jpg`}
                                                    alt="Video thumbnail preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-16 h-16 rounded-full bg-black/70 flex items-center justify-center">
                                                        <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-red-600 ml-1"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-zinc-500 text-sm flex flex-col items-center gap-2 p-4">
                                                <AlertCircle size={24} className="text-zinc-600" />
                                                <span>Invalid YouTube URL</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className={`px-4 py-2.5 ${extractVideoId(inputValue) ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600" : "bg-zinc-700 cursor-not-allowed"} text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-lg`}
                                    disabled={!extractVideoId(inputValue)}
                                >
                                    Update Video
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditableYoutubeCard

