'use client'

import { useRef, useCallback, useEffect, useState } from 'react'

interface VirtualJoystickProps {
  onMove: (x: number, y: number) => void
}

export default function VirtualJoystick({ onMove }: VirtualJoystickProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)
  const touchIdRef = useRef<number | null>(null)
  const centerRef = useRef({ x: 0, y: 0 })

  const maxRadius = 40

  const handleStart = useCallback((clientX: number, clientY: number, touchId?: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    centerRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
    if (touchId !== undefined) touchIdRef.current = touchId
    setActive(true)

    const dx = clientX - centerRef.current.x
    const dy = clientY - centerRef.current.y
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxRadius)
    const angle = Math.atan2(dy, dx)
    const nx = Math.cos(angle) * dist
    const ny = Math.sin(angle) * dist
    setKnobPos({ x: nx, y: ny })
    onMove(nx / maxRadius, ny / maxRadius)
  }, [onMove])

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!active) return
    const dx = clientX - centerRef.current.x
    const dy = clientY - centerRef.current.y
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxRadius)
    const angle = Math.atan2(dy, dx)
    const nx = Math.cos(angle) * dist
    const ny = Math.sin(angle) * dist
    setKnobPos({ x: nx, y: ny })
    onMove(nx / maxRadius, ny / maxRadius)
  }, [active, onMove])

  const handleEnd = useCallback(() => {
    setActive(false)
    setKnobPos({ x: 0, y: 0 })
    onMove(0, 0)
    touchIdRef.current = null
  }, [onMove])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.changedTouches[0]
      handleStart(touch.clientX, touch.clientY, touch.identifier)
    }
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === touchIdRef.current) {
          handleMove(e.changedTouches[i].clientX, e.changedTouches[i].clientY)
          break
        }
      }
    }
    const onTouchEnd = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === touchIdRef.current) {
          handleEnd()
          break
        }
      }
    }

    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('touchcancel', onTouchEnd)

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [handleStart, handleMove, handleEnd])

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 left-8 w-28 h-28 rounded-full z-50 touch-none select-none"
      style={{
        background: 'radial-gradient(circle, rgba(255,105,180,0.15) 0%, rgba(255,105,180,0.08) 100%)',
        border: '2px solid rgba(255,105,180,0.3)',
      }}
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div
        className="absolute w-12 h-12 rounded-full transition-none"
        style={{
          background: active
            ? 'radial-gradient(circle, rgba(255,105,180,0.8) 0%, rgba(255,105,180,0.4) 100%)'
            : 'radial-gradient(circle, rgba(255,105,180,0.5) 0%, rgba(255,105,180,0.2) 100%)',
          border: '2px solid rgba(255,255,255,0.5)',
          left: `calc(50% - 24px + ${knobPos.x}px)`,
          top: `calc(50% - 24px + ${knobPos.y}px)`,
          boxShadow: active ? '0 0 15px rgba(255,105,180,0.5)' : 'none',
        }}
      />
    </div>
  )
}
