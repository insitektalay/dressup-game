export type ClothingCategory = 'hair' | 'top' | 'bottom' | 'shoes' | 'accessory' | 'makeup'
export type Rarity = 'common' | 'rare' | 'legendary'

export interface ClothingItemData {
  id: string
  name: string
  category: ClothingCategory
  rarity: Rarity
  unlockCost: number
  color: string
  secondaryColor?: string
  description?: string
}

export const RARITY_COLORS: Record<Rarity, string> = {
  common: '#A0AEC0',
  rare: '#805AD5',
  legendary: '#FFD700',
}

export const RARITY_GLOW: Record<Rarity, number> = {
  common: 0,
  rare: 0.3,
  legendary: 0.8,
}

export const CATEGORY_EMOJI: Record<ClothingCategory, string> = {
  hair: '💇',
  top: '👚',
  bottom: '👗',
  shoes: '👠',
  accessory: '✨',
  makeup: '💄',
}
