import { create } from 'zustand'
import type { AvatarState } from '@/modules/avatar/types'

export type RoundPhase = 'LOBBY' | 'THEME_ANNOUNCE' | 'DRESSING' | 'RUNWAY' | 'VOTING' | 'RESULTS'

export interface Toast {
  id: string
  message: string
  duration?: number
}

export interface ContestantData {
  name: string
  avatar: AvatarState
  score: number
  stars: number // average star rating
}

interface GameStore {
  // Round state
  roundPhase: RoundPhase
  currentTheme: string | null
  roundTimer: number
  playerScore: number
  npcScores: Record<string, number>
  coinsEarned: number
  playerRank: number

  // Runway state
  runwayWalkerIndex: number // which contestant is walking (-1 = none, 0 = player, 1+ = NPC index)
  runwayWalkerCount: number
  runwayProgress: number // 0-1 walk progress for current walker

  // Voting state
  votingIndex: number // which contestant we're voting on
  contestants: ContestantData[]
  playerVotes: Record<string, number> // name -> stars given

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
  setCoinsEarned: (c: number) => void
  setPlayerRank: (r: number) => void
  setRunwayWalkerIndex: (i: number) => void
  setRunwayWalkerCount: (c: number) => void
  setRunwayProgress: (p: number) => void
  setVotingIndex: (i: number) => void
  setContestants: (c: ContestantData[]) => void
  setPlayerVote: (name: string, stars: number) => void
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
  coinsEarned: 0,
  playerRank: 0,
  runwayWalkerIndex: -1,
  runwayWalkerCount: 0,
  runwayProgress: 0,
  votingIndex: 0,
  contestants: [],
  playerVotes: {},
  wardrobeOpen: false,
  toasts: [],
  playerPosition: [0, 0, 10],
  nearWardrobeStation: false,

  setRoundPhase: (phase) => set({ roundPhase: phase }),
  setCurrentTheme: (theme) => set({ currentTheme: theme }),
  setRoundTimer: (t) => set({ roundTimer: t }),
  setPlayerScore: (s) => set({ playerScore: s }),
  setNpcScores: (scores) => set({ npcScores: scores }),
  setCoinsEarned: (c) => set({ coinsEarned: c }),
  setPlayerRank: (r) => set({ playerRank: r }),
  setRunwayWalkerIndex: (i) => set({ runwayWalkerIndex: i }),
  setRunwayWalkerCount: (c) => set({ runwayWalkerCount: c }),
  setRunwayProgress: (p) => set({ runwayProgress: p }),
  setVotingIndex: (i) => set({ votingIndex: i }),
  setContestants: (c) => set({ contestants: c }),
  setPlayerVote: (name, stars) => set((s) => ({
    playerVotes: { ...s.playerVotes, [name]: stars },
  })),
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
