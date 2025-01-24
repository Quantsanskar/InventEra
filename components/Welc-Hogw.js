"use client"

import { useEffect } from "react"

export default function WelcomePage() {
    useEffect(() => {
        // Load Irish Grover font
        const font = new FontFace("Irish Grover", "url(https://fonts.googleapis.com/css2?family=Irish+Grover&display=swap)")
        font.load().then(() => {
            document.fonts.add(font)
        })
    }, [])

    return (
        <main
            className="min-h-screen w-full bg-cover bg-center relative"
            style={{
                backgroundImage:
                    "url(/reference/hogwarts_bg2.jpg)",
            }}
        >
            <div className="absolute inset-0 flex items-center justify-center pt-10">
                <div
                    className="rounded-lg border border-[#FEFEFE] flex flex-col items-center"
                    style={{
                        width: "90%", // Adjust to make it take less space than the background
                        height: "90vh", // Set relative height
                        backgroundColor: "#676767A6",
                        backdropFilter: "blur(2px)",
                    }}
                >
                    <h1
                        className="text-center mt-0 text-[60px]"
                        style={{
                            fontFamily: "Irish Grover, cursive",
                            fontWeight: 400,
                            lineHeight: "1.2",
                            color: "#DEDBD2",
                            // border: "1px solid #000000",
                            filter: "drop-shadow(5px 7px 4px rgba(0, 0, 0, 0.58))",
                        }}
                    >
                        THE HOUSE OF NIGHT
                    </h1>
                </div>
            </div>
        </main>
    )
}

