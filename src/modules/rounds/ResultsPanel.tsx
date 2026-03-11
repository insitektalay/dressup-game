'use client'

import { useState, useEffect } from 'react'
import { useGameStore } from '@/stores/gameStore'
import { returnToLobby, triggerRound } from './RoundManager'

function ConfettiPiece({ delay }: { delay: number }) {
  const [style, setStyle] = useState({
    left: `${Math.random() * 100}%`,
    animationDelay: `${delay}s`,
    backgroundColor: ['#FF69B4', '#FFD700', '#E6E6FA', '#B2F5EA', '#FF7F7F', '#87CEEB'][Math.floor(Math.random() * 6)],
  })
  return (
    <div
      className="absolute w-2 h-2 rounded-sm animate-confetti"
      style={style}
    />
  )
}

export default function ResultsPanel() {
  const roundPhase = useGameStore((s) => s.roundPhase)
  const playerScore = useGameStore((s) => s.playerScore)
  const npcScores = useGameStore((s) => s.npcScores)
  const currentTheme = useGameStore((s) => s.currentTheme)
  const coinsEarned = useGameStore((s) => s.coinsEarned)
  const playerRank = useGameStore((s) => s.playerRank)
  const [showDetails, setShowDetails] = useState(false)
  const [showPlayAgain, setShowPlayAgain] = useState(false)

  useEffect(() => {
    if (roundPhase === 'RESULTS') {
      setShowDetails(false)
      setShowPlayAgain(false)
      const t1 = setTimeout(() => setShowDetails(true), 800)
      const t2 = setTimeout(() => setShowPlayAgain(true), 2000)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
  }, [roundPhase])

  if (roundPhase !== 'RESULTS') return null

  const allScores = [
    { name: 'You', score: playerScore, isPlayer: true },
    ...Object.entries(npcScores).map(([name, score]) => ({ name, score, isPlayer: false })),
  ].sort((a, b) => b.score - a.score)

  const medals = ['🥇', '🥈', '🥉']
  const top3 = allScores.slice(0, 3)
  const isTop3 = playerRank <= 3

  const handlePlayAgain = () => {
    returnToLobby()
    // Brief delay then start new round
    setTimeout(() => triggerRound(), 500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      {/* Confetti */}
      {isTop3 && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <ConfettiPiece key={i} delay={i * 0.08} />
          ))}
        </div>
      )}

      <div className="bg-gradient-to-b from-purple-900/95 to-pink-900/95 backdrop-blur-md rounded-3xl p-6 mx-4 w-full max-w-sm shadow-2xl border-2 border-pink-400/40 animate-results-pop">
        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-white">
            {playerRank === 1 ? '👑 YOU WON! 👑' :
             playerRank <= 3 ? '🎉 Amazing!' :
             '✨ Great Show!'}
          </h2>
          <p className="text-sm text-pink-300 mt-1">{currentTheme}</p>
        </div>

        {/* Podium for top 3 */}
        {showDetails && (
          <div className="animate-fade-in">
            {/* Podium visual */}
            <div className="flex justify-center items-end gap-2 mb-4 h-24">
              {/* 2nd place */}
              <div className="flex flex-col items-center">
                <span className="text-lg mb-1">{medals[1]}</span>
                <span className={`text-xs font-bold mb-1 ${top3[1]?.isPlayer ? 'text-pink-300' : 'text-white/70'}`}>
                  {top3[1]?.name}
                </span>
                <div className="w-16 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg" style={{ height: '48px' }}>
                  <div className="text-center pt-2 text-xs font-bold text-gray-700">{top3[1]?.score}</div>
                </div>
              </div>
              {/* 1st place */}
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1 animate-bounce">{medals[0]}</span>
                <span className={`text-xs font-bold mb-1 ${top3[0]?.isPlayer ? 'text-pink-300' : 'text-white/70'}`}>
                  {top3[0]?.name}
                </span>
                <div className="w-16 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-lg" style={{ height: '64px' }}>
                  <div className="text-center pt-3 text-sm font-bold text-yellow-800">{top3[0]?.score}</div>
                </div>
              </div>
              {/* 3rd place */}
              <div className="flex flex-col items-center">
                <span className="text-lg mb-1">{medals[2]}</span>
                <span className={`text-xs font-bold mb-1 ${top3[2]?.isPlayer ? 'text-pink-300' : 'text-white/70'}`}>
                  {top3[2]?.name}
                </span>
                <div className="w-16 bg-gradient-to-t from-amber-700 to-amber-500 rounded-t-lg" style={{ height: '36px' }}>
                  <div className="text-center pt-1 text-xs font-bold text-amber-900">{top3[2]?.score}</div>
                </div>
              </div>
            </div>

            {/* Your result */}
            <div className="bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-xl p-3 mb-3 border border-pink-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-pink-300">Your Placement</p>
                  <p className="text-2xl font-bold text-white">
                    {playerRank <= 3 ? medals[playerRank - 1] : `#${playerRank}`} {playerScore} pts
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-yellow-300">Coins Earned</p>
                  <p className="text-xl font-bold text-yellow-300 animate-pulse">
                    +{coinsEarned} 🪙
                  </p>
                </div>
              </div>
            </div>

            {/* Full rankings (collapsed) */}
            <div className="space-y-1 max-h-32 overflow-y-auto wardrobe-scroll">
              {allScores.map((entry, i) => (
                <div
                  key={entry.name}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-sm ${
                    entry.isPlayer
                      ? 'bg-pink-500/20 border border-pink-400/30'
                      : 'bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm w-6">{i < 3 ? medals[i] : `${i + 1}.`}</span>
                    <span className={`font-bold ${entry.isPlayer ? 'text-pink-300' : 'text-white/60'}`}>
                      {entry.name}
                    </span>
                  </div>
                  <span className={`font-bold ${entry.isPlayer ? 'text-pink-300' : 'text-white/40'}`}>
                    {entry.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Play Again button */}
        {showPlayAgain && (
          <div className="mt-4 animate-fade-in">
            <button
              onClick={handlePlayAgain}
              className="w-full py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white shadow-lg hover:scale-105 active:scale-95 transition-all border-2 border-white/30 animate-sparkle-border"
            >
              ✨ Play Again! ✨
            </button>
            <button
              onClick={returnToLobby}
              className="w-full mt-2 py-2 rounded-xl font-bold text-sm text-pink-300/60 hover:text-pink-300 transition-colors"
            >
              Back to Lobby
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
