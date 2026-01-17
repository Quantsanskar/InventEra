"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { 
    Search, Loader2, Mail, X, LogIn, LogOut, Clock, Crown,
    Eye, EyeOff, Check, Pin, Vote, Star, Heart, Sparkles,
    AlertTriangle, Timer, Trophy, Users, ChevronUp
} from 'lucide-react'

export default function PitchUser() {
    // Auth state
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [authLoading, setAuthLoading] = useState(true)
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [loginError, setLoginError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loginLoading, setLoginLoading] = useState(false)
    
    // User state
    const [currentUser, setCurrentUser] = useState(null)
    const [participants, setParticipants] = useState([])
    const [filteredParticipants, setFilteredParticipants] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    
    // Activity state
    const [activityStatus, setActivityStatus] = useState(null)
    const [timeRemaining, setTimeRemaining] = useState(null)
    const [votesRemaining, setVotesRemaining] = useState(3)
    
    // UI state
    const [selectedParticipant, setSelectedParticipant] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [modalAnimation, setModalAnimation] = useState(false)
    const [actionLoading, setActionLoading] = useState(null)
    const [notification, setNotification] = useState(null)
    const [eventEnded, setEventEnded] = useState(false)
    const [showLeaderboard, setShowLeaderboard] = useState(false)
    const [leaderboard, setLeaderboard] = useState([])
    
    const API_BASE_URL = "https://found-d.onrender.com/api"
    const refreshInterval = useRef(null)
    const verifyInterval = useRef(null)
    
    // Get auth token
    const getToken = () => localStorage.getItem('pitch_user_token')
    
    // API call helper
    const apiCall = useCallback(async (endpoint, options = {}) => {
        const token = getToken()
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        }
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        })
        
        return response.json()
    }, [])
    
    // Show notification
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type })
        setTimeout(() => setNotification(null), 3000)
    }
    
    // Check auth and verify session
    useEffect(() => {
        const checkAuth = async () => {
            const token = getToken()
            if (!token) {
                setAuthLoading(false)
                return
            }
            
            try {
                const data = await apiCall('/pitch/user/verify/')
                
                if (data.success && data.authenticated) {
                    setIsAuthenticated(true)
                    setCurrentUser(data.user)
                    setActivityStatus(data.activity)
                } else {
                    localStorage.removeItem('pitch_user_token')
                    if (data.event_ended) {
                        setEventEnded(true)
                    }
                }
            } catch (err) {
                localStorage.removeItem('pitch_user_token')
            }
            setAuthLoading(false)
        }
        
        checkAuth()
    }, [apiCall])
    
    // Verify session periodically and check for kick
    useEffect(() => {
        if (isAuthenticated) {
            verifyInterval.current = setInterval(async () => {
                try {
                    const data = await apiCall('/pitch/user/verify/')
                    
                    if (!data.success || !data.authenticated) {
                        localStorage.removeItem('pitch_user_token')
                        setIsAuthenticated(false)
                        setEventEnded(data.event_ended || false)
                        if (data.message) {
                            showNotification(data.message, 'error')
                        }
                    } else {
                        setActivityStatus(data.activity)
                    }
                } catch (err) {
                    // Silent fail
                }
            }, 5000)
        }
        
        return () => {
            if (verifyInterval.current) clearInterval(verifyInterval.current)
        }
    }, [isAuthenticated, apiCall])
    
    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault()
        setLoginError("")
        setLoginLoading(true)
        
        try {
            const response = await fetch(`${API_BASE_URL}/pitch/user/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail, password: loginPassword })
            })
            
            const data = await response.json()
            
            if (data.success) {
                localStorage.setItem('pitch_user_token', data.token)
                setIsAuthenticated(true)
                setCurrentUser(data.user)
                showNotification('Welcome! 🎉')
            } else {
                setLoginError(data.message || 'Invalid credentials')
            }
        } catch (err) {
            setLoginError('Connection error. Please try again.')
        }
        setLoginLoading(false)
    }
    
    // Handle logout
    const handleLogout = async () => {
        await apiCall('/pitch/user/logout/', { method: 'POST' })
        localStorage.removeItem('pitch_user_token')
        setIsAuthenticated(false)
        setCurrentUser(null)
    }
    
    // Fetch participants
    const fetchParticipants = useCallback(async () => {
        if (!isAuthenticated) return
        
        try {
            const data = await apiCall('/pitch/participants/checked-in/')
            
            if (data.success) {
                setParticipants(data.data)
                setFilteredParticipants(data.data)
                setVotesRemaining(data.votes_remaining)
            }
        } catch (err) {
            console.error('Error fetching participants:', err)
        }
    }, [isAuthenticated, apiCall])
    
    // Fetch leaderboard
    const fetchLeaderboard = useCallback(async () => {
        try {
            const data = await apiCall('/pitch/leaderboard/')
            if (data.success) {
                setLeaderboard(data.data)
            }
        } catch (err) {
            console.error('Error fetching leaderboard:', err)
        }
    }, [apiCall])
    
    // Initial fetch and polling
    useEffect(() => {
        if (isAuthenticated) {
            setLoading(true)
            fetchParticipants().finally(() => setLoading(false))
            fetchLeaderboard()
            
            refreshInterval.current = setInterval(() => {
                fetchParticipants()
                fetchLeaderboard()
            }, 5000)
        }
        
        return () => {
            if (refreshInterval.current) clearInterval(refreshInterval.current)
        }
    }, [isAuthenticated, fetchParticipants, fetchLeaderboard])
    
    // Timer countdown
    useEffect(() => {
        if (activityStatus?.is_live && activityStatus?.ends_at) {
            const timer = setInterval(() => {
                const now = new Date()
                const end = new Date(activityStatus.ends_at)
                const diff = Math.max(0, Math.floor((end - now) / 1000))
                setTimeRemaining(diff)
                
                if (diff === 0) {
                    setEventEnded(true)
                    setIsAuthenticated(false)
                    localStorage.removeItem('pitch_user_token')
                }
            }, 1000)
            
            return () => clearInterval(timer)
        }
    }, [activityStatus])
    
    // Search filter
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredParticipants(participants)
            return
        }
        
        const query = searchQuery.toLowerCase()
        const filtered = participants.filter(p => 
            p.name?.toLowerCase().includes(query) ||
            p.email?.toLowerCase().includes(query) ||
            p.designation?.toLowerCase().includes(query) ||
            p.domain?.toLowerCase().includes(query)
        )
        setFilteredParticipants(filtered)
    }, [searchQuery, participants])
    
    // Vote for participant
    const voteForParticipant = async (participantId) => {
        setActionLoading(`vote-${participantId}`)
        
        try {
            const data = await apiCall(`/pitch/vote/${participantId}/`, { method: 'POST' })
            
            if (data.success) {
                showNotification(data.message)
                setVotesRemaining(data.votes_remaining)
                fetchParticipants()
            } else {
                showNotification(data.message, 'error')
            }
        } catch (err) {
            showNotification('Error voting', 'error')
        }
        setActionLoading(null)
    }
    
    // Unvote participant
    const unvoteParticipant = async (participantId) => {
        setActionLoading(`unvote-${participantId}`)
        
        try {
            const data = await apiCall(`/pitch/unvote/${participantId}/`, { method: 'POST' })
            
            if (data.success) {
                showNotification(data.message)
                setVotesRemaining(data.votes_remaining)
                fetchParticipants()
            } else {
                showNotification(data.message, 'error')
            }
        } catch (err) {
            showNotification('Error removing vote', 'error')
        }
        setActionLoading(null)
    }
    
    // Pin participant
    const pinParticipant = async (participantId) => {
        setActionLoading(`pin-${participantId}`)
        
        try {
            const data = await apiCall(`/pitch/pin/${participantId}/`, { method: 'POST' })
            
            if (data.success) {
                showNotification(data.message)
                fetchParticipants()
            } else {
                showNotification(data.message, 'error')
            }
        } catch (err) {
            showNotification('Error pinning', 'error')
        }
        setActionLoading(null)
    }
    
    // Unpin participant
    const unpinParticipant = async (participantId) => {
        setActionLoading(`unpin-${participantId}`)
        
        try {
            const data = await apiCall(`/pitch/unpin/${participantId}/`, { method: 'POST' })
            
            if (data.success) {
                showNotification(data.message)
                fetchParticipants()
            } else {
                showNotification(data.message, 'error')
            }
        } catch (err) {
            showNotification('Error unpinning', 'error')
        }
        setActionLoading(null)
    }
    
    // Modal functions
    const openModal = (participant) => {
        setSelectedParticipant(participant)
        setShowModal(true)
        setTimeout(() => setModalAnimation(true), 10)
        document.body.style.overflow = "hidden"
    }
    
    const closeModal = () => {
        setModalAnimation(false)
        setTimeout(() => {
            setShowModal(false)
            setSelectedParticipant(null)
        }, 300)
        document.body.style.overflow = "auto"
    }
    
    // Format time
    const formatTime = (seconds) => {
        if (!seconds && seconds !== 0) return '--:--'
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    
    // Auth loading screen
    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-white mx-auto mb-4" />
                    <p className="text-gray-500">Loading...</p>
                </div>
            </div>
        )
    }
    
    // Event ended screen
    if (eventEnded && !isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white font-manrope flex items-center justify-center">
                <Head>
                    <title>Activity Ended - Builder's Space</title>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                
                <style jsx global>{`
                    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
                    .font-manrope { font-family: 'Manrope', sans-serif; }
                `}</style>
                
                <div className="text-center p-8 max-w-md">
                    <div className="text-6xl mb-6">🏁</div>
                    <h1 className="text-3xl font-bold mb-4">Activity Ended!</h1>
                    <p className="text-gray-400 mb-8">
                        The pitch activity has concluded. Thank you for participating!
                    </p>
                    <Link href="/" className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                        Back to Home
                    </Link>
                </div>
            </div>
        )
    }
    
    // Login screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white font-manrope">
                <Head>
                    <title>Pitch Activity Login - Builder's Space</title>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                
                <style jsx global>{`
                    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
                    .font-manrope { font-family: 'Manrope', sans-serif; }
                    
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }
                    
                    .float-animation {
                        animation: float 3s ease-in-out infinite;
                    }
                    
                    @keyframes pulse-glow {
                        0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
                        50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.6); }
                    }
                    
                    .pulse-glow {
                        animation: pulse-glow 2s ease-in-out infinite;
                    }
                `}</style>
                
                <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
                    
                    {/* Floating elements */}
                    <div className="absolute top-20 left-10 text-4xl float-animation" style={{ animationDelay: '0s' }}>🚀</div>
                    <div className="absolute top-40 right-20 text-4xl float-animation" style={{ animationDelay: '0.5s' }}>⭐</div>
                    <div className="absolute bottom-40 left-20 text-4xl float-animation" style={{ animationDelay: '1s' }}>💡</div>
                    <div className="absolute bottom-20 right-10 text-4xl float-animation" style={{ animationDelay: '1.5s' }}>🎯</div>
                    
                    <div className="w-full max-w-md relative z-10">
                        <div className="text-center mb-8">
                            <Link href="/">
                                <Image
                                    src="/logo.jpg"
                                    alt="Logo"
                                    width={70}
                                    height={70}
                                    className="mx-auto invert opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                                />
                            </Link>
                            <h1 className="text-4xl font-bold mt-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                Pitch Activity
                            </h1>
                            <p className="text-gray-400 mt-2">Login to participate in the activity</p>
                        </div>
                        
                        <form onSubmit={handleLogin} className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#1a1a1a] rounded-2xl p-8 pulse-glow">
                            {loginError && (
                                <div className="bg-red-900/20 border border-red-900/50 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                                    {loginError}
                                </div>
                            )}
                            
                            <div className="mb-5">
                                <label className="block text-gray-400 text-sm mb-2 font-medium">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        className="w-full bg-black/50 border border-[#2a2a2a] rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-purple-500 transition-all"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-8">
                                <label className="block text-gray-400 text-sm mb-2 font-medium">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        className="w-full bg-black/50 border border-[#2a2a2a] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 transition-all pr-12"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={loginLoading}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
                            >
                                {loginLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        Join Activity
                                    </>
                                )}
                            </button>
                        </form>
                        
                        <p className="text-center text-gray-600 text-sm mt-8">
                            <Link href="/" className="hover:text-white transition-colors">← Back to Home</Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    
    // Main activity screen
    return (
        <div className="min-h-screen bg-black text-white font-manrope">
            <Head>
                <title>Pitch Activity - Builder's Space</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </Head>
            
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
                .font-manrope { font-family: 'Manrope', sans-serif; }
                
                .participant-card {
                    background: #0a0a0a;
                    border: 1px solid #1a1a1a;
                    border-radius: 16px;
                    transition: all 0.3s ease;
                    overflow: hidden;
                }
                
                .participant-card:hover {
                    transform: translateY(-4px);
                    border-color: #2a2a2a;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                }
                
                .participant-card.voted {
                    border-color: #22c55e;
                    box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
                }
                
                .participant-card.pinned {
                    border-color: #3b82f6;
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
                }
                
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.95);
                    z-index: 100;
                    display: flex;
                    align-items: flex-end;
                }
                
                @media (min-width: 768px) {
                    .modal-overlay {
                        align-items: center;
                        justify-content: center;
                    }
                }
                
                .modal-content {
                    background: linear-gradient(145deg, #0a0a0a 0%, #111 100%);
                    border: 1px solid #1a1a1a;
                    border-radius: 24px 24px 0 0;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    transform: translateY(100%);
                    opacity: 0;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                @media (min-width: 768px) {
                    .modal-content {
                        border-radius: 24px;
                        max-width: 500px;
                        transform: scale(0.9);
                    }
                }
                
                .modal-content.show {
                    transform: translateY(0);
                    opacity: 1;
                }
                
                @media (min-width: 768px) {
                    .modal-content.show {
                        transform: scale(1);
                    }
                }
                
                .action-btn {
                    transition: all 0.2s ease;
                }
                
                .action-btn:active {
                    transform: scale(0.95);
                }
                
                .vote-btn {
                    background: linear-gradient(145deg, #22c55e 0%, #16a34a 100%);
                }
                
                .vote-btn:hover {
                    background: linear-gradient(145deg, #16a34a 0%, #15803d 100%);
                }
                
                .vote-btn.voted {
                    background: linear-gradient(145deg, #dc2626 0%, #b91c1c 100%);
                }
                
                .pin-btn {
                    background: linear-gradient(145deg, #3b82f6 0%, #2563eb 100%);
                }
                
                .pin-btn:hover {
                    background: linear-gradient(145deg, #2563eb 0%, #1d4ed8 100%);
                }
                
                .pin-btn.pinned {
                    background: linear-gradient(145deg, #f59e0b 0%, #d97706 100%);
                }
                
                ::-webkit-scrollbar {
                    width: 6px;
                }
                
                ::-webkit-scrollbar-track {
                    background: #0a0a0a;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: #1a1a1a;
                    border-radius: 3px;
                }
                
                .timer-urgent {
                    animation: pulse 1s ease-in-out infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                .leaderboard-panel {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: #0a0a0a;
                    border-top: 1px solid #1a1a1a;
                    border-radius: 24px 24px 0 0;
                    transform: translateY(calc(100% - 60px));
                    transition: transform 0.3s ease;
                    z-index: 50;
                    max-height: 70vh;
                }
                
                .leaderboard-panel.open {
                    transform: translateY(0);
                }
            `}</style>
            
            {/* Notification */}
            {notification && (
                <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all ${
                    notification.type === 'error' 
                        ? 'bg-red-900/90 border border-red-700 text-red-200' 
                        : 'bg-green-900/90 border border-green-700 text-green-200'
                }`}>
                    {notification.type === 'error' ? <AlertTriangle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                    {notification.message}
                </div>
            )}
            
            {/* Header */}
            <header className="sticky top-0 bg-black/95 backdrop-blur-sm border-b border-[#1a1a1a] z-40">
                <div className="max-w-6xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/">
                                <Image
                                    src="/logo.jpg"
                                    alt="Logo"
                                    width={32}
                                    height={32}
                                    className="invert opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                                />
                            </Link>
                            <div>
                                <h1 className="text-lg font-bold">Pitch Activity</h1>
                                <p className="text-gray-500 text-xs">Hi, {currentUser?.name?.split(' ')[0]}! 👋</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            {/* Timer */}
                            <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                                timeRemaining && timeRemaining < 300 
                                    ? 'bg-red-900/30 border border-red-700 text-red-400 timer-urgent' 
                                    : 'bg-purple-900/30 border border-purple-700 text-purple-400'
                            }`}>
                                <Timer className="w-4 h-4" />
                                <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
                            </div>
                            
                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            
            {/* Stats Bar */}
            <div className="bg-[#0a0a0a] border-b border-[#1a1a1a]">
                <div className="max-w-6xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Vote className="w-5 h-5 text-green-400" />
                                <span className="text-sm">
                                    <span className="font-bold text-green-400">{votesRemaining}</span>
                                    <span className="text-gray-500"> votes left</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-400" />
                                <span className="text-sm">
                                    <span className="font-bold text-blue-400">{participants.length}</span>
                                    <span className="text-gray-500"> participants</span>
                                </span>
                            </div>
                        </div>
                        
                        <button
                            onClick={() => setShowLeaderboard(!showLeaderboard)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-700/50 rounded-full text-yellow-400 text-sm font-medium hover:from-yellow-600/30 hover:to-orange-600/30 transition-all"
                        >
                            <Crown className="w-4 h-4" />
                            Leaderboard
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-6 pb-24">
                {/* Search */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search participants..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#2a2a2a] transition-colors text-lg"
                        />
                    </div>
                </div>
                
                {/* Participants Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-gray-500" />
                    </div>
                ) : filteredParticipants.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">No participants found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredParticipants.map((participant) => (
                            <div
                                key={participant.id}
                                className={`participant-card cursor-pointer ${participant.is_voted ? 'voted' : ''} ${participant.is_pinned ? 'pinned' : ''}`}
                                onClick={() => openModal(participant)}
                            >
                                <div className="p-5">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-xl font-bold">
                                                {participant.name?.charAt(0).toUpperCase() || '?'}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">{participant.name || 'Unknown'}</h3>
                                                {participant.designation && (
                                                    <p className="text-gray-400 text-sm">{participant.designation}</p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Status Badges */}
                                        <div className="flex flex-col gap-1">
                                            {participant.is_voted && (
                                                <span className="px-2 py-1 bg-green-900/30 border border-green-700 rounded-full text-green-400 text-xs font-medium flex items-center gap-1">
                                                    <Check className="w-3 h-3" /> Voted
                                                </span>
                                            )}
                                            {participant.is_pinned && (
                                                <span className="px-2 py-1 bg-blue-900/30 border border-blue-700 rounded-full text-blue-400 text-xs font-medium flex items-center gap-1">
                                                    <Pin className="w-3 h-3" /> Pinned
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Domain */}
                                    {participant.domain && (
                                        <p className="text-gray-500 text-sm mb-4 truncate">{participant.domain}</p>
                                    )}
                                    
                                    {/* Quick Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                participant.is_voted 
                                                    ? unvoteParticipant(participant.id)
                                                    : voteForParticipant(participant.id)
                                            }}
                                            disabled={actionLoading?.includes(participant.id) || (!participant.is_voted && votesRemaining === 0)}
                                            className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 action-btn vote-btn ${
                                                participant.is_voted ? 'voted' : ''
                                            } disabled:opacity-50`}
                                        >
                                            {actionLoading === `vote-${participant.id}` || actionLoading === `unvote-${participant.id}` ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : participant.is_voted ? (
                                                <>
                                                    <X className="w-4 h-4" />
                                                    Unvote
                                                </>
                                            ) : (
                                                <>
                                                    <Star className="w-4 h-4" />
                                                    Vote
                                                </>
                                            )}
                                        </button>
                                        
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                participant.is_pinned 
                                                    ? unpinParticipant(participant.id)
                                                    : pinParticipant(participant.id)
                                            }}
                                            disabled={actionLoading?.includes(participant.id)}
                                            className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 action-btn pin-btn ${
                                                participant.is_pinned ? 'pinned' : ''
                                            } disabled:opacity-50`}
                                        >
                                            {actionLoading === `pin-${participant.id}` || actionLoading === `unpin-${participant.id}` ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : participant.is_pinned ? (
                                                <>
                                                    <Heart className="w-4 h-4 fill-current" />
                                                    Pinned
                                                </>
                                            ) : (
                                                <>
                                                    <Pin className="w-4 h-4" />
                                                    Pin
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            
            {/* Leaderboard Panel */}
            <div className={`leaderboard-panel ${showLeaderboard ? 'open' : ''}`}>
                <div 
                    className="flex items-center justify-center py-4 cursor-pointer"
                    onClick={() => setShowLeaderboard(!showLeaderboard)}
                >
                    <div className="flex items-center gap-2 text-yellow-400">
                        <Crown className="w-5 h-5" />
                        <span className="font-semibold">Live Leaderboard</span>
                        <ChevronUp className={`w-5 h-5 transition-transform ${showLeaderboard ? 'rotate-180' : ''}`} />
                    </div>
                </div>
                
                {showLeaderboard && (
                    <div className="px-4 pb-8 overflow-y-auto max-h-[calc(70vh-60px)]">
                        {leaderboard.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">No votes yet</p>
                        ) : (
                            <div className="space-y-2">
                                {leaderboard.slice(0, 10).map((entry, index) => (
                                    <div 
                                        key={entry.id}
                                        className={`flex items-center gap-4 p-3 rounded-xl ${
                                            index === 0 ? 'bg-yellow-900/20 border border-yellow-700/50' :
                                            index === 1 ? 'bg-gray-700/20 border border-gray-600/50' :
                                            index === 2 ? 'bg-orange-900/20 border border-orange-700/50' :
                                            'bg-[#111]'
                                        }`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                            index === 0 ? 'bg-yellow-500/30 text-yellow-300' :
                                            index === 1 ? 'bg-gray-400/30 text-gray-200' :
                                            index === 2 ? 'bg-orange-500/30 text-orange-300' :
                                            'bg-gray-800 text-gray-400'
                                        }`}>
                                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : entry.rank}
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{entry.name}</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 text-green-400">
                                                <Vote className="w-4 h-4" />
                                                <span className="font-bold">{entry.total_votes}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-blue-400">
                                                <Pin className="w-4 h-4" />
                                                <span className="font-bold">{entry.total_pins}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            {/* Participant Modal */}
            {showModal && selectedParticipant && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className={`modal-content ${modalAnimation ? 'show' : ''}`} onClick={e => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="relative p-6 text-center border-b border-[#1a1a1a]">
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                                {selectedParticipant.name?.charAt(0).toUpperCase() || '?'}
                            </div>
                            
                            <h2 className="text-2xl font-bold mb-1">{selectedParticipant.name || 'Unknown'}</h2>
                            {selectedParticipant.designation && (
                                <p className="text-gray-400">{selectedParticipant.designation}</p>
                            )}
                            
                            {/* Status Badges */}
                            <div className="flex items-center justify-center gap-2 mt-4">
                                {selectedParticipant.is_voted && (
                                    <span className="px-3 py-1 bg-green-900/30 border border-green-700 rounded-full text-green-400 text-sm font-medium flex items-center gap-1">
                                        <Check className="w-4 h-4" /> You voted
                                    </span>
                                )}
                                {selectedParticipant.is_pinned && (
                                    <span className="px-3 py-1 bg-blue-900/30 border border-blue-700 rounded-full text-blue-400 text-sm font-medium flex items-center gap-1">
                                        <Heart className="w-4 h-4 fill-current" /> Pinned
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        {/* Modal Body */}
                        <div className="p-6">
                            {/* Domain */}
                            {selectedParticipant.domain && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Domain</h3>
                                    <p className="text-gray-300">{selectedParticipant.domain}</p>
                                </div>
                            )}
                            
                            {/* About */}
                            {selectedParticipant.about && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">About</h3>
                                    <p className="text-gray-300 leading-relaxed">{selectedParticipant.about}</p>
                                </div>
                            )}
                            
                            {/* Email */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Contact</h3>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Mail className="w-4 h-4 text-gray-500" />
                                    <a href={`mailto:${selectedParticipant.email}`} className="hover:text-white">
                                        {selectedParticipant.email}
                                    </a>
                                </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        selectedParticipant.is_voted 
                                            ? unvoteParticipant(selectedParticipant.id)
                                            : voteForParticipant(selectedParticipant.id)
                                    }}
                                    disabled={actionLoading?.includes(selectedParticipant.id) || (!selectedParticipant.is_voted && votesRemaining === 0)}
                                    className={`flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-lg action-btn vote-btn ${
                                        selectedParticipant.is_voted ? 'voted' : ''
                                    } disabled:opacity-50`}
                                >
                                    {actionLoading?.includes(selectedParticipant.id) ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : selectedParticipant.is_voted ? (
                                        <>
                                            <X className="w-5 h-5" />
                                            Remove Vote
                                        </>
                                    ) : (
                                        <>
                                            <Star className="w-5 h-5" />
                                            Vote ({votesRemaining} left)
                                        </>
                                    )}
                                </button>
                                
                                <button
                                    onClick={() => {
                                        selectedParticipant.is_pinned 
                                            ? unpinParticipant(selectedParticipant.id)
                                            : pinParticipant(selectedParticipant.id)
                                    }}
                                    disabled={actionLoading?.includes(selectedParticipant.id)}
                                    className={`flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-lg action-btn pin-btn ${
                                        selectedParticipant.is_pinned ? 'pinned' : ''
                                    } disabled:opacity-50`}
                                >
                                    {actionLoading?.includes(selectedParticipant.id) ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : selectedParticipant.is_pinned ? (
                                        <>
                                            <Heart className="w-5 h-5 fill-current" />
                                            Unpin
                                        </>
                                    ) : (
                                        <>
                                            <Pin className="w-5 h-5" />
                                            Pin
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
