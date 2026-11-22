import type { ReactNode } from 'react'
import { WhatsAppIcon } from './Icons'

export function WaButton({
  href,
  children,
  size = 'lg',
  className = '',
  icon = true,
}: {
  href: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: boolean
}) {
  const s =
    size === 'sm'
      ? 'h-10 px-4 text-[13px] rounded-full gap-2'
      : size === 'md'
        ? 'h-11 px-5 text-sm rounded-xl gap-2'
        : 'h-14 px-7 text-[15px] sm:text-base rounded-xl gap-2.5'
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group bg-terra hover:bg-terra-dark font-display inline-flex items-center justify-center font-bold whitespace-nowrap text-white shadow-[0_10px_24px_-10px_rgba(200,90,23,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-12px_rgba(166,70,13,0.8)] focus-visible:ring-2 focus-visible:ring-terra focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-0 ${s} ${className}`}
    >
      {icon && <WhatsAppIcon size={size === 'lg' ? 19 : 16} className="opacity-95" />}
      {children}
    </a>
  )
}

export function OutlineButton({
  onClick,
  children,
  className = '',
}: {
  onClick?: () => void
  children: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group bg-cream border-border-walnut text-btn-walnut font-display inline-flex h-14 items-center justify-center gap-2 rounded-xl border-[1.5px] px-7 text-[15px] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:ring-2 focus-visible:ring-border-walnut focus-visible:ring-offset-2 focus-visible:outline-none sm:text-base ${className}`}
    >
      {children}
    </button>
  )
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase ${
        dark ? 'border-white/20 bg-white/5 text-white/80' : 'border-hair bg-sand/80 text-walnut'
      }`}
    >
      <span className="bg-terra size-1.5 rounded-full" />
      {children}
    </span>
  )
}
