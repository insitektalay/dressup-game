'use client'

import { useRef, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Avatar from '@/modules/avatar/Avatar'
import { useAvatarStore } from '@/stores/avatarStore'
import { useGameStore } from '@/stores/gameStore'
import { useMovement } from './useMovement'
import ThirdPersonCamera from './ThirdPersonCamera'
import { MOVEMENT, WORLD } from '@/utils/constants'
import { distanceTo } from '@/utils/helpers'

export default function PlayerController() {
  const groupRef = useRef<THREE.Group>(null)
  const velocity = useRef(new THREE.Vector3())
  const currentRotation = useRef(0)
  const isWalkingRef = useRef(false)

  const avatar = useAvatarStore((s) => s.avatar)
  const setPlayerPosition = useGameStore((s) => s.setPlayerPosition)
  const setNearWardrobeStation = useGameStore((s) => s.setNearWardrobeStation)

  const { getDirection, isMoving, setJoystick } = useMovement()

  const handleJoystickMove = useCallback((x: number, y: number) => {
    setJoystick(x, y)
  }, [setJoystick])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const [dx, dz] = getDirection()
    const moving = isMoving()
    isWalkingRef.current = moving

    const targetVelX = dx * MOVEMENT.speed
    const targetVelZ = dz * MOVEMENT.speed

    // Acceleration / deceleration
    const accel = moving ? MOVEMENT.acceleration : MOVEMENT.deceleration
    velocity.current.x += (targetVelX - velocity.current.x) * accel * delta
    velocity.current.z += (targetVelZ - velocity.current.z) * accel * delta

    // Apply velocity
    groupRef.current.position.x += velocity.current.x * delta
    groupRef.current.position.z += velocity.current.z * delta

    // Boundary clamping
    const pos = groupRef.current.position
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
      // Wrap angle
      while (diff > Math.PI) diff -= Math.PI * 2
      while (diff < -Math.PI) diff += Math.PI * 2
      currentRotation.current += diff * MOVEMENT.rotationSpeed * delta
      groupRef.current.rotation.y = currentRotation.current
    }

    // Update stores
    const playerPos: [number, number, number] = [pos.x, pos.y, pos.z]
    setPlayerPosition(playerPos)

    // Check proximity to wardrobe station
    const nearWardrobe = distanceTo(playerPos, WORLD.wardrobeStation) < 4
    setNearWardrobeStation(nearWardrobe)
  })

  return (
    <>
      <group ref={groupRef} position={WORLD.spawnPoint}>
        <Avatar avatarState={avatar} isWalking={isWalkingRef.current} />
      </group>
      <ThirdPersonCamera target={groupRef} />

      {/* Expose joystick handler via global - picked up by VirtualJoystick */}
      <JoystickBridge onMove={handleJoystickMove} />
    </>
  )
}

// Bridge component to expose joystick handler to the HTML overlay
function JoystickBridge({ onMove }: { onMove: (x: number, y: number) => void }) {
  // Store the callback globally so VirtualJoystick can call it
  if (typeof window !== 'undefined') {
    (window as unknown as Record<string, unknown>).__joystickCallback = onMove
  }
  return null
}
