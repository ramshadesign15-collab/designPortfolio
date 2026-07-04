import { createContext, useContext } from 'react'

export interface LenisCtx {
  scrollTo: (target: string | number, offset?: number) => void
  /** Pause smooth scrolling (e.g. while a full-screen overlay is open). No-op
   *  under reduced motion, where Lenis is never instantiated. */
  stop: () => void
  /** Resume smooth scrolling. */
  start: () => void
}

/** Shared smooth-scroll context. Lives in its own module so the provider file
 *  only exports a component (keeps React Fast Refresh happy). */
export const Ctx = createContext<LenisCtx>({ scrollTo: () => {}, stop: () => {}, start: () => {} })

export function useLenis(): LenisCtx {
  return useContext(Ctx)
}
