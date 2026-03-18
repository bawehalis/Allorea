'use client'
import { useState, useEffect } from 'react'
import { RefreshCw, AlertTriangle, Save } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InvItem {
  id: string; name: string; sku: string; stock: number; lowStockAt: number; category: { name: string }
}

export default function AdminInventoryPage() {
  const [items,   setItems]   = useState<InvItem[]>([])
  const [loading, setLoading] = useState(true)
  const [edits,   setEdits]   = useState<Record<string,string>>({})
  const [saving,  setSaving]  = useState<string|null>(null)

  useEffect(() => {
    fetch('/api/inventory')
      .then(r => r.json())
      .then(j => setItems(j.data ?? []))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async (id: string) => {
    const stock = parseInt(edits[id] ?? '', 10)
    if (isNaN(stock) || stock < 0) return
    setSaving(id)
    try {
      const r = await fetch('/api/inventory', {
        method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id, stock }),
      })
      if (r.ok) {
        setItems(prev => prev.map(i => i.id === id ? { ...i, stock } : i))
        setEdits(p => { const n = {...p}; delete n[id]; return n })
      }
    } finally { setSaving(null) }
  }

  const low = items.filter(i => i.stock <= i.lowStockAt)

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Stok Yönetimi</h1>
          <p className="text-sm text-slate-500 mt-0.5">{items.length} ürün</p>
        </div>
        <button onClick={() => { setLoading(true); fetch('/api/inventory').then(r=>r.json()).then(j=>setItems(j.data??[])).finally(()=>setLoading(false)) }}
          className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
          <RefreshCw size={15} className={cn('text-slate-400', loading && 'animate-spin')} />
        </button>
      </div>

      {/* Low stock alert */}
      {low.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-amber-600" />
            <span className="text-sm font-semibold text-amber-800">{low.length} ürün düşük stokta</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {low.map(i => (
              <span key={i.id} className="text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                {i.name} ({i.stock} adet)
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Ürün</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">Kategori</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Mevcut Stok</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Uyarı Limiti</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Güncelle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              [...Array(6)].map((_,i) => (
                <tr key={i}>{[...Array(5)].map((_,j)=>(
                  <td key={j} className="px-4 py-4"><div className="h-4 bg-slate-100 rounded animate-pulse" /></td>
                ))}</tr>
              ))
            ) : items.map(item => {
              const isLow   = item.stock <= item.lowStockAt
              const hasEdit = edits[item.id] !== undefined
              return (
                <tr key={item.id} className={cn('hover:bg-slate-50 transition-colors', isLow && 'bg-amber-50/40')}>
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-900 truncate max-w-[180px]">{item.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">SKU: {item.sku}</p>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell text-slate-500">{item.category?.name}</td>
                  <td className="px-4 py-4">
                    <span className={cn('text-base font-semibold', isLow ? 'text-amber-600' : 'text-slate-900')}>
                      {item.stock}
                    </span>
                    {isLow && <span className="ml-2 text-xs text-amber-500">⚠ Düşük</span>}
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell text-slate-500">{item.lowStockAt}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number" min="0"
                        value={edits[item.id] ?? ''}
                        onChange={e => setEdits(p => ({ ...p, [item.id]:e.target.value }))}
                        placeholder={String(item.stock)}
                        className="w-20 border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-allorea-400/40"
                      />
                      {hasEdit && (
                        <button onClick={() => handleSave(item.id)} disabled={saving === item.id}
                          className="flex items-center gap-1 bg-allorea-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-allorea-700 transition-colors disabled:opacity-50">
                          <Save size={12} /> {saving === item.id ? '…' : 'Kaydet'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
