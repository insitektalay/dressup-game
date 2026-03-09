'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { AvatarState } from './types'
import { ATTACHMENT_POINTS } from './types'
import ClothingItem from '@/modules/clothing/ClothingItem'

interface AvatarProps {
  avatarState: AvatarState
  isWalking?: boolean
  position?: [number, number, number]
  rotation?: [number, number, number]
}

// Face styles
function Face({ style, skinColor }: { style: number; skinColor: string }) {
  const faces = [
    // Style 0: Happy
    <>
      {/* Eyes */}
      <mesh position={[-0.12, 0.05, 0.38]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#1A1A2E" />
      </mesh>
      <mesh position={[0.12, 0.05, 0.38]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#1A1A2E" />
      </mesh>
      {/* Eye shine */}
      <mesh position={[-0.1, 0.07, 0.42]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.14, 0.07, 0.42]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      {/* Smile */}
      <mesh position={[0, -0.08, 0.4]}>
        <torusGeometry args={[0.06, 0.015, 8, 16, Math.PI]} />
        <meshBasicMaterial color="#FF69B4" />
      </mesh>
      {/* Blush */}
      <mesh position={[-0.2, -0.02, 0.36]}>
        <circleGeometry args={[0.05, 12]} />
        <meshBasicMaterial color="#FFB6C1" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0.2, -0.02, 0.36]}>
        <circleGeometry args={[0.05, 12]} />
        <meshBasicMaterial color="#FFB6C1" transparent opacity={0.5} />
      </mesh>
    </>,
    // Style 1: Sparkle eyes
    <>
      <mesh position={[-0.12, 0.05, 0.38]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshBasicMaterial color="#805AD5" />
      </mesh>
      <mesh position={[0.12, 0.05, 0.38]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshBasicMaterial color="#805AD5" />
      </mesh>
      <mesh position={[-0.12, 0.07, 0.43]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.12, 0.07, 0.43]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, -0.07, 0.42]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#FF69B4" />
      </mesh>
      <mesh position={[-0.2, -0.02, 0.36]}>
        <circleGeometry args={[0.05, 12]} />
        <meshBasicMaterial color="#FFB6C1" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.2, -0.02, 0.36]}>
        <circleGeometry args={[0.05, 12]} />
        <meshBasicMaterial color="#FFB6C1" transparent opacity={0.6} />
      </mesh>
    </>,
    // Style 2: Cat face
    <>
      <mesh position={[-0.12, 0.05, 0.38]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#1A1A2E" />
      </mesh>
      <mesh position={[0.12, 0.05, 0.38]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#1A1A2E" />
      </mesh>
      <mesh position={[-0.1, 0.07, 0.42]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.14, 0.07, 0.42]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      {/* Cat mouth */}
      <mesh position={[0, -0.08, 0.42]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color={skinColor} />
      </mesh>
      {/* Whiskers (simplified) */}
      <mesh position={[-0.25, -0.05, 0.38]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.15, 0.008, 0.008]} />
        <meshBasicMaterial color="#1A1A2E" />
      </mesh>
      <mesh position={[0.25, -0.05, 0.38]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.15, 0.008, 0.008]} />
        <meshBasicMaterial color="#1A1A2E" />
      </mesh>
      <mesh position={[-0.2, -0.02, 0.36]}>
        <circleGeometry args={[0.04, 12]} />
        <meshBasicMaterial color="#FFB6C1" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0.2, -0.02, 0.36]}>
        <circleGeometry args={[0.04, 12]} />
        <meshBasicMaterial color="#FFB6C1" transparent opacity={0.5} />
      </mesh>
    </>,
  ]

  return <group>{faces[style % faces.length]}</group>
}

