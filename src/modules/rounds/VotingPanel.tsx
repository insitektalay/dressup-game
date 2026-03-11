'use client'

import { useState, useEffect, useCallback } from 'react'
import { useGameStore } from '@/stores/gameStore'
import { ROUND } from '@/utils/constants'

export default function VotingPanel() {
  const roundPhase = useGameStore((s) => s.roundPhase)
  const contestants = useGameStore((s) => s.contestants)
  const votingIndex = useGameStore((s) => s.votingIndex)
  const setVotingIndex = useGameStore((s) => s.setVotingIndex)
  const setPlayerVote = useGameStore((s) => s.setPlayerVote)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [selectedStars, setSelectedStars] = useState(0)
  const [timer, setTimer] = useState<number>(ROUND.votingTimePerContestant)

  const currentContestant = contestants[votingIndex]

  const advanceVoting = useCallback(() => {
    if (votingIndex < contestants.length - 1) {
      setVotingIndex(votingIndex + 1)
      setSelectedStars(0)
      setHoveredStar(0)
      setTimer(ROUND.votingTimePerContestant)
    }
  }, [votingIndex, contestants.length, setVotingIndex])

  // Timer countdown
  useEffect(() => {
    if (roundPhase !== 'VOTING') return
    setTimer(ROUND.votingTimePerContestant)
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          // Auto-vote 3 stars if no vote cast
          if (selectedStars === 0 && currentContestant) {
            setPlayerVote(currentContestant.name, 3)
          }
          advanceVoting()
          return ROUND.votingTimePerContestant
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [roundPhase, votingIndex, advanceVoting, selectedStars, currentContestant, setPlayerVote])

  if (roundPhase !== 'VOTING' || !currentContestant) return null

  const handleVote = (stars: number) => {
    setSelectedStars(stars)
    setPlayerVote(currentContestant.name, stars)

    // Auto-advance after a brief delay
    setTimeout(() => {
      advanceVoting()
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pb-8 pointer-events-none animate-fade-in">
      <div className="pointer-events-auto mx-4 w-full max-w-sm">
        {/* Contestant info */}
        <div className="bg-gradient-to-b from-purple-900/95 to-pink-900/95 backdrop-blur-md rounded-3xl p-5 border-2 border-pink-400/40 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-3">
            <p className="text-xs font-bold text-pink-300 uppercase tracking-wider">
              Rate this outfit! ({votingIndex + 1}/{contestants.length})
            </p>
            <p className="text-xl font-bold text-white mt-1">
              {currentContestant.name}
            </p>
            <div className="mt-1 text-xs text-pink-200/60">
              {timer}s remaining
            </div>
          </div>

          {/* Star voting */}
          <div className="flex justify-center gap-2 my-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleVote(star)}
                onPointerEnter={() => setHoveredStar(star)}
                onPointerLeave={() => setHoveredStar(0)}
                disabled={selectedStars > 0}
                className={`text-4xl transition-all duration-150 ${
                  selectedStars > 0
                    ? star <= selectedStars
                      ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]'
                      : 'opacity-30 scale-90'
                    : star <= (hoveredStar || 0)
                      ? 'scale-125 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]'
                      : 'scale-100 opacity-60 hover:opacity-100'
                }`}
              >
                {star <= (selectedStars || hoveredStar) ? '⭐' : '☆'}
              </button>
            ))}
          </div>

          {/* Vote feedback */}
          {selectedStars > 0 && (
            <div className="text-center animate-fade-in">
              <p className="text-sm font-bold text-yellow-300">
                {selectedStars === 5 ? '🔥 SLAY!' :
                 selectedStars === 4 ? '✨ Gorgeous!' :
                 selectedStars === 3 ? '💖 Nice!' :
                 selectedStars === 2 ? '👍 Okay' :
                 '😬 Needs work'}
              </p>
            </div>
          )}

          {/* Progress dots */}
          <div className="flex justify-center gap-1 mt-3">
            {contestants.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === votingIndex
                    ? 'bg-pink-400 scale-125'
                    : i < votingIndex
                      ? 'bg-pink-400/50'
                      : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
