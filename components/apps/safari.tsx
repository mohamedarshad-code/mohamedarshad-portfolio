"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight, RefreshCw, Home, Star, Plus, Search, Wifi } from "lucide-react"

interface SafariProps {
  isDarkMode?: boolean
}

export default function Safari({ isDarkMode = true }: SafariProps) {
  const [url, setUrl] = useState("https://github.com/mohamedarshad-code")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [wifiEnabled, setWifiEnabled] = useState(true)

  // Get WiFi status from localStorage or default to true
  useEffect(() => {
    const checkWifiStatus = () => {
      const status = localStorage.getItem("wifiEnabled")
      setWifiEnabled(status === null ? true : status === "true")
    }

    checkWifiStatus()

    // Check every second in case it changes
    const interval = setInterval(checkWifiStatus, 1000)

    return () => clearInterval(interval)
  }, [])

  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white"
  const toolbarBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const inputBg = isDarkMode ? "bg-gray-700" : "bg-gray-200"
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200"
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const hoverBg = isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // Updated bookmarks with social links
  const socialLinks = [
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/mohamed-arshad-3b8269380/",
      icon: "/linkedin.png",
    },
    {
      title: "GitHub",
      url: "https://github.com/mohamedarshad-code",
      icon: "/github.png",
    },
  ]

  // Projects
  const projects = [
    {
      title: "Spotify Clone",
      description: "Full-featured music streaming app with playlists and search",
      tech: "React • Next.js • TypeScript",
      liveUrl: "https://spotify-clone-rho-swart.vercel.app/",
      githubUrl: "https://github.com/mohamedarshad-code/spotify-clone",
      icon: "/spotify.png",
    },
    {
      title: "New Future Travels",
      description: "Travel booking platform with tour packages and management",
      tech: "MERN Stack • Tailwind CSS",
      liveUrl: "https://new-future-travels-website.vercel.app/",
      githubUrl: "https://github.com/mohamedarshad-code/new-future-travels-website",
      icon: "/safari.png",
    },
    {
      title: "Madras Coffee House",
      description: "Premium coffee shop website with heritage light aesthetic",
      tech: "React • Next.js • Tailwind CSS",
      liveUrl: "https://madrascoffehouse.vercel.app/",
      githubUrl: "https://github.com/mohamedarshad-code/madrascoffehouse",
      icon: "/madras-coffee-project.png",
    },
  ]

  const frequentlyVisited = [
    {
      title: "GitHub",
      url: "https://github.com",
      icon: "/github.png",
    },
    {
      title: "LinkedIn",
      url: "https://linkedin.com",
      icon: "/linkedin.png",
    },
    {
      title: "YouTube",
      url: "https://youtube.com",
      icon: "/youtube.png",
    },
    {
      title: "Reddit",
      url: "https://reddit.com",
      icon: "/reddit.png",
    },
    {
      title: "ChatGPT",
      url: "https://chatgpt.com",
      icon: "/chatgpt.png",
    },
    {
      title: "Stack Overflow",
      url: "https://stackoverflow.com",
      icon: "/stackoverflow.png",
    },
  ]

  // Add a no internet connection view
  const NoInternetView = () => (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div
        className={`w-24 h-24 mb-6 flex items-center justify-center rounded-full ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}
      >
        <Wifi className={`w-12 h-12 ${isDarkMode ? "text-gray-600" : "text-gray-500"}`} />
      </div>
      <h2 className={`text-xl font-semibold mb-2 ${textColor}`}>You Are Not Connected to the Internet</h2>
      <p className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-6`}>
        This page can't be displayed because your computer is currently offline.
      </p>
      <button
        className={`px-4 py-2 rounded ${isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        onClick={handleRefresh}
      >
        Try Again
      </button>
    </div>
  )

  return (
    <div className={`h-full flex flex-col ${bgColor} ${textColor}`}>
      {/* Toolbar */}
      <div className={`${toolbarBg} border-b ${borderColor} p-2 flex items-center space-x-2`}>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
          onClick={handleRefresh}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <Home className="w-4 h-4" />
        </button>

        <div className={`flex-1 flex items-center ${inputBg} rounded px-3 py-1`}>
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={`w-full bg-transparent focus:outline-none text-sm ${textColor}`}
          />
        </div>

        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <Star className="w-4 h-4" />
        </button>
      </div>

      {/* Tab bar */}
      <div className={`${toolbarBg} border-b ${borderColor} px-2 flex items-center`}>
        <div
          className={`px-3 py-1 text-sm rounded-t flex items-center ${activeTab === "home" ? (isDarkMode ? "bg-gray-900" : "bg-white") : ""}`}
        >
          <span className="mr-2">Home</span>
          <button className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-gray-500">
            <span className="text-xs">×</span>
          </button>
        </div>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {!wifiEnabled ? (
          <NoInternetView />
        ) : (
          activeTab === "home" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">SNS Links</h2>

              <div className="grid grid-cols-5 sm:grid-cols-7 gap-6 mb-12">
                {socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center p-4 rounded-lg ${hoverBg} cursor-pointer`}
                    onClick={() => window.open(link.url, "_blank")}
                  >
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                      <img src={link.icon || "/placeholder.svg"} alt={link.title} className="w-8 h-8 object-contain" />
                    </div>
                    <span className="text-sm text-center">{link.title}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-6">Frequently Visited</h2>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 mb-12">
                {frequentlyVisited.map((site, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center p-4 rounded-lg ${hoverBg} cursor-pointer`}
                    onClick={() => window.open(site.url, "_blank")}
                  >
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                      <img src={site.icon || "/placeholder.svg"} alt={site.title} className="w-8 h-8 object-contain" />
                    </div>
                    <span className="text-sm text-center">{site.title}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-6">My Projects</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className={`${cardBg} rounded-xl p-6 border ${borderColor} hover:border-blue-500 transition-all cursor-pointer group`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <img src={project.icon || "/placeholder.svg"} alt={project.title} className="w-8 h-8 object-contain" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-500 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-500">{project.tech}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">{project.description}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.liveUrl, "_blank")
                        }}
                        className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        View Live
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.githubUrl, "_blank")
                        }}
                        className={`flex-1 px-4 py-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg text-sm font-medium transition-colors`}
                      >
                        GitHub
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 max-w-2xl mx-auto">
                <div className={`p-6 rounded-lg ${cardBg}`}>
                  <h3 className="text-xl font-semibold mb-4">Mohamed Arshad M - Portfolio</h3>
                  <p className="mb-4">
                    Welcome to my portfolio! I'm a Full Stack & Flutter Developer specializing in building scalable
                    web and mobile applications with modern technologies.
                  </p>
                  <p className="mb-4">
                    With expertise in React, Next.js, Flutter, Firebase, and TypeScript, I deliver end-to-end solutions
                    from concept to deployment.
                  </p>
                  <div className="flex justify-end">
                    <button
                      className={`px-4 py-2 rounded ${isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                    >
                      View Projects
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
