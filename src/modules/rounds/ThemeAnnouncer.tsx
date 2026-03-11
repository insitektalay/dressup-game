'use client'

import { useGameStore } from '@/stores/gameStore'

export default function ThemeAnnouncer() {
  const roundPhase = useGameStore((s) => s.roundPhase)
  const currentTheme = useGameStore((s) => s.currentTheme)
  const roundTimer = useGameStore((s) => s.roundTimer)
  const runwayWalkerIndex = useGameStore((s) => s.runwayWalkerIndex)

  if (roundPhase === 'LOBBY' || roundPhase === 'RESULTS' || roundPhase === 'VOTING') return null

  const isUrgent = roundPhase === 'DRESSING' && roundTimer <= 10

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 pointer-events-none w-full max-w-md px-4">
      {roundPhase === 'THEME_ANNOUNCE' && currentTheme && (
        <div className="animate-theme-reveal text-center">
          {/* Sparkle burst background */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/20 to-pink-500/0 animate-pulse rounded-3xl blur-xl" />
            <div className="relative bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 text-white px-8 py-6 rounded-3xl shadow-2xl border-2 border-white/30">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink-200 mb-2">
                ✨ Fashion Round ✨
              </p>
              <p className="text-4xl font-bold animate-bounce-slow">{currentTheme}</p>
              <p className="text-sm text-pink-200 mt-2 opacity-80">
                Dress to impress!
              </p>
            </div>
          </div>
        </div>
      )}

      {roundPhase === 'DRESSING' && (
        <div className="animate-fade-in text-center">
          <div className={`backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl border-2 transition-all duration-300 ${
            isUrgent
              ? 'bg-red-500/90 border-red-300 animate-pulse-fast'
              : 'bg-white/90 border-pink-300'
          }`}>
            <p className={`text-sm font-bold ${isUrgent ? 'text-white' : 'text-purple-500'}`}>
              {isUrgent ? '⚡ HURRY UP! ⚡' : '👗 Time to dress up!'}
            </p>
            <p className={`text-4xl font-bold mt-1 ${
              isUrgent ? 'text-white animate-pulse-fast scale-110' : 'text-pink-500'
            }`}>
              {roundTimer}s
            </p>
            <p className="text-xs text-pink-400 mt-1">{currentTheme}</p>
          </div>
        </div>
      )}

      {roundPhase === 'RUNWAY' && (
        <div className="animate-fade-in text-center">
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-2xl border-2 border-white/30">
            <p className="text-2xl font-bold">
              {runwayWalkerIndex === 0 ? '💃 Your Turn!' : '👀 Watch the Show!'}
            </p>
            <div className="flex justify-center gap-1 mt-2">
              {['📸', '✨', '💫', '⭐', '🌟'].map((e, i) => (
                <span key={i} className="text-sm animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}>
                  {e}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
