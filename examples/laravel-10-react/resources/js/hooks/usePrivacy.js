import { create } from 'zustand'

const usePrivacy = create((set) => ({
  active: false,
  toggle: () => set((state) => ({ active: !state.active })),
}))

export default usePrivacy;