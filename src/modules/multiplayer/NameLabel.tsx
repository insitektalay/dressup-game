'use client'

import { Html } from '@react-three/drei'

interface NameLabelProps {
  name: string
  chatMessage?: string
}

export default function NameLabel({ name, chatMessage }: NameLabelProps) {
  return (
    <Html position={[0, 2.5, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
      <div className="text-center whitespace-nowrap">
        {chatMessage && (
          <div className="bg-white/90 backdrop-blur-sm text-xs px-2 py-1 rounded-lg mb-1 text-gray-700 shadow-sm border border-pink-200 max-w-32">
            {chatMessage}
          </div>
        )}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-sm">
          {name}
        </div>
      </div>
    </Html>
  )
}
