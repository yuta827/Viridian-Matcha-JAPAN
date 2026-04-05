'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Package, MessageSquare, ShoppingCart, FileText, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface Stats {
  products: number
  inquiries: number
  orders: number
  quotes: number
  newInquiries: number
  pendingOrders: number
  recentInquiries: any[]
  recentOrders: any[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    products: 0, inquiries: 0, orders: 0, quotes: 0,
    newInquiries: 0, pendingOrders: 0,
    recentInquiries: [], recentOrders: []
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      const [
        { count: products },
        { count: inquiries },
        { count: orders },
        { count: quotes },
        { count: newInquiries },
        { count: pendingOrders },
        { data: recentInquiries },
        { data: recentOrders },
      ] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('quotes').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('orders').select('*', { count: 'exact', head: true }).eq('payment_status', 'awaiting_payment'),
        supabase.from('inquiries').select('inquiry_number,company_name,country,status,created_at').order('created_at', { ascending: false }).limit(5),
        supabase.from('orders').select('order_number,email,total_usd,order_status,created_at').order('created_at', { ascending: false }).limit(5),
      ])

      setStats({
        products: products || 0,
        inquiries: inquiries || 0,
        orders: orders || 0,
        quotes: quotes || 0,
        newInquiries: newInquiries || 0,
        pendingOrders: pendingOrders || 0,
        recentInquiries: recentInquiries || [],
        recentOrders: recentOrders || [],
      })
      setLoading(false)
    }
    fetchStats()
  }, [])

  const statCards = [
    { label: '商品数', value: stats.products, icon: Package, href: '/admin/products', color: 'text-green-700', bg: 'bg-green-50' },
    { label: '問い合わせ', value: stats.inquiries, icon: MessageSquare, href: '/admin/inquiries', color: 'text-blue-700', bg: 'bg-blue-50', badge: stats.newInquiries },
    { label: '注文', value: stats.orders, icon: ShoppingCart, href: '/admin/orders', color: 'text-purple-700', bg: 'bg-purple-50', badge: stats.pendingOrders },
    { label: '見積', value: stats.quotes, icon: FileText, href: '/admin/quotes', color: 'text-amber-700', bg: 'bg-amber-50' },
  ]

  const statusLabel: Record<string, string> = {
    new: '新規', contacted: '連絡済み', sample_requested: 'サンプル依頼',
    quote_sent: '見積送付', awaiting_payment: '入金待ち',
    payment_confirmed: '入金確認', in_production: '製造中',
    shipped: '発送済み', completed: '完了', closed: 'クローズ',
  }

  const statusColor: Record<string, string> = {
    new: 'badge-red', contacted: 'badge-blue', sample_requested: 'badge-purple',
    quote_sent: 'badge-yellow', awaiting_payment: 'badge-yellow',
    payment_confirmed: 'badge-green', in_production: 'badge-blue',
    shipped: 'badge-green', completed: 'badge-green', closed: 'badge-gray',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Alerts */}
      {(stats.newInquiries > 0 || stats.pendingOrders > 0) && (
        <div className="space-y-2">
          {stats.newInquiries > 0 && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
              <AlertCircle className="text-red-500" size={20} />
              <span className="text-red-700 font-medium">
                未対応の問い合わせが <strong>{stats.newInquiries}件</strong> あります
              </span>
              <Link href="/admin/inquiries" className="ml-auto text-sm text-red-600 underline">確認する</Link>
            </div>
          )}
          {stats.pendingOrders > 0 && (
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <Clock className="text-amber-500" size={20} />
              <span className="text-amber-700 font-medium">
                入金待ちの注文が <strong>{stats.pendingOrders}件</strong> あります
              </span>
              <Link href="/admin/orders" className="ml-auto text-sm text-amber-600 underline">確認する</Link>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link key={card.label} href={card.href}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${card.bg}`}>
                  <Icon className={card.color} size={20} />
                </div>
                {card.badge ? (
                  <span className="badge badge-red text-xs">{card.badge}件未対応</span>
                ) : null}
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {loading ? '—' : card.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{card.label}</div>
            </Link>
          )
        })}
      </div>

      {/* Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">最近の問い合わせ</h2>
            <Link href="/admin/inquiries" className="text-sm text-green-700 hover:underline">すべて見る</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {loading ? (
              <div className="p-5 text-center text-gray-400 text-sm">読み込み中...</div>
            ) : stats.recentInquiries.length === 0 ? (
              <div className="p-5 text-center text-gray-400 text-sm">まだ問い合わせはありません</div>
            ) : (
              stats.recentInquiries.map((inq) => (
                <Link key={inq.inquiry_number} href="/admin/inquiries"
                  className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 truncate">{inq.company_name}</div>
                    <div className="text-xs text-gray-500">{inq.country} · {inq.inquiry_number}</div>
                  </div>
                  <span className={`badge ${statusColor[inq.status] || 'badge-gray'} text-xs`}>
                    {statusLabel[inq.status] || inq.status}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">最近の注文</h2>
            <Link href="/admin/orders" className="text-sm text-green-700 hover:underline">すべて見る</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {loading ? (
              <div className="p-5 text-center text-gray-400 text-sm">読み込み中...</div>
            ) : stats.recentOrders.length === 0 ? (
              <div className="p-5 text-center text-gray-400 text-sm">まだ注文はありません</div>
            ) : (
              stats.recentOrders.map((order) => (
                <Link key={order.order_number} href="/admin/orders"
                  className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900">{order.order_number}</div>
                    <div className="text-xs text-gray-500 truncate">{order.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      ${order.total_usd?.toFixed(2) || '—'}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-semibold text-gray-900 mb-4">クイックアクション</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/products/new" className="btn-primary text-sm py-2 px-4 rounded-lg">
            + 商品を追加
          </Link>
          <Link href="/admin/inquiries" className="btn-secondary text-sm py-2 px-4 rounded-lg">
            問い合わせ確認
          </Link>
          <Link href="/admin/top-page" className="btn-secondary text-sm py-2 px-4 rounded-lg">
            TOPページ編集
          </Link>
          <Link href="/admin/faq" className="btn-secondary text-sm py-2 px-4 rounded-lg">
            FAQ編集
          </Link>
        </div>
      </div>
    </div>
  )
}
