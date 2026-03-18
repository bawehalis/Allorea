import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BLOG_POSTS } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find(p => p.slug === params.slug)
  if (!post) notFound()

  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero */}
      {post.image && (
        <div className="relative h-[50vh] lg:h-[60vh] bg-champagne overflow-hidden">
          <Image src={post.image} alt={post.title} fill
            className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-obsidian/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-main pb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags?.map(t => (
                <span key={t} className="font-body text-2xs tracking-[0.2em] uppercase text-white/70">{t}</span>
              ))}
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-light text-ivory leading-tight max-w-3xl">{post.title}</h1>
          </div>
        </div>
      )}

      <div className="container-main py-12">
        <div className="max-w-2xl mx-auto">
          {!post.image && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags?.map(t => <span key={t} className="eyebrow">{t}</span>)}
              </div>
              <h1 className="display-md text-obsidian">{post.title}</h1>
            </div>
          )}

          <div className="flex items-center justify-between py-5 border-y border-mist/40 mb-10">
            <div>
              <p className="font-body text-sm font-medium text-obsidian">{post.authorName}</p>
              <p className="font-body text-xs text-obsidian/40 mt-0.5">
                {post.publishedAt ? formatDate(post.publishedAt) : ''}
              </p>
            </div>
            <Link href="/blog" className="flex items-center gap-2 font-body text-xs text-obsidian/50 hover:text-allorea-600 transition-colors">
              <ArrowLeft size={13} /> Tüm Yazılar
            </Link>
          </div>

          <div className="prose-luxury">
            <p className="font-body text-lg text-obsidian/70 leading-relaxed mb-6 font-light italic">{post.excerpt}</p>
            <p className="font-body text-base text-obsidian/65 leading-relaxed">{post.content}</p>
          </div>

          <div className="mt-12 pt-8 border-t border-mist/40 text-center">
            <p className="body-sm mb-5">Daha fazla güzellik rehberi için:</p>
            <Link href="/blog" className="btn btn-outline py-3 px-8 text-xs">
              Tüm Yazıları Keşfet
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
