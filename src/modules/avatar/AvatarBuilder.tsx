'use client'

import { SKIN_COLORS } from '@/utils/constants'
import { useAvatarStore } from '@/stores/avatarStore'

export default function AvatarBuilder() {
  const { avatar, setSkinColor, setFaceStyle } = useAvatarStore()

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold text-pink-500 mb-3">Customize Avatar</h3>

      {/* Skin Color */}
      <div className="mb-4">
        <p className="text-sm font-bold text-purple-400 mb-2">Skin Tone</p>
        <div className="flex gap-2 flex-wrap">
          {SKIN_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setSkinColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-transform ${
                avatar.skinColor === color ? 'border-pink-500 scale-110' : 'border-white/30'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Face Style */}
      <div>
        <p className="text-sm font-bold text-purple-400 mb-2">Face Style</p>
        <div className="flex gap-2">
          {['😊 Happy', '✨ Sparkle', '😺 Cat'].map((label, i) => (
            <button
              key={i}
              onClick={() => setFaceStyle(i)}
              className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
                avatar.faceStyle === i
                  ? 'bg-pink-500 text-white scale-105'
                  : 'bg-white/20 text-pink-300 hover:bg-white/30'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
