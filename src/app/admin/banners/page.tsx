'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Save, Trash2, Eye, EyeOff } from 'lucide-react'
import type { Banner } from '@/types'

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Banner | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [newForm, setNewForm] = useState({ title: '', title_en: '', subtitle: '', subtitle_en: '', image_url: '', link_url: '', link_text: '', link_text_en: '' })
  const supabase = createClient()

  const fetchBanners = async () => {
    const { data } = await supabase.from('banners').select('*').order('sort_order')
    setBanners(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchBanners() }, [])

  const addBanner = async () => {
    await supabase.from('banners').insert({ ...newForm, sort_order: banners.length })
    setShowNew(false)
    setNewForm({ title: '', title_en: '', subtitle: '', subtitle_en: '', image_url: '', link_url: '', link_text: '', link_text_en: '' })
    fetchBanners()
  }

  const updateBanner = async (banner: Banner) => {
    await supabase.from('banners').update(banner).eq('id', banner.id)
    setEditing(null)
    fetchBanners()
  }

  const deleteBanner = async (id: string) => {
    if (!confirm('削除しますか？')) return
    await supabase.from('banners').delete().eq('id', id)
    fetchBanners()
  }

  const toggleVisible = async (banner: Banner) => {
    await supabase.from('banners').update({ is_visible: !banner.is_visible }).eq('id', banner.id)
    fetchBanners()
  }

  const BannerForm = ({ form, onChange, onSave, onCancel }: any) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="form-label">タイトル</label><input className="form-input" value={form.title} onChange={e => onChange('title', e.target.value)} /></div>
        <div><label className="form-label">タイトル（英語）</label><input className="form-input" value={form.title_en} onChange={e => onChange('title_en', e.target.value)} /></div>
        <div><label className="form-label">サブタイトル</label><input className="form-input" value={form.subtitle} onChange={e => onChange('subtitle', e.target.value)} /></div>
        <div><label className="form-label">サブタイトル（英語）</label><input className="form-input" value={form.subtitle_en} onChange={e => onChange('subtitle_en', e.target.value)} /></div>
      </div>
      <div><label className="form-label">画像URL</label><input className="form-input" value={form.image_url} onChange={e => onChange('image_url', e.target.value)} placeholder="https://..." /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="form-label">リンク先URL</label><input className="form-input" value={form.link_url} onChange={e => onChange('link_url', e.target.value)} /></div>
        <div><label className="form-label">ボタンテキスト</label><input className="form-input" value={form.link_text} onChange={e => onChange('link_text', e.target.value)} /></div>
        <div><label className="form-label">ボタンテキスト（英語）</label><input className="form-input" value={form.link_text_en} onChange={e => onChange('link_text_en', e.target.value)} /></div>
      </div>
      <div className="flex gap-3">
        <button onClick={onSave} className="btn-primary rounded-lg py-2 px-4 text-sm flex items-center gap-2"><Save size={16} /> 保存</button>
        <button onClick={onCancel} className="btn-secondary rounded-lg py-2 px-4 text-sm">キャンセル</button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">バナー管理</h1>
        <button onClick={() => setShowNew(!showNew)} className="btn-primary rounded-lg py-2 px-4 text-sm flex items-center gap-2">
          <Plus size={16} /> バナー追加
        </button>
      </div>

      {showNew && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">新規バナー</h2>
          <BannerForm
            form={newForm}
            onChange={(k: string, v: string) => setNewForm(f => ({ ...f, [k]: v }))}
            onSave={addBanner}
            onCancel={() => setShowNew(false)}
          />
        </div>
      )}

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-12 text-gray-400">読み込み中...</div>
        ) : banners.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-100">バナーがありません</div>
        ) : (
          banners.map(banner => (
            <div key={banner.id} className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 ${!banner.is_visible ? 'opacity-60' : ''}`}>
              {editing?.id === banner.id ? (
                <BannerForm
                  form={editing}
                  onChange={(k: string, v: string) => setEditing(b => b ? { ...b, [k]: v } : null)}
                  onSave={() => updateBanner(editing)}
                  onCancel={() => setEditing(null)}
                />
              ) : (
                <div className="flex items-start gap-4">
                  {banner.image_url && (
                    <img src={banner.image_url} alt={banner.title || ''} className="w-24 h-16 object-cover rounded-lg flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{banner.title || '（タイトルなし）'}</div>
                    {banner.subtitle && <div className="text-sm text-gray-500">{banner.subtitle}</div>}
                    {banner.link_url && <div className="text-xs text-blue-600 mt-1">{banner.link_url}</div>}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => toggleVisible(banner)} className={`p-1.5 rounded ${banner.is_visible ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'}`}>
                      {banner.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button onClick={() => setEditing(banner)} className="p-1.5 rounded text-blue-600 hover:bg-blue-50 text-sm">編集</button>
                    <button onClick={() => deleteBanner(banner.id)} className="p-1.5 rounded text-red-500 hover:bg-red-50"><Trash2 size={16} /></button>
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
