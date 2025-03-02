"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignOutButton({ className }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSignOut = async () => {
        setIsLoading(true)
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

            // Redirect to sign in page
            setIsLoading(false)
            router.push("/SignInPage/SignIn")
        }
    }

    return (
        <Button
            variant="destructive"
            className={`w-full bg-gradient-to-r from-red-900/60 to-red-950/60 hover:from-red-800/80 hover:to-red-900/80 text-red-100 border border-red-800/50 transition-all duration-300 h-10 ${className}`}
            onClick={handleSignOut}
            disabled={isLoading}
        >
            <LogOut className="h-4 w-4 mr-2" />
            {isLoading ? "Signing Out..." : "Sign Out"}
        </Button>
    )
}
