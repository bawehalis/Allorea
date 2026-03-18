'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, X, ArrowRight, ShoppingBag, Tag, Shield, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { cn } from '@/lib/utils'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore()
  const [coupon,        setCoupon]        = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError,   setCouponError]   = useState('')
  const [couponLoading, setCouponLoading] = useState(false)

  const total    = subtotal()
  const FREE_SHIP = 500
  const shipping  = total >= FREE_SHIP ? 0 : total > 0 ? 49.90 : 0
  const discount  = couponApplied ? total * 0.15 : 0
  const orderTotal = total - discount + shipping
  const progress   = Math.min(100, (total / FREE_SHIP) * 100)

  const applyCoupon = async () => {
    if (!coupon.trim()) return
    setCouponLoading(true)
    setCouponError('')
    try {
      const res  = await fetch('/api/checkout/validate-coupon', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ code: coupon.trim().toUpperCase(), subtotal: total }),
      })
      const json = await res.json()
      if (!res.ok) { setCouponError(json.error || 'Geçersiz kupon'); return }
      setCouponApplied(true)
    } catch { setCouponError('Bir hata oluştu') }
    finally { setCouponLoading(false) }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-ivory">
        <div className="w-20 h-20 bg-champagne flex items-center justify-center mb-7">
          <ShoppingBag size={32} className="text-allorea-400" />
        </div>
        <h1 className="display-sm text-obsidian mb-3">Çantanız boş</h1>
        <p className="body-md mb-8 max-w-xs">Koleksiyonumuzu keşfedin ve favorilerinizi ekleyin</p>
        <Link href="/shop" className="btn btn-primary gap-2">Alışverişe Başla <ArrowRight size={16} /></Link>
      </div>
    )
  }

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <div className="bg-champagne/40 border-b border-mist/40">
        <div className="container-main py-8">
          <h1 className="display-sm text-obsidian">Alışveriş Çantanız</h1>
          <p className="body-sm mt-1.5">{items.reduce((s,i)=>s+i.quantity,0)} ürün</p>
        </div>
      </div>

      {/* Free shipping progress */}
      {total < FREE_SHIP && (
        <div className="bg-allorea-50 border-b border-allorea-100/60">
          <div className="container-main py-3.5 flex items-center gap-4">
            <div className="flex-1 h-1 bg-mist overflow-hidden">
              <div className="h-full bg-gradient-gold transition-all duration-700" style={{ width:`${progress}%` }} />
            </div>
            <p className="font-body text-xs text-obsidian/65 whitespace-nowrap shrink-0">
              <span className="font-semibold text-allorea-700">{(FREE_SHIP - total).toLocaleString('tr-TR')}₺</span> daha — ücretsiz kargo
            </p>
          </div>
        </div>
      )}

      <div className="container-main py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Items */}
          <div className="lg:col-span-2">
            {/* Column headers */}
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-mist/40">
              <div className="col-span-6">
                <span className="font-body text-2xs tracking-[0.2em] uppercase text-obsidian/40">Ürün</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-body text-2xs tracking-[0.2em] uppercase text-obsidian/40">Fiyat</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-body text-2xs tracking-[0.2em] uppercase text-obsidian/40">Adet</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="font-body text-2xs tracking-[0.2em] uppercase text-obsidian/40">Toplam</span>
              </div>
            </div>

            <ul className="divide-y divide-mist/30">
              {items.map(item => (
                <li key={item.id} className="grid grid-cols-12 gap-4 py-6 items-center group">
                  {/* Product */}
                  <div className="col-span-12 sm:col-span-6 flex items-center gap-4">
                    <Link href={`/product/${item.slug}`} className="shrink-0">
                      <div className="w-[68px] h-[84px] bg-champagne overflow-hidden">
                        <Image src={item.image} alt={item.name} width={68} height={84}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    </Link>
                    <div className="min-w-0">
                      <Link href={`/product/${item.slug}`}>
                        <h3 className="font-display text-base font-light text-obsidian hover:text-allorea-600 transition-colors leading-snug line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      {item.variant && (
                        <span className="tag tag-outline mt-1.5 inline-block">{item.variant}</span>
                      )}
                      <button onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 mt-2 font-body text-2xs text-obsidian/30 hover:text-obsidian/70 transition-colors">
                        <Trash2 size={11} /> Kaldır
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-4 sm:col-span-2 text-center">
                    <span className="sm:hidden font-body text-2xs text-obsidian/40 block mb-0.5">Fiyat</span>
                    <span className="font-body text-sm text-obsidian">{item.price.toLocaleString('tr-TR')}₺</span>
                  </div>

                  {/* Qty */}
                  <div className="col-span-4 sm:col-span-2 flex justify-center">
                    <div className="flex items-center border border-mist">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-obsidian/40 hover:text-obsidian hover:bg-champagne/40 transition-colors">
                        <Minus size={11} />
                      </button>
                      <span className="w-8 text-center font-body text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="w-8 h-8 flex items-center justify-center text-obsidian/40 hover:text-obsidian hover:bg-champagne/40 transition-colors disabled:opacity-30">
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="col-span-4 sm:col-span-2 text-right">
                    <span className="sm:hidden font-body text-2xs text-obsidian/40 block mb-0.5">Toplam</span>
                    <span className="font-body text-sm font-semibold text-obsidian">
                      {(item.price * item.quantity).toLocaleString('tr-TR')}₺
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-mist/40 flex items-center justify-between">
              <Link href="/shop" className="btn btn-ghost gap-2 text-xs px-0">
                ← Alışverişe Devam
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-champagne/30 border border-mist/40 p-7 sticky top-24 space-y-5">
              <h2 className="font-display text-xl font-light text-obsidian">Sipariş Özeti</h2>

              {/* Coupon */}
              <div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-obsidian/30" />
                    <input
                      type="text"
                      value={coupon}
                      onChange={e => { setCoupon(e.target.value.toUpperCase()); setCouponError('') }}
                      placeholder="Kupon kodu"
                      className="input-field pl-9 py-3 text-sm"
                      disabled={couponApplied}
                    />
                  </div>
                  <button
                    onClick={applyCoupon}
                    disabled={couponApplied || couponLoading || !coupon}
                    className="btn btn-outline py-3 px-5 text-2xs tracking-widest disabled:opacity-50"
                  >
                    {couponLoading ? '…' : 'Uygula'}
                  </button>
                </div>
                {couponError   && <p className="font-body text-xs text-red-500 mt-1.5">{couponError}</p>}
                {couponApplied && <p className="font-body text-xs text-allorea-600 mt-1.5">✓ %15 indirim uygulandı</p>}
              </div>

              {/* Amounts */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between">
                  <span className="font-body text-sm text-obsidian/55">Ara Toplam</span>
                  <span className="font-body text-sm text-obsidian">{total.toLocaleString('tr-TR')}₺</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-allorea-600">Kupon İndirimi</span>
                    <span className="font-body text-sm text-allorea-600">−{discount.toLocaleString('tr-TR')}₺</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-body text-sm text-obsidian/55">Kargo</span>
                  <span className="font-body text-sm text-obsidian">
                    {shipping === 0 ? <span className="text-allorea-600">Ücretsiz</span> : `${shipping.toFixed(2)}₺`}
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-mist/40">
                  <span className="font-body text-sm font-semibold text-obsidian">Toplam</span>
                  <span className="font-display text-2xl font-light text-obsidian">{orderTotal.toLocaleString('tr-TR')}₺</span>
                </div>
              </div>

              <Link href="/checkout" className="btn btn-primary w-full justify-center gap-2 py-4">
                Ödemeye Geç <ArrowRight size={16} />
              </Link>

              {/* Trust */}
              <div className="flex items-center gap-2 justify-center pt-1">
                <Shield size={13} className="text-obsidian/30" />
                <span className="font-body text-2xs text-obsidian/35 tracking-wider">Güvenli ödeme · SSL şifreli</span>
              </div>

              {/* Payment logos */}
              <div className="flex items-center justify-center gap-2 pt-1">
                {['VISA','MC','AMEX','PayPal'].map(p => (
                  <div key={p} className="px-2 py-1 bg-mist/40 border border-mist font-body text-2xs text-obsidian/40">{p}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
