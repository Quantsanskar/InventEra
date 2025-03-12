import React, { useState, useEffect } from 'react';
import { X, FileText, Edit2, AlertCircle, Loader2 } from 'lucide-react';

const EditableDescriptionCard = ({ apiEndpoint, cardId }) => {
    const [description, setDescription] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
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
            setIsLoading(true);
            try {
                const token = localStorage.getItem("access_token");

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
                });

                const data = await response.json();
                const fetchedDescription = data.project_idea_description;

                if (fetchedDescription) {
                    setDescription(fetchedDescription);
                    setInputValue(fetchedDescription);
                } else {
                    setDescription("No project idea description available. Add one by clicking the edit button.");
                    setInputValue("");
                }
            } catch (err) {
                setError("Failed to load project idea description");
                console.error("API fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDescriptionData();
    }, [apiEndpoint, cardId]);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("access_token");

            if (!token) {
                await refreshToken()
                if (!refreshToken()) {

                    window.localStorage.removeItem("access_token")
                    window.localStorage.removeItem("refresh_token")
                    window.localStorage.removeItem("user_info")
                    window.location.href = "/SignInPage/SignIn"
                }

            }

            const formData = new FormData();
            formData.append("project_idea_description", inputValue);

            const response = await fetch(`https://builderspace.onrender.com/api/update-all-details/`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to update project idea description");
            }

            // Update local state only after successful API update
            setDescription(inputValue);
            setIsEditing(false);
        } catch (err) {
            alert("Failed to update project idea description. Please try again.");
            console.error("API update error:", err);
        }
    };

    if (isLoading) {
        return (
            <div className="lg:col-span-5 bg-gradient-to-br from-zinc-900/70 to-black/80 border border-zinc-800 rounded-xl flex items-center justify-center relative h-[315px] shadow-lg transition-all duration-500 backdrop-blur-sm">
                <div className="p-8 text-center space-y-4">
                    <Loader2 size={36} className="text-purple-500 animate-spin mx-auto" />
                    <div className="text-zinc-400 font-medium">Loading project idea description...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="lg:col-span-5 bg-gradient-to-br from-zinc-900/70 to-black/80 border border-zinc-800 rounded-xl flex items-center justify-center relative h-[315px] shadow-lg transition-all duration-500">
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
        );
    }

    return (
        <div
            className="lg:col-span-5 relative group h-[315px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-xl"></div>

            <div className="relative bg-gradient-to-br from-zinc-900/90 to-black border border-zinc-800 rounded-xl shadow-lg transition-all duration-500 transform group-hover:scale-[1.01] group-hover:border-zinc-700 h-full">

                {/* Label */}
                <div className="absolute top-3 left-3 z-20 bg-purple-600/90 text-white text-xs px-2 py-1 rounded-md flex items-center space-x-1 shadow-lg">
                    <FileText size={14} />
                    <span>Project Idea Description</span>
                </div>

                {/* Description Content */}
                <div className="h-full w-full p-6 overflow-y-auto scrollbar-thin">
                    <div className="p-4 h-full">
                        <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800/50 h-full scrollbar-thin overflow-auto">
                            <p className="text-zinc-300 break-words leading-relaxed">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Edit Button with improved styling */}
                <button
                    className="absolute bottom-[-5%] right-[-4%] w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 z-20"
                    aria-label="Edit project idea description"
                    onClick={() => setIsEditing(true)}
                >
                    <Edit2 size={16} className="text-white" />
                </button>
            </div>

            {/* Edit Modal with improved UI */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div
                        className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300"
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
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Project Idea Description
                                </label>
                                <textarea
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-full bg-zinc-800/80 border border-zinc-700 rounded-lg px-3 py-3 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 h-64 resize-none"
                                    placeholder="Enter your project idea description..."
                                />
                                <p className="mt-2 text-xs text-zinc-500">
                                    Describe your project idea in detail
                                </p>
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
                                    className={`px-4 py-2.5 ${inputValue.trim() !== '' ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600' : 'bg-zinc-700 cursor-not-allowed'} text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-lg`}
                                    disabled={inputValue.trim() === ''}
                                >
                                    Update Description
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditableDescriptionCard;