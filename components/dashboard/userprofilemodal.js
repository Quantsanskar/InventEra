"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Edit, Save } from "lucide-react";

// Custom Button Component
const CustomButton = ({
    children,
    variant = "default",
    size = "default",
    className = "",
    disabled = false,
    onClick,
    ...props
}) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variantClasses = {
        default: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
        outline: "border border-zinc-700 bg-transparent text-zinc-100 hover:bg-zinc-800/50",
        ghost: "bg-transparent hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-100"
    };

    const sizeClasses = {
        default: "h-10 py-2 px-4",
        sm: "h-8 py-1 px-3 text-sm",
        lg: "h-12 py-3 px-6 text-lg",
        icon: "h-10 w-10"
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

// Custom Input Component
const CustomInput = ({
    className = "",
    type = "text",
    disabled = false,
    placeholder = "",
    value,
    onChange,
    name,
    ...props
}) => {
    return (
        <input
            type={type}
            className={`flex w-full h-10 rounded-md border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            {...props}
        />
    );
};

// Custom Textarea Component
const CustomTextarea = ({
    className = "",
    disabled = false,
    placeholder = "",
    value,
    onChange,
    name,
    ...props
}) => {
    return (
        <textarea
            className={`flex w-full min-h-[80px] rounded-md border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y ${className}`}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            {...props}
        />
    );
};

const UserProfileModal = ({ isOpen, onClose, initialProfileData }) => {
    const [profileData, setProfileData] = useState({
        displayName: "",
        email: "",
        phone: "",
        about: "",
        house: "",
        password: "",
        designation: "",
        projectIdea: "",
        projectExperience: "",
        videoReel: "",
        // Replace single socialLinks with individual platform links
        instagram: "",
        twitter: "",
        linkedin: "",
        github: ""
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialProfileData) {
            // Handle the case where we're migrating from the old format
            const updatedData = { ...initialProfileData };

            // If we have the old socialLinks format, try to parse it
            if (initialProfileData.socialLinks && typeof initialProfileData.socialLinks === 'string') {
                const links = initialProfileData.socialLinks.split(',').map(link => link.trim());

                // Simple detection based on domain names
                links.forEach(link => {
                    if (link.includes('instagram.com')) updatedData.instagram = link;
                    else if (link.includes('twitter.com') || link.includes('x.com')) updatedData.twitter = link;
                    else if (link.includes('linkedin.com')) updatedData.linkedin = link;
                    else if (link.includes('github.com')) updatedData.github = link;
                });

                // Delete the old property as we've migrated it
                delete updatedData.socialLinks;
            }

            setProfileData(updatedData);
        } else {
            const fetchUserData = async () => {
                try {
                    setLoading(true);
                    const response = await fetch("/api/user-profile");
                    if (!response.ok) {
                        throw new Error("Failed to fetch user data");
                    }
                    const data = await response.json();

                    // Same migration logic for fetched data
                    if (data.socialLinks && typeof data.socialLinks === 'string') {
                        const links = data.socialLinks.split(',').map(link => link.trim());

                        links.forEach(link => {
                            if (link.includes('instagram.com')) data.instagram = link;
                            else if (link.includes('twitter.com') || link.includes('x.com')) data.twitter = link;
                            else if (link.includes('linkedin.com')) data.linkedin = link;
                            else if (link.includes('github.com')) data.github = link;
                        });

                        delete data.socialLinks;
                    }

                    setProfileData(data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserData();
        }
    }, [initialProfileData]);

    const handleSaveChanges = async () => {
        try {
            setLoading(true);

            // Convert to the format the API expects
            const dataToSend = { ...profileData };

            // If the API still expects socialLinks, reconstruct it
            // (Comment this out if the API has been updated to accept individual fields)
            /*
            const socialLinks = [
                profileData.instagram,
                profileData.twitter,
                profileData.linkedin,
                profileData.github
            ].filter(Boolean).join(', ');
            
            dataToSend.socialLinks = socialLinks;
            */

            const response = await fetch("/api/user-profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // List of non-editable fields
    const nonEditableFields = ["displayName", "email", "phone", "house", "password"];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 px-6 py-4 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-700 ring-2 ring-zinc-500/20">
                                    <Image
                                        src={profileData.profileImage || "/placeholder.svg?height=96&width=96"}
                                        alt="Profile"
                                        layout="fill"
                                        objectFit="cover"
                                        priority
                                        className="object-center"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">{profileData.displayName}</h2>
                                    <p className="text-zinc-400">{profileData.designation || "Participant"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {isEditing ? (
                                    <CustomButton
                                        variant="outline"
                                        className="bg-emerald-900/50 hover:bg-emerald-800/80 text-emerald-100 border-emerald-700 transition-colors"
                                        onClick={handleSaveChanges}
                                        disabled={loading}
                                    >
                                        <Save className="h-4 w-4 mr-2" />
                                        Save
                                    </CustomButton>
                                ) : (
                                    <CustomButton
                                        variant="outline"
                                        className="bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white border-zinc-700 transition-colors"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </CustomButton>
                                )}
                                <CustomButton
                                    variant="ghost"
                                    size="icon"
                                    className="text-zinc-400 hover:text-white h-10 w-10 p-0 flex items-center justify-center"
                                    onClick={onClose}
                                >
                                    <X className="h-5 w-5" />
                                </CustomButton>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-8">
                            {loading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="w-8 h-8 border-4 border-zinc-700 border-t-zinc-300 rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <>
                                    {/* Basic Information */}
                                    <section>
                                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                            <span className="w-8 h-8 rounded-md bg-zinc-800/80 flex items-center justify-center mr-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-4 h-4 text-zinc-400"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                            Basic Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm text-zinc-400">Full Name</label>
                                                <CustomInput
                                                    name="displayName"
                                                    value={profileData.displayName}
                                                    onChange={handleChange}
                                                    className="bg-zinc-800/50 border-zinc-700 text-zinc-300"
                                                    disabled={true} // Always non-editable
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm text-zinc-400">Email</label>
                                                <CustomInput
                                                    name="email"
                                                    value={profileData.email}
                                                    onChange={handleChange}
                                                    className="bg-zinc-800/50 border-zinc-700 text-zinc-300"
                                                    disabled={true} // Always non-editable
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm text-zinc-400">Phone Number</label>
                                                <CustomInput
                                                    name="phone"
                                                    value={profileData.phone}
                                                    onChange={handleChange}
                                                    className="bg-zinc-800/50 border-zinc-700 text-zinc-300"
                                                    disabled={true} // Always non-editable
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm text-zinc-400">Designation/Tagline</label>
                                                <CustomInput
                                                    name="designation"
                                                    value={profileData.designation}
                                                    onChange={handleChange}
                                                    className="bg-zinc-800/50 border-zinc-700 text-zinc-300"
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    {/* About */}
                                    <section>
                                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                            <span className="w-8 h-8 rounded-md bg-zinc-800/80 flex items-center justify-center mr-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-4 h-4 text-zinc-400"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                            About
                                        </h3>
                                        <div className="space-y-2">
                                            <CustomTextarea
                                                name="about"
                                                value={profileData.about}
                                                onChange={handleChange}
                                                className="min-h-[120px]"
                                                placeholder="Tell us about yourself..."
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </section>

                                    {/* Event Details */}
                                    <section>
                                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                            <span className="w-8 h-8 rounded-md bg-zinc-800/80 flex items-center justify-center mr-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-4 h-4 text-zinc-400"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                            Event Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm text-zinc-400">Selected House/Theme</label>
                                                <CustomInput
                                                    name="house"
                                                    value={profileData.house}
                                                    onChange={handleChange}
                                                    className="bg-zinc-800/50 border-zinc-700 text-zinc-300"
                                                    disabled={true} // Always non-editable
                                                />
                                            </div>
                                            <div className="space-y-4 md:col-span-2">
                                                <label className="text-sm text-zinc-400">Project Idea</label>
                                                <CustomTextarea
                                                    name="projectIdea"
                                                    value={profileData.projectIdea}
                                                    onChange={handleChange}
                                                    className="min-h-[100px]"
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div className="space-y-4 md:col-span-2">
                                                <label className="text-sm text-zinc-400">Previous Project Experience</label>
                                                <CustomTextarea
                                                    name="projectExperience"
                                                    value={profileData.projectExperience}
                                                    onChange={handleChange}
                                                    className="min-h-[100px]"
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    {/* Social Media Links (Updated) */}
                                    <section>
                                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                            <span className="w-8 h-8 rounded-md bg-zinc-800/80 flex items-center justify-center mr-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-4 h-4 text-zinc-400"
                                                >
                                                    <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
                                                </svg>
                                            </span>
                                            Social Media
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm text-zinc-400">Instagram</label>
                                                <CustomInput
                                                    name="instagram"
                                                    value={profileData.instagram}
                                                    onChange={handleChange}
                                                    placeholder="https://instagram.com/username"
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm text-zinc-400">Twitter</label>
                                                <CustomInput
                                                    name="twitter"
                                                    value={profileData.twitter}
                                                    onChange={handleChange}
                                                    placeholder="https://twitter.com/username"
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm text-zinc-400">LinkedIn</label>
                                                <CustomInput
                                                    name="linkedin"
                                                    value={profileData.linkedin}
                                                    onChange={handleChange}
                                                    placeholder="https://linkedin.com/in/username"
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm text-zinc-400">GitHub</label>
                                                <CustomInput
                                                    name="github"
                                                    value={profileData.github}
                                                    onChange={handleChange}
                                                    placeholder="https://github.com/username"
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    {/* Additional Information */}
                                    <section>
                                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                            <span className="w-8 h-8 rounded-md bg-zinc-800/80 flex items-center justify-center mr-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-4 h-4 text-zinc-400"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M8.478 1.6a.75.75 0 01.273 1.025 3.72 3.72 0 00-.425 1.122c.058.057.118.114.18.168A4.491 4.491 0 0112 2.25c1.413 0 2.673.651 3.497 1.668.06-.054.12-.11.178-.167a3.717 3.717 0 00-.426-1.126.75.75 0 111.298-.75 5.22 5.22 0 01.671 2.045.75.75 0 01-.187.582c-.241.27-.505.52-.787.754a4.495 4.495 0 01.216 1.366 4.29 4.29 0 01-.268 1.46 6.82 6.82 0 013.732 5.093.75.75 0 01-.677.813 33.32 33.32 0 01-2.915.19l-.4.023a6.389 6.389 0 01-1.819 2.766c.253.293.47.594.648.903a.75.75 0 01-.612 1.17 5.655 5.655 0 01-1.149.12 7.559 7.559 0 01-5.113-1.988A7.554 7.554 0 014.277 20.6a5.655 5.655 0 01-1.15-.12.75.75 0 01-.61-1.17 4.5 4.5 0 01.647-.903 6.39 6.39 0 01-1.819-2.766l-.4-.023a33.32 33.32 0 01-2.915-.19.75.75 0 01-.677-.813 6.82 6.82 0 013.732-5.104 4.284 4.284 0 01-.268-1.448 4.48 4.48 0 01.216-1.366 7.01 7.01 0 01-.787-.756.75.75 0 01-.187-.57 5.22 5.22 0 01.67-2.04.75.75 0 011.026-.273z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                            Additional Information
                                        </h3>
                                        <div className="space-y-2">
                                            <label className="text-sm text-zinc-400">Video Reel Link</label>
                                            <CustomInput
                                                name="videoReel"
                                                value={profileData.videoReel}
                                                onChange={handleChange}
                                                placeholder="Youtube link to your video reel"
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </section>
                                </>
                            )}
                        </div>



                        {/* Footer */}
                        <div className="sticky bottom-0 px-6 py-4 bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-800 flex justify-between items-center">
                            <div className="text-sm text-zinc-500">
                                <span className="inline-flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
                                    Nights Season 1 • Participant
                                </span>
                            </div>
                            {isEditing && (
                                <div className="flex gap-2">
                                    <CustomButton
                                        variant="ghost"
                                        className="text-zinc-400 hover:text-white"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </CustomButton>
                                    <CustomButton
                                        variant="outline"
                                        className="bg-emerald-900/50 hover:bg-emerald-800/80 text-emerald-100 border-emerald-700 transition-colors"
                                        onClick={handleSaveChanges}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <div className="w-4 h-4 border-2 border-zinc-700 border-t-zinc-300 rounded-full animate-spin mr-2"></div>
                                        ) : (
                                            <Save className="h-4 w-4 mr-2" />
                                        )}
                                        Save Changes
                                    </CustomButton>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default UserProfileModal;