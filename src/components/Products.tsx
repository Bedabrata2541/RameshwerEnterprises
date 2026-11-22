import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { PRODUCTS, SIZES, type Product, type Size } from '@/lib/site'
import { ArrowRight } from './Icons'

const ease = [0.22, 1, 0.36, 1] as const
type Filter = 'All Sizes' | Size

function Tile({
  p,
  i,
  revealed,
  focused,
  size,
  onEnter,
  onLeave,
  onTap,
}: {
  p: Product
  i: number
  revealed: boolean
  focused: boolean
  size: Filter
  onEnter: () => void
  onLeave: () => void
  onTap: () => void
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.12, ease }}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onEnter()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && onLeave()}
      onPointerUp={(e) => e.pointerType !== 'mouse' && onTap()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onTap()
        }
      }}
      tabIndex={0}
      aria-label={`${p.name} – ${p.variant}`}
      className={`group relative cursor-pointer overflow-hidden bg-[#2a211b] outline-none focus-visible:ring-2 focus-visible:ring-terra focus-visible:ring-inset lg:col-span-1 lg:aspect-[4/5] ${i === PRODUCTS.length - 1 && PRODUCTS.length % 2 === 1 ? 'col-span-2 aspect-[8/5] sm:aspect-[3/2]' : 'aspect-[4/5] sm:aspect-[3/4]'}`}
    >
      {/* Raw texture */}
      <motion.img
        src={p.raw}
        alt={`${p.name} raw texture`}
        animate={{ opacity: revealed ? 0 : 1, scale: revealed ? 1.12 : 1 }}
        transition={{ duration: 1.1, ease }}
        className="absolute inset-0 size-full object-cover"
      />
      {/* Interior reveal */}
      <motion.img
        src={p.interior}
        alt={`${p.interiorLabel} built with ${p.name}`}
        loading="lazy"
        initial={false}
        animate={{
          opacity: revealed ? 1 : 0,
          scale: revealed ? 1 : 1.14,
          clipPath: revealed ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
        }}
        transition={{ duration: 1.1, ease }}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/25" />

      {/* Top meta */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
        <span className="font-display text-[12px] font-bold tracking-[0.2em] text-white/85">0{i + 1}</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={revealed ? 'int' : 'raw'}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35 }}
            className="hidden rounded-full bg-black/30 px-2.5 py-1 text-[10.5px] font-semibold tracking-wide text-white/90 backdrop-blur-md sm:inline-block"
          >
            {revealed ? `Applied · ${p.interiorLabel}` : `Raw · ${p.rawLabel}`}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Title */}
      <motion.div
        animate={{ y: focused ? -8 : 0, opacity: focused ? 0 : 1 }}
        transition={{ duration: 0.4, ease }}
        className="absolute inset-x-0 bottom-0 p-4 sm:p-5"
      >
        <h3 className="text-[17px] leading-tight font-extrabold !text-white sm:text-xl">{p.name}</h3>
        <p className="mt-1 text-[12.5px] text-white/75 sm:text-[13px]">{p.variant}</p>
      </motion.div>

      {/* Glass overlay */}
      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="absolute inset-x-2 bottom-2 rounded-xl border border-white/25 bg-white/15 p-3 text-white shadow-2xl backdrop-blur-xl [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] sm:inset-x-3 sm:bottom-3 sm:p-4"
          >
            <span className="bg-terra inline-block max-w-full rounded-full px-2 py-[3px] text-[9.5px] leading-tight font-bold tracking-wide uppercase sm:text-[10px]">
              {p.grade}
            </span>
            <h3 className="mt-2 text-[15px] leading-tight font-extrabold !text-white sm:text-lg">{p.name}</h3>
            <p className="mt-0.5 hidden text-[12.5px] font-medium text-white/85 sm:block">{p.variant}</p>
            <p className="mt-1.5 line-clamp-1 text-[11px] text-white/80 sm:mt-2 sm:text-[12px]">
              <span className="font-semibold text-white">Includes:</span>{' '}
              {p.items.slice(0, 3).map((it) => it.split(' – ')[0]).join(' · ')}
              {p.items.length > 3 && ` +${p.items.length - 3} more`}
            </p>
            <div className="mt-2 grid grid-cols-3 gap-1">
              {SIZES.map((s) => (
                <span
                  key={s}
                  className={`rounded-md border py-[3px] text-center text-[10px] font-semibold whitespace-nowrap sm:text-[11px] ${
                    size === s ? 'border-white bg-white text-ink [text-shadow:none]' : 'border-white/30 text-white'
                  }`}
                >
                  {s.replace(' ft', '').replace(/ /g, '')}
                  <span className="hidden sm:inline"> ft</span>
                </span>
              ))}
            </div>
            <a
              href={`#/products/${p.id}`}
              onPointerUp={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              className="bg-terra hover:bg-terra-dark font-display mt-2.5 flex h-9 items-center justify-center gap-1.5 rounded-lg text-[12.5px] font-bold text-white transition-colors sm:h-10 sm:text-[13px]"
            >
              Explore Now
              <ArrowRight size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spotlight edge glow */}
      <motion.div
        animate={{ opacity: revealed && !focused ? 1 : 0 }}
        className="pointer-events-none absolute inset-0 ring-2 ring-white/40 ring-inset"
      />
    </motion.article>
  )
}

