import { create } from 'zustand'
import { DEFAULT_ECONOMY } from '@/modules/economy/types'
import { ECONOMY } from '@/utils/constants'

interface EconomyStore {
  coins: number
  unlockedItems: string[]
  lastDailyBonus: string | null
  addCoins: (amount: number) => void
  spendCoins: (amount: number) => boolean
  unlockItem: (itemId: string, cost: number) => boolean
  claimDailyBonus: () => boolean
  checkMilestone: () => string | null
  loadFromStorage: () => void
  saveToStorage: () => void
}

export const useEconomyStore = create<EconomyStore>((set, get) => ({
  ...DEFAULT_ECONOMY,

  addCoins: (amount) => {
    set((s) => ({ coins: s.coins + amount }))
    get().saveToStorage()
  },

  spendCoins: (amount) => {
    const state = get()
    if (state.coins < amount) return false
    set({ coins: state.coins - amount })
    get().saveToStorage()
    return true
  },

  unlockItem: (itemId, cost) => {
    const state = get()
    if (state.coins < cost || state.unlockedItems.includes(itemId)) return false
    set({
      coins: state.coins - cost,
      unlockedItems: [...state.unlockedItems, itemId],
    })
    get().saveToStorage()
    return true
  },

  claimDailyBonus: () => {
    const state = get()
    const today = new Date().toDateString()
    if (state.lastDailyBonus === today) return false
    set({
      coins: state.coins + ECONOMY.dailyBonus,
      lastDailyBonus: today,
    })
    get().saveToStorage()
    return true
  },

  checkMilestone: () => {
    const { coins, unlockedItems } = get()
    for (const m of ECONOMY.milestones) {
      const rewardId = m.reward.toLowerCase().replace(/ /g, '_')
      if (coins >= m.coins && !unlockedItems.includes(rewardId)) {
        set({ unlockedItems: [...unlockedItems, rewardId] })
        get().saveToStorage()
        return m.reward
      }
    }
    return null
  },

  loadFromStorage: () => {
    if (typeof window === 'undefined') return
    try {
      const data = localStorage.getItem('dressup-economy')
      if (data) {
        const parsed = JSON.parse(data)
        set({
          coins: parsed.coins ?? DEFAULT_ECONOMY.coins,
          unlockedItems: parsed.unlockedItems ?? DEFAULT_ECONOMY.unlockedItems,
          lastDailyBonus: parsed.lastDailyBonus ?? null,
        })
      }
    } catch { /* ignore */ }
  },

  saveToStorage: () => {
    if (typeof window === 'undefined') return
    const { coins, unlockedItems, lastDailyBonus } = get()
    localStorage.setItem('dressup-economy', JSON.stringify({ coins, unlockedItems, lastDailyBonus }))
  },
}))
