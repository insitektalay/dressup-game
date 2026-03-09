'use client'

import { useState } from 'react'
import { useGameStore } from '@/stores/gameStore'
import { useAvatarStore } from '@/stores/avatarStore'
import { useEconomyStore } from '@/stores/economyStore'
import { getItemsByCategory } from '@/modules/clothing/ClothingCatalog'
import type { ClothingCategory } from '@/modules/clothing/types'
import CategoryTabs from './CategoryTabs'
import ItemCard from './ItemCard'
import AvatarBuilder from '@/modules/avatar/AvatarBuilder'

export default function WardrobePanel() {
  const wardrobeOpen = useGameStore((s) => s.wardrobeOpen)
  const setWardrobeOpen = useGameStore((s) => s.setWardrobeOpen)
  const addToast = useGameStore((s) => s.addToast)
  const { avatar, equipItem } = useAvatarStore()
  const { coins, unlockedItems, unlockItem } = useEconomyStore()

  const [activeCategory, setActiveCategory] = useState<ClothingCategory>('hair')
  const [showAvatarBuilder, setShowAvatarBuilder] = useState(false)

  if (!wardrobeOpen) return null

  const items = getItemsByCategory(activeCategory)

  const handleEquip = (itemId: string) => {
    const currentlyEquipped = avatar[activeCategory]
    if (currentlyEquipped === itemId) {
      // Unequip
      equipItem(activeCategory, null)
    } else {
      equipItem(activeCategory, itemId)
    }
  }

  const handleBuy = (itemId: string, cost: number) => {
    const success = unlockItem(itemId, cost)
    if (success) {
      addToast(`🎉 Unlocked ${items.find((i) => i.id === itemId)?.name}!`)
      equipItem(activeCategory, itemId)
    } else {
      addToast(`💫 Not enough coins!`)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setWardrobeOpen(false)}
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-md sm:mx-4 bg-gradient-to-b from-purple-900/95 to-pink-900/95 backdrop-blur-md rounded-t-3xl sm:rounded-3xl animate-slide-up max-h-[85vh] flex flex-col border-t-2 sm:border-2 border-pink-400/30">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div>
            <h2 className="text-xl font-bold text-white">Wardrobe ✨</h2>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-sm">🪙</span>
              <span className="text-sm font-bold text-yellow-300">{coins}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAvatarBuilder(!showAvatarBuilder)}
              className="bg-purple-500/50 text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-purple-500/70 transition-colors"
            >
              {showAvatarBuilder ? 'Items' : 'Avatar'}
            </button>
            <button
              onClick={() => setWardrobeOpen(false)}
              className="bg-white/20 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors text-lg"
            >
              ×
            </button>
          </div>
        </div>

        {showAvatarBuilder ? (
          <div className="flex-1 overflow-y-auto wardrobe-scroll pb-6">
            <AvatarBuilder />
          </div>
        ) : (
          <>
            {/* Category tabs */}
            <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

            {/* Items grid */}
            <div className="flex-1 overflow-y-auto wardrobe-scroll px-3 pb-6">
              <div className="grid grid-cols-4 gap-2 mt-2">
                {items.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    isOwned={unlockedItems.includes(item.id)}
                    isEquipped={avatar[activeCategory] === item.id}
                    onEquip={() => handleEquip(item.id)}
                    onBuy={() => handleBuy(item.id, item.unlockCost)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
