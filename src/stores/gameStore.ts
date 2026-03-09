import { create } from 'zustand'

export type RoundPhase = 'LOBBY' | 'THEME_ANNOUNCE' | 'DRESSING' | 'RUNWAY' | 'SCORING' | 'RESULTS'

export interface Toast {
  id: string
  message: string
  duration?: number
}

interface GameStore {
  // Round state
  roundPhase: RoundPhase
  currentTheme: string | null
  roundTimer: number
  playerScore: number
  npcScores: Record<string, number>

  // UI state
  wardrobeOpen: boolean
  toasts: Toast[]
  playerPosition: [number, number, number]
  nearWardrobeStation: boolean

  // Actions
  setRoundPhase: (phase: RoundPhase) => void
  setCurrentTheme: (theme: string | null) => void
  setRoundTimer: (t: number) => void
  setPlayerScore: (s: number) => void
  setNpcScores: (scores: Record<string, number>) => void
  setWardrobeOpen: (open: boolean) => void
  addToast: (message: string) => void
  removeToast: (id: string) => void
  setPlayerPosition: (pos: [number, number, number]) => void
  setNearWardrobeStation: (near: boolean) => void
}

let toastId = 0

export const useGameStore = create<GameStore>((set) => ({
  roundPhase: 'LOBBY',
  currentTheme: null,
  roundTimer: 0,
  playerScore: 0,
  npcScores: {},
  wardrobeOpen: false,
  toasts: [],
  playerPosition: [0, 0, 10],
  nearWardrobeStation: false,

  setRoundPhase: (phase) => set({ roundPhase: phase }),
  setCurrentTheme: (theme) => set({ currentTheme: theme }),
  setRoundTimer: (t) => set({ roundTimer: t }),
  setPlayerScore: (s) => set({ playerScore: s }),
  setNpcScores: (scores) => set({ npcScores: scores }),
  setWardrobeOpen: (open) => set({ wardrobeOpen: open }),
  addToast: (message) => {
    const id = `toast-${++toastId}`
    set((s) => ({ toasts: [...s.toasts, { id, message }] }))
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
    }, 3000)
  },
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  setPlayerPosition: (pos) => set({ playerPosition: pos }),
  setNearWardrobeStation: (near) => set({ nearWardrobeStation: near }),
}))
