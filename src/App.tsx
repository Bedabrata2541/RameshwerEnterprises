import { useEffect, useRef, useState } from 'react'
import { SmoothScroll, useScrollTo } from '@/lib/smooth'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Distributors } from '@/components/Distributors'
import { Products } from '@/components/Products'
import { Story } from '@/components/Story'
import { Applications } from '@/components/Applications'
import { WhyUs } from '@/components/WhyUs'
import { Contact } from '@/components/Contact'
import { ProductsPage } from '@/components/ProductsPage'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { ContactChooser } from '@/components/ContactChooser'

// Hash routes: "#/products" and "#/products/<id>" show the catalogue page; anything else is home.
function parse(hash: string) {
  const m = hash.match(/^#\/products(?:\/([\w-]+))?/)
  if (m) return { page: 'products' as const, id: m[1] }
  const g = hash.match(/^#\/go\/([\w-]+)/)
  return { page: 'home' as const, id: g?.[1] }
}

function Routes() {
  const [route, setRoute] = useState(() => parse(window.location.hash))
  const prev = useRef(route.page)
  const scrollTo = useScrollTo()

  useEffect(() => {
    const on = () => setRoute(parse(window.location.hash))
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  useEffect(() => {
    const from = prev.current
    prev.current = route.page
    requestAnimationFrame(() => {
      if (route.page === 'products') {
        if (route.id) scrollTo(`#cat-${route.id}`, { offset: -140, immediate: true })
        else scrollTo(0, { immediate: true })
      } else if (route.id) {
        scrollTo(route.id === 'home' ? 0 : `#${route.id}`, { immediate: true })
      } else if (from === 'products') {
        scrollTo('#products', { immediate: true })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.page, route.id])

  if (route.page === 'products') return <ProductsPage key="products" focus={route.id} />
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Distributors />
        <Products />
        <Story />
        <Applications />
        <WhyUs />
        <Contact />
      </main>
    </>
  )
}

export default function App() {
  return (
    <SmoothScroll>
      <Routes />
      <FloatingWhatsApp />
      <ContactChooser />
    </SmoothScroll>
  )
}
