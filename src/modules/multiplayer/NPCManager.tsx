'use client'

import { useMemo } from 'react'
import NPCAvatar from './NPCAvatar'
import { NPC_NAMES } from './types'
import { clothingCatalog } from '@/modules/clothing/ClothingCatalog'
import { SKIN_COLORS } from '@/utils/constants'
import { randomFromArray, randomBetween } from '@/utils/helpers'
import type { AvatarState } from '@/modules/avatar/types'

function generateRandomAvatar(): AvatarState {
  const hairItems = clothingCatalog.filter((i) => i.category === 'hair')
  const topItems = clothingCatalog.filter((i) => i.category === 'top')
  const bottomItems = clothingCatalog.filter((i) => i.category === 'bottom')
  const shoeItems = clothingCatalog.filter((i) => i.category === 'shoes')
  const accItems = clothingCatalog.filter((i) => i.category === 'accessory')

  return {
    skinColor: randomFromArray(SKIN_COLORS),
    faceStyle: Math.floor(Math.random() * 3),
    hair: randomFromArray(hairItems).id,
    top: randomFromArray(topItems).id,
    bottom: randomFromArray(bottomItems).id,
    shoes: randomFromArray(shoeItems).id,
    accessory: Math.random() > 0.5 ? randomFromArray(accItems).id : null,
  }
}

export default function NPCManager() {
  const npcs = useMemo(() =>
    NPC_NAMES.map((name, i) => ({
      name,
      avatar: generateRandomAvatar(),
      position: [
        randomBetween(-15, 15),
        0,
        randomBetween(-15, 15),
      ] as [number, number, number],
    })),
  [])

  return (
    <group>
      {npcs.map((npc) => (
        <NPCAvatar
          key={npc.name}
          name={npc.name}
          avatarState={npc.avatar}
          startPosition={npc.position}
        />
      ))}
    </group>
  )
}
