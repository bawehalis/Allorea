'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2, Tag, Copy, Check } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Coupon {
  id: string; code: string; type: string; value: number
  minPurchase?: number; maxUses?: number; usedCount: number
  expiresAt?: string; isActive: boolean; createdAt: string
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [copied, setCopied] = useState<string|null>(null)
  const [form, setForm] = useState({
    code:'', type:'PERCENTAGE', value:10, minPurchase:'', maxUses:'', expiresAt:''
  })

  useEffect(() => {
    fetch('/api/coupons')
      .then(r => r.json())
      .then(j => setCoupons(j.data ?? []))
      .finally(() => setLoading(false))
  }, [])

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleCreate = async () => {
    setCreating(true)
    try {
      const body = {
        code: form.code.toUpperCase(), type: form.type, value: Number(form.value),
        minPurchase: form.minPurchase ? Number(form.minPurchase) : undefined,
        maxUses: form.maxUses ? Number(form.maxUses) : undefined,
        expiresAt: form.expiresAt || undefined,
      }
      const r = await fetch('/api/coupons', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) })
      const j = await r.json()
      if (r.ok) {
        setCoupons(c => [j.data, ...c])
        setForm({ code:'', type:'PERCENTAGE', value:10, minPurchase:'', maxUses:'', expiresAt:'' })
      }
    } finally { setCreating(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu kuponu silmek istediğinizden emin misiniz?')) return
    await fetch(`/api/coupons/${id}`, { method:'DELETE' })
    setCoupons(c => c.filter(x => x.id !== id))
  }

  const up = (k: string, v: string) => setForm(p => ({ ...p, [k]:v }))

  return (
    <div className="space-y-5 max-w-4xl">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Kuponlar</h1>
        <p className="text-sm text-slate-500 mt-0.5">{coupons.length} kupon tanımlı</p>
      </div>

      {/* Create form */}
      <div className="bg-white rounded-xl border border-slate-100 p-6">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">Yeni Kupon</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Kupon Kodu</label>
            <input value={form.code} onChange={e => up('code', e.target.value.toUpperCase())}
              placeholder="ALLOREA20"
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-allorea-400/40 font-mono" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Tür</label>
            <select value={form.type} onChange={e => up('type', e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-allorea-400/40">
              <option value="PERCENTAGE">Yüzde (%)</option>
              <option value="FIXED">Sabit (₺)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Değer</label>
            <input type="number" value={form.value} onChange={e => up('value', e.target.value)}
              min="1" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-allorea-400/40" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Min. Tutar (₺)</label>
            <input type="number" value={form.minPurchase} onChange={e => up('minPurchase', e.target.value)}
              placeholder="0" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-allorea-400/40" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Max. Kullanım</label>
            <input type="number" value={form.maxUses} onChange={e => up('maxUses', e.target.value)}
              placeholder="Sınırsız" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-allorea-400/40" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Son Kullanım</label>
            <input type="date" value={form.expiresAt} onChange={e => up('expiresAt', e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-allorea-400/40" />
          </div>
        </div>
        <button onClick={handleCreate} disabled={creating || !form.code}
          className="flex items-center gap-2 bg-allorea-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-allorea-700 transition-colors disabled:opacity-50">
          <Plus size={15} /> {creating ? 'Oluşturuluyor…' : 'Kupon Oluştur'}
        </button>
      </div>

      {/* Coupons list */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Kod</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">İndirim</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">Kullanım</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden lg:table-cell">Son Tarih</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Durum</th>
              <th className="text-right px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {coupons.map(c => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-slate-900">{c.code}</span>
                    <button onClick={() => copyCode(c.code)} className="p-1 text-slate-400 hover:text-allorea-600 transition-colors">
                      {copied === c.code ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-4 font-medium text-slate-900">
                  {c.type === 'PERCENTAGE' ? `%${c.value}` : `${c.value}₺`}
                  {c.minPurchase && <span className="text-xs text-slate-400 ml-1">(min {c.minPurchase}₺)</span>}
                </td>
                <td className="px-4 py-4 hidden md:table-cell text-slate-600">
                  {c.usedCount}{c.maxUses ? `/${c.maxUses}` : ''} kez
                </td>
                <td className="px-4 py-4 hidden lg:table-cell text-slate-500">
                  {c.expiresAt ? formatDate(c.expiresAt) : '—'}
                </td>
                <td className="px-4 py-4">
                  <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full',
                    c.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500')}>
                    {c.isActive ? 'Aktif' : 'Pasif'}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <button onClick={() => handleDelete(c.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
