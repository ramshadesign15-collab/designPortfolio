import { cn } from '@/lib/utils'

interface RowProps {
  images: string[]
  reverse?: boolean
  durationSeconds?: number
}

function Row({ images, reverse = false, durationSeconds = 60 }: RowProps) {
  const doubled = [...images, ...images]
  return (
    <div className="flex w-max overflow-hidden">
      <div
        className={cn(
          'flex shrink-0 gap-4 motion-safe:[animation:marquee_var(--imd)_linear_infinite]',
          reverse && 'motion-safe:[animation-direction:reverse]',
        )}
        style={{ ['--imd' as string]: `${durationSeconds}s` }}
      >
        {doubled.map((src, i) => (
          <div key={i} className="h-44 w-64 shrink-0 overflow-hidden rounded-xl border border-border-subtle bg-elevated md:h-52 md:w-80">
            <img src={src} alt="" loading="lazy" decoding="async" draggable={false} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Two image rows scrolling opposite directions  a living gallery band. */
export function ImageMarquee({ rowOne, rowTwo }: { rowOne: string[]; rowTwo: string[] }) {
  return (
    <div
      className="flex flex-col gap-4 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      aria-hidden
    >
      <Row images={rowOne} durationSeconds={70} />
      <Row images={rowTwo} reverse durationSeconds={85} />
    </div>
  )
}
