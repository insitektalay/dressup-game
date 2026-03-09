'use client'

import { useGameStore } from '@/stores/gameStore'
import { useEconomyStore } from '@/stores/economyStore'
import CoinCounter from './CoinCounter'
import ToastContainer from './Toast'
import { triggerRound } from '@/modules/rounds/RoundManager'

export default function HUD() {
  const wardrobeOpen = useGameStore((s) => s.wardrobeOpen)
  const setWardrobeOpen = useGameStore((s) => s.setWardrobeOpen)
  const nearWardrobeStation = useGameStore((s) => s.nearWardrobeStation)
  const roundPhase = useGameStore((s) => s.roundPhase)
  const addToast = useGameStore((s) => s.addToast)
  const claimDailyBonus = useEconomyStore((s) => s.claimDailyBonus)

  const handleDailyBonus = () => {
    const claimed = claimDailyBonus()
    if (claimed) {
      addToast('🎁 Daily Bonus: +100 coins!')
    } else {
      addToast('✨ Already claimed today!')
    }
  }

  if (wardrobeOpen) return null

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 pointer-events-none">
        <div className="pointer-events-auto">
          <CoinCounter />
        </div>

        <div className="flex gap-2 pointer-events-auto">
          <button
            onClick={handleDailyBonus}
            className="bg-yellow-500/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-yellow-500 transition-colors border border-yellow-300/50 shadow-md"
          >
            🎁 Daily
          </button>
        </div>
      </div>

      {/* Bottom right buttons */}
      <div className="fixed bottom-8 right-4 z-40 flex flex-col gap-3">
        {/* Wardrobe button - always available but highlighted near station */}
        <button
          onClick={() => setWardrobeOpen(true)}
          className={`px-4 py-3 rounded-2xl font-bold text-sm shadow-lg transition-all ${
            nearWardrobeStation
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white scale-110 animate-pulse border-2 border-white/50'
              : 'bg-white/80 backdrop-blur-sm text-pink-600 hover:bg-white border border-pink-200'
          }`}
        >
          {nearWardrobeStation ? '✨ Open Wardrobe!' : '👗 Wardrobe'}
        </button>

        {/* Start Round button */}
        {roundPhase === 'LOBBY' && (
          <button
            onClick={() => triggerRound()}
            className="px-4 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:scale-105 transition-transform border border-white/30"
          >
            🎤 Start Round!
          </button>
        )}
      </div>

      {/* Mobile hint */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-30 sm:hidden">
        <p className="text-[10px] text-white/40 font-bold">Use joystick to move</p>
      </div>

      {/* Desktop hint */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 hidden sm:block">
        <p className="text-xs text-white/30 font-bold">WASD / Arrow keys to move | Right-click drag to orbit camera</p>
      </div>

      <ToastContainer />
    </>
  )
}
