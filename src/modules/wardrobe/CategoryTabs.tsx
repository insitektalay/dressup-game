'use client'

import type { ClothingCategory } from '@/modules/clothing/types'
import { CATEGORY_EMOJI } from '@/modules/clothing/types'

interface CategoryTabsProps {
  active: ClothingCategory
  onChange: (cat: ClothingCategory) => void
}

const CATEGORIES: ClothingCategory[] = ['hair', 'top', 'bottom', 'shoes', 'accessory', 'makeup']
const LABELS: Record<ClothingCategory, string> = {
  hair: 'Hair',
  top: 'Tops',
  bottom: 'Bottoms',
  shoes: 'Shoes',
  accessory: 'Acc.',
  makeup: 'Makeup',
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-1 px-2 py-2 overflow-x-auto">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            active === cat
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md scale-105 border border-white/20'
              : 'bg-white/15 text-pink-200 hover:bg-white/25 border border-transparent'
          }`}
        >
          <span>{CATEGORY_EMOJI[cat]}</span>
          <span>{LABELS[cat]}</span>
        </button>
      ))}
    </div>
  )
}
