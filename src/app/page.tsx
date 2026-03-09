'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useCallback } from 'react'
import World from '@/modules/world/World'
import PlayerController from '@/modules/movement/PlayerController'
import NPCManager from '@/modules/multiplayer/NPCManager'
import RoundManager from '@/modules/rounds/RoundManager'
import RunwayWalk from '@/modules/rounds/RunwayWalk'
import ThemeAnnouncer from '@/modules/rounds/ThemeAnnouncer'
import ResultsPanel from '@/modules/rounds/ResultsPanel'
import HUD from '@/modules/ui/HUD'
import WardrobePanel from '@/modules/wardrobe/WardrobePanel'
import MobileControls from '@/modules/movement/MobileControls'
import { useEconomyInit } from '@/modules/economy/useEconomy'
import { useEconomyStore } from '@/stores/economyStore'
import { useGameStore } from '@/stores/gameStore'
import { ECONOMY } from '@/utils/constants'

function GameUI() {
  useEconomyInit()
  const addCoins = useEconomyStore((s) => s.addCoins)
  const addToast = useGameStore((s) => s.addToast)

  const handleCoinCollect = useCallback(() => {
    addCoins(ECONOMY.collectibleCoinValue)
    addToast(`🪙 +${ECONOMY.collectibleCoinValue} coins!`)
  }, [addCoins, addToast])

  return (
    <div className="w-screen h-screen relative">
      {/* 3D Scene */}
      <Canvas
        shadows
        camera={{ fov: 50, near: 0.1, far: 200, position: [0, 5, 15] }}
        style={{ background: '#FFE4EC' }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <World onCoinCollect={handleCoinCollect} />
          <PlayerController />
          <NPCManager />
          <RunwayWalk />
          <RoundManager />
        </Suspense>
      </Canvas>

      {/* UI Overlays */}
      <HUD />
      <ThemeAnnouncer />
      <WardrobePanel />
      <ResultsPanel />

      {/* Mobile Controls */}
      <div className="sm:hidden">
        <MobileControls />
      </div>
    </div>
  )
}

export default function Home() {
  return <GameUI />
}
