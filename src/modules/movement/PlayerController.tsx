'use client'

import { useRef, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Avatar from '@/modules/avatar/Avatar'
import { useAvatarStore } from '@/stores/avatarStore'
import { useGameStore } from '@/stores/gameStore'
import { useMovement } from './useMovement'
import ThirdPersonCamera from './ThirdPersonCamera'
import { MOVEMENT, WORLD, ROUND } from '@/utils/constants'
import { distanceTo } from '@/utils/helpers'

export default function PlayerController() {
  const groupRef = useRef<THREE.Group>(null)
  const velocity = useRef(new THREE.Vector3())
  const currentRotation = useRef(0)
  const isWalkingRef = useRef(false)
  const savedPosition = useRef(new THREE.Vector3())
  const runwayStartTime = useRef(0)
  const runwayPhaseState = useRef<'idle' | 'walkToStart' | 'walkDown' | 'pose'>('idle')

  const avatar = useAvatarStore((s) => s.avatar)
  const setPlayerPosition = useGameStore((s) => s.setPlayerPosition)
  const setNearWardrobeStation = useGameStore((s) => s.setNearWardrobeStation)
  const roundPhase = useGameStore((s) => s.roundPhase)
  const runwayWalkerIndex = useGameStore((s) => s.runwayWalkerIndex)

  const { getDirection, isMoving, setJoystick } = useMovement()

  const handleJoystickMove = useCallback((x: number, y: number) => {
    setJoystick(x, y)
  }, [setJoystick])

  const isMyTurnOnRunway = roundPhase === 'RUNWAY' && runwayWalkerIndex === 0

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const pos = groupRef.current.position

    // Runway walking mode for player
    if (isMyTurnOnRunway) {
      const runwayStartX = WORLD.runwayStart[0]
      const runwayStartZ = WORLD.runwayStart[2]
      const runwayEndZ = WORLD.runwayEnd[2]

      if (runwayPhaseState.current === 'idle') {
        savedPosition.current.copy(pos)
        runwayPhaseState.current = 'walkToStart'
      }

      if (runwayPhaseState.current === 'walkToStart') {
        const dx = runwayStartX - pos.x
        const dz = runwayStartZ - pos.z
        const dist = Math.sqrt(dx * dx + dz * dz)
        if (dist < 0.5) {
          runwayPhaseState.current = 'walkDown'
          runwayStartTime.current = state.clock.elapsedTime
        } else {
          const speed = 5
          pos.x += (dx / dist) * speed * delta
          pos.z += (dz / dist) * speed * delta
          isWalkingRef.current = true
          const targetAngle = Math.atan2(dx / dist, dz / dist)
          currentRotation.current = targetAngle
          groupRef.current.rotation.y = currentRotation.current
        }
      } else if (runwayPhaseState.current === 'walkDown') {
        const elapsed = state.clock.elapsedTime - runwayStartTime.current
        const walkDuration = ROUND.runwayWalkTime * 0.6
        const t = Math.min(elapsed / walkDuration, 1)
        pos.x = runwayStartX
        pos.z = runwayStartZ + (runwayEndZ - runwayStartZ) * t
        isWalkingRef.current = t < 1
        groupRef.current.rotation.y = Math.PI // Face down runway

        if (t >= 1) {
          runwayPhaseState.current = 'pose'
        }
      } else if (runwayPhaseState.current === 'pose') {
        isWalkingRef.current = false
        groupRef.current.rotation.y = Math.PI
      }

      const playerPos: [number, number, number] = [pos.x, pos.y, pos.z]
      setPlayerPosition(playerPos)
      return
    } else if (runwayPhaseState.current !== 'idle') {
      // Return from runway
      runwayPhaseState.current = 'idle'
      pos.copy(savedPosition.current)
      velocity.current.set(0, 0, 0)
    }

    // Disable movement during runway/voting/results
    if (roundPhase === 'RUNWAY' || roundPhase === 'VOTING' || roundPhase === 'RESULTS') {
      isWalkingRef.current = false
      const playerPos: [number, number, number] = [pos.x, pos.y, pos.z]
      setPlayerPosition(playerPos)
      return
    }

    // Normal movement
    const [dx, dz] = getDirection()
    const moving = isMoving()
    isWalkingRef.current = moving

    const targetVelX = dx * MOVEMENT.speed
    const targetVelZ = dz * MOVEMENT.speed

    const accel = moving ? MOVEMENT.acceleration : MOVEMENT.deceleration
    velocity.current.x += (targetVelX - velocity.current.x) * accel * delta
    velocity.current.z += (targetVelZ - velocity.current.z) * accel * delta

    groupRef.current.position.x += velocity.current.x * delta
    groupRef.current.position.z += velocity.current.z * delta

    // Boundary clamping
    const dist = Math.sqrt(pos.x * pos.x + pos.z * pos.z)
    if (dist > WORLD.boundaryRadius) {
      const angle = Math.atan2(pos.z, pos.x)
      pos.x = Math.cos(angle) * WORLD.boundaryRadius
      pos.z = Math.sin(angle) * WORLD.boundaryRadius
      velocity.current.x *= -0.5
      velocity.current.z *= -0.5
    }

    // Rotation towards movement direction
    if (moving) {
      const targetAngle = Math.atan2(dx, dz)
      let diff = targetAngle - currentRotation.current
      while (diff > Math.PI) diff -= Math.PI * 2
      while (diff < -Math.PI) diff += Math.PI * 2
      currentRotation.current += diff * MOVEMENT.rotationSpeed * delta
      groupRef.current.rotation.y = currentRotation.current
    }

    // Update stores
    const playerPos: [number, number, number] = [pos.x, pos.y, pos.z]
    setPlayerPosition(playerPos)

    const nearWardrobe = distanceTo(playerPos, WORLD.wardrobeStation) < 4
    setNearWardrobeStation(nearWardrobe)
  })

  return (
    <>
      <group ref={groupRef} position={WORLD.spawnPoint}>
        <Avatar avatarState={avatar} isWalking={isWalkingRef.current} />
      </group>
      <ThirdPersonCamera target={groupRef} />
      <JoystickBridge onMove={handleJoystickMove} />
    </>
  )
}

function JoystickBridge({ onMove }: { onMove: (x: number, y: number) => void }) {
  if (typeof window !== 'undefined') {
    (window as unknown as Record<string, unknown>).__joystickCallback = onMove
  }
  return null
}
