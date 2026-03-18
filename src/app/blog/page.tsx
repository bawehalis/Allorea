import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { BLOG_POSTS } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Güzellik Günlüğü | ALLOREA',
  description: 'Uzman güzellik ipuçları, içerik rehberleri ve ilham veren cilt bakım rutinleri.',
}

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS
  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <div className="bg-champagne/40 border-b border-mist/40">
        <div className="container-main py-14 text-center">
          <div className="section-subtitle mb-4">Güzellik Rehberi</div>
          <h1 className="display-lg text-obsidian">ALLOREA Günlüğü</h1>
          <div className="gold-line mt-6" />
        </div>
      </div>

      <div className="container-main py-14">
        {/* Featured */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-0 mb-14 overflow-hidden border border-mist/50 hover:shadow-luxury-lg transition-all duration-500">
            <div className="relative aspect-[4/3] lg:aspect-auto bg-champagne overflow-hidden">
              <Image src={featured.image || ''} alt={featured.title} fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
            <div className="p-10 lg:p-14 flex flex-col justify-center bg-white">
              <div className="flex flex-wrap gap-2 mb-5">
                {featured.tags?.slice(0,2).map(t => (
                  <span key={t} className="eyebrow">{t}</span>
                ))}
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-light text-obsidian leading-tight mb-4 group-hover:text-allorea-600 transition-colors">
                {featured.title}
              </h2>
              <p className="font-body text-base text-obsidian/55 leading-relaxed mb-8 line-clamp-3">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-sm font-medium text-obsidian">{featured.authorName}</p>
                  <p className="font-body text-xs text-obsidian/40 mt-0.5">
                    {featured.publishedAt ? formatDate(featured.publishedAt) : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2 font-body text-xs text-allorea-600 group-hover:gap-3 transition-all">
                  Oku <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`}
                className="group border border-mist/40 bg-white hover:shadow-luxury transition-all duration-500 overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden bg-champagne">
                  <Image src={post.image || ''} alt={post.title} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                </div>
                <div className="p-6">
                  {post.tags?.length > 0 && (
                    <span className="eyebrow block mb-3">{post.tags[0]}</span>
                  )}
                  <h3 className="font-display text-xl font-light text-obsidian group-hover:text-allorea-600 transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>
                  <p className="font-body text-sm text-obsidian/50 leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-mist/40">
                    <p className="font-body text-xs text-obsidian/40">{post.authorName}</p>
                    <p className="font-body text-xs text-obsidian/30">
                      {post.publishedAt ? formatDate(post.publishedAt) : ''}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
