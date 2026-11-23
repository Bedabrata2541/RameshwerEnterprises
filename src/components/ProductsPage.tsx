import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { MSG, PRODUCTS, wa, type Product } from '@/lib/site'
import { useScrollTo } from '@/lib/smooth'
import { Logo } from './Logo'
import { WaButton } from './Buttons'
import { Callback } from './Callback'
import { Footer } from './Footer'
import { ArrowRight, Check, Layers, WhatsAppIcon } from './Icons'

const ease = [0.22, 1, 0.36, 1] as const

function Header({ active }: { active: string }) {
  const scrollTo = useScrollTo()
  return (
    <header className="border-hair bg-sand/90 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-[12px]">
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#/" aria-label="Rameshwer Enterprises home">
          <Logo />
        </a>
        <div className="flex items-center gap-2">
          <a
            href="#/"
            className="border-hair text-ink font-display inline-flex h-10 items-center gap-1.5 rounded-full border bg-white/60 px-3.5 text-[13px] font-bold whitespace-nowrap transition-colors hover:bg-white sm:px-4 sm:text-[13.5px]"
          >
            <ArrowRight size={15} className="rotate-180" />
            <span className="sm:hidden">Home</span>
            <span className="hidden sm:inline">Back to Home</span>
          </a>
          <a
            href={wa(MSG.rates)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-terra hover:bg-terra-dark font-display inline-flex h-10 w-10 items-center justify-center gap-2 rounded-full text-[13px] font-bold text-white sm:w-auto sm:px-5 shadow-[0_8px_20px_-10px_rgba(200,90,23,0.9)] transition-colors sm:text-[13.5px]"
            aria-label="Get Wholesale Rates on WhatsApp"
          >
            <WhatsAppIcon size={15} />
            <span className="hidden sm:inline">Get Wholesale Rates</span>
          </a>
        </div>
      </div>
      {/* Category jump bar */}
      <nav aria-label="Product categories" className="border-hair bg-canvas/90 border-t">
        <div className="no-scrollbar mx-auto flex max-w-[1320px] gap-1.5 overflow-x-auto px-5 py-2.5 sm:px-8">
          {PRODUCTS.map((p) => (
            <a
              key={p.id}
              href={`#/products/${p.id}`}
              onClick={(e) => {
                e.preventDefault()
                history.replaceState(null, '', `#/products/${p.id}`)
                scrollTo(`#cat-${p.id}`, { offset: -140 })
              }}
              className={`font-display shrink-0 rounded-full px-3.5 py-1.5 text-[12.5px] font-bold whitespace-nowrap transition-colors ${
                active === p.id ? 'bg-ink text-white' : 'text-ink/70 hover:text-ink hover:bg-sand'
              }`}
            >
              {p.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

function Category({ p, i }: { p: Product; i: number }) {
  const flip = i % 2 === 1
  const title = p.fullName ?? p.name
  return (
    <section
      id={`cat-${p.id}`}
      data-cat={p.id}
      className={`border-hair scroll-mt-[140px] border-t py-16 sm:py-24 ${flip ? 'bg-[#F8F2EB]' : ''}`}
    >
      <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: flip ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          className={`relative ${flip ? 'lg:order-2' : ''}`}
        >
          <div className="overflow-hidden rounded-2xl shadow-[0_40px_80px_-40px_rgba(59,46,38,0.55)]">
            <img src={p.interior} alt={`${p.interiorLabel} – ${p.name}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div
            className={`absolute -bottom-6 w-[34%] overflow-hidden rounded-xl border-4 border-white shadow-xl sm:-bottom-8 ${
              flip ? '-left-1 sm:-left-6' : '-right-1 sm:-right-6'
            }`}
          >
            <img src={p.raw} alt={`${p.name} raw material`} loading="lazy" className="aspect-square w-full object-cover" />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className={`pt-6 lg:pt-0 ${flip ? 'lg:order-1' : ''}`}
        >
          <div className="flex items-center gap-3">
            <span className="font-display text-terra text-[13px] font-extrabold tracking-[0.2em]">
              {String(i + 1).padStart(2, '0')} / {String(PRODUCTS.length).padStart(2, '0')}
            </span>
            <span className="bg-hair h-px w-10" />
            <span className="text-walnut text-[11px] font-semibold tracking-[0.18em] uppercase">{p.grade}</span>
          </div>
          <h2 className="mt-4 text-[32px] leading-[1.05] font-extrabold sm:text-[44px]">{title}</h2>
          <p className="text-walnut mt-2 text-[15px] font-medium">{p.variant}</p>
          <p className="text-espresso mt-5 max-w-xl text-[16px] leading-relaxed sm:text-[17px]">{p.spec}</p>

          <div className="mt-8">
            <div className="text-ink font-display flex items-center gap-2 text-[13px] font-extrabold tracking-[0.14em] uppercase">
              <Layers size={17} className="text-terra" />
              Products in this category
            </div>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {p.items.map((it) => (
                <li key={it} className="border-hair flex items-start gap-3 rounded-xl border bg-white/60 px-4 py-3">
                  <span className="bg-ink mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-white">
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                  <span className="text-espresso text-[14.5px] leading-snug font-medium">{it}</span>
                </li>
              ))}
            </ul>
            <p className="text-walnut mt-3 text-[13.5px]">
              {p.note ? `${p.note} · ` : ''}And more - ask us for the complete list.
            </p>
          </div>

          <div className="mt-8">
            <WaButton
              size="md"
              href={wa(
                `Hello Rameshwer Enterprises, I would like to inquire about wholesale rates for ${title}. Please share available products, thicknesses and pricing.`,
              )}
            >
              Inquire about {p.name}
            </WaButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function ProductsPage({ focus }: { focus?: string }) {
  const [active, setActive] = useState(focus ?? PRODUCTS[0].id)

  useEffect(() => {
    const onScroll = () => {
      let cur = PRODUCTS[0].id
      document.querySelectorAll<HTMLElement>('[data-cat]').forEach((el) => {
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = el.dataset.cat!
      })
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Header active={active} />
      <main className="pt-[120px]">
        <section className="wood-grain relative">
          <div className="mx-auto max-w-[1320px] px-5 pt-14 pb-14 sm:px-8 sm:pt-20 sm:pb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-terra text-[12px] font-bold tracking-[0.2em] uppercase"
            >
              Product Catalogue
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease }}
              className="mt-3 max-w-4xl text-[38px] leading-[1.03] font-extrabold tracking-[-0.03em] sm:text-[58px]"
            >
              Every board, laminate & veneer - under one roof.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="text-walnut mt-5 max-w-2xl text-[16px] leading-relaxed sm:text-[17px]"
            >
              As an authorized distributor and wholesaler, Rameshwer Enterprises stocks {PRODUCTS.length} product
              categories for architects, interior designers, builders, and manufacturers. Explore each range below.
            </motion.p>
          </div>
        </section>

        {PRODUCTS.map((p, i) => (
          <Category key={p.id} p={p} i={i} />
        ))}

        <section className="border-hair wood-grain border-t pt-6 pb-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <Callback />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
