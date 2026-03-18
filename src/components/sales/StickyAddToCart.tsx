'use client'
import { useEffect, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  price:       number
  onAdd:       () => void
  productName: string
  inStock:     boolean
}

export default function StickyAddToCart({ price, onAdd, productName, inStock }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div className={cn(
      'fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-500 ease-luxury',
      visible ? 'translate-y-0' : 'translate-y-full'
    )}>
      <div className="bg-ivory border-t border-mist/60 shadow-luxury-lg px-5 py-3 flex items-center gap-4"
        style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        <div className="min-w-0 flex-1">
          <p className="font-body text-2xs text-obsidian/40 truncate tracking-widest uppercase">{productName}</p>
          <p className="font-body font-semibold text-obsidian">{price.toLocaleString('tr-TR')}₺</p>
        </div>
        <button
          onClick={onAdd}
          disabled={!inStock}
          className={cn(
            'btn gap-2 py-3.5 px-7 text-xs tracking-widest flex-shrink-0',
            inStock ? 'btn-primary' : 'bg-mist text-obsidian/40 cursor-not-allowed'
          )}
        >
          <ShoppingBag size={16} />
          {inStock ? 'Sepete Ekle' : 'Tükendi'}
        </button>
      </div>
    </div>
  )
}
