'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Search, Edit2, Trash2, RefreshCw, Package, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Product {
  id: string; name: string; slug: string; sku: string
  price: number; comparePrice?: number; stock: number
  isActive: boolean; isFeatured: boolean; isBestSeller: boolean
  category: { name: string }
  images: { url: string }[]
  createdAt: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [deleting, setDeleting] = useState<string|null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/products?limit=100&isActive=all')
      const j = await r.json()
      setProducts(j.data ?? [])
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return
    setDeleting(id)
    try {
      await fetch(`/api/products/${id}`, { method:'DELETE' })
      setProducts(p => p.filter(x => x.id !== id))
    } finally { setDeleting(null) }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Ürünler</h1>
          <p className="text-sm text-slate-500 mt-0.5">{products.length} ürün toplam</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={load} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
            <RefreshCw size={15} className={cn('text-slate-400', loading && 'animate-spin')} />
          </button>
          <Link href="/admin/products/new" className="flex items-center gap-2 bg-allorea-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-allorea-700 transition-colors">
            <Plus size={15} /> Yeni Ürün
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="search" placeholder="Ürün adı veya SKU ara…"
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-allorea-400/40 focus:border-allorea-300" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Ürün</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">Kategori</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Fiyat</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Stok</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden lg:table-cell">Durum</th>
              <th className="text-right px-5 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              [...Array(5)].map((_,i) => (
                <tr key={i}>
                  <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-10 h-12 bg-slate-100 rounded animate-pulse" /><div className="h-4 w-32 bg-slate-100 rounded animate-pulse" /></div></td>
                  <td className="px-4 py-4 hidden md:table-cell"><div className="h-4 w-20 bg-slate-100 rounded animate-pulse" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-16 bg-slate-100 rounded animate-pulse" /></td>
                  <td className="px-4 py-4 hidden sm:table-cell"><div className="h-4 w-12 bg-slate-100 rounded animate-pulse" /></td>
                  <td className="px-4 py-4 hidden lg:table-cell"><div className="h-5 w-16 bg-slate-100 rounded-full animate-pulse" /></td>
                  <td className="px-5 py-4"><div className="h-4 w-12 bg-slate-100 rounded animate-pulse ml-auto" /></td>
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-400 text-sm">
                {search ? 'Arama sonucu bulunamadı' : 'Henüz ürün eklenmemiş'}
              </td></tr>
            ) : filtered.map(p => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 bg-slate-100 rounded overflow-hidden shrink-0">
                      {p.images?.[0]?.url && (
                        <Image src={p.images[0].url} alt={p.name} width={40} height={48}
                          className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 truncate max-w-[180px]">{p.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">SKU: {p.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <span className="text-slate-500">{p.category?.name ?? '—'}</span>
                </td>
                <td className="px-4 py-4">
                  <p className="font-medium text-slate-900">{p.price.toLocaleString('tr-TR')}₺</p>
                  {p.comparePrice && p.comparePrice > p.price && (
                    <p className="text-xs text-slate-400 line-through">{p.comparePrice.toLocaleString('tr-TR')}₺</p>
                  )}
                </td>
                <td className="px-4 py-4 hidden sm:table-cell">
                  <span className={cn('text-sm font-medium', p.stock === 0 ? 'text-red-600' : p.stock < 10 ? 'text-amber-600' : 'text-green-600')}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 py-4 hidden lg:table-cell">
                  <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full',
                    p.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500')}>
                    {p.isActive ? 'Aktif' : 'Pasif'}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 justify-end">
                    <Link href={`/product/${p.slug}`} target="_blank"
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors" title="Önizle">
                      <Eye size={14} />
                    </Link>
                    <Link href={`/admin/products/${p.id}`}
                      className="p-1.5 text-slate-400 hover:text-allorea-600 hover:bg-allorea-50 rounded transition-colors" title="Düzenle">
                      <Edit2 size={14} />
                    </Link>
                    <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-40" title="Sil">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
