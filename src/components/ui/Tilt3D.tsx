import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Tilt3DProps {
  children: ReactNode
  /** max rotateX degrees at the extremes of the scroll range */
  intensity?: number
  className?: string
}

/**
 * Wraps content in a 3D perspective and tilts it on rotateX as it scrolls
 * through the viewport  content leans toward you on entry, away on exit.
 * This is the page-wide "3D scrolling" feel.
 */
export function Tilt3D({ children, intensity = 7, className }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [intensity, 0, -intensity])
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-60, 0, -60])
  return (
    <div ref={ref} className={cn('[perspective:1400px]', className)}>
      <motion.div style={{ rotateX, z, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  )
}
