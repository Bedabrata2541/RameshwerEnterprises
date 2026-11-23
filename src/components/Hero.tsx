import { motion } from 'motion/react'
import prelam from '@/assets/img/hero-prelam.jpg'
import cnc from '@/assets/img/hero-cnc.jpg'
import living from '@/assets/img/hero-living.jpg'
import { MSG, wa } from '@/lib/site'
import { useScrollTo } from '@/lib/smooth'
import { Counter } from './Counter'
import { OutlineButton, WaButton } from './Buttons'
import { ArrowDown } from './Icons'

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
    <div className={`relative min-h-0 ${className}`}>
    <motion.figure
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay, ease }}
      className="group absolute inset-0 overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(59,46,38,0.55)]"
    >
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.18 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, delay, ease }}
        className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
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
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 pt-8 pb-12 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-stretch lg:gap-12 lg:py-12">
        <div className="relative z-10 flex flex-col justify-center lg:py-4">
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

          {/* Key numbers */}
          <motion.dl
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 1.0 } } }}
            className="border-hair mt-10 grid max-w-[560px] grid-cols-3 border-t pt-7"
          >
            {[
              { to: 30, s: '+', l: 'Years of trusted supply' },
              { to: 50, s: '+', l: 'Product categories' },
              { to: 7, s: '+', l: 'Authorized brands' },
            ].map((x, i) => (
              <motion.div
                key={x.l}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className={i > 0 ? 'border-hair border-l pl-4 sm:pl-6' : 'pr-4'}
              >
                <dt className="font-display text-ink text-[34px] leading-none font-extrabold tracking-tight sm:text-[44px]">
                  <Counter to={x.to} suffix={x.s} delay={1.1 + i * 0.15} />
                </dt>
                <dd className="text-walnut mt-2 text-[12.5px] leading-snug font-medium sm:text-[13.5px]">{x.l}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        {/* Aligned 2-column image grid: equal tops and bottoms */}
        <div className="grid h-[460px] grid-cols-2 grid-rows-2 gap-4 sm:h-[580px] lg:h-auto lg:min-h-[520px]">
          <Card src={prelam} alt="Fanned stack of prelaminated boards" className="col-start-1 row-start-1" delay={0.25} caption="Prelaminated Decors" />
          <Card src={cnc} alt="CNC-carved ornamental MDF panel on router bed" className="col-start-1 row-start-2" delay={0.45} caption="CNC-Ready MDF" />
          <Card src={living} alt="Luxury wood-paneled living room interior" className="col-start-2 row-span-2 row-start-1" delay={0.35} caption="Finished Interiors" />
        </div>
      </div>
    </section>
  )
}