export function Products() {
  const [size, setSize] = useState<Filter>('All Sizes')
  const [spot, setSpot] = useState(0)
  const [focus, setFocus] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, { margin: '-15% 0px' })

  // Rhythmic sequential spotlight while idle
  useEffect(() => {
    if (!inView || focus !== null) return
    const t = setInterval(() => {
      setSpot((s) => {
        const n = (s + 1) % PRODUCTS.length
        return n
      })
    }, 2500)
    return () => clearInterval(t)
  }, [inView, focus])

  // Touch: tapping outside the grid closes an open card.
  useEffect(() => {
    if (focus === null) return
    const close = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && !gridRef.current?.contains(e.target as Node)) setFocus(null)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [focus])

  const filters: Filter[] = ['All Sizes', ...SIZES]

  return (
    <section id="products" className="wood-grain relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="text-terra text-[12px] font-bold tracking-[0.2em] uppercase">Our Product Range</span>
            <h2 className="mt-3 text-[34px] leading-[1.05] font-extrabold sm:text-5xl lg:text-[54px]">
              Plywood, MDF, HDMR, Laminates & Specialty Boards Under One Roof
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <p className="text-walnut text-[16px] leading-relaxed sm:text-[17px]">
              Hover or tap any board texture to preview its real-world architectural application, check available sheet
              sizes, and request instant wholesale pricing.
            </p>
            <div role="radiogroup" aria-label="Filter by sheet size" className="no-scrollbar mt-5 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {filters.map((f) => (
                <button
                  key={f}
                  role="radio"
                  aria-checked={size === f}
                  onClick={() => setSize(f)}
                  className={`font-display relative h-10 shrink-0 rounded-full border px-4 text-[13.5px] font-bold transition-colors ${
                    size === f ? 'border-ink text-white' : 'border-hair text-ink bg-cream hover:border-ink/40'
                  }`}
                >
                  {size === f && (
                    <motion.span
                      layoutId="size-pill"
                      className="bg-ink absolute inset-0 rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-6 flex items-center justify-between text-[13px] text-walnut">
          <AnimatePresence mode="wait">
            <motion.p key={size} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 6 }}>
              {size === 'All Sizes' ? (
                <>
                  All {PRODUCTS.length} categories in ready stock across <b className="text-ink">8×4, 8×6 & 10×4 ft</b>
                </>
              ) : (
                <>
                  Showing all {PRODUCTS.length} categories in <b className="text-ink">{size}</b> — inquiries will be pre-filled with this size
                </>
              )}
            </motion.p>
          </AnimatePresence>
          <span className="hidden items-center gap-2 sm:flex">
            <span className="relative flex size-2">
              <span className="bg-terra absolute inline-flex size-full animate-ping rounded-full opacity-60" />
              <span className="bg-terra relative inline-flex size-2 rounded-full" />
            </span>
            Live material preview
          </span>
        </div>

        <div
          ref={gridRef}
          className="border-hair relative mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-[#DFD1C1] shadow-[0_40px_80px_-40px_rgba(59,46,38,0.5)] lg:grid-cols-3"
          onPointerLeave={(e) => e.pointerType === 'mouse' && setFocus(null)}
        >
          {PRODUCTS.map((p, i) => (
            <Tile
              key={p.id}
              p={p}
              i={i}
              size={size}
              focused={focus === i}
              revealed={focus === null ? spot === i : focus === i}
              onEnter={() => setFocus(i)}
              onLeave={() => setFocus((f) => (f === i ? null : f))}
              onTap={() => setFocus((f) => (f === i ? null : i))}
            />
          ))}

        </div>
        <div className="mt-8 flex justify-center">
          <a
            href="#/products"
            className="group border-border-walnut bg-cream text-btn-walnut font-display inline-flex h-12 items-center gap-2 rounded-xl border-[1.5px] px-6 text-[14.5px] font-bold transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            Explore All Product Categories
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
