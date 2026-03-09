// Colors
export const COLORS = {
  pastelPink: '#FFB6C1',
  hotPink: '#FF69B4',
  magenta: '#FF00FF',
  lavender: '#E6E6FA',
  mint: '#B2F5EA',
  softYellow: '#FEFCBF',
  blush: '#FFC0CB',
  white: '#FFFFFF',
  gold: '#FFD700',
  coral: '#FF7F7F',
  skyBlue: '#87CEEB',
  lilac: '#C8A2C8',
} as const

export const SKIN_COLORS = [
  '#FDEBD0', '#F5CBA7', '#E8B896', '#D4A574',
  '#C68642', '#8D5524', '#FFE4E1', '#FFDAB9',
] as const

// World dimensions
export const WORLD = {
  groundSize: 60,
  boundaryRadius: 28,
  spawnPoint: [0, 0, 10] as [number, number, number],
  wardrobeStation: [-10, 0, -5] as [number, number, number],
  runwayPosition: [0, 0, -10] as [number, number, number],
  socialArea: [10, 0, 5] as [number, number, number],
} as const

// Avatar dimensions (chibi proportions)
export const AVATAR = {
  headRadius: 0.45,
  bodyHeight: 0.7,
  bodyWidth: 0.5,
  limbRadius: 0.1,
  limbLength: 0.5,
  totalHeight: 2.2,
} as const

// Movement
export const MOVEMENT = {
  speed: 5,
  acceleration: 12,
  deceleration: 8,
  rotationSpeed: 10,
} as const

// Economy
export const ECONOMY = {
  roundWinBase: 50,
  roundParticipation: 20,
  collectibleCoinValue: 10,
  dailyBonus: 100,
  milestones: [
    { coins: 500, reward: 'Sparkle Crown' },
    { coins: 1000, reward: 'VIP Wings' },
    { coins: 2000, reward: 'Rainbow Dress' },
  ],
} as const

// Round timing
export const ROUND = {
  dressingTime: 60,
  runwayTime: 20,
  scoringTime: 5,
  resultsTime: 8,
  announceTime: 5,
} as const
