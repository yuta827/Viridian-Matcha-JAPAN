'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Search, Save } from 'lucide-react'
import { QUOTE_STATUS_LABELS, formatDate, generateQuoteNumber } from '@/lib/utils'
import type { Quote } from '@/types'

const STATUS_COLORS: Record<string, string> = {
  draft: 'badge-gray', sent: 'badge-blue', accepted: 'badge-green',
  rejected: 'badge-red', expired: 'badge-yellow',
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Quote | null>(null)
  const [showNew, setShowNew] = useState(false)
  const supabase = createClient()

  const fetchQuotes = async () => {
    const { data } = await supabase.from('quotes').select('*').order('created_at', { ascending: false })
    setQuotes(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchQuotes() }, [])

  const updateQuote = async (id: string, updates: Partial<Quote>) => {
    await supabase.from('quotes').update(updates).eq('id', id)
    await fetchQuotes()
    if (selected?.id === id) setSelected(s => s ? { ...s, ...updates } : null)
  }

  const filtered = quotes.filter(q =>
    q.company_name.includes(search) || q.quote_number.includes(search) || q.contact_email.includes(search)
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">見積管理</h1>
        <button onClick={() => setShowNew(true)}
          className="btn-primary rounded-lg py-2 px-4 text-sm flex items-center gap-2">
          <Plus size={16} /> 新規見積作成
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="会社名・見積番号・メールで検索..."
            className="form-input pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-y-auto max-h-[600px]">
            {loading ? (
              <div className="p-8 text-center text-gray-400">読み込み中...</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-gray-400">見積はありません</div>
            ) : (
              filtered.map(quote => (
                <button key={quote.id} onClick={() => setSelected(quote)}
                  className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors
                    ${selected?.id === quote.id ? 'bg-green-50 border-l-4 border-l-green-600' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-medium text-sm text-gray-900">{quote.company_name}</div>
                      <div className="text-xs text-gray-500">{quote.quote_number}</div>
                      <div className="text-xs text-gray-400">{formatDate(quote.created_at)}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="font-semibold text-sm">${quote.total_usd?.toFixed(2) || '—'}</div>
                      <span className={`badge ${STATUS_COLORS[quote.status]} text-xs block`}>
                        {QUOTE_STATUS_LABELS[quote.status]}
                      </span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {selected ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{selected.company_name}</h2>
              <div className="text-sm text-gray-500">{selected.quote_number}</div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">メール:</span> <span className="font-medium">{selected.contact_email}</span></div>
              <div><span className="text-gray-500">有効期限:</span> <span className="font-medium">{selected.valid_until || '—'}</span></div>
              <div><span className="text-gray-500">決済方法:</span> <span className="font-medium">{selected.payment_method === 'paypal' ? 'PayPal' : '銀行振込'}</span></div>
              <div><span className="text-gray-500">合計:</span> <span className="font-bold text-green-700">${selected.total_usd?.toFixed(2) || '—'}</span></div>
            </div>

            {selected.line_items?.length > 0 && (
              <div>
                <h3 className="font-medium text-sm text-gray-700 mb-2">明細</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  {selected.line_items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between p-3 border-b border-gray-100 last:border-0 text-sm">
                      <div>
                        <div className="font-medium">{item.product_name}</div>
                        <div className="text-gray-500 text-xs">{item.quantity}{item.unit} × ${item.unit_price_usd}/kg</div>
                      </div>
                      <div className="font-semibold">${item.total_usd?.toFixed(2)}</div>
                    </div>
                  ))}
                  <div className="flex justify-between p-3 bg-gray-100 font-semibold text-sm">
                    <span>合計</span>
                    <span>${selected.total_usd?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="form-label">ステータス</label>
              <select className="form-input" value={selected.status}
                onChange={e => updateQuote(selected.id, { status: e.target.value as any })}>
                {Object.entries(QUOTE_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>

            {selected.notes && (
              <div className="text-sm bg-gray-50 rounded-lg p-3">
                <span className="text-gray-500 block mb-1">備考:</span>
                <p className="text-gray-700">{selected.notes}</p>
              </div>
            )}

            <div>
              <label className="form-label">管理者メモ</label>
              <textarea className="form-input" rows={3}
                defaultValue={selected.admin_notes || ''}
                onBlur={e => updateQuote(selected.id, { admin_notes: e.target.value })} />
            </div>

            <a href={`mailto:${selected.contact_email}`} className="btn-primary rounded-lg py-2 px-4 text-sm block text-center">
              見積メール送信
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex items-center justify-center text-gray-400">
            見積を選択してください
          </div>
        )}
      </div>
    </div>
  )
}
