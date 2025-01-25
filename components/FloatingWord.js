import React from "react"

const FloatingWord = ({ children, delay, top, left, size = "medium", isMobile }) => {
    const sizeClasses = {
        small: "text-[8px] sm:text-xs md:text-sm lg:text-xl",
        medium: "text-xs sm:text-sm md:text-base lg:text-2xl",
        large: "text-sm sm:text-base md:text-lg lg:text-3xl",
    }

    return (
        <div
            className={`absolute ${sizeClasses[size]} font-medium animate-float-custom opacity-0`}
            style={{
                top: `${isMobile ? top.sm : top.md}%`,
                left: `${isMobile ? left.sm : left.md}%`,
                animation: `
            float-custom 8s ease-in-out infinite ${delay}s,
            glow 3s ease-in-out infinite ${delay + 1}s,
            fade-in 1s ease-out ${delay}s forwards
          `,
                textShadow: "0 0 10px rgba(255, 215, 0, 0.5), 2px 2px 4px rgba(0,0,0,0.5)",
                color: "#FFD700",
            }}
        >
            {children}
        </div>
    )
}

export default FloatingWord

