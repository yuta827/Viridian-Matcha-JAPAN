'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Save, RefreshCw } from 'lucide-react'

interface ContentMap {
  [key: string]: { value: string; value_en: string; label: string }
}

const CMS_FIELDS = [
  {
    section: 'hero',
    sectionName: 'ヒーローセクション',
    fields: [
      { key: 'title', label: 'メインタイトル', type: 'text' },
      { key: 'title_en', label: 'メインタイトル（英語）', type: 'text' },
      { key: 'subtitle', label: 'サブタイトル', type: 'textarea' },
      { key: 'subtitle_en', label: 'サブタイトル（英語）', type: 'textarea' },
      { key: 'cta_primary', label: 'CTAボタン（主）', type: 'text' },
      { key: 'cta_secondary', label: 'CTAボタン（副）', type: 'text' },
      { key: 'image_url', label: 'ヒーロー画像URL', type: 'text' },
    ],
  },
  {
    section: 'quality',
    sectionName: '品質訴求セクション',
    fields: [
      { key: 'title', label: 'セクションタイトル', type: 'text' },
      { key: 'title_en', label: 'セクションタイトル（英語）', type: 'text' },
      { key: 'body', label: '本文', type: 'textarea' },
      { key: 'body_en', label: '本文（英語）', type: 'textarea' },
    ],
  },
  {
    section: 'oem_flow',
    sectionName: 'OEMフロー',
    fields: [
      { key: 'title', label: 'セクションタイトル', type: 'text' },
      { key: 'title_en', label: 'セクションタイトル（英語）', type: 'text' },
      { key: 'step1', label: 'ステップ1', type: 'text' },
      { key: 'step2', label: 'ステップ2', type: 'text' },
      { key: 'step3', label: 'ステップ3', type: 'text' },
      { key: 'step4', label: 'ステップ4', type: 'text' },
      { key: 'step5', label: 'ステップ5', type: 'text' },
    ],
  },
  {
    section: 'cta',
    sectionName: 'CTAセクション',
    fields: [
      { key: 'title', label: 'CTAタイトル', type: 'text' },
      { key: 'title_en', label: 'CTAタイトル（英語）', type: 'text' },
      { key: 'body', label: 'CTA本文', type: 'textarea' },
      { key: 'sample_btn', label: 'サンプル注文ボタン', type: 'text' },
      { key: 'quote_btn', label: '見積依頼ボタン', type: 'text' },
    ],
  },
]

export default function AdminTopPagePage() {
  const [contents, setContents] = useState<ContentMap>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = createClient()

  const fetchContents = async () => {
    const { data } = await supabase.from('cms_contents').select('*')
    const map: ContentMap = {}
    data?.forEach(item => {
      map[`${item.section_key}.${item.content_key}`] = {
        value: item.value || '',
        value_en: item.value_en || '',
        label: item.label || '',
      }
    })
    setContents(map)
    setLoading(false)
  }

  useEffect(() => { fetchContents() }, [])

  const handleChange = (section: string, key: string, field: 'value' | 'value_en', val: string) => {
    const mapKey = `${section}.${key}`
    setContents(prev => ({
      ...prev,
      [mapKey]: { ...prev[mapKey], [field]: val }
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    const upserts = Object.entries(contents).map(([mapKey, content]) => {
      const [section_key, content_key] = mapKey.split('.')
      return {
        section_key,
        content_key,
        value: content.value,
        value_en: content.value_en,
        content_type: 'text',
      }
    })

    await supabase.from('cms_contents').upsert(upserts, { onConflict: 'section_key,content_key' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const getVal = (section: string, key: string, field: 'value' | 'value_en' = 'value') => {
    return contents[`${section}.${key}`]?.[field] || ''
  }

  if (loading) return <div className="text-center py-12 text-gray-400">読み込み中...</div>

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">TOPページ編集</h1>
        <div className="flex gap-3">
          <button onClick={fetchContents} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
            <RefreshCw size={18} />
          </button>
          <button onClick={handleSave} disabled={saving}
            className="btn-primary rounded-lg py-2 px-4 text-sm flex items-center gap-2 disabled:opacity-50">
            <Save size={16} />
            {saved ? '保存しました！' : saving ? '保存中...' : '保存する'}
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
        💡 ここで編集した内容は公開サイトのTOPページに反映されます。「保存する」を押すと即時更新されます。
      </div>

      {CMS_FIELDS.map(section => (
        <div key={section.section} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 border-b pb-2">{section.sectionName}</h2>
          {section.fields.map(field => (
            <div key={field.key}>
              <label className="form-label">{field.label}</label>
              {field.type === 'textarea' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">日本語</label>
                    <textarea className="form-input" rows={3}
                      value={getVal(section.section, field.key, 'value')}
                      onChange={e => handleChange(section.section, field.key, 'value', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">英語</label>
                    <textarea className="form-input" rows={3}
                      value={getVal(section.section, field.key, 'value_en')}
                      onChange={e => handleChange(section.section, field.key, 'value_en', e.target.value)} />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">日本語</label>
                    <input className="form-input"
                      value={getVal(section.section, field.key, 'value')}
                      onChange={e => handleChange(section.section, field.key, 'value', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">英語</label>
                    <input className="form-input"
                      value={getVal(section.section, field.key, 'value_en')}
                      onChange={e => handleChange(section.section, field.key, 'value_en', e.target.value)} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
