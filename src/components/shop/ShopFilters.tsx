'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CATEGORY_NAMES } from '@/lib/mock-data'

const CATEGORIES = [
  { slug: 'skincare',  name: 'Cilt Bakımı' },
  { slug: 'makeup',    name: 'Makyaj' },
  { slug: 'body-care', name: 'Vücut Bakımı' },
  { slug: 'fragrance', name: 'Parfüm' },
  { slug: 'hair-care', name: 'Saç Bakımı' },
  { slug: 'serums',    name: 'Serumlar' },
]

const PRICE_RANGES = [
  { label: 'Tümü',          min: 0,   max: 9999 },
  { label: '₺0 – ₺200',    min: 0,   max: 200  },
  { label: '₺200 – ₺400',  min: 200, max: 400  },
  { label: '₺400 – ₺600',  min: 400, max: 600  },
  { label: '₺600+',         min: 600, max: 9999 },
]

const TAGS = ['Yeni', 'En Çok Satan', 'İndirimli', 'Dermatoloji Onaylı']

interface Props { onClose?: () => void }

function FilterSection({ title, children, defaultOpen = true }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-mist/40 py-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full group"
      >
        <span className="font-body text-2xs tracking-[0.2em] uppercase text-obsidian/60 group-hover:text-obsidian transition-colors">
          {title}
        </span>
        <ChevronDown size={14} className={cn('text-obsidian/40 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      {open && <div className="mt-4 space-y-1">{children}</div>}
    </div>
  )
}

export default function ShopFilters({ onClose }: Props) {
  const router       = useRouter()
  const searchParams = useSearchParams()

  const activeCategory = searchParams.get('category') ?? ''
  const activeMinPrice = Number(searchParams.get('minPrice') ?? 0)

  const updateFilter = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([k, v]) => {
      if (v === null) params.delete(k); else params.set(k, v)
    })
    params.delete('page')
    router.push(`/shop?${params.toString()}`)
    onClose?.()
  }

  const clearAll = () => { router.push('/shop'); onClose?.() }
  const hasFilters = searchParams.toString().length > 0

  return (
    <div>
      {hasFilters && (
        <button
          onClick={clearAll}
          className="font-body text-2xs text-allorea-600 hover:text-allorea-700 tracking-widest uppercase mb-4 transition-colors"
        >
          Filtreleri Temizle
        </button>
      )}

      <FilterSection title="Kategori">
        <button
          onClick={() => updateFilter({ category: null })}
          className={cn(
            'block w-full text-left font-body text-sm py-1.5 px-2 transition-colors',
            !activeCategory ? 'text-allorea-600 font-medium' : 'text-obsidian/55 hover:text-obsidian'
          )}
        >
          Tümü
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.slug}
            onClick={() => updateFilter({ category: cat.slug })}
            className={cn(
              'block w-full text-left font-body text-sm py-1.5 px-2 transition-colors',
              activeCategory === cat.slug
                ? 'text-allorea-600 font-medium'
                : 'text-obsidian/55 hover:text-obsidian'
            )}
          >
            {cat.name}
          </button>
        ))}
      </FilterSection>

      <FilterSection title="Fiyat Aralığı">
        {PRICE_RANGES.map(range => (
          <button
            key={range.label}
            onClick={() => updateFilter({
              minPrice: range.min > 0 ? String(range.min) : null,
              maxPrice: range.max < 9999 ? String(range.max) : null,
            })}
            className={cn(
              'block w-full text-left font-body text-sm py-1.5 px-2 transition-colors',
              activeMinPrice === range.min
                ? 'text-allorea-600 font-medium'
                : 'text-obsidian/55 hover:text-obsidian'
            )}
          >
            {range.label}
          </button>
        ))}
      </FilterSection>

      <FilterSection title="Özellikler" defaultOpen={false}>
        <label className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={searchParams.get('featured') === 'true'}
            onChange={e => updateFilter({ featured: e.target.checked ? 'true' : null })}
            className="w-3.5 h-3.5 accent-allorea-500"
          />
          <span className="font-body text-sm text-obsidian/60 group-hover:text-obsidian transition-colors">En Çok Satanlar</span>
        </label>
        <label className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={searchParams.get('sale') === 'true'}
            onChange={e => updateFilter({ sale: e.target.checked ? 'true' : null })}
            className="w-3.5 h-3.5 accent-allorea-500"
          />
          <span className="font-body text-sm text-obsidian/60 group-hover:text-obsidian transition-colors">İndirimli</span>
        </label>
      </FilterSection>
    </div>
  )
}
