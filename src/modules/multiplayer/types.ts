import { AvatarState } from '../avatar/types'

export interface NPCData {
  id: string
  name: string
  avatar: AvatarState
  position: [number, number, number]
  targetPosition: [number, number, number]
  chatMessage?: string
  isWalking: boolean
}

export const NPC_NAMES = [
  'Sparkle',
  'Luna',
  'Bella',
  'Rosie',
  'Daisy',
] as const

export const NPC_CHAT_MESSAGES = [
  'Love your outfit! ✨',
  'This theme is so fun! 🎀',
  'Wanna be friends? 💖',
  'Fashion queen! 👑',
  'So pretty! 🌸',
  'OMG sparkles! ✨',
  'I love this game! 💕',
  'Your hair is goals! 💇‍♀️',
  'Runway time! 💃',
  'Best outfit ever! 🌟',
]
