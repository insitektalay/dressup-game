export interface ThemeData {
  name: string
  emoji: string
  description: string
  bonusCategories: string[] // clothing categories that score higher
}

export const THEMES: ThemeData[] = [
  { name: 'Princess Ball', emoji: '👸', description: 'Dress like royalty!', bonusCategories: ['accessory', 'bottom'] },
  { name: 'Beach Day', emoji: '🏖️', description: 'Fun in the sun!', bonusCategories: ['shoes', 'top'] },
  { name: 'Pop Star', emoji: '🎤', description: 'Ready to perform!', bonusCategories: ['hair', 'accessory'] },
  { name: 'Fairy Tale', emoji: '🧚', description: 'Once upon a time...', bonusCategories: ['accessory', 'hair'] },
  { name: 'Pink Everything', emoji: '💖', description: 'Think pink!', bonusCategories: ['top', 'bottom'] },
  { name: 'Sparkle Queen', emoji: '✨', description: 'Shine bright!', bonusCategories: ['accessory', 'shoes'] },
  { name: 'Garden Party', emoji: '🌸', description: 'Flowers everywhere!', bonusCategories: ['hair', 'bottom'] },
  { name: 'Dance Star', emoji: '💃', description: 'Born to dance!', bonusCategories: ['shoes', 'top'] },
  { name: 'Winter Wonderland', emoji: '❄️', description: 'Cozy and cute!', bonusCategories: ['top', 'accessory'] },
  { name: 'Midnight Glow', emoji: '🌙', description: 'Glow in the dark!', bonusCategories: ['hair', 'shoes'] },
  { name: 'Y2K Vibes', emoji: '💿', description: 'Early 2000s glam!', bonusCategories: ['top', 'accessory'] },
  { name: 'Mermaid Dream', emoji: '🧜‍♀️', description: 'Under the sea!', bonusCategories: ['bottom', 'hair'] },
  { name: 'Cottagecore', emoji: '🌿', description: 'Soft & dreamy!', bonusCategories: ['bottom', 'shoes'] },
  { name: 'Glam Rock', emoji: '🎸', description: 'Rock and sparkle!', bonusCategories: ['top', 'shoes'] },
  { name: 'Pastel Dream', emoji: '🍬', description: 'Soft pastel vibes!', bonusCategories: ['top', 'bottom'] },
  { name: 'Red Carpet', emoji: '🌹', description: 'Hollywood glam!', bonusCategories: ['makeup', 'accessory'] },
  { name: 'Kawaii Queen', emoji: '🎀', description: 'Super cute!', bonusCategories: ['hair', 'accessory'] },
  { name: 'Space Princess', emoji: '🚀', description: 'Out of this world!', bonusCategories: ['accessory', 'shoes'] },
]

export function getRandomTheme(): ThemeData {
  return THEMES[Math.floor(Math.random() * THEMES.length)]
}
