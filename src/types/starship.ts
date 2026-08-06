export interface StarshipProperties {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  hyperdrive_rating: string
  MGLT: string
  starship_class: string
  pilots: string[]
  films: string[]
  created: string
  edited: string
  url: string
}

export interface Starship extends StarshipProperties {
  uid: string
}

export interface SwapiExpandedResult {
  properties: StarshipProperties
  description: string
  uid: string
}

export interface SwapiStarshipsPage {
  message: string
  total_records: number
  total_pages: number
  previous: string | null
  next: string | null
  results: SwapiExpandedResult[]
}
