'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Plus, Edit, Eye, EyeOff, Star, Trash2, Search } from 'lucide-react'
import { PRODUCT_LINE_LABELS } from '@/lib/utils'
import type { Product } from '@/types'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [lineFilter, setLineFilter] = useState('')
  const supabase = createClient()

  const fetchProducts = async () => {
    let query = supabase
      .from('products')
      .select('*, product_images(url, is_primary)')
      .order('line').order('sort_order')

    if (lineFilter) query = query.eq('line', lineFilter)

    const { data } = await query
    setProducts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [lineFilter])

  const toggleVisible = async (product: Product) => {
    await supabase.from('products').update({ is_visible: !product.is_visible }).eq('id', product.id)
    fetchProducts()
  }

  const toggleRecommended = async (product: Product) => {
    await supabase.from('products').update({ is_recommended: !product.is_recommended }).eq('id', product.id)
    fetchProducts()
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('この商品を削除しますか？')) return
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  const filtered = products.filter(p =>
    p.name.includes(search) || p.grade.includes(search) || (p.grade_label || '').includes(search)
  )

  const lineColors: Record<string, string> = {
    premium: 'badge-green',
    standard: 'badge-blue',
    organic: 'badge-purple',
  }

  const lineShort: Record<string, string> = {
    premium: 'プレミアム',
    standard: 'スタンダード',
    organic: 'オーガニック',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">商品管理</h1>
        <Link href="/admin/products/new" className="btn-primary rounded-lg py-2 px-4 text-sm flex items-center gap-2">
          <Plus size={16} /> 商品追加
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="商品名・グレードで検索..."
            className="form-input pl-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="form-input w-auto"
          value={lineFilter}
          onChange={e => setLineFilter(e.target.value)}
        >
          <option value="">全ライン</option>
          <option value="premium">プレミアム</option>
          <option value="standard">スタンダード</option>
          <option value="organic">オーガニック</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>商品名</th>
                <th>ライン</th>
                <th>グレード</th>
                <th>サンプル価格</th>
                <th>MOQ</th>
                <th>公開</th>
                <th>おすすめ</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="text-center py-12 text-gray-400">読み込み中...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-12 text-gray-400">商品がありません</td></tr>
              ) : (
                filtered.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      {product.grade_label && (
                        <div className="text-xs text-gray-500">{product.grade_label}</div>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${lineColors[product.line]}`}>
                        {lineShort[product.line]}
                      </span>
                    </td>
                    <td className="font-mono text-sm">{product.grade}</td>
                    <td>
                      {product.sample_price_usd
                        ? <span className="font-medium">${product.sample_price_usd}</span>
                        : <span className="text-gray-400">—</span>
                      }
                    </td>
                    <td>{product.moq}kg</td>
                    <td>
                      <button
                        onClick={() => toggleVisible(product)}
                        className={`p-1.5 rounded-full transition-colors ${
                          product.is_visible
                            ? 'text-green-600 hover:bg-green-50'
                            : 'text-gray-400 hover:bg-gray-50'
                        }`}
                        title={product.is_visible ? '公開中' : '非公開'}
                      >
                        {product.is_visible ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleRecommended(product)}
                        className={`p-1.5 rounded-full transition-colors ${
                          product.is_recommended
                            ? 'text-amber-500 hover:bg-amber-50'
                            : 'text-gray-300 hover:bg-gray-50'
                        }`}
                        title={product.is_recommended ? 'おすすめ' : '通常'}
                      >
                        <Star size={18} fill={product.is_recommended ? 'currentColor' : 'none'} />
                      </button>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="編集"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="削除"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
