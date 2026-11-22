import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { NAV, MSG, wa } from '@/lib/site'
import { useScrollTo } from '@/lib/smooth'
import { Logo } from './Logo'
import { Close, Menu, WhatsAppIcon } from './Icons'

export function Nav() {
  const scrollTo = useScrollTo()
  const [active, setActive] = useState<string>('home')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const probe = window.innerHeight * 0.38
      let current: string = NAV[0].id
      for (const n of NAV) {
        const el = document.getElementById(n.id)
        if (el && el.getBoundingClientRect().top <= probe) current = n.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    scrollTo(id === 'home' ? 0 : `#${id}`)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled
          ? 'border-hair bg-sand/90 shadow-[0_8px_30px_-18px_rgba(29,20,70,0.35)] backdrop-blur-[12px]'
          : 'border-hair/70 bg-sand/70 backdrop-blur-[12px]'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            go('home')
          }}
          aria-label="Rameshwer Enterprises home"
        >
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => {
                e.preventDefault()
                go(n.id)
              }}
              className={`font-display relative rounded-full px-3.5 py-2 text-[14.5px] font-semibold transition-colors ${
                active === n.id ? 'text-ink' : 'text-ink/65 hover:text-ink'
              }`}
            >
              {active === n.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="border-hair absolute inset-0 -z-10 rounded-full border bg-white/60"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {n.label}
              {active === n.id && (
                <motion.span
                  layoutId="nav-dot"
                  className="bg-terra absolute -bottom-[3px] left-1/2 size-1 -translate-x-1/2 rounded-full"
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={wa(MSG.rates)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-terra hover:bg-terra-dark font-display hidden h-10 items-center gap-2 rounded-full px-5 text-[13.5px] font-bold text-white shadow-[0_8px_20px_-10px_rgba(200,90,23,0.9)] transition-all hover:-translate-y-px sm:inline-flex"
          >
            <WhatsAppIcon size={15} />
            Get Wholesale Rates
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="text-ink border-hair grid size-10 place-items-center rounded-full border bg-white/50 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <Close size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="border-hair bg-sand/95 overflow-hidden border-t backdrop-blur-xl lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col px-5 py-4">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                  onClick={(e) => {
                    e.preventDefault()
                    go(n.id)
                  }}
                  className={`font-display border-hair flex items-center justify-between border-b py-3.5 text-lg font-bold last:border-0 ${
                    active === n.id ? 'text-terra' : 'text-ink'
                  }`}
                >
                  {n.label}
                  
                </motion.a>
              ))}
              <a
                href={wa(MSG.rates)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-terra font-display mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-xl font-bold text-white"
              >
                <WhatsAppIcon size={17} />
                Get Wholesale Rates
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
