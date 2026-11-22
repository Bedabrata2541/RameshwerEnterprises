import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import Lenis from 'lenis'

type ScrollTo = (target: string | number | HTMLElement, opts?: { offset?: number; immediate?: boolean }) => void

const SmoothCtx = createContext<ScrollTo>((target) => {
  if (typeof target === 'string') document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
})

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const [, force] = useState(0)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9, easing: (t) => 1 - Math.pow(1 - t, 4) })
    lenisRef.current = lenis
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    force((n) => n + 1)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo: ScrollTo = (target, opts) => {
    const offset = opts?.offset ?? (typeof target === 'number' ? 0 : -72)
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(target, { offset, immediate: opts?.immediate })
      return
    }
    let y: number
    if (typeof target === 'number') y = target
    else {
      const el = typeof target === 'string' ? document.querySelector(target) : target
      if (!el) return
      y = el.getBoundingClientRect().top + window.scrollY
    }
    window.scrollTo({ top: y + offset, behavior: 'smooth' })
  }

  return <SmoothCtx.Provider value={scrollTo}>{children}</SmoothCtx.Provider>
}

export const useScrollTo = () => useContext(SmoothCtx)
