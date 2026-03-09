'use client'

import { useGameStore } from '@/stores/gameStore'

export default function ThemeAnnouncer() {
  const roundPhase = useGameStore((s) => s.roundPhase)
  const currentTheme = useGameStore((s) => s.currentTheme)
  const roundTimer = useGameStore((s) => s.roundTimer)

  if (roundPhase === 'LOBBY') return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
      {roundPhase === 'THEME_ANNOUNCE' && currentTheme && (
        <div className="animate-fade-in text-center">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl shadow-lg">
            <p className="text-sm font-bold uppercase tracking-wider opacity-80">Fashion Round!</p>
            <p className="text-2xl font-bold mt-1">{currentTheme}</p>
          </div>
        </div>
      )}

      {roundPhase === 'DRESSING' && (
        <div className="animate-fade-in text-center">
          <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border-2 border-pink-300">
            <p className="text-sm text-purple-500 font-bold">Time to dress up!</p>
            <p className="text-3xl font-bold text-pink-500">{roundTimer}s</p>
          </div>
        </div>
      )}

      {roundPhase === 'RUNWAY' && (
        <div className="animate-fade-in text-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl shadow-lg">
            <p className="text-xl font-bold">Walk the Runway! 💃</p>
          </div>
        </div>
      )}

      {roundPhase === 'SCORING' && (
        <div className="animate-fade-in text-center">
          <div className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg border-2 border-yellow-300">
            <p className="text-xl font-bold text-purple-500">Judging... ✨</p>
          </div>
        </div>
      )}
    </div>
  )
}
