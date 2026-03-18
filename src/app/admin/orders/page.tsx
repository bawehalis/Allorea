'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, RefreshCw, ChevronRight, Filter } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Order {
  id: string; orderNumber: string; email: string; status: string
  paymentStatus: string; total: number; createdAt: string
  items: { name: string; quantity: number }[]
}

const STATUS: Record<string, { label:string; cls:string }> = {
  PENDING:    { label:'Beklemede',    cls:'bg-amber-100 text-amber-700' },
  CONFIRMED:  { label:'Onaylandı',    cls:'bg-blue-100 text-blue-700' },
  PROCESSING: { label:'Hazırlanıyor', cls:'bg-purple-100 text-purple-700' },
  SHIPPED:    { label:'Kargoda',      cls:'bg-indigo-100 text-indigo-700' },
  DELIVERED:  { label:'Teslim',       cls:'bg-green-100 text-green-700' },
  CANCELLED:  { label:'İptal',        cls:'bg-red-100 text-red-700' },
  REFUNDED:   { label:'İade',         cls:'bg-slate-100 text-slate-600' },
}

export default function AdminOrdersPage() {
  const [orders,  setOrders]  = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')
  const [status,  setStatus]  = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const q = new URLSearchParams({ limit:'50' })
      if (status) q.set('status', status)
      const r = await fetch(`/api/orders?${q}`)
      const j = await r.json()
      setOrders(j.data ?? [])
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [status])

  const filtered = orders.filter(o =>
    o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
    o.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Siparişler</h1>
          <p className="text-sm text-slate-500 mt-0.5">{orders.length} sipariş</p>
        </div>
        <button onClick={load} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
          <RefreshCw size={15} className={cn('text-slate-400', loading && 'animate-spin')} />
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="search" placeholder="Sipariş no veya e-posta…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-allorea-400/40" />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Filter size={14} className="text-slate-400" />
          <select value={status} onChange={e => setStatus(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2.5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-allorea-400/40">
            <option value="">Tüm Durumlar</option>
            {Object.entries(STATUS).map(([k,v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Sipariş</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">Müşteri</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Tarih</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Toplam</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Durum</th>
              <th className="text-right px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              [...Array(6)].map((_,i) => (
                <tr key={i}>
                  {[...Array(5)].map((_,j) => (
                    <td key={j} className="px-4 py-4"><div className="h-4 bg-slate-100 rounded animate-pulse" /></td>
                  ))}
                  <td className="px-5 py-4" />
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-400 text-sm">
                Sipariş bulunamadı
              </td></tr>
            ) : filtered.map(o => (
              <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <p className="font-medium text-slate-900">{o.orderNumber}</p>
                  <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
                    {o.items?.length ?? 0} ürün
                  </p>
                </td>
                <td className="px-4 py-4 hidden md:table-cell text-slate-600 truncate max-w-[160px]">{o.email}</td>
                <td className="px-4 py-4 hidden sm:table-cell text-slate-500">{formatDate(o.createdAt)}</td>
                <td className="px-4 py-4 font-semibold text-slate-900">{o.total.toLocaleString('tr-TR')}₺</td>
                <td className="px-4 py-4">
                  <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full', STATUS[o.status]?.cls ?? 'bg-slate-100 text-slate-600')}>
                    {STATUS[o.status]?.label ?? o.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link href={`/admin/orders/${o.id}`}
                    className="text-slate-400 hover:text-allorea-600 transition-colors">
                    <ChevronRight size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
