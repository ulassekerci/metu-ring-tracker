import { RingPoint } from '@/interfaces'
import { create } from 'zustand'

type Store = {
  selected: 'ghost' | 'bus' | null
  ghostData: RingPoint | null
  busData: RingPoint | null
  setGhostData: (data: RingPoint) => void
  setBusData: (data: RingPoint) => void
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
