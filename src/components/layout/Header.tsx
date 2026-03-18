'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, User, ShoppingBag, Heart, Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { cn } from '@/lib/utils'

const NAV = [
  {
    label: 'Koleksiyon',
    href: '/shop',
    mega: true,
    categories: [
      { label: 'Tüm Ürünler',   href: '/shop',                  desc: 'Eksiksiz koleksiyon' },
      { label: 'Cilt Bakımı',   href: '/shop?category=skincare', desc: 'Pürüzsüz ve ışıltılı' },
      { label: 'Yüz Serumları', href: '/shop?category=serums',   desc: 'Yoğun bakım formülleri' },
      { label: 'Parfüm',        href: '/shop?category=fragrance',desc: 'Unutulmaz kokular' },
      { label: 'Makyaj',        href: '/shop?category=makeup',   desc: 'Zarafeti tamamlayan' },
      { label: 'Vücut Bakımı',  href: '/shop?category=body-care',desc: 'Baştan ayağa lüks' },
    ],
    featured: {
      label: 'En Çok Satanlar',
      desc:  'Bu sezonun favorileri',
      href:  '/shop?sort=bestseller',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
    },
  },
  { label: 'Yenilikler',    href: '/shop?sort=newest',     mega: false },
  { label: 'Hakkımızda',   href: '/about',                 mega: false },
  { label: 'Günlük',        href: '/blog',                  mega: false },
]

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [activeMenu,  setActiveMenu]  = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef   = useRef<HTMLInputElement>(null)
  const { itemCount, openCart } = useCartStore()
  const count = itemCount()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* Announcement */}
      <div className="announcement-bar">
        <div className="flex items-center justify-center gap-6">
          <span>✦ Ücretsiz kargo — 500₺ üzeri</span>
          <span className="hidden sm:block opacity-40">|</span>
          <span className="hidden sm:block">Klinik test edilmiş formüller</span>
          <span className="hidden md:block opacity-40">|</span>
          <span className="hidden md:block">İlk siparişte %15 — kod: <strong>ALLOREA15</strong></span>
        </div>
      </div>

      <header className={cn(
        'sticky top-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-ivory/97 backdrop-blur-md shadow-[0_1px_0_rgba(15,14,12,0.06)]'
          : 'bg-ivory/95 backdrop-blur-sm'
      )}>
        <div className="container-main">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn-icon lg:hidden -ml-1"
              aria-label="Menü"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex flex-col items-center group">
              <span className="font-display text-xl md:text-2xl font-light tracking-[0.25em] text-obsidian group-hover:text-allorea-600 transition-colors duration-300">
                ALLOREA
              </span>
              <span className="font-body text-2xs tracking-[0.4em] uppercase text-obsidian/40 -mt-0.5">
                Cosmetics
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV.map(item => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'nav-link flex items-center gap-1 py-7',
                      activeMenu === item.label && 'text-allorea-600'
                    )}
                  >
                    {item.label}
                    {item.mega && (
                      <ChevronDown size={12} className={cn(
                        'transition-transform duration-300',
                        activeMenu === item.label && 'rotate-180'
                      )} />
                    )}
                  </Link>

                  {/* Mega menu */}
                  {item.mega && item.categories && (
                    <div className={cn(
                      'absolute top-full left-1/2 -translate-x-1/2 w-[620px] bg-ivory border border-mist/60 shadow-luxury-lg transition-all duration-300 origin-top',
                      activeMenu === item.label
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-95 pointer-events-none'
                    )}>
                      <div className="grid grid-cols-3 gap-0">
                        {/* Category links */}
                        <div className="col-span-2 p-6 grid grid-cols-2 gap-1">
                          {item.categories.map(cat => (
                            <Link
                              key={cat.label}
                              href={cat.href}
                              className="group p-3 hover:bg-champagne transition-colors duration-200"
                              onClick={() => setActiveMenu(null)}
                            >
                              <p className="font-body text-sm font-medium text-obsidian group-hover:text-allorea-600 transition-colors">
                                {cat.label}
                              </p>
                              <p className="font-body text-xs text-obsidian/45 mt-0.5">{cat.desc}</p>
                            </Link>
                          ))}
                        </div>
                        {/* Featured */}
                        {item.featured && (
                          <Link
                            href={item.featured.href}
                            className="group relative overflow-hidden bg-champagne"
                            onClick={() => setActiveMenu(null)}
                          >
                            <img
                              src={item.featured.image}
                              alt={item.featured.label}
                              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                              <p className="font-display text-base text-ivory leading-tight">{item.featured.label}</p>
                              <p className="font-body text-xs text-ivory/70 mt-0.5">{item.featured.desc}</p>
                            </div>
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ArrowRight size={14} className="text-ivory" />
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="btn-icon text-obsidian/70 hover:text-obsidian"
                aria-label="Ara"
              >
                <Search size={18} />
              </button>
              <Link href="/account" className="btn-icon text-obsidian/70 hover:text-obsidian hidden sm:flex" aria-label="Hesabım">
                <User size={18} />
              </Link>
              <Link href="/wishlist" className="btn-icon text-obsidian/70 hover:text-obsidian hidden sm:flex" aria-label="Favorilerim">
                <Heart size={18} />
              </Link>
              <button
                onClick={openCart}
                className="btn-icon relative text-obsidian/70 hover:text-obsidian"
                aria-label={`Sepet (${count})`}
              >
                <ShoppingBag size={18} />
                {count > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 flex items-center justify-center bg-allorea-600 text-ivory text-2xs font-body font-medium rounded-full px-1 leading-none">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className={cn(
          'overflow-hidden transition-all duration-400 ease-luxury border-t border-mist/40',
          searchOpen ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
        )}>
          <div className="container-main py-3">
            <form onSubmit={e => { e.preventDefault(); window.location.href = `/shop?search=${searchQuery}` }}>
              <div className="relative">
                <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-obsidian/40" />
                <input
                  ref={searchRef}
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Ürün, içerik veya marka arayın…"
                  className="w-full pl-6 pr-4 py-2.5 bg-transparent border-0 border-b border-mist font-body text-sm text-obsidian placeholder-obsidian/30 focus:outline-none focus:border-allorea-500 transition-colors"
                />
              </div>
            </form>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-obsidian/40 z-40 lg:hidden transition-opacity duration-300',
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile drawer */}
      <div className={cn(
        'fixed top-0 left-0 h-full w-[320px] bg-ivory z-50 lg:hidden transition-transform duration-500 ease-luxury overflow-y-auto',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-mist/40">
          <span className="font-display text-lg tracking-[0.2em]">ALLOREA</span>
          <button onClick={() => setMobileOpen(false)} className="btn-icon">
            <X size={18} />
          </button>
        </div>

        <nav className="px-6 py-4">
          {NAV.map(item => (
            <div key={item.label} className="border-b border-mist/30 last:border-0">
              <Link
                href={item.href}
                className="block py-4 font-body text-sm tracking-[0.12em] uppercase text-obsidian/80 hover:text-allorea-600 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.mega && item.categories && (
                <div className="pb-3 space-y-1">
                  {item.categories.map(cat => (
                    <Link
                      key={cat.label}
                      href={cat.href}
                      className="block py-2 pl-4 font-body text-sm text-obsidian/55 hover:text-allorea-600 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-6 space-y-1">
            <Link href="/account" className="flex items-center gap-3 py-3 font-body text-sm text-obsidian/70" onClick={() => setMobileOpen(false)}>
              <User size={16} /> Hesabım
            </Link>
            <Link href="/wishlist" className="flex items-center gap-3 py-3 font-body text-sm text-obsidian/70" onClick={() => setMobileOpen(false)}>
              <Heart size={16} /> Favorilerim
            </Link>
          </div>
        </nav>

        <div className="px-6 py-4 bg-champagne/50 mt-auto">
          <p className="font-body text-xs text-obsidian/50 tracking-widest uppercase mb-2">Bize Ulaşın</p>
          <a href="mailto:hello@allorea-cosmetics.com" className="font-body text-sm text-obsidian/70">hello@allorea-cosmetics.com</a>
        </div>
      </div>
    </>
  )
}
