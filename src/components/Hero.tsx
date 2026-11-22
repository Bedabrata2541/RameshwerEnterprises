import { motion } from 'motion/react'
import prelam from '@/assets/img/hero-prelam.jpg'
import cnc from '@/assets/img/hero-cnc.jpg'
import living from '@/assets/img/hero-living.jpg'
import { MSG, wa } from '@/lib/site'
import { useScrollTo } from '@/lib/smooth'
import { Counter } from './Counter'
import { OutlineButton, WaButton } from './Buttons'
import { ArrowDown, Badge, MapPin, Ruler } from './Icons'

const ease = [0.22, 1, 0.36, 1] as const

const HEADLINE = ['Your', 'Trusted', 'Partner', 'for', 'Plywood,', 'MDF,', 'HDMR', '&', 'Wood', 'Solutions']

function Card({
  src,
  alt,
  className,
  delay,
  caption,
}: {
  src: string
  alt: string
  className: string
  delay: number
  caption?: string
}) {
  return (
    <div className={className}>
    <motion.figure
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay, ease }}
      className="group relative size-full overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(59,46,38,0.55)]"
    >
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.18 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, delay, ease }}
        className="size-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
      />
      {caption && (
        <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold tracking-wide text-espresso backdrop-blur-sm">
          {caption}
        </figcaption>
      )}
    </motion.figure>
    </div>
  )
}

export function Hero() {
  const scrollTo = useScrollTo()

  return (
    <section id="home" className="wood-grain relative overflow-hidden pt-[72px]">
      {/* soft warm light */}
      <div className="pointer-events-none absolute -top-40 -left-40 size-[640px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.7),transparent_65%)]" />
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 pt-10 pb-16 sm:px-8 lg:min-h-[calc(100svh-72px)] lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-6 lg:pb-14">
        <div className="relative z-10">
          <h1 className="text-[40px] leading-[1.02] font-extrabold tracking-[-0.035em] sm:text-[56px] lg:text-[60px] xl:text-[68px]">
            {HEADLINE.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  className={`inline-block ${w === '&' ? 'text-terra' : ''}`}
                  initial={{ y: '110%', rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease }}
                >
                  {w}
                </motion.span>
                {i < HEADLINE.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="text-espresso mt-6 max-w-[560px] text-[17px] leading-relaxed sm:text-lg"
          >
            A comprehensive range of Plywood, high-density MDF, HDMR, Prelaminated, Boilo, Particle, and Finger Joint Rubber
            Boards, premium Laminates and Veneers for architects, interior designers, builders, and manufacturers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <WaButton href={wa(MSG.rates)}>Get Wholesale Rates</WaButton>
            <OutlineButton onClick={() => scrollTo('#products')}>
              View Range
              <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
            </OutlineButton>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.05 } } }}
            className="border-hair mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t pt-6 text-[13.5px] font-medium text-walnut"
          >
            {[
              { i: <Badge size={18} />, t: '15+ Years Expertise' },
              { i: <Ruler size={18} />, t: 'Ready Stock: 8×4, 8×6, 10×4 ft' },
              { i: <MapPin size={18} />, t: 'Nangloi, New Delhi' },
            ].map((x) => (
              <motion.li
                key={x.t}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                className="flex items-center gap-2"
              >
                <span className="text-terra">{x.i}</span>
                {x.t}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Aligned 2-column image grid: equal tops and bottoms */}
        <div className="grid h-[480px] grid-cols-2 grid-rows-2 gap-4 sm:h-[600px] lg:h-[min(640px,calc(100svh-150px))]">
          <Card src={prelam} alt="Fanned stack of prelaminated boards" className="col-start-1 row-start-1" delay={0.25} caption="Prelaminated Decors" />
          <Card src={cnc} alt="CNC-carved ornamental MDF panel on router bed" className="col-start-1 row-start-2" delay={0.45} caption="CNC-Ready MDF" />
          <div className="relative col-start-2 row-span-2 row-start-1">
            <Card src={living} alt="Luxury wood-paneled living room interior" className="size-full" delay={0.35} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease }}
              className="border-hair absolute inset-x-3 bottom-3 rounded-xl border bg-cream/95 p-4 shadow-xl backdrop-blur sm:inset-x-4 sm:bottom-4"
            >
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="font-display text-ink text-3xl leading-none font-extrabold sm:text-4xl"><Counter to={15} suffix="+" delay={1} /></div>
                  <div className="text-walnut mt-1 text-[12px] font-medium sm:text-[12.5px]">Years as distributor & wholesaler</div>
                </div>
                <div className="hidden text-right sm:block">
                  <div className="text-walnut text-[10px] font-semibold tracking-[0.18em] uppercase">Ready Stock</div>
                  <div className="font-display text-ink mt-0.5 text-sm font-bold">8×4 · 8×6 · 10×4 ft</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
