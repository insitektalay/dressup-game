'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Fountain({ position }: { position: [number, number, number] }) {
  const waterRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (waterRef.current) {
      waterRef.current.scale.y = 1 + Math.sin(clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[1.5, 1.8, 0.4, 16]} />
        <meshToonMaterial color="#E6E6FA" />
      </mesh>
      {/* Inner basin */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.3, 16]} />
        <meshToonMaterial color="#C8A2C8" />
      </mesh>
      {/* Water */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.1, 16]} />
        <meshToonMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>
      {/* Center pillar */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.8, 8]} />
        <meshToonMaterial color="#E6E6FA" />
      </mesh>
      {/* Water spray */}
      <mesh ref={waterRef} position={[0, 1.5, 0]}>
        <coneGeometry args={[0.08, 0.4, 8]} />
        <meshToonMaterial color="#87CEEB" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function Bench({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Seat */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.2, 0.08, 0.4]} />
        <meshToonMaterial color="#DEB887" />
      </mesh>
      {/* Back */}
      <mesh position={[0, 0.65, -0.18]}>
        <boxGeometry args={[1.2, 0.4, 0.06]} />
        <meshToonMaterial color="#DEB887" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.5, 0.2, 0.1]}>
        <boxGeometry args={[0.06, 0.4, 0.06]} />
        <meshToonMaterial color="#FF69B4" />
      </mesh>
      <mesh position={[0.5, 0.2, 0.1]}>
        <boxGeometry args={[0.06, 0.4, 0.06]} />
        <meshToonMaterial color="#FF69B4" />
      </mesh>
      <mesh position={[-0.5, 0.2, -0.15]}>
        <boxGeometry args={[0.06, 0.4, 0.06]} />
        <meshToonMaterial color="#FF69B4" />
      </mesh>
      <mesh position={[0.5, 0.2, -0.15]}>
        <boxGeometry args={[0.06, 0.4, 0.06]} />
        <meshToonMaterial color="#FF69B4" />
      </mesh>
    </group>
  )
}

function FlowerBed({ position, color = '#FF69B4' }: { position: [number, number, number]; color?: string }) {
  const flowers = []
  for (let i = 0; i < 8; i++) {
    const x = (Math.random() - 0.5) * 1.5
    const z = (Math.random() - 0.5) * 1.5
    const flowerColor = ['#FF69B4', '#FF7F7F', '#E6E6FA', '#FEFCBF', '#FFB6C1'][i % 5]
    flowers.push(
      <group key={i} position={[x, 0.15, z]}>
        {/* Stem */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2, 4]} />
          <meshToonMaterial color="#4CAF50" />
        </mesh>
        {/* Flower head */}
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshToonMaterial color={flowerColor} />
        </mesh>
      </group>
    )
  }

  return (
    <group position={position}>
      {/* Bed base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1, 1.1, 0.1, 8]} />
        <meshToonMaterial color="#8B4513" />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 0.05, 8]} />
        <meshToonMaterial color="#5D4037" />
      </mesh>
      {/* Grass */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.04, 8]} />
        <meshToonMaterial color="#81C784" />
      </mesh>
      {flowers}
    </group>
  )
}

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 1.2, 6]} />
        <meshToonMaterial color="#8B4513" />
      </mesh>
      {/* Foliage layers */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.7, 8, 8]} />
        <meshToonMaterial color="#81C784" />
      </mesh>
      <mesh position={[0, 2.0, 0]}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshToonMaterial color="#A5D6A7" />
      </mesh>
      {/* Pink blossoms */}
      <mesh position={[0.3, 1.8, 0.3]}>
        <sphereGeometry args={[0.15, 6, 6]} />
        <meshToonMaterial color="#FFB6C1" />
      </mesh>
      <mesh position={[-0.3, 1.7, -0.2]}>
        <sphereGeometry args={[0.12, 6, 6]} />
        <meshToonMaterial color="#FF69B4" />
      </mesh>
      <mesh position={[0.1, 2.1, -0.2]}>
        <sphereGeometry args={[0.1, 6, 6]} />
        <meshToonMaterial color="#FFB6C1" />
      </mesh>
    </group>
  )
}

function Lamppost({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 2.4, 6]} />
        <meshToonMaterial color="#C8A2C8" />
      </mesh>
      {/* Lamp */}
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshToonMaterial color="#FEFCBF" emissive="#FEFCBF" emissiveIntensity={0.3} />
      </mesh>
      <pointLight position={[position[0], position[1] + 2.5, position[2]]} color="#FEFCBF" intensity={0.5} distance={5} />
    </group>
  )
}

export default function Decorations() {
  return (
    <group>
      {/* Fountain in center of plaza */}
      <Fountain position={[0, 0, 0]} />

      {/* Benches */}
      <Bench position={[-6, 0, 4]} rotation={[0, 0.5, 0]} />
      <Bench position={[6, 0, 4]} rotation={[0, -0.5, 0]} />
      <Bench position={[-4, 0, -8]} rotation={[0, Math.PI, 0]} />
      <Bench position={[4, 0, -8]} rotation={[0, Math.PI, 0]} />

      {/* Flower beds */}
      <FlowerBed position={[-8, 0, 0]} />
      <FlowerBed position={[8, 0, 0]} />
      <FlowerBed position={[0, 0, 8]} />
      <FlowerBed position={[-5, 0, -15]} />
      <FlowerBed position={[5, 0, -15]} />

      {/* Trees around the edges */}
      <Tree position={[-12, 0, -5]} />
      <Tree position={[12, 0, -5]} />
      <Tree position={[-10, 0, 10]} />
      <Tree position={[10, 0, 10]} />
      <Tree position={[-15, 0, 0]} />
      <Tree position={[15, 0, 0]} />
      <Tree position={[0, 0, 15]} />

      {/* Lampposts */}
      <Lamppost position={[-4, 0, 2]} />
      <Lamppost position={[4, 0, 2]} />
      <Lamppost position={[-3, 0, -12]} />
      <Lamppost position={[3, 0, -12]} />
    </group>
  )
}
