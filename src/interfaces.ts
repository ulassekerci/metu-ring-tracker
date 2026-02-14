import { ServiceTime } from './lib/ServiceTime'

export interface RingPoint {
  lat: number
  lng: number
  color: string
  state: string
  plate: string
  address?: string
  serviceTime: number
}

export interface ClosestPoint extends RingPoint {
  distanceTraveled: number
}

export interface RingTrip {
  id: string
  line: string
  color: string
  vehicle: Vehicle
  departureTime: number | null
  closestPointToNow: ClosestPoint
  isPartial: boolean
  isParked: boolean
}

export interface GhostData {
  trips: RingTrip[]
  departure: ServiceTime
  average: RingTrip
}

export interface Vehicle {
  plate: string
  brand?: string
  model?: string
  doors?: number
}
