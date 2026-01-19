"use client"

import { useState } from "react"
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react"

interface MailProps {
  isDarkMode?: boolean
}

export default function MailApp({ isDarkMode = true }: MailProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white"
  const inputBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-300"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMessage("")

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email')
      }

      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus("idle")
      }, 5000)
    } catch (error: any) {
      console.error("Email send error:", error)
      setStatus("error")
      setErrorMessage(error.message || "Failed to send email. Please try again.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className={`h-full ${bgColor} ${textColor} flex flex-col`}>
      {/* Header */}
      <div className={`p-4 border-b ${borderColor} flex items-center gap-3`}>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Contact Form</h2>
          <p className="text-sm text-gray-500">Get in touch with me</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto p-6">
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center h-full animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300 shadow-lg">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Message Sent Successfully!
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-2">
              Thank you for reaching out! I'll get back to you within 24-48 hours.
            </p>
            <p className="text-sm text-gray-400 text-center max-w-md">
              You should receive an automatic confirmation email shortly at <strong>{formData.email || 'your email'}</strong>
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
            {status === "error" && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 animate-in slide-in-from-top duration-300">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-500">Failed to send message</p>
                  <p className="text-sm text-red-400 mt-1">{errorMessage}</p>
                  <p className="text-xs text-red-300 mt-2">
                    Make sure you've set up the Gmail credentials in .env.local
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-semibold">Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg ${inputBg} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${textColor} transition-all`}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">Your Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg ${inputBg} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${textColor} transition-all`}
                placeholder="john@example.com"
              />
              <p className="text-xs text-gray-500">You'll receive an auto-reply confirmation at this email</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg ${inputBg} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${textColor} transition-all`}
                placeholder="Project Inquiry / Collaboration / Question"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={8}
                className={`w-full px-4 py-3 rounded-lg ${inputBg} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${textColor} resize-none transition-all`}
                placeholder="Tell me about your project, inquiry, or how I can help you..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-blue-400 disabled:to-purple-500 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              {status === "sending" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending your message...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>

            <div className={`p-5 rounded-lg ${inputBg} border ${borderColor} bg-gradient-to-br from-blue-50/5 to-purple-50/5`}>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">Direct Contact</p>
                  <p className="text-sm text-gray-500">
                    <strong>Email:</strong> mohamedarshad1507@gmail.com
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    ✓ You'll receive an instant auto-reply confirmation<br />
                    ✓ I typically respond within 24-48 hours<br />
                    ✓ All inquiries are welcome!
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
