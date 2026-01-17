"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { 
    Search, Loader2, Mail, Phone, X, UserCheck, UserX, Ban, Trophy, 
    Play, Square, RefreshCw, Users, LogIn, LogOut, Clock, Crown,
    ChevronDown, ChevronUp, Eye, EyeOff, Send, AlertTriangle, Check,
    Pin, Vote, BarChart3, Download
} from 'lucide-react'

export default function PitchAdmin() {
    // Auth state
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [authLoading, setAuthLoading] = useState(true)
    const [loginUsername, setLoginUsername] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [loginError, setLoginError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    
    // Participants state
    const [participants, setParticipants] = useState([])
    const [filteredParticipants, setFilteredParticipants] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    
    // Modal state
    const [selectedParticipant, setSelectedParticipant] = useState(null)
    const [showParticipantModal, setShowParticipantModal] = useState(false)
    const [modalAnimation, setModalAnimation] = useState(false)
    
    // Activity state
    const [activityStatus, setActivityStatus] = useState(null)
    const [duration, setDuration] = useState(30)
    const [timeRemaining, setTimeRemaining] = useState(null)
    
    // Dashboard stats
    const [stats, setStats] = useState(null)
    const [leaderboard, setLeaderboard] = useState([])
    const [loginStatus, setLoginStatus] = useState({ logged_in: [], logged_out: [] })
    const [voteDetails, setVoteDetails] = useState([])
    const [pinDetails, setPinDetails] = useState([])
    
    // UI state
    const [activeTab, setActiveTab] = useState("participants")
    const [actionLoading, setActionLoading] = useState(null)
    const [notification, setNotification] = useState(null)
    
    const API_BASE_URL = "https://found-d.onrender.com/api"
    const refreshInterval = useRef(null)
    
    // Get auth token
    const getToken = () => localStorage.getItem('pitch_admin_token')
    
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
            headers,
            mode: 'cors',
            credentials: 'include'
        })
        
        return response.json()
    }, [])
    
    // Show notification
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type })
        setTimeout(() => setNotification(null), 4000)
    }
    
    // Check auth on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = getToken()
            if (!token) {
                setAuthLoading(false)
                return
            }
            
            try {
                const data = await apiCall('/pitch/admin/verify/')
                if (data.success && data.authenticated) {
                    setIsAuthenticated(true)
                } else {
                    localStorage.removeItem('pitch_admin_token')
                }
            } catch (err) {
                localStorage.removeItem('pitch_admin_token')
            }
            setAuthLoading(false)
        }
        
        checkAuth()
    }, [apiCall])
    
    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault()
        setLoginError("")
        setActionLoading('login')
        
        try {
            const response = await fetch(`${API_BASE_URL}/pitch/admin/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: loginUsername, password: loginPassword }),
                mode: 'cors',
                credentials: 'include'
            })
            
            const data = await response.json()
            
            if (data.success) {
                localStorage.setItem('pitch_admin_token', data.token)
                setIsAuthenticated(true)
                showNotification('Login successful!')
            } else {
                setLoginError(data.message || 'Invalid credentials')
            }
        } catch (err) {
            setLoginError('Connection error. Please try again.')
        }
        setActionLoading(null)
    }
    
    // Handle logout
    const handleLogout = async () => {
        await apiCall('/pitch/admin/logout/', { method: 'POST' })
        localStorage.removeItem('pitch_admin_token')
        setIsAuthenticated(false)
        showNotification('Logged out successfully')
    }
    
    // Fetch all data
    const fetchAllData = useCallback(async () => {
        if (!isAuthenticated) return
        
        try {
            const [participantsData, activityData, statsData, leaderboardData, loginStatusData] = await Promise.all([
                apiCall('/pitch/participants/'),
                apiCall('/pitch/activity/status/'),
                apiCall('/pitch/dashboard/stats/'),
                apiCall('/pitch/leaderboard/'),
                apiCall('/pitch/login-status/')
            ])
            
            if (participantsData.success) {
                setParticipants(participantsData.data)
                setFilteredParticipants(participantsData.data)
            }
            if (activityData.success) setActivityStatus(activityData.data)
            if (statsData.success) setStats(statsData.data)
            if (leaderboardData.success) setLeaderboard(leaderboardData.data)
            if (loginStatusData.success) setLoginStatus(loginStatusData.data)
            
        } catch (err) {
            console.error('Error fetching data:', err)
        }
    }, [isAuthenticated, apiCall])
    
    // Fetch vote and pin details
    const fetchDetails = useCallback(async () => {
        if (!isAuthenticated) return
        
        try {
            const [voteData, pinData] = await Promise.all([
                apiCall('/pitch/vote-details/'),
                apiCall('/pitch/pin-details/')
            ])
            
            if (voteData.success) setVoteDetails(voteData.data)
            if (pinData.success) setPinDetails(pinData.data)
        } catch (err) {
            console.error('Error fetching details:', err)
        }
    }, [isAuthenticated, apiCall])
    
    // Initial fetch and polling
    useEffect(() => {
        if (isAuthenticated) {
            setLoading(true)
            fetchAllData().finally(() => setLoading(false))
            fetchDetails()
            
            // Set up polling every 5 seconds
            refreshInterval.current = setInterval(() => {
                fetchAllData()
                if (activeTab === 'analytics') fetchDetails()
            }, 5000)
        }
        
        return () => {
            if (refreshInterval.current) clearInterval(refreshInterval.current)
        }
    }, [isAuthenticated, fetchAllData, fetchDetails, activeTab])
    
    // Timer countdown
    useEffect(() => {
        if (activityStatus?.is_live && activityStatus?.ends_at) {
            const timer = setInterval(() => {
                const now = new Date()
                const end = new Date(activityStatus.ends_at)
                const diff = Math.max(0, Math.floor((end - now) / 1000))
                setTimeRemaining(diff)
                
                if (diff === 0) {
                    fetchAllData()
                }
            }, 1000)
            
            return () => clearInterval(timer)
        }
    }, [activityStatus, fetchAllData])
    
    // Search filter
    useEffect(() => {
        let filtered = participants
        
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(p => 
                p.name?.toLowerCase().includes(query) ||
                p.email?.toLowerCase().includes(query)
            )
        }
        
        if (statusFilter) {
            filtered = filtered.filter(p => p.status === statusFilter)
        }
        
        setFilteredParticipants(filtered)
    }, [searchQuery, statusFilter, participants])
    
    // Update participant status
    const updateStatus = async (participantId, newStatus) => {
        setActionLoading(`status-${participantId}`)
        
        try {
            const data = await apiCall(`/pitch/participants/${participantId}/status/`, {
                method: 'POST',
                body: JSON.stringify({ status: newStatus })
            })
            
            if (data.success) {
                showNotification(data.message)
                fetchAllData()
                if (selectedParticipant?.id === participantId) {
                    setSelectedParticipant(data.data)
                }
            } else {
                showNotification(data.message || 'Failed to update status', 'error')
            }
        } catch (err) {
            showNotification('Error updating status', 'error')
        }
        setActionLoading(null)
    }
    
    // Resend credentials
    const resendCredentials = async (participantId) => {
        setActionLoading(`resend-${participantId}`)
        
        try {
            const data = await apiCall(`/pitch/participants/${participantId}/resend-credentials/`, {
                method: 'POST'
            })
            
            showNotification(data.message, data.success ? 'success' : 'error')
        } catch (err) {
            showNotification('Error sending credentials', 'error')
        }
        setActionLoading(null)
    }
    
    // Delete participant
    const deleteParticipant = async (participantId) => {
        if (!confirm('Are you sure you want to delete this participant?')) return
        
        setActionLoading(`delete-${participantId}`)
        
        try {
            const data = await apiCall(`/pitch/participants/${participantId}/delete/`, {
                method: 'DELETE'
            })
            
            if (data.success) {
                showNotification('Participant deleted')
                fetchAllData()
                closeModal()
            } else {
                showNotification(data.message || 'Failed to delete', 'error')
            }
        } catch (err) {
            showNotification('Error deleting participant', 'error')
        }
        setActionLoading(null)
    }
    
    // Import from CSV
    const importFromCSV = async () => {
        setActionLoading('import')
        
        try {
            const data = await apiCall('/pitch/participants/import/', { method: 'POST' })
            showNotification(data.message, data.success ? 'success' : 'error')
            if (data.success) fetchAllData()
        } catch (err) {
            showNotification('Error importing participants', 'error')
        }
        setActionLoading(null)
    }
    
    // Activity controls
    const startActivity = async () => {
        setActionLoading('start')
        
        try {
            const data = await apiCall('/pitch/activity/start/', {
                method: 'POST',
                body: JSON.stringify({ duration_minutes: duration })
            })
            
            showNotification(data.message, data.success ? 'success' : 'error')
            if (data.success) fetchAllData()
        } catch (err) {
            showNotification('Error starting activity', 'error')
        }
        setActionLoading(null)
    }
    
    const stopActivity = async () => {
        if (!confirm('This will log out all users. Are you sure?')) return
        setActionLoading('stop')
        
        try {
            const data = await apiCall('/pitch/activity/stop/', { method: 'POST' })
            showNotification(data.message, data.success ? 'success' : 'error')
            if (data.success) fetchAllData()
        } catch (err) {
            showNotification('Error stopping activity', 'error')
        }
        setActionLoading(null)
    }
    
    const resetActivity = async () => {
        if (!confirm('This will clear all votes and pins. Are you sure?')) return
        setActionLoading('reset')
        
        try {
            const data = await apiCall('/pitch/activity/reset/', { method: 'POST' })
            showNotification(data.message, data.success ? 'success' : 'error')
            if (data.success) {
                fetchAllData()
                fetchDetails()
            }
        } catch (err) {
            showNotification('Error resetting activity', 'error')
        }
        setActionLoading(null)
    }
    
    // Modal functions
    const openModal = (participant) => {
        setSelectedParticipant(participant)
        setShowParticipantModal(true)
        setTimeout(() => setModalAnimation(true), 10)
        document.body.style.overflow = "hidden"
    }
    
    const closeModal = () => {
        setModalAnimation(false)
        setTimeout(() => {
            setShowParticipantModal(false)
            setSelectedParticipant(null)
        }, 300)
        document.body.style.overflow = "auto"
    }
    
    // Format time
    const formatTime = (seconds) => {
        if (!seconds) return '00:00'
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    
    // Get status badge color
    const getStatusColor = (status) => {
        const colors = {
            'registered': 'bg-gray-700 text-gray-300',
            'checked_in': 'bg-green-900/50 text-green-400 border border-green-700',
            'kicked_out': 'bg-red-900/50 text-red-400 border border-red-700',
            'suspended': 'bg-yellow-900/50 text-yellow-400 border border-yellow-700',
            'winner': 'bg-purple-900/50 text-purple-400 border border-purple-700'
        }
        return colors[status] || 'bg-gray-700 text-gray-300'
    }
    
    // Auth loading screen
    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-white" />
            </div>
        )
    }
    
    // Login screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white font-manrope">
                <Head>
                    <title>Pitch Admin Login - Builder's Space</title>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                
                <style jsx global>{`
                    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
                    .font-manrope { font-family: 'Manrope', sans-serif; }
                `}</style>
                
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <Link href="/">
                                <Image
                                    src="/logo.jpg"
                                    alt="Logo"
                                    width={60}
                                    height={60}
                                    className="mx-auto invert opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                                />
                            </Link>
                            <h1 className="text-3xl font-bold mt-6">Pitch Admin</h1>
                            <p className="text-gray-500 mt-2">Sign in to manage the activity</p>
                        </div>
                        
                        <form onSubmit={handleLogin} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6">
                            {loginError && (
                                <div className="bg-red-900/20 border border-red-900/50 text-red-400 p-3 rounded-lg mb-4 text-sm">
                                    {loginError}
                                </div>
                            )}
                            
                            <div className="mb-4">
                                <label className="block text-gray-400 text-sm mb-2">Username</label>
                                <input
                                    type="text"
                                    value={loginUsername}
                                    onChange={(e) => setLoginUsername(e.target.value)}
                                    className="w-full bg-black border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                                    placeholder="Enter username"
                                    required
                                />
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-gray-400 text-sm mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        className="w-full bg-black border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors pr-12"
                                        placeholder="Enter password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={actionLoading === 'login'}
                                className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {actionLoading === 'login' ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <LogIn className="w-5 h-5" />
                                        Sign In
                                    </>
                                )}
                            </button>
                        </form>
                        
                        <p className="text-center text-gray-600 text-sm mt-6">
                            <Link href="/" className="hover:text-white transition-colors">← Back to Home</Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    
    // Main admin dashboard
    return (
        <div className="min-h-screen bg-black text-white font-manrope">
            <Head>
                <title>Pitch Admin - Builder's Space</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </Head>
            
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
                .font-manrope { font-family: 'Manrope', sans-serif; }
                
                .card {
                    background: #0a0a0a;
                    border: 1px solid #1a1a1a;
                    border-radius: 12px;
                }
                
                .card:hover {
                    border-color: #2a2a2a;
                }
                
                .participant-card {
                    transition: all 0.2s ease;
                    cursor: pointer;
                }
                
                .participant-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                }
                
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.9);
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-content {
                    background: #0a0a0a;
                    border: 1px solid #1a1a1a;
                    border-radius: 16px;
                    width: 100%;
                    max-width: 600px;
                    max-height: 90vh;
                    overflow-y: auto;
                    transform: scale(0.9);
                    opacity: 0;
                    transition: all 0.3s ease;
                }
                
                .modal-content.show {
                    transform: scale(1);
                    opacity: 1;
                }
                
                .stat-card {
                    background: linear-gradient(145deg, #0a0a0a 0%, #111 100%);
                    border: 1px solid #1a1a1a;
                    border-radius: 12px;
                    padding: 20px;
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
                
                ::-webkit-scrollbar-thumb:hover {
                    background: #2a2a2a;
                }
            `}</style>
            
            {/* Notification */}
            {notification && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all ${
                    notification.type === 'error' 
                        ? 'bg-red-900/90 border border-red-700 text-red-200' 
                        : 'bg-green-900/90 border border-green-700 text-green-200'
                }`}>
                    {notification.type === 'error' ? <AlertTriangle className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                    {notification.message}
                </div>
            )}
            
            {/* Header */}
            <header className="sticky top-0 bg-black/95 backdrop-blur-sm border-b border-[#1a1a1a] z-40">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <Image
                                    src="/logo.jpg"
                                    alt="Logo"
                                    width={36}
                                    height={36}
                                    className="invert opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                                />
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold">Pitch Admin</h1>
                                <p className="text-gray-500 text-sm">Manage your pitch activity</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            {/* Activity Status */}
                            <div className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                                activityStatus?.is_live 
                                    ? 'bg-green-900/30 border border-green-700 text-green-400' 
                                    : 'bg-gray-900/30 border border-gray-700 text-gray-400'
                            }`}>
                                <div className={`w-2 h-2 rounded-full ${activityStatus?.is_live ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                                {activityStatus?.is_live ? (
                                    <span className="font-semibold">{formatTime(timeRemaining)} remaining</span>
                                ) : (
                                    <span>Activity Not Active</span>
                                )}
                            </div>
                            
                            <button
                                onClick={handleLogout}
                                className="text-gray-400 hover:text-white transition-colors p-2"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                    <div className="stat-card">
                        <Users className="w-6 h-6 text-blue-400 mb-2" />
                        <p className="text-2xl font-bold">{stats?.total_participants || 0}</p>
                        <p className="text-gray-500 text-sm">Total</p>
                    </div>
                    <div className="stat-card">
                        <UserCheck className="w-6 h-6 text-green-400 mb-2" />
                        <p className="text-2xl font-bold">{stats?.checked_in || 0}</p>
                        <p className="text-gray-500 text-sm">Checked In</p>
                    </div>
                    <div className="stat-card">
                        <LogIn className="w-6 h-6 text-cyan-400 mb-2" />
                        <p className="text-2xl font-bold">{stats?.logged_in || 0}</p>
                        <p className="text-gray-500 text-sm">Online</p>
                    </div>
                    <div className="stat-card">
                        <UserX className="w-6 h-6 text-red-400 mb-2" />
                        <p className="text-2xl font-bold">{stats?.kicked_out || 0}</p>
                        <p className="text-gray-500 text-sm">Kicked Out</p>
                    </div>
                    <div className="stat-card">
                        <Ban className="w-6 h-6 text-yellow-400 mb-2" />
                        <p className="text-2xl font-bold">{stats?.suspended || 0}</p>
                        <p className="text-gray-500 text-sm">Suspended</p>
                    </div>
                    <div className="stat-card">
                        <Trophy className="w-6 h-6 text-purple-400 mb-2" />
                        <p className="text-2xl font-bold">{stats?.winners || 0}</p>
                        <p className="text-gray-500 text-sm">Winners</p>
                    </div>
                </div>
                
                {/* Activity Controls */}
                <div className="card p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Activity Controls
                    </h2>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <label className="text-gray-400 text-sm">Duration:</label>
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(parseInt(e.target.value) || 30)}
                                className="w-20 bg-black border border-[#2a2a2a] rounded-lg px-3 py-2 text-white text-center"
                                min="1"
                                max="180"
                            />
                            <span className="text-gray-500 text-sm">minutes</span>
                        </div>
                        
                        {!activityStatus?.is_live ? (
                            <button
                                onClick={startActivity}
                                disabled={actionLoading === 'start'}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
                            >
                                {actionLoading === 'start' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                                Start Activity
                            </button>
                        ) : (
                            <button
                                onClick={stopActivity}
                                disabled={actionLoading === 'stop'}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
                            >
                                {actionLoading === 'stop' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Square className="w-4 h-4" />}
                                Stop Activity
                            </button>
                        )}
                        
                        <button
                            onClick={resetActivity}
                            disabled={actionLoading === 'reset'}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
                        >
                            {actionLoading === 'reset' ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                            Reset
                        </button>
                        
                        <button
                            onClick={importFromCSV}
                            disabled={actionLoading === 'import'}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
                        >
                            {actionLoading === 'import' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                            Import from CSV
                        </button>
                    </div>
                </div>
                
                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {[
                        { id: 'participants', label: 'Participants', icon: Users },
                        { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
                        { id: 'online', label: 'Online Status', icon: LogIn },
                        { id: 'analytics', label: 'Analytics', icon: BarChart3 }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
                                activeTab === tab.id 
                                    ? 'bg-white text-black' 
                                    : 'bg-[#1a1a1a] text-gray-400 hover:text-white'
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
                
                {/* Participants Tab */}
                {activeTab === 'participants' && (
                    <>
                        {/* Search and Filter */}
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#2a2a2a] transition-colors"
                                />
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#2a2a2a]"
                            >
                                <option value="">All Status</option>
                                <option value="registered">Registered</option>
                                <option value="checked_in">Checked In</option>
                                <option value="kicked_out">Kicked Out</option>
                                <option value="suspended">Suspended</option>
                                <option value="winner">Winner</option>
                            </select>
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
                                <p className="text-sm mt-2">Import participants from CSV to get started</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredParticipants.map((participant) => (
                                    <div
                                        key={participant.id}
                                        onClick={() => openModal(participant)}
                                        className="card participant-card p-4"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-lg font-bold">
                                                    {participant.name?.charAt(0).toUpperCase() || '?'}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold truncate max-w-[150px]">{participant.name || 'Unknown'}</h3>
                                                    <p className="text-gray-500 text-sm truncate max-w-[150px]">{participant.email}</p>
                                                </div>
                                            </div>
                                            {participant.is_logged_in && (
                                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" title="Online" />
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center justify-between">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(participant.status)}`}>
                                                {participant.status?.replace('_', ' ').toUpperCase()}
                                            </span>
                                            
                                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                <Vote className="w-4 h-4" />
                                                <span>{participant.total_votes}</span>
                                                <Pin className="w-4 h-4 ml-2" />
                                                <span>{participant.total_pins}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
                
                {/* Leaderboard Tab */}
                {activeTab === 'leaderboard' && (
                    <div className="card overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-[#111]">
                                <tr>
                                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Rank</th>
                                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Participant</th>
                                    <th className="text-center px-6 py-4 text-gray-400 font-medium">Votes</th>
                                    <th className="text-center px-6 py-4 text-gray-400 font-medium">Pins</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-12 text-gray-500">
                                            No data yet
                                        </td>
                                    </tr>
                                ) : (
                                    leaderboard.map((entry, index) => (
                                        <tr key={entry.id} className="border-t border-[#1a1a1a] hover:bg-[#111]">
                                            <td className="px-6 py-4">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                                    index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                                                    index === 1 ? 'bg-gray-400/20 text-gray-300' :
                                                    index === 2 ? 'bg-orange-500/20 text-orange-400' :
                                                    'bg-gray-800 text-gray-500'
                                                }`}>
                                                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : entry.rank}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold">
                                                        {entry.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{entry.name}</p>
                                                        <p className="text-gray-500 text-sm">{entry.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center px-6 py-4">
                                                <span className="text-xl font-bold text-green-400">{entry.total_votes}</span>
                                            </td>
                                            <td className="text-center px-6 py-4">
                                                <span className="text-xl font-bold text-blue-400">{entry.total_pins}</span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {/* Online Status Tab */}
                {activeTab === 'online' && (
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Logged In */}
                        <div className="card p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-400">
                                <LogIn className="w-5 h-5" />
                                Online ({loginStatus.logged_in_count || 0})
                            </h3>
                            <div className="space-y-3 max-h-[400px] overflow-y-auto">
                                {loginStatus.logged_in?.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">No one online</p>
                                ) : (
                                    loginStatus.logged_in?.map((user) => (
                                        <div key={user.id} className="flex items-center gap-3 p-3 bg-[#111] rounded-lg">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <div>
                                                <p className="font-medium">{user.name}</p>
                                                <p className="text-gray-500 text-sm">{user.email}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        
                        {/* Logged Out */}
                        <div className="card p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-400">
                                <LogOut className="w-5 h-5" />
                                Offline ({loginStatus.logged_out_count || 0})
                            </h3>
                            <div className="space-y-3 max-h-[400px] overflow-y-auto">
                                {loginStatus.logged_out?.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">No one offline</p>
                                ) : (
                                    loginStatus.logged_out?.map((user) => (
                                        <div key={user.id} className="flex items-center gap-3 p-3 bg-[#111] rounded-lg opacity-60">
                                            <div className="w-2 h-2 rounded-full bg-gray-500" />
                                            <div>
                                                <p className="font-medium">{user.name}</p>
                                                <p className="text-gray-500 text-sm">{user.email}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Vote Details */}
                        <div className="card p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-400">
                                <Vote className="w-5 h-5" />
                                Vote Details
                            </h3>
                            <div className="space-y-4 max-h-[500px] overflow-y-auto">
                                {voteDetails.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">No votes yet</p>
                                ) : (
                                    voteDetails.map((item, idx) => (
                                        <div key={idx} className="p-4 bg-[#111] rounded-lg">
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <p className="font-semibold">{item.candidate_name}</p>
                                                    <p className="text-gray-500 text-sm">{item.candidate_email}</p>
                                                </div>
                                                <span className="text-2xl font-bold text-green-400">{item.total_votes}</span>
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                <p className="mb-2">Voted by:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.voters.map((voter, vidx) => (
                                                        <span key={vidx} className="px-2 py-1 bg-black rounded text-xs">
                                                            {voter.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        
                        {/* Pin Details */}
                        <div className="card p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                                <Pin className="w-5 h-5" />
                                Pin Details
                            </h3>
                            <div className="space-y-4 max-h-[500px] overflow-y-auto">
                                {pinDetails.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">No pins yet</p>
                                ) : (
                                    pinDetails.map((item, idx) => (
                                        <div key={idx} className="p-4 bg-[#111] rounded-lg">
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <p className="font-semibold">{item.pinned_name}</p>
                                                    <p className="text-gray-500 text-sm">{item.pinned_email}</p>
                                                </div>
                                                <span className="text-2xl font-bold text-blue-400">{item.total_pins}</span>
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                <p className="mb-2">Pinned by:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.pinners.map((pinner, pidx) => (
                                                        <span key={pidx} className="px-2 py-1 bg-black rounded text-xs">
                                                            {pinner.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
            
            {/* Participant Modal */}
            {showParticipantModal && selectedParticipant && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className={`modal-content ${modalAnimation ? 'show' : ''} m-4`} onClick={e => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-[#0a0a0a] border-b border-[#1a1a1a] p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xl font-bold">
                                        {selectedParticipant.name?.charAt(0).toUpperCase() || '?'}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">{selectedParticipant.name || 'Unknown'}</h2>
                                        <p className="text-gray-400">{selectedParticipant.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            {/* Status Badge */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Status</h3>
                                <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(selectedParticipant.status)}`}>
                                    {selectedParticipant.status?.replace('_', ' ').toUpperCase()}
                                </span>
                                {selectedParticipant.is_logged_in && (
                                    <span className="ml-2 px-3 py-1 rounded text-sm font-medium bg-green-900/30 text-green-400 border border-green-700">
                                        ONLINE
                                    </span>
                                )}
                            </div>
                            
                            {/* Credentials */}
                            {selectedParticipant.status === 'checked_in' && selectedParticipant.password && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Credentials</h3>
                                    <div className="bg-[#111] p-4 rounded-lg">
                                        <p className="text-sm text-gray-400 mb-1">Password:</p>
                                        <p className="font-mono text-lg">{selectedParticipant.password}</p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            {selectedParticipant.credentials_sent ? '✅ Email sent' : '❌ Email not sent'}
                                        </p>
                                    </div>
                                </div>
                            )}
                            
                            {/* Stats */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Stats</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#111] p-4 rounded-lg text-center">
                                        <Vote className="w-6 h-6 mx-auto mb-2 text-green-400" />
                                        <p className="text-2xl font-bold">{selectedParticipant.total_votes}</p>
                                        <p className="text-gray-500 text-sm">Votes</p>
                                    </div>
                                    <div className="bg-[#111] p-4 rounded-lg text-center">
                                        <Pin className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                                        <p className="text-2xl font-bold">{selectedParticipant.total_pins}</p>
                                        <p className="text-gray-500 text-sm">Pins</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Info */}
                            {(selectedParticipant.phone || selectedParticipant.designation || selectedParticipant.domain) && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Info</h3>
                                    <div className="space-y-2">
                                        {selectedParticipant.phone && (
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <Phone className="w-4 h-4 text-gray-500" />
                                                {selectedParticipant.phone}
                                            </div>
                                        )}
                                        {selectedParticipant.designation && (
                                            <p className="text-gray-300">{selectedParticipant.designation}</p>
                                        )}
                                        {selectedParticipant.domain && (
                                            <p className="text-gray-400">{selectedParticipant.domain}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                            
                            {/* Actions */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Actions</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {selectedParticipant.status !== 'checked_in' && (
                                        <button
                                            onClick={() => updateStatus(selectedParticipant.id, 'checked_in')}
                                            disabled={actionLoading === `status-${selectedParticipant.id}`}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {actionLoading === `status-${selectedParticipant.id}` ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <UserCheck className="w-4 h-4" />
                                            )}
                                            Check In
                                        </button>
                                    )}
                                    
                                    {selectedParticipant.status !== 'kicked_out' && (
                                        <button
                                            onClick={() => updateStatus(selectedParticipant.id, 'kicked_out')}
                                            disabled={actionLoading === `status-${selectedParticipant.id}`}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            <UserX className="w-4 h-4" />
                                            Kick Out
                                        </button>
                                    )}
                                    
                                    {selectedParticipant.status !== 'suspended' && (
                                        <button
                                            onClick={() => updateStatus(selectedParticipant.id, 'suspended')}
                                            disabled={actionLoading === `status-${selectedParticipant.id}`}
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            <Ban className="w-4 h-4" />
                                            Suspend
                                        </button>
                                    )}
                                    
                                    {selectedParticipant.status !== 'winner' && (
                                        <button
                                            onClick={() => updateStatus(selectedParticipant.id, 'winner')}
                                            disabled={actionLoading === `status-${selectedParticipant.id}`}
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            <Trophy className="w-4 h-4" />
                                            Winner
                                        </button>
                                    )}
                                    
                                    {selectedParticipant.status === 'checked_in' && (
                                        <button
                                            onClick={() => resendCredentials(selectedParticipant.id)}
                                            disabled={actionLoading === `resend-${selectedParticipant.id}`}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {actionLoading === `resend-${selectedParticipant.id}` ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Send className="w-4 h-4" />
                                            )}
                                            Resend Email
                                        </button>
                                    )}
                                    
                                    <button
                                        onClick={() => deleteParticipant(selectedParticipant.id)}
                                        disabled={actionLoading === `delete-${selectedParticipant.id}`}
                                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {actionLoading === `delete-${selectedParticipant.id}` ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <X className="w-4 h-4" />
                                        )}
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
