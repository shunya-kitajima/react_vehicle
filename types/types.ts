export type SegmentType = {
  id: number
  segment_name: string
}

export type BrandType = {
  id: number
  brand_name: string
}

export type VehicleType = {
  id: number
  vehicle_name: string
  release_year: number
  price: number
  segment: number
  brand: number
  segment_name: string
  brand_name: string
}