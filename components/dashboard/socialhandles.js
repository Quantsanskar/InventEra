"use client"

import { useState, useEffect } from "react"
import { X, Instagram, Github, Twitter, Linkedin, Edit2, AlertCircle, Loader2 } from "lucide-react"

const SocialLinksEditor = ({ apiEndpoint }) => {
  const [socialLinks, setSocialLinks] = useState({
    instagram: "",
    github: "",
    twitter: "",
    linkedin: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [inputValues, setInputValues] = useState({
    instagram: "",
    github: "",
    twitter: "",
    linkedin: ""
  });
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userData, setUserData] = useState(null)

  // Function to validate social media URLs
  const validateUrl = (url, platform) => {
    if (!url) return true // Empty is valid

    const patterns = {
      instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/,
      github: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
      twitter: /^(https?:\/\/)?(www\.)?x\.com\/[a-zA-Z0-9_]+\/?$/,
      linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]+\/?$/,
    }

    return patterns[platform].test(url)
  }

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token")
    if (!refreshToken) {
      return false
    }

    try {
      const response = await fetch(`https://builderspace.onrender.com/api/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("access_token", data.access)
        return true
      } else {
        return false
      }
    } catch (err) {
      console.error("Token refresh failed:", err)
      setError("An error occurred while refreshing your session. Please try again.")
      return false
    }
  }

  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = localStorage.getItem("access_token")
      const userInfo = localStorage.getItem("user_info")
      if (!accessToken || !userInfo) {
        await refreshToken()
        if (!refreshToken || !userInfo) {
          setError("You need to sign in to access this page.")
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
          localStorage.removeItem("user_info")
          window.location.href = "/SignInPage/SignIn"
          setIsLoading(false)
          return
        }
      }

      try {
        const response = await fetch(`https://builderspace.onrender.com/api/verify-token/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: accessToken }),
        })

        if (response.ok) {
          // Token is valid
          const user = JSON.parse(userInfo)
          if (!user.is_participant) {
            setError("Access denied. This dashboard is for participants only.")
          } else {
            setUserData(user)
          }
        } else {
          // Token is invalid, try to refresh it
          const refreshed = await refreshToken()
          if (!refreshed) {
            setError("Your session has expired. Please sign in again.")
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            localStorage.removeItem("user_info")
            window.location.href = "/SignInPage/SignIn"
          }
        }
      } catch (err) {
        console.error("Token verification failed:", err)
        setError("An error occurred while verifying your session. Please try again.")
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("user_info")
        window.location.href = "/SignInPage/SignIn"
      } finally {
        setIsLoading(false)
      }
    }

    verifyToken()
  }, [])

  // Fetch social links from the API on component mount
  useEffect(() => {
    const fetchSocialData = async () => {
      setIsLoading(true)
      try {
        const token = localStorage.getItem("access_token")

        if (!token) {
          await refreshToken()
          if (!refreshToken()) {
            window.localStorage.removeItem("access_token")
            window.localStorage.removeItem("refresh_token")
            window.localStorage.removeItem("user_info")
            window.location.href = "/SignInPage/SignIn"
          }
        }

        const response = await fetch(`https://builderspace.onrender.com/api/get-user-details/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        const data = await response.json()

        // Extract social links
        const fetchedSocialLinks = {
          instagram: data.instagram || "",
          github: data.github || "",
          twitter: data.twitter || "",
          linkedin: data.linkedin || "",
        }

        setSocialLinks(fetchedSocialLinks)
        setInputValues(fetchedSocialLinks)
      } catch (err) {
        setError("Failed to load social media data")
        console.error("API fetch error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSocialData()
  }, [apiEndpoint])

  const handleInputChange = (e, platform) => {
    setInputValues({
      ...inputValues,
      [platform]: e.target.value,
    })
  }

  const handleSave = async () => {
    // Validate all URLs
    const isValid = Object.keys(inputValues).every((platform) => validateUrl(inputValues[platform], platform))

    if (!isValid) {
      alert("Please enter valid social media URLs")
      return
    }

    try {
      const token = localStorage.getItem("access_token")

      if (!token) {
        throw new Error("No authentication token found")
      }

      const formData = new FormData()
      formData.append("instagram", inputValues.instagram)
      formData.append("github", inputValues.github)
      formData.append("twitter", inputValues.twitter)
      formData.append("linkedin", inputValues.linkedin)

      const response = await fetch(`https://builderspace.onrender.com/api/update-all-details/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to update social links")
      }

      setSocialLinks({ ...inputValues })
      setIsEditing(false)
    } catch (err) {
      alert("Failed to update social links. Please try again.")
      console.error("API update error:", err)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-zinc-900/70 to-black/80 border border-zinc-800 rounded-xl flex items-center justify-center relative h-64 shadow-lg transition-all duration-500 backdrop-blur-sm overflow-hidden">
        <div className="p-8 text-center space-y-4">
          <Loader2 size={36} className="text-indigo-500 animate-spin mx-auto" />
          <div className="text-zinc-400 font-medium">Loading your social links...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-zinc-900/70 to-black/80 border border-zinc-800 rounded-xl flex items-center justify-center relative h-64 shadow-lg transition-all duration-500">
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
    )
  }
  const SocialIcon = ({ platform, url }) => {
    const icons = {
      instagram: <img src="/icons/dashboard/socialhandles/Instagram.png" alt="Instagram" className="w-10 h-10" />,
      github: <img src="/icons/dashboard/socialhandles/GitHub.png" alt="GitHub" className="w-10 h-10" />,
      twitter: <img src="/icons/dashboard/socialhandles/X.png" alt="X" className="w-10 h-10" />,
      linkedin: <img src="/icons/dashboard/socialhandles/LinkedIn.png" alt="LinkedIn" className="w-12 h-10" />,
    };
 
    return (
      <div className="cursor-pointer p-3 bg-[#0B090A] rounded-lg hover:opacity-80 transition duration-300"
        onClick={() => window.location.href = url}>
        {icons[platform]}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-[#0B090A] border border-white/50 rounded-xl shadow-md w-[527px]">
        <div className="flex justify-center text-center mb-4">
          <h2 className="text-lg font-normal text-zinc-400 underline">Your Social Handles</h2>
        </div>

        {/* Centered Icons with Better Spacing */}
        <div className="flex justify-center -gap-2 lg:gap-1">
          <SocialIcon platform="instagram" url={socialLinks.instagram} />
          <SocialIcon platform="github" url={socialLinks.github} />
          <SocialIcon platform="twitter" url={socialLinks.twitter} />
          <SocialIcon platform="linkedin" url={socialLinks.linkedin} />
        </div>
      </div>


      {/* Edit Button */}
      <button
        className="absolute bottom-[-2%] right-[-1%] w-10 h-10 bg-[#0B090A] border border-white/50 rounded-full shadow-md rounded-full flex items-center justify-center z-20"
        aria-label="Edit social links"
        onClick={() => setIsEditing(true)}
      >
        <Edit2 size={16} className="text-white" />
      </button>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-zinc-100">Edit Social Profiles</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-zinc-400 hover:text-zinc-100 rounded-full h-8 w-8 flex items-center justify-center hover:bg-zinc-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Instagram */}
              <div>
                <label className="flex items-center text-sm font-medium text-zinc-300 mb-2">
                  <Instagram size={16} className="text-pink-500 mr-2" />
                  Instagram Profile URL
                </label>
                <input
                  type="text"
                  value={inputValues.instagram}
                  onChange={(e) => handleInputChange(e, "instagram")}
                  className="w-full bg-zinc-800/80 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  placeholder="https://instagram.com/username"
                />
              </div>

              {/* GitHub */}
              <div>
                <label className="flex items-center text-sm font-medium text-zinc-300 mb-2">
                  <Github size={16} className="text-zinc-300 mr-2" />
                  GitHub Profile URL
                </label>
                <input
                  type="text"
                  value={inputValues.github}
                  onChange={(e) => handleInputChange(e, "github")}
                  className="w-full bg-zinc-800/80 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  placeholder="https://github.com/username"
                />
              </div>

              {/* Twitter */}
              <div>
                <label className="flex items-center text-sm font-medium text-zinc-300 mb-2">
                  <img src="/icons/dashboard/socialhandles/X.png" alt="X" className="w-6 h-6 mr-2" />
                  X Profile URL
                </label>
                <input
                  type="text"
                  value={inputValues.twitter}
                  onChange={(e) => handleInputChange(e, "twitter")}
                  className="w-full bg-zinc-800/80 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  placeholder="https://x.com/username"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="flex items-center text-sm font-medium text-zinc-300 mb-2">
                  <Linkedin size={16} className="text-blue-600 mr-2" />
                  LinkedIn Profile URL
                </label>
                <input
                  type="text"
                  value={inputValues.linkedin}
                  onChange={(e) => handleInputChange(e, "linkedin")}
                  className="w-full bg-zinc-800/80 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
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
                  className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-lg"
                >
                  Save Links
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SocialLinksEditor

