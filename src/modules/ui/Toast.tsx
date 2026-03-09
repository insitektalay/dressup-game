'use client'

import { useGameStore } from '@/stores/gameStore'

export default function ToastContainer() {
  const toasts = useGameStore((s) => s.toasts)

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-slide-up bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-xl shadow-lg text-sm font-bold text-center border border-pink-200 whitespace-nowrap"
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
