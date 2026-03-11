'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getItemById } from './ClothingCatalog'
import type { Rarity } from './types'

// Hair styles
function PonytailHair({ color }: { color: string }) {
  return (
    <group position={[0, 0.05, 0]}>
      {/* Base hair cap */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.48, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Ponytail */}
      <mesh position={[0, -0.1, -0.35]} rotation={[0.4, 0, 0]}>
        <capsuleGeometry args={[0.12, 0.45, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function PigtailsHair({ color }: { color: string }) {
  return (
    <group position={[0, 0.05, 0]}>
      <mesh>
        <sphereGeometry args={[0.48, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Left pigtail */}
      <mesh position={[-0.4, -0.15, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.1, 0.4, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Right pigtail */}
      <mesh position={[0.4, -0.15, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.1, 0.4, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function BobHair({ color }: { color: string }) {
  return (
    <group position={[0, 0.0, 0]}>
      <mesh>
        <sphereGeometry args={[0.5, 16, 12]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function LongHair({ color }: { color: string }) {
  return (
    <group position={[0, 0.05, 0]}>
      <mesh>
        <sphereGeometry args={[0.48, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Long flowing back */}
      <mesh position={[0, -0.35, -0.15]} rotation={[0.15, 0, 0]}>
        <capsuleGeometry args={[0.25, 0.6, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Side strands */}
      <mesh position={[-0.3, -0.2, 0.1]}>
        <capsuleGeometry args={[0.08, 0.35, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.3, -0.2, 0.1]}>
        <capsuleGeometry args={[0.08, 0.35, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function SpaceBunsHair({ color }: { color: string }) {
  return (
    <group position={[0, 0.05, 0]}>
      <mesh>
        <sphereGeometry args={[0.48, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[-0.35, 0.25, 0]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.35, 0.25, 0]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function PrincessHair({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group position={[0, 0.05, 0]}>
      <mesh>
        <sphereGeometry args={[0.49, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0, -0.45, -0.1]} rotation={[0.1, 0, 0]}>
        <capsuleGeometry args={[0.3, 0.7, 8, 8]} />
        <meshToonMaterial color={secondaryColor || color} />
      </mesh>
      <mesh position={[-0.25, -0.15, 0.2]}>
        <capsuleGeometry args={[0.08, 0.25, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.25, -0.15, 0.2]}>
        <capsuleGeometry args={[0.08, 0.25, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

// Tops
function TShirtTop({ color }: { color: string }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.65, 0.5, 0.4]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Sleeves */}
      <mesh position={[-0.4, 0.05, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.2, 0.22, 0.25]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.4, 0.05, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.2, 0.22, 0.25]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function RuffleBlouse({ color }: { color: string }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.65, 0.5, 0.4]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Puffed sleeves */}
      <mesh position={[-0.4, 0.08, 0]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.4, 0.08, 0]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Collar ruffle */}
      <mesh position={[0, 0.25, 0.1]}>
        <torusGeometry args={[0.15, 0.04, 8, 16]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function HoodieTop({ color }: { color: string }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.7, 0.55, 0.45]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Hood */}
      <mesh position={[0, 0.35, -0.1]}>
        <sphereGeometry args={[0.25, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Pocket */}
      <mesh position={[0, -0.1, 0.23]}>
        <boxGeometry args={[0.35, 0.15, 0.02]} />
        <meshToonMaterial color={new THREE.Color(color).multiplyScalar(0.85).getStyle()} />
      </mesh>
    </group>
  )
}

function CropTop({ color }: { color: string }) {
  return (
    <group position={[0, 0.05, 0]}>
      <mesh>
        <boxGeometry args={[0.6, 0.35, 0.38]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function DenimJacket({ color }: { color: string }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.68, 0.52, 0.43]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Collar */}
      <mesh position={[-0.15, 0.28, 0.15]} rotation={[0.3, 0.2, 0]}>
        <boxGeometry args={[0.15, 0.08, 0.1]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.15, 0.28, 0.15]} rotation={[0.3, -0.2, 0]}>
        <boxGeometry args={[0.15, 0.08, 0.1]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Buttons */}
      <mesh position={[0, 0.05, 0.22]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshToonMaterial color="#FFD700" />
      </mesh>
      <mesh position={[0, -0.08, 0.22]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshToonMaterial color="#FFD700" />
      </mesh>
    </group>
  )
}

function BallGownTop({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.6, 0.45, 0.38]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Off-shoulder details */}
      <mesh position={[-0.35, 0.15, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshToonMaterial color={secondaryColor || color} />
      </mesh>
      <mesh position={[0.35, 0.15, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshToonMaterial color={secondaryColor || color} />
      </mesh>
    </group>
  )
}

// Bottoms
function MiniSkirt({ color }: { color: string }) {
  return (
    <mesh>
      <cylinderGeometry args={[0.25, 0.38, 0.35, 12]} />
      <meshToonMaterial color={color} />
    </mesh>
  )
}

function Jeans({ color }: { color: string }) {
  return (
    <group>
      {/* Left leg */}
      <mesh position={[-0.12, -0.1, 0]}>
        <capsuleGeometry args={[0.12, 0.3, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Right leg */}
      <mesh position={[0.12, -0.1, 0]}>
        <capsuleGeometry args={[0.12, 0.3, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Waistband */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.08, 12]} />
        <meshToonMaterial color={new THREE.Color(color).multiplyScalar(0.9).getStyle()} />
      </mesh>
    </group>
  )
}

function TutuBottom({ color }: { color: string }) {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.2, 0.5, 0.35, 16]} />
        <meshToonMaterial color={color} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.22, 0.52, 0.3, 16]} />
        <meshToonMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function CuteShorts({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[-0.12, 0, 0]}>
        <capsuleGeometry args={[0.13, 0.12, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.12, 0, 0]}>
        <capsuleGeometry args={[0.13, 0.12, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function FlowySkirt({ color }: { color: string }) {
  return (
    <mesh>
      <cylinderGeometry args={[0.22, 0.45, 0.45, 12]} />
      <meshToonMaterial color={color} />
    </mesh>
  )
}

function BallGownSkirt({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.25, 0.65, 0.6, 16]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.27, 0.6, 0.5, 16]} />
        <meshToonMaterial color={secondaryColor || color} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

// Shoes
function SneakerShoes({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group>
      <mesh position={[-0.12, 0, 0.05]}>
        <boxGeometry args={[0.15, 0.1, 0.25]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.12, 0, 0.05]}>
        <boxGeometry args={[0.15, 0.1, 0.25]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Sole accent */}
      <mesh position={[-0.12, -0.05, 0.05]}>
        <boxGeometry args={[0.16, 0.03, 0.26]} />
        <meshToonMaterial color={secondaryColor || '#FF69B4'} />
      </mesh>
      <mesh position={[0.12, -0.05, 0.05]}>
        <boxGeometry args={[0.16, 0.03, 0.26]} />
        <meshToonMaterial color={secondaryColor || '#FF69B4'} />
      </mesh>
    </group>
  )
}

function AnkleBoots({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[-0.12, 0.04, 0.03]}>
        <capsuleGeometry args={[0.08, 0.12, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.12, 0.04, 0.03]}>
        <capsuleGeometry args={[0.08, 0.12, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function SparkleHeels({ color }: { color: string }) {
  return (
    <group>
      {/* Left heel */}
      <mesh position={[-0.12, 0.02, 0.05]}>
        <boxGeometry args={[0.12, 0.08, 0.22]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[-0.12, 0.02, -0.07]}>
        <cylinderGeometry args={[0.02, 0.03, 0.1, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Right heel */}
      <mesh position={[0.12, 0.02, 0.05]}>
        <boxGeometry args={[0.12, 0.08, 0.22]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.12, 0.02, -0.07]}>
        <cylinderGeometry args={[0.02, 0.03, 0.1, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function StrappySandals({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[-0.12, -0.02, 0.03]}>
        <boxGeometry args={[0.13, 0.04, 0.24]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.12, -0.02, 0.03]}>
        <boxGeometry args={[0.13, 0.04, 0.24]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function PlatformBoots({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[-0.12, 0.06, 0.03]}>
        <capsuleGeometry args={[0.09, 0.18, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.12, 0.06, 0.03]}>
        <capsuleGeometry args={[0.09, 0.18, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Platform soles */}
      <mesh position={[-0.12, -0.04, 0.03]}>
        <boxGeometry args={[0.18, 0.08, 0.25]} />
        <meshToonMaterial color="#FF69B4" />
      </mesh>
      <mesh position={[0.12, -0.04, 0.03]}>
        <boxGeometry args={[0.18, 0.08, 0.25]} />
        <meshToonMaterial color="#FF69B4" />
      </mesh>
    </group>
  )
}

function GlassSlippers({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[-0.12, 0, 0.05]}>
        <boxGeometry args={[0.12, 0.08, 0.22]} />
        <meshToonMaterial color={color} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0.12, 0, 0.05]}>
        <boxGeometry args={[0.12, 0.08, 0.22]} />
        <meshToonMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

// Accessories
function HairBow({ color }: { color: string }) {
  return (
    <group>
      {/* Left bow loop */}
      <mesh position={[-0.12, 0, 0]} rotation={[0, 0, 0.3]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Right bow loop */}
      <mesh position={[0.12, 0, 0]} rotation={[0, 0, -0.3]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Center knot */}
      <mesh>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function Tiara({ color }: { color: string }) {
  return (
    <group rotation={[0.3, 0, 0]}>
      <mesh>
        <torusGeometry args={[0.25, 0.02, 8, 16, Math.PI]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Center gem */}
      <mesh position={[0, 0.12, 0]}>
        <octahedronGeometry args={[0.06]} />
        <meshToonMaterial color="#FF69B4" />
      </mesh>
      {/* Side gems */}
      <mesh position={[-0.15, 0.07, 0]}>
        <octahedronGeometry args={[0.04]} />
        <meshToonMaterial color="#87CEEB" />
      </mesh>
      <mesh position={[0.15, 0.07, 0]}>
        <octahedronGeometry args={[0.04]} />
        <meshToonMaterial color="#87CEEB" />
      </mesh>
    </group>
  )
}

function FlowerCrown({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  const flowers = []
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    flowers.push(
      <mesh key={i} position={[Math.cos(angle) * 0.25, 0, Math.sin(angle) * 0.25]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshToonMaterial color={i % 2 === 0 ? color : (secondaryColor || '#B2F5EA')} />
      </mesh>
    )
  }
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <torusGeometry args={[0.25, 0.02, 8, 16]} />
        <meshToonMaterial color={secondaryColor || '#B2F5EA'} />
      </mesh>
      {flowers}
    </group>
  )
}

function HeartShades({ color }: { color: string }) {
  return (
    <group position={[0, -0.55, 0.35]}>
      {/* Bridge */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.08, 0.02, 0.02]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Left lens (heart-ish) */}
      <mesh position={[-0.12, 0, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshToonMaterial color={color} transparent opacity={0.7} />
      </mesh>
      {/* Right lens */}
      <mesh position={[0.12, 0, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshToonMaterial color={color} transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

function FairyWings({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group position={[0, -0.75, -0.25]}>
      {/* Left upper wing */}
      <mesh position={[-0.35, 0.2, -0.1]} rotation={[0, -0.3, 0.2]}>
        <planeGeometry args={[0.5, 0.7]} />
        <meshToonMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* Right upper wing */}
      <mesh position={[0.35, 0.2, -0.1]} rotation={[0, 0.3, -0.2]}>
        <planeGeometry args={[0.5, 0.7]} />
        <meshToonMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* Left lower wing */}
      <mesh position={[-0.25, -0.15, -0.08]} rotation={[0, -0.2, 0.4]}>
        <planeGeometry args={[0.35, 0.4]} />
        <meshToonMaterial color={secondaryColor || color} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* Right lower wing */}
      <mesh position={[0.25, -0.15, -0.08]} rotation={[0, 0.2, -0.4]}>
        <planeGeometry args={[0.35, 0.4]} />
        <meshToonMaterial color={secondaryColor || color} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function AngelHalo({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.5
  })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
      <torusGeometry args={[0.3, 0.03, 8, 24]} />
      <meshToonMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  )
}

// === NEW HAIR COMPONENTS ===

function TwinBraidsHair({ color }: { color: string }) {
  return (
    <group position={[0, 0.05, 0]}>
      {/* Hair cap */}
      <mesh>
        <sphereGeometry args={[0.48, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Left braid */}
      <mesh position={[-0.25, -0.2, 0.15]}>
        <capsuleGeometry args={[0.07, 0.45, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Right braid */}
      <mesh position={[0.25, -0.2, 0.15]}>
        <capsuleGeometry args={[0.07, 0.45, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function CurlyPuffHair({ color }: { color: string }) {
  return (
    <group position={[0, 0.05, 0]}>
      {/* Large rounded afro puff */}
      <mesh>
        <sphereGeometry args={[0.58, 16, 16]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function SidePonyHair({ color }: { color: string }) {
  return (
    <group position={[0, 0.05, 0]}>
      {/* Hair cap */}
      <mesh>
        <sphereGeometry args={[0.48, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Side ponytail */}
      <mesh position={[0.4, -0.15, 0]} rotation={[0, 0, -0.4]}>
        <capsuleGeometry args={[0.1, 0.45, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function LongTwintailsHair({ color }: { color: string }) {
  return (
    <group position={[0, 0.05, 0]}>
      {/* Hair cap */}
      <mesh>
        <sphereGeometry args={[0.48, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Left long tail */}
      <mesh position={[-0.4, -0.35, 0]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.08, 0.7, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Right long tail */}
      <mesh position={[0.4, -0.35, 0]} rotation={[0, 0, -0.2]}>
        <capsuleGeometry args={[0.08, 0.7, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function MessyBunHair({ color }: { color: string }) {
  return (
    <group position={[0, 0.05, 0]}>
      {/* Hair cap */}
      <mesh>
        <sphereGeometry args={[0.48, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Messy bun on top */}
      <mesh position={[0, 0.35, -0.05]}>
        <sphereGeometry args={[0.2, 10, 10]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Loose strand */}
      <mesh position={[0.2, -0.05, 0.2]}>
        <capsuleGeometry args={[0.03, 0.15, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function RainbowHair({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group position={[0, 0.05, 0]}>
      {/* Hair cap */}
      <mesh>
        <sphereGeometry args={[0.49, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Long flowing back - primary */}
      <mesh position={[-0.12, -0.4, -0.1]} rotation={[0.1, 0, 0]}>
        <capsuleGeometry args={[0.15, 0.6, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Long flowing back - secondary */}
      <mesh position={[0.12, -0.4, -0.1]} rotation={[0.1, 0, 0]}>
        <capsuleGeometry args={[0.15, 0.6, 8, 8]} />
        <meshToonMaterial color={secondaryColor || color} />
      </mesh>
      {/* Front strands */}
      <mesh position={[-0.28, -0.15, 0.2]}>
        <capsuleGeometry args={[0.06, 0.25, 8, 8]} />
        <meshToonMaterial color={secondaryColor || color} />
      </mesh>
      <mesh position={[0.28, -0.15, 0.2]}>
        <capsuleGeometry args={[0.06, 0.25, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

// === NEW TOP COMPONENTS ===

function SparkleTank({ color }: { color: string }) {
  return (
    <group>
      {/* Sleeveless slim box */}
      <mesh>
        <boxGeometry args={[0.55, 0.48, 0.35]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function CozyCardigan({ color }: { color: string }) {
  return (
    <group>
      {/* Main body */}
      <mesh>
        <boxGeometry args={[0.7, 0.52, 0.42]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Rounded overlay front panels */}
      <mesh position={[-0.15, 0, 0.22]}>
        <boxGeometry args={[0.2, 0.5, 0.02]} />
        <meshToonMaterial color={new THREE.Color(color).multiplyScalar(0.9).getStyle()} />
      </mesh>
      <mesh position={[0.15, 0, 0.22]}>
        <boxGeometry args={[0.2, 0.5, 0.02]} />
        <meshToonMaterial color={new THREE.Color(color).multiplyScalar(0.9).getStyle()} />
      </mesh>
      {/* Sleeves */}
      <mesh position={[-0.42, 0.05, 0]} rotation={[0, 0, 0.4]}>
        <capsuleGeometry args={[0.1, 0.2, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.42, 0.05, 0]} rotation={[0, 0, -0.4]}>
        <capsuleGeometry args={[0.1, 0.2, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function LaceCorset({ color }: { color: string }) {
  return (
    <group>
      {/* Fitted narrow box */}
      <mesh>
        <boxGeometry args={[0.5, 0.45, 0.32]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Lace detail lines */}
      <mesh position={[0, 0, 0.17]}>
        <boxGeometry args={[0.02, 0.4, 0.01]} />
        <meshToonMaterial color={new THREE.Color(color).multiplyScalar(0.7).getStyle()} />
      </mesh>
    </group>
  )
}

function OffShoulderTop({ color }: { color: string }) {
  return (
    <group>
      {/* Main body */}
      <mesh>
        <boxGeometry args={[0.62, 0.45, 0.38]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Dropped shoulder spheres */}
      <mesh position={[-0.38, 0.08, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.38, 0.08, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function SequinTop({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group>
      {/* Main body */}
      <mesh>
        <boxGeometry args={[0.62, 0.48, 0.38]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Sequin accent strips */}
      <mesh position={[0, 0.15, 0.2]}>
        <boxGeometry args={[0.5, 0.06, 0.02]} />
        <meshToonMaterial color={secondaryColor || '#FFD700'} />
      </mesh>
      <mesh position={[0, -0.05, 0.2]}>
        <boxGeometry args={[0.5, 0.06, 0.02]} />
        <meshToonMaterial color={secondaryColor || '#FFD700'} />
      </mesh>
      {/* Sleeves */}
      <mesh position={[-0.38, 0.05, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.18, 0.2, 0.22]} />
        <meshToonMaterial color={secondaryColor || '#FFD700'} />
      </mesh>
      <mesh position={[0.38, 0.05, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.18, 0.2, 0.22]} />
        <meshToonMaterial color={secondaryColor || '#FFD700'} />
      </mesh>
    </group>
  )
}

function FairyDressTop({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group>
      {/* Fitted body */}
      <mesh>
        <boxGeometry args={[0.58, 0.45, 0.36]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Leaf-like shoulder pieces */}
      <mesh position={[-0.35, 0.15, 0]} rotation={[0, 0, 0.6]}>
        <planeGeometry args={[0.2, 0.3]} />
        <meshToonMaterial color={secondaryColor || color} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.35, 0.15, 0]} rotation={[0, 0, -0.6]}>
        <planeGeometry args={[0.2, 0.3]} />
        <meshToonMaterial color={secondaryColor || color} side={THREE.DoubleSide} />
      </mesh>
      {/* Extra leaf layers */}
      <mesh position={[-0.3, 0.1, -0.05]} rotation={[0.2, 0, 0.8]}>
        <planeGeometry args={[0.15, 0.25]} />
        <meshToonMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0.3, 0.1, -0.05]} rotation={[0.2, 0, -0.8]}>
        <planeGeometry args={[0.15, 0.25]} />
        <meshToonMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

// === NEW BOTTOM COMPONENTS ===

function PleatedSkirt({ color }: { color: string }) {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.24, 0.4, 0.38, 16]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Ridge details */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.41, 0.36, 16]} />
        <meshToonMaterial color={new THREE.Color(color).multiplyScalar(0.85).getStyle()} wireframe />
      </mesh>
    </group>
  )
}

function CuteOveralls({ color }: { color: string }) {
  return (
    <group>
      {/* Left leg */}
      <mesh position={[-0.12, -0.1, 0]}>
        <capsuleGeometry args={[0.12, 0.3, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Right leg */}
      <mesh position={[0.12, -0.1, 0]}>
        <capsuleGeometry args={[0.12, 0.3, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Bib */}
      <mesh position={[0, 0.18, 0.12]}>
        <boxGeometry args={[0.3, 0.2, 0.02]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Left strap */}
      <mesh position={[-0.1, 0.25, 0.06]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.05, 0.15, 0.02]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Right strap */}
      <mesh position={[0.1, 0.25, 0.06]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.05, 0.15, 0.02]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function MermaidTail({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group>
      {/* Narrow top */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.2, 0.18, 0.3, 12]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Wider bottom fin */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.18, 0.35, 0.2, 12]} />
        <meshToonMaterial color={secondaryColor || color} />
      </mesh>
      {/* Fin flaps */}
      <mesh position={[-0.15, -0.32, 0]} rotation={[0, 0, 0.4]}>
        <planeGeometry args={[0.2, 0.15]} />
        <meshToonMaterial color={secondaryColor || color} transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.15, -0.32, 0]} rotation={[0, 0, -0.4]}>
        <planeGeometry args={[0.2, 0.15]} />
        <meshToonMaterial color={secondaryColor || color} transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function SparkleSkirt({ color }: { color: string }) {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.24, 0.4, 0.38, 12]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Sparkle overlay */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.25, 0.42, 0.36, 12]} />
        <meshToonMaterial color="#FFFFFF" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

function RainbowSkirt({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.24, 0.42, 0.4, 12]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Secondary color layer */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.3, 0.44, 0.25, 12]} />
        <meshToonMaterial color={secondaryColor || color} transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

function PrincessGown({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group>
      {/* Very wide bell cylinder */}
      <mesh>
        <cylinderGeometry args={[0.28, 0.8, 0.7, 16]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Overlay layer */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.3, 0.75, 0.6, 16]} />
        <meshToonMaterial color={secondaryColor || color} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

// === NEW SHOE COMPONENTS ===

function BalletFlats({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[-0.12, -0.02, 0.05]}>
        <boxGeometry args={[0.13, 0.05, 0.22]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.12, -0.02, 0.05]}>
        <boxGeometry args={[0.13, 0.05, 0.22]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function CowgirlBoots({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[-0.12, 0.06, 0.03]}>
        <capsuleGeometry args={[0.09, 0.2, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.12, 0.06, 0.03]}>
        <capsuleGeometry args={[0.09, 0.2, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Heel detail */}
      <mesh position={[-0.12, -0.04, -0.05]}>
        <boxGeometry args={[0.08, 0.06, 0.06]} />
        <meshToonMaterial color={new THREE.Color(color).multiplyScalar(0.8).getStyle()} />
      </mesh>
      <mesh position={[0.12, -0.04, -0.05]}>
        <boxGeometry args={[0.08, 0.06, 0.06]} />
        <meshToonMaterial color={new THREE.Color(color).multiplyScalar(0.8).getStyle()} />
      </mesh>
    </group>
  )
}

function GlitterBoots({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group>
      <mesh position={[-0.12, 0.06, 0.03]}>
        <capsuleGeometry args={[0.09, 0.18, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.12, 0.06, 0.03]}>
        <capsuleGeometry args={[0.09, 0.18, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Sparkle platform soles */}
      <mesh position={[-0.12, -0.05, 0.03]}>
        <boxGeometry args={[0.18, 0.06, 0.25]} />
        <meshToonMaterial color={secondaryColor || '#FFD700'} />
      </mesh>
      <mesh position={[0.12, -0.05, 0.03]}>
        <boxGeometry args={[0.18, 0.06, 0.25]} />
        <meshToonMaterial color={secondaryColor || '#FFD700'} />
      </mesh>
    </group>
  )
}

function RollerSkates({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group>
      {/* Boot part */}
      <mesh position={[-0.12, 0.03, 0.03]}>
        <boxGeometry args={[0.14, 0.12, 0.22]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.12, 0.03, 0.03]}>
        <boxGeometry args={[0.14, 0.12, 0.22]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Wheels - left */}
      <mesh position={[-0.12, -0.05, 0.08]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshToonMaterial color={secondaryColor || '#FFFFFF'} />
      </mesh>
      <mesh position={[-0.12, -0.05, -0.02]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshToonMaterial color={secondaryColor || '#FFFFFF'} />
      </mesh>
      {/* Wheels - right */}
      <mesh position={[0.12, -0.05, 0.08]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshToonMaterial color={secondaryColor || '#FFFFFF'} />
      </mesh>
      <mesh position={[0.12, -0.05, -0.02]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshToonMaterial color={secondaryColor || '#FFFFFF'} />
      </mesh>
    </group>
  )
}

function CloudShoes({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group>
      {/* Rounded soft boxes */}
      <mesh position={[-0.12, 0, 0.05]}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.12, 0, 0.05]}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Cloud accent */}
      <mesh position={[-0.12, -0.04, 0.05]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshToonMaterial color={secondaryColor || '#87CEEB'} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0.12, -0.04, 0.05]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshToonMaterial color={secondaryColor || '#87CEEB'} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function CrystalHeels({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group>
      {/* Transparent shoe body */}
      <mesh position={[-0.12, 0.02, 0.05]}>
        <boxGeometry args={[0.12, 0.08, 0.22]} />
        <meshToonMaterial color={color} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0.12, 0.02, 0.05]}>
        <boxGeometry args={[0.12, 0.08, 0.22]} />
        <meshToonMaterial color={color} transparent opacity={0.5} />
      </mesh>
      {/* Crystal heel cylinders */}
      <mesh position={[-0.12, -0.02, -0.05]}>
        <cylinderGeometry args={[0.02, 0.03, 0.12, 8]} />
        <meshToonMaterial color={secondaryColor || '#FFD700'} />
      </mesh>
      <mesh position={[0.12, -0.02, -0.05]}>
        <cylinderGeometry args={[0.02, 0.03, 0.12, 8]} />
        <meshToonMaterial color={secondaryColor || '#FFD700'} />
      </mesh>
    </group>
  )
}

// === NEW ACCESSORY COMPONENTS ===

function CatEars({ color }: { color: string }) {
  return (
    <group>
      {/* Left ear - cone */}
      <mesh position={[-0.2, 0.05, 0]} rotation={[0, 0, 0.2]}>
        <coneGeometry args={[0.08, 0.18, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Right ear - cone */}
      <mesh position={[0.2, 0.05, 0]} rotation={[0, 0, -0.2]}>
        <coneGeometry args={[0.08, 0.18, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Inner ear detail */}
      <mesh position={[-0.2, 0.05, 0.02]} rotation={[0, 0, 0.2]}>
        <coneGeometry args={[0.05, 0.12, 8]} />
        <meshToonMaterial color="#FFE4E1" />
      </mesh>
      <mesh position={[0.2, 0.05, 0.02]} rotation={[0, 0, -0.2]}>
        <coneGeometry args={[0.05, 0.12, 8]} />
        <meshToonMaterial color="#FFE4E1" />
      </mesh>
    </group>
  )
}

function BunnyEars({ color }: { color: string }) {
  return (
    <group>
      {/* Left tall ear */}
      <mesh position={[-0.15, 0.25, 0]}>
        <capsuleGeometry args={[0.06, 0.35, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Right tall ear */}
      <mesh position={[0.15, 0.25, 0]}>
        <capsuleGeometry args={[0.06, 0.35, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Inner ear pink */}
      <mesh position={[-0.15, 0.25, 0.03]}>
        <capsuleGeometry args={[0.03, 0.28, 8, 8]} />
        <meshToonMaterial color="#FFB6C1" />
      </mesh>
      <mesh position={[0.15, 0.25, 0.03]}>
        <capsuleGeometry args={[0.03, 0.28, 8, 8]} />
        <meshToonMaterial color="#FFB6C1" />
      </mesh>
    </group>
  )
}

function StarWand({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group position={[0.5, -0.8, 0.2]}>
      {/* Stick */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshToonMaterial color={secondaryColor || '#FF69B4'} />
      </mesh>
      {/* Star on top */}
      <mesh position={[-0.06, 0.32, 0]}>
        <octahedronGeometry args={[0.1]} />
        <meshToonMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function ButterflyWings({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group position={[0, -0.75, -0.25]}>
      {/* Left upper wing */}
      <mesh position={[-0.3, 0.25, -0.1]} rotation={[0.1, -0.4, 0.3]}>
        <planeGeometry args={[0.45, 0.55]} />
        <meshToonMaterial color={color} transparent opacity={0.65} side={THREE.DoubleSide} />
      </mesh>
      {/* Right upper wing */}
      <mesh position={[0.3, 0.25, -0.1]} rotation={[0.1, 0.4, -0.3]}>
        <planeGeometry args={[0.45, 0.55]} />
        <meshToonMaterial color={color} transparent opacity={0.65} side={THREE.DoubleSide} />
      </mesh>
      {/* Left lower wing */}
      <mesh position={[-0.22, -0.1, -0.08]} rotation={[0, -0.3, 0.5]}>
        <planeGeometry args={[0.3, 0.35]} />
        <meshToonMaterial color={secondaryColor || color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* Right lower wing */}
      <mesh position={[0.22, -0.1, -0.08]} rotation={[0, 0.3, -0.5]}>
        <planeGeometry args={[0.3, 0.35]} />
        <meshToonMaterial color={secondaryColor || color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function DiamondCrown({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {/* Ring base */}
      <mesh>
        <torusGeometry args={[0.25, 0.025, 8, 16]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Tall spikes */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.25, Math.sin(angle) * 0.25, -0.12]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.025, 0.01, 0.2, 6]} />
            <meshToonMaterial color={i % 2 === 0 ? color : (secondaryColor || '#FFFFFF')} />
          </mesh>
        )
      })}
    </group>
  )
}

function DevilHorns({ color }: { color: string }) {
  return (
    <group>
      {/* Left horn - curved cone */}
      <mesh position={[-0.2, 0.05, 0.05]} rotation={[0.3, 0, 0.3]}>
        <coneGeometry args={[0.06, 0.25, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Right horn - curved cone */}
      <mesh position={[0.2, 0.05, 0.05]} rotation={[0.3, 0, -0.3]}>
        <coneGeometry args={[0.06, 0.25, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

// === MAKEUP COMPONENTS (face overlays at [0, 1.2, 0]) ===

function PinkLipsMakeup({ color }: { color: string }) {
  return (
    <group>
      {/* Small torus at mouth position */}
      <mesh position={[0, -0.08, 0.42]} rotation={[0.2, 0, 0]}>
        <torusGeometry args={[0.04, 0.015, 8, 12]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function RedLipsMakeup({ color }: { color: string }) {
  return (
    <group>
      {/* Slightly bigger torus at mouth */}
      <mesh position={[0, -0.08, 0.42]} rotation={[0.2, 0, 0]}>
        <torusGeometry args={[0.05, 0.018, 8, 12]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function RosyBlushMakeup({ color }: { color: string }) {
  return (
    <group>
      {/* Left cheek */}
      <mesh position={[-0.15, -0.02, 0.4]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.06, 16]} />
        <meshToonMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* Right cheek */}
      <mesh position={[0.15, -0.02, 0.4]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.06, 16]} />
        <meshToonMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function PurpleGlamMakeup({ color }: { color: string }) {
  return (
    <group>
      {/* Left eye shadow */}
      <mesh position={[-0.12, 0.05, 0.4]}>
        <circleGeometry args={[0.05, 12]} />
        <meshToonMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* Right eye shadow */}
      <mesh position={[0.12, 0.05, 0.4]}>
        <circleGeometry args={[0.05, 12]} />
        <meshToonMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function OceanEyesMakeup({ color }: { color: string }) {
  return (
    <group>
      {/* Left eye highlight */}
      <mesh position={[-0.12, 0.05, 0.4]}>
        <circleGeometry args={[0.05, 12]} />
        <meshToonMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* Right eye highlight */}
      <mesh position={[0.12, 0.05, 0.4]}>
        <circleGeometry args={[0.05, 12]} />
        <meshToonMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function GlitterFaceMakeup({ color }: { color: string }) {
  return (
    <group>
      {/* Scattered diamond shapes on face */}
      <mesh position={[-0.1, 0.08, 0.42]}>
        <octahedronGeometry args={[0.02]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.1, 0.08, 0.42]}>
        <octahedronGeometry args={[0.02]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[-0.15, 0, 0.41]}>
        <octahedronGeometry args={[0.018]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.15, 0, 0.41]}>
        <octahedronGeometry args={[0.018]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.1, 0.43]}>
        <octahedronGeometry args={[0.015]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[-0.05, -0.04, 0.42]}>
        <octahedronGeometry args={[0.015]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.05, -0.04, 0.42]}>
        <octahedronGeometry args={[0.015]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function CatEyeMakeup({ color }: { color: string }) {
  return (
    <group>
      {/* Left eye line - angled */}
      <mesh position={[-0.12, 0.05, 0.41]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.08, 0.012, 0.01]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Left wing */}
      <mesh position={[-0.17, 0.07, 0.41]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.04, 0.01, 0.01]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Right eye line - angled */}
      <mesh position={[0.12, 0.05, 0.41]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.08, 0.012, 0.01]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Right wing */}
      <mesh position={[0.17, 0.07, 0.41]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.04, 0.01, 0.01]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

function RainbowGlamMakeup({ color, secondaryColor }: { color: string; secondaryColor?: string }) {
  const colors = [color, secondaryColor || '#87CEEB', '#FFD700', '#B2F5EA', '#E6E6FA', '#FF7F7F']
  return (
    <group>
      {/* Multi-colored dots around face */}
      <mesh position={[-0.14, 0.08, 0.42]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshToonMaterial color={colors[0]} />
      </mesh>
      <mesh position={[0.14, 0.08, 0.42]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshToonMaterial color={colors[1]} />
      </mesh>
      <mesh position={[-0.08, 0.1, 0.43]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshToonMaterial color={colors[2]} />
      </mesh>
      <mesh position={[0.08, 0.1, 0.43]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshToonMaterial color={colors[3]} />
      </mesh>
      <mesh position={[-0.17, 0.02, 0.41]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshToonMaterial color={colors[4]} />
      </mesh>
      <mesh position={[0.17, 0.02, 0.41]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshToonMaterial color={colors[5]} />
      </mesh>
      <mesh position={[0, 0.12, 0.43]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshToonMaterial color={colors[0]} />
      </mesh>
    </group>
  )
}

// Component mapping
const CLOTHING_COMPONENTS: Record<string, React.FC<{ color: string; secondaryColor?: string }>> = {
  // Existing hair
  hair_ponytail: PonytailHair,
  hair_pigtails: PigtailsHair,
  hair_bob: BobHair,
  hair_long: LongHair,
  hair_buns: SpaceBunsHair,
  hair_princess: PrincessHair,
  // New hair
  hair_braids: TwinBraidsHair,
  hair_curly: CurlyPuffHair,
  hair_sidepony: SidePonyHair,
  hair_twintails: LongTwintailsHair,
  hair_messy: MessyBunHair,
  hair_rainbow: RainbowHair,
  // Existing tops
  top_tshirt: TShirtTop,
  top_blouse: RuffleBlouse,
  top_hoodie: HoodieTop,
  top_crop: CropTop,
  top_jacket: DenimJacket,
  top_ballgown_top: BallGownTop,
  // New tops
  top_sparkle: SparkleTank,
  top_cardigan: CozyCardigan,
  top_corset: LaceCorset,
  top_offsh: OffShoulderTop,
  top_sequin: SequinTop,
  top_fairy: FairyDressTop,
  // Existing bottoms
  bottom_skirt: MiniSkirt,
  bottom_jeans: Jeans,
  bottom_tutu: TutuBottom,
  bottom_shorts: CuteShorts,
  bottom_flowy: FlowySkirt,
  bottom_ballgown: BallGownSkirt,
  // New bottoms
  bottom_pleated: PleatedSkirt,
  bottom_overalls: CuteOveralls,
  bottom_mermaid: MermaidTail,
  bottom_sparkle_skirt: SparkleSkirt,
  bottom_rainbow: RainbowSkirt,
  bottom_princess: PrincessGown,
  // Existing shoes
  shoes_sneakers: SneakerShoes,
  shoes_boots: AnkleBoots,
  shoes_heels: SparkleHeels,
  shoes_sandals: StrappySandals,
  shoes_platforms: PlatformBoots,
  shoes_glass: GlassSlippers,
  // New shoes
  shoes_ballet: BalletFlats,
  shoes_cowgirl: CowgirlBoots,
  shoes_sparkle_boots: GlitterBoots,
  shoes_rollers: RollerSkates,
  shoes_cloud: CloudShoes,
  shoes_crystal: CrystalHeels,
  // Existing accessories
  acc_bow: HairBow,
  acc_crown: Tiara,
  acc_flowers: FlowerCrown,
  acc_sunglasses: HeartShades,
  acc_wings: FairyWings,
  acc_halo: AngelHalo,
  // New accessories
  acc_cat_ears: CatEars,
  acc_bunny_ears: BunnyEars,
  acc_star_wand: StarWand,
  acc_butterfly: ButterflyWings,
  acc_sparkle_crown: DiamondCrown,
  acc_devil_horns: DevilHorns,
  // Makeup
  makeup_pink_lips: PinkLipsMakeup,
  makeup_red_lips: RedLipsMakeup,
  makeup_blush: RosyBlushMakeup,
  makeup_purple_eyes: PurpleGlamMakeup,
  makeup_blue_eyes: OceanEyesMakeup,
  makeup_glitter: GlitterFaceMakeup,
  makeup_cat_eye: CatEyeMakeup,
  makeup_rainbow: RainbowGlamMakeup,
}

// Legendary glow wrapper
function LegendaryGlow({ children, rarity }: { children: React.ReactNode; rarity: Rarity }) {
  const ref = useRef<THREE.PointLight>(null)
  useFrame(({ clock }) => {
    if (ref.current && rarity === 'legendary') {
      ref.current.intensity = 0.5 + Math.sin(clock.elapsedTime * 3) * 0.3
    }
  })

  if (rarity !== 'legendary') return <>{children}</>

  return (
    <group>
      {children}
      <pointLight ref={ref} color="#FFD700" intensity={0.5} distance={2} />
    </group>
  )
}

interface ClothingItemProps {
  itemId: string
  position?: [number, number, number]
}

export default function ClothingItem({ itemId, position = [0, 0, 0] }: ClothingItemProps) {
  const item = getItemById(itemId)
  if (!item) return null

  const Component = CLOTHING_COMPONENTS[itemId]
  if (!Component) return null

  return (
    <group position={position}>
      <LegendaryGlow rarity={item.rarity}>
        <Component color={item.color} secondaryColor={item.secondaryColor} />
      </LegendaryGlow>
    </group>
  )
}
