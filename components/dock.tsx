"use client"

import type React from "react"

import { useState, useRef } from "react"
import type { AppWindow } from "@/types"

// Updated app list with Snake game
const dockApps = [
  { id: "launchpad", title: "Launchpad", icon: "/launchpad.png", component: "Launchpad", isSystem: true },
  { id: "safari", title: "Safari", icon: "/safari.png", component: "Safari" },
  { id: "mail", title: "Mail", icon: "/mail.png", component: "Mail" },
  { id: "vscode", title: "VS Code", icon: "/vscode.png", component: "VSCode" },
  { id: "notes", title: "Notes", icon: "/notes.png", component: "Notes" },
  { id: "facetime", title: "FaceTime", icon: "/facetime.png", component: "FaceTime" },
  { id: "terminal", title: "Terminal", icon: "/terminal.png", component: "Terminal" },
  { id: "github", title: "GitHub", icon: "/github.png", component: "GitHub" },
  { id: "youtube", title: "YouTube", icon: "/youtube.png", component: "YouTube" },
  { id: "spotify", title: "Spotify", icon: "/spotify.png", component: "Spotify" },
  { id: "snake", title: "Snake", icon: "/snake.png", component: "Snake" },
]

interface DockProps {
  onAppClick: (app: AppWindow) => void
  onLaunchpadClick: () => void
  activeAppIds: string[]
  isDarkMode: boolean
}

export default function Dock({ onAppClick, onLaunchpadClick, activeAppIds, isDarkMode }: DockProps) {
  const [mouseX, setMouseX] = useState<number | null>(null)
  const dockRef = useRef<HTMLDivElement>(null)

  const handleAppClick = (app: (typeof dockApps)[0]) => {
    if (app.id === "launchpad") {
      onLaunchpadClick()
      return
    }

    onAppClick({
      id: app.id,
      title: app.title,
      component: app.component,
      position: { x: Math.random() * 200 + 100, y: Math.random() * 100 + 50 },
      size: { width: 800, height: 600 },
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      setMouseX(x)
    }
  }

  const handleMouseLeave = () => {
    setMouseX(null)
  }

  // Calculate scale for each icon based on distance from mouse
  const getIconScale = (index: number, iconCount: number) => {
    if (mouseX === null) return 1

    // Get the dock width and calculate the position of each icon
    const dockWidth = dockRef.current?.offsetWidth || 0
    const iconWidth = dockWidth / iconCount
    const iconPosition = iconWidth * (index + 0.5) // Center of the icon

    // Distance from mouse to icon center
    const distance = Math.abs(mouseX - iconPosition)

    // Maximum scale and distance influence
    const maxScale = 2
    const maxDistance = iconWidth * 2.5

    // Calculate scale based on distance (closer = larger)
    if (distance > maxDistance) return 1

    // Smooth parabolic scaling function
    const scale = 1 + (maxScale - 1) * Math.pow(1 - distance / maxDistance, 2)

    return scale
  }

  return (
    <div
      ref={dockRef}
      className={`fixed bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-2xl 
        ${isDarkMode ? "bg-white/10" : "bg-white/60"} backdrop-blur-xl 
        flex items-end z-50 border border-white/20 shadow-lg h-16`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {dockApps.map((app, index) => {
        const scale = getIconScale(index, dockApps.length)

        return (
          <div
            key={app.id}
            className="flex flex-col items-center justify-end h-full px-2"
            style={{
              transform: `translateY(${(scale - 1) * -8}px)`,
              zIndex: scale > 1 ? 10 : 1,
              transition: mouseX === null ? "transform 0.2s ease-out" : "none",
            }}
            onClick={() => handleAppClick(app)}
          >
            <div
              className="relative cursor-pointer"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "bottom center",
                transition: mouseX === null ? "transform 0.2s ease-out" : "none",
              }}
            >
              <img
                src={app.icon || "/placeholder.svg"}
                alt={app.title}
                className="w-12 h-12 object-contain"
                draggable="false"
              />

              {/* Tooltip */}
              {scale > 1.5 && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black/70 text-white text-xs rounded whitespace-nowrap">
                  {app.title}
                </div>
              )}

              {/* Indicator dot for active apps */}
              {activeAppIds.includes(app.id) && (
                <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
