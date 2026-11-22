import { useRef, useState, type ReactNode } from 'react'
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import boardFace from '@/assets/img/board-face.jpg'
import rain from '@/assets/img/story-rain.jpg'
import studio from '@/assets/img/story-studio.jpg'
import joinery from '@/assets/img/story-joinery.jpg'
import workspace from '@/assets/img/story-workspace.jpg'
import iso from '@/assets/img/story-iso.jpg'
import { MSG, wa } from '@/lib/site'
import { useScrollTo } from '@/lib/smooth'
import { LogoBadge } from './Logo'
import { Bug, Leaf, Load, Shield, Star, Wave, WhatsAppIcon } from './Icons'

const ease = [0.22, 1, 0.36, 1] as const

const STAGES = [
  { short: 'Core', title: 'Engineered Core & Durability' },
  { short: 'Moisture', title: 'Extreme Moisture Resistance' },
  { short: 'Precision', title: 'CNC Precision & Screw Holding' },
  { short: 'Assembly', title: 'Full Interior Assembly' },
  { short: 'Specs', title: 'Holo-Spec Finale' },
]

// Global progress points where discrete UI (texts, stage pill) changes.
const THRESHOLDS = Array.from({ length: 5 }, (_, s) =>
  [0, 0.1, 0.12, 0.3, 0.32, 0.38, 0.5, 0.58, 0.6, 0.62].map((t) => (s + t) * 0.2),
).flat()

/* ---------- small helpers ---------- */

function Kinetic({ show, children, className = '', from = 'up', delay = 0 }: {
  show: boolean
  children: ReactNode
  className?: string
  from?: 'up' | 'left' | 'right' | 'scale'
  delay?: number
}) {
  const init =
    from === 'left' ? { x: -60, opacity: 0, filter: 'blur(8px)' }
    : from === 'right' ? { x: 60, opacity: 0, filter: 'blur(8px)' }
    : from === 'scale' ? { scale: 0.6, opacity: 0, filter: 'blur(10px)' }
    : { y: 50, opacity: 0, filter: 'blur(8px)' }
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={init}
          animate={{ x: 0, y: 0, scale: 1, opacity: 1, filter: 'blur(0px)' }}
          exit={{ ...init, transition: { duration: 0.35 } }}
          transition={{ duration: 0.75, delay, ease }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Split({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, w, words) => {
        const offset = words.slice(0, w).join(' ').length
        return (
          <span key={w}>
          <span className="inline-block whitespace-nowrap" aria-hidden="true">
            {word.split('').map((c, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: '0.6em', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: (offset + i) * 0.025, ease }}
              >
                {c}
              </motion.span>
            ))}
          </span>
          {w < words.length - 1 && ' '}
          </span>
        )
      })}
    </span>
  )
}

/* ---------- the board ---------- */

