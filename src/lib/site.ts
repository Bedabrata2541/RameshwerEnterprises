import mdfRaw from '@/assets/img/mdf-raw.jpg'
import mdfInt from '@/assets/img/mdf-int.jpg'
import hdmrRaw from '@/assets/img/hdmr-raw.jpg'
import hdmrInt from '@/assets/img/hdmr-int.jpg'
import prelamRaw from '@/assets/img/hero-prelam.jpg'
import prelamInt from '@/assets/img/prelam-int.jpg'
import boiloRaw from '@/assets/img/boilo-raw.jpg'
import boiloInt from '@/assets/img/boilo-int.jpg'
import particleRaw from '@/assets/img/particle-raw.jpg'
import particleInt from '@/assets/img/particle-int.jpg'
import rubberRaw from '@/assets/img/rubber-raw.jpg'
import rubberInt from '@/assets/img/rubber-int.jpg'
import plywoodRaw from '@/assets/img/plywood-raw.jpg'
import plywoodInt from '@/assets/img/plywood-int.jpg'
import laminateRaw from '@/assets/img/laminate-raw.jpg'
import laminateInt from '@/assets/img/laminate-int.jpg'
import veneerRaw from '@/assets/img/veneer-raw.jpg'
import veneerInt from '@/assets/img/veneer-int.jpg'

export const COMPANY = 'Rameshwer Enterprises'
export const PHONE_E164 = '919310018074'
export const PHONE_DISPLAY = '+91 93100 18074'
export const WEBSITE = 'www.rameshwerenterprises.in'
export const ADDRESS = 'Nangloi, New Delhi, India'

// Google Apps Script Web App URL that appends callback requests to the Google Sheet.
// See google-apps-script/callback.gs for setup. Leave empty to fall back to WhatsApp.
export const CALLBACK_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbyOGVWulmlhku4sTPFHOWvKecs5JEYbNISokiZIZ075bweveiQ73rF01QRVHTixgYlzQA/exec'

export const DEFAULT_WA_URL =
  'https://wa.me/919310018074?text=Hello%20Rameshwer%20Enterprises%2C%20I%20would%20like%20to%20inquire%20about%20wholesale%20board%20rates.'

export function wa(text: string) {
  return `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(text)}`
}

export const MSG = {
  rates:
    'Hello Rameshwer Enterprises, I would like to get your latest wholesale rates for Plywood, MDF, HDMR, Prelaminated, Boilo, Particle & Finger Joint Rubber Boards, Laminates and Veneers.',
  priceList:
    'Hello Rameshwer Enterprises, please share your bulk price list for Plywood, MDF, HDMR, Laminates & Specialty Boards with available sizes (8×4, 8×6, 10×4 ft).',
}

export const SIZES = ['8 × 4 ft', '8 × 6 ft', '10 × 4 ft'] as const
export type Size = (typeof SIZES)[number]

export const QUANTITIES = ['10–50 Sheets', '50–200 Sheets', '200+ Bulk Lot'] as const

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'products', label: 'Products' },
  { id: 'craft', label: 'Craft & Tech' },
  { id: 'applications', label: 'Applications' },
  { id: 'why-us', label: 'Why Choose Us' },
  { id: 'contact', label: 'Contact' },
] as const

