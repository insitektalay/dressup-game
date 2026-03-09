'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Avatar from '@/modules/avatar/Avatar'
import NameLabel from './NameLabel'
import { NPC_CHAT_MESSAGES } from './types'
import type { AvatarState } from '@/modules/avatar/types'
import { randomBetween, randomFromArray } from '@/utils/helpers'
import { WORLD } from '@/utils/constants'

interface NPCAvatarProps {
  name: string
  avatarState: AvatarState
  startPosition: [number, number, number]
}

export default function NPCAvatar({ name, avatarState, startPosition }: NPCAvatarProps) {
  const groupRef = useRef<THREE.Group>(null)
  const targetRef = useRef<THREE.Vector3>(new THREE.Vector3(...startPosition))
  const waitTimer = useRef(0)
  const isWalking = useRef(false)
  const rotationRef = useRef(0)

  const [chatMessage, setChatMessage] = useState<string | undefined>(undefined)

  // Periodically show chat messages
  useEffect(() => {
    const showChat = () => {
      setChatMessage(randomFromArray(NPC_CHAT_MESSAGES))
      setTimeout(() => setChatMessage(undefined), 4000)
    }
    const interval = setInterval(showChat, randomBetween(8000, 20000))
    // Show first message after a bit
    const firstTimeout = setTimeout(showChat, randomBetween(2000, 6000))
    return () => {
      clearInterval(interval)
      clearTimeout(firstTimeout)
    }
  }, [])

  // Pick a new wander target
  const pickNewTarget = () => {
    const maxR = WORLD.boundaryRadius - 3
    targetRef.current.set(
      randomBetween(-maxR, maxR),
      0,
      randomBetween(-maxR, maxR)
    )
    waitTimer.current = 0
  }

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const pos = groupRef.current.position
    const target = targetRef.current
    const dx = target.x - pos.x
    const dz = target.z - pos.z
    const dist = Math.sqrt(dx * dx + dz * dz)

    if (dist < 1) {
      // Arrived - wait a bit then pick new target
      isWalking.current = false
      waitTimer.current += delta
      if (waitTimer.current > randomBetween(3, 8)) {
        pickNewTarget()
      }
    } else {
      // Walk toward target
      isWalking.current = true
      const speed = 1.5
      const nx = dx / dist
      const nz = dz / dist
      pos.x += nx * speed * delta
      pos.z += nz * speed * delta

      // Face direction
      const targetAngle = Math.atan2(nx, nz)
      let diff = targetAngle - rotationRef.current
      while (diff > Math.PI) diff -= Math.PI * 2
      while (diff < -Math.PI) diff += Math.PI * 2
      rotationRef.current += diff * 5 * delta
      groupRef.current.rotation.y = rotationRef.current
    }
  })

  return (
    <group ref={groupRef} position={startPosition}>
      <Avatar avatarState={avatarState} isWalking={isWalking.current} />
      <NameLabel name={name} chatMessage={chatMessage} />
    </group>
  )
}
