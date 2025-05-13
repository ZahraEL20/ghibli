export interface Film {
  id: string
  title: string
  original_title: string
  original_title_romanised: string
  description: string
  director: string
  producer: string
  release_date: string
  running_time: string
  rt_score: string
  people: string[]
  species: string[]
  locations: string[]
  vehicles: string[]
  url: string
}

export interface Character {
  id: string
  name: string
  gender: string
  age: string
  eye_color: string
  hair_color: string
  films: string[]
  species: string
  url: string
}

export interface Location {
  id: string
  name: string
  climate: string
  terrain: string
  surface_water: string
  residents: string[]
  films: string[]
  url: string
}
