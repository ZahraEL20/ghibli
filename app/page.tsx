"use client"

import { Button } from "@/components/atoms/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ParallaxHero } from "@/components/organisms/parallax-hero"
import { PageBackground } from "@/components/organisms/page-background"
import FallingLeaves from "@/components/molecules/FallingLeaves"
import { useState } from "react"

export default function Home() {
  const [imageFallback, setImageFallback] = useState(false)

  return (
    <>
      <FallingLeaves />

      <ParallaxHero />

      {/* Page background after the hero section */}
      <PageBackground variant="blue" />

      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-black">Featured Films</h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: "112c1e67-726f-40b1-ac17-6974127bb9b9", title: "Tales from Earthsea", image: "/images/movies/Tales from Earthsea JP.jpg", year: "2006" },
              { id: "dc2e6bd1-8156-4886-adff-b39e6043af0c", title: "Spirited Away", image: "/images/movies/Spirited Away JP.jpg", year: "2001" },
              { id: "0440483e-ca0e-4120-8c50-4c8cd9b965d6", title: "Princess Mononoke", image: "/images/movies/Princess Mononoke JP.jpg", year: "1997" },
            ].map((film) => (
              <motion.div
                key={film.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="ghibli-card wobble-on-hover bg-white/80 backdrop-blur-md p-5 rounded-xl border border-white/40 shadow-xl"
              >
                <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                  <img
                    src={imageFallback ? `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(film.title)}` : film.image}
                    alt={film.title}
                    className="object-contain w-full transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    onError={() => setImageFallback(true)}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1 text-black">{film.title}</h3>
                <p className="text-muted-foreground">{film.year}</p>
                <Button asChild variant="ghost" className="mt-2 w-full justify-start pl-0 hover:pl-2 transition-all text-black">
                  <Link href={`/films/${film.id}`}>
                    <span>View details</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-secondary/90 hover:bg-secondary btn-watercolor text-black font-bold">
              <Link href="/films">
                View All Films
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
