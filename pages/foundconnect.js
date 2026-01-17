"use client"

import { useEffect, useState, useRef } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Search, Loader2, Mail, Phone, MapPin, ExternalLink, X } from 'lucide-react'
import { Footer } from "@/components/footer"

export default function FoundConnect() {
    const [members, setMembers] = useState([])
    const [filteredMembers, setFilteredMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedMember, setSelectedMember] = useState(null)
    const [showMemberModal, setShowMemberModal] = useState(false)
    const [totalPages, setTotalPages] = useState(1)
    const [modalAnimation, setModalAnimation] = useState(false)
    const [heroCollapsed, setHeroCollapsed] = useState(false)
    const lastScrollY = useRef(0)
    const scrollThreshold = 50 // Minimum scroll before triggering collapse

    const membersPerPage = 21
    const API_BASE_URL = "https://found-d.onrender.com/api"

    // Fetch all members from backend
    const fetchMembers = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch(`${API_BASE_URL}/members/?per_page=1000`)

            if (!response.ok) {
                throw new Error("Failed to fetch members")
            }

            const data = await response.json()

            if (data.success && data.data) {
                setMembers(data.data)
                setFilteredMembers(data.data)
                setTotalPages(Math.ceil(data.data.length / membersPerPage))
            } else {
                throw new Error("Invalid data format")
            }

            setLoading(false)
        } catch (error) {
            console.error("Error fetching members:", error)
            setError("Failed to load members. Please try again later.")
            setLoading(false)
        }
    }

    // Initialize - fetch members on mount
    useEffect(() => {
        fetchMembers()
    }, [])

    // Handle mobile hero collapse on scroll
    useEffect(() => {
        const handleScroll = () => {
            // Only apply on mobile (lg breakpoint is 1024px)
            if (window.innerWidth >= 1024) return

            const rightPanel = document.getElementById('right-panel')
            if (!rightPanel) return

            const currentScrollY = rightPanel.scrollTop

            if (currentScrollY > lastScrollY.current && currentScrollY > scrollThreshold) {
                // Scrolling down - collapse hero
                setHeroCollapsed(true)
            } else if (currentScrollY < lastScrollY.current && currentScrollY < scrollThreshold) {
                // Scrolling up near top - expand hero
                setHeroCollapsed(false)
            }

            lastScrollY.current = currentScrollY
        }

        const rightPanel = document.getElementById('right-panel')
        if (rightPanel) {
            rightPanel.addEventListener('scroll', handleScroll, { passive: true })
        }

        return () => {
            if (rightPanel) {
                rightPanel.removeEventListener('scroll', handleScroll)
            }
        }
    }, [])

    // Handle search
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredMembers(members)
            setCurrentPage(1)
            setTotalPages(Math.ceil(members.length / membersPerPage))
            return
        }

        const query = searchQuery.toLowerCase()
        const filtered = members.filter((member) => {
            return (
                (member.name && member.name.toLowerCase().includes(query)) ||
                (member.email && member.email.toLowerCase().includes(query)) ||
                (member.designation && member.designation.toLowerCase().includes(query)) ||
                (member.domain && member.domain.toLowerCase().includes(query)) ||
                (member.location && member.location.toLowerCase().includes(query))
            )
        })

        setFilteredMembers(filtered)
        setCurrentPage(1)
        setTotalPages(Math.ceil(filtered.length / membersPerPage))
    }, [searchQuery, members])

    // Get current page members
    const getCurrentPageMembers = () => {
        const startIndex = (currentPage - 1) * membersPerPage
        const endIndex = startIndex + membersPerPage
        return filteredMembers.slice(startIndex, endIndex)
    }

    // Open member details modal with slide animation
    const openMemberDetails = (member) => {
        setSelectedMember(member)
        setShowMemberModal(true)
        setTimeout(() => setModalAnimation(true), 10)
        document.body.style.overflow = "hidden"
    }

    // Close member details modal
    const closeMemberModal = () => {
        setModalAnimation(false)
        setTimeout(() => {
            setShowMemberModal(false)
            setSelectedMember(null)
        }, 300)
        document.body.style.overflow = "auto"
    }

    // Handle page change - only scroll the right panel
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
            // Scroll only the right panel to top
            const rightPanel = document.getElementById('right-panel')
            if (rightPanel) {
                rightPanel.scrollTo({ top: 0, behavior: 'smooth' })
            }
        }
    }

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = []
        const maxPagesToShow = 5

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push('...')
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                pages.push(1)
                pages.push('...')
                pages.push(currentPage - 1)
                pages.push(currentPage)
                pages.push(currentPage + 1)
                pages.push('...')
                pages.push(totalPages)
            }
        }

        return pages
    }

    // Check if URL is valid
    const isValidUrl = (url) => {
        if (!url || url === '--') return false
        try {
            new URL(url)
            return true
        } catch (e) {
            return false
        }
    }

    return (
        <div className="bg-black text-white font-manrope">
            <Head>
                <title>FOUND'D Connect - Builder's Space</title>
                <meta name="description" content="FOUND'D Connect - Builder's Space Member Directory" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
                
                html, body {
                  overflow: hidden;
                  height: 100%;
                }
                
                .font-manrope {
                  font-family: 'Manrope', sans-serif;
                }
                
                .member-card {
                  position: relative;
                  background: #0a0a0a;
                  border: 1px solid #1a1a1a;
                  border-radius: 8px;
                  overflow: hidden;
                  transition: all 0.3s ease;
                  cursor: pointer;
                }
                
                .member-card:hover {
                  transform: translateY(-4px);
                  border-color: #2a2a2a;
                  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
                }
                
                .search-input {
                  background: #0a0a0a;
                  border: 1px solid #1a1a1a;
                  border-radius: 8px;
                  padding: 12px 16px 12px 44px;
                  color: white;
                  transition: all 0.3s ease;
                  width: 100%;
                  font-size: 14px;
                }
                
                .search-input:focus {
                  outline: none;
                  background: #111;
                  border-color: #2a2a2a;
                }
                
                .search-input::placeholder {
                  color: #666;
                }
                
                .pagination-button {
                  padding: 10px 18px;
                  border-radius: 6px;
                  background: #0a0a0a;
                  border: 1px solid #1a1a1a;
                  color: white;
                  transition: all 0.2s ease;
                  cursor: pointer;
                  font-size: 14px;
                }
                
                .pagination-button:hover:not(:disabled) {
                  background: #111;
                  border-color: #2a2a2a;
                }
                
                .pagination-button:disabled {
                  opacity: 0.3;
                  cursor: not-allowed;
                }
                
                .pagination-button.active {
                  background: white;
                  color: black;
                  border-color: white;
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
                  align-items: flex-end;
                }
                
                @media (min-width: 768px) {
                  .modal-overlay {
                    align-items: center;
                    justify-content: center;
                  }
                }
                
                .modal-content {
                  background: #0a0a0a;
                  border: 1px solid #1a1a1a;
                  width: 100%;
                  max-height: 85vh;
                  overflow-y: auto;
                  transform: translateY(100%);
                  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                  border-radius: 20px 20px 0 0;
                }
                
                @media (min-width: 768px) {
                  .modal-content {
                    border-radius: 12px;
                    max-width: 900px;
                    max-height: 90vh;
                  }
                }
                
                .modal-content.show {
                  transform: translateY(0);
                }
                
                .social-link-badge {
                  display: inline-flex;
                  align-items: center;
                  gap: 8px;
                  padding: 10px 16px;
                  background: #111;
                  border: 1px solid #1a1a1a;
                  border-radius: 8px;
                  color: white;
                  text-decoration: none;
                  transition: all 0.2s ease;
                  font-size: 14px;
                }
                
                .social-link-badge:hover {
                  background: #1a1a1a;
                  border-color: #2a2a2a;
                  transform: translateY(-2px);
                }
                
                .info-badge {
                  display: inline-flex;
                  align-items: center;
                  gap: 8px;
                  padding: 8px 14px;
                  background: #111;
                  border-radius: 6px;
                  font-size: 14px;
                  color: rgba(255, 255, 255, 0.8);
                }
                
                .action-button {
                  padding: 12px 20px;
                  border-radius: 6px;
                  font-size: 14px;
                  font-weight: 500;
                  transition: all 0.2s ease;
                  cursor: pointer;
                }
                
                .action-button-primary {
                  background: white;
                  color: black;
                  border: 1px solid white;
                }
                
                .action-button-primary:hover {
                  background: #e5e5e5;
                }
                
                .action-button-secondary {
                  background: transparent;
                  color: white;
                  border: 1px solid #333;
                }
                
                .action-button-secondary:hover {
                  background: #111;
                  border-color: #444;
                }
                
                /* Custom scrollbar for right panel */
                #right-panel::-webkit-scrollbar {
                  width: 6px;
                }
                
                #right-panel::-webkit-scrollbar-track {
                  background: #0a0a0a;
                }
                
                #right-panel::-webkit-scrollbar-thumb {
                  background: #1a1a1a;
                  border-radius: 3px;
                }
                
                #right-panel::-webkit-scrollbar-thumb:hover {
                  background: #2a2a2a;
                }
                
                /* Modal scrollbar */
                .modal-content::-webkit-scrollbar {
                  width: 6px;
                }
                
                .modal-content::-webkit-scrollbar-track {
                  background: #0a0a0a;
                }
                
                .modal-content::-webkit-scrollbar-thumb {
                  background: #1a1a1a;
                  border-radius: 3px;
                }
                
                .modal-content::-webkit-scrollbar-thumb:hover {
                  background: #2a2a2a;
                }
                
                /* Mobile Hero Shutter Animation */
                @keyframes shutterClose {
                  from {
                    max-height: 300px;
                    opacity: 1;
                    transform: translateY(0);
                  }
                  to {
                    max-height: 0;
                    opacity: 0;
                    transform: translateY(-20px);
                  }
                }
                
                @keyframes shutterOpen {
                  from {
                    max-height: 0;
                    opacity: 0;
                    transform: translateY(-20px);
                  }
                  to {
                    max-height: 300px;
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                
                .hero-content {
                  overflow: hidden;
                }
                
                /* Mobile-only shutter animation styles */
                @media (max-width: 1023px) {
                  .hero-content {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                  }
                  
                  .hero-content.collapsed {
                    max-height: 0 !important;
                    opacity: 0;
                    padding-top: 0 !important;
                    padding-bottom: 0 !important;
                    margin: 0 !important;
                    transform: translateY(-20px);
                  }
                  
                  .hero-content.expanded {
                    max-height: 300px;
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                
                /* Desktop - always show hero normally */
                @media (min-width: 1024px) {
                  .hero-content {
                    max-height: none !important;
                    opacity: 1 !important;
                    transform: none !important;
                  }
                }
                
                .collapsed-header {
                  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                  overflow: hidden;
                }
                
                .collapsed-header.show {
                  max-height: 80px;
                  opacity: 1;
                }
                
                .collapsed-header.hide {
                  max-height: 0;
                  opacity: 0;
                  padding: 0 !important;
                }
                
                .mobile-hero-wrapper {
                  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>

            {/* Main Split Layout */}
            <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
                {/* Left Side - Fixed Hero Content */}
                <div className="w-full lg:w-2/5 bg-black flex flex-col h-auto lg:h-screen overflow-hidden mobile-hero-wrapper">

                    {/* Collapsed Header for Mobile - Shows when hero is collapsed */}
                    <div className={`lg:hidden collapsed-header ${heroCollapsed ? 'show' : 'hide'}`}>
                        <div className="flex items-center justify-between p-4 border-b border-gray-900/50 bg-black/95 backdrop-blur-sm">
                            <Link href="/">
                                <Image
                                    src="/logo.jpg"
                                    alt="Builder's Space Logo"
                                    width={32}
                                    height={32}
                                    className="cursor-pointer opacity-90 hover:opacity-100 transition-opacity invert"
                                />
                            </Link>
                            <div className="relative flex-1 ml-4">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search members..."
                                    className="search-input py-2 text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Full Hero Section - Hides when collapsed on mobile */}
                    <div className={`flex flex-col lg:flex ${heroCollapsed ? 'hidden lg:flex' : ''}`}>
                        {/* Logo */}
                        <div className="p-6 lg:p-8">
                            <Link href="/">
                                <Image
                                    src="/logo.jpg"
                                    alt="Builder's Space Logo"
                                    width={40}
                                    height={40}
                                    className="cursor-pointer opacity-90 hover:opacity-100 transition-opacity invert"
                                />
                            </Link>
                        </div>

                        {/* Hero Content - Centered */}
                        <div className={`hero-content flex-1 flex flex-col justify-center px-4 lg:px-8 pb-4 lg:pb-8 ${heroCollapsed ? 'collapsed' : 'expanded'}`}>
                            <div className='h-fit text-white pb-6 md:pb-12 px-4 lg:pl-11 flex flex-col items-start justify-center gap-3 md:gap-5'>
                                <h1 className='font-manrope font-bold text-3xl md:text-7xl'>hi. we are <br></br> Builder's Space.</h1>
                                <h2 className='hidden md:block font-manrope opacity-50 text-lg md:text-2xl'>Welcome to Builder's Space-where <br></br> creativity meets chaos! <br></br> Build Cool Stuff. With Cooler People.</h2>
                                <button className='bg-white w-full md:w-2/5 h-12 md:h-14 text-xl md:text-2xl text-black font-caveat font-bold hover:opacity-70 transition-all ease-linear hover:text-3xl' onClick={() => window.location.href = "/join-now"}>FOUND'D</button>
                            </div>

                            {/* Search Bar for Mobile/Tablet - Only when expanded */}
                            <div className={`lg:hidden mt-8 ${heroCollapsed ? 'hidden' : ''}`}>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search members..."
                                        className="search-input"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                {!loading && (
                                    <p className="text-gray-500 text-sm mt-3">
                                        {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Scrollable Members Panel */}
                <div
                    id="right-panel"
                    className={`w-full lg:w-3/5 bg-black lg:border-l border-gray-900 overflow-y-auto lg:h-screen transition-all duration-400 ${heroCollapsed ? 'h-[calc(100vh-64px)]' : 'h-[60vh]'}`}
                >
                    {/* Search Bar Header for Desktop */}
                    <div className="hidden lg:block sticky top-0 bg-black/95 backdrop-blur-sm z-10 p-6 pb-4 border-b border-gray-900/50">
                        <div className="flex items-center justify-between gap-4">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search members..."
                                    className="search-input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            {!loading && (
                                <p className="text-gray-500 text-sm whitespace-nowrap">
                                    {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="p-4 sm:p-6">
                        {/* Loading State */}
                        {loading && (
                            <div className="flex justify-center items-center py-20">
                                <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="bg-red-900/20 border border-red-900/50 text-white p-6 rounded-lg mb-8 text-center">
                                <p className="text-base mb-4">{error}</p>
                                <button
                                    onClick={fetchMembers}
                                    className="px-6 py-2 bg-white text-black rounded-lg hover:opacity-80 transition-opacity text-sm font-medium"
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        {/* Empty State */}
                        {!loading && filteredMembers.length === 0 && (
                            <div className="text-center py-20">
                                <h3 className="text-xl font-medium mb-2">No members found</h3>
                                <p className="text-gray-500">Try adjusting your search</p>
                            </div>
                        )}

                        {/* Members Grid */}
                        {!loading && filteredMembers.length > 0 && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                                    {getCurrentPageMembers().map((member) => (
                                        <div
                                            key={member.id}
                                            className="member-card"
                                            onClick={() => openMemberDetails(member)}
                                        >
                                            <div className="p-5">
                                                {/* Member Avatar */}
                                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4 text-xl font-bold">
                                                    {member.name ? member.name.charAt(0).toUpperCase() : '?'}
                                                </div>

                                                {/* Member Info */}
                                                <h3 className="text-base font-bold mb-1 truncate">
                                                    {member.name || 'Anonymous'}
                                                </h3>

                                                {member.designation && (
                                                    <p className="text-sm text-gray-400 mb-1 truncate">
                                                        {member.designation}
                                                    </p>
                                                )}

                                                {member.domain && (
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {member.domain}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 flex-wrap pb-8">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="pagination-button"
                                        >
                                            Previous
                                        </button>

                                        {getPageNumbers().map((page, index) => (
                                            page === '...' ? (
                                                <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                                                    ...
                                                </span>
                                            ) : (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                                                >
                                                    {page}
                                                </button>
                                            )
                                        ))}

                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="pagination-button"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Member Details Modal - Slide from Bottom */}
            {showMemberModal && selectedMember && (
                <div
                    className="modal-overlay"
                    onClick={closeMemberModal}
                >
                    <div
                        className={`modal-content ${modalAnimation ? 'show' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-black/95 backdrop-blur-sm z-10 p-6 border-b border-gray-900">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xl font-bold flex-shrink-0">
                                        {selectedMember.name ? selectedMember.name.charAt(0).toUpperCase() : '?'}
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold mb-1">
                                            {selectedMember.name || 'Anonymous'}
                                        </h2>
                                        {selectedMember.designation && (
                                            <p className="text-sm text-gray-400">
                                                {selectedMember.designation}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={closeMemberModal}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 hover:bg-gray-800 transition-colors flex-shrink-0"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            {/* Domain */}
                            {selectedMember.domain && (
                                <div>
                                    <h3 className="text-sm font-semibold mb-2 text-gray-500 uppercase tracking-wider">Domain</h3>
                                    <p className="text-base text-gray-300">
                                        {selectedMember.domain}
                                    </p>
                                </div>
                            )}

                            {/* Contact Information */}
                            <div>
                                <h3 className="text-sm font-semibold mb-3 text-gray-500 uppercase tracking-wider">Contact</h3>
                                <div className="space-y-2">
                                    {selectedMember.email && (
                                        <div className="info-badge">
                                            <Mail className="w-4 h-4 flex-shrink-0" />
                                            <a
                                                href={`mailto:${selectedMember.email}`}
                                                className="hover:underline truncate"
                                            >
                                                {selectedMember.email}
                                            </a>
                                        </div>
                                    )}

                                    {selectedMember.phone_number && (
                                        <div className="info-badge">
                                            <Phone className="w-4 h-4 flex-shrink-0" />
                                            <a
                                                href={`tel:${selectedMember.phone_number}`}
                                                className="hover:underline"
                                            >
                                                {selectedMember.phone_number}
                                            </a>
                                        </div>
                                    )}

                                    {selectedMember.location && (
                                        <div className="info-badge">
                                            <MapPin className="w-4 h-4 flex-shrink-0" />
                                            <span>{selectedMember.location}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* About Me */}
                            {selectedMember.about_me && (
                                <div>
                                    <h3 className="text-sm font-semibold mb-3 text-gray-500 uppercase tracking-wider">About</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {selectedMember.about_me}
                                    </p>
                                </div>
                            )}

                            {/* Social Links */}
                            {selectedMember.social_profile_links && selectedMember.social_profile_links.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold mb-3 text-gray-500 uppercase tracking-wider">Social Profiles</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedMember.social_profile_links.map((link, index) => (
                                            isValidUrl(link) && (
                                                <a
                                                    key={index}
                                                    href={link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="social-link-badge"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    <span>Link {index + 1}</span>
                                                </a>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Commudle Profile */}
                            {selectedMember.commudle_profile && isValidUrl(selectedMember.commudle_profile) && (
                                <div>
                                    <h3 className="text-sm font-semibold mb-3 text-gray-500 uppercase tracking-wider">Commudle</h3>
                                    <a
                                        href={selectedMember.commudle_profile}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link-badge"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        <span>View Profile</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}