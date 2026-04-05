'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Save, Trash2, Eye, EyeOff, Edit } from 'lucide-react'
import { formatDate, slugify } from '@/lib/utils'
import type { NewsPost } from '@/types'

export default function AdminNewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<NewsPost | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [newForm, setNewForm] = useState({ title: '', title_en: '', slug: '', excerpt: '', excerpt_en: '', content: '', content_en: '', category: 'news', is_published: false })
  const supabase = createClient()

  const fetchPosts = async () => {
    const { data } = await supabase.from('news_posts').select('*').order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchPosts() }, [])

  const addPost = async () => {
    const { error } = await supabase.from('news_posts').insert({
      ...newForm,
      published_at: newForm.is_published ? new Date().toISOString() : null,
    })
    if (!error) { setShowNew(false); fetchPosts() }
  }

  const updatePost = async (post: NewsPost) => {
    await supabase.from('news_posts').update({
      ...post,
      published_at: post.is_published ? (post.published_at || new Date().toISOString()) : null,
    }).eq('id', post.id)
    setEditing(null)
    fetchPosts()
  }

  const deletePost = async (id: string) => {
    if (!confirm('削除しますか？')) return
    await supabase.from('news_posts').delete().eq('id', id)
    fetchPosts()
  }

  const togglePublish = async (post: NewsPost) => {
    await supabase.from('news_posts').update({
      is_published: !post.is_published,
      published_at: !post.is_published ? new Date().toISOString() : null,
    }).eq('id', post.id)
    fetchPosts()
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">ニュース管理</h1>
        <button onClick={() => setShowNew(!showNew)}
          className="btn-primary rounded-lg py-2 px-4 text-sm flex items-center gap-2">
          <Plus size={16} /> 新規投稿
        </button>
      </div>

      {showNew && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">新規ニュース</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">タイトル（日本語）</label>
              <input className="form-input" value={newForm.title}
                onChange={e => { setNewForm(f => ({ ...f, title: e.target.value, slug: slugify(e.target.value) })) }} />
            </div>
            <div>
              <label className="form-label">タイトル（英語）</label>
              <input className="form-input" value={newForm.title_en}
                onChange={e => setNewForm(f => ({ ...f, title_en: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="form-label">スラッグ</label>
            <input className="form-input font-mono text-sm" value={newForm.slug}
              onChange={e => setNewForm(f => ({ ...f, slug: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">概要（日本語）</label>
              <textarea className="form-input" rows={3} value={newForm.excerpt}
                onChange={e => setNewForm(f => ({ ...f, excerpt: e.target.value }))} />
            </div>
            <div>
              <label className="form-label">概要（英語）</label>
              <textarea className="form-input" rows={3} value={newForm.excerpt_en}
                onChange={e => setNewForm(f => ({ ...f, excerpt_en: e.target.value }))} />
            </div>
            <div>
              <label className="form-label">本文（日本語）</label>
              <textarea className="form-input" rows={6} value={newForm.content}
                onChange={e => setNewForm(f => ({ ...f, content: e.target.value }))} />
            </div>
            <div>
              <label className="form-label">本文（英語）</label>
              <textarea className="form-input" rows={6} value={newForm.content_en}
                onChange={e => setNewForm(f => ({ ...f, content_en: e.target.value }))} />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-green-700"
              checked={newForm.is_published}
              onChange={e => setNewForm(f => ({ ...f, is_published: e.target.checked }))} />
            <span className="text-sm font-medium text-gray-700">公開する</span>
          </label>
          <div className="flex gap-3">
            <button onClick={addPost} className="btn-primary rounded-lg py-2 px-4 text-sm flex items-center gap-2">
              <Save size={16} /> 投稿する
            </button>
            <button onClick={() => setShowNew(false)} className="btn-secondary rounded-lg py-2 px-4 text-sm">キャンセル</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-12 text-gray-400">読み込み中...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-100">ニュースがありません</div>
        ) : (
          posts.map(post => (
            <div key={post.id} className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 ${!post.is_published ? 'opacity-70' : ''}`}>
              {editing?.id === post.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">タイトル（日本語）</label>
                      <input className="form-input" value={editing.title}
                        onChange={e => setEditing(ed => ed ? { ...ed, title: e.target.value } : null)} />
                    </div>
                    <div>
                      <label className="form-label">タイトル（英語）</label>
                      <input className="form-input" value={editing.title_en || ''}
                        onChange={e => setEditing(ed => ed ? { ...ed, title_en: e.target.value } : null)} />
                    </div>
                    <div>
                      <label className="form-label">概要（日本語）</label>
                      <textarea className="form-input" rows={3} value={editing.excerpt || ''}
                        onChange={e => setEditing(ed => ed ? { ...ed, excerpt: e.target.value } : null)} />
                    </div>
                    <div>
                      <label className="form-label">概要（英語）</label>
                      <textarea className="form-input" rows={3} value={editing.excerpt_en || ''}
                        onChange={e => setEditing(ed => ed ? { ...ed, excerpt_en: e.target.value } : null)} />
                    </div>
                    <div>
                      <label className="form-label">本文（日本語）</label>
                      <textarea className="form-input" rows={8} value={editing.content || ''}
                        onChange={e => setEditing(ed => ed ? { ...ed, content: e.target.value } : null)} />
                    </div>
                    <div>
                      <label className="form-label">本文（英語）</label>
                      <textarea className="form-input" rows={8} value={editing.content_en || ''}
                        onChange={e => setEditing(ed => ed ? { ...ed, content_en: e.target.value } : null)} />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-green-700"
                      checked={editing.is_published}
                      onChange={e => setEditing(ed => ed ? { ...ed, is_published: e.target.checked } : null)} />
                    <span className="text-sm font-medium text-gray-700">公開する</span>
                  </label>
                  <div className="flex gap-3">
                    <button onClick={() => updatePost(editing)} className="btn-primary rounded-lg py-2 px-4 text-sm flex items-center gap-2">
                      <Save size={16} /> 保存
                    </button>
                    <button onClick={() => setEditing(null)} className="btn-secondary rounded-lg py-2 px-4 text-sm">キャンセル</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`badge text-xs ${post.is_published ? 'badge-green' : 'badge-gray'}`}>
                        {post.is_published ? '公開中' : '下書き'}
                      </span>
                      <span className="text-xs text-gray-400">{formatDate(post.created_at)}</span>
                    </div>
                    <div className="font-medium text-gray-900">{post.title}</div>
                    {post.title_en && <div className="text-sm text-gray-400">{post.title_en}</div>}
                    {post.excerpt && <div className="text-sm text-gray-600 mt-1 line-clamp-2">{post.excerpt}</div>}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => togglePublish(post)}
                      className={`p-1.5 rounded ${post.is_published ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'}`}>
                      {post.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button onClick={() => setEditing(post)} className="p-1.5 rounded text-blue-600 hover:bg-blue-50">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => deletePost(post.id)} className="p-1.5 rounded text-red-500 hover:bg-red-50">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
