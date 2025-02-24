import Image from "next/image"
import Link from "next/link"
import { Instagram, Github, Twitter, Linkedin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

// Profile component
const ProfileIcon = () => {
    const [showProfile, setShowProfile] = useState(false)
    const [profileData, setProfileData] = useState({
        email: "user@example.com",
        displayName: "John Doe",
        house: "Phoenix House",
        group: "Creators Guild",
        profileImage: "/carousel/SANSKAR.png",
    })

    const randomImages = [
        "/images/main-bg.jpg",
     
    ]

    useEffect(() => {
        // Random image selection on component mount
        const randomImg = randomImages[Math.floor(Math.random() * randomImages.length)]
        setProfileData(prev => ({ ...prev, profileImage: randomImg }))

        // Fetch user data from API (commented for development)
        /*
        const fetchUserData = async () => {
            try {
                const response = await fetch('your-api-endpoint/user')
                const data = await response.json()
                setProfileData(data)
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }
        fetchUserData()
        */
    }, [])

    return (
        <div className="absolute right-2 lg:right-6 bottom-[-20%] lg:bottom-[-25%]">
            <div className="relative">
                <button
                    // onMouseEnter={() => setShowProfile(true)}
                    // onMouseLeave={() => setShowProfile(false)}
                    onClick={() => setShowProfile(!showProfile)}
                    className="w-20 h-20 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-white hover:border-primary transition-all duration-300"
                >
                    <Image
                        src={profileData.profileImage}
                        alt="Profile"
                        width={48}
                        height={48}
                        className="object-cover flex items-center justify-center w-full h-full"
                    />
                </button>

                {showProfile && (
                    <div className="absolute right-0 mt-2 w-64 bg-zinc-900/95 backdrop-blur-sm rounded-xl border border-zinc-800 p-4 shadow-xl">
                        <div className="flex flex-col items-center gap-2">
                            <Image
                                src={profileData.profileImage}
                                alt="Profile"
                                width={64}
                                height={64}
                                className="object-contain flex items-center justify-center w-full h-full"
                            />
                            <h3 className="font-semibold text-lg">{profileData.displayName}</h3>
                            <p className="text-sm text-zinc-400">{profileData.email}</p>
                            <div className="text-sm text-zinc-300">
                                <p>{profileData.house}</p>
                                <p>{profileData.group}</p>
                            </div>
                            <Button 
                                variant="destructive" 
                                className="mt-2 w-full"
                                onClick={() => console.log('Sign out clicked')}
                            >
                                Sign Out
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const Dashboard = () => {
    return (
        <div className="min-h-screen font-inconsolata bg-black text-white flex flex-col items-center px-4">
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

            <Card className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-8 mb-8 max-w-2xl w-full">
                <div className="space-y-4 text-center">
                    <p className="text-lg">Hi :)</p>
                    <p>
                        First off—huge shoutout for putting yourself out there and applying to the very first season of Nights by
                        Builder's Space. Taking the leap to bring your ideas to life isn't easy, and we see you.
                    </p>
                    <p>
                        We went through hundreds of applications—from artists, filmmakers, engineers, founders, designers,
                        researchers, content creators, and more. And guess what? You're in.
                    </p>
                    <p>We can't wait to see what you dream up, build, and make happen over the next six weeks.</p>
                    <p>So go for it. Have fun. Make something awesome.</p>
                    <p>
                        Good luck & let's get to work.
                        <br />- The Builder's Space Team
                        <br />
                        xoxo
                    </p>
                </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-4 mb-8 w-full max-w-4xl">
                <Card className="bg-zinc-900/30 border border-zinc-800 w-2/3 flex items-center justify-center">
                    <p className="text-xl text-zinc-400">Video Here</p>
                </Card>
                <Card className="bg-zinc-900/30 border border-zinc-800 aspect-square flex items-center justify-center">
                    <p className="text-xl text-zinc-400">Description</p>
                </Card>
            </div>

            <div className="flex items-center justify-center gap-6 bg-zinc-900/50 backdrop-blur-sm px-8 py-4 rounded-full">
                <Link href="#" className="hover:text-primary transition-colors">
                    <Instagram className="w-6 h-6" />
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                    <Github className="w-6 h-6" />b
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                    <Twitter className="w-6 h-6" />
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                    <Linkedin className="w-6 h-6" />
                </Link>
            </div>
        </div>
    )
}

export default Dashboard;