import { useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'framer-motion'
import { usePortfolio } from '@/hooks/usePortfolio'
import { KerningHeading, Label } from './primitives'

/** Pick `n` evenly-spaced items so the ring shows variety across collections. */
function pickSpread<T>(arr: T[], n: number): T[] {
  if (arr.length <= n) return arr
  const step = arr.length / n
  return Array.from({ length: n }, (_, i) => arr[Math.floor(i * step)])
}

/**
 * A 3D carousel of the real collection plates — a cylinder of matted artwork
 * that slowly rotates and can be grabbed and spun. CSS 3D (preserve-3d) driven
 * by a single rotateY MotionValue, so it's GPU-composited and never re-renders.
 * Reduced motion → a plain horizontal scroll of the same plates.
 */
export function RotatingArchive() {
  const { projects } = usePortfolio()
  const reduce = useReducedMotion()
  const rotate = useMotionValue(0)
  const dragging = useRef(false)

  const pool = projects.flatMap((p) => p.caseStudy.sections.flatMap((s) => s.images ?? []))
  const imgs = pickSpread(pool, 9)
  const n = Math.max(imgs.length, 1)
  const step = 360 / n
  const radius = Math.round((260 / 2) / Math.tan(Math.PI / n)) + 40 // fit plate width without overlap

  useAnimationFrame((_, delta) => {
    if (reduce || dragging.current) return
    rotate.set(rotate.get() + (delta / 1000) * 10) // ~10°/s
  })

  const onPointerDown = (e: ReactPointerEvent) => {
    if (reduce) return
    dragging.current = true
    let last = e.clientX
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - last
      last = ev.clientX
      rotate.set(rotate.get() + dx * 0.35)
    }
    const up = () => {
      dragging.current = false
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  return (
    <section className="overflow-hidden border-y py-16 md:py-24" style={{ background: 'var(--r-ground)', borderColor: 'var(--r-hairline)' }}>
      <div className="mx-auto mb-12 max-w-content px-6 md:mb-16 md:px-10">
        <Label>In Rotation</Label>
        <KerningHeading className="mt-4" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', color: 'var(--r-bone)' }}>A living archive, in the round</KerningHeading>
        {!reduce && (
          <p className="mt-3 text-xs uppercase tracking-[0.18em]" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone-soft)' }}>Drag to spin</p>
        )}
      </div>

      {reduce ? (
        <div className="flex gap-4 overflow-x-auto px-6 pb-4 md:px-10">
          {imgs.map((src, i) => (
            <div key={src} className="h-64 w-48 shrink-0 border p-2" style={{ borderColor: 'var(--r-hairline)', background: 'var(--r-ground-2)' }}>
              <img src={src} alt={`Archive plate ${i + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover" style={{ filter: 'saturate(0.95)' }} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="relative mx-auto cursor-grab active:cursor-grabbing select-none [perspective:1400px]"
          style={{ height: 'clamp(340px, 52vh, 560px)', touchAction: 'pan-y' }}
          onPointerDown={onPointerDown}
        >
          <motion.div className="absolute left-1/2 top-1/2 h-0 w-0" style={{ rotateY: rotate, transformStyle: 'preserve-3d' }}>
            {imgs.map((src, i) => (
              <div
                key={src}
                className="absolute left-1/2 top-1/2 h-[340px] w-[260px] border p-2.5 md:h-[380px] md:w-[290px]"
                style={{
                  transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${radius}px)`,
                  borderColor: 'var(--r-hairline-paper)',
                  background: 'var(--r-paper-2)',
                  boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)',
                }}
              >
                <img src={src} alt={`Archive plate ${i + 1}`} loading="lazy" decoding="async" draggable={false} className="h-full w-full object-cover" style={{ filter: 'saturate(0.95)' }} />
              </div>
            ))}
          </motion.div>

          {/* edge fades so plates dissolve into the ground at the sides */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40" style={{ background: 'linear-gradient(to right, var(--r-ground), transparent)' }} />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40" style={{ background: 'linear-gradient(to left, var(--r-ground), transparent)' }} />
        </div>
      )}
    </section>
  )
}
