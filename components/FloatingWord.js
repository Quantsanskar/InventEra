const FloatingWord = ({ children, delay, top, left, size = 'medium' }) => {
    const sizeClasses = {
        small: 'text-xl',
        medium: 'text-2xl',
        large: 'text-3xl'
    }

    return (
        <div
            className={`absolute ${sizeClasses[size]} font-medium animate-float-custom opacity-0`}
            style={{
                top: `${top}%`,
                left: `${left}%`,
                animation: `
            float-custom 8s ease-in-out infinite ${delay}s,
            glow 3s ease-in-out infinite ${delay + 1}s,
            fade-in 1s ease-out ${delay}s forwards
          `,
                textShadow: '0 0 10px rgba(255, 215, 0, 0.5), 2px 2px 4px rgba(0,0,0,0.5)',
                color: '#FFD700',
            }}
        >
            {children}
        </div>
    )
}

export default FloatingWord
