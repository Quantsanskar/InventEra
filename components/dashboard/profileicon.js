"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, User, Home, Users, Bell, Github, Twitter, Instagram, Linkedin, Video } from "lucide-react"

const API_BASE_URL = "https://builderspace.onrender.com/api"
// const API_BASE_URL = "http://127.0.0.1:8000/api"

const ProfileIcon = ({ customPosition, customSize }) => {
  const [showProfile, setShowProfile] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [profileData, setProfileData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    house: "",
    about: "",
    designation: "",
    profileImage: "/placeholder.svg", // Default image that will be used regardless
    notifications: 0,
    project: {
      project_idea_title: "",
      project_idea_description: "",
      project_experience: "",
      project_video_link: "",
    },
    social_links: {
      instagram: "",
      github: "",
      twitter: "",
      linkedin: "",
    }
  })

  // Default profile image path - this will always be used
  const DEFAULT_PROFILE_IMAGE = "/images/profile.png"

  const positionClass = customPosition || "absolute right-2 lg:right-6 bottom-[-20%] lg:bottom-[-25%] z-30"
  const sizeClasses = customSize || {
    button: "w-20 h-20 md:w-16 md:h-16 lg:w-24 lg:h-24",
    image: { width: 96, height: 96 },
  }

  // Fetch user data function
  const verifyToken = async () => {
    const accessToken = localStorage.getItem("access_token")
    try {
      const response = await fetch(`${API_BASE_URL}/verify-token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: accessToken }),
      });

      if (!response.ok) {
        throw new Error("Invalid token");
      }

      if (response.ok) {
        const userInfo = JSON.parse(localStorage.getItem("user_info") || "{}")
      } else {
        await refreshToken()
      }
    } catch (err) {
      // localStorage.removeItem("access_token")
      // localStorage.removeItem("refresh_token")
      // localStorage.removeItem("user_info")
    }
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token")
    if (!refreshToken) return false

    try {
      const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      })
      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("access_token", data.access)
        const userInfo = JSON.parse(localStorage.getItem("user_info") || "{}")
        return true
      } else {
        return false
      }
    } catch (err) {
      // localStorage.removeItem("access_token")
      // localStorage.removeItem("refresh_token")
      // localStorage.removeItem("user_info")
      return false
    }
  }

  const fetchUserData = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("access_token");

      // Fetch user data
      const response = await fetch(`${API_BASE_URL}/get-user-details/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }

      const data = await response.json();
      // console.log("API Response Data:", data);

      setProfileData({
        email: data.email || "",
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        house: data.house || "",
        about: data.about || "",
        designation: data.designation || "",
        profileImage: DEFAULT_PROFILE_IMAGE, // Always use default image regardless of backend data
        notifications: data.unread_notifications || 0,
        project: {
          project_idea_title: data.project_idea_title || "",
          project_idea_description: data.project_idea_description || "",
          project_experience: data.project_experience || "",
          project_video_link: data.project_video_link || "",
        },
        social_links: {
          instagram: data.instagram || "",
          github: data.github || "",
          twitter: data.twitter || "",
          linkedin: data.linkedin || "",
        },
      });

      setError(null);
    } catch (error) {
      console.error("Fetch user data error:", error);
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData() // Always fetch from API
  }, [showProfileModal]) // Refresh when modal closes

  const handleUpdateProfile = async (formData) => {
    try {
      const token = localStorage.getItem("access_token")

      if (!token) {
        throw new Error("No authentication token found")
      }

      // Remove profile_picture from formData if it exists
      // This ensures profile image is never sent to backend
      if (formData.has("profile_picture")) {
        formData.delete("profile_picture")
      }

      const response = await fetch(`${API_BASE_URL}/update-all-details/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Update failed: ${response.status}`)
      }

      const responseData = await response.json()

      // Refresh user data after successful update
      await fetchUserData()

      return true
    } catch (error) {
      console.error("Profile update error:", error)
      return false
    }
  }

  const handleViewProfile = () => {
    setShowProfileModal(true)
    setShowProfile(false)
  }

  const handleCloseDropdown = (e) => {
    if (showProfile && !e.target.closest('[data-dropdown="profile"]')) {
      setShowProfile(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleCloseDropdown)
    return () => document.removeEventListener("click", handleCloseDropdown)
  }, [showProfile])

  const stopPropagation = (e) => e.stopPropagation()

  const handleSubmitProfile = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    // Get form values
    const firstName = e.target.first_name.value
    const lastName = e.target.last_name.value
    const about = e.target.about.value
    const designation = e.target.designation.value
    const projectTitle = e.target.project_title.value
    const projectDescription = e.target.project_description.value
    const projectExperience = e.target.project_experience.value
    const projectVideoLink = e.target.project_video.value
    const instagram = e.target.instagram.value
    const github = e.target.github.value
    const twitter = e.target.twitter.value
    const linkedin = e.target.linkedin.value

    // Add all fields to formData
    formData.append("first_name", firstName)
    formData.append("last_name", lastName)
    formData.append("about", about)
    formData.append("designation", designation)
    formData.append("project_idea_title", projectTitle)
    formData.append("project_idea_description", projectDescription)
    formData.append("project_experience", projectExperience)
    formData.append("project_video_link", projectVideoLink)
    formData.append("instagram", instagram)
    formData.append("github", github)
    formData.append("twitter", twitter)
    formData.append("linkedin", linkedin)

    // No profile image is added to formData

    const success = await handleUpdateProfile(formData)

    if (success) {
      setShowProfileModal(false)
    }
  }

  // Sign out handler
  const handleSignOut = async () => {
    try {
      // Get the access token from localStorage
      const token = localStorage.getItem("access_token")

      if (token) {
        // Call the blacklist API to invalidate the token
        const response = await fetch("https://builderspace.onrender.com/api/token/blacklist/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            refresh: localStorage.getItem("refresh_token")
          })
        })

        // Even if the API call fails, we still want to clear local storage
        if (!response.ok) {
          console.error("Error blacklisting token:", await response.text())
        }
      }
    } catch (error) {
      console.error("Error during sign out:", error)
    } finally {
      // Clear localStorage
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("user_info")
      window.location.href = "/SignInPage/SignIn"
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className={positionClass}>
        <div className={`${sizeClasses.button} rounded-full bg-zinc-800/50 animate-pulse flex items-center justify-center`}>
          <div className="w-8 h-8 rounded-full border-2 border-zinc-700 border-t-zinc-300 animate-spin"></div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className={positionClass}>
        <div className={`${sizeClasses.button} rounded-full bg-red-900/20 border border-red-700/50 flex items-center justify-center`}>
          <span className="text-xs text-red-400">Error</span>
        </div>
      </div>
    )
  }

  return (
    <div className={positionClass}>
      {/* Profile Button */}
      <div className="relative" onClick={stopPropagation} data-dropdown="profile">
        <div className="relative">
          <motion.div
            className="absolute rounded-full"
            animate={{
              rotate: isHovered ? 90 : 0,
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowProfile(!showProfile)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                  relative 
                  ${sizeClasses.button} 
                  rounded-full 
                  overflow-hidden 
                  bg-zinc-800
                  shadow-lg
                  transition-all 
                  duration-300 
                  transform
                  hover:scale-110
                  hover:border-indigo-300
                  hover:ring-4
                  hover:ring-indigo-200
                  hover:ring-opacity-50
                  active:scale-95
                  ${isHovered ? 'ring-4 ring-indigo-300 ring-opacity-70' : 'ring-4 ring-indigo-300 ring-opacity-40'}
                `}
          >
            <Image
              src={DEFAULT_PROFILE_IMAGE}
              alt="Profile"
              width={sizeClasses.image.width}
              height={sizeClasses.image.height}
              className="object-cover flex items-center justify-center w-full h-full"
            />

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

        {/* Profile Dropdown */}
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
              data-dropdown="profile"
            >
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-transparent to-purple-500/20 opacity-20 pointer-events-none" />

              <div className="relative p-5">
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-500/30 to-transparent" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-700 ring-2 ring-zinc-500/20 shadow-xl">
                      <Image
                        src={DEFAULT_PROFILE_IMAGE}
                        alt="Profile"
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-white truncate">
                        {profileData.first_name} {profileData.last_name}
                      </h3>
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
                <div className="grid grid-cols-2 gap-2 p-2">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 hover:from-blue-900/20 hover:to-blue-800/10 border border-zinc-700/50 transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-md bg-blue-900/30 flex items-center justify-center">
                      <Home className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-zinc-300 text-sm">{profileData.house || "No House"}</span>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 hover:from-purple-900/20 hover:to-purple-800/10 border border-zinc-700/50 transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-md bg-purple-900/30 flex items-center justify-center">
                      <Users className="h-4 w-4 text-purple-400" />
                    </div>
                    <span className="text-zinc-300 text-sm">Participant</span>
                  </motion.div>
                </div>

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
                  </motion.div> */}

                  <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent my-1" />

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className="w-full bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 hover:from-red-900/30 hover:to-rose-900/30 text-zinc-300 hover:text-white border-zinc-700/50 hover:border-zinc-600 transition-all duration-300 h-10"
                      onClick={handleSignOut}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Profile Modal (integrated directly in this component) */}
      <AnimatePresence>
        {showProfileModal && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 z-10 bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Edit Profile</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white rounded-full"
                  onClick={() => setShowProfileModal(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmitProfile}>
                <div className="p-6 space-y-6">
                  {/* Profile Picture - Display only, no upload option */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-800">
                      <Image
                        src={DEFAULT_PROFILE_IMAGE}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-zinc-400 text-sm">{profileData.first_name + " " + profileData.last_name}</p>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="first_name" className="block text-sm font-medium text-zinc-400 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        defaultValue={profileData.first_name}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="last_name" className="block text-sm font-medium text-zinc-400 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        defaultValue={profileData.last_name}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  {/* About & Designation */}
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="designation" className="block text-sm font-medium text-zinc-400 mb-1">
                        Designation
                      </label>
                      <input
                        type="text"
                        id="designation"
                        name="designation"
                        defaultValue={profileData.designation}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="about" className="block text-sm font-medium text-zinc-400 mb-1">
                        About
                      </label>
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        defaultValue={profileData.about}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="border-t border-zinc-800 pt-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Project Details</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="project_title" className="block text-sm font-medium text-zinc-400 mb-1">
                          Project Title
                        </label>
                        <input
                          type="text"
                          id="project_title"
                          name="project_title"
                          defaultValue={profileData.project?.project_idea_title}
                          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="project_description" className="block text-sm font-medium text-zinc-400 mb-1">
                          Project Description
                        </label>
                        <textarea
                          id="project_description"
                          name="project_description"
                          rows={3}
                          defaultValue={profileData.project?.project_idea_description}
                          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="project_experience" className="block text-sm font-medium text-zinc-400 mb-1">
                          Project Experience
                        </label>
                        <textarea
                          id="project_experience"
                          name="project_experience"
                          rows={3}
                          defaultValue={profileData.project?.project_experience}
                          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="project_video" className="block text-sm font-medium text-zinc-400 mb-1">
                          <div className="flex items-center gap-1">
                            <Video className="h-4 w-4" />
                            <span>Project Video Link</span>
                          </div>
                        </label>
                        <input
                          type="text"
                          id="project_video"
                          name="project_video"
                          defaultValue={profileData.project?.project_video_link}
                          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="border-t border-zinc-800 pt-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="github" className="block text-sm font-medium text-zinc-400 mb-1">
                          <div className="flex items-center gap-1">
                            <Github className="h-4 w-4" />
                            <span>GitHub</span>
                          </div>
                        </label>
                        <input
                          type="text"
                          id="github"
                          name="github"
                          defaultValue={profileData.social_links?.github}
                          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="linkedin" className="block text-sm font-medium text-zinc-400 mb-1">
                          <div className="flex items-center gap-1">
                            <Linkedin className="h-4 w-4" />
                            <span>LinkedIn</span>
                          </div>
                        </label>
                        <input
                          type="text"
                          id="linkedin"
                          name="linkedin"
                          defaultValue={profileData.social_links?.linkedin}
                          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="twitter" className="block text-sm font-medium text-zinc-400 mb-1">
                          <div className="flex items-center gap-1">
                            <Twitter className="h-4 w-4" />
                            <span>Twitter</span>
                          </div>
                        </label>
                        <input
                          type="text"
                          id="twitter"
                          name="twitter"
                          defaultValue={profileData.social_links?.twitter}
                          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="instagram" className="block text-sm font-medium text-zinc-400 mb-1">
                          <div className="flex items-center gap-1">
                            <Instagram className="h-4 w-4" />
                            <span>Instagram</span>
                          </div>
                        </label>
                        <input
                          type="text"
                          id="instagram"
                          name="instagram"
                          defaultValue={profileData.social_links?.instagram}
                          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-zinc-900 border-t border-zinc-800 p-4 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-zinc-700 text-zinc-300"
                    onClick={() => setShowProfileModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Save Changes
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfileIcon