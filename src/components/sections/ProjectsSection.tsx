import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { usePortfolio } from '@/hooks/usePortfolio'
import type { Project } from '@/types/portfolio'
import { ProjectCaseStudy } from '@/components/sections/ProjectCaseStudy'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Full-width band that separates one project from the next AND acts as the
 * accordion trigger. Visuals are unchanged from the original divider; the only
 * addition is a rotating chevron that signals expand/collapse.
 */
function ProjectDivider({
  project, index, total, open, onToggle, panelId,
}: {
  project: Project; index: number; total: number
  open: boolean; onToggle: () => void; panelId: string
}) {
  const num = String(index + 1).padStart(2, '0')
  const tot = String(total).padStart(2, '0')
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={panelId}
      className="group relative block w-full cursor-pointer overflow-hidden border-y border-border-default bg-surface/60 py-16 text-center transition-colors hover:bg-surface/80 md:py-24"
    >
      {/* coloured wash + top accent line in the project's own colour */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${project.color}, transparent)` }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]" style={{ background: `radial-gradient(60% 120% at 50% 0%, ${project.color}, transparent 70%)` }} />

      <div className="mx-auto max-w-content px-6 md:px-10">
        <Reveal variant="up">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.35em]" style={{ color: project.color }}>
              Collection {num} <span className="text-muted">/ {tot}</span>
            </span>
            <h3 className="font-display font-semibold leading-none text-primary" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
              {project.title}
            </h3>
            <p className="max-w-[44ch] text-sm text-secondary md:text-base">{project.subtitle}</p>
            <span
              aria-hidden
              className="mt-2 grid h-10 w-10 place-items-center rounded-full border transition-transform duration-300"
              style={{ borderColor: `${project.color}66`, transform: open ? 'rotate(180deg)' : 'none' }}
            >
              <ChevronDown className="h-5 w-5" style={{ color: project.color }} />
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted">
              {open ? 'Close' : 'View case study'}
            </span>
          </div>
        </Reveal>
      </div>
    </button>
  )
}

export function ProjectsSection() {
  const { projects } = usePortfolio()
  const ordered = [...projects].sort((a, b) => Number(b.highlight) - Number(a.highlight))
  // Accordion: one open at a time; all collapsed by default.
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="projects" className="relative">
      <div className="mx-auto max-w-content px-6 pt-28 md:px-10 md:pt-36">
        <header className="flex items-end justify-between border-b border-border-subtle pb-10">
          <div>
            <Reveal variant="up"><p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent-1">Selected Work</p></Reveal>
            <Reveal variant="clip"><h2 className="font-display font-semibold text-primary" style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}>Collections</h2></Reveal>
            <Reveal variant="up" delay={0.1}><p className="mt-4 max-w-[52ch] text-base text-secondary md:text-lg">Three design stories  from first concept and moodboard through craft, market positioning, and the final shoot.</p></Reveal>
          </div>
          <span aria-hidden className="hidden select-none font-mono text-sm text-muted md:block">{String(ordered.length).padStart(2, '0')} Projects</span>
        </header>
      </div>

      <div className="flex flex-col">
        {ordered.map((project, index) => {
          const open = openId === project.id
          const panelId = `project-panel-${project.id}`
          return (
            <div key={project.id}>
              <ProjectDivider
                project={project}
                index={index}
                total={ordered.length}
                open={open}
                onToggle={() => setOpenId((prev) => (prev === project.id ? null : project.id))}
                panelId={panelId}
              />
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-label={`${project.title} case study`}
                    key="panel"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  >
                    <ProjectCaseStudy project={project} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
