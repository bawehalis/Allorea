'use client'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import type { ProductBundle } from '@/lib/mock-data'

interface Props {
  bundles:  ProductBundle[]
  selected: string
  onChange: (id: string) => void
}

export default function BundleSelector({ bundles, selected, onChange }: Props) {
  return (
    <div className="space-y-2.5">
      <p className="font-body text-2xs tracking-[0.2em] uppercase text-obsidian/40 mb-3">Paket Seçin</p>
      {bundles.map(b => {
        const isSelected = b.id === selected
        return (
          <button
            key={b.id}
            onClick={() => onChange(b.id)}
            className={cn(
              'relative w-full flex items-center justify-between px-5 py-4 border text-left transition-all duration-300 group',
              isSelected
                ? 'border-allorea-500 bg-allorea-50/50 shadow-glow-soft'
                : 'border-mist bg-white hover:border-allorea-300 hover:bg-champagne/30'
            )}
          >
            {/* Popular badge */}
            {b.isMostPopular && (
              <span className="absolute -top-px left-5 right-5 h-px bg-gradient-gold" />
            )}
            {b.isMostPopular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-gold text-ivory font-body text-2xs tracking-[0.15em] uppercase px-4 py-0.5">
                En Popüler
              </span>
            )}

            <div className="flex items-center gap-4">
              {/* Radio */}
              <div className={cn(
                'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200',
                isSelected ? 'border-allorea-500 bg-allorea-500' : 'border-mist group-hover:border-allorea-300'
              )}>
                {isSelected && <Check size={11} className="text-ivory" strokeWidth={3} />}
              </div>

              {/* Label */}
              <div>
                <div className="flex items-center gap-2.5">
                  <span className={cn(
                    'font-body text-sm font-semibold transition-colors',
                    isSelected ? 'text-allorea-700' : 'text-obsidian'
                  )}>
                    {b.label}
                  </span>
                  {b.discountPercent > 0 && (
                    <span className={cn(
                      'font-body text-2xs tracking-[0.1em] uppercase px-2 py-0.5',
                      isSelected ? 'bg-allorea-100 text-allorea-700' : 'bg-champagne text-obsidian/60'
                    )}>
                      %{b.discountPercent} indirim
                    </span>
                  )}
                </div>
                {b.savings && b.savings > 0 && (
                  <p className="font-body text-xs text-allorea-600 mt-0.5">
                    {b.savings.toLocaleString('tr-TR')}₺ tasarruf
                  </p>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="text-right shrink-0">
              <div className={cn(
                'font-body font-semibold text-base transition-colors',
                isSelected ? 'text-allorea-700' : 'text-obsidian'
              )}>
                {b.price.toLocaleString('tr-TR')}₺
              </div>
              {b.comparePrice && b.comparePrice > b.price && (
                <div className="font-body text-xs text-obsidian/35 line-through">
                  {b.comparePrice.toLocaleString('tr-TR')}₺
                </div>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
