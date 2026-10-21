import type { Config } from 'tailwindcss'

// Theme colours are CSS vars, which Tailwind can't split into channels, so
// `/opacity` modifiers (bg-base/80, text-primary/[0.04]) silently emitted no
// CSS. color-mix lets every modifier work without touching the vars.
const v = (name: string) => ({ opacityValue }: { opacityValue?: string }) =>
  opacityValue === undefined ? `var(${name})` : `color-mix(in srgb, var(${name}) calc(${opacityValue} * 100%), transparent)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}', './src/data/*.json'],
  theme: {
    extend: {
      colors: {
        base: v('--bg-base'),
        surface: v('--bg-surface'),
        elevated: v('--bg-elevated'),
        primary: v('--text-primary'),
        secondary: v('--text-secondary'),
        muted: v('--text-muted'),
        'accent-1': v('--accent-1'),
        'accent-2': v('--accent-2'),
        'accent-3': v('--accent-3'),
        'border-subtle': v('--border-subtle'),
        'border-default': v('--border-default'),
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      maxWidth: { content: '1600px' },
    },
  },
  plugins: [],
} satisfies Config
