import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'

export const metadata = { title: 'News - Matcha OEM' }

export default async function NewsPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('news_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  return (
    <>
      <div className="bg-[#1a3009] py-20 text-center px-6">
        <div className="text-xs text-[#b8963e] tracking-widest mb-3">NEWS & BLOG</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Latest News
        </h1>
        <p className="text-green-200">Updates, insights, and matcha knowledge from our team.</p>
      </div>

      <section className="section-padding bg-[#faf8f3]">
        <div className="container-xl max-w-4xl">
          {!posts || posts.length === 0 ? (
            <div className="text-center py-16 text-gray-400">No news articles yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map(post => (
                <Link key={post.id} href={`/news/${post.slug}`}
                  className="bg-white border border-gray-200 hover:border-[#2d5016] hover:shadow-md transition-all group">
                  {post.thumbnail_url && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={post.thumbnail_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-xs text-gray-400 mb-2">{formatDate(post.published_at || post.created_at)}</div>
                    <h2 className="font-bold text-[#1a3009] text-lg mb-2 group-hover:text-[#2d5016] transition-colors" style={{ fontFamily: 'var(--font-serif)' }}>
                      {post.title_en || post.title}
                    </h2>
                    {post.excerpt_en && <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt_en}</p>}
                    <div className="mt-4 text-[#2d5016] text-sm font-medium">Read more →</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
