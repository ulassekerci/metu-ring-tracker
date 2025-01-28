import { useInfoBoxStore } from '@/features/box/store'
import { api } from '@/lib/queryClient'
import { useQuery } from '@tanstack/react-query'

export interface AvgPoint {
  id: number
  lat: string
  lng: string
  address: string
  color: string
  departure: string
  time: string
}

export interface RingLog {
  id: number
  trip_id: string
  lat: string
  lng: string
  address: string
  color: string
  state: string
  plate: string
  timestamp: string
}

const fetchAverages = async () => {
  const response = await api.get<AvgPoint[]>(`/averages`)
  return response.data
}

const fetchOtherGhosts = async (departure: string) => {
  const response = await api.get<RingLog[]>(`/averages/${departure}`)
  return response.data
}

export const useAverageData = () => {
  return useQuery({
    queryKey: ['avgdata'],
    queryFn: () => fetchAverages(),
    refetchInterval: 1000,
  })
}

export const useOtherGhosts = () => {
  const { selected, ghostData } = useInfoBoxStore()
  return useQuery({
    queryKey: ['otherghosts', ghostData?.departure],
    queryFn: () => fetchOtherGhosts(ghostData?.departure!),
    refetchInterval: 1000,
    enabled: selected === 'ghost' && !!ghostData,
  })
}
