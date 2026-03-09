'use client'

import { WORLD } from '@/utils/constants'

export default function FashionPlaza() {
  const halfSize = WORLD.groundSize / 2

  return (
    <group>
      {/* Main ground plane - pastel tile look */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[WORLD.groundSize, WORLD.groundSize]} />
        <meshToonMaterial color="#F8E8EE" />
      </mesh>

      {/* Tile pattern overlay - checkerboard effect */}
      {Array.from({ length: 10 }).map((_, i) =>
        Array.from({ length: 10 }).map((_, j) => {
          if ((i + j) % 2 !== 0) return null
          const x = -halfSize + 3 + i * (WORLD.groundSize / 10)
          const z = -halfSize + 3 + j * (WORLD.groundSize / 10)
          return (
            <mesh key={`tile-${i}-${j}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0, z]}>
              <planeGeometry args={[WORLD.groundSize / 10 - 0.2, WORLD.groundSize / 10 - 0.2]} />
              <meshToonMaterial color="#FFE4EC" />
            </mesh>
          )
        })
      )}

      {/* Central plaza circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[5, 32]} />
        <meshToonMaterial color="#E6E6FA" />
      </mesh>

      {/* Decorative ring around plaza */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[4.8, 5.2, 32]} />
        <meshToonMaterial color="#FFD700" />
      </mesh>

      {/* Wardrobe station marker */}
      <group position={[-10, 0, -5]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <circleGeometry args={[2, 16]} />
          <meshToonMaterial color="#FF69B4" />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <ringGeometry args={[1.8, 2, 16]} />
          <meshToonMaterial color="#FFD700" />
        </mesh>
        {/* Wardrobe stand */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[1.5, 2, 0.3]} />
          <meshToonMaterial color="#C8A2C8" />
        </mesh>
        {/* Mirror */}
        <mesh position={[0, 1.2, 0.16]}>
          <circleGeometry args={[0.5, 16]} />
          <meshToonMaterial color="#87CEEB" />
        </mesh>
        {/* Mirror frame */}
        <mesh position={[0, 1.2, 0.15]}>
          <ringGeometry args={[0.48, 0.55, 16]} />
          <meshToonMaterial color="#FFD700" />
        </mesh>
      </group>

      {/* Path to runway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -5]}>
        <planeGeometry args={[2.5, 10]} />
        <meshToonMaterial color="#FFE4EC" />
      </mesh>

      {/* Edge walls / barriers (invisible but visual indicator) */}
      {[
        { pos: [0, 0.15, -halfSize] as [number, number, number], size: [WORLD.groundSize, 0.3, 0.5] as [number, number, number] },
        { pos: [0, 0.15, halfSize] as [number, number, number], size: [WORLD.groundSize, 0.3, 0.5] as [number, number, number] },
        { pos: [-halfSize, 0.15, 0] as [number, number, number], size: [0.5, 0.3, WORLD.groundSize] as [number, number, number] },
        { pos: [halfSize, 0.15, 0] as [number, number, number], size: [0.5, 0.3, WORLD.groundSize] as [number, number, number] },
      ].map((wall, i) => (
        <mesh key={`wall-${i}`} position={wall.pos}>
          <boxGeometry args={wall.size} />
          <meshToonMaterial color="#FFB6C1" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  )
}
