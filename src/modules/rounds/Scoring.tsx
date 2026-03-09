'use client'

import { AvatarState } from '@/modules/avatar/types'
import { getItemById } from '@/modules/clothing/ClothingCatalog'
import type { ThemeData } from './themes'
import type { ClothingCategory } from '@/modules/clothing/types'

export function calculateScore(avatar: AvatarState, theme: ThemeData): number {
  let score = 0
  const categories: ClothingCategory[] = ['hair', 'top', 'bottom', 'shoes', 'accessory']

  for (const cat of categories) {
    const itemId = avatar[cat]
    if (!itemId) continue

    const item = getItemById(itemId)
    if (!item) continue

    // Base points for having an item equipped
    let points = 10

    // Rarity bonus
    if (item.rarity === 'rare') points += 5
    if (item.rarity === 'legendary') points += 15

    // Theme bonus
    if (theme.bonusCategories.includes(cat)) {
      points += 10
    }

    score += points
  }

  // Small random factor for variety (± 10%)
  const randomFactor = 0.9 + Math.random() * 0.2
  return Math.round(score * randomFactor)
}

export function generateNPCScore(): number {
  // NPC scores are semi-random, ranging from 20-80
  return Math.round(30 + Math.random() * 50)
}
