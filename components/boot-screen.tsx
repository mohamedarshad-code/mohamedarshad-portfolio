"use client"

import { useEffect, useState } from "react"
import { Apple } from "lucide-react"

interface BootScreenProps {
  onComplete: () => void
  isDarkMode: boolean
}

export default function BootScreen({ onComplete, isDarkMode }: BootScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(onComplete, 300)
          return 100
        }
        return prev + 3
      })
    }, 40)

    return () => clearInterval(progressInterval)
  }, [onComplete])

  const bgColor = isDarkMode ? "bg-black" : "bg-white"
  const textColor = isDarkMode ? "text-white" : "text-black"

  return (
    <div className={`h-screen w-screen ${bgColor} flex flex-col items-center justify-center relative overflow-hidden`}>
      {/* Apple Logo and Progress Bar */}
      <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
        <div className="mb-12">
          <Apple
            className={textColor}
            size={100}
            strokeWidth={1.5}
          />
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Text */}
        <p className={`mt-6 text-sm ${textColor} opacity-50 animate-pulse`}>
          Starting up...
        </p>
      </div>

      <style jsx>{`
        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-in {
          animation-fill-mode: both;
        }

        .zoom-in {
          animation-name: zoom-in;
        }

        .fade-in {
          animation-name: fade-in;
        }

        .duration-500 {
          animation-duration: 500ms;
        }
      `}</style>
    </div>
  )
}
