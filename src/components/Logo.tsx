import logo from '@/assets/logo.jpg'

export function LogoBadge({ className = 'size-12' }: { className?: string }) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-full bg-[#C4C4C4] shadow-[0_2px_10px_rgba(43,20,120,0.18)] ring-1 ring-black/5 ${className}`}
    >
      <img src={logo} alt="Rameshwer Enterprises logo" className="size-full scale-[1.06] object-cover" />
    </span>
  )
}

export function Logo({ light = false, badge = 'size-11 sm:size-12' }: { light?: boolean; badge?: string }) {
  return (
    <span className="flex items-center gap-3">
      <LogoBadge className={badge} />
      <span
        className={`font-display text-[13px] leading-[1.05] font-extrabold tracking-[0.02em] uppercase sm:text-[15px] ${light ? 'text-white' : 'text-ink'}`}
      >
        Rameshwer
        <br />
        Enterprises
      </span>
    </span>
  )
}