function Board({ p }: { p: MotionValue<number> }) {
  const rotateX = useTransform(p, [0, 0.11, 0.42, 0.5, 0.56], [74, 0, 0, 18, 72])
  const rotateZ = useTransform(p, [0.4, 0.48], [0, 34])
  const scale = useTransform(p, [0, 0.11, 0.4, 0.48, 0.56], [0.78, 1, 1, 0.7, 0.55])
  const y = useTransform(p, [0, 0.11, 0.48, 0.56], ['14%', '0%', '-4%', '30%'])
  const radius = useTransform(p, [0.4, 0.47], [6, 420])
  const opacity = useTransform(p, [0, 0.02, 0.5, 0.56], [0.4, 1, 1, 0])
  const wet = useTransform(p, [0.22, 0.28, 0.38, 0.42], [0, 1, 1, 0])
  const sheen = useTransform(p, [0, 0.11], ['-60%', '160%'])

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center pt-[10svh] [perspective:1400px]">
      <motion.div
        style={{ rotateX, rotateZ, scale, y, opacity, borderRadius: radius }}
        className="relative h-[44svh] w-[calc(44svh*0.617)] overflow-hidden will-change-transform shadow-[0_6px_0_#7a4c22,0_9px_0_#5e3a19,0_50px_90px_-20px_rgba(0,0,0,0.65)] lg:h-[54svh] lg:w-[calc(54svh*0.617)]"
      >
        <img src={boardFace} alt="Engineered board" className="size-full object-cover" />
        {/* Brand stamps along edges */}
        <div className="absolute inset-y-4 left-2.5 flex flex-col justify-between">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="font-display text-[7px] font-extrabold tracking-[0.2em] text-[#4a2a12]/40 [writing-mode:vertical-rl]">
              RAMESHWER
            </span>
          ))}
        </div>
        <div className="absolute inset-y-4 right-2.5 flex flex-col justify-between">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="font-display text-[7px] font-extrabold tracking-[0.2em] text-[#4a2a12]/40 [writing-mode:vertical-rl]">
              ENTERPRISES
            </span>
          ))}
        </div>
        <div className="absolute top-[18%] left-1/2 flex -translate-x-1/2 flex-col items-center text-[#4a2a12]/45">
          <span className="font-display text-2xl font-black tracking-tight italic">RE</span>
          <span className="mt-0.5 text-[6px] font-bold tracking-[0.3em]">HIGH-DENSITY CORE</span>
        </div>
        {/* light sweep on tilt-up */}
        <motion.div
          style={{ x: sheen }}
          className="absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
        {/* water shimmer */}
        <motion.div style={{ opacity: wet }} className="absolute inset-0">
          <div className="droplets animate-shimmer absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-sky-200/25 via-transparent to-sky-900/30" />
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ---------- workspace assembly ---------- */

function Piece({ clip, p, range, from }: { clip: string; p: MotionValue<number>; range: [number, number]; from: { x?: string; y?: string; s?: number } }) {
  const x = useTransform(p, range, [from.x ?? '0%', '0%'])
  const y = useTransform(p, range, [from.y ?? '0%', '0%'])
  const scale = useTransform(p, range, [from.s ?? 1, 1])
  const opacity = useTransform(p, [range[0], range[0] + (range[1] - range[0]) * 0.5], [0, 1])
  return (
    <motion.img
      src={workspace}
      alt=""
      style={{ x, y, scale, opacity, clipPath: clip }}
      className="absolute inset-0 size-full object-cover will-change-transform"
    />
  )
}

function Workspace({ p }: { p: MotionValue<number> }) {
  const layer = useTransform(p, [0.56, 0.62], [0, 1])
  const cam = useTransform(p, [0.6, 0.8], [1.32, 1])
  const full = useTransform(p, [0.73, 0.77], [0, 1])
  const logo = useTransform(p, [0.71, 0.75], [0, 1])
  const logoScale = useTransform(p, [0.71, 0.75], [0.4, 1])
  // global p of stage 4 = 0.6 + local*0.2
  const g = (a: number, b: number): [number, number] => [0.6 + a * 0.2, 0.6 + b * 0.2]
  return (
    <motion.div style={{ opacity: layer }} className="absolute inset-0 z-[3] overflow-hidden bg-[#2b2622]">
      <motion.div
        style={{ scale: cam, x: '-50%', y: '-50%' }}
        className="absolute top-1/2 left-1/2 h-[max(100svh,66.667vw)] w-[max(100vw,150svh)]"
      >
        <img src={workspace} alt="" className="absolute inset-0 size-full object-cover opacity-50 blur-[2px] brightness-[0.45] grayscale" />
        <Piece clip="inset(0% 85% 0% 0%)" p={p} range={g(0.02, 0.28)} from={{ x: '-30%' }} />
        <Piece clip="inset(0% 0% 0% 79%)" p={p} range={g(0.08, 0.34)} from={{ x: '30%' }} />
        <Piece clip="inset(48% 20% 0% 14%)" p={p} range={g(0.16, 0.42)} from={{ y: '28%' }} />
        <Piece clip="inset(6% 52% 60% 14%)" p={p} range={g(0.26, 0.48)} from={{ x: '-12%', s: 0.9 }} />
        <Piece clip="inset(38% 40% 44% 34%)" p={p} range={g(0.36, 0.56)} from={{ y: '-14%' }} />
        <Piece clip="inset(8% 30% 58% 52%)" p={p} range={g(0.44, 0.62)} from={{ s: 0.7 }} />
        <motion.img src={workspace} alt="Modern workspace built with engineered boards" style={{ opacity: full }} className="absolute inset-0 size-full object-cover" />
        {/* Framed brand emblem inside the wall frame */}
        <motion.div
          style={{ opacity: logo, scale: logoScale }}
          className="absolute top-[13%] left-[55.6%] flex h-[25%] w-[11.8%] flex-col items-center justify-center gap-[6%] bg-[#ecebe8]"
        >
          <LogoBadge className="aspect-square w-[62%] shadow-md" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30" />
    </motion.div>
  )
}

