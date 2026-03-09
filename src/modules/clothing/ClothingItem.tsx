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

// Component mapping
const CLOTHING_COMPONENTS: Record<string, React.FC<{ color: string; secondaryColor?: string }>> = {
  hair_ponytail: PonytailHair,
  hair_pigtails: PigtailsHair,
  hair_bob: BobHair,
  hair_long: LongHair,
  hair_buns: SpaceBunsHair,
  hair_princess: PrincessHair,
  top_tshirt: TShirtTop,
  top_blouse: RuffleBlouse,
  top_hoodie: HoodieTop,
  top_crop: CropTop,
  top_jacket: DenimJacket,
  top_ballgown_top: BallGownTop,
  bottom_skirt: MiniSkirt,
  bottom_jeans: Jeans,
  bottom_tutu: TutuBottom,
  bottom_shorts: CuteShorts,
  bottom_flowy: FlowySkirt,
  bottom_ballgown: BallGownSkirt,
  shoes_sneakers: SneakerShoes,
  shoes_boots: AnkleBoots,
  shoes_heels: SparkleHeels,
  shoes_sandals: StrappySandals,
  shoes_platforms: PlatformBoots,
  shoes_glass: GlassSlippers,
  acc_bow: HairBow,
  acc_crown: Tiara,
  acc_flowers: FlowerCrown,
  acc_sunglasses: HeartShades,
  acc_wings: FairyWings,
  acc_halo: AngelHalo,
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
