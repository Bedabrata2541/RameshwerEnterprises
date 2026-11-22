import { useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import {
  ADDRESS,
  PHONE_DISPLAY,
  PHONE_E164,
  PRODUCTS,
  QUANTITIES,
  SIZES,
  WEBSITE,
  wa,
} from '@/lib/site'
import { Callback } from './Callback'
import { Footer } from './Footer'
import { Chevron, Globe, MapPin, Phone, User, WhatsAppIcon } from './Icons'

const ease = [0.22, 1, 0.36, 1] as const

function Select({
  label,
  value,
  onChange,
  options,
  id,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: readonly string[]
  id: string
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="text-[11px] font-semibold tracking-[0.18em] text-white/60 uppercase">{label}</span>
      <span className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-display focus:border-terra h-14 w-full appearance-none rounded-xl border border-white/15 bg-white/[0.06] pr-10 pl-4 text-[15px] font-semibold text-white transition-colors outline-none hover:border-white/30"
        >
          {options.map((o) => (
            <option key={o} value={o} className="text-ink">
              {o}
            </option>
          ))}
        </select>
        <Chevron size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-white/60" />
      </span>
    </label>
  )
}

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 gap-3 sm:gap-4">
      <span className="border-hair text-terra grid size-11 shrink-0 place-items-center rounded-full border bg-cream">{icon}</span>
      <div className="min-w-0">
        <div className="text-walnut text-[11px] font-semibold tracking-[0.18em] uppercase">{label}</div>
        <div className="font-display text-ink mt-1 text-[15px] font-bold break-words [overflow-wrap:anywhere] sm:text-[16px]">{children}</div>
      </div>
    </div>
  )
}

export function Contact() {
  const boardNames = PRODUCTS.map((p) => p.name)
  const [board, setBoard] = useState(boardNames[0])
  const [size, setSize] = useState<string>(SIZES[0])
  const [qty, setQty] = useState<string>(QUANTITIES[0])

  const message = [
    'Hello Rameshwer Enterprises,',
    '',
    'I would like a wholesale quotation for:',
    `• Board Type: ${board}`,
    `• Sheet Size: ${size}`,
    `• Estimated Quantity: ${qty}`,
    '',
    'Please share your best trade rates and stock availability. Thank you.',
  ].join('\n')

  return (
    <section id="contact" className="relative">
      {/* Quote builder */}
      <div className="wood-grain py-20 sm:py-28">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease }}
            className="bg-ink relative overflow-hidden rounded-[28px] p-6 text-white shadow-[0_50px_100px_-50px_rgba(29,20,70,0.8)] sm:p-10 lg:p-14"
          >
            <div className="bg-sky/25 pointer-events-none absolute -top-40 -right-32 size-[420px] rounded-full blur-[100px]" />
            <div className="bg-terra/25 pointer-events-none absolute -bottom-48 -left-24 size-[420px] rounded-full blur-[110px]" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-white/80 uppercase">
                  <span className="size-1.5 rounded-full bg-[#25D366]" /> Instant WhatsApp Quote
                </span>
                <h2 className="mt-5 text-[32px] leading-[1.05] font-extrabold !text-white sm:text-5xl">
                  Build your wholesale quote in 10 seconds.
                </h2>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/70">
                  Pick your board, sheet size and quantity. We’ll open WhatsApp with a ready-to-send inquiry for
                  Rameshwer Enterprises.
                </p>
              </div>

              <div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Select id="q-board" label="Board Type" value={board} onChange={setBoard} options={boardNames} />
                  <Select id="q-size" label="Sheet Size" value={size} onChange={setSize} options={SIZES} />
                  <Select id="q-qty" label="Estimated Quantity" value={qty} onChange={setQty} options={QUANTITIES} />
                </div>

                <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-[10.5px] font-semibold tracking-[0.2em] text-white/50 uppercase">Message preview</div>
                  <pre className="mt-2 font-sans text-[13.5px] leading-relaxed whitespace-pre-wrap text-white/85">{message}</pre>
                </div>

                <a
                  href={wa(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-terra hover:bg-terra-dark font-display mt-5 flex h-14 w-full items-center justify-center gap-2.5 rounded-xl px-5 text-[15px] font-bold text-white shadow-[0_14px_30px_-12px_rgba(200,90,23,0.9)] transition-all hover:-translate-y-0.5 sm:text-base"
                >
                  <WhatsAppIcon size={19} />
                  Send Wholesale Inquiry on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          {/* Company details */}
          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="text-terra text-[12px] font-bold tracking-[0.2em] uppercase">Contact & Showroom</span>
              <h2 className="mt-3 text-[32px] leading-[1.05] font-extrabold sm:text-[44px]">Visit our Nangloi outlet or message us directly.</h2>
              <div className="border-hair bg-sand mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold text-walnut">
                <span className="bg-ink grid size-6 place-items-center rounded-full text-[9px] font-black text-white">BNI</span>
                Proud BNI Member
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="border-hair grid min-w-0 gap-6 rounded-2xl border bg-cream/70 p-5 sm:grid-cols-2 sm:gap-7 sm:p-9"
            >
              <Detail icon={<User size={20} />} label="Rameshwer Enterprises">
                Prop. Ramesh Kedia
              </Detail>
              <Detail icon={<MapPin size={20} />} label="Outlet Address">
                {ADDRESS}
              </Detail>
              <Detail icon={<Phone size={20} />} label="Phone / WhatsApp">
                <a href={`tel:+${PHONE_E164}`} className="hover:text-terra transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </Detail>
              <Detail icon={<Globe size={20} />} label="Official Website">
                <a href={`https://${WEBSITE}`} target="_blank" rel="noopener noreferrer" className="hover:text-terra transition-colors">
                  {WEBSITE}
                </a>
              </Detail>
            </motion.div>
          </div>
          <Callback />
        </div>
      </div>

      <Footer />
    </section>
  )
}
