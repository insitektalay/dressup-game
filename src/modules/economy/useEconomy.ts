'use client'

import { useEffect } from 'react'
import { useEconomyStore } from '@/stores/economyStore'
import { useGameStore } from '@/stores/gameStore'
import { ECONOMY } from '@/utils/constants'

export function useEconomyInit() {
  const loadFromStorage = useEconomyStore((s) => s.loadFromStorage)
  const addToast = useGameStore((s) => s.addToast)
  const checkMilestone = useEconomyStore((s) => s.checkMilestone)
  const coins = useEconomyStore((s) => s.coins)

  // Load economy from localStorage on mount
  useEffect(() => {
    loadFromStorage()
  }, [loadFromStorage])

  // Check milestones whenever coins change
  useEffect(() => {
    const milestone = checkMilestone()
    if (milestone) {
      addToast(`🌟 Milestone! Unlocked: ${milestone}!`)
    }
  }, [coins, checkMilestone, addToast])
}
