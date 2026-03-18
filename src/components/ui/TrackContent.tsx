'use client'
import { useState } from 'react'
import { Search, Package, Truck, CheckCircle, Clock, X, ChevronRight } from 'lucide-react'

const STATUS_STEPS = [
  { key:'PENDING',    label:'Sipariş Alındı',   icon:Clock },
  { key:'PROCESSING', label:'Hazırlanıyor',      icon:Package },
  { key:'SHIPPED',    label:'Kargoya Verildi',   icon:Truck },
  { key:'DELIVERED',  label:'Teslim Edildi',     icon:CheckCircle },
]

interface OrderData {
  orderNumber: string; status: string; createdAt: string
  total: number; email: string
  items: { name: string; quantity: number; price: number; image?: string }[]
  address?: { firstName: string; lastName: string; address1: string; city: string }
}

export default function TrackContent() {
  const [query, setQuery]   = useState('')
  const [loading, setLoading] = useState(false)
  const [order, setOrder]   = useState<OrderData | null>(null)
  const [error, setError]   = useState('')

  const search = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setError('')
    setOrder(null)
    try {
      const res  = await fetch(`/api/orders?orderNumber=${encodeURIComponent(query.trim())}`)
      const json = await res.json()
      if (!res.ok || !json.data?.length) { setError('Sipariş bulunamadı.'); return }
      setOrder(json.data[0])
    } catch { setError('Bir hata oluştu. Lütfen tekrar deneyin.') }
    finally { setLoading(false) }
  }

  const currentStep = STATUS_STEPS.findIndex(s => s.key === order?.status)

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <div className="bg-champagne/40 border-b border-mist/40">
        <div className="container-main py-14 text-center">
          <div className="section-subtitle mb-3">Lojistik</div>
          <h1 className="display-md text-obsidian">Sipariş Takibi</h1>
          <div className="gold-line mt-6" />
        </div>
      </div>

      <div className="container-main py-14 max-w-2xl">
        {/* Search form */}
        <form onSubmit={search} className="mb-10">
          <p className="font-body text-sm text-obsidian/55 mb-4">
            Sipariş numaranızı veya e-posta adresinizi girin.
          </p>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-obsidian/35" />
              <input
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setError('') }}
                placeholder="ALR-XXXXX veya e-posta"
                className="input-field pl-11"
              />
            </div>
            <button type="submit" disabled={loading || !query.trim()}
              className="btn btn-primary px-7 py-3.5 text-xs disabled:opacity-60">
              {loading ? '…' : 'Ara'}
            </button>
          </div>
          {error && (
            <div className="flex items-center gap-2 mt-3 text-red-600">
              <X size={14}/><p className="font-body text-sm">{error}</p>
            </div>
          )}
        </form>

        {/* Result */}
        {order && (
          <div className="space-y-6 animate-fade-up">
            {/* Order header */}
            <div className="bg-white border border-mist/40 p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="eyebrow mb-1">Sipariş Numarası</p>
                  <p className="font-display text-xl font-light text-obsidian">{order.orderNumber}</p>
                </div>
                <div className="text-right">
                  <p className="eyebrow mb-1">Toplam</p>
                  <p className="font-body text-lg font-semibold text-obsidian">
                    {order.total.toLocaleString('tr-TR')}₺
                  </p>
                </div>
              </div>

              {/* Progress steps */}
              <div className="flex items-center gap-0">
                {STATUS_STEPS.map((step, i) => {
                  const done    = i <= currentStep
                  const current = i === currentStep
                  return (
                    <div key={step.key} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                          ${done
                            ? current
                              ? 'border-allorea-500 bg-allorea-500 text-ivory'
                              : 'border-allorea-300 bg-allorea-100 text-allorea-600'
                            : 'border-mist bg-white text-obsidian/25'
                          }`}>
                          <step.icon size={16} />
                        </div>
                        <p className={`font-body text-2xs text-center leading-tight w-16
                          ${done ? 'text-allorea-600 font-medium' : 'text-obsidian/35'}`}>
                          {step.label}
                        </p>
                      </div>
                      {i < STATUS_STEPS.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-1 mb-5 transition-all ${i < currentStep ? 'bg-allorea-300' : 'bg-mist'}`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Order items */}
            {order.items?.length > 0 && (
              <div className="bg-white border border-mist/40">
                <p className="font-body text-2xs text-obsidian/40 tracking-[0.2em] uppercase px-6 py-4 border-b border-mist/30">
                  Ürünler
                </p>
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-mist/20 last:border-0">
                    {item.image && (
                      <div className="w-12 h-14 bg-champagne shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-medium text-obsidian truncate">{item.name}</p>
                      <p className="font-body text-xs text-obsidian/45 mt-0.5">{item.quantity} adet</p>
                    </div>
                    <p className="font-body text-sm font-semibold text-obsidian shrink-0">
                      {(item.price * item.quantity).toLocaleString('tr-TR')}₺
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Delivery address */}
            {order.address && (
              <div className="bg-champagne/30 border border-mist/40 p-6">
                <p className="eyebrow mb-3">Teslimat Adresi</p>
                <p className="font-body text-sm text-obsidian/70">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="font-body text-sm text-obsidian/55">{order.address.address1}</p>
                <p className="font-body text-sm text-obsidian/55">{order.address.city}</p>
              </div>
            )}
          </div>
        )}

        {/* Help */}
        {!order && !loading && (
          <div className="text-center pt-4 border-t border-mist/30">
            <p className="body-sm mb-3">Siparişinizi bulamadınız mı?</p>
            <a href="mailto:hello@allorea-cosmetics.com"
              className="font-body text-sm text-allorea-600 hover:text-allorea-700 transition-colors">
              hello@allorea-cosmetics.com
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
