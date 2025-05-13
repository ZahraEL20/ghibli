"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Search, Loader2 } from "lucide-react"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { PageBackground } from "@/components/organisms/page-background"
import type { Film } from "@/types"
import FallingLeaves from "@/components/molecules/FallingLeaves"

export default function FilmsPage() {
  const [films, setFilms] = useState<Film[]>([])
  const [filteredFilms, setFilteredFilms] = useState<Film[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [fallbacks, setFallbacks] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("https://ghibliapi.vercel.app/films")
        if (!response.ok) {
          throw new Error("Failed to fetch films")
        }
        const data = await response.json()
        setFilms(data)
        setFilteredFilms(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to load films. Please try again later.")
        setLoading(false)
        console.error(err)
      }
    }

    fetchFilms()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredFilms(films)
    } else {
      const filtered = films.filter(
        (film) =>
          film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          film.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
          film.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredFilms(filtered)
    }
  }, [searchQuery, films])

  const handleImageError = (id: string) => {
    setFallbacks((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <>
      <FallingLeaves />
      <PageBackground variant="purple" />

      <section className="relative pt-16 pb-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center max-w-3xl mx-auto mb-10 relative"
        >
          <h1 className="mb-6 text-4xl md:text-5xl font-bold text-black">Studio Ghibli Films</h1>
          <p className="mb-8 text-lg text-black">
            Explore the complete collection of magical films from Studio Ghibli
          </p>

          <div className="relative max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search films..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/80 backdrop-blur-md border-white/40 text-black"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black/70" />
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">
          {loading ? (
            <div className="flex justify-center items-center py-20 bg-white/70 backdrop-blur-md rounded-xl border border-white/40">
              <Loader2 className="h-8 w-8 text-black animate-spin" />
              <span className="ml-2 text-black text-lg">Loading films...</span>
            </div>
          ) : error ? (
            <div className="text-center py-10 bg-white/80 backdrop-blur-md rounded-xl border border-white/40">
              <p className="text-lg text-destructive">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4 bg-primary/90 hover:bg-primary btn-watercolor text-black font-bold"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFilms.map((film, index) => {
                const imgSrc = fallbacks[film.id]
                  ? `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(film.title)}`
                  : `/images/movies/${film.title} JP.jpg`

                return (
                  <motion.div
                    key={film.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -10 }}
                    className="ghibli-card wobble-on-hover bg-white/80 backdrop-blur-md p-5 rounded-xl border border-white/40 shadow-xl"
                  >
                    <div className="mb-4 overflow-hidden rounded-lg border" style={{ width: "100%", height: "auto" }}>
                      <img
                        src={imgSrc}
                        alt={film.title}
                        loading="lazy"
                        decoding="async"
                        style={{ width: "100%", height: "auto", objectFit: "contain" }}
                        onError={() => handleImageError(film.id)}
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-1 text-black">{film.title}</h3>
                    <p className="text-muted-foreground">
                      {film.release_date} • Directed by {film.director}
                    </p>
                    <p className="mt-2 text-sm line-clamp-3">{film.description}</p>
                    <Button asChild variant="ghost" className="mt-4 w-full justify-start pl-0 hover:pl-2 transition-all">
                      <Link href={`/films/${film.id}`}>
                        <span>View details</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          )}

          {!loading && !error && filteredFilms.length === 0 && (
            <div className="text-center py-10 bg-white/80 backdrop-blur-md rounded-xl border border-white/40">
              <p className="text-lg">No films found matching your search.</p>
              <Button onClick={() => setSearchQuery("")} className="mt-4 bg-primary/90 hover:bg-primary btn-watercolor text-black font-bold">
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}