import React, { useState, useEffect } from 'react';
import { X, FileText, Edit2, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const EditableDescriptionCard = ({ apiEndpoint, cardId }) => {
    const [description, setDescription] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    // Fetch description from the API on component mount
    useEffect(() => {
        const fetchDescriptionData = async () => {
            setIsLoading(true);
            try {
                // const response = await axios.get(`${apiEndpoint}/${cardId}/`);
                const fetchedDescription = 'response.data.descriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptiescriptivvon';

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

    if (isLoading) {
        return (
            <div className="lg:col-span-5 bg-gradient-to-br from-zinc-900/70 to-black/80 border border-zinc-800 rounded-xl flex items-center justify-center relative h-[315px] shadow-lg transition-all duration-500 backdrop-blur-sm overflow-hidden">
                <div className="p-8 text-center space-y-4">
                    <Loader2 size={36} className="text-purple-500 animate-spin mx-auto" />
                    <div className="text-zinc-400 font-medium">Loading description...</div>
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
            className="lg:col-span-5 relative overflow-hidden group h-[315px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-xl"></div>
            
            <div className="relative bg-gradient-to-br from-zinc-900/90 to-black border border-zinc-800 rounded-xl overflow-hidden shadow-lg transition-all duration-500 transform group-hover:scale-[1.01] group-hover:border-zinc-700 h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Label */}
                <div className="absolute top-3 left-3 z-20 bg-purple-600/90 text-white text-xs px-2 py-1 rounded-md flex items-center space-x-1 shadow-lg transform -translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                    <FileText size={14} />
                    <span>Project Description</span>
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
                
                {/* Overlay for hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Edit Button with improved styling */}
                <button
                    className={`absolute bottom-4 right-4 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 ${isHovered ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} hover:bg-purple-700 hover:scale-110 z-20`}
                    aria-label="Edit description"
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
                                Edit Description
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
                                    Description Text
                                </label>
                                <textarea
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-full bg-zinc-800/80 border border-zinc-700 rounded-lg px-3 py-3 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 h-64 resize-none"
                                    placeholder="Enter description text..."
                                />
                                <p className="mt-2 text-xs text-zinc-500">
                                    Describe your project or add important information here
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