import { ClothingItemData } from './types'

export const clothingCatalog: ClothingItemData[] = [
  // === HAIR (existing 6 + 6 new = 12) ===
  { id: 'hair_ponytail', name: 'Ponytail', category: 'hair', rarity: 'common', unlockCost: 0, color: '#8B4513' },
  { id: 'hair_pigtails', name: 'Pigtails', category: 'hair', rarity: 'common', unlockCost: 30, color: '#FFD700' },
  { id: 'hair_bob', name: 'Bob Cut', category: 'hair', rarity: 'common', unlockCost: 40, color: '#1A1A2E' },
  { id: 'hair_long', name: 'Long & Wavy', category: 'hair', rarity: 'rare', unlockCost: 80, color: '#FF69B4' },
  { id: 'hair_buns', name: 'Space Buns', category: 'hair', rarity: 'rare', unlockCost: 100, color: '#C8A2C8' },
  { id: 'hair_princess', name: 'Princess Hair', category: 'hair', rarity: 'legendary', unlockCost: 200, color: '#FFD700', secondaryColor: '#FFF8DC' },
  // NEW hair
  { id: 'hair_braids', name: 'Twin Braids', category: 'hair', rarity: 'common', unlockCost: 35, color: '#CD853F' },
  { id: 'hair_curly', name: 'Curly Puff', category: 'hair', rarity: 'common', unlockCost: 25, color: '#4A2C2A' },
  { id: 'hair_sidepony', name: 'Side Pony', category: 'hair', rarity: 'rare', unlockCost: 90, color: '#FF1493' },
  { id: 'hair_twintails', name: 'Long Twintails', category: 'hair', rarity: 'rare', unlockCost: 110, color: '#87CEEB' },
  { id: 'hair_messy', name: 'Messy Bun', category: 'hair', rarity: 'common', unlockCost: 30, color: '#D2691E' },
  { id: 'hair_rainbow', name: 'Rainbow Hair', category: 'hair', rarity: 'legendary', unlockCost: 250, color: '#FF69B4', secondaryColor: '#87CEEB' },

  // === TOPS (existing 6 + 6 new = 12) ===
  { id: 'top_tshirt', name: 'T-Shirt', category: 'top', rarity: 'common', unlockCost: 0, color: '#FF69B4' },
  { id: 'top_blouse', name: 'Ruffle Blouse', category: 'top', rarity: 'common', unlockCost: 30, color: '#E6E6FA' },
  { id: 'top_hoodie', name: 'Cozy Hoodie', category: 'top', rarity: 'common', unlockCost: 40, color: '#B2F5EA' },
  { id: 'top_crop', name: 'Crop Top', category: 'top', rarity: 'rare', unlockCost: 80, color: '#FF7F7F' },
  { id: 'top_jacket', name: 'Denim Jacket', category: 'top', rarity: 'rare', unlockCost: 100, color: '#6B8DD6' },
  { id: 'top_ballgown_top', name: 'Ball Gown Top', category: 'top', rarity: 'legendary', unlockCost: 200, color: '#FFD700', secondaryColor: '#FF69B4' },
  // NEW tops
  { id: 'top_sparkle', name: 'Sparkle Tank', category: 'top', rarity: 'common', unlockCost: 35, color: '#FFB6C1' },
  { id: 'top_cardigan', name: 'Cozy Cardigan', category: 'top', rarity: 'common', unlockCost: 30, color: '#DDA0DD' },
  { id: 'top_corset', name: 'Lace Corset', category: 'top', rarity: 'rare', unlockCost: 90, color: '#FF69B4' },
  { id: 'top_offsh', name: 'Off-Shoulder', category: 'top', rarity: 'rare', unlockCost: 85, color: '#E6E6FA' },
  { id: 'top_sequin', name: 'Sequin Top', category: 'top', rarity: 'rare', unlockCost: 120, color: '#C0C0C0', secondaryColor: '#FFD700' },
  { id: 'top_fairy', name: 'Fairy Dress Top', category: 'top', rarity: 'legendary', unlockCost: 220, color: '#B2F5EA', secondaryColor: '#E6E6FA' },

  // === BOTTOMS (existing 6 + 6 new = 12) ===
  { id: 'bottom_skirt', name: 'Mini Skirt', category: 'bottom', rarity: 'common', unlockCost: 0, color: '#FF69B4' },
  { id: 'bottom_jeans', name: 'Jeans', category: 'bottom', rarity: 'common', unlockCost: 30, color: '#6B8DD6' },
  { id: 'bottom_tutu', name: 'Tutu', category: 'bottom', rarity: 'rare', unlockCost: 80, color: '#E6E6FA' },
  { id: 'bottom_shorts', name: 'Cute Shorts', category: 'bottom', rarity: 'common', unlockCost: 40, color: '#FEFCBF' },
  { id: 'bottom_flowy', name: 'Flowy Skirt', category: 'bottom', rarity: 'rare', unlockCost: 100, color: '#B2F5EA' },
  { id: 'bottom_ballgown', name: 'Ball Gown Skirt', category: 'bottom', rarity: 'legendary', unlockCost: 200, color: '#FFD700', secondaryColor: '#FF69B4' },
  // NEW bottoms
  { id: 'bottom_pleated', name: 'Pleated Skirt', category: 'bottom', rarity: 'common', unlockCost: 35, color: '#1A1A2E' },
  { id: 'bottom_overalls', name: 'Cute Overalls', category: 'bottom', rarity: 'common', unlockCost: 40, color: '#6B8DD6' },
  { id: 'bottom_mermaid', name: 'Mermaid Tail', category: 'bottom', rarity: 'rare', unlockCost: 110, color: '#40E0D0', secondaryColor: '#87CEEB' },
  { id: 'bottom_sparkle_skirt', name: 'Sparkle Skirt', category: 'bottom', rarity: 'rare', unlockCost: 95, color: '#C0C0C0' },
  { id: 'bottom_rainbow', name: 'Rainbow Skirt', category: 'bottom', rarity: 'rare', unlockCost: 120, color: '#FF69B4', secondaryColor: '#FEFCBF' },
  { id: 'bottom_princess', name: 'Princess Gown', category: 'bottom', rarity: 'legendary', unlockCost: 230, color: '#E6E6FA', secondaryColor: '#FFD700' },

  // === SHOES (existing 6 + 6 new = 12) ===
  { id: 'shoes_sneakers', name: 'Sneakers', category: 'shoes', rarity: 'common', unlockCost: 0, color: '#FFFFFF', secondaryColor: '#FF69B4' },
  { id: 'shoes_boots', name: 'Ankle Boots', category: 'shoes', rarity: 'common', unlockCost: 40, color: '#8B4513' },
  { id: 'shoes_heels', name: 'Sparkle Heels', category: 'shoes', rarity: 'rare', unlockCost: 80, color: '#FF69B4' },
  { id: 'shoes_sandals', name: 'Strappy Sandals', category: 'shoes', rarity: 'common', unlockCost: 30, color: '#FFD700' },
  { id: 'shoes_platforms', name: 'Platform Boots', category: 'shoes', rarity: 'rare', unlockCost: 100, color: '#1A1A2E' },
  { id: 'shoes_glass', name: 'Glass Slippers', category: 'shoes', rarity: 'legendary', unlockCost: 200, color: '#87CEEB', secondaryColor: '#FFFFFF' },
  // NEW shoes
  { id: 'shoes_ballet', name: 'Ballet Flats', category: 'shoes', rarity: 'common', unlockCost: 25, color: '#FFB6C1' },
  { id: 'shoes_cowgirl', name: 'Cowgirl Boots', category: 'shoes', rarity: 'common', unlockCost: 45, color: '#DEB887' },
  { id: 'shoes_sparkle_boots', name: 'Glitter Boots', category: 'shoes', rarity: 'rare', unlockCost: 90, color: '#FF69B4', secondaryColor: '#FFD700' },
  { id: 'shoes_rollers', name: 'Roller Skates', category: 'shoes', rarity: 'rare', unlockCost: 100, color: '#FF69B4', secondaryColor: '#FFFFFF' },
  { id: 'shoes_cloud', name: 'Cloud Shoes', category: 'shoes', rarity: 'rare', unlockCost: 110, color: '#FFFFFF', secondaryColor: '#87CEEB' },
  { id: 'shoes_crystal', name: 'Crystal Heels', category: 'shoes', rarity: 'legendary', unlockCost: 220, color: '#E6E6FA', secondaryColor: '#FFD700' },

  // === ACCESSORIES (existing 6 + 6 new = 12) ===
  { id: 'acc_bow', name: 'Hair Bow', category: 'accessory', rarity: 'common', unlockCost: 20, color: '#FF69B4' },
  { id: 'acc_crown', name: 'Tiara', category: 'accessory', rarity: 'rare', unlockCost: 100, color: '#FFD700' },
  { id: 'acc_flowers', name: 'Flower Crown', category: 'accessory', rarity: 'common', unlockCost: 40, color: '#FF7F7F', secondaryColor: '#B2F5EA' },
  { id: 'acc_sunglasses', name: 'Heart Shades', category: 'accessory', rarity: 'common', unlockCost: 30, color: '#FF69B4' },
  { id: 'acc_wings', name: 'Fairy Wings', category: 'accessory', rarity: 'legendary', unlockCost: 250, color: '#E6E6FA', secondaryColor: '#FF69B4' },
  { id: 'acc_halo', name: 'Angel Halo', category: 'accessory', rarity: 'rare', unlockCost: 120, color: '#FFD700' },
  // NEW accessories
  { id: 'acc_cat_ears', name: 'Cat Ears', category: 'accessory', rarity: 'common', unlockCost: 35, color: '#FFB6C1' },
  { id: 'acc_bunny_ears', name: 'Bunny Ears', category: 'accessory', rarity: 'common', unlockCost: 40, color: '#FFFFFF' },
  { id: 'acc_star_wand', name: 'Star Wand', category: 'accessory', rarity: 'rare', unlockCost: 100, color: '#FFD700', secondaryColor: '#FF69B4' },
  { id: 'acc_butterfly', name: 'Butterfly Wings', category: 'accessory', rarity: 'rare', unlockCost: 130, color: '#FF69B4', secondaryColor: '#FFD700' },
  { id: 'acc_sparkle_crown', name: 'Diamond Crown', category: 'accessory', rarity: 'legendary', unlockCost: 280, color: '#87CEEB', secondaryColor: '#FFFFFF' },
  { id: 'acc_devil_horns', name: 'Devil Horns', category: 'accessory', rarity: 'rare', unlockCost: 90, color: '#FF4444' },

  // === MAKEUP (new category - 8 items) ===
  { id: 'makeup_pink_lips', name: 'Pink Lips', category: 'makeup', rarity: 'common', unlockCost: 0, color: '#FF69B4' },
  { id: 'makeup_red_lips', name: 'Red Glam', category: 'makeup', rarity: 'common', unlockCost: 25, color: '#FF0000' },
  { id: 'makeup_blush', name: 'Rosy Blush', category: 'makeup', rarity: 'common', unlockCost: 20, color: '#FFB6C1' },
  { id: 'makeup_purple_eyes', name: 'Purple Glam', category: 'makeup', rarity: 'rare', unlockCost: 80, color: '#805AD5' },
  { id: 'makeup_blue_eyes', name: 'Ocean Eyes', category: 'makeup', rarity: 'rare', unlockCost: 80, color: '#4299E1' },
  { id: 'makeup_glitter', name: 'Glitter Face', category: 'makeup', rarity: 'rare', unlockCost: 100, color: '#FFD700' },
  { id: 'makeup_cat_eye', name: 'Cat Eye', category: 'makeup', rarity: 'rare', unlockCost: 90, color: '#1A1A2E' },
  { id: 'makeup_rainbow', name: 'Rainbow Glam', category: 'makeup', rarity: 'legendary', unlockCost: 200, color: '#FF69B4', secondaryColor: '#87CEEB' },
]

export function getItemsByCategory(category: string): ClothingItemData[] {
  return clothingCatalog.filter((item) => item.category === category)
}

export function getItemById(id: string): ClothingItemData | undefined {
  return clothingCatalog.find((item) => item.id === id)
}
