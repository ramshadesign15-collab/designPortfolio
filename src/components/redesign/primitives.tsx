import type { CSSProperties, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const EASE_SETTLE = [0.16, 1, 0.3, 1] as const

/** A heading that "kerning-settles" from wide + faint to tight + solid as it
 *  enters view. Reads as typeset, not faded-up. Reduced motion → static. */
export function KerningHeading({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const reduce = useReducedMotion()
  return (
    <motion.h2
      initial={reduce ? false : { letterSpacing: '0.26em', opacity: 0.35 }}
      whileInView={reduce ? undefined : { letterSpacing: '-0.01em', opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.75, ease: EASE_SETTLE }}
      className={className}
      style={{ fontFamily: 'var(--font-display-r)', lineHeight: 1.03, ...style }}
    >
      {children}
    </motion.h2>
  )
}

/** Small malachite section label — the one deliberate kicker cadence. */
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn('text-xs uppercase tracking-[0.24em]', className)}
      style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-malachite)' }}
    >
      {children}
    </p>
  )
}

/** A matted print on the dark ground — square corners, hairline mat, real image. */
export function Plate({ src, alt, caption, className, aspect = 'aspect-[3/4]' }: { src: string; alt: string; caption?: string; className?: string; aspect?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE_SETTLE }}
      className={cn('group', className)}
    >
      <div className={cn('overflow-hidden border p-2 md:p-2.5', aspect)} style={{ borderColor: 'var(--r-hairline)', background: 'var(--r-ground-2)' }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          style={{ filter: 'saturate(0.95)' }}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-[0.68rem] uppercase tracking-[0.16em]" style={{ fontFamily: 'var(--font-body-r)', color: 'var(--r-bone-soft)' }}>
          {caption}
        </figcaption>
      )}
    </motion.figure>
  )
}
