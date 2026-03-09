'use client'

import type { ClothingItemData } from '@/modules/clothing/types'
import { RARITY_COLORS } from '@/modules/clothing/types'

interface ItemCardProps {
  item: ClothingItemData
  isOwned: boolean
  isEquipped: boolean
  onEquip: () => void
  onBuy: () => void
}

export default function ItemCard({ item, isOwned, isEquipped, onEquip, onBuy }: ItemCardProps) {
  const rarityColor = RARITY_COLORS[item.rarity]

  return (
    <button
      onClick={isOwned ? onEquip : onBuy}
      className={`relative rounded-xl p-2 transition-all ${
        isEquipped
          ? 'bg-pink-500/30 border-2 border-pink-400 scale-105 shadow-lg'
          : 'bg-white/10 border-2 border-transparent hover:bg-white/20 hover:border-pink-300/50'
      }`}
    >
      {/* Color preview */}
      <div
        className="w-full aspect-square rounded-lg mb-1 flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: item.color + '30' }}
      >
        <div
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        {item.secondaryColor && (
          <div
            className="absolute bottom-1 right-1 w-3 h-3 rounded-full border border-white/50"
            style={{ backgroundColor: item.secondaryColor }}
          />
        )}
        {!isOwned && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-lg">🔒</span>
          </div>
        )}
        {item.rarity === 'legendary' && isOwned && (
          <div className="absolute inset-0 bg-yellow-400/10 animate-pulse" />
        )}
      </div>

      {/* Name */}
      <p className="text-[10px] font-bold text-white truncate">{item.name}</p>

      {/* Rarity badge */}
      <div
        className="absolute top-1 right-1 px-1 py-0.5 rounded text-[8px] font-bold text-white"
        style={{ backgroundColor: rarityColor }}
      >
        {item.rarity === 'legendary' ? '★' : item.rarity === 'rare' ? '◆' : '●'}
      </div>

      {/* Cost (if not owned) */}
      {!isOwned && (
        <div className="flex items-center justify-center gap-0.5 mt-0.5">
          <span className="text-[10px]">🪙</span>
          <span className="text-[10px] font-bold text-yellow-300">{item.unlockCost}</span>
        </div>
      )}

      {/* Equipped indicator */}
      {isEquipped && (
        <div className="absolute -top-1 -left-1 bg-pink-500 text-white text-[8px] px-1 rounded-full font-bold">
          ON
        </div>
      )}
    </button>
  )
}
