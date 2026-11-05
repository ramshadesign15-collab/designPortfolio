interface MarqueeProps { items: string[]; durationSeconds?: number }
export function Marquee({ items, durationSeconds = 42 }: MarqueeProps) {
  return (
    <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max items-center motion-safe:[animation:marquee_var(--md,42s)_linear_infinite] group-hover:[animation-play-state:paused]" style={{ ['--md' as string]: `${durationSeconds}s` }}>
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <li key={`${copy}-${i}`} className="flex items-center font-display text-2xl font-medium tracking-tight text-primary/70 md:text-3xl"><span>{item}</span><span aria-hidden className="mx-6 inline-block h-1.5 w-1.5 rounded-full bg-accent-1/60" /></li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
