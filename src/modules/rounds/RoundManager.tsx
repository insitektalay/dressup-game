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
import type { ContestantData } from '@/stores/gameStore'

export default function RoundManager() {
  const setRoundPhase = useGameStore((s) => s.setRoundPhase)
  const setCurrentTheme = useGameStore((s) => s.setCurrentTheme)
  const setRoundTimer = useGameStore((s) => s.setRoundTimer)
  const setPlayerScore = useGameStore((s) => s.setPlayerScore)
  const setNpcScores = useGameStore((s) => s.setNpcScores)
  const setCoinsEarned = useGameStore((s) => s.setCoinsEarned)
  const setPlayerRank = useGameStore((s) => s.setPlayerRank)
  const setRunwayWalkerIndex = useGameStore((s) => s.setRunwayWalkerIndex)
  const setRunwayWalkerCount = useGameStore((s) => s.setRunwayWalkerCount)
  const setRunwayProgress = useGameStore((s) => s.setRunwayProgress)
  const setVotingIndex = useGameStore((s) => s.setVotingIndex)
  const setContestants = useGameStore((s) => s.setContestants)
  const addToast = useGameStore((s) => s.addToast)
  const roundPhase = useGameStore((s) => s.roundPhase)
  const avatar = useAvatarStore((s) => s.avatar)
  const addCoins = useEconomyStore((s) => s.addCoins)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const themeRef = useRef<ThemeData | null>(null)
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearAllTimers = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    timeoutRefs.current.forEach(clearTimeout)
    timeoutRefs.current = []
  }, [])

  const addTimeout = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms)
    timeoutRefs.current.push(t)
    return t
  }, [])

  const startRound = useCallback(() => {
    clearAllTimers()
    const theme = getRandomTheme()
    themeRef.current = theme
    setCurrentTheme(`${theme.emoji} ${theme.name}`)
    setRunwayWalkerIndex(-1)
    setRunwayProgress(0)
    setVotingIndex(0)
    useGameStore.setState({ playerVotes: {} })

    // Phase 1: THEME_ANNOUNCE
    setRoundPhase('THEME_ANNOUNCE')

    addTimeout(() => {
      // Phase 2: DRESSING
      setRoundPhase('DRESSING')
      let timeLeft = ROUND.dressingTime
      setRoundTimer(timeLeft)

      timerRef.current = setInterval(() => {
        timeLeft--
        setRoundTimer(timeLeft)
        if (timeLeft <= 0) {
          if (timerRef.current) clearInterval(timerRef.current)
          timerRef.current = null
          startRunway(theme)
        }
      }, 1000)
    }, ROUND.announceTime * 1000)
  }, [clearAllTimers, addTimeout, setRoundPhase, setCurrentTheme, setRoundTimer, setRunwayWalkerIndex, setRunwayProgress, setVotingIndex])

  const startRunway = useCallback((theme: ThemeData) => {
    setRoundPhase('RUNWAY')

    // Total walkers: player + NPCs
    const walkerCount = 1 + NPC_NAMES.length
    setRunwayWalkerCount(walkerCount)
    setRunwayWalkerIndex(0) // Player walks first

    // Sequence walkers
    let currentWalker = 0
    const walkNext = () => {
      setRunwayWalkerIndex(currentWalker)
      setRunwayProgress(0)

      addTimeout(() => {
        currentWalker++
        if (currentWalker < walkerCount) {
          walkNext()
        } else {
          // All walkers done, move to voting
          setRunwayWalkerIndex(-1)
          startVoting(theme)
        }
      }, ROUND.runwayWalkTime * 1000)
    }

    walkNext()
  }, [setRoundPhase, setRunwayWalkerCount, setRunwayWalkerIndex, setRunwayProgress, addTimeout])

  const startVoting = useCallback((theme: ThemeData) => {
    // Calculate scores
    const playerScore = calculateScore(avatar, theme)
    setPlayerScore(playerScore)

    const npcScores: Record<string, number> = {}
    NPC_NAMES.forEach((name) => {
      npcScores[name] = generateNPCScore()
    })
    setNpcScores(npcScores)

    // Build contestants list (NPCs only for voting - player votes on them)
    const npcContestants: ContestantData[] = NPC_NAMES.map((name) => ({
      name,
      avatar: getNPCAvatar(name),
      score: npcScores[name],
      stars: 0,
    }))
    setContestants(npcContestants)

    // Phase: VOTING
    setRoundPhase('VOTING')
    setVotingIndex(0)

    // Auto-advance voting after timeout per contestant
    let vIdx = 0
    const totalVotingTime = NPC_NAMES.length * ROUND.votingTimePerContestant * 1000

    addTimeout(() => {
      // Voting complete, go to results
      finishRound(theme, playerScore, npcScores)
    }, totalVotingTime)
  }, [avatar, setPlayerScore, setNpcScores, setContestants, setRoundPhase, setVotingIndex, addTimeout])

  const finishRound = useCallback((theme: ThemeData, playerScore: number, npcScores: Record<string, number>) => {
    setRoundPhase('RESULTS')

    // Calculate final rankings
    const allScores = [
      { name: 'You', score: playerScore },
      ...Object.entries(npcScores).map(([name, score]) => ({ name, score })),
    ].sort((a, b) => b.score - a.score)

    const rank = allScores.findIndex((s) => s.name === 'You') + 1
    setPlayerRank(rank)

    const coinsEarned =
      rank === 1
        ? ECONOMY.roundWinBase * 2
        : rank <= 3
          ? ECONOMY.roundWinBase
          : ECONOMY.roundParticipation

    setCoinsEarned(coinsEarned)
    addCoins(coinsEarned)

    if (rank === 1) {
      addToast(`🏆 1st Place! +${coinsEarned} coins!`)
    } else if (rank <= 3) {
      addToast(`🎉 Top ${rank}! +${coinsEarned} coins!`)
    } else {
      addToast(`💫 Great effort! +${coinsEarned} coins!`)
    }

    // Don't auto-return to lobby - let the Play Again button handle it
  }, [setRoundPhase, setPlayerRank, setCoinsEarned, addCoins, addToast])

  // Expose startRound globally for the UI button
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__startRound = startRound
    return () => {
      delete (window as unknown as Record<string, unknown>).__startRound
      clearAllTimers()
    }
  }, [startRound, clearAllTimers])

  return null
}

export function triggerRound() {
  const fn = (window as unknown as Record<string, (() => void) | undefined>).__startRound
  if (fn) fn()
}

export function returnToLobby() {
  useGameStore.getState().setRoundPhase('LOBBY')
  useGameStore.getState().setCurrentTheme(null)
  useGameStore.getState().setRoundTimer(0)
  useGameStore.getState().setRunwayWalkerIndex(-1)
  useGameStore.getState().setRunwayProgress(0)
}

// Helper to get NPC avatar data (stored on window by NPCManager)
function getNPCAvatar(name: string) {
  const npcs = (window as unknown as Record<string, unknown>).__npcAvatars as Record<string, unknown> | undefined
  if (npcs && npcs[name]) return npcs[name] as import('@/modules/avatar/types').AvatarState
  return {
    skinColor: '#FDEBD0',
    faceStyle: 0,
    hair: 'hair_ponytail',
    top: 'top_tshirt',
    bottom: 'bottom_skirt',
    shoes: 'shoes_sneakers',
    accessory: null,
    makeup: null,
  }
}
