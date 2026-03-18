'use client'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] bg-ivory flex flex-col items-center justify-center px-4 text-center">
      <p className="eyebrow mb-4">Bir Hata Oluştu</p>
      <h1 className="display-sm text-obsidian mb-4">Üzgünüz</h1>
      <p className="body-sm mb-8 max-w-sm">{error.message || 'Beklenmedik bir hata oluştu.'}</p>
      <div className="flex gap-3">
        <button onClick={reset} className="btn btn-primary py-3 px-7 text-xs">Tekrar Dene</button>
        <Link href="/" className="btn btn-outline py-3 px-7 text-xs">Ana Sayfa</Link>
      </div>
    </div>
  )
}