export default function Avatar({ avatarState, isWalking = false, position, rotation }: AvatarProps) {
  const groupRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const leftLegRef = useRef<THREE.Group>(null)
  const rightLegRef = useRef<THREE.Group>(null)
  const bodyRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const walkSpeed = 8
    const walkAmount = isWalking ? 0.4 : 0

    // Limb swing
    if (leftArmRef.current) leftArmRef.current.rotation.x = Math.sin(t * walkSpeed) * walkAmount
    if (rightArmRef.current) rightArmRef.current.rotation.x = -Math.sin(t * walkSpeed) * walkAmount
    if (leftLegRef.current) leftLegRef.current.rotation.x = -Math.sin(t * walkSpeed) * walkAmount * 0.6
    if (rightLegRef.current) rightLegRef.current.rotation.x = Math.sin(t * walkSpeed) * walkAmount * 0.6

    // Body bob
    if (bodyRef.current) {
      bodyRef.current.position.y = isWalking ? Math.abs(Math.sin(t * walkSpeed * 2)) * 0.05 : Math.sin(t * 1.5) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <group ref={bodyRef}>
        {/* Head */}
        <group position={[0, 1.2, 0]}>
          <mesh>
            <sphereGeometry args={[0.45, 16, 16]} />
            <meshToonMaterial color={avatarState.skinColor} />
          </mesh>
          <Face style={avatarState.faceStyle} skinColor={avatarState.skinColor} />

          {/* Hair */}
          {avatarState.hair && (
            <group position={ATTACHMENT_POINTS.hair.position.map((_, i) => ATTACHMENT_POINTS.hair.position[i] - [0, 1.2, 0][i]) as [number, number, number]}>
              <ClothingItem itemId={avatarState.hair} position={[0, 1.2, 0]} />
            </group>
          )}
        </group>

        {/* Body (torso) */}
        <group position={[0, 0.6, 0]}>
          {/* Base body */}
          <mesh>
            <capsuleGeometry args={[0.25, 0.35, 8, 12]} />
            <meshToonMaterial color={avatarState.skinColor} />
          </mesh>

          {/* Top clothing */}
          {avatarState.top && (
            <ClothingItem itemId={avatarState.top} position={[0, 0.05, 0]} />
          )}
        </group>

        {/* Bottom clothing / legs area */}
        <group position={[0, 0.2, 0]}>
          {avatarState.bottom ? (
            <ClothingItem itemId={avatarState.bottom} position={[0, 0, 0]} />
          ) : (
            <mesh>
              <capsuleGeometry args={[0.2, 0.15, 8, 8]} />
              <meshToonMaterial color={avatarState.skinColor} />
            </mesh>
          )}
        </group>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.4, 0.65, 0]}>
          <mesh position={[0, -0.2, 0]}>
            <capsuleGeometry args={[0.08, 0.3, 8, 8]} />
            <meshToonMaterial color={avatarState.skinColor} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.4, 0.65, 0]}>
          <mesh position={[0, -0.2, 0]}>
            <capsuleGeometry args={[0.08, 0.3, 8, 8]} />
            <meshToonMaterial color={avatarState.skinColor} />
          </mesh>
        </group>

        {/* Left Leg */}
        <group ref={leftLegRef} position={[-0.12, 0, 0]}>
          <mesh position={[0, -0.15, 0]}>
            <capsuleGeometry args={[0.09, 0.2, 8, 8]} />
            <meshToonMaterial color={avatarState.skinColor} />
          </mesh>
        </group>

        {/* Right Leg */}
        <group ref={rightLegRef} position={[0.12, 0, 0]}>
          <mesh position={[0, -0.15, 0]}>
            <capsuleGeometry args={[0.09, 0.2, 8, 8]} />
            <meshToonMaterial color={avatarState.skinColor} />
          </mesh>
        </group>

        {/* Shoes */}
        {avatarState.shoes && (
          <ClothingItem itemId={avatarState.shoes} position={ATTACHMENT_POINTS.shoes.position} />
        )}

        {/* Accessory */}
        {avatarState.accessory && (
          <ClothingItem itemId={avatarState.accessory} position={ATTACHMENT_POINTS.accessory.position} />
        )}
      </group>
    </group>
  )
}
