import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useScrollTo } from '@/lib/smooth'
import { LogoBadge } from './Logo'
import { ArrowRight, Close, Phone, WhatsAppIcon } from './Icons'

const DESKTOP = '(min-width: 1024px) and (pointer: fine)'

/**
 * On desktop, intercepts every WhatsApp CTA and offers a choice:
 * continue to WhatsApp (with the CTA's pre-filled message) or request a callback.
 */
export function ContactChooser() {
  const [href, setHref] = useState<string | null>(null)
  const scrollTo = useScrollTo()
  const firstBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      if (!window.matchMedia(DESKTOP).matches) return
      const a = (e.target as Element | null)?.closest?.('a[href^="https://wa.me/"]') as HTMLAnchorElement | null
      if (!a || a.closest('[data-chooser]')) return
      e.preventDefault()
      setHref(a.href)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  useEffect(() => {
    if (!href) return
    firstBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setHref(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [href])

  const goWhatsApp = () => {
    if (href) window.open(href, '_blank', 'noopener,noreferrer')
    setHref(null)
  }
  const goCallback = () => {
    setHref(null)
    scrollTo('#callback', { offset: -110 })
    setTimeout(() => document.getElementById('callback-name')?.focus({ preventScroll: true }), 1300)
  }

  return (
    <AnimatePresence>
      {href && (
        <motion.div
          data-chooser
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-ink/55 absolute inset-0 backdrop-blur-sm" onClick={() => setHref(null)} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="chooser-title"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="border-hair bg-canvas relative w-full max-w-[560px] rounded-3xl border p-8 shadow-[0_40px_100px_-30px_rgba(29,20,70,0.6)]"
          >
            <button
              type="button"
              onClick={() => setHref(null)}
              aria-label="Close"
              className="text-walnut hover:text-ink hover:bg-sand absolute top-4 right-4 grid size-9 place-items-center rounded-full transition-colors"
            >
              <Close size={18} />
            </button>
            <div className="flex items-center gap-3">
              <LogoBadge className="size-11" />
              <span className="text-walnut text-[11px] font-semibold tracking-[0.18em] uppercase">Rameshwer Enterprises</span>
            </div>
            <h2 id="chooser-title" className="mt-5 text-[28px] leading-tight font-extrabold">
              How would you like to connect?
            </h2>
            <p className="text-walnut mt-2 text-[15px]">Get wholesale rates instantly on WhatsApp, or let our sales team call you.</p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                ref={firstBtn}
                type="button"
                onClick={goWhatsApp}
                className="group bg-terra hover:bg-terra-dark flex flex-col items-start rounded-2xl p-5 text-left text-white shadow-[0_14px_30px_-14px_rgba(200,90,23,0.9)] transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-terra focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span className="grid size-10 place-items-center rounded-full bg-white/15">
                  <WhatsAppIcon size={20} />
                </span>
                <span className="font-display mt-4 text-[17px] font-bold">Chat on WhatsApp</span>
                <span className="mt-1 flex items-center gap-1 text-[13px] text-white/85">
                  Message ready to send <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
              <button
                type="button"
                onClick={goCallback}
                className="group border-border-walnut bg-cream hover:bg-white flex flex-col items-start rounded-2xl border-[1.5px] p-5 text-left transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-border-walnut focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span className="bg-ink grid size-10 place-items-center rounded-full text-white">
                  <Phone size={18} />
                </span>
                <span className="font-display text-ink mt-4 text-[17px] font-bold">Request a Callback</span>
                <span className="text-walnut mt-1 flex items-center gap-1 text-[13px]">
                  Share name & number <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
