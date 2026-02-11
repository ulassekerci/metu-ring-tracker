import { RingTrip } from '@/interfaces'
import { api } from '@/lib/queryClient'
import { useQuery } from '@tanstack/react-query'

const fetchGhosts = async () => {
  const response = await api.get<RingTrip[]>(`/ghosts`)
  return response.data
}

export const useGhostData = () => {
  return useQuery({
    queryKey: ['ghosts'],
    queryFn: () => fetchGhosts(),
    refetchInterval: 1000,
  })
}
