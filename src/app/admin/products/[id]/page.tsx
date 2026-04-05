'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import { slugify } from '@/lib/utils'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const supabase = createClient()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '', name_en: '', slug: '', line: 'premium',
    grade: '', grade_label: '', grade_label_en: '',
    description: '', description_en: '', moq: 1, packaging: '',
    origin: '京都府宇治・愛知県西尾', usage_suggestions: '', usage_suggestions_en: '',
    sample_price_usd: '', inquiry_type: 'both',
    is_recommended: false, is_visible: true, sort_order: 0,
  })

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('products').select('*').eq('id', id).single()
      if (data) {
        setForm({
          ...data,
          sample_price_usd: data.sample_price_usd?.toString() || '',
        })
      }
      setLoading(false)
    }
    fetch()
  }, [id])

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const { error } = await supabase.from('products').update({
      ...form,
      sample_price_usd: form.sample_price_usd ? parseFloat(form.sample_price_usd) : null,
      moq: parseInt(String(form.moq)) || 1,
      sort_order: parseInt(String(form.sort_order)) || 0,
    }).eq('id', id)

    if (error) { setError(error.message); setSaving(false); return }
    router.push('/admin/products')
  }

  const handleDelete = async () => {
    if (!confirm('この商品を削除しますか？')) return
    await supabase.from('products').delete().eq('id', id)
    router.push('/admin/products')
  }

  if (loading) return <div className="text-center py-12 text-gray-400">読み込み中...</div>

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="text-gray-500 hover:text-gray-700"><ArrowLeft size={20} /></Link>
          <h1 className="text-2xl font-bold text-gray-900">商品編集</h1>
        </div>
        <button onClick={handleDelete} className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm">
          <Trash2 size={16} /> 削除
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 border-b pb-2">基本情報</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">商品名 <span className="text-red-500">*</span></label>
              <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} required />
            </div>
            <div>
              <label className="form-label">英語名</label>
              <input className="form-input" value={form.name_en} onChange={e => set('name_en', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">スラッグ <span className="text-red-500">*</span></label>
              <input className="form-input font-mono text-sm" value={form.slug} onChange={e => set('slug', e.target.value)} required />
            </div>
            <div>
              <label className="form-label">並び順</label>
              <input type="number" className="form-input" value={form.sort_order} onChange={e => set('sort_order', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="form-label">ライン</label>
              <select className="form-input" value={form.line} onChange={e => set('line', e.target.value)}>
                <option value="premium">プレミアム</option>
                <option value="standard">スタンダード</option>
                <option value="organic">オーガニック</option>
              </select>
            </div>
            <div>
              <label className="form-label">グレード記号</label>
              <input className="form-input font-mono" value={form.grade} onChange={e => set('grade', e.target.value)} required />
            </div>
            <div>
              <label className="form-label">グレードラベル</label>
              <input className="form-input" value={form.grade_label} onChange={e => set('grade_label', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="form-label">グレードラベル（英語）</label>
            <input className="form-input" value={form.grade_label_en} onChange={e => set('grade_label_en', e.target.value)} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 border-b pb-2">説明・用途</h2>
          <div>
            <label className="form-label">商品説明（日本語）</label>
            <textarea className="form-input" rows={4} value={form.description} onChange={e => set('description', e.target.value)} />
          </div>
          <div>
            <label className="form-label">商品説明（英語）</label>
            <textarea className="form-input" rows={4} value={form.description_en} onChange={e => set('description_en', e.target.value)} />
          </div>
          <div>
            <label className="form-label">用途提案（日本語）</label>
            <textarea className="form-input" rows={3} value={form.usage_suggestions} onChange={e => set('usage_suggestions', e.target.value)} />
          </div>
          <div>
            <label className="form-label">用途提案（英語）</label>
            <textarea className="form-input" rows={3} value={form.usage_suggestions_en} onChange={e => set('usage_suggestions_en', e.target.value)} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 border-b pb-2">価格・販売設定</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="form-label">サンプル価格（USD/100g）</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" step="0.01" className="form-input pl-7" value={form.sample_price_usd} onChange={e => set('sample_price_usd', e.target.value)} />
              </div>
            </div>
            <div>
              <label className="form-label">MOQ (kg)</label>
              <input type="number" className="form-input" value={form.moq} onChange={e => set('moq', e.target.value)} min={1} />
            </div>
            <div>
              <label className="form-label">販売タイプ</label>
              <select className="form-input" value={form.inquiry_type} onChange={e => set('inquiry_type', e.target.value)}>
                <option value="both">注文・問い合わせ両方</option>
                <option value="order">注文のみ</option>
                <option value="inquiry">問い合わせのみ</option>
              </select>
            </div>
          </div>
          <div>
            <label className="form-label">包装・パッケージ</label>
            <input className="form-input" value={form.packaging} onChange={e => set('packaging', e.target.value)} />
          </div>
          <div>
            <label className="form-label">産地</label>
            <input className="form-input" value={form.origin} onChange={e => set('origin', e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-green-700" checked={form.is_visible} onChange={e => set('is_visible', e.target.checked)} />
              <span className="text-sm font-medium text-gray-700">公開する</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-amber-500" checked={form.is_recommended} onChange={e => set('is_recommended', e.target.checked)} />
              <span className="text-sm font-medium text-gray-700">おすすめ商品に設定</span>
            </label>
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">エラー: {error}</div>}

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary rounded-lg py-2.5 px-6 flex items-center gap-2 disabled:opacity-50">
            <Save size={16} /> {saving ? '保存中...' : '保存する'}
          </button>
          <Link href="/admin/products" className="btn-secondary rounded-lg py-2.5 px-6">キャンセル</Link>
        </div>
      </form>
    </div>
  )
}
