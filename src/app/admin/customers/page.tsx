'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, RefreshCw, ChevronRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Customer {
  id: string; name?: string; email: string; role: string
  createdAt: string; _count?: { orders: number }
  orders?: { total: number }[]
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading,   setLoading]   = useState(true)
  const [search,    setSearch]    = useState('')

  useEffect(() => {
    fetch('/api/customers?limit=100')
      .then(r => r.json())
      .then(j => setCustomers(j.data ?? []))
      .finally(() => setLoading(false))
  }, [])

  const filtered = customers.filter(c =>
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.name ?? '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Müşteriler</h1>
          <p className="text-sm text-slate-500 mt-0.5">{customers.length} müşteri</p>
        </div>
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="search" placeholder="İsim veya e-posta ara…"
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-allorea-400/40" />
      </div>

      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Müşteri</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Kayıt Tarihi</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">Siparişler</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden lg:table-cell">Rol</th>
              <th className="text-right px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              [...Array(6)].map((_,i) => (
                <tr key={i}>
                  {[...Array(4)].map((_,j)=>(
                    <td key={j} className="px-4 py-4"><div className="h-4 bg-slate-100 rounded animate-pulse" /></td>
                  ))}
                  <td className="px-5 py-4"/>
                </tr>
              ))
            ) : filtered.map(c => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-allorea-100 flex items-center justify-center text-allorea-700 text-xs font-semibold shrink-0">
                      {(c.name ?? c.email)[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{c.name ?? '—'}</p>
                      <p className="text-xs text-slate-400">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 hidden sm:table-cell text-slate-500">{formatDate(c.createdAt)}</td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <span className="font-medium text-slate-900">{c._count?.orders ?? 0}</span>
                  <span className="text-slate-400 ml-1">sipariş</span>
                </td>
                <td className="px-4 py-4 hidden lg:table-cell">
                  <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full',
                    c.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600')}>
                    {c.role === 'ADMIN' ? 'Admin' : 'Müşteri'}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link href={`/admin/customers/${c.id}`} className="text-slate-400 hover:text-allorea-600 transition-colors">
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
