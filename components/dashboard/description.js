import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const EditableDescriptionCard = ({ apiEndpoint, cardId }) => {
    const [description, setDescription] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch description from the API on component mount
    useEffect(() => {
        const fetchDescriptionData = async () => {
            setIsLoading(true);
            try {
                // const response = await axios.get(`${apiEndpoint}/${cardId}/`);
                const fetchedDescription = 'response.data.description';

                setDescription(fetchedDescription);
                setInputValue(fetchedDescription);
            } catch (err) {
                setError("Failed to load description data");
                console.error("API fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDescriptionData();
    }, [apiEndpoint, cardId]);

    const handleSave = async () => {
        try {
            // Send update to the backend
            await axios.patch(`${apiEndpoint}/${cardId}/`, {
                description: inputValue
            });

            // Update local state only after successful API update
            setDescription(inputValue);
            setIsEditing(false);
        } catch (err) {
            alert("Failed to update description. Please try again.");
            console.error("API update error:", err);
        }
    };

    return (
        <div className="lg:col-span-6 bg-zinc-900/30 border border-zinc-800 aspect-square flex items-center justify-center relative">
            {/* Edit Button */}
            <button
                className="absolute top-[-3%] left-[-5%] w-10 h-10 bg-zinc-800/90 border border-zinc-700 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-200 hover:scale-110"
                aria-label="Edit content"
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

            <div className="h-full w-full p-6 overflow-y-auto scrollbar-thin">
                {isLoading ? (
                    <p className="text-zinc-400">Loading description...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <p className="text-base text-zinc-400 break-words">
                        {description}
                    </p>
                )}
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 w-full max-w-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium text-zinc-100">Edit Description</h2>
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
                                    Description Text
                                </label>
                                <textarea
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-64 resize-none"
                                    placeholder="Enter description text..."
                                />
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
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
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