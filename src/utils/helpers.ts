import * as THREE from 'three'

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function lerpV3(a: THREE.Vector3, b: THREE.Vector3, t: number): THREE.Vector3 {
  return new THREE.Vector3(
    lerp(a.x, b.x, t),
    lerp(a.y, b.y, t),
    lerp(a.z, b.z, t)
  )
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function randomFromArray<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function distanceTo(a: [number, number, number], b: [number, number, number]): number {
  const dx = a[0] - b[0]
  const dz = a[2] - b[2]
  return Math.sqrt(dx * dx + dz * dz)
}

export function formatCoins(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}
