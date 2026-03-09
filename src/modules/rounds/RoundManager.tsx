'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useGameStore, RoundPhase } from '@/stores/gameStore'
import { useAvatarStore } from '@/stores/avatarStore'
import { useEconomyStore } from '@/stores/economyStore'
import { getRandomTheme } from './themes'
import { calculateScore, generateNPCScore } from './Scoring'
import { ROUND, ECONOMY } from '@/utils/constants'
import { NPC_NAMES } from '@/modules/multiplayer/types'
import type { ThemeData } from './themes'

export default function RoundManager() {
  const setRoundPhase = useGameStore((s) => s.setRoundPhase)
  const setCurrentTheme = useGameStore((s) => s.setCurrentTheme)
  const setRoundTimer = useGameStore((s) => s.setRoundTimer)
  const setPlayerScore = useGameStore((s) => s.setPlayerScore)
  const setNpcScores = useGameStore((s) => s.setNpcScores)
  const addToast = useGameStore((s) => s.addToast)
  const roundPhase = useGameStore((s) => s.roundPhase)
  const avatar = useAvatarStore((s) => s.avatar)
  const addCoins = useEconomyStore((s) => s.addCoins)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const themeRef = useRef<ThemeData | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const advancePhase = useCallback((phase: RoundPhase, duration: number, nextPhase: () => void) => {
    setRoundPhase(phase)
    clearTimer()

    if (phase === 'DRESSING') {
      let timeLeft = duration
      setRoundTimer(timeLeft)
      timerRef.current = setInterval(() => {
        timeLeft--
        setRoundTimer(timeLeft)
        if (timeLeft <= 0) {
          clearTimer()
          nextPhase()
        }
      }, 1000)
    } else {
      setTimeout(nextPhase, duration * 1000)
    }
  }, [clearTimer, setRoundPhase, setRoundTimer])

  const startRound = useCallback(() => {
    const theme = getRandomTheme()
    themeRef.current = theme
    setCurrentTheme(`${theme.emoji} ${theme.name}`)

    // Phase: THEME_ANNOUNCE
    advancePhase('THEME_ANNOUNCE', ROUND.announceTime, () => {
      // Phase: DRESSING
      advancePhase('DRESSING', ROUND.dressingTime, () => {
        // Phase: RUNWAY
        advancePhase('RUNWAY', ROUND.runwayTime, () => {
          // Phase: SCORING
          const playerScore = calculateScore(avatar, theme)
          setPlayerScore(playerScore)

          const npcScores: Record<string, number> = {}
          NPC_NAMES.forEach((name) => {
            npcScores[name] = generateNPCScore()
          })
          setNpcScores(npcScores)

          advancePhase('SCORING', ROUND.scoringTime, () => {
            // Phase: RESULTS
            setRoundPhase('RESULTS')

            // Award coins
            const allScores = [
              { name: 'You', score: playerScore },
              ...Object.entries(npcScores).map(([name, score]) => ({ name, score })),
            ].sort((a, b) => b.score - a.score)

            const rank = allScores.findIndex((s) => s.name === 'You') + 1
            const coinsEarned =
              rank === 1
                ? ECONOMY.roundWinBase * 2
                : rank <= 3
                  ? ECONOMY.roundWinBase
                  : ECONOMY.roundParticipation

            addCoins(coinsEarned)

            if (rank === 1) {
              addToast(`🏆 1st Place! +${coinsEarned} coins!`)
            } else if (rank <= 3) {
              addToast(`🎉 Top ${rank}! +${coinsEarned} coins!`)
            } else {
              addToast(`💫 Great effort! +${coinsEarned} coins!`)
            }

            // Return to lobby after results
            setTimeout(() => {
              setRoundPhase('LOBBY')
              setCurrentTheme(null)
              setRoundTimer(0)
            }, ROUND.resultsTime * 1000)
          })
        })
      })
    })
  }, [avatar, advancePhase, setRoundPhase, setCurrentTheme, setRoundTimer, setPlayerScore, setNpcScores, addCoins, addToast])

  // Expose startRound globally for the UI button
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__startRound = startRound
    return () => {
      delete (window as unknown as Record<string, unknown>).__startRound
      clearTimer()
    }
  }, [startRound, clearTimer])

  return null
}

export function triggerRound() {
  const fn = (window as unknown as Record<string, (() => void) | undefined>).__startRound
  if (fn) fn()
}
