'use client'

import type { ClothingCategory } from '@/modules/clothing/types'
import { CATEGORY_EMOJI } from '@/modules/clothing/types'

interface CategoryTabsProps {
  active: ClothingCategory
  onChange: (cat: ClothingCategory) => void
}

const CATEGORIES: ClothingCategory[] = ['hair', 'top', 'bottom', 'shoes', 'accessory']
const LABELS: Record<ClothingCategory, string> = {
  hair: 'Hair',
  top: 'Tops',
  bottom: 'Bottoms',
  shoes: 'Shoes',
  accessory: 'Acc.',
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
              ? 'bg-pink-500 text-white shadow-md scale-105'
              : 'bg-white/20 text-pink-200 hover:bg-white/30'
          }`}
        >
          <span>{CATEGORY_EMOJI[cat]}</span>
          <span>{LABELS[cat]}</span>
        </button>
      ))}
    </div>
  )
}
