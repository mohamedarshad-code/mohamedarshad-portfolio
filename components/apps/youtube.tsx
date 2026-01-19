"use client"

import { useEffect, useRef } from "react"

interface YouTubeProps {
  isDarkMode?: boolean
}

export default function YouTube({ isDarkMode = true }: YouTubeProps) {
  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white"
  const hasOpenedRef = useRef(false)

  // Open YouTube homepage when the app is opened
  useEffect(() => {
    // Only open once
    if (!hasOpenedRef.current) {
      hasOpenedRef.current = true

      // Open YouTube homepage
      window.open("https://www.youtube.com", "_blank")
    }
  }, [])

  return (
    <div className={`h-full ${bgColor} ${textColor} p-6 flex items-center justify-center`}>
      <div className="text-center">
        <img src="/youtube.png" alt="YouTube" className="w-16 h-16 mx-auto mb-4 object-contain" />
        <h2 className="text-xl font-semibold mb-2">Opening YouTube...</h2>
        <p>Redirecting to YouTube</p>
      </div>
    </div>
  )
}
