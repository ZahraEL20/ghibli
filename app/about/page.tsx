"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/atoms/button"
import { PageBackground } from "@/components/organisms/page-background"
import FallingLeaves from "@/components/molecules/FallingLeaves"

export default function AboutPage() {
  return (
    <>
      <FallingLeaves />
      <PageBackground variant="pink" />

      <div className="relative pt-16 pb-24 px-4">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 text-center mb-12"
          >
            <h1 className="mb-6 text-4xl md:text-5xl font-bold text-black">About Studio Ghibli</h1>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-md rounded-xl overflow-hidden shadow-xl p-6 md:p-8 mb-12 border border-white/40"
          >
            <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden">
              <Image
                src="/images/ghibli.jpg?height=480&width=854&text=Studio+Ghibli"
                alt="Studio Ghibli"
                fill
                className="object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold mb-4 text-primary-foreground">The Magic of Ghibli</h2>
            <p className="mb-4">
              Studio Ghibli was founded in 1985 by animated film directors Isao Takahata and Hayao Miyazaki, and has
              produced over 20 feature-length films. With a focus on detailed hand-drawn animation and thoughtful
              storytelling, Studio Ghibli has become world-renowned for creating beautiful, emotional, and
              thought-provoking animated films.
            </p>
            <p className="mb-4">
              The studio's films are characterized by recurrent themes like humanity's relationship with nature and
              technology, the importance of art and creativity, and the difficulty of maintaining pacifist ideals in a
              violent world. The films also feature strong female characters, detailed animation work, and a sense of
              wonder and adventure.
            </p>
            <p>
              Many of Studio Ghibli's works have received worldwide acclaim, with Spirited Away winning the Academy
              Award for Best Animated Feature in 2003. Other notable films include My Neighbor Totoro, Princess
              Mononoke, Howl's Moving Castle, and Grave of the Fireflies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-md rounded-xl overflow-hidden shadow-xl p-6 md:p-8 mb-12 border border-white/40"
          >
            <h2 className="text-2xl font-bold mb-4 text-secondary-foreground">The Founders</h2>

            <div className="md:grid grid-cols-2 gap-6 mb-6">
              <div>
                <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/founders/Hayao Miyazaki.png?height=400&width=400&text=Hayao+Miyazaki"
                    alt="Hayao Miyazaki"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hayao Miyazaki</h3>
                <p className="text-sm">
                  Visionary director, co-founder, and the creative pulse behind Studio Ghibli. Known for imaginative worlds,
                  hand-drawn magic, and deeply human themes.
                </p>
              </div>

              <div>
                <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/founders/Isao Takahata.png?height=400&width=400&text=Isao+Takahata"
                    alt="Isao Takahata"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Isao Takahata</h3>
                <p className="text-sm">
                  Co-founder and director of films like *Grave of the Fireflies*, Takahata brought emotional realism and
                  grounded storytelling to Ghibli’s legacy.
                </p>
              </div>

              <div>
                <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/founders/Toshio Suzuki.png?height=400&width=400&text=Toshio+Suzuki"
                    alt="Toshio Suzuki"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Toshio Suzuki</h3>
                <p className="text-sm">
                  The studio’s longtime producer and third official co-founder. Suzuki is the pragmatic engine that kept the
                  dreamers dreaming — and the studio running like a well-oiled catbus.
                </p>
              </div>

              <div>
                <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/founders/Yasuyoshi Tokuma.png?height=400&width=400&text=Yasuyoshi+Tokuma"
                    alt="Yasuyoshi Tokuma"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Yasuyoshi Tokuma</h3>
                <p className="text-sm">
                  Founder of Tokuma Shoten and the financial force behind Ghibli’s creation. While not a creative, his backing of
                  *Nausicaä* and trust in Miyazaki laid the foundation for the studio’s future. Though not listed as an official
                  founder, without him, Ghibli might never have existed.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
