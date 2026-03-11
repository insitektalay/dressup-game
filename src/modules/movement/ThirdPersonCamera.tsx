'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '@/stores/gameStore'

interface ThirdPersonCameraProps {
  target: React.RefObject<THREE.Group | null>
}

export default function ThirdPersonCamera({ target }: ThirdPersonCameraProps) {
  const { camera, gl } = useThree()
  const orbitAngle = useRef(0)
  const orbitPitch = useRef(0.4)
  const isDragging = useRef(false)
  const lastMouse = useRef({ x: 0, y: 0 })

  const cameraDistance = 6
  const cameraHeight = 3

  const roundPhase = useGameStore((s) => s.roundPhase)
  const runwayWalkerIndex = useGameStore((s) => s.runwayWalkerIndex)

  useEffect(() => {
    const canvas = gl.domElement

    const onPointerDown = (e: PointerEvent) => {
      if (e.button === 2 || e.pointerType === 'touch') {
        isDragging.current = true
        lastMouse.current = { x: e.clientX, y: e.clientY }
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return
      const dx = e.clientX - lastMouse.current.x
      const dy = e.clientY - lastMouse.current.y
      orbitAngle.current -= dx * 0.005
      orbitPitch.current = Math.max(0.1, Math.min(1.2, orbitPitch.current - dy * 0.005))
      lastMouse.current = { x: e.clientX, y: e.clientY }
    }

    const onPointerUp = () => {
      isDragging.current = false
    }

    const onContextMenu = (e: Event) => e.preventDefault()

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('contextmenu', onContextMenu)

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('contextmenu', onContextMenu)
    }
  }, [gl])

  useFrame(() => {
    if (!target.current) return

    const isRunway = roundPhase === 'RUNWAY' && runwayWalkerIndex >= 0

    if (isRunway) {
      // Runway camera: follow the walker from the side, dramatic angle
      const targetPos = new THREE.Vector3()
      target.current.getWorldPosition(targetPos)

      // For player (walker 0), use the player group position
      // Camera positioned to the side of the runway, angled to look dramatic
      const playerPos = useGameStore.getState().playerPosition

      // Side camera view of runway
      const walkerZ = playerPos[2]
      const cameraTarget = new THREE.Vector3(0, 1.5, walkerZ)

      // Camera offset: to the side and slightly above
      const runwayCamPos = new THREE.Vector3(
        4, // Side of runway
        2.5, // Elevated
        walkerZ + 2, // Slightly behind
      )

      camera.position.lerp(runwayCamPos, 0.04)
      const lookTarget = new THREE.Vector3(0, 1.2, walkerZ - 1)
      camera.lookAt(lookTarget)
      return
    }

    // Normal third-person camera
    const targetPos = new THREE.Vector3()
    target.current.getWorldPosition(targetPos)
    targetPos.y += 1.5

    const cameraX = targetPos.x + Math.sin(orbitAngle.current) * cameraDistance * Math.cos(orbitPitch.current)
    const cameraY = targetPos.y + cameraHeight * Math.sin(orbitPitch.current)
    const cameraZ = targetPos.z + Math.cos(orbitAngle.current) * cameraDistance * Math.cos(orbitPitch.current)

    camera.position.lerp(new THREE.Vector3(cameraX, cameraY, cameraZ), 0.08)
    camera.lookAt(targetPos)
  })

  return null
}
