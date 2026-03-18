'use client'
import { useState } from 'react'
import { Star, CheckCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Review } from '@/lib/mock-data'

function StarRow({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={size} className={s <= rating ? 'fill-allorea-500 text-allorea-500' : 'fill-mist text-mist'} />
      ))}
    </div>
  )
}

interface Props { reviews: Review[]; productName: string }

export default function ReviewList({ reviews, productName }: Props) {
  const [showAll, setShowAll] = useState(false)
  const avg       = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  const displayed = showAll ? reviews : reviews.slice(0, 5)

  const dist = [5,4,3,2,1].map(n => ({
    n,
    count: reviews.filter(r => r.rating === n).length,
    pct:   Math.round((reviews.filter(r => r.rating === n).length / reviews.length) * 100),
  }))

  return (
    <div>
      {/* Summary */}
      <div className="flex flex-col sm:flex-row gap-8 p-8 bg-champagne/40 border border-mist/40 mb-8">
        <div className="text-center shrink-0">
          <div className="font-display text-6xl font-light text-obsidian leading-none">{avg.toFixed(1)}</div>
          <StarRow rating={Math.round(avg)} size={18} />
          <p className="font-body text-xs text-obsidian/45 mt-2 tracking-widest uppercase">{reviews.length} Değerlendirme</p>
        </div>
        <div className="flex-1 space-y-2">
          {dist.map(d => (
            <div key={d.n} className="flex items-center gap-3">
              <span className="font-body text-xs text-obsidian/40 w-6 shrink-0 text-right">{d.n}</span>
              <Star size={10} className="fill-allorea-400 text-allorea-400 shrink-0" />
              <div className="flex-1 h-1 bg-mist overflow-hidden">
                <div className="h-full bg-allorea-400 transition-all duration-700" style={{ width: `${d.pct}%` }} />
              </div>
              <span className="font-body text-xs text-obsidian/40 w-5 shrink-0">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards */}
      <div className="space-y-5">
        {displayed.map(r => (
          <div key={r.id} className="border-b border-mist/40 pb-6 last:border-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <StarRow rating={r.rating} />
                <h4 className="font-display text-base font-light text-obsidian mt-2">{r.title}</h4>
              </div>
              <span className="font-body text-2xs text-obsidian/35 shrink-0 mt-1">{r.date}</span>
            </div>
            <p className="font-body text-sm text-obsidian/60 leading-relaxed mb-3">{r.body}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-body text-xs font-medium text-obsidian">{r.name}</span>
                {r.isVerified && (
                  <span className="flex items-center gap-1 font-body text-2xs text-allorea-600">
                    <CheckCircle size={10} /> Doğrulanmış Alım
                  </span>
                )}
              </div>
            </div>
            {r.beforeImage && r.afterImage && (
              <div className="flex gap-3 mt-4">
                <div className="relative w-20 h-20 overflow-hidden">
                  <img src={r.beforeImage} alt="Önce" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 left-0 right-0 text-center bg-obsidian/70 text-ivory font-body text-2xs py-0.5">Önce</span>
                </div>
                <div className="relative w-20 h-20 overflow-hidden">
                  <img src={r.afterImage} alt="Sonra" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 left-0 right-0 text-center bg-allorea-600/90 text-ivory font-body text-2xs py-0.5">Sonra</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {!showAll && reviews.length > 5 && (
        <button onClick={() => setShowAll(true)}
          className="btn btn-ghost gap-2 mt-6 mx-auto flex">
          Tüm yorumları gör ({reviews.length}) <ArrowRight size={14} />
        </button>
      )}
    </div>
  )
}