export type Product = {
  id: string
  name: string
  variant: string
  grade: string
  raw: string
  interior: string
  rawLabel: string
  interiorLabel: string
  spec: string
  fullName?: string
  note?: string
  items: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'plywood',
    name: 'Plywood',
    variant: 'Commercial & Waterproof Grades',
    grade: 'Cross-Ply Strength',
    raw: plywoodRaw,
    interior: plywoodInt,
    rawLabel: 'Layered cross-ply veneer core',
    interiorLabel: 'Built-in wardrobe & cabinetry',
    spec: 'Cross-laminated veneer layers for high strength, stability and screw holding in furniture, wardrobes & interiors.',
    items: ["BWP Plywood", "Block Board", "Doors", "FR Plywood", "Flexiply"],
    note: "Available in different thicknesses",
  },
  {
    id: 'mdf',
    name: 'MDF Board',
    variant: 'Plain & Prelaminated',
    grade: 'High-Density',
    raw: mdfRaw,
    interior: mdfInt,
    rawLabel: 'Uniform birch-oak fiber core',
    interiorLabel: 'Fluted wall paneling',
    spec: 'High internal bond strength, ultra-smooth surface for CNC routing, painting & lamination.',
    items: ["FR Grade MDF", "CARB Grade MDF", "E1 Grade MDF", "E2 Grade MDF"],
    note: "Available in different thicknesses",
  },
  {
    id: 'hdmr',
    name: 'HDMR Board',
    variant: 'Plain, Prelaminated & Imported',
    grade: 'Moisture Resistant',
    raw: hdmrRaw,
    interior: hdmrInt,
    rawLabel: 'Signature green moisture-resistant core',
    interiorLabel: 'Dark-wood lounge shelving',
    spec: 'High-density moisture-resistant core engineered for modular kitchens, wardrobes & vanities.',
    items: ["Plain HDHMR Boards", "Deep-Routing / CNC Grade HDHMR", "Calibrated HDHMR"],
    note: "Available in different thicknesses",
  },
  {
    id: 'prelam',
    name: 'Prelaminated Board',
    variant: 'Woodgrain, Matte & Textured',
    grade: 'Scratch Resistant',
    raw: prelamRaw,
    interior: prelamInt,
    rawLabel: 'Melamine-faced decor deck',
    interiorLabel: 'Wood-paneled dining room',
    spec: 'Scratch-resistant factory-laminated surfaces ready for immediate modular furniture fabrication.',
    items: ["Pre-Laminated MDF", "Pre-Laminated HDHMR", "Pre-Laminated Particle Board"],
  },
  {
    id: 'boilo',
    name: 'Boilo Board',
    variant: 'BWR & High-Density',
    grade: 'Boiling Water Resistant',
    raw: boiloRaw,
    interior: boiloInt,
    rawLabel: 'Dense heavy-duty dark core',
    interiorLabel: 'Floating bathroom vanity',
    spec: 'Boiling water resistant, fire-retardant, and fungus-proof for extreme-humidity & commercial zones.',
    items: ["Plain Boilo BWP-FR HDF Boards", "Pre-Laminated Boilo Boards", "Restroom Cubicle & Heavy-Duty Flooring Grade Boilo"],
  },
  {
    id: 'particle',
    name: 'Particle Board',
    variant: 'Plain & Prelaminated',
    grade: 'Dimensionally Stable',
    raw: particleRaw,
    interior: particleInt,
    rawLabel: 'Layered wood-chip core',
    interiorLabel: 'Double-height wood cladding',
    spec: 'Lightweight, dimensionally stable, and economical solution for office workstations & cabinetry.',
    items: ["Particle Board – Grade 1 (Exterior / Moisture Resistant)", "Plain Particle Board – Grade 2 (Interior / General Purpose)", "E1 Grade Particle Board", "E2 Grade Particle Board"],
  },
  {
    id: 'rubber',
    name: 'Finger Joint Rubber Board',
    variant: 'Solid Rubberwood',
    grade: 'Kiln-Dried Hardwood',
    raw: rubberRaw,
    interior: rubberInt,
    rawLabel: 'Interlocking finger-jointed strips',
    interiorLabel: '3D geometric accent wall',
    spec: 'Kiln-dried natural hardwood panels with exceptional screw-holding power and timeless grain.',
    items: ["AA Grade Finger-Jointed Rubberwood Boards", "AB / AC Grade Finger-Jointed Rubberwood Boards", "BWP / Marine-Bonded Finger-Joint Rubberwood Boards"],
  },
  {
    id: 'laminate',
    name: 'Laminates',
    variant: 'Premium Decorative Finishes',
    grade: 'Wear Resistant',
    raw: laminateRaw,
    interior: laminateInt,
    rawLabel: 'Solid, stone & woodgrain decors',
    interiorLabel: 'Modern laminate kitchen',
    spec: 'Durable decorative surfaces in matte, gloss, stone and woodgrain finishes for kitchens, wardrobes & furniture.',
    items: ["Compact Laminates", "Post-Forming / Bendable Laminates", "FR Grade Fire-Retardant Laminates", "High-Gloss & Mirror Finish Laminates", "Suede / Super Matte (Anti-Fingerprint) Laminates", "Synchronized Woodgrain & Stone-Textured Laminates", "Acrylic & Metallic / PVC Laminates"],
    fullName: "Premium Laminates (Mica)",
    note: "Available in all types of thickness",
  },
  {
    id: 'veneer',
    name: 'Veneer Wood',
    variant: 'Natural Wood Veneers',
    grade: 'Natural Grain',
    raw: veneerRaw,
    interior: veneerInt,
    rawLabel: 'Figured walnut & teak leaves',
    interiorLabel: 'Veneer-paneled boardroom',
    spec: 'Genuine wood veneers with rich natural figure for luxury wall paneling, doors and statement furniture.',
    items: ["Natural Wood Veneers – Burma Teak, American Walnut, European White Oak, Steam Beech, Ash, Sapeli, Mahogany", "Reconstituted / Engineered Veneers", "Smoked / Fumed Veneers", "Rough-Cut / Saw-Cut Textured Veneers", "Fleece-Backed Flexi Veneers"],
  },
]
