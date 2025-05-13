"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/atoms/button"

type AudioContextType = {
  isPlaying: boolean
  toggleAudio: () => void
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  toggleAudio: () => {},
})

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create the audio element on the client side
    const audioElement = new Audio("/music/Promise of the world - Kimura Yumi.weba")
    audioElement.loop = true
    audioElement.volume = 0.2
    setAudio(audioElement)

    return () => {
      if (audioElement) {
        audioElement.pause()
      }
    }
  }, [])

  const toggleAudio = () => {
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch((e) => console.error("Audio play failed:", e))
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
      {children}
      <AudioControls />
    </AudioContext.Provider>
  )
}

export function useAudio() {
  return useContext(AudioContext)
}

function AudioControls() {
  const { isPlaying, toggleAudio } = useAudio()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
    >
      {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      <span className="sr-only">{isPlaying ? "Mute" : "Unmute"} background music</span>
    </Button>
  )
}
