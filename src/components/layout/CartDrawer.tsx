'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight, Gift } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { cn } from '@/lib/utils'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCartStore()
  const total = subtotal()

  const FREE_SHIP  = 500
  const remaining  = Math.max(0, FREE_SHIP - total)
  const progress   = Math.min(100, (total / FREE_SHIP) * 100)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-obsidian/50 z-50 transition-opacity duration-500',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className={cn(
        'fixed top-0 right-0 h-full w-full sm:w-[440px] bg-ivory z-50 flex flex-col',
        'transition-transform duration-500 ease-luxury shadow-luxury-xl',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}>

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-mist/40">
          <div>
            <h2 className="font-display text-xl font-light text-obsidian tracking-wide">
              Alışveriş Çantanız
            </h2>
            {items.length > 0 && (
              <p className="font-body text-xs text-obsidian/45 tracking-widest uppercase mt-0.5">
                {items.reduce((s, i) => s + i.quantity, 0)} ürün
              </p>
            )}
          </div>
          <button
            onClick={closeCart}
            className="btn-icon text-obsidian/60 hover:text-obsidian"
            aria-label="Kapat"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free shipping bar */}
        {items.length > 0 && (
          <div className="px-7 py-4 bg-champagne/60 border-b border-mist/30">
            {remaining > 0 ? (
              <p className="font-body text-xs text-obsidian/70 mb-2.5">
                <span className="font-semibold text-allorea-600">{remaining.toLocaleString('tr-TR')}₺</span> daha ekleyin, kargo ücretsiz
              </p>
            ) : (
              <p className="font-body text-xs font-semibold text-sage mb-2.5 flex items-center gap-1.5">
                <Gift size={13} /> Ücretsiz kargo hakkı kazandınız! 🎉
              </p>
            )}
            <div className="h-0.5 bg-mist rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-gold rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 px-7 text-center">
              <div className="w-20 h-20 rounded-full bg-champagne flex items-center justify-center">
                <ShoppingBag size={28} className="text-allorea-400" />
              </div>
              <div>
                <p className="font-display text-xl font-light text-obsidian mb-2">Çantanız boş</p>
                <p className="font-body text-sm text-obsidian/50">Koleksiyonumuzu keşfedin</p>
              </div>
              <button onClick={closeCart} className="btn-outline text-xs px-7 py-3.5">
                Alışverişe Başla
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-mist/30">
              {items.map(item => (
                <li key={item.id} className="flex gap-5 px-7 py-5 group">
                  {/* Image */}
                  <Link href={`/product/${item.slug}`} onClick={closeCart} className="shrink-0">
                    <div className="w-[72px] h-[88px] bg-champagne overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={72}
                        height={88}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/product/${item.slug}`} onClick={closeCart}>
                        <p className="font-body text-sm font-medium text-obsidian hover:text-allorea-600 transition-colors leading-snug line-clamp-2">
                          {item.name}
                        </p>
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-obsidian/25 hover:text-obsidian/60 transition-colors shrink-0 mt-0.5"
                        aria-label="Kaldır"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    {item.variant && (
                      <span className="tag tag-outline mt-1 w-fit text-2xs">{item.variant}</span>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-3">
                      {/* Quantity */}
                      <div className="flex items-center border border-mist">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-obsidian/50 hover:text-obsidian hover:bg-champagne transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-7 text-center font-body text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="w-7 h-7 flex items-center justify-center text-obsidian/50 hover:text-obsidian hover:bg-champagne transition-colors disabled:opacity-30"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      {/* Price */}
                      <p className="font-body text-sm font-semibold text-obsidian">
                        {(item.price * item.quantity).toLocaleString('tr-TR')}₺
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-mist/40 px-7 py-6 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-obsidian/60">Ara Toplam</span>
              <span className="font-body text-base font-semibold text-obsidian">{total.toLocaleString('tr-TR')}₺</span>
            </div>
            <p className="font-body text-xs text-obsidian/40">Kargo ve vergiler ödeme adımında hesaplanır</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn btn-primary w-full justify-center gap-3 py-4"
            >
              Ödemeye Geç <ArrowRight size={16} />
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-center font-body text-xs text-obsidian/45 hover:text-obsidian transition-colors tracking-widest uppercase"
            >
              Alışverişe Devam
            </button>
          </div>
        )}
      </div>
    </>
  )
}
