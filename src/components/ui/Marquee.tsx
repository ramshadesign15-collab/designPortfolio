import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
interface MarqueeProps { items: string[]; durationSeconds?: number; reverse?: boolean; className?: string; separator?: ReactNode }
export function Marquee({ items, durationSeconds = 42, reverse = false, className, separator }: MarqueeProps) {
  const sep = separator ?? <span aria-hidden className="mx-6 inline-block h-1.5 w-1.5 rounded-full bg-accent-1/60" />
  return (
    <div className={cn('group relative w-full overflow-hidden', '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]', className)}>
      <div className={cn('flex w-max items-center motion-safe:[animation:marquee_var(--md,42s)_linear_infinite] group-hover:[animation-play-state:paused]', reverse && 'motion-safe:[animation-direction:reverse]')} style={{ ['--md' as string]: `${durationSeconds}s` }}>
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <li key={`${copy}-${i}`} className="flex items-center font-display text-2xl font-medium tracking-tight text-primary/70 md:text-3xl"><span>{item}</span>{sep}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
