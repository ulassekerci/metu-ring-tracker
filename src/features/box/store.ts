import { create } from 'zustand'
import { LivePoint } from '../pins/data/live'
import { TripPoint } from '../pins/data/ghosts'

type Store = {
  selected: 'ghost' | 'bus' | null
  ghostData: TripPoint | null
  busData: LivePoint | null
  setGhostData: (data: TripPoint) => void
  setBusData: (data: LivePoint) => void
  closeBox: () => void
}

export const useInfoBoxStore = create<Store>()((set) => ({
  selected: null,
  ghostData: null,
  busData: null,
  setGhostData: (data) => set({ ghostData: data, selected: 'ghost' }),
  setBusData: (data) => set({ busData: data, selected: 'bus' }),
  closeBox: () => set({ selected: null }),
}))
