import React, { useState, useEffect } from 'react';
import { Instagram, Github, Twitter, Linkedin, X, Edit3 } from 'lucide-react';

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
            className={`transform transition-all duration-300 hover:scale-110 hover:${color} group`}
        >
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity"></div>
                {React.cloneElement(icon, { 
                    className: `w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative z-10 transition-colors duration-300 group-hover:${color}` 
                })}
            </div>
        </a>
    );

    return (
        <div className="relative max-w-3xl mx-auto px-4">
            {/* Social Links Display */}
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 bg-zinc-900/90 backdrop-blur-lg px-6 py-6 sm:py-8 border border-zinc-700/50 rounded-full shadow-xl">
                    <SocialIcon 
                        platform="instagram" 
                        icon={<Instagram />} 
                        color="text-pink-500" 
                        url={socialLinks.instagram} 
                    />
                    <SocialIcon 
                        platform="github" 
                        icon={<Github />} 
                        color="text-purple-500" 
                        url={socialLinks.github} 
                    />
                    <SocialIcon 
                        platform="twitter" 
                        icon={<Twitter />} 
                        color="text-blue-400" 
                        url={socialLinks.twitter} 
                    />
                    <SocialIcon 
                        platform="linkedin" 
                        icon={<Linkedin />} 
                        color="text-blue-600" 
                        url={socialLinks.linkedin} 
                    />
                </div>

                {/* Edit Button */}
                <button
                    className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12 z-10"
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
                                instagram: { icon: <Instagram />, color: "ring-pink-500 focus:ring-pink-500", text: "text-pink-500" },
                                github: { icon: <Github />, color: "ring-purple-500 focus:ring-purple-500", text: "text-purple-500" },
                                twitter: { icon: <Twitter />, color: "ring-blue-400 focus:ring-blue-400", text: "text-blue-400" },
                                linkedin: { icon: <Linkedin />, color: "ring-blue-600 focus:ring-blue-600", text: "text-blue-600" }
                            }).map(([platform, { icon, color, text }]) => (
                                <div key={platform} className="group">
                                    <label className="block text-sm font-medium text-zinc-300 mb-2 capitalize">
                                        {platform} URL
                                    </label>
                                    <div className="flex items-center bg-zinc-800/70 backdrop-blur-sm border border-zinc-700 rounded-lg group-focus-within:border-indigo-500 overflow-hidden transition-all duration-200">
                                        <div className={`flex items-center justify-center w-12 h-12 ${text} bg-zinc-800`}>
                                            {React.cloneElement(icon, { size: 20 })}
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