import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Label } from './primitives'

// three.js lives in PigmentCanvas and is lazy-loaded only when a canvas mounts.
const PigmentCanvas = lazy(() => import('./PigmentCanvas').then((m) => ({ default: m.PigmentCanvas })))

const SCALE = 5.5

export type ParticleData = { positions: Float32Array; targets: Float32Array; colors: Float32Array }

/** Read an artwork's pixels into per-particle target positions + colors. No three.js. */
function useArtworkParticles(src: string, enabled: boolean): ParticleData | null {
  const [data, setData] = useState<ParticleData | null>(null)
  useEffect(() => {
    if (!enabled) return
    let cancelled = false
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src
    img.onload = () => {
      if (cancelled) return
      const W = 190
      const H = Math.max(1, Math.round((W * img.height) / img.width))
      const cv = document.createElement('canvas')
      cv.width = W
      cv.height = H
      const ctx = cv.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0, W, H)
      const px = ctx.getImageData(0, 0, W, H).data
      const aspect = W / H
      const pos: number[] = []
      const tgt: number[] = []
      const col: number[] = []
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i = (y * W + x) * 4
          if (px[i + 3] < 24) continue
          tgt.push((x / (W - 1) - 0.5) * aspect * SCALE, -(y / (H - 1) - 0.5) * SCALE, 0)
          pos.push((Math.random() * 2 - 1) * SCALE * 1.4, (Math.random() * 2 - 1) * SCALE * 1.1, (Math.random() * 2 - 1) * SCALE * 0.7)
          col.push(px[i] / 255, px[i + 1] / 255, px[i + 2] / 255)
        }
      }
      setData({ positions: new Float32Array(pos), targets: new Float32Array(tgt), colors: new Float32Array(col) })
    }
    return () => { cancelled = true }
  }, [src, enabled])
  return data
}

/**
 * Pigment coalesce. Every pixel of an artwork becomes a particle; they start
 * scattered and swarm into the painting as you scroll — a single GPU uProgress
 * uniform interpolates all of them. Desktop + motion only, and the WebGL canvas
 * only mounts while the section is in view (so multiple instances never run at
 * once). Touch / reduced-motion get the static plate and never load three.js.
 */
export function PigmentReveal({ src, eyebrow, heading, alt }: { src: string; eyebrow: string; heading: string; alt: string }) {
  const reduce = useReducedMotion()
  const desktop = useMediaQuery('(min-width: 768px)')
  const use3D = desktop && !reduce
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '15% 0px 15% 0px' })
  const data = useArtworkParticles(src, use3D)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useTransform(scrollYProgress, [0.05, 0.62], [0, 1])

  return (
    <section ref={ref} className="relative" style={{ height: use3D ? '220vh' : 'auto', background: 'var(--r-ground)' }}>
      <div className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden">
        {use3D ? (
          data && inView ? (
            <Suspense fallback={null}>
              <PigmentCanvas data={data} progress={progress} />
            </Suspense>
          ) : null
        ) : (
          <div className="border p-3" style={{ borderColor: 'var(--r-hairline-paper)', background: 'var(--r-paper-2)' }}>
            <img src={src} alt={alt} className="max-h-[70vh] w-auto" style={{ filter: 'saturate(0.95)' }} />
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-[14%] px-6 text-center">
          <Label>{eyebrow}</Label>
          <h2 className="mx-auto mt-4 max-w-[16ch]" style={{ fontFamily: 'var(--font-display-r)', fontSize: 'clamp(1.8rem, 4vw, 3.25rem)', color: 'var(--r-bone)', lineHeight: 1.05 }}>
            {heading}
          </h2>
        </div>
      </div>
    </section>
  )
}
