import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CALLBACK_SHEET_URL, wa } from '@/lib/site'
import { Check, Phone, User } from './Icons'

type Status = 'idle' | 'sending' | 'done' | 'error'

function normalizePhone(v: string) {
  const d = v.replace(/\D/g, '')
  if (d.length === 12 && d.startsWith('91')) return d.slice(2)
  if (d.length === 11 && d.startsWith('0')) return d.slice(1)
  return d
}

export function Callback() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [trap, setTrap] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const n = name.trim()
    const p = normalizePhone(phone)
    if (n.length < 2) return setError('Please enter your name.')
    if (!/^[6-9]\d{9}$/.test(p)) return setError('Please enter a valid 10-digit mobile number.')
    setError('')
    if (trap) return setStatus('done')

    if (!CALLBACK_SHEET_URL) {
      // Sheet not connected yet: route the request through WhatsApp so no lead is lost.
      window.open(
        wa(`Hello Rameshwer Enterprises, please call me back.\n\nName: ${n}\nPhone: +91 ${p}`),
        '_blank',
        'noopener,noreferrer',
      )
      setStatus('done')
      return
    }

    setStatus('sending')
    try {
      await fetch(CALLBACK_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams({
          name: n,
          phone: `+91 ${p}`,
          source: 'Website – Request a Callback',
          page: window.location.href,
        }),
      })
      setStatus('done')
    } catch {
      setStatus('error')
      setError('Could not send right now. Please call or WhatsApp us directly.')
    }
  }

  return (
    <div id="callback" className="border-hair relative mt-10 scroll-mt-28 overflow-hidden rounded-2xl border bg-cream/80 p-6 sm:p-8 lg:flex lg:items-center lg:gap-10">
      <div className="flex shrink-0 items-center gap-3">
        <span className="bg-ink grid size-10 shrink-0 place-items-center rounded-full text-white">
          <Phone size={18} />
        </span>
        <div>
          <h3 className="text-[19px] leading-tight font-extrabold">Request a Callback</h3>
          <p className="text-walnut text-[13.5px]">Our sales team will call you with wholesale rates.</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === 'done' ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 flex flex-1 items-start gap-3 rounded-xl lg:mt-0 bg-[#25D366]/10 p-4"
            role="status"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#1f9d55] text-white">
              <Check size={16} />
            </span>
            <div>
              <div className="font-display text-ink font-bold">Thank you, {name.trim().split(' ')[0]}!</div>
              <p className="text-walnut mt-0.5 text-[13.5px]">
                Your request has been received. We’ll call you shortly on +91 {normalizePhone(phone)}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setName('')
                  setPhone('')
                  setStatus('idle')
                }}
                className="text-terra mt-2 text-[13px] font-semibold hover:underline"
              >
                Submit another request
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 grid flex-1 gap-3 sm:grid-cols-2 lg:mt-0 lg:grid-cols-[minmax(240px,1.2fr)_minmax(220px,1fr)_auto]">
            <label className="relative">
              <span className="sr-only">Your name</span>
              <User size={17} className="text-walnut pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                id="callback-name"
                autoComplete="name"
                maxLength={80}
                className="border-hair text-ink placeholder:text-walnut/70 focus:border-terra h-12 w-full rounded-xl border bg-white pr-3 pl-10 text-[15px] outline-none"
              />
            </label>
            <label className="relative">
              <span className="sr-only">Mobile number</span>
              <span className="text-walnut pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[14px] font-semibold">+91</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Mobile number"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={14}
                className="border-hair text-ink placeholder:text-walnut/70 focus:border-terra h-12 w-full rounded-xl border bg-white pr-3 pl-12 text-[15px] outline-none"
              />
            </label>
            {/* honeypot */}
            <input value={trap} onChange={(e) => setTrap(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-ink hover:bg-indigo font-display h-12 rounded-xl px-5 text-[14px] font-bold whitespace-nowrap text-white transition-colors disabled:opacity-60 sm:col-span-2 lg:col-span-1"
            >
              {status === 'sending' ? 'Sending…' : 'Call Me Back'}
            </button>
            {error && (
              <p className="text-terra-dark text-[13px] font-medium sm:col-span-2 lg:col-span-3" role="alert">
                {error}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
