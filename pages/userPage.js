import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Github, Linkedin, Instagram, Twitter, Link as LinkIcon } from 'lucide-react';

const UserPage = () => {
    // State management for builders, current builder, and error handling
    const [builders, setBuilders] = useState([]);
    const [currentBuilder, setCurrentBuilder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Retrieve current builder details from localStorage
        const builderProfile = JSON.parse(localStorage.getItem('builderProfile'));

        if (!builderProfile) {
            // Redirect to login if no builder profile
            window.location.href = '/builder-login';
            return;
        }

        setCurrentBuilder(builderProfile);

        // Fetch all builder profiles
        const fetchBuilderProfiles = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/builders/');

                // Filter out current builder's profile
                const filteredBuilders = response.data.filter(
                    builder => builder.id !== builderProfile.id
                );

                setBuilders(filteredBuilders);
            } catch (err) {
                setError('Unable to fetch builder profiles');
                console.error(err);
            }
        };

        fetchBuilderProfiles();
    }, []);

    // Render social media icon based on URL
    const renderSocialIcon = (url, Icon) => {
        return url ? (
            <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
            >
                <Icon size={20} />
            </a>
        ) : null;
    };

    if (error) {
        return (
            <div className="min-h-screen bg-[#1a1a2e] text-white flex items-center justify-center">
                {error}
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-[#1a1a2e] text-[#e0e0e0] p-8"
        >
            <div className="container mx-auto">
                <h1 className="text-4xl font-light mb-8 text-center text-[#0f3460]">
                    Builders Network
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {builders.map(builder => (
                        <motion.div
                            key={builder.id}
                            whileHover={{ scale: 1.05 }}
                            className="bg-[#16213e] rounded-xl p-6 shadow-lg"
                        >
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-[#e94560]">
                                    {builder.name}
                                </h2>
                                <p className="text-gray-400">{builder.email}</p>
                                <p className="text-gray-500 mt-2">
                                    {builder.city}, {builder.country}
                                </p>
                            </div>

                            {/* Social Links */}
                            <div className="flex space-x-4 mt-4 mb-4">
                                {renderSocialIcon(builder.githubUrl, Github)}
                                {renderSocialIcon(builder.linkedinUrl, Linkedin)}
                                {renderSocialIcon(builder.instagramUrl, Instagram)}
                                {renderSocialIcon(builder.twitterUrl, Twitter)}
                            </div>

                            {/* Top Project Link */}
                            {builder.topProjectLink && (
                                <div className="mt-2">
                                    <a 
                                        href={builder.topProjectLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-[#0f3460] hover:text-[#e94560] flex items-center"
                                    >
                                        <LinkIcon size={16} className="mr-2" />
                                        Top Project
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {builders.length === 0 && (
                    <p className="text-center text-gray-500 mt-16">
                        No other builder profiles to display
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default UserPage;