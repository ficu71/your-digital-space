import { create } from 'zustand'

interface MeshState {
  focused: number | null
  booted: boolean
  compact: boolean
  select: (id: number | null) => void
  toggle: (id: number) => void
  setBooted: () => void
  setCompact: (v: boolean) => void
}

const skipBoot =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('skipboot')

export const useMeshStore = create<MeshState>((set) => ({
  focused: null,
  booted: skipBoot,
  compact: false,
  select: (id) => set({ focused: id }),
  toggle: (id) => set((s) => ({ focused: s.focused === id ? null : id })),
  setBooted: () => set({ booted: true }),
  setCompact: (v) => set({ compact: v }),
}))
