import React, { useState, useEffect } from 'react';
import { X, Youtube, Edit2, AlertCircle, Loader2, Upload } from 'lucide-react';

const EditableYoutubeCard = ({ apiEndpoint, cardId }) => {
    const [videoUrl, setVideoUrl] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to extract YouTube video ID from various YouTube URL formats
    const extractVideoId = (url) => {
        // Handle different YouTube URL formats
        const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
        const match = url?.match(regExp);

        if (match && match[2].length === 11) {
            return match[2];
        }

        return null;
    };

    // Fetch video URL from the API on component mount
    useEffect(() => {
        const fetchVideoData = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem("access_token");
                
                if (!token) {
                    throw new Error("No authentication token found");
                }
                
                const response = await fetch(`https://builderspace.onrender.com/api/get-user-details/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                
                const data = await response.json();
                const fetchedVideoUrl = data.project_video_link; // Fetch project video link
                
                console.log(fetchedVideoUrl);
                if (fetchedVideoUrl) {
                    const videoId = extractVideoId(fetchedVideoUrl);
                    if (videoId) {
                        setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
                        setInputValue(fetchedVideoUrl);
                    } else {
                        setError("Invalid YouTube URL received from API");
                    }
                } else {
                    setVideoUrl(null); // No video link case
                }
            } catch (err) {
                setError("Failed to load video data");
                console.error("API fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVideoData();
    }, [apiEndpoint, cardId]);

    const handleSave = async () => {
        const videoId = extractVideoId(inputValue);

        if (videoId) {
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;

            try {
                const token = localStorage.getItem("access_token");

                if (!token) {
                    throw new Error("No authentication token found");
                }

                const formData = new FormData();
                formData.append("project_video_link", inputValue);

                const response = await fetch(`https://builderspace.onrender.com/api/update-all-details/`, {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Failed to update video");
                }

                setVideoUrl(embedUrl);
                setIsEditing(false);
            } catch (err) {
                alert("Failed to update video. Please try again.");
                console.error("API update error:", err);
            }
        } else {
            alert("Please enter a valid YouTube URL");
        }
    };

    if (isLoading) {
        return (
            <div className="lg:col-span-6 bg-gradient-to-br from-zinc-900/70 to-black/80 border border-zinc-800 rounded-xl flex items-center justify-center relative h-[315px] shadow-lg transition-all duration-500 backdrop-blur-sm overflow-hidden">
                <div className="p-8 text-center space-y-4">
                    <Loader2 size={36} className="text-red-500 animate-spin mx-auto" />
                    <div className="text-zinc-400 font-medium">Loading your video...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="lg:col-span-6 bg-gradient-to-br from-zinc-900/70 to-black/80 border border-zinc-800 rounded-xl flex items-center justify-center relative h-[315px] shadow-lg transition-all duration-500">
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
        <div className="lg:col-span-6 relative group">
            {/* Label */}
            <div className="absolute top-3 left-[0] z-20 bg-red-600/90 text-white text-xs px-1 py-1 rounded-sm flex items-center space-x-1 shadow-lg transform -translate-y-9 transition-transform duration-500">
                <Youtube size={12} />
                <span>S1 Feature</span>
            </div>

            {/* YouTube iframe or upload icon */}
            <div className="aspect-video relative bg-zinc-900 flex items-center justify-center border border-zinc-800 rounded-lg shadow-md">
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
                className="absolute bottom-[-9%] lg:bottom-[-6%] right-[-5%] lg:right-[-3%] w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300  z-20"
                aria-label="Edit video"
                onClick={() => setIsEditing(true)}
            >
                <Edit2 size={16} className="text-white" />
            </button>

            {/* Edit Modal with improved UI */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div
                        className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300"
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
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    YouTube Video URL
                                </label>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-full bg-zinc-800/80 border border-zinc-700 rounded-lg px-3 py-3 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                />
                                <p className="mt-2 text-xs text-zinc-500">
                                    Paste any YouTube URL format (watch, share, or embed)
                                </p>
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
                                    className={`px-4 py-2.5 ${extractVideoId(inputValue) ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600' : 'bg-zinc-700 cursor-not-allowed'} text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-lg`}
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
    );
};

export default EditableYoutubeCard;