/* ---------- holo ring ---------- */

const HOLO = [
  { I: Bug, t: 'Termite Shield' },
  { I: Wave, t: 'Water Resistant' },
  { I: Load, t: 'Load Strength' },
  { I: Leaf, t: 'Eco Timber' },
]

function HoloRing({ conv }: { conv: MotionValue<number> }) {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  useAnimationFrame((t) => {
    const c = conv.get()
    const R = Math.min(window.innerWidth * 0.36, 300) * c
    refs.current.forEach((el, i) => {
      if (!el) return
      const a = t / 2600 + (i * Math.PI * 2) / HOLO.length
      const x = Math.cos(a) * R
      const y = Math.sin(a) * R * 0.38
      const depth = (Math.sin(a) + 1) / 2
      el.style.transform = `translate(-50%,-50%) translate(${x}px, ${y}px) scale(${(0.75 + depth * 0.35) * (0.4 + c * 0.6)})`
      el.style.zIndex = String(Math.round(depth * 10))
      el.style.opacity = String((0.45 + depth * 0.55) * Math.min(1, c * 2.5))
    })
  })
  return (
    <div className="absolute top-[42%] left-1/2">
      {HOLO.map(({ I, t }, i) => (
        <div key={t} ref={(el) => { refs.current[i] = el }} className="absolute top-0 left-0 flex flex-col items-center gap-2">
          <span className="grid size-16 place-items-center rounded-full border border-white/50 bg-white/5 text-white shadow-[0_0_30px_rgba(255,255,255,0.45),inset_0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-sm sm:size-20">
            <I size={34} strokeWidth={1.3} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
          </span>
          <span className="text-[10px] font-semibold tracking-[0.2em] whitespace-nowrap text-white/85 uppercase">{t}</span>
        </div>
      ))}
    </div>
  )
}

/* ---------- main ---------- */

