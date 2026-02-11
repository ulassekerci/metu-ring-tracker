export interface RingPoint {
  lat: number
  lng: number
  color: string
  state: string
  plate: string
  address?: string
  serviceTime: number
}

export interface RingTrip {
  id: string
  line: string
  color: string
  vehicle: Vehicle
  departureTime: number | null
  closestPointToNow: RingPoint
  isPartial: boolean
}

export interface Vehicle {
  plate: string
  brand?: string
  model?: string
  doors?: number
}
