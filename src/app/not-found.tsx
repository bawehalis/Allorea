import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-ivory flex flex-col items-center justify-center px-4 text-center">
      <p className="eyebrow mb-6">Sayfa Bulunamadı</p>
      <h1 className="font-display font-light text-obsidian leading-none mb-6"
        style={{ fontSize:'clamp(5rem,18vw,14rem)' }}>
        404
      </h1>
      <div className="gold-line mb-8" />
      <p className="font-body text-base text-obsidian/50 max-w-sm mb-10">
        Aradığınız sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/"    className="btn btn-primary gap-2 py-4 px-8">Ana Sayfa <ArrowRight size={16}/></Link>
        <Link href="/shop" className="btn btn-outline gap-2 py-4 px-8">Mağaza</Link>
      </div>
    </div>
  )
}
