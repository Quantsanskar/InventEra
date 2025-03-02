"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, User, Home, Users, LogOut, Settings, Bell } from "lucide-react";
import UserProfileModal from "./userprofilemodal";
import SignOutButton from "./signoutbtn";
const ProfileIcon = ({ customPosition, customSize, customData }) => {
    const [showProfile, setShowProfile] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [profileData, setProfileData] = useState({
        email: "user@example.com",
        fisrt_name: "John Doe",
        house: "Phoenix House",
        group: "Creators Guild",
        profileImage: "/placeholder.svg?height=96&width=96",
        notifications: 3,
        ...customData
    });

    // Default positioning class that can be overridden with customPosition prop
    const positionClass = customPosition || "absolute right-2 lg:right-6 bottom-[-20%] lg:bottom-[-25%] z-30";

    // Default size classes that can be overridden with customSize prop
    const sizeClasses = customSize || {
        button: "w-20 h-20 md:w-16 md:h-16 lg:w-24 lg:h-24",
        image: { width: 96, height: 96 }
    };

    useEffect(() => {
        // Only fetch if custom data isn't provided
        if (!customData) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch("/api/user-profile");
                    if (!response.ok) {
                        throw new Error("Failed to fetch user data");
                    }
                    const data = await response.json();
                    setProfileData(data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchUserData();
        }
    }, [customData]);

    const handleViewProfile = () => {
        setShowProfileModal(true);
        setShowProfile(false);
    };

    const handleCloseDropdown = (e) => {
        if (showProfile) {
            setShowProfile(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleCloseDropdown);
        return () => {
            document.removeEventListener("click", handleCloseDropdown);
        };
    }, [showProfile]);

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={positionClass}>
            <div className="relative" onClick={stopPropagation}>
                {/* Avatar with animated ring */}
                <div className="relative">
                    <motion.div
                        className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-400 opacity-75 blur-sm"
                        animate={{
                            rotate: isHovered ? 90 : 0,
                            scale: isHovered ? 1.05 : 1
                        }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowProfile(!showProfile)}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className={`relative ${sizeClasses.button} rounded-full overflow-hidden border-4 border-zinc-900 transition-all duration-300 shadow-xl`}
                    >
                        <Image
                            src={profileData.profileImage || "/placeholder.svg"}
                            alt="Profile"
                            width={sizeClasses.image.width}
                            height={sizeClasses.image.height}
                            className="object-cover flex items-center justify-center w-full h-full"
                        />

                        {/* Notification badge */}
                        {profileData.notifications > 0 && (
                            <motion.div
                                className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg border-2 border-zinc-900"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                            >
                                {profileData.notifications}
                            </motion.div>
                        )}
                    </motion.button>
                </div>

                <AnimatePresence>
                    {showProfile && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-4 w-80 bg-gradient-to-b from-zinc-900 to-zinc-950 backdrop-blur-md rounded-xl border border-zinc-800/50 shadow-2xl overflow-hidden"
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px] pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-transparent to-purple-500/20 opacity-20 pointer-events-none" />

                            {/* Header with glowing border */}
                            <div className="relative p-5">
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-500/30 to-transparent" />

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-700 ring-2 ring-zinc-500/20 shadow-xl">
                                            <Image
                                                src={profileData.profileImage || "/placeholder.svg"}
                                                alt={`${profileData.first_name}'s profile`}
                                                fill
                                                className="object-cover object-center"
                                            />
                                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg text-white truncate">{profileData.first_name}</h3>
                                            <p className="text-sm text-zinc-400 truncate">{profileData.email}</p>

                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-700/50 rounded-full h-8 w-8"
                                        onClick={() => setShowProfile(false)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="p-3 space-y-1">
                                {/* User Info Cards */}
                                <div className="grid grid-cols-2 gap-2 p-2">
                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 hover:from-blue-900/20 hover:to-blue-800/10 border border-zinc-700/50 transition-all duration-200 cursor-pointer"
                                    >
                                        <div className="w-8 h-8 rounded-md bg-blue-900/30 flex items-center justify-center">
                                            <Home className="h-4 w-4 text-blue-400" />
                                        </div>
                                        <span className="text-zinc-300 text-sm">{profileData.house}</span>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 hover:from-purple-900/20 hover:to-purple-800/10 border border-zinc-700/50 transition-all duration-200 cursor-pointer"
                                    >
                                        <div className="w-8 h-8 rounded-md bg-purple-900/30 flex items-center justify-center">
                                            <Users className="h-4 w-4 text-purple-400" />
                                        </div>
                                        <span className="text-zinc-300 text-sm">{profileData.group}</span>
                                    </motion.div>
                                </div>

                                {/* Action Buttons - More prominent with animations */}
                                <div className="px-2 pt-2 space-y-2">
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            variant="outline"
                                            className="w-full bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 hover:from-blue-900/30 hover:to-purple-900/30 text-zinc-300 hover:text-white border-zinc-700/50 hover:border-zinc-600 transition-all duration-300 h-10"
                                            onClick={handleViewProfile}
                                        >
                                            <User className="h-4 w-4 mr-2" />
                                            View Profile
                                        </Button>
                                    </motion.div>

                                    {/* <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            variant="outline"
                                            className="w-full bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 hover:from-indigo-900/30 hover:to-blue-900/30 text-zinc-300 hover:text-white border-zinc-700/50 hover:border-zinc-600 transition-all duration-300 h-10"
                                        >
                                            <Settings className="h-4 w-4 mr-2" />
                                            Settings
                                        </Button>
                                    </motion.div> */}

                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            variant="outline"
                                            className="w-full bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 hover:from-amber-900/30 hover:to-orange-900/30 text-zinc-300 hover:text-white border-zinc-700/50 hover:border-zinc-600 transition-all duration-300 h-10"
                                        >
                                            <Bell className="h-4 w-4 mr-2" />
                                            Notifications
                                            {profileData.notifications > 0 && (
                                                <span className="ml-2 bg-red-500/80 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px]">
                                                    {profileData.notifications}
                                                </span>
                                            )}
                                        </Button>
                                    </motion.div>

                                    <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent my-1" />

                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                            <SignOutButton />
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Footer with subtle gradient */}

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Profile Modal */}
            <UserProfileModal
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
                initialProfileData={profileData}
            />
        </div>
    );
};

export default ProfileIcon;