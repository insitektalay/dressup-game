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
]

export function getRandomTheme(): ThemeData {
  return THEMES[Math.floor(Math.random() * THEMES.length)]
}
