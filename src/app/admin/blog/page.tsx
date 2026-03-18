'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Post {
  id: string; title: string; slug: string; authorName: string
  isPublished: boolean; publishedAt?: string; createdAt: string
  tags: string[]
}

export default function AdminBlogPage() {
  const [posts,   setPosts]   = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog?limit=100')
      .then(r => r.json())
      .then(j => setPosts(j.data ?? []))
      .finally(() => setLoading(false))
  }, [])

  const togglePublish = async (post: Post) => {
    const r = await fetch(`/api/blog/${post.id}`, {
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ isPublished:!post.isPublished }),
    })
    if (r.ok) setPosts(p => p.map(x => x.id === post.id ? { ...x, isPublished:!x.isPublished } : x))
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) return
    await fetch(`/api/blog/${id}`, { method:'DELETE' })
    setPosts(p => p.filter(x => x.id !== id))
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Blog</h1>
          <p className="text-sm text-slate-500 mt-0.5">{posts.length} yazı</p>
        </div>
        <Link href="/admin/blog/new"
          className="flex items-center gap-2 bg-allorea-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-allorea-700 transition-colors">
          <Plus size={15} /> Yeni Yazı
        </Link>
      </div>

      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Başlık</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">Yazar</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Tarih</th>
              <th className="text-left px-4 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Durum</th>
              <th className="text-right px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              [...Array(4)].map((_,i)=>(
                <tr key={i}>{[...Array(4)].map((_,j)=>(
                  <td key={j} className="px-4 py-4"><div className="h-4 bg-slate-100 rounded animate-pulse"/></td>
                ))}<td className="px-5 py-4"/></tr>
              ))
            ) : posts.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-400 text-sm">Henüz yazı yok</td></tr>
            ) : posts.map(p => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <p className="font-medium text-slate-900 truncate max-w-[220px]">{p.title}</p>
                  {p.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {p.tags.slice(0,2).map(t => (
                        <span key={t} className="text-2xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-4 py-4 hidden md:table-cell text-slate-500">{p.authorName}</td>
                <td className="px-4 py-4 hidden sm:table-cell text-slate-500">
                  {p.publishedAt ? formatDate(p.publishedAt) : formatDate(p.createdAt)}
                </td>
                <td className="px-4 py-4">
                  <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full',
                    p.isPublished ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500')}>
                    {p.isPublished ? 'Yayında' : 'Taslak'}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    <button onClick={() => togglePublish(p)} title={p.isPublished ? 'Yayından Kaldır' : 'Yayınla'}
                      className="p-1.5 text-slate-400 hover:text-allorea-600 hover:bg-allorea-50 rounded transition-colors">
                      {p.isPublished ? <EyeOff size={14}/> : <Eye size={14}/>}
                    </button>
                    <Link href={`/admin/blog/${p.id}`}
                      className="p-1.5 text-slate-400 hover:text-allorea-600 hover:bg-allorea-50 rounded transition-colors">
                      <Edit2 size={14}/>
                    </Link>
                    <button onClick={() => handleDelete(p.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                      <Trash2 size={14}/>
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
