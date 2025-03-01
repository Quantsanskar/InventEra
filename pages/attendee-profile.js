"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserIcon, MailIcon, PhoneIcon, LogOutIcon, HeartIcon, VoteIcon, HomeIcon } from "lucide-react"

const AttendeeProfile = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [attendeeData, setAttendeeData] = useState(null)
    const [votes, setVotes] = useState([])
    const [likes, setLikes] = useState([])
    const [activeTab, setActiveTab] = useState("profile")

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("access_token")
            const userInfo = localStorage.getItem("user_info")

            if (!token || !userInfo) {
                router.push("/SignInPage/SignIn")
                return false
            }

            const user = JSON.parse(userInfo)
            if (!user.is_attendee) {
                router.push("/SignInPage/SignIn")
                return false
            }

            return true
        }

        const loadAttendeeData = () => {
            if (!checkAuth()) return

            setLoading(true)
            try {
                const userInfo = JSON.parse(localStorage.getItem("user_info"))

                setAttendeeData({
                    email: userInfo.email,
                    first_name: userInfo.first_name,
                    last_name: userInfo.last_name || "",
                    mobile_number: userInfo.mobile_number || "",
                    joined_date: userInfo.date_joined
                        ? new Date(userInfo.date_joined).toLocaleDateString()
                        : new Date().toLocaleDateString(),
                })

                // Simulated votes and likes data (you may want to store this in localStorage as well)
                setVotes([
                    { project_title: "Project A", participant_name: "John Doe", timestamp: "2023-05-15" },
                    { project_title: "Project B", participant_name: "Jane Smith", timestamp: "2023-05-20" },
                ])
                setLikes([
                    { project_title: "Project C", participant_name: "Alice Johnson", timestamp: "2023-05-18" },
                    { project_title: "Project D", participant_name: "Bob Williams", timestamp: "2023-05-22" },
                ])
            } catch (err) {
                console.error("Error loading attendee data:", err)
                setError("Failed to load your profile data. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        loadAttendeeData()
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("user_info")
        router.push("/SignInPage/SignIn")
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 },
        },
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-500 rounded-full animate-spin"></div>
                    <p className="mt-4 text-indigo-400 text-xl">Loading your profile...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-black">
            {/* Animated background with gradient elements */}
            <div className="absolute inset-0 bg-[url('/images/signupgradient.png')] bg-cover bg-center opacity-40"></div>
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-700/10 rounded-full filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 -right-20 w-80 h-80 bg-blue-700/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-40 right-20 w-80 h-80 bg-indigo-700/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

            {/* Main content */}
            <div className="relative z-10 container mx-auto px-4 py-8">
                {error && (
                    <Alert variant="destructive" className="mb-6 bg-red-900/30 border border-red-700">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-between items-center mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600 mb-4 md:mb-0">
                        ATTENDEE DASHBOARD
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-2 bg-black/40 border-2 border-red-600 rounded-full text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all duration-300"
                    >
                        <LogOutIcon size={18} />
                        <span>Logout</span>
                    </button>
                </motion.div>

                {/* Navigation Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center mb-8"
                >
                    <div className="bg-black/50 backdrop-blur-sm border border-[#495057] rounded-full p-1 flex">
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 ${activeTab === "profile"
                                    ? "bg-gradient-to-r from-indigo-600/80 to-purple-600/80 text-white"
                                    : "text-gray-400 hover:text-gray-200"
                                }`}
                        >
                            <UserIcon size={18} />
                            <span className="hidden sm:inline">Profile</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("activity")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 ${activeTab === "activity"
                                    ? "bg-gradient-to-r from-indigo-600/80 to-purple-600/80 text-white"
                                    : "text-gray-400 hover:text-gray-200"
                                }`}
                        >
                            <HeartIcon size={18} />
                            <span className="hidden sm:inline">Activity</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("about")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 ${activeTab === "about"
                                    ? "bg-gradient-to-r from-indigo-600/80 to-purple-600/80 text-white"
                                    : "text-gray-400 hover:text-gray-200"
                                }`}
                        >
                            <HomeIcon size={18} />
                            <span className="hidden sm:inline">About</span>
                        </button>
                    </div>
                </motion.div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Tab */}
                    {activeTab === "profile" && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="col-span-1 lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >
                            {/* Profile Card */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-black/80 border border-[#495057] rounded-[24px] p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(162,210,255,0.15)] col-span-1"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold mb-4">
                                        {attendeeData?.first_name?.charAt(0) || ""}
                                        {attendeeData?.last_name?.charAt(0) || ""}
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-1">
                                        {attendeeData?.first_name} {attendeeData?.last_name}
                                    </h2>
                                    <p className="text-indigo-400 mb-6">Attendee</p>

                                    <div className="w-full space-y-4">
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <MailIcon size={18} className="text-indigo-400" />
                                            <span>{attendeeData?.email}</span>
                                        </div>
                                        {attendeeData?.mobile_number && (
                                            <div className="flex items-center gap-3 text-gray-300">
                                                <PhoneIcon size={18} className="text-indigo-400" />
                                                <span>{attendeeData?.mobile_number}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <UserIcon size={18} className="text-indigo-400" />
                                            <span>Joined on {attendeeData?.joined_date}</span>
                                        </div>
                                        <p className="text-sm text-gray-400 mt-4">
                                            Note: Some data may be simulated for demonstration purposes.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Stats Card */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-black/80 border border-[#495057] rounded-[24px] p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(162,210,255,0.15)] col-span-1 lg:col-span-2"
                            >
                                <h3 className="text-xl font-bold text-white mb-6">Your BuilderSpace Stats</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-indigo-900/20 border border-indigo-800/30 rounded-2xl p-6">
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="p-3 bg-indigo-600/20 rounded-full">
                                                <VoteIcon size={24} className="text-indigo-400" />
                                            </div>
                                            <h4 className="text-lg font-medium text-white">Votes Cast</h4>
                                        </div>
                                        <p className="text-4xl font-bold text-indigo-400">{votes.length}</p>
                                        <p className="text-gray-400 mt-2">Projects you've voted for</p>
                                    </div>

                                    <div className="bg-purple-900/20 border border-purple-800/30 rounded-2xl p-6">
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="p-3 bg-purple-600/20 rounded-full">
                                                <HeartIcon size={24} className="text-purple-400" />
                                            </div>
                                            <h4 className="text-lg font-medium text-white">Likes Given</h4>
                                        </div>
                                        <p className="text-4xl font-bold text-purple-400">{likes.length}</p>
                                        <p className="text-gray-400 mt-2">Projects you've liked</p>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl border border-indigo-800/30">
                                    <p className="text-gray-300">
                                        Thank you for being part of BuilderSpace! Your engagement helps our community thrive.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Activity Tab */}
                    {activeTab === "activity" && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="col-span-1 lg:col-span-3"
                        >
                            <motion.div
                                variants={itemVariants}
                                className="bg-black/80 border border-[#495057] rounded-[24px] p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(162,210,255,0.15)]"
                            >
                                <h3 className="text-xl font-bold text-white mb-6">Your Activity</h3>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Votes Section */}
                                    <div>
                                        <h4 className="flex items-center gap-2 text-lg font-medium text-white mb-4">
                                            <VoteIcon size={20} className="text-indigo-400" />
                                            <span>Your Votes</span>
                                        </h4>

                                        {votes.length > 0 ? (
                                            <div className="space-y-4">
                                                {votes.map((vote, index) => (
                                                    <div key={index} className="bg-indigo-900/20 border border-indigo-800/30 rounded-xl p-4">
                                                        <h5 className="font-medium text-white">{vote.project_title || "Project"}</h5>
                                                        <p className="text-gray-400 text-sm">
                                                            {vote.participant_name || "Participant"} •{" "}
                                                            {vote.timestamp ? new Date(vote.timestamp).toLocaleDateString() : "Recently"}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="bg-indigo-900/10 border border-indigo-800/20 rounded-xl p-6 text-center">
                                                <p className="text-gray-400">You haven't voted for any projects yet.</p>
                                                <p className="text-indigo-400 mt-2">Explore projects and cast your vote!</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Likes Section */}
                                    <div>
                                        <h4 className="flex items-center gap-2 text-lg font-medium text-white mb-4">
                                            <HeartIcon size={20} className="text-purple-400" />
                                            <span>Your Likes</span>
                                        </h4>

                                        {likes.length > 0 ? (
                                            <div className="space-y-4">
                                                {likes.map((like, index) => (
                                                    <div key={index} className="bg-purple-900/20 border border-purple-800/30 rounded-xl p-4">
                                                        <h5 className="font-medium text-white">{like.project_title || "Project"}</h5>
                                                        <p className="text-gray-400 text-sm">
                                                            {like.participant_name || "Participant"} •{" "}
                                                            {like.timestamp ? new Date(like.timestamp).toLocaleDateString() : "Recently"}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="bg-purple-900/10 border border-purple-800/20 rounded-xl p-6 text-center">
                                                <p className="text-gray-400">You haven't liked any projects yet.</p>
                                                <p className="text-purple-400 mt-2">Find projects that inspire you!</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* About Tab */}
                    {activeTab === "about" && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="col-span-1 lg:col-span-3"
                        >
                            <motion.div
                                variants={itemVariants}
                                className="bg-black/80 border border-[#495057] rounded-[24px] p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(162,210,255,0.15)]"
                            >
                                <h3 className="text-xl font-bold text-white mb-6">About BuilderSpace</h3>

                                <div className="space-y-6">
                                    <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl border border-indigo-800/30 p-6">
                                        <h4 className="text-lg font-medium text-white mb-2">Welcome to BuilderSpace!</h4>
                                        <p className="text-gray-300 leading-relaxed">
                                            BuilderSpace is a vibrant community where innovation meets creativity. Our platform brings
                                            together talented participants and enthusiastic attendees to showcase and celebrate groundbreaking
                                            projects.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-indigo-900/20 border border-indigo-800/30 rounded-xl p-6">
                                            <h4 className="text-lg font-medium text-white mb-2">For Attendees</h4>
                                            <p className="text-gray-300 leading-relaxed">
                                                As an attendee, you have the power to discover, vote for, and like projects that inspire you.
                                                Your engagement helps recognize and celebrate the most innovative ideas in our community.
                                            </p>
                                        </div>

                                        <div className="bg-purple-900/20 border border-purple-800/30 rounded-xl p-6">
                                            <h4 className="text-lg font-medium text-white mb-2">For Participants</h4>
                                            <p className="text-gray-300 leading-relaxed">
                                                Participants showcase their projects, receive feedback, and compete for recognition. The
                                                BuilderSpace platform provides the tools and audience to bring your ideas to life.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-xl border border-blue-800/30 p-6 text-center">
                                        <h4 className="text-lg font-medium text-white mb-4">Thank You for Being Part of Our Community!</h4>
                                        <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
                                            Your participation makes BuilderSpace a thriving ecosystem of innovation and creativity. We're
                                            grateful for your engagement and look forward to seeing the amazing projects and connections that
                                            emerge from our community.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AttendeeProfile

