export type Segment = {
  id: number
  segment_name: string
}

export type Brand = {
  id: number
  brand_name: string
}

export type Vehicle = {
  id: number
  vehicle_name: string
  release_year: number
  price: number
  segment: number
  brand: number
  segment_name: string
  brand_name: string
}
