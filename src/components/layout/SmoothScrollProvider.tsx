import { useCallback, useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import { Ctx } from '@/components/layout/lenis-context'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    lenisRef.current = lenis
    let raf = 0
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenisRef.current = null }
  }, [])
  const scrollTo = useCallback((target: string | number, offset = 0) => {
    if (lenisRef.current) lenisRef.current.scrollTo(target, { offset })
    else if (typeof target === 'string') document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  return <Ctx.Provider value={{ scrollTo }}>{children}</Ctx.Provider>
}
