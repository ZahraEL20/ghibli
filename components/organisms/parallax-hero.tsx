"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/atoms/button"

export function ParallaxHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
    
    const handleMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouse)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouse)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const calculateParallax = (depth: number) => {
    if (!isMounted) return "translate(0px, 0px)"
    
    const x = (mousePosition.x - window.innerWidth / 2) * depth
    const y = (mousePosition.y - window.innerHeight / 2) * depth
    return `translate(${x}px, ${y}px)`
  }

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Sky gradient background - fixed in place */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#a8d5e2] to-[#c9e8f3] -z-50" />

      {/* Clouds layer - moves slowly */}
      <div
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        style={{
          transform: calculateParallax(0.02),
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="absolute top-[10%] left-[5%] w-[40%] -z-99">
          <Image src="/images/clouds.png" alt="Clouds" width={600} height={200} />
        </div>
        <div className="absolute top-[15%] right-[10%] w-[30%]">
          <Image src="/images/clouds.png" alt="Clouds" width={400} height={150} />
        </div>
        <div className="absolute top-[30%] left-[20%] w-[25%]">
          <Image src="/images/clouds.png" alt="Clouds" width={300} height={100} />
        </div>
        <div className="absolute top-[5%] left-[60%] w-[35%]">
          <Image src="/images/clouds.png" alt="Clouds" width={500} height={180} />
        </div>
        <div className="absolute top-[45%] left-[10%] w-[28%]">
          <Image src="/images/clouds.png" alt="Clouds" width={350} height={120} />
        </div>
        <div className="absolute top-[25%] right-[25%] w-[32%] opacity-80">
          <Image src="/images/clouds.png" alt="Clouds" width={420} height={160} />
        </div>
        <div className="absolute top-[38%] right-[5%] w-[22%] opacity-90">
          <Image src="/images/clouds.png" alt="Clouds" width={280} height={90} />
        </div>
        {/* Additional clouds below */}
        <div className="absolute top-[58%] left-[15%] w-[33%] opacity-75">
          <Image src="/images/clouds.png" alt="Clouds" width={450} height={170} />
        </div>
        <div className="absolute top-[65%] right-[18%] w-[38%] opacity-85">
          <Image src="/images/clouds.png" alt="Clouds" width={520} height={190} />
        </div>
        <div className="absolute top-[70%] left-[30%] w-[26%] opacity-70">
          <Image src="/images/clouds.png" alt="Clouds" width={320} height={110} />
        </div>
      </div>

      {/* Ground/grass gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-[#8ca88d] to-transparent z-20" />

      {/* Howl's Moving Castle - centered in the middle with higher z-index */}
      <div
        className="absolute top-1/2 left-1/2 w-[50%] max-w-[500px] z-30 pointer-events-none transform -translate-x-1/2 -translate-y-[60%]"
        style={{
          transform: `translate(-50%, -60%) ${calculateParallax(0.03)}`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Image src="/images/castle.png" alt="Howl's Moving Castle" width={500} height={500} priority />
      </div>

      {/* Content - CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="z-40 absolute bottom-[15%] left-0 right-0 flex justify-center"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary/90 hover:bg-primary btn-watercolor text-lg text-black font-bold">
            <Link href="/films">
              Explore Films
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white/50 backdrop-blur-sm hover:bg-white/70 text-black btn-watercolor text-lg font-bold"
          >
            <Link href="/about">About Studio Ghibli</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
