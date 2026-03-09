'use client'

import { useEconomyStore } from '@/stores/economyStore'
import { formatCoins } from '@/utils/helpers'

export default function CoinCounter() {
  const coins = useEconomyStore((s) => s.coins)

  return (
    <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-yellow-400/30">
      <span className="text-base">🪙</span>
      <span className="text-sm font-bold text-yellow-300">{formatCoins(coins)}</span>
    </div>
  )
}
