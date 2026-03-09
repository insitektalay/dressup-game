export interface EconomyState {
  coins: number
  unlockedItems: string[]
  lastDailyBonus: string | null
}

export const DEFAULT_ECONOMY: EconomyState = {
  coins: 100,
  unlockedItems: ['hair_ponytail', 'top_tshirt', 'bottom_skirt', 'shoes_sneakers'],
  lastDailyBonus: null,
}
