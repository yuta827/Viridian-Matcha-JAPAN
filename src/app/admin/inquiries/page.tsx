'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Search, ChevronDown } from 'lucide-react'
import { INQUIRY_STATUS_LABELS, formatDate } from '@/lib/utils'
import type { Inquiry, InquiryStatus } from '@/types'

const STATUS_COLORS: Record<string, string> = {
  new: 'badge-red', contacted: 'badge-blue', sample_requested: 'badge-purple',
  quote_sent: 'badge-yellow', awaiting_payment: 'badge-yellow',
  payment_confirmed: 'badge-green', in_production: 'badge-blue',
  shipped: 'badge-green', completed: 'badge-green', closed: 'badge-gray',
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState<Inquiry | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const supabase = createClient()

  const fetchInquiries = async () => {
    let query = supabase.from('inquiries').select('*').order('created_at', { ascending: false })
    if (statusFilter) query = query.eq('status', statusFilter)
    const { data } = await query
    setInquiries(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchInquiries() }, [statusFilter])

  const updateStatus = async (id: string, status: string) => {
    setUpdatingStatus(true)
    await supabase.from('inquiries').update({ status }).eq('id', id)
    await fetchInquiries()
    if (selected?.id === id) setSelected(s => s ? { ...s, status: status as InquiryStatus } : null)
    setUpdatingStatus(false)
  }

  const updateAdminNotes = async (id: string, admin_notes: string) => {
    await supabase.from('inquiries').update({ admin_notes }).eq('id', id)
  }

  const filtered = inquiries.filter(i =>
    i.company_name.includes(search) || i.email.includes(search) ||
    i.inquiry_number.includes(search) || i.country.includes(search)
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">問い合わせ管理</h1>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="会社名・メール・番号で検索..."
            className="form-input pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="form-input w-auto" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">全ステータス</option>
          {Object.entries(INQUIRY_STATUS_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <span className="text-sm text-gray-500">{filtered.length}件</span>
          </div>
          <div className="overflow-y-auto max-h-[600px]">
            {loading ? (
              <div className="p-8 text-center text-gray-400">読み込み中...</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-gray-400">問い合わせはありません</div>
            ) : (
              filtered.map(inq => (
                <button key={inq.id} onClick={() => setSelected(inq)}
                  className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors
                    ${selected?.id === inq.id ? 'bg-green-50 border-l-4 border-l-green-600' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-medium text-sm text-gray-900">{inq.company_name}</div>
                      <div className="text-xs text-gray-500">{inq.inquiry_number} · {inq.country}</div>
                      <div className="text-xs text-gray-400 mt-1">{formatDate(inq.created_at)}</div>
                    </div>
                    <span className={`badge ${STATUS_COLORS[inq.status]} text-xs whitespace-nowrap`}>
                      {INQUIRY_STATUS_LABELS[inq.status]}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Detail */}
        {selected ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{selected.company_name}</h2>
                <div className="text-sm text-gray-500">{selected.inquiry_number}</div>
              </div>
              <span className={`badge ${STATUS_COLORS[selected.status]}`}>
                {INQUIRY_STATUS_LABELS[selected.status]}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">担当者:</span> <span className="font-medium">{selected.contact_person}</span></div>
              <div><span className="text-gray-500">国:</span> <span className="font-medium">{selected.country}</span></div>
              <div className="col-span-2"><span className="text-gray-500">メール:</span> <a href={`mailto:${selected.email}`} className="font-medium text-blue-600 hover:underline">{selected.email}</a></div>
              {selected.phone && <div className="col-span-2"><span className="text-gray-500">電話:</span> <span className="font-medium">{selected.phone}</span></div>}
            </div>

            {selected.interested_product && (
              <div className="text-sm">
                <span className="text-gray-500 block mb-1">希望商品:</span>
                <span className="font-medium">{selected.interested_product}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-sm">
              {selected.desired_quantity && <div><span className="text-gray-500">希望数量:</span> <span className="font-medium">{selected.desired_quantity}</span></div>}
              {selected.target_market && <div><span className="text-gray-500">対象市場:</span> <span className="font-medium">{selected.target_market}</span></div>}
              {selected.packaging_preference && <div className="col-span-2"><span className="text-gray-500">包装希望:</span> <span className="font-medium">{selected.packaging_preference}</span></div>}
              {selected.delivery_schedule && <div className="col-span-2"><span className="text-gray-500">納期:</span> <span className="font-medium">{selected.delivery_schedule}</span></div>}
            </div>

            {selected.notes && (
              <div className="text-sm bg-gray-50 rounded-lg p-3">
                <span className="text-gray-500 block mb-1">メモ:</span>
                <p className="text-gray-700">{selected.notes}</p>
              </div>
            )}

            {/* Status Update */}
            <div>
              <label className="form-label">ステータス変更</label>
              <select className="form-input" value={selected.status}
                onChange={e => updateStatus(selected.id, e.target.value)}
                disabled={updatingStatus}
              >
                {Object.entries(INQUIRY_STATUS_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            {/* Admin Notes */}
            <div>
              <label className="form-label">管理者メモ</label>
              <textarea className="form-input" rows={4}
                defaultValue={selected.admin_notes || ''}
                onBlur={e => updateAdminNotes(selected.id, e.target.value)}
                placeholder="社内メモ（顧客には見えません）"
              />
              <p className="text-xs text-gray-400 mt-1">フォーカスを外すと自動保存されます</p>
            </div>

            <div className="flex gap-2">
              <a href={`mailto:${selected.email}`}
                className="btn-primary rounded-lg py-2 px-4 text-sm">
                メール送信
              </a>
              <a href={`/admin/quotes?inquiry=${selected.id}`}
                className="btn-secondary rounded-lg py-2 px-4 text-sm">
                見積作成
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex items-center justify-center text-gray-400">
            問い合わせを選択してください
          </div>
        )}
      </div>
    </div>
  )
}
