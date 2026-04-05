'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Save } from 'lucide-react'

const SETTINGS_FIELDS = [
  { key: 'site_name', label: 'サイト名' },
  { key: 'site_name_en', label: 'サイト名（英語）' },
  { key: 'meta_description', label: 'メタ説明' },
  { key: 'meta_description_en', label: 'メタ説明（英語）' },
  { key: 'logo_url', label: 'ロゴ画像URL' },
  { key: 'favicon_url', label: 'ファビコンURL' },
  { key: 'contact_email', label: '問い合わせ受信メール' },
  { key: 'order_notify_email', label: '注文通知メール' },
  { key: 'google_analytics_id', label: 'Google Analytics ID' },
  { key: 'facebook_url', label: 'Facebook URL' },
  { key: 'instagram_url', label: 'Instagram URL' },
  { key: 'linkedin_url', label: 'LinkedIn URL' },
]

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('site_settings').select('*')
      const map: Record<string, string> = {}
      data?.forEach(r => { map[r.key] = r.value || '' })
      setSettings(map)
      setLoading(false)
    }
    fetch()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const upserts = SETTINGS_FIELDS.map(f => ({
      key: f.key, value: settings[f.key] || '', label: f.label,
    }))
    await supabase.from('site_settings').upsert(upserts, { onConflict: 'key' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return <div className="text-center py-12 text-gray-400">読み込み中...</div>

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">サイト設定</h1>
        <button onClick={handleSave} disabled={saving}
          className="btn-primary rounded-lg py-2 px-4 text-sm flex items-center gap-2 disabled:opacity-50">
          <Save size={16} />
          {saved ? '保存しました！' : saving ? '保存中...' : '保存する'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        {SETTINGS_FIELDS.map(field => (
          <div key={field.key}>
            <label className="form-label">{field.label}</label>
            <input className="form-input" value={settings[field.key] || ''}
              onChange={e => setSettings(s => ({ ...s, [field.key]: e.target.value }))} />
          </div>
        ))}
      </div>
    </div>
  )
}
