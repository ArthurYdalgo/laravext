import { create } from 'zustand'

const usePrivacy = create((set) => ({
  active: false,
  setActive: (active) => set(() => ({ active })),
  toggle: () => set((state) => ({ active: !state.active })),
}))

export default usePrivacy;