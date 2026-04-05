'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Save } from 'lucide-react'

const COMPANY_FIELDS = [
  { key: 'company_name', label: '会社名', type: 'text' },
  { key: 'company_name_en', label: '会社名（英語）', type: 'text' },
  { key: 'established', label: '設立年', type: 'text' },
  { key: 'address', label: '住所', type: 'textarea' },
  { key: 'address_en', label: '住所（英語）', type: 'textarea' },
  { key: 'email', label: 'メールアドレス', type: 'text' },
  { key: 'phone', label: '電話番号', type: 'text' },
  { key: 'whatsapp', label: 'WhatsApp', type: 'text' },
  { key: 'website', label: 'Webサイト', type: 'text' },
  { key: 'about', label: '会社紹介文', type: 'textarea' },
  { key: 'about_en', label: '会社紹介文（英語）', type: 'textarea' },
  { key: 'bank_name', label: '銀行名', type: 'text' },
  { key: 'bank_branch', label: '支店名', type: 'text' },
  { key: 'bank_account_type', label: '口座種別', type: 'text' },
  { key: 'bank_account_number', label: '口座番号', type: 'text' },
  { key: 'bank_account_name', label: '口座名義', type: 'text' },
  { key: 'bank_swift', label: 'SWIFTコード', type: 'text' },
  { key: 'bank_instructions', label: '振込案内文', type: 'textarea' },
  { key: 'bank_instructions_en', label: '振込案内文（英語）', type: 'textarea' },
]

export default function AdminCompanyPage() {
  const [data, setData] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetch = async () => {
      const { data: rows } = await supabase.from('company_info').select('*')
      const map: Record<string, string> = {}
      rows?.forEach(r => { map[r.key] = r.value || '' })
      setData(map)
      setLoading(false)
    }
    fetch()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const upserts = COMPANY_FIELDS.map(f => ({
      key: f.key,
      value: data[f.key] || '',
      label: f.label,
    }))
    await supabase.from('company_info').upsert(upserts, { onConflict: 'key' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return <div className="text-center py-12 text-gray-400">読み込み中...</div>

  const sections = [
    { title: '基本情報', keys: ['company_name', 'company_name_en', 'established', 'address', 'address_en'] },
    { title: '連絡先', keys: ['email', 'phone', 'whatsapp', 'website'] },
    { title: '会社紹介', keys: ['about', 'about_en'] },
    { title: '銀行振込情報', keys: ['bank_name', 'bank_branch', 'bank_account_type', 'bank_account_number', 'bank_account_name', 'bank_swift', 'bank_instructions', 'bank_instructions_en'] },
  ]

  const fieldMap = Object.fromEntries(COMPANY_FIELDS.map(f => [f.key, f]))

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">会社情報・銀行振込設定</h1>
        <button onClick={handleSave} disabled={saving}
          className="btn-primary rounded-lg py-2 px-4 text-sm flex items-center gap-2 disabled:opacity-50">
          <Save size={16} />
          {saved ? '保存しました！' : saving ? '保存中...' : '保存する'}
        </button>
      </div>

      {sections.map(section => (
        <div key={section.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 border-b pb-2">{section.title}</h2>
          {section.keys.map(key => {
            const field = fieldMap[key]
            if (!field) return null
            return (
              <div key={key}>
                <label className="form-label">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea className="form-input" rows={4} value={data[key] || ''}
                    onChange={e => setData(d => ({ ...d, [key]: e.target.value }))} />
                ) : (
                  <input className="form-input" value={data[key] || ''}
                    onChange={e => setData(d => ({ ...d, [key]: e.target.value }))} />
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
