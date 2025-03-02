import React, { useState, useEffect } from 'react';
import { Instagram, Github, Linkedin, X, Edit3 } from 'lucide-react';

const SocialLinksEditor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [socialLinks, setSocialLinks] = useState({
        instagram: 'https://instagram.com/username',
        github: 'https://github.com/username',
        twitter: 'https://twitter.com/username',
        linkedin: 'https://linkedin.com/in/username'
    });
    const [formData, setFormData] = useState({ ...socialLinks });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

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

    const SocialIcon = ({ platform, icon, color, url }) => (
        <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`transform transition-all duration-300 hover:scale-110`}
        >
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity"></div>
                {icon}
            </div>
        </a>
    );

    // Custom Twitter SVG component with white color
    const CustomTwitterIcon = () => (
        <div className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 relative z-10 transition-colors duration-300 group-hover:text-blue-400 flex items-center justify-center">
            <img 
                src="/Welcome/icons8-twitter-60.svg" 
                alt="Twitter" 
                className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white filter invert" 
            />
        </div>
    );

    return (
        <div className="relative mx-auto px-4">
            {/* Social Links Display */}
            <div className="relative group">
                <div className="relative flex items-center justify-center gap-4 md:gap-6 lg:gap-10 bg-zinc-900/90 backdrop-blur-lg lg:px-6 py-2 lg:py-4 border border-zinc-700/50 rounded-full shadow-xl">
                    <SocialIcon 
                        platform="instagram" 
                        icon={<Instagram className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 relative z-10 transition-colors duration-300 text-white" />} 
                        color="text-white" 
                        url={socialLinks.instagram} 
                    />
                    <SocialIcon 
                        platform="github" 
                        icon={<Github className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 relative z-10 transition-colors duration-300 text-white" />} 
                        color="text-white" 
                        url={socialLinks.github} 
                    />
                    <SocialIcon 
                        platform="twitter" 
                        icon={<CustomTwitterIcon />} 
                        color="text-white" 
                        url={socialLinks.twitter} 
                    />
                    <SocialIcon 
                        platform="linkedin" 
                        icon={<Linkedin className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 relative z-10 transition-colors duration-300 text-white" />} 
                        color="text-white" 
                        url={socialLinks.linkedin} 
                    />
                </div>

                {/* Edit Button */}
                <button
                    className="absolute -top-4 -right-2 lg:-top-5 lg:-right-3 w-8 h-8 lg:w-11 lg:h-11 bg-gray-600 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12 z-10"
                    aria-label="Edit social links"
                    onClick={() => setIsModalOpen(true)}
                    onMouseEnter={() => setIsEditing(true)}
                    onMouseLeave={() => setIsEditing(false)}
                >
                    <Edit3 
                        size={isEditing ? 18 : 16} 
                        className="text-white transition-all duration-300" 
                    />
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div 
                        className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 animate-fadeIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Edit Social Links</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-zinc-400 hover:text-white transition-colors p-1 hover:bg-zinc-800 rounded-full"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {Object.entries({
                                instagram: { icon: <Instagram />, text: "text-white" },
                                github: { icon: <Github />, text: "text-white" },
                                twitter: { icon: <img src="/Welcome/icons8-twitter-60.svg" alt="Twitter" width="20" height="20" className="filter invert" />, text: "text-white" },
                                linkedin: { icon: <Linkedin />, text: "text-white" }
                            }).map(([platform, { icon, color, text }]) => (
                                <div key={platform} className="group">
                                    <label className="block text-sm font-medium text-zinc-300 mb-2 capitalize">
                                        {platform} URL
                                    </label>
                                    <div className="flex items-center bg-zinc-800/70 backdrop-blur-sm border border-zinc-700 rounded-lg group-focus-within:border-indigo-500 overflow-hidden transition-all duration-200">
                                        <div className={`flex items-center justify-center w-12 h-12 ${text} bg-zinc-800`}>
                                            {icon}
                                        </div>
                                        <input
                                            type="url"
                                            name={platform}
                                            value={formData[platform]}
                                            onChange={handleInputChange}
                                            className={`w-full bg-transparent px-3 py-3 text-zinc-200 focus:outline-none focus:ring-1 ${color}`}
                                            placeholder={`https://${platform}.com/username`}
                                        />
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg"
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