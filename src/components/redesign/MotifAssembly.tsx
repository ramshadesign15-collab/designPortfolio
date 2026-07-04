import { motion, useReducedMotion } from 'framer-motion'
import { usePortfolio } from '@/hooks/usePortfolio'

function pickSpread<T>(arr: T[], n: number): T[] {
  if (arr.length <= n) return arr
  const step = arr.length / n
  return Array.from({ length: n }, (_, i) => arr[Math.floor(i * step)])
}

/** Deterministic scatter origin per index so motifs fly in from varied points. */
function scatter(i: number) {
  const dir = i % 2 === 0 ? -1 : 1
  return { x: dir * (100 + ((i * 41) % 80)), y: -80 + ((i * 57) % 170), rotate: dir * (9 + ((i * 13) % 13)), scale: 0.55 }
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }

/**
 * "Merge/assembly": scattered motif thumbnails fly in from varied origins and
 * converge into an ordered row — the collection coming together. Reduced motion
 * (via MotionConfig) drops the transforms and leaves a fade into place.
 */
export function MotifAssembly() {
  const { projects } = usePortfolio()
  const reduce = useReducedMotion()
  const pool = projects.flatMap((p) => p.caseStudy.sections.flatMap((s) => s.images ?? []))
  const imgs = pickSpread(pool, 7)

  return (
    <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }} className="flex flex-wrap gap-3">
      {imgs.map((src, i) => {
        const s = scatter(i)
        return (
          <motion.div
            key={src}
            variants={{
              hidden: reduce ? { opacity: 0 } : { opacity: 0, x: s.x, y: s.y, rotate: s.rotate, scale: s.scale },
              show: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 95, damping: 16, mass: 1 } },
            }}
            className="h-16 w-16 shrink-0 border p-1 md:h-20 md:w-20"
            style={{ borderColor: 'var(--r-hairline)', background: 'var(--r-ground-2)' }}
          >
            <img src={src} alt="" loading="lazy" decoding="async" draggable={false} className="h-full w-full object-cover" style={{ filter: 'saturate(0.95)' }} />
          </motion.div>
        )
      })}
    </motion.div>
  )
}
