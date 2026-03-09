import { create } from 'zustand'
import { AvatarState, DEFAULT_AVATAR } from '@/modules/avatar/types'
import type { ClothingCategory } from '@/modules/clothing/types'

interface AvatarStore {
  avatar: AvatarState
  setSkinColor: (color: string) => void
  setFaceStyle: (style: number) => void
  equipItem: (category: ClothingCategory, itemId: string | null) => void
  setAvatar: (avatar: AvatarState) => void
  resetAvatar: () => void
}

export const useAvatarStore = create<AvatarStore>((set) => ({
  avatar: { ...DEFAULT_AVATAR },
  setSkinColor: (color) => set((s) => ({ avatar: { ...s.avatar, skinColor: color } })),
  setFaceStyle: (style) => set((s) => ({ avatar: { ...s.avatar, faceStyle: style } })),
  equipItem: (category, itemId) =>
    set((s) => ({ avatar: { ...s.avatar, [category]: itemId } })),
  setAvatar: (avatar) => set({ avatar }),
  resetAvatar: () => set({ avatar: { ...DEFAULT_AVATAR } }),
}))
