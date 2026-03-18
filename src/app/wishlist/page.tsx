'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { PRODUCTS } from '@/lib/mock-data'
import { useCartStore } from '@/store/cart'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function WishlistPage() {
  // Demo: show all products as wishlisted
  const [list, setList] = useState(PRODUCTS.map(p => p.id))
  const { addItem, openCart } = useCartStore()
  const products = PRODUCTS.filter(p => list.includes(p.id))

  const remove = (id: string) => {
    setList(l => l.filter(i => i !== id))
    toast.success('Favorilerden kaldırıldı', { icon:'💔' })
  }

  const addCart = (p: typeof PRODUCTS[0]) => {
    addItem({ productId:p.id, name:p.name, slug:p.slug, price:p.price, quantity:1, image:p.images[0]?.url||'', stock:p.stock })
    toast.success(`${p.name} sepete eklendi`, { icon:'🛍️' })
    openCart()
  }

  if (products.length === 0) {
    return (
      <div className="min-h-[70vh] bg-ivory flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-champagne flex items-center justify-center mb-7">
          <Heart size={32} className="text-allorea-300" />
        </div>
        <h1 className="display-sm text-obsidian mb-3">Favori listeniz boş</h1>
        <p className="body-md mb-8 max-w-xs">Koleksiyonumuzu keşfedin ve beğendiğiniz ürünleri kaydedin</p>
        <Link href="/shop" className="btn btn-primary gap-2">Koleksiyonu Gör <ArrowRight size={16}/></Link>
      </div>
    )
  }

  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-champagne/40 border-b border-mist/40">
        <div className="container-main py-10">
          <h1 className="display-sm text-obsidian">Favorilerim</h1>
          <p className="body-sm mt-2">{products.length} ürün kaydedildi</p>
        </div>
      </div>

      <div className="container-main py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <div key={p.id} className="group relative">
              <Link href={`/product/${p.slug}`}>
                <div className="relative aspect-[3/4] bg-champagne/60 overflow-hidden mb-4">
                  <Image src={p.images[0]?.url||''} alt={p.name} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw" />
                  <button onClick={e=>{e.preventDefault();remove(p.id)}}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                    <Heart size={14} className="fill-allorea-500 text-allorea-500" />
                  </button>
                </div>
                <p className="font-body text-2xs text-obsidian/40 uppercase tracking-widest mb-1">{p.category?.name}</p>
                <h3 className="font-display text-base font-light text-obsidian group-hover:text-allorea-600 transition-colors leading-snug mb-2">{p.name}</h3>
                <p className="font-body text-sm font-semibold text-obsidian mb-3">{p.price.toLocaleString('tr-TR')}₺</p>
              </Link>
              <button onClick={() => addCart(p)} disabled={!p.stock}
                className={cn('btn w-full justify-center gap-2 py-3 text-xs', p.stock ? 'btn-primary' : 'bg-mist text-obsidian/40 cursor-not-allowed')}>
                <ShoppingBag size={14} /> {p.stock ? 'Sepete Ekle' : 'Tükendi'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
