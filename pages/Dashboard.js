import Image from "next/image"
import Link from "next/link"
import { Instagram, Github, Twitter, Linkedin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/homepage/Navigation"
import { Footer } from "@/components/footer"
import SocialLinksEditor from "@/components/dashboard/socialhandles"
import EditableYoutubeCard from "@/components/dashboard/videos"
import EditableDescriptionCard from "@/components/dashboard/description"
import ProfileIcon from "@/components/dashboard/profileicon"
// Profile component
// const ProfileIcon = () => {
//     const [showProfile, setShowProfile] = useState(false)
//     const [profileData, setProfileData] = useState({
//         email: "user@example.com",
//         displayName: "John Doe",
//         house: "Phoenix House",
//         group: "Creators Guild",
//         profileImage: "/carousel/SANSKAR.png",
//     })

//     const randomImages = [
//         "/images/main-bg.jpg",

//     ]

//     useEffect(() => {
//         // Random image selection on component mount
//         const randomImg = randomImages[Math.floor(Math.random() * randomImages.length)]
//         setProfileData(prev => ({ ...prev, profileImage: randomImg }))

//         // Fetch user data from API (commented for development)
//         /*
//         const fetchUserData = async () => {
//             try {
//                 const response = await fetch('your-api-endpoint/user')
//                 const data = await response.json()
//                 setProfileData(data)
//             } catch (error) {
//                 console.error('Error fetching user data:', error)
//             }
//         }
//         fetchUserData()
//         */
//     }, [])

//     return (


//         <div className="absolute right-2 lg:right-6 bottom-[-20%] lg:bottom-[-25%]">

//             <div className="relative">
//                 <button
//                     // onMouseEnter={() => setShowProfile(true)}
//                     // onMouseLeave={() => setShowProfile(false)}
//                     onClick={() => setShowProfile(!showProfile)}
//                     className="w-20 h-20 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-white hover:border-primary transition-all duration-300"
//                 >
//                     <Image
//                         src={profileData.profileImage}
//                         alt="Profile"
//                         width={48}
//                         height={48}
//                         className="object-cover flex items-center justify-center w-full h-full"
//                     />
//                 </button>

//                 {showProfile && (
//                     <div
//                         className="absolute right-0 mt-2 w-72 bg-zinc-900/95 backdrop-blur-sm rounded-xl border border-zinc-800 shadow-2xl transform transition-all duration-200 ease-in-out"
//                         role="dialog"
//                         aria-modal="true"
//                     >
//                         <div className="p-5 space-y-4">
//                             {/* Header with avatar and name */}
//                             <div className="flex items-center gap-3">
//                                 <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-zinc-700 ring-2 ring-zinc-500/20">
//                                     <Image
//                                         src={profileData.profileImage}
//                                         alt={`${profileData.displayName}'s profile`}
//                                         layout="fill"
//                                         objectFit="cover"
//                                         priority
//                                         className="object-center"
//                                     />
//                                 </div>
//                                 <div className="flex-1 min-w-0">
//                                     <h3 className="font-semibold text-lg text-white truncate">{profileData.displayName}</h3>
//                                     <p className="text-sm text-zinc-400 truncate">{profileData.email}</p>
//                                 </div>
//                             </div>

//                             {/* Divider */}
//                             <div className="h-px bg-gradient-to-r from-zinc-800/50 via-zinc-600/50 to-zinc-800/50"></div>

//                             {/* User details */}
//                             <div className="grid grid-cols-2 gap-2 text-sm px-1">
//                                 <div className="flex items-center gap-2">
//                                     <div className="w-8 h-8 rounded-md bg-zinc-800/80 flex items-center justify-center">
//                                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-zinc-400">
//                                             <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
//                                             <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v4.5a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198c.031-.028.061-.056.091-.086L12 5.432z" />
//                                         </svg>
//                                     </div>
//                                     <span className="text-zinc-300">{profileData.house}</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <div className="w-8 h-8 rounded-md bg-zinc-800/80 flex items-center justify-center">
//                                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-zinc-400">
//                                             <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
//                                             <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
//                                         </svg>
//                                     </div>
//                                     <span className="text-zinc-300">{profileData.group}</span>
//                                 </div>
//                             </div>

//                             {/* Action buttons */}
//                             <div className="pt-2 space-y-2">
//                                 <Button
//                                     variant="outline"
//                                     className="w-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white border-zinc-700 transition-colors"
//                                     onClick={() => console.log('View profile clicked')}
//                                 >
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                         <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                                         <circle cx="12" cy="7" r="4"></circle>
//                                     </svg>
//                                     View Profile
//                                 </Button>

//                                 <Button
//                                     variant="destructive"
//                                     className="w-full bg-red-900/60 hover:bg-red-800/80 text-red-100 transition-colors"
//                                     onClick={() => console.log('Sign out clicked')}
//                                 >
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                         <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
//                                         <polyline points="16 17 21 12 16 7"></polyline>
//                                         <line x1="21" y1="12" x2="9" y2="12"></line>
//                                     </svg>
//                                     Sign Out
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

const Dashboard = () => {
    return (

        <div className="min-h-screen font-inconsolata bg-black text-white flex flex-col items-center px-4">
            <div><Navigation /></div>
            {/* Header Image with Profile Icon */}
            <div className="w-[95vw] relative h-[200px] mb-8 mx-auto">
                <Image
                    src="/images/main-bg.jpg"
                    alt="Decorative header with books and coffee"
                    fill
                    priority
                    className="object-cover opacity-50 rounded-lg"
                />
                <ProfileIcon />
            </div>

            {/* Rest of your existing components... */}
            <div className="text-center lg:mt-12 mb-8 max-w-2xl">
                <h1 className="text-4xl font-mono mb-4">Welcome to Nights - Season 1.</h1>
                <p className="text-lg mb-2">Oh, you made it? Damn right, you did ^_^</p>
                <p className="text-center">
                    This page? It's got everything you need to know.
                    <br />
                    Yeah, it's a lot, but we trust you can handle it.
                    <br />
                    To make it less of a drag, here's a song. Hit play, tune in, and let's get to it.
                </p>
            </div>

            <div className="flex items-center justify-center rounded-xl mb-8 max-w-2xl w-full">

                <Image
                    src="/Welcome/Group 131.png"
                    alt="Builder's Space Logo"
                    width={480}
                    height={480}
                    className="object-contain"
                />



            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 flex items-center gap-4 mb-8 w-full max-w-4xl">
                <EditableYoutubeCard/>
                
                <EditableDescriptionCard/>

            </div>
            <div className="relative group">
                <SocialLinksEditor/>
            </div>
            <div><Footer /></div>
        </div>
    )
}

export default Dashboard;