import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface DrawerStore {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useDrawerStore = create<DrawerStore>()(
  persist(
    (set) => ({
      isOpen: true,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: 'helpDrawerState',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
