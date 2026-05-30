import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
const EASE = [0.19, 1, 0.22, 1] as const
const VARIANTS = {
  up: { hidden: { opacity: 0, y: 56 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -56 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -70 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 70 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.88 }, show: { opacity: 1, scale: 1 } },
  clip: { hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' }, show: { opacity: 1, clipPath: 'inset(0 0 0% 0)' } },
} as const
export type RevealVariant = keyof typeof VARIANTS
interface RevealProps { children: ReactNode; variant?: RevealVariant; delay?: number; duration?: number; amount?: number; once?: boolean; className?: string }
export function Reveal({ children, variant = 'up', delay = 0, duration = 0.75, amount = 0.25, once = false, className }: RevealProps) {
  return (
    <motion.div className={cn(className)} variants={VARIANTS[variant]} initial="hidden" whileInView="show" viewport={{ amount, once }} transition={{ duration, ease: EASE, delay }}>
      {children}
    </motion.div>
  )
}
