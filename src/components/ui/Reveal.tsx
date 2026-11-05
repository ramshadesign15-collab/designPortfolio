import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
const EASE = [0.19, 1, 0.22, 1] as const
const VARIANTS = {
  up: { hidden: { opacity: 0, y: 56 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -70 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 70 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.88 }, show: { opacity: 1, scale: 1 } },
  clip: { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } },
} as const
interface RevealProps { children: ReactNode; variant?: keyof typeof VARIANTS; delay?: number; amount?: number; className?: string }
export function Reveal({ children, variant = 'up', delay = 0, amount = 0.2, className }: RevealProps) {
  return (
    <motion.div className={className} variants={VARIANTS[variant]} initial="hidden" whileInView="show" viewport={{ amount, once: true }} transition={{ duration: 0.75, ease: EASE, delay }}>
      {children}
    </motion.div>
  )
}
