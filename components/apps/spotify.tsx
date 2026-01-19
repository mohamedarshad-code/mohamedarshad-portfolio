"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"

interface SpotifyProps {
  isDarkMode?: boolean
}

export default function Spotify({ isDarkMode = true }: SpotifyProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white"
  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const secondaryBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"

  // Song info
  const song = {
    title: "Kun Faya Kun",
    artist: "A.R. Rahman, Javed Ali, Mohit Chauhan",
    album: "Rockstar",
    file: "/kun-faya-kun.mp3", // Put your MP3 file in public folder
    cover: "/kun-faya-kun.png",
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnd = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnd)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnd)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error)
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const togglePlay = () => setIsPlaying(!isPlaying)

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setIsPlaying(true)
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const newTime = parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => setIsMuted(!isMuted)

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className={`h-full ${bgColor} ${textColor} flex flex-col`}>
      {/* Header */}
      <div className={`${secondaryBg} p-4 flex items-center gap-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <img src="/spotify.png" alt="Spotify" className="w-8 h-8" />
        <div>
          <h2 className="font-semibold">Music Player</h2>
          <p className="text-xs text-gray-500">Kun Faya Kun</p>
        </div>
      </div>

      {/* Main Player */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Album Art */}
        <div className="w-64 h-64 mb-8 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🎵</div>
            <p className="text-white font-semibold">{song.title}</p>
          </div>
        </div>

        {/* Song Info */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-2">{song.title}</h3>
          <p className="text-lg text-gray-400">{song.artist}</p>
          <p className="text-sm text-gray-500 mt-1">{song.album}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleTimeChange}
            className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${(currentTime / (duration || 1)) * 100
                }%, #4D4D4D ${(currentTime / (duration || 1)) * 100}%, #4D4D4D 100%)`,
            }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            className="p-3 rounded-full hover:bg-gray-700 text-gray-300 hover:text-white transition-all"
            onClick={handleRestart}
            title="Restart"
          >
            <SkipBack className="w-7 h-7" />
          </button>

          <button
            className="p-5 bg-white hover:scale-110 rounded-full transition-transform shadow-lg"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="w-10 h-10 text-black" />
            ) : (
              <Play className="w-10 h-10 text-black ml-1" />
            )}
          </button>

          <button
            className="p-3 rounded-full hover:bg-gray-700 text-gray-300 hover:text-white transition-all"
            onClick={handleRestart}
            title="Replay"
          >
            <SkipForward className="w-7 h-7" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center w-full max-w-xs gap-3">
          <button
            className="p-2 rounded-full hover:bg-gray-700 transition-all"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${(isMuted ? 0 : volume) * 100
                }%, #4D4D4D ${(isMuted ? 0 : volume) * 100}%, #4D4D4D 100%)`,
            }}
          />
        </div>
      </div>

      <audio ref={audioRef} src={song.file} preload="auto" />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #1DB954;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #1DB954;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}
