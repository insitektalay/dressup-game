'use client'

import { useCallback } from 'react'
import VirtualJoystick from './VirtualJoystick'

export default function MobileControls() {
  const handleMove = useCallback((x: number, y: number) => {
    const cb = (window as unknown as Record<string, unknown>).__joystickCallback as
      | ((x: number, y: number) => void)
      | undefined
    if (cb) cb(x, y)
  }, [])

  return <VirtualJoystick onMove={handleMove} />
}
