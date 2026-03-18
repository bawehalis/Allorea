'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Package, Truck, CheckCircle, Clock, RefreshCw, XCircle } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface OrderDetail {
  id: string; orderNumber: string; email: string; status: string
  paymentStatus: string; paymentMethod?: string; total: number; subtotal: number
  shipping: number; tax: number; discount: number
  createdAt: string; notes?: string
  items: { id:string; name:string; price:number; quantity:number; image?:string; bundleLabel?:string }[]
  address?: { firstName:string; lastName:string; address1:string; address2?:string; city:string; state:string; postalCode:string; country:string; phone?:string }
  user?: { name?:string; email:string }
}

const STATUS_OPTS = ['PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELLED','REFUNDED']
const STATUS_COLORS: Record<string,string> = {
  PENDING:'bg-amber-100 text-amber-700', CONFIRMED:'bg-blue-100 text-blue-700',
  PROCESSING:'bg-purple-100 text-purple-700', SHIPPED:'bg-indigo-100 text-indigo-700',
  DELIVERED:'bg-green-100 text-green-700', CANCELLED:'bg-red-100 text-red-700',
  REFUNDED:'bg-slate-100 text-slate-600',
}
const STATUS_LABELS: Record<string,string> = {
  PENDING:'Beklemede', CONFIRMED:'Onaylandı', PROCESSING:'Hazırlanıyor',
  SHIPPED:'Kargoda', DELIVERED:'Teslim Edildi', CANCELLED:'İptal', REFUNDED:'İade',
}

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const [order,   setOrder]   = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating,setUpdating]= useState(false)

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then(r => r.json())
      .then(j => setOrder(j.data))
      .finally(() => setLoading(false))
  }, [params.id])

  const updateStatus = async (status: string) => {
    if (!order) return
    setUpdating(true)
    try {
      const r = await fetch(`/api/orders/${params.id}`, {
        method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ status }),
      })
      if (r.ok) setOrder(o => o ? { ...o, status } : o)
    } finally { setUpdating(false) }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <RefreshCw size={20} className="animate-spin text-slate-400" />
    </div>
  )
  if (!order) return <div className="text-slate-500 text-sm">Sipariş bulunamadı.</div>

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Back + header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/orders" className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{order.orderNumber}</h1>
          <p className="text-sm text-slate-500 mt-0.5">{formatDate(order.createdAt)}</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className={cn('text-xs font-medium px-2.5 py-1.5 rounded-full', STATUS_COLORS[order.status] ?? 'bg-slate-100 text-slate-600')}>
            {STATUS_LABELS[order.status] ?? order.status}
          </span>
          <select value={order.status} onChange={e => updateStatus(e.target.value)}
            disabled={updating}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-allorea-400/40 disabled:opacity-50">
            {STATUS_OPTS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left — items + timeline */}
        <div className="lg:col-span-2 space-y-5">
          {/* Items */}
          <div className="bg-white rounded-xl border border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900 px-5 py-4 border-b border-slate-100">
              Ürünler ({order.items.length})
            </h2>
            {order.items.map(item => (
              <div key={item.id} className="flex items-center gap-4 px-5 py-4 border-b border-slate-50 last:border-0">
                <div className="w-12 h-14 bg-slate-100 rounded overflow-hidden shrink-0">
                  {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
                  {item.bundleLabel && <p className="text-xs text-slate-400 mt-0.5">{item.bundleLabel}</p>}
                  <p className="text-xs text-slate-400 mt-0.5">{item.quantity} adet × {item.price.toLocaleString('tr-TR')}₺</p>
                </div>
                <p className="text-sm font-semibold text-slate-900 shrink-0">
                  {(item.price * item.quantity).toLocaleString('tr-TR')}₺
                </p>
              </div>
            ))}
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs font-medium text-amber-700 mb-1 uppercase tracking-wider">Müşteri Notu</p>
              <p className="text-sm text-amber-800">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Right — summary + address */}
        <div className="space-y-5">
          {/* Order summary */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Özet</h2>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Ara Toplam</span><span className="text-slate-900">{order.subtotal.toLocaleString('tr-TR')}₺</span></div>
              {order.discount > 0 && <div className="flex justify-between text-allorea-600"><span>İndirim</span><span>-{order.discount.toLocaleString('tr-TR')}₺</span></div>}
              <div className="flex justify-between"><span className="text-slate-500">Kargo</span><span className="text-slate-900">{order.shipping === 0 ? 'Ücretsiz' : `${order.shipping.toLocaleString('tr-TR')}₺`}</span></div>
              {order.tax > 0 && <div className="flex justify-between"><span className="text-slate-500">KDV</span><span className="text-slate-900">{order.tax.toLocaleString('tr-TR')}₺</span></div>}
              <div className="flex justify-between font-semibold text-base pt-3 border-t border-slate-100">
                <span className="text-slate-900">Toplam</span>
                <span className="text-slate-900">{order.total.toLocaleString('tr-TR')}₺</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Ödeme Durumu</span>
                <span className={cn('font-medium', order.paymentStatus === 'PAID' ? 'text-green-600' : 'text-amber-600')}>
                  {order.paymentStatus === 'PAID' ? 'Ödendi' : 'Bekliyor'}
                </span>
              </div>
              {order.paymentMethod && (
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Ödeme Yöntemi</span>
                  <span className="text-slate-700 capitalize">{order.paymentMethod === 'cod' ? 'Kapıda Ödeme' : order.paymentMethod === 'whatsapp' ? 'WhatsApp' : 'Kart'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Customer */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Müşteri</h2>
            <p className="text-sm font-medium text-slate-900">{order.user?.name ?? '—'}</p>
            <p className="text-sm text-slate-500 mt-0.5">{order.email}</p>
          </div>

          {/* Address */}
          {order.address && (
            <div className="bg-white rounded-xl border border-slate-100 p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-3">Teslimat Adresi</h2>
              <div className="text-sm text-slate-600 space-y-0.5">
                <p className="font-medium text-slate-900">{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.address1}</p>
                {order.address.address2 && <p>{order.address.address2}</p>}
                <p>{order.address.city}, {order.address.state} {order.address.postalCode}</p>
                <p>{order.address.country}</p>
                {order.address.phone && <p className="text-slate-500 mt-1">{order.address.phone}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
