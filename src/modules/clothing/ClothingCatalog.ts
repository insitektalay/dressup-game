import { ClothingItemData } from './types'

export const clothingCatalog: ClothingItemData[] = [
  // === HAIR ===
  { id: 'hair_ponytail', name: 'Ponytail', category: 'hair', rarity: 'common', unlockCost: 0, color: '#8B4513' },
  { id: 'hair_pigtails', name: 'Pigtails', category: 'hair', rarity: 'common', unlockCost: 30, color: '#FFD700' },
  { id: 'hair_bob', name: 'Bob Cut', category: 'hair', rarity: 'common', unlockCost: 40, color: '#1A1A2E' },
  { id: 'hair_long', name: 'Long & Wavy', category: 'hair', rarity: 'rare', unlockCost: 80, color: '#FF69B4' },
  { id: 'hair_buns', name: 'Space Buns', category: 'hair', rarity: 'rare', unlockCost: 100, color: '#C8A2C8' },
  { id: 'hair_princess', name: 'Princess Hair', category: 'hair', rarity: 'legendary', unlockCost: 200, color: '#FFD700', secondaryColor: '#FFF8DC' },

  // === TOPS ===
  { id: 'top_tshirt', name: 'T-Shirt', category: 'top', rarity: 'common', unlockCost: 0, color: '#FF69B4' },
  { id: 'top_blouse', name: 'Ruffle Blouse', category: 'top', rarity: 'common', unlockCost: 30, color: '#E6E6FA' },
  { id: 'top_hoodie', name: 'Cozy Hoodie', category: 'top', rarity: 'common', unlockCost: 40, color: '#B2F5EA' },
  { id: 'top_crop', name: 'Crop Top', category: 'top', rarity: 'rare', unlockCost: 80, color: '#FF7F7F' },
  { id: 'top_jacket', name: 'Denim Jacket', category: 'top', rarity: 'rare', unlockCost: 100, color: '#6B8DD6' },
  { id: 'top_ballgown_top', name: 'Ball Gown Top', category: 'top', rarity: 'legendary', unlockCost: 200, color: '#FFD700', secondaryColor: '#FF69B4' },

  // === BOTTOMS ===
  { id: 'bottom_skirt', name: 'Mini Skirt', category: 'bottom', rarity: 'common', unlockCost: 0, color: '#FF69B4' },
  { id: 'bottom_jeans', name: 'Jeans', category: 'bottom', rarity: 'common', unlockCost: 30, color: '#6B8DD6' },
  { id: 'bottom_tutu', name: 'Tutu', category: 'bottom', rarity: 'rare', unlockCost: 80, color: '#E6E6FA' },
  { id: 'bottom_shorts', name: 'Cute Shorts', category: 'bottom', rarity: 'common', unlockCost: 40, color: '#FEFCBF' },
  { id: 'bottom_flowy', name: 'Flowy Skirt', category: 'bottom', rarity: 'rare', unlockCost: 100, color: '#B2F5EA' },
  { id: 'bottom_ballgown', name: 'Ball Gown Skirt', category: 'bottom', rarity: 'legendary', unlockCost: 200, color: '#FFD700', secondaryColor: '#FF69B4' },

  // === SHOES ===
  { id: 'shoes_sneakers', name: 'Sneakers', category: 'shoes', rarity: 'common', unlockCost: 0, color: '#FFFFFF', secondaryColor: '#FF69B4' },
  { id: 'shoes_boots', name: 'Ankle Boots', category: 'shoes', rarity: 'common', unlockCost: 40, color: '#8B4513' },
  { id: 'shoes_heels', name: 'Sparkle Heels', category: 'shoes', rarity: 'rare', unlockCost: 80, color: '#FF69B4' },
  { id: 'shoes_sandals', name: 'Strappy Sandals', category: 'shoes', rarity: 'common', unlockCost: 30, color: '#FFD700' },
  { id: 'shoes_platforms', name: 'Platform Boots', category: 'shoes', rarity: 'rare', unlockCost: 100, color: '#1A1A2E' },
  { id: 'shoes_glass', name: 'Glass Slippers', category: 'shoes', rarity: 'legendary', unlockCost: 200, color: '#87CEEB', secondaryColor: '#FFFFFF' },

  // === ACCESSORIES ===
  { id: 'acc_bow', name: 'Hair Bow', category: 'accessory', rarity: 'common', unlockCost: 20, color: '#FF69B4' },
  { id: 'acc_crown', name: 'Tiara', category: 'accessory', rarity: 'rare', unlockCost: 100, color: '#FFD700' },
  { id: 'acc_flowers', name: 'Flower Crown', category: 'accessory', rarity: 'common', unlockCost: 40, color: '#FF7F7F', secondaryColor: '#B2F5EA' },
  { id: 'acc_sunglasses', name: 'Heart Shades', category: 'accessory', rarity: 'common', unlockCost: 30, color: '#FF69B4' },
  { id: 'acc_wings', name: 'Fairy Wings', category: 'accessory', rarity: 'legendary', unlockCost: 250, color: '#E6E6FA', secondaryColor: '#FF69B4' },
  { id: 'acc_halo', name: 'Angel Halo', category: 'accessory', rarity: 'rare', unlockCost: 120, color: '#FFD700' },
]

export function getItemsByCategory(category: string): ClothingItemData[] {
  return clothingCatalog.filter((item) => item.category === category)
}

export function getItemById(id: string): ClothingItemData | undefined {
  return clothingCatalog.find((item) => item.id === id)
}
