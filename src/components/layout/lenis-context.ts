import { createContext, useContext } from 'react'

export interface LenisCtx {
  scrollTo: (target: string | number, offset?: number) => void
}

/** Shared smooth-scroll context. Lives in its own module so the provider file
 *  only exports a component (keeps React Fast Refresh happy). */
export const Ctx = createContext<LenisCtx>({ scrollTo: () => {} })

export function useLenis(): LenisCtx {
  return useContext(Ctx)
}
