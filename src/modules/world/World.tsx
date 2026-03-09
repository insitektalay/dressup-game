'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import FashionPlaza from './FashionPlaza'
import Runway from './Runway'
import Decorations from './Decorations'

// Sparkle particles floating in the world
function SparkleParticles() {
  const ref = useRef<THREE.Points>(null)
  const count = 80

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = Math.random() * 8 + 0.5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return geo
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const posAttr = ref.current.geometry.attributes.position
    const array = posAttr.array as Float32Array
    for (let i = 0; i < count; i++) {
      array[i * 3 + 1] += Math.sin(clock.elapsedTime * 0.5 + i) * 0.003
      if (array[i * 3 + 1] > 10) array[i * 3 + 1] = 0.5
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color="#FFD700"
        size={0.08}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Collectible coin in the world
export function CollectibleCoin({ position, onCollect }: { position: [number, number, number]; onCollect: () => void }) {
  const ref = useRef<THREE.Group>(null)
  const collected = useRef(false)

  useFrame(({ clock }) => {
    if (!ref.current || collected.current) return
    ref.current.rotation.y = clock.elapsedTime * 2
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 3) * 0.15
  })

  return (
    <group
      ref={ref}
      position={position}
      onClick={() => {
        if (!collected.current) {
          collected.current = true
          if (ref.current) ref.current.visible = false
          onCollect()
          // Respawn after 30 seconds
          setTimeout(() => {
            collected.current = false
            if (ref.current) ref.current.visible = true
          }, 30000)
        }
      }}
    >
      <mesh>
        <cylinderGeometry args={[0.25, 0.25, 0.06, 16]} />
        <meshToonMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
      </mesh>
      <pointLight color="#FFD700" intensity={0.3} distance={2} />
    </group>
  )
}

export default function World({ onCoinCollect }: { onCoinCollect: () => void }) {
  return (
    <group>
      {/* Sky / Lighting */}
      <ambientLight intensity={0.4} color="#FFF5F5" />
      <directionalLight
        position={[10, 15, 5]}
        intensity={0.8}
        color="#FFF8DC"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <hemisphereLight
        color="#FFB6C1"
        groundColor="#E6E6FA"
        intensity={0.4}
      />

      {/* Gradient sky - using a large sphere */}
      <mesh>
        <sphereGeometry args={[80, 32, 32]} />
        <meshBasicMaterial color="#FFE4EC" side={THREE.BackSide} />
      </mesh>
      {/* Sky gradient effect - upper dome */}
      <mesh>
        <sphereGeometry args={[79, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshBasicMaterial color="#E8D5F5" side={THREE.BackSide} transparent opacity={0.7} />
      </mesh>

      {/* Environment */}
      <FashionPlaza />
      <Runway />
      <Decorations />
      <SparkleParticles />

      {/* Collectible coins scattered around */}
      <CollectibleCoin position={[5, 0.5, 5]} onCollect={onCoinCollect} />
      <CollectibleCoin position={[-7, 0.5, 3]} onCollect={onCoinCollect} />
      <CollectibleCoin position={[3, 0.5, -3]} onCollect={onCoinCollect} />
      <CollectibleCoin position={[-5, 0.5, 8]} onCollect={onCoinCollect} />
      <CollectibleCoin position={[8, 0.5, -7]} onCollect={onCoinCollect} />
      <CollectibleCoin position={[-3, 0.5, -12]} onCollect={onCoinCollect} />
      <CollectibleCoin position={[6, 0.5, 12]} onCollect={onCoinCollect} />
    </group>
  )
}
