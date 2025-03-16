"use client"

import { useState, useEffect } from "react"
import { X, FileText, Edit2, AlertCircle, Loader2 } from "lucide-react"

const EditableDescriptionCard = ({ apiEndpoint, cardId }) => {
    const [description, setDescription] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isHovered, setIsHovered] = useState(false)
    const [userData, setUserData] = useState(null)

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

    // Fetch project idea description from the API on component mount
    useEffect(() => {
        const fetchDescriptionData = async () => {
            setIsLoading(true)
            try {
                const token = localStorage.getItem("access_token")

                if (!token) {
                    await refreshToken()
                    if (!refreshToken()) {
                        window.localStorage.removeItem("access_token")
                        window.localStorage.removeItem("refresh_token")
                        window.localStorage.removeItem("user-info")
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
                const fetchedDescription = data.project_idea_description

                if (fetchedDescription) {
                    setDescription(fetchedDescription)
                    setInputValue(fetchedDescription)
                } else {
                    setDescription("No project idea description available. Add one by clicking the edit button.")
                    setInputValue("")
                }
            } catch (err) {
                setError("Failed to load project idea description")
                console.error("API fetch error:", err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDescriptionData()
    }, [apiEndpoint, cardId])

    const handleSave = async () => {
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

            const formData = new FormData()
            formData.append("project_idea_description", inputValue)

            const response = await fetch(`https://builderspace.onrender.com/api/update-all-details/`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })

            if (!response.ok) {
                throw new Error("Failed to update project idea description")
            }

            // Update local state only after successful API update
            setDescription(inputValue)
            setIsEditing(false)
        } catch (err) {
            alert("Failed to update project idea description. Please try again.")
            console.error("API update error:", err)
        }
    }

    if (isLoading) {
        return (
            <div className="lg:col-span-5 bg-[#0B090A] border border-zinc-800 rounded-xl shadow-md w-[453px] h-[587px] flex-shrink-0 flex items-center justify-center relative backdrop-blur-sm">
                <div className="p-8 text-center space-y-4">
                    <Loader2 size={36} className="text-white animate-spin mx-auto" />
                    <div className="text-white font-medium">Loading project idea description...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="lg:col-span-5 bg-[#0B090A] border border-zinc-800 rounded-xl shadow-md w-[453px] h-[587px] flex-shrink-0 flex items-center justify-center relative ">
                <div className="p-8 text-center space-y-4">
                    <AlertCircle size={36} className="text-red-500 mx-auto" />
                    <div className="text-red-400 font-medium">{error}</div>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-200 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div
            className="lg:col-span-5 relative group h-[315px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <div className="relative bg-[#0B090A] border border-white/50 rounded-xl shadow-md w-[323px] h-[367px] lg:w-[453px] lg:h-[587px] flex-shrink-0">
                {/* Label */}
               

                {/* Description Content */}
                <div className="h-full w-full p-6 overflow-y-auto scrollbar-thin">
                    <div className="p-4 h-full">
                        
                            <p className="text-zinc-300 break-words leading-relaxed">{description}</p>
                        </div>
                    
                </div>

                {/* Edit Button with improved styling */}
                <button
                    className={`absolute bottom-[-5%] right-[-4%] w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg transform transition-all border border-white/50 z-20 ${isEditing ? 'opacity-0 cursor-default' : 'opacity-100'}`}
                    aria-label="Edit project idea description"
                    onClick={() => setIsEditing(true)}
                >
                    <Edit2 size={16} className="text-white z-20" />
                </button>
            </div>

            {/* Edit Modal with improved UI */}
            {isEditing && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-lg">
                    <div
                        className="bg-[#0B090A] border border-white/50 rounded-xl shadow-md p-6 w-full  w-[333px] h-[427px] lg:w-[493px] lg:h-[587px] flex-shrink-0 backdrop-blur-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium text-zinc-100 flex items-center gap-2">
                                <FileText size={18} className="text-purple-500" />
                                Edit Project Idea Description
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
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Project Idea Description</label>
                                <textarea
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-full bg-[#0B090A] border border-white/50 rounded-xl shadow-md px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 h-48 lg:h-80 resize-none"
                                    placeholder="Enter your project idea description..."
                                />
                                <p className="mt-2 text-xs text-zinc-500">Describe your project idea in detail</p>
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
                                    className={`px-4 py-2.5 ${inputValue.trim() !== "" ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600" : "bg-zinc-700 cursor-not-allowed"} text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-lg`}
                                    disabled={inputValue.trim() === ""}
                                >
                                    Update Description
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditableDescriptionCard

