'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { ZoomIn, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProductImage } from '@/lib/mock-data'

interface Props { images: ProductImage[]; productName: string }

export default function ProductGallery({ images, productName }: Props) {
  const [active,    setActive]    = useState(0)
  const [lightbox,  setLightbox]  = useState(false)
  const [hovered,   setHovered]   = useState(false)

  const prev = useCallback(() => setActive(a => (a - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setActive(a => (a + 1) % images.length), [images.length])

  return (
    <>
      <div>
        {/* Main image */}
        <div
          className="relative overflow-hidden bg-champagne/50 cursor-zoom-in group"
          style={{ aspectRatio:'1/1' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setLightbox(true)}
        >
          <Image
            src={images[active]?.url || ''}
            alt={`${productName} ${active + 1}`}
            fill
            priority={active === 0}
            className={cn(
              'object-cover transition-transform duration-700 ease-luxury pointer-events-none',
              hovered && 'scale-105'
            )}
            sizes="(max-width:1024px) 100vw, 50vw"
          />

          {/* Zoom hint */}
          <div className={cn(
            'absolute top-4 right-4 w-9 h-9 bg-white/90 flex items-center justify-center transition-all duration-300',
            hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          )}>
            <ZoomIn size={15} className="text-obsidian/70" />
          </div>

          {/* Nav arrows (show when multiple images) */}
          {images.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); prev() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm"
                aria-label="Önceki"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={e => { e.stopPropagation(); next() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm"
                aria-label="Sonraki"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setActive(i) }}
                  className={cn(
                    'rounded-full transition-all duration-300',
                    i === active ? 'w-5 h-1.5 bg-obsidian' : 'w-1.5 h-1.5 bg-obsidian/30 hover:bg-obsidian/60'
                  )}
                  aria-label={`Görsel ${i+1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2.5 mt-3 overflow-x-auto scrollbar-hide pb-1">
            {images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setActive(i)}
                className={cn(
                  'relative w-[72px] h-[72px] flex-shrink-0 overflow-hidden bg-champagne/50 transition-all duration-200',
                  i === active
                    ? 'ring-1 ring-obsidian ring-offset-1'
                    : 'opacity-60 hover:opacity-90'
                )}
              >
                <Image
                  src={img.url}
                  alt={`${productName} görsel ${i+1}`}
                  fill
                  className="object-cover"
                  sizes="72px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-obsidian/95 z-[100] flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightbox(false)}
          >
            <X size={20} />
          </button>

          {images.length > 1 && (
            <>
              <button onClick={e=>{e.stopPropagation();prev()}}
                className="absolute left-5 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <ChevronLeft size={22} />
              </button>
              <button onClick={e=>{e.stopPropagation();next()}}
                className="absolute right-5 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <div
            className="relative w-[min(90vw,600px)] aspect-square"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={images[active]?.url || ''}
              alt={productName}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Lightbox thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2" onClick={e=>e.stopPropagation()}>
              {images.map((img, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={cn('w-12 h-12 overflow-hidden transition-all',
                    i===active ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-80')}>
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
