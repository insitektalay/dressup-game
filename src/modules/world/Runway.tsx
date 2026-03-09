'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function RunwayLight({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.PointLight>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.intensity = 0.3 + Math.sin(clock.elapsedTime * 2 + position[0]) * 0.2
    }
  })
  return (
    <group position={position}>
      <mesh position={[0, 0.02, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshToonMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <pointLight ref={ref} color={color} intensity={0.3} distance={3} />
    </group>
  )
}

export default function Runway() {
  return (
    <group position={[0, 0, -10]}>
      {/* Main runway platform */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[3, 0.1, 12]} />
        <meshToonMaterial color="#E6E6FA" />
      </mesh>

      {/* Runway carpet */}
      <mesh position={[0, 0.11, 0]}>
        <boxGeometry args={[2, 0.02, 11.5]} />
        <meshToonMaterial color="#FF69B4" />
      </mesh>

      {/* Center line */}
      <mesh position={[0, 0.13, 0]}>
        <boxGeometry args={[0.05, 0.01, 11]} />
        <meshToonMaterial color="#FFD700" />
      </mesh>

      {/* Stage at the end */}
      <mesh position={[0, 0.15, -5]}>
        <boxGeometry args={[4, 0.3, 3]} />
        <meshToonMaterial color="#C8A2C8" />
      </mesh>

      {/* Stage backing */}
      <mesh position={[0, 1.2, -6.4]}>
        <boxGeometry args={[4.5, 2.4, 0.1]} />
        <meshToonMaterial color="#FFB6C1" />
      </mesh>

      {/* Star decoration on backdrop */}
      <mesh position={[0, 1.8, -6.3]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.4, 0.4, 0.05]} />
        <meshToonMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
      </mesh>

      {/* Side barriers */}
      {[-1.6, 1.6].map((x) =>
        Array.from({ length: 6 }).map((_, i) => (
          <group key={`${x}-${i}`} position={[x, 0, -4 + i * 2]}>
            {/* Post */}
            <mesh position={[0, 0.35, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.6, 6]} />
              <meshToonMaterial color="#FFD700" />
            </mesh>
            {/* Top */}
            <mesh position={[0, 0.65, 0]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshToonMaterial color="#FFD700" />
            </mesh>
          </group>
        ))
      )}

      {/* Runway lights */}
      {Array.from({ length: 6 }).map((_, i) => (
        <group key={`lights-${i}`}>
          <RunwayLight position={[-1.3, 0.12, -4 + i * 2]} color="#FF69B4" />
          <RunwayLight position={[1.3, 0.12, -4 + i * 2]} color="#C8A2C8" />
        </group>
      ))}

      {/* "RUNWAY" sign */}
      <mesh position={[0, 2.2, -6.3]}>
        <boxGeometry args={[2, 0.4, 0.05]} />
        <meshToonMaterial color="#FF69B4" emissive="#FF69B4" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}
