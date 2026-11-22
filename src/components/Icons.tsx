import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }

function Base({ size = 24, children, ...rest }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const WhatsAppIcon = ({ size = 20, ...rest }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.35-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.24-9.43 9.44-9.43 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.28l5.68-1.49a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.34-11.34 0-3.03-1.18-5.88-3.32-8.02" />
  </svg>
)

export const ArrowRight = (p: P) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
)
export const ArrowDown = (p: P) => (
  <Base {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </Base>
)
export const Shield = (p: P) => (
  <Base {...p}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.4 7.5 9.5 4.4-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />
    <path d="m8.8 12.2 2.2 2.2 4.3-4.6" />
  </Base>
)
export const Bug = (p: P) => (
  <Base {...p}>
    <rect x="8" y="7" width="8" height="12" rx="4" />
    <path d="M12 7V5M9.5 4.5 10.5 6M14.5 4.5 13.5 6M8 11H4.5M8 15H5M16 11h3.5M16 15h3M12 11v8" />
    <path d="M3 21 21 3" />
  </Base>
)
export const Wave = (p: P) => (
  <Base {...p}>
    <path d="M12 3s5 5.4 5 9a5 5 0 0 1-10 0c0-3.6 5-9 5-9Z" />
    <path d="M3 20c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1" />
  </Base>
)
export const Load = (p: P) => (
  <Base {...p}>
    <path d="M3 17h18M5 17v3M19 17v3M7 13h10l-1.5-4h-7L7 13Z" />
    <path d="M12 3v6M9.5 6.5 12 9l2.5-2.5" />
  </Base>
)
export const Leaf = (p: P) => (
  <Base {...p}>
    <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" />
    <path d="M5 19c3-4 6-7 10-9" />
  </Base>
)
export const Star = ({ size = 14, ...rest }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
    <path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9L12 2.8Z" />
  </svg>
)
export const Sofa = (p: P) => (
  <Base {...p}>
    <path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" />
    <path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v4H3v-4ZM5 17v2M19 17v2" />
  </Base>
)
export const Compass = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="5" r="2" />
    <path d="M11 6.8 5 21M13 6.8 19 21M7.5 15h9" />
  </Base>
)
export const Building = (p: P) => (
  <Base {...p}>
    <path d="M4 21V5l8-2v18M12 8h8v13M3 21h18" />
    <path d="M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2" />
  </Base>
)
export const Booth = (p: P) => (
  <Base {...p}>
    <path d="M3 4h18v4H3zM5 8v12M19 8v12M9 20v-6h6v6M3 20h18" />
  </Base>
)
export const Gift = (p: P) => (
  <Base {...p}>
    <rect x="3.5" y="8" width="17" height="4" rx="1" />
    <path d="M5 12v8h14v-8M12 8v12M12 8S10.5 4 8 4.5 7 8 12 8ZM12 8s1.5-4 4-3.5S17 8 12 8Z" />
  </Base>
)
export const Layers = (p: P) => (
  <Base {...p}>
    <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
    <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
  </Base>
)
export const Tag = (p: P) => (
  <Base {...p}>
    <path d="M3 12V4h8l10 10-8 8L3 12Z" />
    <circle cx="7.5" cy="8.5" r="1.3" />
  </Base>
)
export const Truck = (p: P) => (
  <Base {...p}>
    <path d="M2 6h12v10H2zM14 9h4l3 3.5V16h-7" />
    <circle cx="6" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </Base>
)
export const Badge = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="9" r="6" />
    <path d="m9 14.5-1.5 6.5L12 19l4.5 2-1.5-6.5" />
    <path d="m9.6 9 1.6 1.6L14.6 7.4" />
  </Base>
)
export const Phone = (p: P) => (
  <Base {...p}>
    <path d="M5 3h3.5l1.5 5-2.2 1.4a11 11 0 0 0 6.8 6.8L16 14l5 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
  </Base>
)
export const MapPin = (p: P) => (
  <Base {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Base>
)
export const Globe = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
  </Base>
)
export const User = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6" />
  </Base>
)
export const Ruler = (p: P) => (
  <Base {...p}>
    <path d="M3 16 16 3l5 5L8 21l-5-5Z" />
    <path d="m7 12 2 2M10 9l2 2M13 6l2 2" />
  </Base>
)
export const Check = (p: P) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Base>
)
export const Menu = (p: P) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
)
export const Close = (p: P) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
)
export const Chevron = (p: P) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
)
