'use client'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProductFaq } from '@/lib/mock-data'

export default function FaqAccordion({ faqs }: { faqs: ProductFaq[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-mist/40">
      {faqs.map((faq, i) => (
        <div key={i} className={cn(
          'transition-colors duration-200',
          open === i ? 'bg-champagne/30' : 'bg-transparent'
        )}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-0 py-5 text-left group"
          >
            <span className={cn(
              'font-display font-light text-base pr-6 leading-snug transition-colors',
              open === i ? 'text-allorea-700' : 'text-obsidian group-hover:text-allorea-600'
            )}>
              {faq.question}
            </span>
            <div className={cn(
              'w-8 h-8 border flex items-center justify-center shrink-0 transition-all duration-300',
              open === i ? 'border-allorea-400 bg-allorea-50 text-allorea-600' : 'border-mist text-obsidian/40 group-hover:border-allorea-300'
            )}>
              {open === i ? <Minus size={14} /> : <Plus size={14} />}
            </div>
          </button>
          <div className={cn(
            'overflow-hidden transition-all duration-300 ease-luxury',
            open === i ? 'max-h-96 pb-5' : 'max-h-0'
          )}>
            <p className="font-body text-sm text-obsidian/60 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
