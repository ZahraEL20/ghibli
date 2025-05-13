"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Calculate parallax offsets
  const skyOffset = scrollY * 0.3
  const forestOffset = scrollY * 0.6
  const cloudsOffset = scrollY * 0.2

  // Calculate mouse parallax
  const mouseXSky = mousePos.x * 5
  const mouseYSky = mousePos.y * 5
  const mouseXForest = mousePos.x * 15
  const mouseYForest = mousePos.y * 15
  const mouseXClouds = mousePos.x * 10
  const mouseYClouds = mousePos.y * 10

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-[#a8d5e2] w-full h-full transform transition-transform duration-300"
        style={{
          transform: `translate(${-mouseXSky}px, ${-mouseYSky + skyOffset}px)`,
        }}
      />

      <div
        className="absolute inset-0 w-full h-full opacity-60 transform transition-transform duration-300"
        style={{
          transform: `translate(${-mouseXClouds}px, ${-mouseYClouds + cloudsOffset}px)`,
        }}
      >
        <div className="w-full h-full relative">
          <Image
            src="/placeholder.svg?height=1080&width=1920&text=Clouds"
            alt="Clouds background"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div
        className="absolute inset-0 w-full h-full transform transition-transform duration-300"
        style={{
          transform: `translate(${-mouseXForest}px, ${-mouseYForest + forestOffset}px)`,
        }}
      >
        <div className="w-full h-full relative">
          <Image
            src="/placeholder.svg?height=1080&width=1920&text=Forest"
            alt="Forest background"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30" />
    </div>
  )
}
