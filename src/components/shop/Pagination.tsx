'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  page: number; totalPages: number; onPageChange: (p: number) => void
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  const pages: (number | '…')[] = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (page > 3)       pages.push('…')
    for (let i = Math.max(2, page-1); i <= Math.min(totalPages-1, page+1); i++) pages.push(i)
    if (page < totalPages-2) pages.push('…')
    pages.push(totalPages)
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-14">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="w-9 h-9 flex items-center justify-center border border-mist text-obsidian/50 hover:border-obsidian hover:text-obsidian transition-all disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronLeft size={15} />
      </button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`e${i}`} className="w-9 h-9 flex items-center justify-center font-body text-sm text-obsidian/30">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            className={cn(
              'w-9 h-9 font-body text-sm transition-all',
              p === page
                ? 'bg-obsidian text-ivory border border-obsidian'
                : 'border border-mist text-obsidian/55 hover:border-obsidian hover:text-obsidian'
            )}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="w-9 h-9 flex items-center justify-center border border-mist text-obsidian/50 hover:border-obsidian hover:text-obsidian transition-all disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  )
}
