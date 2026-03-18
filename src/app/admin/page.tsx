'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  TrendingUp, ShoppingCart, Users, Package,
  AlertTriangle, ArrowRight, RefreshCw, ArrowUpRight, ArrowDownRight,
  DollarSign, Activity, Plus, Eye, BarChart3
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface AnalyticsData {
  summary: {
    totalRevenue: number; totalOrders: number; totalCustomers: number
    totalProducts: number; newCustomers: number; revenueGrowth: number
    ordersGrowth: number; averageOrderValue: number
  }
  recentOrders: Array<{
    id: string; orderNumber: string; email: string
    total: number; status: string; createdAt: string
  }>
  topProducts: Array<{ productId: string; name: string; _sum: { quantity: number } }>
  ordersByStatus: Array<{ status: string; _count: { id: number } }>
  dailyRevenue: Array<{ date: string; revenue: number }>
  lowStockProducts: Array<{ id: string; name: string; stock: number; sku: string }>
}

const STATUS: Record<string, { label: string; cls: string }> = {
  PENDING:    { label:'Beklemede',    cls:'bg-amber-100 text-amber-700' },
  CONFIRMED:  { label:'Onaylandı',    cls:'bg-blue-100 text-blue-700' },
  PROCESSING: { label:'Hazırlanıyor', cls:'bg-purple-100 text-purple-700' },
  SHIPPED:    { label:'Kargoda',      cls:'bg-indigo-100 text-indigo-700' },
  DELIVERED:  { label:'Teslim',       cls:'bg-green-100 text-green-700' },
  CANCELLED:  { label:'İptal',        cls:'bg-red-100 text-red-700' },
  REFUNDED:   { label:'İade',         cls:'bg-gray-100 text-gray-700' },
}

