import Link from 'next/link'
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react'

const LINKS = {
  shop:    [
    { label:'Tüm Ürünler',    href:'/shop' },
    { label:'Cilt Bakımı',    href:'/shop?category=skincare' },
    { label:'Serumlar',       href:'/shop?category=serums' },
    { label:'Parfüm',         href:'/shop?category=fragrance' },
    { label:'Yeni Gelenler',  href:'/shop?sort=newest' },
    { label:'En Çok Satanlar',href:'/shop?sort=bestseller' },
  ],
  help:    [
    { label:'Bize Ulaşın',    href:'/contact' },
    { label:'SSS',            href:'/faq' },
    { label:'Sipariş Takibi', href:'/track' },
    { label:'Kargo Bilgisi',  href:'/legal/shipping' },
    { label:'İade Politikası',href:'/legal/returns' },
  ],
  brand:   [
    { label:'Hakkımızda',     href:'/about' },
    { label:'Formül Felsefesi',href:'/about#story' },
    { label:'Sürdürülebilirlik',href:'/about#sustainability' },
    { label:'Blog',           href:'/blog' },
    { label:'Basın',          href:'/press' },
  ],
}

const SOCIAL = [
  { Icon:Instagram, href:'https://instagram.com', label:'Instagram' },
  { Icon:Facebook,  href:'https://facebook.com',  label:'Facebook' },
  { Icon:Youtube,   href:'https://youtube.com',   label:'YouTube' },
  { Icon:Twitter,   href:'https://twitter.com',   label:'Twitter' },
]

export default function Footer() {
  return (
    <footer className="bg-obsidian text-ivory">

      {/* Upper footer */}
      <div className="container-main py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="font-display text-2xl font-light tracking-[0.25em]">ALLOREA</div>
              <div className="font-body text-2xs tracking-[0.4em] uppercase text-white/35 mt-0.5">Cosmetics</div>
            </Link>
            <p className="font-body text-sm text-white/45 leading-relaxed max-w-xs mb-7">
              Bilimsel formüller ve seçkin doğal bileşenlerle hazırlanmış lüks güzellik ürünleri.
              Cruelty-free. Sürdürülebilir. Dermatoloji onaylı.
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-white/12 flex items-center justify-center text-white/40 hover:bg-allorea-600/80 hover:border-allorea-600 hover:text-ivory transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {[
            { title:'Mağaza',        links:LINKS.shop },
            { title:'Müşteri Hizm.', links:LINKS.help },
            { title:'ALLOREA',       links:LINKS.brand },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-body text-2xs tracking-[0.2em] uppercase text-white/60 font-medium mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="font-body text-sm text-white/40 hover:text-white/80 transition-colors duration-200">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Certification badges */}
      <div className="border-t border-white/8">
        <div className="container-main py-8">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['Cruelty-Free','Vegan','Dermatoloji Onaylı','Sürdürülebilir Kaynak','Paraben İçermez'].map(b => (
              <div key={b} className="flex items-center gap-2">
                <div className="w-1 h-1 bg-allorea-500 rounded-full" />
                <span className="font-body text-2xs tracking-[0.15em] uppercase text-white/35">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-2xs text-white/30">
            © 2026 ALLOREA Cosmetics. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label:'Gizlilik',      href:'/legal/privacy' },
              { label:'Koşullar',      href:'/legal/terms' },
              { label:'Çerezler',      href:'/legal/cookies' },
            ].map(l => (
              <Link key={l.label} href={l.href} className="font-body text-2xs text-white/30 hover:text-white/60 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {['VISA','MC','AMEX','PayPal'].map(p => (
              <div key={p} className="px-2 py-1 bg-white/8 font-body text-2xs text-white/30 tracking-wider">
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
