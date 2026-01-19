"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface TerminalProps {
  isDarkMode?: boolean
}

export default function Terminal({ isDarkMode = true }: TerminalProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const bgColor = "bg-black"
  const textColor = "text-green-400"

  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus()
    }

    const terminal = terminalRef.current
    if (terminal) {
      terminal.addEventListener("click", handleClick)

      setHistory([
        "Last login: " + new Date().toLocaleString(),
        "Welcome to macOS Terminal",
        "Type 'help' to see available commands",
        "",
      ])
    }

    return () => {
      if (terminal) {
        terminal.removeEventListener("click", handleClick)
      }
    }
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      executeCommand(input)
      setCommandHistory((prev) => [...prev, input])
      setHistoryIndex(-1)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      navigateHistory(-1)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      navigateHistory(1)
    }
  }

  const navigateHistory = (direction: number) => {
    if (commandHistory.length === 0) return

    const newIndex = historyIndex + direction

    if (newIndex >= commandHistory.length) {
      setHistoryIndex(-1)
      setInput("")
    } else if (newIndex >= 0) {
      setHistoryIndex(newIndex)
      setInput(commandHistory[commandHistory.length - 1 - newIndex])
    }
  }

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    const args = command.split(" ")
    const mainCommand = args[0]

    setHistory((prev) => [...prev, `arshad@macbook-pro ~ $ ${cmd}`, ""])

    switch (mainCommand) {
      case "help":
        setHistory((prev) => [
          ...prev,
          "Available commands:",
          "  help - Show this help message",
          "  clear - Clear the terminal",
          "  echo [text] - Print text",
          "  date - Show current date and time",
          "  ls - List files",
          "  whoami - Show current user",
          "  about - About me",
          "  skills - My technical skills",
          "  contact - Contact information",
          "",
        ])
        break

      case "clear":
        setHistory([""])
        break

      case "echo":
        const echoText = args.slice(1).join(" ")
        setHistory((prev) => [...prev, echoText, ""])
        break

      case "date":
        setHistory((prev) => [...prev, new Date().toString(), ""])
        break

      case "ls":
        setHistory((prev) => [...prev, "Documents", "Projects", "Downloads", "Desktop", "Music", "Pictures", "Videos", ""])
        break

      case "whoami":
        setHistory((prev) => [...prev, "arshad", ""])
        break

      case "about":
        setHistory((prev) => [
          ...prev,
          "┌─────────────────────────────────────┐",
          "│ Mohamed Arshad M                    │",
          "│ Full Stack & Flutter Developer      │",
          "└─────────────────────────────────────┘",
          "",
          "I'm a passionate Full Stack & Flutter Developer",
          "based in Coimbatore, India. I specialize in",
          "building scalable web and mobile applications",
          "with modern technologies. With expertise in",
          "React, Next.js, Flutter, Firebase, and TypeScript,",
          "I deliver end-to-end solutions from concept to",
          "deployment. I'm always eager to learn new",
          "technologies and improve my craft.",
          "",
        ])
        break

      case "skills":
        setHistory((prev) => [
          ...prev,
          "┌──────────────┐",
          "│   Skills     │",
          "└──────────────┘",
          "",
          "Frontend:",
          "• React / Next.js",
          "• Flutter / Dart",
          "• TypeScript / JavaScript",
          "• Tailwind CSS / Material Design",
          "• UI/UX Design",
          "• Responsive Web Development",
          "• Progressive Web Apps (PWA)",
          "",
          "Backend:",
          "• Node.js / Express",
          "• Firebase / Firestore",
          "• Supabase",
          "• RESTful APIs / GraphQL",
          "• SQL (MySQL, PostgreSQL)",
          "• NoSQL (MongoDB, Firebase)",
          "• Serverless Architecture",
          "",
          "Mobile Development:",
          "• Flutter (iOS & Android)",
          "• Native Features Integration",
          "• State Management (Provider, Riverpod, Bloc)",
          "• Firebase Integration",
          "• App Store & Play Store Deployment",
          "",
          "DevOps & Tools:",
          "• Git / GitHub",
          "• Docker",
          "• CI/CD Pipelines",
          "• Agile / Scrum Methodologies",
          "• Cloud Services (Firebase, AWS)",
          "",
        ])
        break

      case "contact":
        setHistory((prev) => [
          ...prev,
          "┌─────────┐",
          "│ Contact │",
          "└─────────┘",
          "",
          "Email: mohamedarshad1507@gmail.com",
          "GitHub: github.com/mohamedarshad-code",
          "LinkedIn: linkedin.com/in/mohamed-arshad-3b8269380",
          "Location: Coimbatore, Tamil Nadu, India",
          "",
        ])
        break

      default:
        setHistory((prev) => [
          ...prev,
          `Command not found: ${mainCommand}`,
          'Type "help" to see available commands',
          "",
        ])
    }
  }

  return (
    <div ref={terminalRef} className={`h-full ${bgColor} ${textColor} p-4 font-mono text-sm overflow-auto`}>
      {history.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {line}
        </div>
      ))}

      <div className="flex">
        <span className="mr-2">arshad@macbook-pro ~ $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none caret-green-400 text-green-400"
          autoFocus
        />
      </div>
    </div>
  )
}
