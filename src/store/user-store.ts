import { create } from 'zustand'

export const userStore = create((set) => ({
  id: null,
  setId: (id: string) => set(() => ({ id })),
}))