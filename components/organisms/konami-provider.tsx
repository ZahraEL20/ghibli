"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/atoms/button"

type KonamiContextType = {
  showEasterEgg: boolean
  setShowEasterEgg: (show: boolean) => void
}

const KonamiContext = createContext<KonamiContextType>({
  showEasterEgg: false,
  setShowEasterEgg: () => {},
})

export function KonamiProvider({ children }: { children: React.ReactNode }) {
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [konamiSequence, setKonamiSequence] = useState<string[]>([])

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add the new key to the sequence
      const newSequence = [...konamiSequence, e.key]

      // Only keep the last N keys where N is the length of the Konami code
      if (newSequence.length > konamiCode.length) {
        newSequence.shift()
      }

      setKonamiSequence(newSequence)

      // Check if the sequence matches the Konami code
      const isKonamiCode =
        newSequence.length === konamiCode.length && newSequence.every((key, index) => key === konamiCode[index])

      if (isKonamiCode) {
        setShowEasterEgg(true)
        // Play sound effect
        const audio = new Audio("/totoro-sound.mp3")
        audio.volume = 0.5
        audio.play().catch((e) => console.error("Audio play failed:", e))
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [konamiSequence])

  return (
    <KonamiContext.Provider value={{ showEasterEgg, setShowEasterEgg }}>
      {children}
      <TotoroEasterEgg />
    </KonamiContext.Provider>
  )
}

export function useKonami() {
  return useContext(KonamiContext)
}

function TotoroEasterEgg() {
  const { showEasterEgg, setShowEasterEgg } = useKonami()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouse)

    return () => {
      window.removeEventListener("mousemove", handleMouse)
    }
  }, [])

  const handleClose = () => {
    setShowEasterEgg(false)
  }

  const calculateParallax = (depth: number) => {
    const x = (mousePosition.x - window.innerWidth / 2) * depth
    const y = (mousePosition.y - window.innerHeight / 2) * depth
    return `translate(${x}px, ${y}px)`
  }

  return (
    <AnimatePresence>
      {showEasterEgg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="totoro-easter-egg"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={handleClose}
            className="absolute top-4 right-4 z-[9999] rounded-full bg-white/20 hover:bg-white/30"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="relative w-full h-full max-w-3xl max-h-[80vh] mx-auto">
            <div className="absolute inset-0 z-10" style={{ transform: calculateParallax(0.01) }}>
              <div className="w-full h-full relative">
                <Image
                  src="/placeholder.svg?height=800&width=1200&text=Forest+Background"
                  alt="Forest background"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute inset-0 z-20" style={{ transform: calculateParallax(0.03) }}>
              <div className="w-full h-full relative">
                <Image
                  src="/placeholder.svg?height=800&width=1200&text=Middle+Trees"
                  alt="Middle trees"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute inset-0 z-30" style={{ transform: calculateParallax(0.05) }}>
              <div className="w-full h-full relative">
                <Image
                  src="/placeholder.svg?height=800&width=1200&text=Totoro"
                  alt="Totoro"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="absolute inset-0 z-40" style={{ transform: calculateParallax(0.07) }}>
              <div className="w-full h-full relative">
                <Image
                  src="/placeholder.svg?height=800&width=1200&text=Foreground+Leaves"
                  alt="Foreground leaves"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
