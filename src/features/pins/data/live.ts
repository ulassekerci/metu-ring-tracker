import { RingTrip } from '@/interfaces'
import { api } from '@/lib/queryClient'
import { useQuery } from '@tanstack/react-query'

const fetchLive = async () => {
  const response = await api.get<RingTrip[]>(`/`)
  return response.data
}

export const useLiveData = () => {
  return useQuery({
    queryKey: ['live'],
    queryFn: () => fetchLive(),
    refetchInterval: 1000,
  })
}
