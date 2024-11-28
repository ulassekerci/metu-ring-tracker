import { api, queryClient } from '@/lib/queryClient'
import { useMutation } from '@tanstack/react-query'

export const deleteTrip = async (tripID: string) => {
  await api.delete(`/trips/${tripID}`)
}

export const deleteTrips = async (tripIDs?: string[]) => {
  if (!tripIDs) return
  return Promise.all(tripIDs.map((tripID) => deleteTrip(tripID)))
}

export const useDeleteTrip = () => {
  return useMutation({
    mutationFn: (tripID: string) => deleteTrip(tripID),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['trips'] }),
  })
}

export const useDeleteTrips = () => {
  return useMutation({
    mutationFn: (tripIDs?: string[]) => deleteTrips(tripIDs),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['trips'] }),
  })
}
