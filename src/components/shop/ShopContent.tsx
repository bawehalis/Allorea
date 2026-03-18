'use client'

import { useState, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { SlidersHorizontal, X, Grid, List, ChevronDown, Search } from 'lucide-react'
import Link from 'next/link'
import ProductCard  from '@/components/shop/ProductCard'
import ShopFilters  from '@/components/shop/ShopFilters'
import Pagination   from '@/components/shop/Pagination'
import { PRODUCTS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const SORT = [
  { value:'newest',     label:'En Yeni' },
  { value:'bestseller', label:'En Çok Satan' },
  { value:'price-asc',  label:'Fiyat: Düşük → Yüksek' },
  { value:'price-desc', label:'Fiyat: Yüksek → Düşük' },
  { value:'name',       label:'İsim A–Z' },
]
const PER_PAGE = 12

export default function ShopContent() {
  const searchParams = useSearchParams()
  const router       = useRouter()
  const [layout,       setLayout]       = useState<'grid'|'list'>('grid')
  const [filtersOpen,  setFiltersOpen]  = useState(false)

  const category = searchParams.get('category') ?? ''
  const sort     = searchParams.get('sort')     ?? 'newest'
  const search   = searchParams.get('search')   ?? ''
  const minPrice = Number(searchParams.get('minPrice') ?? 0)
  const maxPrice = Number(searchParams.get('maxPrice') ?? 9999)
  const featured = searchParams.get('featured') === 'true'
  const sale     = searchParams.get('sale')     === 'true'
  const page     = Math.max(1, Number(searchParams.get('page') ?? 1))

  const filtered = useMemo(() => {
    let r = [...PRODUCTS]
    if (category) r = r.filter(p => p.category?.slug === category || (p as any).categorySlug === category)
    if (search)   r = r.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    if (minPrice) r = r.filter(p => p.price >= minPrice)
    if (maxPrice < 9999) r = r.filter(p => p.price <= maxPrice)
    if (featured) r = r.filter(p => p.isBestSeller || (p as any).isFeatured)
    if (sale)     r = r.filter(p => (p.comparePrice ?? 0) > p.price)
    switch (sort) {
      case 'bestseller': r.sort((a,b) => (b.isBestSeller ? 1:0)-(a.isBestSeller ? 1:0)); break
      case 'price-asc':  r.sort((a,b) => a.price - b.price); break
      case 'price-desc': r.sort((a,b) => b.price - a.price); break
      case 'name':       r.sort((a,b) => a.name.localeCompare(b.name,'tr')); break
    }
    return r
  }, [category, sort, search, minPrice, maxPrice, featured, sale])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged      = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE)

  const setParam = (k: string, v: string) => {
    const p = new URLSearchParams(searchParams.toString())
    if (v) p.set(k, v); else p.delete(k)
    p.delete('page')
    router.push(`/shop?${p.toString()}`)
  }
  const goPage = (n: number) => {
    const p = new URLSearchParams(searchParams.toString())
    p.set('page', String(n))
    router.push(`/shop?${p.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pageTitle = category
    ? PRODUCTS.find(p => (p as any).categorySlug === category || p.category?.slug === category)?.category?.name ?? category
    : search ? `"${search}" için sonuçlar` : 'Tüm Koleksiyon'

  return (
    <div className="bg-ivory min-h-screen">

      {/* Page header */}
      <div className="bg-champagne/40 border-b border-mist/40">
        <div className="container-main py-10 lg:py-14">
          <nav className="flex items-center gap-2 font-body text-2xs tracking-widest uppercase text-obsidian/40 mb-4">
            <Link href="/" className="hover:text-obsidian transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-obsidian/70">Mağaza</span>
          </nav>
          <h1 className="display-md text-obsidian capitalize">{pageTitle}</h1>
          <p className="body-sm mt-2">{filtered.length} ürün</p>
        </div>
      </div>

      <div className="container-main py-10">
        <div className="flex gap-10">

          {/* Desktop sidebar filters */}
          <aside className="hidden lg:block w-52 shrink-0 self-start sticky top-24">
            <ShopFilters />
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-8 pb-5 border-b border-mist/40">
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 font-body text-xs text-obsidian/60 hover:text-obsidian transition-colors border border-mist px-4 py-2.5"
              >
                <SlidersHorizontal size={14} /> Filtreler
              </button>

              <div className="flex items-center gap-3 ml-auto">
                <span className="font-body text-xs text-obsidian/40 hidden sm:block">Sırala:</span>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={e => setParam('sort', e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 bg-transparent border border-mist font-body text-xs text-obsidian focus:outline-none focus:border-allorea-400 transition-colors cursor-pointer"
                  >
                    {SORT.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-obsidian/40 pointer-events-none" />
                </div>

                {/* Layout toggle */}
                <div className="hidden sm:flex items-center border border-mist overflow-hidden">
                  <button onClick={() => setLayout('grid')}
                    className={cn('p-2.5 transition-colors', layout==='grid' ? 'bg-obsidian text-ivory' : 'text-obsidian/40 hover:text-obsidian')}>
                    <Grid size={14} />
                  </button>
                  <button onClick={() => setLayout('list')}
                    className={cn('p-2.5 transition-colors border-l border-mist', layout==='list' ? 'bg-obsidian text-ivory' : 'text-obsidian/40 hover:text-obsidian')}>
                    <List size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filters */}
            {(category || search || featured || sale) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {category && (
                  <button onClick={() => setParam('category','')}
                    className="flex items-center gap-1.5 tag tag-outline hover:border-obsidian transition-colors">
                    {category} <X size={11} />
                  </button>
                )}
                {search && (
                  <button onClick={() => setParam('search','')}
                    className="flex items-center gap-1.5 tag tag-outline hover:border-obsidian transition-colors">
                    &ldquo;{search}&rdquo; <X size={11} />
                  </button>
                )}
                {featured && (
                  <button onClick={() => setParam('featured','')}
                    className="flex items-center gap-1.5 tag tag-outline hover:border-obsidian transition-colors">
                    Çok Satan <X size={11} />
                  </button>
                )}
                {sale && (
                  <button onClick={() => setParam('sale','')}
                    className="flex items-center gap-1.5 tag tag-outline hover:border-obsidian transition-colors">
                    İndirimli <X size={11} />
                  </button>
                )}
                <Link href="/shop" className="font-body text-2xs text-obsidian/45 hover:text-obsidian transition-colors px-2 py-1 underline underline-offset-2">
                  Temizle
                </Link>
              </div>
            )}

            {/* Grid / List */}
            {paged.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Search size={40} className="text-mist mb-5" />
                <h3 className="font-display text-2xl font-light text-obsidian mb-3">Ürün bulunamadı</h3>
                <p className="body-sm mb-6">Farklı filtreler veya arama terimleri deneyin</p>
                <Link href="/shop" className="btn btn-outline py-3 px-8 text-xs">Tüm Ürünler</Link>
              </div>
            ) : layout === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
                {paged.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="space-y-3">
                {paged.map(p => <ProductCard key={p.id} product={p} layout="list" />)}
              </div>
            )}

            <Pagination page={page} totalPages={totalPages} onPageChange={goPage} />
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <>
          <div className="fixed inset-0 bg-obsidian/40 z-40" onClick={() => setFiltersOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-ivory z-50 rounded-t-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-ivory border-b border-mist/40 px-6 py-4 flex items-center justify-between">
              <span className="font-body text-sm font-semibold text-obsidian">Filtreler</span>
              <button onClick={() => setFiltersOpen(false)} className="btn-icon"><X size={18} /></button>
            </div>
            <div className="px-6 pb-8">
              <ShopFilters onClose={() => setFiltersOpen(false)} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
