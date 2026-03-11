'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Avatar from '@/modules/avatar/Avatar'
import NameLabel from './NameLabel'
import { NPC_CHAT_MESSAGES } from './types'
import type { AvatarState } from '@/modules/avatar/types'
import { randomBetween, randomFromArray } from '@/utils/helpers'
import { WORLD, ROUND } from '@/utils/constants'
import { useGameStore } from '@/stores/gameStore'

interface NPCAvatarProps {
  name: string
  avatarState: AvatarState
  startPosition: [number, number, number]
  npcIndex: number
}

export default function NPCAvatar({ name, avatarState, startPosition, npcIndex }: NPCAvatarProps) {
  const groupRef = useRef<THREE.Group>(null)
  const targetRef = useRef<THREE.Vector3>(new THREE.Vector3(...startPosition))
  const waitTimer = useRef(0)
  const isWalking = useRef(false)
  const rotationRef = useRef(0)
  const savedPosition = useRef(new THREE.Vector3(...startPosition))

  const roundPhase = useGameStore((s) => s.roundPhase)
  const runwayWalkerIndex = useGameStore((s) => s.runwayWalkerIndex)

  // This NPC's runway walker index is npcIndex + 1 (player is 0)
  const isMyTurnOnRunway = roundPhase === 'RUNWAY' && runwayWalkerIndex === npcIndex + 1

  const [chatMessage, setChatMessage] = useState<string | undefined>(undefined)

  // Periodically show chat messages
  useEffect(() => {
    const showChat = () => {
      setChatMessage(randomFromArray(NPC_CHAT_MESSAGES))
      setTimeout(() => setChatMessage(undefined), 4000)
    }
    const interval = setInterval(showChat, randomBetween(8000, 20000))
    const firstTimeout = setTimeout(showChat, randomBetween(2000, 6000))
    return () => {
      clearInterval(interval)
      clearTimeout(firstTimeout)
    }
  }, [])

  const pickNewTarget = () => {
    const maxR = WORLD.boundaryRadius - 3
    targetRef.current.set(
      randomBetween(-maxR, maxR),
      0,
      randomBetween(-maxR, maxR)
    )
    waitTimer.current = 0
  }

  const runwayStartTime = useRef(0)
  const runwayPhaseState = useRef<'idle' | 'walkToStart' | 'walkDown' | 'pose' | 'walkBack'>('idle')

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const pos = groupRef.current.position

    // Runway walking mode
    if (isMyTurnOnRunway) {
      if (runwayPhaseState.current === 'idle') {
        // Save current position and start walking to runway start
        savedPosition.current.copy(pos)
        runwayPhaseState.current = 'walkToStart'
      }

      const runwayStartX = WORLD.runwayStart[0]
      const runwayStartZ = WORLD.runwayStart[2]
      const runwayEndZ = WORLD.runwayEnd[2]

      if (runwayPhaseState.current === 'walkToStart') {
        // Walk to runway start
        const dx = runwayStartX - pos.x
        const dz = runwayStartZ - pos.z
        const dist = Math.sqrt(dx * dx + dz * dz)
        if (dist < 0.5) {
          runwayPhaseState.current = 'walkDown'
          runwayStartTime.current = state.clock.elapsedTime
        } else {
          const speed = 4
          pos.x += (dx / dist) * speed * delta
          pos.z += (dz / dist) * speed * delta
          isWalking.current = true
          const targetAngle = Math.atan2(dx / dist, dz / dist)
          rotationRef.current = targetAngle
          groupRef.current.rotation.y = rotationRef.current
        }
      } else if (runwayPhaseState.current === 'walkDown') {
        // Walk down the runway
        const elapsed = state.clock.elapsedTime - runwayStartTime.current
        const walkDuration = ROUND.runwayWalkTime * 0.6
        const t = Math.min(elapsed / walkDuration, 1)
        pos.x = runwayStartX
        pos.z = runwayStartZ + (runwayEndZ - runwayStartZ) * t
        isWalking.current = t < 1
        groupRef.current.rotation.y = Math.PI // Face forward (down runway)

        if (t >= 1) {
          runwayPhaseState.current = 'pose'
        }
      } else if (runwayPhaseState.current === 'pose') {
        // Hold pose at end of runway
        isWalking.current = false
        groupRef.current.rotation.y = Math.PI
      }
      return
    } else if (runwayPhaseState.current !== 'idle') {
      // Return to saved position
      runwayPhaseState.current = 'idle'
      pos.copy(savedPosition.current)
    }

    // Normal wandering behavior (only in LOBBY and DRESSING)
    if (roundPhase === 'RUNWAY' || roundPhase === 'VOTING' || roundPhase === 'RESULTS') {
      isWalking.current = false
      return
    }

    const target = targetRef.current
    const dx = target.x - pos.x
    const dz = target.z - pos.z
    const dist = Math.sqrt(dx * dx + dz * dz)

    if (dist < 1) {
      isWalking.current = false
      waitTimer.current += delta
      if (waitTimer.current > randomBetween(3, 8)) {
        pickNewTarget()
      }
    } else {
      isWalking.current = true
      const speed = 1.5
      const nx = dx / dist
      const nz = dz / dist
      pos.x += nx * speed * delta
      pos.z += nz * speed * delta

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
