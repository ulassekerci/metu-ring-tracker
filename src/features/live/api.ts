import { api } from '@/lib/queryClient'

export interface AvgPoint {
  id: number
  lat: string
  lng: string
  address: string
  color: string
  departure: string
  time: string
}

export interface LiveData {
  data: LivePoint[]
  timestamp: string
}

export interface LivePoint {
  lat: string
  lng: string
  addr: string
  dir: number
  sp: string
  clr: string
  ago: number
  key: string
  id: string
}

export const fetchAverages = async () => {
  const response = await api.get(`/averages`)
  return response.data as AvgPoint[]
}

export const fetchLive = async () => {
  const response = await api.get(`/`)
  return response.data as LiveData
}