export function Story() {
  const ref = useRef<HTMLElement>(null)
  const scrollTo = useScrollTo()
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Spring-smoothed progress drives every scrubbed transform for a fluid, inertial feel.
  const p = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.35, restDelta: 0.0002 })
  // Only re-render when a text/stage threshold is crossed (not on every scroll frame).
  const [pos, setPos] = useState(0)
  useMotionValueEvent(p, 'change', (v) => {
    let snap = 0
    for (const t of THRESHOLDS) if (v >= t) snap = t + 1e-6
    setPos((prev) => (prev === snap ? prev : snap))
  })

  const stage = Math.min(4, Math.floor(pos * 5))
  const local = pos * 5 - stage

  // Layers
  const rainClip = useTransform(p, [0.18, 0.27], ['inset(0% 0% 0% 100%)', 'inset(0% 0% 0% 0%)'])
  const rainOpacity = useTransform(p, [0.4, 0.46], [1, 0])
  const rainScale = useTransform(p, [0.18, 0.4], [1.15, 1])
  const studioOpacity = useTransform(p, [0.39, 0.45, 0.6, 0.64], [0, 1, 1, 0])
  const studioBlur = useTransform(p, [0.44, 0.54], ['blur(14px)', 'blur(0px)'])
  const studioScale = useTransform(p, [0.4, 0.6], [1.12, 1])
  const joinX = useTransform(p, [0.51, 0.56], ['110%', '0%'])
  const joinRot = useTransform(p, [0.51, 0.56], [8, -2])
  const arrow = useTransform(p, [0.53, 0.58], [0, 1])
  const isoOpacity = useTransform(p, [0.78, 0.82], [0, 1])
  const isoScale = useTransform(p, [0.8, 1], [1.2, 1])
  const isoRot = useTransform(p, [0.8, 1], [-5, 0])
  const conv = useTransform(p, [0.8, 0.84, 0.9, 0.95], [0.2, 1, 1, 0])
  const brandOpacity = useTransform(p, [0.92, 0.96], [0, 1])
  const brandScale = useTransform(p, [0.92, 0.97], [0.5, 1])
  const barScale = useTransform(p, [0, 1], [0, 1])

  const jump = (s: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const span = el.offsetHeight - window.innerHeight
    const target = s === 0 ? 0.13 : s === 4 ? 0.985 : s * 0.2 + 0.16
    scrollTo(top + span * target, { offset: 0 })
  }

  return (
    <section id="craft" ref={ref} className="relative h-[620vh] bg-[#1b1714]" aria-label="Craft and technology">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Stage 1 base — studio grey with warm vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,#c9c3bb_0%,#8f8880_45%,#3a342f_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Stage 2 — coastal rain mist */}
        <motion.div style={{ clipPath: rainClip, opacity: rainOpacity }} className="absolute inset-0 z-[1]">
          <motion.img style={{ scale: rainScale }} src={rain} alt="" className="size-full object-cover" />
          <div className="rain-streaks animate-rain absolute inset-0 opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a26]/50 via-transparent to-[#0d1a26]/70" />
        </motion.div>

        {/* Stage 3 — studio */}
        <motion.div style={{ opacity: studioOpacity }} className="absolute inset-0 z-[2]">
          <motion.img style={{ filter: studioBlur, scale: studioScale }} src={studio} alt="Rounded architectural tabletop in a modern studio" className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </motion.div>

        <Board p={p} />

        {/* Joinery macro */}
        <motion.figure
          style={{ x: joinX, rotate: joinRot, opacity: studioOpacity }}
          className="absolute right-[5%] bottom-[24%] z-[6] w-[46vw] max-w-[360px] overflow-hidden rounded-2xl border-4 border-white/90 shadow-2xl sm:bottom-[20%] lg:top-[24%] lg:bottom-auto"
        >
          <img src={joinery} alt="Precision dowel and screw joinery" className="aspect-square w-full object-cover" />
          <figcaption className="absolute bottom-2 left-2 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur">
            Dowel & screw joinery
          </figcaption>
        </motion.figure>

        <Workspace p={p} />

        {/* Stage 5 — isometric finale */}
        <motion.div style={{ opacity: isoOpacity }} className={`absolute inset-0 z-[4] ${stage === 4 ? '' : 'pointer-events-none'}`}>
          <motion.img style={{ scale: isoScale, rotate: isoRot }} src={iso} alt="Isometric flat-lay of stacked engineered boards" className="size-full object-cover" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(0,0,0,0.1),rgba(0,0,0,0.75))]" />
          <HoloRing conv={conv} />
          <motion.div style={{ opacity: brandOpacity, scale: brandScale }} className="absolute inset-x-0 top-[24%] flex flex-col items-center px-6 text-center sm:top-[26%]">
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-white/25 blur-3xl" />
              <LogoBadge className="relative size-28 shadow-[0_0_60px_rgba(255,255,255,0.7)] ring-2 ring-white/80 sm:size-36" />
            </div>
            <div className="font-display mt-6 text-2xl font-extrabold tracking-[0.08em] text-white uppercase drop-shadow-[0_0_18px_rgba(255,255,255,0.75)] sm:text-4xl">
              Rameshwer Enterprises
            </div>
            <p className="mt-2 text-sm text-white/80 sm:text-base">Plywood, MDF, HDMR & Wood Solutions · Since 2010</p>
            <a
              href={wa(MSG.priceList)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-terra hover:bg-terra-dark font-display mt-7 inline-flex h-14 items-center gap-2.5 rounded-xl px-6 text-[15px] font-bold text-white shadow-[0_0_40px_rgba(200,90,23,0.55)] transition-all hover:-translate-y-0.5 sm:px-8 sm:text-base"
            >
              <WhatsAppIcon size={19} />
              Request Bulk Price List on WhatsApp
            </a>
          </motion.div>
        </motion.div>

        {/* ---------- Kinetic typography ---------- */}
        <div className="pointer-events-none absolute inset-0 z-20 text-white">
          {/* Stage 1 */}
          <Kinetic show={stage === 0 && local > 0.62} from="scale" className="absolute top-[150px] left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center whitespace-nowrap">
              <div className="flex gap-1 text-white">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} />)}
              </div>
              <div className="mt-1.5 flex items-center gap-3 rounded-full border border-white/70 bg-white/15 py-1.5 pr-4 pl-2 backdrop-blur-md">
                <Shield size={30} strokeWidth={1.6} />
                <span className="font-display text-[11px] leading-tight font-extrabold tracking-[0.12em] uppercase sm:text-xs">
                  Trusted Wholesale Quality
                  <br />
                  <span className="font-semibold text-white/80">Since 2010</span>
                </span>
              </div>
            </div>
          </Kinetic>
          <Kinetic show={stage === 0 && local > 0.12} from="left" className="absolute bottom-[5%] left-[6%] max-w-[42%] lg:top-[38%] lg:bottom-auto lg:left-[7%] lg:max-w-[300px]">
            <span className="text-terra font-display text-[10px] font-bold tracking-[0.25em] uppercase sm:text-xs">01 — Core</span>
            <div className="font-display mt-2 text-[22px] leading-[0.95] font-extrabold drop-shadow-lg sm:text-4xl lg:text-[52px]">100% High-Density Core</div>
          </Kinetic>
          <Kinetic show={stage === 0 && local > 0.38} from="right" className="absolute right-[6%] bottom-[5%] max-w-[42%] text-right lg:top-[54%] lg:right-[7%] lg:bottom-auto lg:max-w-[320px]">
            <span className="text-terra font-display text-[10px] font-bold tracking-[0.25em] uppercase sm:text-xs">02 — Protection</span>
            <div className="font-display mt-2 text-[22px] leading-[0.95] font-extrabold drop-shadow-lg sm:text-4xl lg:text-[52px]">Termite & Borer Resistant</div>
          </Kinetic>

          {/* Stage 2 */}
          <Kinetic show={stage === 1 && local > 0.3} from="up" className="absolute inset-x-0 top-[160px] text-center">
            <div className="font-display text-outline text-[11vw] leading-none font-extrabold tracking-[-0.03em] lg:text-[8.5vw]">
              <Split text="ZERO MOISTURE DAMAGE" />
            </div>
          </Kinetic>
          <Kinetic show={stage === 1 && local > 0.5} from="up" className="absolute inset-x-0 bottom-[11%] px-5 text-center">
            <div className="font-display text-[26px] leading-none font-extrabold tracking-tight drop-shadow-xl sm:text-5xl lg:text-6xl">
              Built for Extreme Durability
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {['HDMR · Moisture Resistant', 'Boilo · Boiling Water Resistant'].map((c) => (
                <span key={c} className="rounded-full border border-white/40 bg-white/10 px-3.5 py-1.5 text-[11.5px] font-semibold tracking-wide backdrop-blur-md sm:text-[13px]">
                  {c}
                </span>
              ))}
            </div>
          </Kinetic>

          {/* Stage 3 */}
          <Kinetic show={stage === 2 && local > 0.32} from="left" className="absolute bottom-[8%] left-[6%] lg:bottom-[12%] lg:left-[7%]">
            <div className="font-display text-[34px] leading-[0.92] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              Transform
              <br />
              <span className="font-medium">Your Space</span>
            </div>
          </Kinetic>
          <Kinetic show={stage === 2 && local > 0.6} from="up" className="absolute top-[160px] left-[6%] max-w-[78%] lg:top-[auto] lg:right-[calc(5%+380px)] lg:bottom-[38%] lg:left-auto lg:max-w-[360px] lg:text-right">
            <div className="bg-terra inline-block rounded-md px-2 py-0.5 text-[10px] font-bold tracking-[0.2em] uppercase">Precision Joinery</div>
            <div className="font-display mt-2 text-[22px] leading-[1] font-extrabold drop-shadow-lg sm:text-[34px]">Superior Screw & Nail Holding Capacity</div>
          </Kinetic>
          {stage === 2 && (
            <svg className="absolute top-[30%] right-[calc(5%+min(46vw,360px)-40px)] hidden h-[160px] w-[180px] lg:block" viewBox="0 0 180 160" fill="none" aria-hidden="true">
              <motion.path d="M10 140 C 40 60, 110 40, 165 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: arrow }} />
              <motion.path d="M150 20 L167 30 L152 44" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: arrow }} />
            </svg>
          )}

          {/* Stage 4 */}
          <AnimatePresence>
            {stage === 3 && local > 0.58 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-x-0 bottom-[6%] flex items-center justify-center py-6"
              >
                <motion.div
                  initial={{ x: '-8%' }}
                  animate={{ x: '-20%' }}
                  transition={{ duration: 6, ease: 'linear' }}
                  className="font-display text-outline absolute top-1/2 left-0 flex -translate-y-1/2 gap-8 text-[14vw] leading-[1.1] font-extrabold whitespace-nowrap opacity-40 lg:text-[9vw]"
                >
                  <span>BUILT TO LAST!</span>
                  <span>BUILT TO LAST!</span>
                  <span>BUILT TO LAST!</span>
                </motion.div>
                <div className="relative flex flex-col items-center text-center drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]">
                  <motion.span initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease }} className="font-display text-[7vw] leading-[1.15] font-medium tracking-tight lg:text-[3.6vw]">
                    BUILT TO
                  </motion.span>
                  <motion.span initial={{ scale: 1.6, opacity: 0, filter: 'blur(12px)' }} animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.7, delay: 0.15, ease }} className="font-display pb-[0.06em] text-[13vw] leading-[1.05] font-extrabold tracking-[-0.04em] lg:text-[7vw]">
                    LAST!
                  </motion.span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage 5 eyebrow */}
          <Kinetic show={stage === 4 && local < 0.6} from="up" className="absolute inset-x-0 bottom-[12%] px-6 text-center">
            <div className="font-display text-[26px] leading-tight font-extrabold sm:text-5xl">Engineered to Spec.</div>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/75 sm:text-base">Termite protection, water resistance, structural strength and responsibly sourced timber — in every sheet.</p>
          </Kinetic>
        </div>

        {/* ---------- HUD: stage pills ---------- */}
        <div className="absolute inset-x-0 top-[84px] z-30 flex flex-col items-center gap-3 px-4">
          <div className="flex items-center gap-1 rounded-full border border-white/15 bg-black/35 p-1 backdrop-blur-xl">
            {STAGES.map((s, i) => (
              <button
                key={s.short}
                onClick={() => jump(i)}
                aria-label={`Go to stage ${i + 1}: ${s.title}`}
                aria-current={stage === i ? 'step' : undefined}
                className={`font-display relative h-8 rounded-full px-2.5 text-[11px] font-bold tracking-wide transition-colors sm:h-9 sm:px-4 sm:text-[12.5px] ${
                  stage === i ? 'text-ink' : 'text-white/70 hover:text-white'
                }`}
              >
                {stage === i && (
                  <motion.span layoutId="story-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">
                  <span className="hidden sm:inline">0{i + 1} </span>
                  {s.short}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-30 h-[3px] bg-white/10">
          <motion.div style={{ scaleX: barScale }} className="bg-terra h-full origin-left" />
        </div>
        {stage === 0 && local < 0.1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-center text-[11px] font-semibold tracking-[0.25em] text-white/80 uppercase">
            Scroll to explore
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="mx-auto mt-2 h-8 w-px bg-white/70" />
          </motion.div>
        )}
      </div>
    </section>
  )
}
