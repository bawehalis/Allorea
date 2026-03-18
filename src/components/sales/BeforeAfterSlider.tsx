'use client'
import { useState, useRef, useCallback, type PointerEvent as ReactPointerEvent } from 'react'
import Image from 'next/image'

interface Props {
  beforeUrl:    string
  afterUrl:     string
  beforeLabel?: string
  afterLabel?:  string
  className?:   string
}

export default function BeforeAfterSlider({
  beforeUrl, afterUrl,
  beforeLabel = 'Önce', afterLabel = 'Sonra',
  className = '',
}: Props) {
  const [pct, setPct]  = useState(50)
  const containerRef   = useRef<HTMLDivElement>(null)
  const isDragging     = useRef(false)

  const clamp  = (v: number) => Math.max(1, Math.min(99, v))
  const update = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const { left, width } = el.getBoundingClientRect()
    setPct(clamp(((clientX - left) / width) * 100))
  }, [])

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    isDragging.current = true
    update(e.clientX)
  }
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    update(e.clientX)
  }
  const onPointerUp = () => { isDragging.current = false }

  return (
    <div
      ref={containerRef}
      className={`relative aspect-square overflow-hidden select-none touch-none cursor-col-resize shadow-luxury-lg ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* After image — full background */}
      <Image src={afterUrl} alt={afterLabel} fill priority
        className="object-cover pointer-events-none"
        sizes="(max-width:768px) 100vw, 50vw" />

      {/* Before image — clipped */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <Image src={beforeUrl} alt={beforeLabel} fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 50vw" />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-ivory shadow-[0_0_12px_rgba(250,248,245,0.6)] pointer-events-none"
        style={{ left:`${pct}%`, transform:'translateX(-50%)' }}
      />

      {/* Drag handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left:`${pct}%`, transform:'translate(-50%,-50%)' }}
      >
        <div className="w-11 h-11 rounded-full bg-ivory shadow-luxury flex items-center justify-center border-2 border-allorea-300/40">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M7 11 L2 11 M2 11 L5 8 M2 11 L5 14" stroke="#1c1c1e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 11 L20 11 M20 11 L17 8 M20 11 L17 14" stroke="#1c1c1e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <span className="font-body text-2xs tracking-[0.15em] uppercase bg-obsidian/80 text-ivory px-3 py-1.5 backdrop-blur-sm">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-4 right-4 pointer-events-none">
        <span className="font-body text-2xs tracking-[0.15em] uppercase bg-allorea-600/90 text-ivory px-3 py-1.5 backdrop-blur-sm">
          {afterLabel}
        </span>
      </div>

      {/* Hint */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none bg-gradient-to-t from-obsidian/50 to-transparent py-4">
        <p className="text-center font-body text-2xs text-ivory/80 tracking-[0.2em] uppercase">
          ← Kaydır →
        </p>
      </div>
    </div>
  )
}
