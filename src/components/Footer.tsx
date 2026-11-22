import { DEFAULT_WA_URL, NAV, PHONE_DISPLAY } from '@/lib/site'
import { useScrollTo } from '@/lib/smooth'
import { Logo } from './Logo'
import { WhatsAppIcon } from './Icons'

export function Footer() {
  const scrollTo = useScrollTo()
  return (
  <footer className="bg-ink text-white/70">
    <div className="mx-auto max-w-[1320px] px-5 pt-14 pb-28 sm:px-8 sm:pb-14">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm">
          <Logo light />
          <p className="mt-5 text-[14px] leading-relaxed">
            Authorized distributor and wholesaler of Plywood, MDF, HDMR, Prelaminated, Boilo, Particle and Finger
            Joint Rubber Boards, Laminates and Veneers. Nangloi, New Delhi · Since 2010.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 text-[14px] font-medium sm:grid-cols-3">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => {
                e.preventDefault()
                // On the catalogue page, go home first, then scroll to the section.
                if (window.location.hash.startsWith('#/products')) window.location.hash = `#/go/${n.id}`
                else scrollTo(n.id === 'home' ? 0 : `#${n.id}`)
              }}
              className="hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={DEFAULT_WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-terra hover:bg-terra-dark font-display inline-flex h-12 items-center gap-2 self-start rounded-xl px-5 text-[14px] font-bold text-white transition-colors"
        >
          <WhatsAppIcon size={17} /> {PHONE_DISPLAY}
        </a>
      </div>
      <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-[12.5px] sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Rameshwer Enterprises. All rights reserved.</span>
      </div>
    </div>
  </footer>
  )
}
