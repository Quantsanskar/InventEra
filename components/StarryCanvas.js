'use client'

import { useEffect, useRef } from 'react'

export default function StarryCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        setCanvasSize()
        window.addEventListener('resize', setCanvasSize)

        // Create stars
        const stars = Array.from({ length: 200 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            brightness: Math.random()
        }))

        // Animation loop
        let animationFrame
        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            stars.forEach(star => {
                // Update position
                star.x += star.speedX
                star.y += star.speedY
                star.brightness = Math.sin(Date.now() * 0.001 + star.x) * 0.5 + 0.5

                // Wrap around screen
                if (star.x < 0) star.x = canvas.width
                if (star.x > canvas.width) star.x = 0
                if (star.y < 0) star.y = canvas.height
                if (star.y > canvas.height) star.y = 0

                // Draw star
                ctx.beginPath()
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`
                ctx.fill()
            })

            animationFrame = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', setCanvasSize)
            cancelAnimationFrame(animationFrame)
        }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
