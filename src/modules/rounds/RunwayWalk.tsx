'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '@/stores/gameStore'

// Camera flash particles
function CameraFlashes() {
  const ref = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const count = 30
    const positions = new Float32Array(count * 3)
    const opacities = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // Position flashes along the sides of the runway
      const side = i % 2 === 0 ? -1 : 1
      positions[i * 3] = side * (2.5 + Math.random() * 2)
      positions[i * 3 + 1] = 1 + Math.random() * 2
      positions[i * 3 + 2] = -10 + (Math.random() - 0.5) * 12
      opacities[i] = 0
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1))
    return geo
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const opacities = ref.current.geometry.attributes.opacity.array as Float32Array
    for (let i = 0; i < opacities.length; i++) {
      // Random camera flashes
      opacities[i] = Math.random() < 0.03 ? 1.0 : Math.max(0, opacities[i] - 0.05)
    }
    ref.current.geometry.attributes.opacity.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="#FFFFFF" size={0.3} transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

// Confetti particles
function Confetti() {
  const confettiRef = useRef<THREE.Points>(null)
  const count = 80

  const { geometry, colors } = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colorsArr = new Float32Array(count * 3)
    const palette = [
      [1, 0.41, 0.71],    // hot pink
      [1, 0.84, 0],       // gold
      [0.9, 0.9, 0.98],   // lavender
      [0.7, 0.96, 0.92],  // mint
      [0.53, 0.81, 0.92],  // sky blue
      [1, 0.5, 0.5],      // coral
    ]
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8
      positions[i * 3 + 1] = Math.random() * 6 + 2
      positions[i * 3 + 2] = -10 + (Math.random() - 0.5) * 12
      const c = palette[Math.floor(Math.random() * palette.length)]
      colorsArr[i * 3] = c[0]
      colorsArr[i * 3 + 1] = c[1]
      colorsArr[i * 3 + 2] = c[2]
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colorsArr, 3))
    return { geometry: geo, colors: colorsArr }
  }, [])

  useFrame(({ clock }) => {
    if (!confettiRef.current) return
    const positions = confettiRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      // Drift down and sway
      positions[i * 3] += Math.sin(clock.elapsedTime * 2 + i) * 0.005
      positions[i * 3 + 1] -= 0.02 + Math.random() * 0.01
      if (positions[i * 3 + 1] < 0) {
        positions[i * 3 + 1] = 6 + Math.random() * 3
        positions[i * 3] = (Math.random() - 0.5) * 8
        positions[i * 3 + 2] = -10 + (Math.random() - 0.5) * 12
      }
    }
    confettiRef.current.geometry.attributes.position.needsUpdate = true
    confettiRef.current.rotation.y = clock.elapsedTime * 0.05
  })

  return (
    <points ref={confettiRef} geometry={geometry}>
      <pointsMaterial
        size={0.15}
        transparent
        opacity={0.9}
        sizeAttenuation
        vertexColors
      />
    </points>
  )
}

// Spotlight beams
function Spotlights() {
  const ref = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.children.forEach((child, i) => {
      child.rotation.z = Math.sin(clock.elapsedTime * 1.5 + i * 1.2) * 0.3
    })
  })

  return (
    <group ref={ref}>
      {/* Left spot */}
      <spotLight
        position={[-4, 5, -10]}
        angle={0.3}
        penumbra={0.5}
        intensity={2}
        color="#FF69B4"
        target-position={[0, 0, -12]}
      />
      {/* Right spot */}
      <spotLight
        position={[4, 5, -10]}
        angle={0.3}
        penumbra={0.5}
        intensity={2}
        color="#E6E6FA"
        target-position={[0, 0, -12]}
      />
      {/* Center spot */}
      <spotLight
        position={[0, 6, -14]}
        angle={0.4}
        penumbra={0.3}
        intensity={3}
        color="#FFF8DC"
        target-position={[0, 0, -14]}
      />
    </group>
  )
}

export default function RunwayWalk() {
  const roundPhase = useGameStore((s) => s.roundPhase)
  const isRunway = roundPhase === 'RUNWAY'
  const isResults = roundPhase === 'RESULTS'
  const isActive = isRunway || isResults

  return (
    <group visible={isActive}>
      {isActive && <Confetti />}
      {isRunway && <CameraFlashes />}
      {isRunway && <Spotlights />}
    </group>
  )
}
