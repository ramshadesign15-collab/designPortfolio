import { useEffect } from 'react'
import { X } from 'lucide-react'

interface VideoModalProps {
  open: boolean
  onClose: () => void
  src: string
  poster?: string
}

/** Lightbox player for the intro video  Esc to close, scroll-locked, click backdrop to dismiss. */
export function VideoModal({ open, onClose, src, poster }: VideoModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Introduction video"
      onClick={onClose}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
    >
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:scale-110 hover:bg-white/20 sm:-right-2 sm:-top-14"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
          <video src={src} poster={poster} controls autoPlay playsInline className="aspect-video w-full" />
        </div>
      </div>
    </div>
  )
}
