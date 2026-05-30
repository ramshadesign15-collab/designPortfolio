import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  text: string
  className?: string
}

function Char({ char, start, end, progress }: { char: string; start: number; end: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [start, end], [0.18, 1])
  return (
    <span className="relative inline-block">
      <span className="opacity-[0.18]">{char}</span>
      <motion.span aria-hidden style={{ opacity }} className="absolute left-0 top-0 w-full">{char}</motion.span>
    </span>
  )
}

/** Per-character scroll reveal: letters brighten as the line scrolls through view. */
export function AnimatedText({ text, className }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.35'] })
  const words = text.split(' ')
  const total = text.length
  // Pre-compute each word's starting character index (word length + 1 for the
  // trailing space) so the render below stays pure  no mutation during render.
  const wordOffsets: number[] = []
  let acc = 0
  for (const word of words) {
    wordOffsets.push(acc)
    acc += Array.from(word).length + 1
  }
  return (
    <p ref={ref} className={cn(className)} aria-label={text}>
      {words.map((word, wi) => {
        const chars = Array.from(word)
        const base = wordOffsets[wi]
        return (
          <span key={`w${wi}`}>
            <span className="inline-block whitespace-nowrap">
              {chars.map((c, ci) => {
                const idx = base + ci
                return <Char key={`${wi}-${ci}`} char={c} start={idx / total} end={(idx + 1) / total} progress={scrollYProgress} />
              })}
            </span>
            {wi < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </p>
  )
}
