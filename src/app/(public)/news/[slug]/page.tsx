import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('news_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!post) notFound()

  return (
    <div className="bg-[#faf8f3] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/news" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#2d5016] mb-8">
          <ArrowLeft size={16} /> Back to News
        </Link>

        {post.thumbnail_url && (
          <div className="aspect-[16/9] overflow-hidden mb-8">
            <img src={post.thumbnail_url} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="text-xs text-gray-400 mb-3">{formatDate(post.published_at || post.created_at)}</div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a3009] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
          {post.title_en || post.title}
        </h1>

        {post.excerpt_en && (
          <p className="text-lg text-gray-600 mb-8 border-l-4 border-[#b8963e] pl-5 italic">
            {post.excerpt_en}
          </p>
        )}

        {post.content_en && (
          <div className="prose prose-green max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.content_en}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-[#e8e0d0] text-center">
          <p className="text-gray-600 mb-6">Interested in our matcha products?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sample-order" className="btn-primary px-8 py-3">Order Samples</Link>
            <Link href="/quote" className="btn-gold px-8 py-3">Request Quote</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
