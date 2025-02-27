import React, { useState } from 'react';
import { Instagram, Github, Twitter, Linkedin, X } from 'lucide-react';

const SocialLinksEditor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [socialLinks, setSocialLinks] = useState({
        instagram: 'https://instagram.com/username',
        github: 'https://github.com/username',
        twitter: 'https://twitter.com/username',
        linkedin: 'https://linkedin.com/in/username'
    });

    const [formData, setFormData] = useState({ ...socialLinks });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSocialLinks({ ...formData });
        setIsModalOpen(false);
    };

    return (
        <div className="relative group">
            <div className="flex bg-zinc-600 items-center justify-center gap-8 lg:gap-16 bg-zinc-900/50 mb-16 backdrop-blur-sm px-8 py-4 border border-zinc-700 rounded-full">
                <a href={socialLinks.instagram} target="_blank" className="hover:text-pink-500 transition-colors">
                    <Instagram className="w-9 h-9 lg:w-12 lg:h-12" />
                </a>
                <a href={socialLinks.github} target="_blank" className="hover:text-purple-500 transition-colors">
                    <Github className="w-9 h-9 lg:w-12 lg:h-12" />
                </a>
                <a href={socialLinks.twitter} target="_blank" className="hover:text-blue-400 transition-colors">
                    <Twitter className="w-9 h-9 lg:w-12 lg:h-12" />
                </a>
                <a href={socialLinks.linkedin} target="_blank" className="hover:text-blue-600 transition-colors">
                    <Linkedin className="w-9 h-9 lg:w-12 lg:h-12" />
                </a>
            </div>

            {/* Edit Button */}
            <button
                className="absolute -top-6 -left-2 w-9 h-9 lg:w-12 lg:h-12 bg-zinc-200 border border-zinc-700 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-200 hover:scale-110"
                aria-label="Edit social links"
                onClick={() => setIsModalOpen(true)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-black"
                >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium text-zinc-100">Edit Social Links</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-zinc-400 hover:text-zinc-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">
                                    Instagram URL
                                </label>
                                <div className="flex items-center">
                                    <Instagram className="w-5 h-5 text-pink-500 mr-2" />
                                    <input
                                        type="url"
                                        name="instagram"
                                        value={formData.instagram}
                                        onChange={handleInputChange}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        placeholder="https://instagram.com/username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">
                                    GitHub URL
                                </label>
                                <div className="flex items-center">
                                    <Github className="w-5 h-5 text-purple-500 mr-2" />
                                    <input
                                        type="url"
                                        name="github"
                                        value={formData.github}
                                        onChange={handleInputChange}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="https://github.com/username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">
                                    Twitter URL
                                </label>
                                <div className="flex items-center">
                                    <Twitter className="w-5 h-5 text-blue-400 mr-2" />
                                    <input
                                        type="url"
                                        name="twitter"
                                        value={formData.twitter}
                                        onChange={handleInputChange}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                        placeholder="https://twitter.com/username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">
                                    LinkedIn URL
                                </label>
                                <div className="flex items-center">
                                    <Linkedin className="w-5 h-5 text-blue-600 mr-2" />
                                    <input
                                        type="url"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleInputChange}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        placeholder="https://linkedin.com/in/username"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialLinksEditor;