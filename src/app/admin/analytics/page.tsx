'use client'
import { useState, useEffect } from 'react'
import { RefreshCw, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Data {
  summary: { totalRevenue:number; totalOrders:number; totalCustomers:number; revenueGrowth:number; ordersGrowth:number; averageOrderValue:number; newCustomers:number }
  dailyRevenue: { date:string; revenue:number }[]
  topProducts: { productId:string; name:string; _sum:{ quantity:number } }[]
  ordersByStatus: { status:string; _count:{ id:number } }[]
}

const STATUS_LABELS: Record<string,string> = {
  PENDING:'Beklemede',CONFIRMED:'Onaylandı',PROCESSING:'Hazırlanıyor',
  SHIPPED:'Kargoda',DELIVERED:'Teslim',CANCELLED:'İptal',REFUNDED:'İade',
}

export default function AdminAnalyticsPage() {
  const [data,    setData]    = useState<Data|null>(null)
  const [loading, setLoading] = useState(true)
  const [range,   setRange]   = useState('30')

  const load = async () => {
    setLoading(true)
    try {
      const r = await fetch(`/api/analytics?range=${range}`)
      const j = await r.json()
      setData(j.data)
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [range])

  const maxRev = data?.dailyRevenue ? Math.max(...data.dailyRevenue.map(d=>d.revenue),1) : 1
  const totalOrders = data?.ordersByStatus.reduce((s,o)=>s+o._count.id,0) ?? 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Analitik</h1>
          <p className="text-sm text-slate-500 mt-0.5">Mağaza performans raporu</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={range} onChange={e=>setRange(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-allorea-400/40">
            <option value="7">Son 7 gün</option>
            <option value="30">Son 30 gün</option>
            <option value="90">Son 90 gün</option>
          </select>
          <button onClick={load} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
            <RefreshCw size={15} className={cn('text-slate-400',loading&&'animate-spin')} />
          </button>
        </div>
      </div>

      {!data ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_,i) => <div key={i} className="bg-white rounded-xl border border-slate-100 p-5 h-28 animate-pulse" />)}
        </div>
      ) : (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title:'Toplam Gelir',   value:`${data.summary.totalRevenue.toLocaleString('tr-TR')}₺`, change:data.summary.revenueGrowth, icon:DollarSign, color:'text-green-600', bg:'bg-green-50' },
              { title:'Sipariş Sayısı', value:data.summary.totalOrders, change:data.summary.ordersGrowth, icon:ShoppingCart, color:'text-blue-600', bg:'bg-blue-50' },
              { title:'Ort. Sepet',     value:`${data.summary.averageOrderValue.toLocaleString('tr-TR')}₺`, icon:Activity, color:'text-purple-600', bg:'bg-purple-50' },
              { title:'Yeni Müşteriler',value:`+${data.summary.newCustomers}`, icon:Users, color:'text-orange-600', bg:'bg-orange-50' },
            ].map(card => (
              <div key={card.title} className="bg-white border border-slate-100 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{card.title}</p>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.bg}`}>
                    <card.icon size={16} className={card.color} />
                  </div>
                </div>
                <p className="text-2xl font-semibold text-slate-900">{card.value}</p>
                {card.change !== undefined && (
                  <div className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${(card.change ?? 0) >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {(card.change ?? 0) >= 0 ? <TrendingUp size={13}/> : <TrendingDown size={13}/>}
                    {Math.abs(card.change ?? 0)}%
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Revenue chart */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 p-6">
              <h2 className="text-sm font-semibold text-slate-900 mb-5">Günlük Gelir Trendi</h2>
              <div className="flex items-end gap-0.5 h-48">
                {data.dailyRevenue.slice(-30).map(d => (
                  <div key={d.date} className="flex-1 group relative">
                    <div
                      className="w-full bg-allorea-200 hover:bg-allorea-500 transition-colors rounded-t-sm"
                      style={{ height:`${Math.max(4,(d.revenue/maxRev)*176)}px` }}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-slate-800 text-white text-2xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-10">
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

            {/* Order status pie-ish */}
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <h2 className="text-sm font-semibold text-slate-900 mb-5">Sipariş Dağılımı</h2>
              <div className="space-y-3">
                {data.ordersByStatus.map(({ status, _count }) => {
                  const pct = totalOrders > 0 ? (_count.id/totalOrders)*100 : 0
                  return (
                    <div key={status}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-600">{STATUS_LABELS[status] ?? status}</span>
                        <span className="text-xs font-semibold text-slate-800">{_count.id}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-allorea-400 rounded-full transition-all" style={{ width:`${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Top products */}
          <div className="bg-white rounded-xl border border-slate-100 p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">En Çok Satan Ürünler</h2>
            <div className="space-y-3">
              {data.topProducts.slice(0,8).map((p,i) => {
                const max = data.topProducts[0]?._sum.quantity ?? 1
                const pct = (p._sum.quantity / max) * 100
                return (
                  <div key={p.productId} className="flex items-center gap-4">
                    <span className="w-5 text-xs text-slate-400 font-medium shrink-0">#{i+1}</span>
                    <span className="flex-1 text-sm text-slate-700 truncate min-w-0">{p.name}</span>
                    <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                      <div className="h-full bg-allorea-400 rounded-full" style={{ width:`${pct}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-slate-800 w-12 text-right shrink-0">{p._sum.quantity} adet</span>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
