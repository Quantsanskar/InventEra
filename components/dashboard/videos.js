import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

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
        const match = url.match(regExp);

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
                // const response = await axios.get(`${apiEndpoint}/${cardId}/`);
                const fetchedVideoUrl = 'https://youtu.be/0LF1VllQKLo?si=yJkEz3vR2baJdgOB';

                // Check if URL is valid and convert to embed format if needed
                const videoId = extractVideoId(fetchedVideoUrl);
                if (videoId) {
                    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    setVideoUrl(embedUrl);
                    setInputValue(fetchedVideoUrl); // Keep original URL for editing
                } else {
                    setError("Invalid YouTube URL received from API");
                   
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
        // Check if the input is a valid YouTube URL
        const videoId = extractVideoId(inputValue);

        if (videoId) {
            // Create proper embed URL for display
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;

            try {
                // Send update to the backend
                await axios.patch(`${apiEndpoint}/${cardId}/`, {
                    video_url: inputValue // Send the original URL, not the embed URL
                });

                // Update local state only after successful API update
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
            <div className="lg:col-span-6 bg-zinc-900/30 border border-zinc-800 flex items-center lg:ml-[-20%] justify-center relative h-[315px]">
                <div className="text-zinc-400">Loading video...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="lg:col-span-6 bg-zinc-900/30 border border-zinc-800 flex items-center lg:ml-[-20%] justify-center relative h-[315px]">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="lg:col-span-6 bg-zinc-900/30 border border-zinc-800 flex items-center lg:ml-[-20%] justify-center relative">
            {/* YouTube iframe */}
            <iframe
                width="560"
                height="315"
                src={videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>

            {/* Edit Button */}
            <button
                className="absolute top-[-5%] left-[-2%] w-10 h-10 bg-zinc-800/90 border border-zinc-700 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-200 hover:scale-110"
                aria-label="Edit video"
                onClick={() => setIsEditing(true)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-zinc-300"
                >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
            </button>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium text-zinc-100">Edit YouTube Video</h2>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="text-zinc-400 hover:text-zinc-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">
                                    YouTube Video URL
                                </label>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                />
                                <p className="mt-1 text-xs text-zinc-500">
                                    Paste any YouTube URL format (watch, share, or embed)
                                </p>
                            </div>

                            <div className="pt-2">
                                <div className="bg-zinc-800 p-3 rounded-md">
                                    <h3 className="text-sm text-zinc-300 mb-2">Preview:</h3>
                                    <div className="aspect-video bg-zinc-950 flex items-center justify-center overflow-hidden rounded">
                                        {extractVideoId(inputValue) ? (
                                            <img
                                                src={`https://img.youtube.com/vi/${extractVideoId(inputValue)}/0.jpg`}
                                                alt="Video thumbnail preview"
                                                className="w-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-zinc-500 text-sm">Invalid YouTube URL</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors"
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