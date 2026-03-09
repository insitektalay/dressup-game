'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '@/stores/gameStore'

export default function RunwayWalk() {
  const roundPhase = useGameStore((s) => s.roundPhase)
  const confettiRef = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(50 * 3)
    for (let i = 0; i < 50; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6
      positions[i * 3 + 1] = Math.random() * 5
      positions[i * 3 + 2] = -10 + (Math.random() - 0.5) * 10
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame(({ clock }) => {
    if (!confettiRef.current) return
    if (roundPhase !== 'RUNWAY' && roundPhase !== 'RESULTS') {
      confettiRef.current.visible = false
      return
    }
    confettiRef.current.visible = true
    const positions = confettiRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < positions.length / 3; i++) {
      positions[i * 3 + 1] -= 0.02
      if (positions[i * 3 + 1] < 0) {
        positions[i * 3 + 1] = 5 + Math.random() * 3
        positions[i * 3] = (Math.random() - 0.5) * 6
        positions[i * 3 + 2] = -10 + (Math.random() - 0.5) * 10
      }
    }
    confettiRef.current.geometry.attributes.position.needsUpdate = true
    confettiRef.current.rotation.y = clock.elapsedTime * 0.1
  })

  return (
    <points ref={confettiRef} visible={false} geometry={geometry}>
      <pointsMaterial color="#FF69B4" size={0.12} transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}