function StatCard({ title, value, change, icon: Icon, gradient }: {
  title: string; value: string | number; change?: number; icon: any; gradient: string
}) {
  const up = (change ?? 0) >= 0
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-medium text-slate-500 tracking-wider uppercase">{title}</p>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${gradient}`}>
          <Icon size={17} />
        </div>
      </div>
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
      {change !== undefined && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${up ? 'text-green-600' : 'text-red-500'}`}>
          {up ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
          {Math.abs(change)}% geçen döneme göre
        </div>
      )}
    </div>
  )
}

export default function AdminDashboard() {
  const [data,    setData]    = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [range,   setRange]   = useState('30')

  const fetch_ = async () => {
    setLoading(true)
    try {
      const res  = await fetch(`/api/analytics?range=${range}`)
      const json = await res.json()
      setData(json.data)
    } catch(e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetch_() }, [range])

  const maxRev = data?.dailyRevenue ? Math.max(...data.dailyRevenue.map(d=>d.revenue), 1) : 1

  const QUICK = [
    { href:'/admin/products/new', label:'Yeni Ürün',     icon:Plus,        cls:'bg-blue-50 text-blue-600 hover:bg-blue-100' },
    { href:'/admin/orders',       label:'Siparişler',    icon:ShoppingCart,cls:'bg-green-50 text-green-600 hover:bg-green-100' },
    { href:'/admin/analytics',    label:'Raporlar',      icon:BarChart3,   cls:'bg-purple-50 text-purple-600 hover:bg-purple-100' },
    { href:'/',                   label:'Siteyi Gör',    icon:Eye,         cls:'bg-orange-50 text-orange-600 hover:bg-orange-100', target:'_blank' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Kontrol Paneli</h1>
          <p className="text-sm text-slate-500 mt-0.5">Merhaba! İşte özet görünümünüz.</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={range} onChange={e=>setRange(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-allorea-400/40">
            <option value="7">Son 7 gün</option>
            <option value="30">Son 30 gün</option>
            <option value="90">Son 90 gün</option>
          </select>
          <button onClick={fetch_} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <RefreshCw size={16} className={loading ? 'animate-spin text-allorea-500' : 'text-slate-400'} />
          </button>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {QUICK.map(q => (
          <Link key={q.label} href={q.href} target={(q as any).target}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm transition-colors ${q.cls}`}>
            <q.icon size={16} className="shrink-0" />
            {q.label}
          </Link>
        ))}
      </div>

      {loading && !data ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_,i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-100 p-5 h-32 animate-pulse">
              <div className="w-10 h-10 bg-slate-100 rounded-xl mb-4" />
              <div className="h-3 bg-slate-100 rounded w-2/3 mb-2" />
              <div className="h-7 bg-slate-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : data ? (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Toplam Gelir"  value={`${data.summary.totalRevenue.toLocaleString('tr-TR')}₺`}
              change={data.summary.revenueGrowth} icon={DollarSign} gradient="bg-green-50 text-green-600" />
            <StatCard title={`Sipariş (${range}g)`} value={data.summary.totalOrders}
              change={data.summary.ordersGrowth} icon={ShoppingCart} gradient="bg-blue-50 text-blue-600" />
            <StatCard title="Toplam Müşteri" value={data.summary.totalCustomers}
              change={data.summary.newCustomers} icon={Users} gradient="bg-purple-50 text-purple-600" />
            <StatCard title="Aktif Ürünler" value={data.summary.totalProducts}
              icon={Package} gradient="bg-amber-50 text-amber-600" />
          </div>

          {/* Secondary row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:'Ort. Sipariş Değeri',  value:`${data.summary.averageOrderValue.toLocaleString('tr-TR')}₺` },
              { label:'Yeni Müşteriler',       value:`+${data.summary.newCustomers}` },
              { label:'Gelir Büyümesi',         value:`${data.summary.revenueGrowth > 0 ? '+' : ''}${data.summary.revenueGrowth}%` },
              { label:'Sipariş Büyümesi',       value:`${data.summary.ordersGrowth > 0 ? '+' : ''}${data.summary.ordersGrowth}%` },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-slate-100 px-5 py-4">
                <p className="text-xs text-slate-500 uppercase tracking-wider">{s.label}</p>
                <p className="text-xl font-semibold text-slate-900 mt-1">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Revenue chart */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-slate-900">Günlük Gelir</h2>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Activity size={13} className="text-green-500" />
                  {data.summary.revenueGrowth > 0 ? '+' : ''}{data.summary.revenueGrowth}% büyüme
                </div>
              </div>
              <div className="flex items-end gap-0.5 h-40">
                {data.dailyRevenue.slice(-30).map((d, i) => (
                  <div key={d.date} className="flex-1 group relative">
                    <div
                      className="w-full bg-allorea-200 hover:bg-allorea-500 transition-colors rounded-sm cursor-pointer"
                      style={{ height: `${Math.max(3,(d.revenue/maxRev)*148)}px` }}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-slate-800 text-white text-2xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      {d.revenue.toLocaleString('tr-TR')}₺
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-2xs text-slate-400">
                <span>{data.dailyRevenue[0]?.date}</span>
                <span>{data.dailyRevenue[data.dailyRevenue.length-1]?.date}</span>
              </div>
            </div>

            {/* Status distribution */}
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <h2 className="text-base font-semibold text-slate-900 mb-5">Sipariş Durumları</h2>
              <div className="space-y-3">
                {data.ordersByStatus.map(({ status, _count }) => {
                  const t = data.ordersByStatus.reduce((s,o)=>s+o._count.id,0)
                  const pct = t > 0 ? (_count.id/t)*100 : 0
                  const s = STATUS[status] ?? { label:status, cls:'bg-slate-100 text-slate-600' }
                  return (
                    <div key={status}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-2xs font-medium px-2 py-0.5 rounded-full ${s.cls}`}>{s.label}</span>
                        <span className="text-sm font-medium text-slate-700">{_count.id}</span>
                      </div>
                      <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-allorea-400 rounded-full" style={{ width:`${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Recent orders */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Son Siparişler</h2>
                <Link href="/admin/orders" className="text-sm text-allorea-600 hover:text-allorea-700 flex items-center gap-1">
                  Tümü <ArrowRight size={13} />
                </Link>
              </div>
              <div className="divide-y divide-slate-50">
                {data.recentOrders.slice(0,6).map(o => (
                  <Link key={o.id} href={`/admin/orders/${o.id}`}
                    className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{o.orderNumber}</p>
                      <p className="text-2xs text-slate-400 truncate mt-0.5">{o.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">{o.total.toLocaleString('tr-TR')}₺</p>
                      <p className="text-2xs text-slate-400">{formatDate(o.createdAt)}</p>
                    </div>
                    <span className={`text-2xs font-medium px-2 py-0.5 rounded-full ${STATUS[o.status]?.cls ?? 'bg-slate-100 text-slate-600'}`}>
                      {STATUS[o.status]?.label ?? o.status}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {/* Top products */}
              <div className="bg-white rounded-xl border border-slate-100">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                  <h2 className="text-base font-semibold text-slate-900">Top Ürünler</h2>
                  <Link href="/admin/products" className="text-sm text-allorea-600 hover:text-allorea-700 flex items-center gap-1">
                    Tümü <ArrowRight size={13} />
                  </Link>
                </div>
                {data.topProducts.slice(0,5).map((p,i) => (
                  <div key={p.productId} className="flex items-center gap-3 px-6 py-3 border-b border-slate-50 last:border-0">
                    <span className="w-5 text-2xs text-slate-400 font-medium">#{i+1}</span>
                    <p className="text-sm text-slate-700 flex-1 truncate">{p.name}</p>
                    <span className="text-2xs font-medium bg-allorea-50 text-allorea-700 px-2 py-0.5 rounded-full">
                      {p._sum.quantity} adet
                    </span>
                  </div>
                ))}
              </div>

              {/* Low stock */}
              {data.lowStockProducts.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center gap-2 px-5 py-4 border-b border-amber-200">
                    <AlertTriangle size={15} className="text-amber-600" />
                    <h2 className="text-sm font-semibold text-amber-800">Düşük Stok Uyarısı</h2>
                  </div>
                  {data.lowStockProducts.slice(0,4).map(p => (
                    <Link key={p.id} href={`/admin/products/${p.id}`}
                      className="flex items-center justify-between px-5 py-2.5 border-b border-amber-100 last:border-0 hover:bg-amber-100 transition-colors">
                      <p className="text-sm text-amber-800 truncate flex-1">{p.name}</p>
                      <span className="text-xs font-bold text-amber-700 ml-2 shrink-0">{p.stock} kaldı</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
