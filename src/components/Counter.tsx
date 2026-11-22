import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'

/** Counts up from `from` to `to` once the number scrolls into view. */
export function Counter({ to, from = 0, suffix = '', duration = 1.8, delay = 0 }: {
  to: number
  from?: number
  suffix?: string
  duration?: number
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!inView) return
    const c = animate(from, to, { duration, delay, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setValue(Math.round(v)) })
    return () => c.stop()
  }, [inView, from, to, duration, delay])

  return (
    <span ref={ref} className="tabular-nums" aria-label={`${to}${suffix}`}>
      {value}
      {suffix}
    </span>
  )
}
