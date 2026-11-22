import { motion } from 'motion/react'
import office from '@/assets/img/app-office.jpg'
import architects from '@/assets/img/app-architects.jpg'
import builders from '@/assets/img/app-builders.jpg'
import events from '@/assets/img/app-events.jpg'
import crafting from '@/assets/img/app-crafting.jpg'
import { wa } from '@/lib/site'
import { ArrowRight, Booth, Building, Compass, Gift, Sofa } from './Icons'

const ease = [0.22, 1, 0.36, 1] as const

const APPS = [
  { t: 'Office & Residential Furniture', d: 'Modular kitchens, wardrobes, workstations', img: office, I: Sofa },
  { t: 'Architects & Interior Projects', d: 'Wall paneling, false ceilings, bespoke joinery', img: architects, I: Compass },
  { t: 'Builders & Commercial Contractors', d: 'Bulk project supply, doors, partitions', img: builders, I: Building },
  { t: 'Event Setups & Exhibition Displays', d: 'Modular booths, stage backdrops, retail kiosks', img: events, I: Booth },
  { t: 'Packaging & Precision Crafting', d: 'Mandirs, gift boxes, trophies, speaker boxes, CNC cutting', img: crafting, I: Gift },
]

export function Applications() {
  return (
    <section id="applications" className="wood-grain relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"
        >
          <div>
            <span className="text-terra text-[12px] font-bold tracking-[0.2em] uppercase">Applications & Industries Served</span>
            <h2 className="mt-3 text-[30px] leading-[1.1] font-extrabold sm:text-[40px] lg:text-[min(3vw,40px)] lg:whitespace-nowrap">
              One supplier for every project that’s built on boards.
            </h2>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {APPS.map(({ t, d, img, I }, i) => (
            <motion.a
              key={t}
              href={wa(`Hello Rameshwer Enterprises, I need boards for ${t.toLowerCase()} (${d.toLowerCase()}). Please share suitable options and wholesale rates.`)}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease }}
              className={`group border-hair relative flex flex-col overflow-hidden rounded-2xl border bg-cream transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(59,46,38,0.5)] ${
                i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'
              } ${i === 4 ? 'sm:col-span-2 lg:col-span-2' : ''}`}
            >
              <div className={`relative overflow-hidden ${i < 2 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                <img src={img} alt={t} loading="lazy" className="size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="text-ink absolute top-4 left-4 grid size-11 place-items-center rounded-full bg-cream/95 shadow-md backdrop-blur">
                  <I size={22} />
                </span>
              </div>
              <div className="flex flex-1 items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <h3 className="text-[18px] leading-snug font-bold sm:text-xl">{t}</h3>
                  <p className="text-walnut mt-1.5 text-[14px] leading-relaxed">{d}</p>
                </div>
                <span className="border-hair text-terra group-hover:bg-terra grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-300 group-hover:border-transparent group-hover:text-white">
                  <ArrowRight size={18} className="transition-transform group-hover:-rotate-45" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
