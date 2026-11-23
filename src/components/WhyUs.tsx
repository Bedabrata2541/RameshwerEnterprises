import { motion } from 'motion/react'
import wood from '@/assets/img/board-face.jpg'
import { Headset, Shield, Tag, Truck } from './Icons'

const ease = [0.22, 1, 0.36, 1] as const

const POINTS = [
  { I: Tag, t: 'Industry’s Lowest Pricing Available' },
  { I: Shield, t: '100% Genuine Certified Products' },
  { I: Truck, t: 'On-Time Bulk Delivery' },
  { I: Headset, t: 'Dedicated Relationship & After-Sales Service' },
]

export function WhyUs() {
  return (
    <section id="why-us" className="border-hair relative border-t bg-[#F8F2EB] py-14 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-[30px] leading-[1.08] font-extrabold sm:text-[44px]"
        >
          Why Choose Rameshwer Enterprises?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease }}
          className="relative mt-8 overflow-hidden rounded-2xl text-white shadow-[0_40px_80px_-40px_rgba(59,46,38,0.75)] sm:mt-10"
        >
          {/* Real oak grain, toned to deep walnut */}
          <img
            src={wood}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-[#2a1a10]/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-black/30" />

          <ul className="relative grid grid-cols-2 lg:grid-cols-4">
            {POINTS.map(({ I, t }, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease }}
                className={`flex min-h-[170px] flex-col justify-start gap-5 p-6 sm:min-h-[200px] sm:p-9 lg:min-h-[230px] lg:px-10 lg:py-12 ${
                  i % 2 === 1 ? 'border-l border-white/20' : ''
                } ${i >= 2 ? 'border-t border-white/20 lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/60 sm:size-14">
                  <I size={24} strokeWidth={1.4} />
                </span>
                <span className="font-display text-[16px] leading-snug font-bold sm:text-[20px]">{t}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
