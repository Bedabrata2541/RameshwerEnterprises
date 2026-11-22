import { motion } from 'motion/react'
import { Counter } from './Counter'
import { Badge, Layers, Tag, Truck } from './Icons'

const ease = [0.22, 1, 0.36, 1] as const

const PILLARS = [
  { I: Badge, t: 'Authorized Distributors of Top Brands', d: '100% genuine Greenpanel, Action Tesa, Centuryply, Greenply, Crossbond, Bhutan Tuff & Archidply stock.' },
  { I: Layers, t: 'Complete Range Under One Roof', d: 'Plywood, MDF, HDMR, Prelaminated, Boilo, Particle & Rubber Boards, Laminates and Veneers in 8×4, 8×6, 10×4.' },
  { I: Tag, t: 'Direct Wholesale Pricing & Bulk Readiness', d: 'Competitive trade rates for dealers, contractors & OEMs.' },
  { I: Truck, t: 'On-Time Dispatch & 15+ Years Legacy', d: 'Reliable logistics from Nangloi, New Delhi since 2010.' },
]

export function WhyUs() {
  return (
    <section id="why-us" className="border-hair relative overflow-hidden border-t bg-[#F8F2EB] py-16 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <span className="text-terra text-[12px] font-bold tracking-[0.2em] uppercase">Why Choose Us</span>
            <h2 className="mt-3 text-[34px] leading-[1.05] font-extrabold sm:text-5xl">
              Why Choose Rameshwer Enterprises
            </h2>
            <p className="text-walnut mt-5 max-w-md text-[16px] leading-relaxed">
              Dealers, contractors and manufacturers rely on us for genuine branded stock, consistent trade pricing and
              dispatch that keeps their site on schedule.
            </p>
            <dl className="border-hair mt-8 grid grid-cols-3 gap-4 border-t pt-6">
              {[
                { to: 2010, from: 1990, s: '', l: 'Established' },
                { to: 15, s: '+', l: 'Years as distributor & wholesaler' },
                { to: 50, s: '+', l: 'Product categories' },
              ].map(({ to, from, s, l }, i) => (
                <div key={l} className={i > 0 ? 'border-hair border-l pl-4 sm:pl-5' : ''}>
                  <dt className="font-display text-ink text-3xl leading-none font-extrabold sm:text-4xl">
                    <Counter to={to} from={from} suffix={s} delay={i * 0.15} />
                  </dt>
                  <dd className="text-walnut mt-2 text-[12.5px] leading-snug font-medium">{l}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
            {PILLARS.map(({ I, t, d }, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease }}
                className={`group border-hair bg-sand relative overflow-hidden flex h-full flex-col rounded-2xl border p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-34px_rgba(29,20,70,0.45)] sm:p-8 `}
              >
                <span className="font-display text-ink/[0.06] absolute -top-4 right-3 text-[110px] leading-none font-extrabold">
                  0{i + 1}
                </span>
                <span className="bg-ink grid size-12 place-items-center rounded-xl text-white transition-colors duration-300 group-hover:bg-terra">
                  <I size={24} />
                </span>
                <h3 className="mt-6 text-[20px] leading-snug font-extrabold">{t}</h3>
                <p className="text-walnut mt-2.5 text-[15px] leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
