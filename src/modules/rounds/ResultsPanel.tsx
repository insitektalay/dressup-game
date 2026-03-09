'use client'

import { useGameStore } from '@/stores/gameStore'

export default function ResultsPanel() {
  const roundPhase = useGameStore((s) => s.roundPhase)
  const playerScore = useGameStore((s) => s.playerScore)
  const npcScores = useGameStore((s) => s.npcScores)
  const currentTheme = useGameStore((s) => s.currentTheme)

  if (roundPhase !== 'RESULTS') return null

  const allScores = [
    { name: 'You', score: playerScore, isPlayer: true },
    ...Object.entries(npcScores).map(([name, score]) => ({ name, score, isPlayer: false })),
  ].sort((a, b) => b.score - a.score)

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white/95 rounded-3xl p-6 mx-4 w-full max-w-sm shadow-2xl border-2 border-pink-200">
        <h2 className="text-center text-2xl font-bold text-purple-600 mb-1">Results!</h2>
        <p className="text-center text-sm text-pink-400 mb-4">{currentTheme}</p>

        <div className="space-y-2">
          {allScores.map((entry, i) => (
            <div
              key={entry.name}
              className={`flex items-center justify-between px-4 py-2 rounded-xl ${
                entry.isPlayer
                  ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-300'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{i < 3 ? medals[i] : `${i + 1}.`}</span>
                <span className={`font-bold ${entry.isPlayer ? 'text-pink-600' : 'text-gray-700'}`}>
                  {entry.name}
                </span>
              </div>
              <span className={`font-bold ${entry.isPlayer ? 'text-purple-600' : 'text-gray-500'}`}>
                {entry.score} pts
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">Returning to lobby...</p>
      </div>
    </div>
  )
}
