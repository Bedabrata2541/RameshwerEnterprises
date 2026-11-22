import { motion } from 'motion/react'
import { DEFAULT_WA_URL } from '@/lib/site'
import { WhatsAppIcon } from './Icons'

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={DEFAULT_WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Rameshwer Enterprises on WhatsApp"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="bg-ink group fixed right-4 bottom-4 z-[60] flex items-center gap-3 rounded-full border border-white/10 py-2 pr-2 pl-2 text-white shadow-[0_18px_40px_-14px_rgba(29,20,70,0.85)] transition-transform hover:-translate-y-0.5 sm:right-6 sm:bottom-6 sm:pr-5"
    >
      <span className="relative grid size-11 place-items-center rounded-full bg-[#25D366]/15">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/25 [animation-duration:2.4s]" />
        <WhatsAppIcon size={24} className="relative text-[#25D366]" />
      </span>
      <span className="font-display hidden text-[13.5px] font-bold sm:block">Chat with Rameshwer Enterprises</span>
    </motion.a>
  )
}
