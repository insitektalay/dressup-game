export interface AvatarState {
  skinColor: string
  faceStyle: number
  hair: string | null
  top: string | null
  bottom: string | null
  shoes: string | null
  accessory: string | null
  makeup: string | null
}

export const DEFAULT_AVATAR: AvatarState = {
  skinColor: '#FDEBD0',
  faceStyle: 0,
  hair: null,
  top: null,
  bottom: null,
  shoes: null,
  accessory: null,
  makeup: null,
}

export interface AttachmentPoint {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
}

export const ATTACHMENT_POINTS: Record<string, AttachmentPoint> = {
  hair: { position: [0, 1.65, 0] },
  top: { position: [0, 0.85, 0] },
  bottom: { position: [0, 0.35, 0] },
  shoes: { position: [0, -0.05, 0] },
  accessory: { position: [0, 1.9, 0] },
  makeup: { position: [0, 1.2, 0] },
}
