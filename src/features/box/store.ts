import { create } from 'zustand'
import { AvgPoint } from '../pins/data/average'
import { LivePoint } from '../pins/data/live'

type Store = {
  selected: 'ghost' | 'bus' | null
  ghostData: AvgPoint | null
  busData: LivePoint | null
  setGhostData: (data: AvgPoint) => void
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
