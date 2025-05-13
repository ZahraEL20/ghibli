"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import {
ArrowLeft,
Calendar,
Clock,
FilmIcon,
Star,
User,
MapPin,
Loader2,
} from "lucide-react"
import { PageBackground } from "@/components/organisms/page-background"
import { Button } from "@/components/atoms/button"
import { Badge } from "@/components/atoms/badge"
import { Card, CardContent } from "@/components/molecules/card"
import {
Tabs,
TabsContent,
TabsList,
TabsTrigger,
} from "@/components/molecules/tabs"
import type { Film, Character, Location } from "@/types"
import FallingLeaves from "@/components/molecules/FallingLeaves"

export default function FilmDetailPage() {
const params = useParams()
const id = params?.id as string | undefined

const [film, setFilm] = useState<Film | null>(null)
const [characters, setCharacters] = useState<Character[]>([])
const [locations, setLocations] = useState<Location[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
const [imageFallback, setImageFallback] = useState(false)

useEffect(() => {
if (!id) return


const fetchFilmDetails = async () => {
  try {
    setLoading(true)

    const filmResponse = await fetch(`https://ghibliapi.vercel.app/films/${id}`)
    if (!filmResponse.ok) throw new Error("Failed to fetch film details")
    const filmData = await filmResponse.json()
    setFilm(filmData)

    const charactersResponse = await fetch(`https://ghibliapi.vercel.app/films/${id}/people`)
    if (charactersResponse.ok) {
      const charactersData = await charactersResponse.json()
      setCharacters(charactersData)
    }

    const locationsResponse = await fetch(`https://ghibliapi.vercel.app/films/${id}/locations`)
    if (locationsResponse.ok) {
      const locationsData = await locationsResponse.json()
      setLocations(locationsData)
    }

    setLoading(false)
  } catch (err) {
    setError("Failed to load film details. Please try again later.")
    setLoading(false)
    console.error(err)
  }
}

fetchFilmDetails()

}, [id])

if (loading) {
return ( <div className="flex justify-center items-center min-h-screen"> <Loader2 className="h-8 w-8 text-primary animate-spin" /> <span className="ml-2 text-lg">Loading film details...</span> </div>
)
}

if (error || !film) {
return ( <div className="text-center py-10 max-w-md mx-auto"> <p className="text-lg text-destructive mb-4">
{error || "Film not found"} </p> <Button asChild className="bg-primary/90 hover:bg-primary btn-watercolor"> <Link href="/films"> <ArrowLeft className="mr-2 h-4 w-4" />
Back to Films </Link> </Button> </div>
)
}

const imgSrc = imageFallback
? `/placeholder.svg?height=600&width=400&text=${encodeURIComponent(film.title)}`
: `/images/movies/${film.title} JP.jpg`

return (
<> 
<FallingLeaves /> 
<PageBackground variant="green" />

  <div className="relative pt-16 pb-24 px-4">
    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Button
          asChild
          variant="outline"
          className="mb-8 bg-white/50 backdrop-blur-md hover:bg-white/60 text-black border border-white/40"
        >
          <Link href="/films">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Films
          </Link>
        </Button>

        <div className="bg-white/80 backdrop-blur-md rounded-t-xl overflow-hidden shadow-xl border border-white/40 border-b-0">
          <div className="md:flex">
            <div className="md:w-1/3 relative">
              <div className="aspect-[3/4] relative">
                <img
                  src={imgSrc}
                  alt={film.title}
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                  onError={() => setImageFallback(true)}
                />
              </div>
            </div>

            <div className="md:w-2/3 p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black">
                {film.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {film.original_title} ({film.original_title_romanised})
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-primary" />
                  <span>{film.release_date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-primary" />
                  <span>{film.running_time} min</span>
                </div>
                <div className="flex items-center text-sm">
                  <User className="mr-2 h-4 w-4 text-primary" />
                  <span>Director: {film.director}</span>
                </div>
                <div className="flex items-center text-sm">
                  <FilmIcon className="mr-2 h-4 w-4 text-primary" />
                  <span>Producer: {film.producer}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Star className="mr-2 h-4 w-4 text-primary" />
                  <span>RT Score: {film.rt_score}%</span>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-sm md:text-base">{film.description}</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="characters" className="bg-white/80 backdrop-blur-md rounded-b-xl overflow-hidden shadow-xl border border-white/40 border-t-0">
              <TabsList className="w-full grid grid-cols-2 rounded-none border-b border-white/20">
                <TabsTrigger value="characters" className="rounded-none data-[state=active]:bg-white/50">Characters</TabsTrigger>
                <TabsTrigger value="locations" className="rounded-none data-[state=active]:bg-white/50">Locations</TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="characters" className="mt-0">
                  {characters.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {characters.map((character) => (
                        <Card key={character.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="rounded-full bg-primary/20 p-2">
                                <User className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{character.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {character.gender} • {character.age}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-4 text-muted-foreground">No character information available</p>
                  )}
                </TabsContent>

                <TabsContent value="locations" className="mt-0">
                  {locations.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {locations.map((location) => (
                        <Card key={location.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="rounded-full bg-secondary/20 p-2">
                                <MapPin className="h-5 w-5 text-secondary" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{location.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {location.climate} • {location.terrain}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-4 text-muted-foreground">No location information available</p>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>

          <div className="mt-12 text-center">
            <Badge className="bg-primary/20 text-primary-foreground hover:bg-primary/30 py-1 px-3 mb-4">
              Part of the Studio Ghibli Collection
            </Badge>

            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">Discover More Magical Worlds</h2>

            <Button asChild className="bg-primary/90 hover:bg-primary btn-watercolor text-black font-bold">
              <Link href="/films">
                Explore All Films
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}