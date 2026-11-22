import greenpanel from '@/assets/brands/greenpanel.png'
import actionTesa from '@/assets/brands/action-tesa.png'
import centuryply from '@/assets/brands/centuryply.png'
import greenply from '@/assets/brands/greenply.png'
import crossbond from '@/assets/brands/crossbond.jpg'
import bhutanTuff from '@/assets/brands/bhutan-tuff.jpg'
import archidply from '@/assets/brands/archidply.png'

type Brand = { name: string; src: string; className: string; label?: string }

// Heights are tuned per logo so each mark reads at a similar visual weight.
const BRANDS: Brand[] = [
  { name: 'Greenpanel', src: greenpanel, className: 'h-8 sm:h-9' },
  { name: 'Action Tesa', src: actionTesa, className: 'h-10 sm:h-12' },
  { name: 'Centuryply', src: centuryply, className: 'h-10 sm:h-12' },
  { name: 'Greenply', src: greenply, className: 'h-12 sm:h-14' },
  { name: 'Crossbond', src: crossbond, className: 'h-12 sm:h-14' },
  { name: 'Bhutan Tuff', src: bhutanTuff, className: 'h-10 sm:h-12', label: 'BHUTAN TUFF' },
  { name: 'Archidply', src: archidply, className: 'h-9 sm:h-11 rounded-[3px]' },
]

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {BRANDS.map((b) => (
        <li
          key={b.name}
          className="flex shrink-0 items-center gap-2.5 px-7 transition-transform duration-300 hover:-translate-y-1 sm:px-10"
        >
          <img
            src={b.src}
            alt={hidden ? '' : `${b.name} logo`}
            draggable={false}
            className={`w-auto object-contain mix-blend-multiply select-none ${b.className}`}
          />
          {b.label && (
            <span className="font-display text-ink text-[15px] font-extrabold tracking-[0.08em] whitespace-nowrap sm:text-[17px]">
              {b.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

export function Distributors() {
  return (
    <section aria-label="Authorized distributors" className="border-hair bg-sand relative border-y">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-5 py-7 lg:flex-row lg:items-center lg:gap-8 lg:px-8">
        <h2 className="font-display text-ink shrink-0 px-5 text-[13px] font-extrabold tracking-[0.14em] uppercase sm:px-8 lg:w-44 lg:px-0 lg:text-[15px] lg:leading-tight">
          Authorized
          <br className="hidden lg:block" /> Distributors
        </h2>
        <div className="bg-hair hidden h-12 w-px shrink-0 lg:block" />
        <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-marquee flex w-max [animation-duration:32s] hover:[animation-play-state:paused]">
            <Row />
            <Row hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
