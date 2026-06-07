import { usePortfolio } from '@/hooks/usePortfolio'
import { Reveal } from '@/components/ui/Reveal'
export function SkillsSection() {
  const { skills } = usePortfolio()
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <header className="mb-12">
          <Reveal variant="up"><p className="mb-3 font-mono text-sm uppercase tracking-[0.3em] text-accent-1 md:text-[1rem]">Capabilities</p></Reveal>
          <Reveal variant="clip"><h2 className="font-display font-semibold text-primary" style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}>What I work with</h2></Reveal>
        </header>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.categories.map((category, i) => (
            <Reveal key={category.name} variant="up" delay={i * 0.08}>
              <div className="h-full rounded-lg border border-border-subtle bg-surface p-6">
                <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-secondary">{category.name}</h3>
                <ul className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <li key={skill}><span className="group relative inline-flex overflow-hidden rounded-full border border-border-subtle px-3 py-1.5 text-xs text-primary"><span aria-hidden className="absolute inset-0 w-0 bg-accent-1 transition-[width] duration-300 ease-out group-hover:w-full" /><span className="relative z-10 transition-colors duration-300 group-hover:text-base">{skill}</span></span></li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
