'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Search } from 'lucide-react'
import { ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS, formatDate, formatCurrency } from '@/lib/utils'
import type { Order } from '@/types'

const PAYMENT_COLORS: Record<string, string> = {
  pending: 'badge-gray', awaiting_payment: 'badge-yellow',
  payment_confirmed: 'badge-green', failed: 'badge-red', refunded: 'badge-purple',
}

const ORDER_COLORS: Record<string, string> = {
  new: 'badge-gray', processing: 'badge-blue', in_production: 'badge-purple',
  shipped: 'badge-green', completed: 'badge-green', cancelled: 'badge-red',
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState<Order | null>(null)
  const supabase = createClient()

  const fetchOrders = async () => {
    let query = supabase.from('orders').select('*').order('created_at', { ascending: false })
    if (statusFilter) query = query.eq('order_status', statusFilter)
    const { data } = await query
    setOrders(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchOrders() }, [statusFilter])

  const updateOrder = async (id: string, updates: Partial<Order>) => {
    await supabase.from('orders').update(updates).eq('id', id)
    await fetchOrders()
    if (selected?.id === id) setSelected(s => s ? { ...s, ...updates } : null)
  }

  const filtered = orders.filter(o =>
    o.order_number.includes(search) || o.email.includes(search) ||
    (o.company_name || '').includes(search)
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">注文管理</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="注文番号・メール・会社名..." className="form-input pl-9"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="form-input w-auto" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">全ステータス</option>
          {Object.entries(ORDER_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-y-auto max-h-[600px]">
            {loading ? (
              <div className="p-8 text-center text-gray-400">読み込み中...</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-gray-400">注文はありません</div>
            ) : (
              filtered.map(order => (
                <button key={order.id} onClick={() => setSelected(order)}
                  className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors
                    ${selected?.id === order.id ? 'bg-green-50 border-l-4 border-l-green-600' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-medium text-sm text-gray-900">{order.order_number}</div>
                      <div className="text-xs text-gray-500">{order.email}</div>
                      <div className="text-xs text-gray-400">{formatDate(order.created_at)}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="font-semibold text-sm">${order.total_usd?.toFixed(2) || '—'}</div>
                      <span className={`badge ${PAYMENT_COLORS[order.payment_status]} text-xs block`}>
                        {PAYMENT_STATUS_LABELS[order.payment_status]}
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
              <h2 className="text-lg font-bold text-gray-900">{selected.order_number}</h2>
              <div className="flex gap-2 mt-1">
                <span className={`badge ${ORDER_COLORS[selected.order_status]}`}>
                  {ORDER_STATUS_LABELS[selected.order_status]}
                </span>
                <span className={`badge ${PAYMENT_COLORS[selected.payment_status]}`}>
                  {PAYMENT_STATUS_LABELS[selected.payment_status]}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">メール:</span> <span className="font-medium">{selected.email}</span></div>
              <div><span className="text-gray-500">タイプ:</span> <span className="font-medium">{selected.order_type === 'sample' ? 'サンプル' : 'OEM'}</span></div>
              {selected.company_name && <div><span className="text-gray-500">会社:</span> <span className="font-medium">{selected.company_name}</span></div>}
              {selected.country && <div><span className="text-gray-500">国:</span> <span className="font-medium">{selected.country}</span></div>}
              <div><span className="text-gray-500">決済方法:</span> <span className="font-medium">{selected.payment_method === 'paypal' ? 'PayPal' : '銀行振込'}</span></div>
              <div><span className="text-gray-500">合計:</span> <span className="font-bold text-green-700">${selected.total_usd?.toFixed(2)}</span></div>
            </div>

            {/* Line items */}
            {selected.line_items?.length > 0 && (
              <div>
                <h3 className="font-medium text-sm text-gray-700 mb-2">注文内容</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  {selected.line_items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between p-3 border-b border-gray-100 last:border-0 text-sm">
                      <div>
                        <div className="font-medium">{item.product_name}</div>
                        <div className="text-gray-500 text-xs">{item.grade} × {item.quantity}{item.unit}</div>
                      </div>
                      <div className="font-semibold">${item.total_usd?.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selected.paypal_order_id && (
              <div className="text-sm">
                <span className="text-gray-500">PayPal Order ID:</span>
                <code className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">{selected.paypal_order_id}</code>
              </div>
            )}

            {selected.bank_transfer_ref && (
              <div className="text-sm">
                <span className="text-gray-500">振込参照番号:</span>
                <code className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">{selected.bank_transfer_ref}</code>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="form-label">注文ステータス</label>
                <select className="form-input" value={selected.order_status}
                  onChange={e => updateOrder(selected.id, { order_status: e.target.value as any })}>
                  {Object.entries(ORDER_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">支払いステータス</label>
                <select className="form-input" value={selected.payment_status}
                  onChange={e => updateOrder(selected.id, { payment_status: e.target.value as any })}>
                  {Object.entries(PAYMENT_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="form-label">管理者メモ</label>
              <textarea className="form-input" rows={3}
                defaultValue={selected.admin_notes || ''}
                onBlur={e => updateOrder(selected.id, { admin_notes: e.target.value })}
              />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex items-center justify-center text-gray-400">
            注文を選択してください
          </div>
        )}
      </div>
    </div>
  )
}
