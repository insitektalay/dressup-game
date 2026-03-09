'use client'

import { useEffect, useRef, useCallback } from 'react'

interface MovementInput {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  joystickX: number
  joystickY: number
}

export function useMovement() {
  const input = useRef<MovementInput>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    joystickX: 0,
    joystickY: 0,
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w': case 'arrowup': input.current.forward = true; break
        case 's': case 'arrowdown': input.current.backward = true; break
        case 'a': case 'arrowleft': input.current.left = true; break
        case 'd': case 'arrowright': input.current.right = true; break
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w': case 'arrowup': input.current.forward = false; break
        case 's': case 'arrowdown': input.current.backward = false; break
        case 'a': case 'arrowleft': input.current.left = false; break
        case 'd': case 'arrowright': input.current.right = false; break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const setJoystick = useCallback((x: number, y: number) => {
    input.current.joystickX = x
    input.current.joystickY = y
  }, [])

  const getDirection = useCallback((): [number, number] => {
    let dx = 0
    let dz = 0

    if (input.current.forward) dz -= 1
    if (input.current.backward) dz += 1
    if (input.current.left) dx -= 1
    if (input.current.right) dx += 1

    // Add joystick input
    dx += input.current.joystickX
    dz += input.current.joystickY

    // Normalize
    const len = Math.sqrt(dx * dx + dz * dz)
    if (len > 1) {
      dx /= len
      dz /= len
    }

    return [dx, dz]
  }, [])

  const isMoving = useCallback((): boolean => {
    const [dx, dz] = getDirection()
    return Math.abs(dx) > 0.05 || Math.abs(dz) > 0.05
  }, [getDirection])

  return { getDirection, isMoving, setJoystick }
}
