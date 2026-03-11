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

  const isInGame = roundPhase !== 'LOBBY'

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

      {/* Bottom buttons */}
      <div className="fixed bottom-8 right-4 z-40 flex flex-col gap-3">
        {/* Wardrobe button */}
        {(roundPhase === 'LOBBY' || roundPhase === 'DRESSING') && (
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
        )}
      </div>

      {/* Big Start Fashion Show button - center bottom */}
      {roundPhase === 'LOBBY' && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={() => triggerRound()}
            className="relative px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-white/40 animate-sparkle-border group"
          >
            <span className="relative z-10">✨ Start Fashion Show! ✨</span>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
          </button>
        </div>
      )}

      {/* Skip voting button during VOTING */}
      {roundPhase === 'VOTING' && (
        <div className="fixed bottom-4 right-4 z-40">
          <button
            onClick={() => {
              // Force advance to results by setting votingIndex past end
              const { contestants } = useGameStore.getState()
              useGameStore.getState().setVotingIndex(contestants.length)
            }}
            className="px-3 py-1.5 rounded-full text-xs font-bold text-white/50 hover:text-white/80 transition-colors"
          >
            Skip →
          </button>
        </div>
      )}

      {/* Mobile hint */}
      {roundPhase === 'LOBBY' && (
        <>
          <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-30 sm:hidden">
            <p className="text-[10px] text-white/40 font-bold">Use joystick to move</p>
          </div>
          <div className="fixed bottom-4 left-4 z-30 hidden sm:block">
            <p className="text-xs text-white/30 font-bold">WASD to move | Right-click drag to orbit</p>
          </div>
        </>
      )}

      <ToastContainer />
    </>
  )
}
