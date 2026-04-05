'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Save, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react'
import type { FaqItem } from '@/types'

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<FaqItem | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [newForm, setNewForm] = useState({ question: '', question_en: '', answer: '', answer_en: '', category: 'general' })
  const supabase = createClient()

  const fetchFaqs = async () => {
    const { data } = await supabase.from('faq_items').select('*').order('sort_order')
    setFaqs(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchFaqs() }, [])

  const addFaq = async () => {
    const maxOrder = faqs.reduce((max, f) => Math.max(max, f.sort_order), 0)
    const { error } = await supabase.from('faq_items').insert({ ...newForm, sort_order: maxOrder + 1 })
    if (!error) { setShowNew(false); setNewForm({ question: '', question_en: '', answer: '', answer_en: '', category: 'general' }); fetchFaqs() }
  }

  const updateFaq = async (faq: FaqItem) => {
    await supabase.from('faq_items').update(faq).eq('id', faq.id)
    setEditing(null)
    fetchFaqs()
  }

  const deleteFaq = async (id: string) => {
    if (!confirm('削除しますか？')) return
    await supabase.from('faq_items').delete().eq('id', id)
    fetchFaqs()
  }

  const toggleVisible = async (faq: FaqItem) => {
    await supabase.from('faq_items').update({ is_visible: !faq.is_visible }).eq('id', faq.id)
    fetchFaqs()
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">FAQ管理</h1>
        <button onClick={() => setShowNew(!showNew)}
          className="btn-primary rounded-lg py-2 px-4 text-sm flex items-center gap-2">
          <Plus size={16} /> FAQ追加
        </button>
      </div>

      {/* Add New */}
      {showNew && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">新規FAQ</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">質問（日本語）</label>
              <input className="form-input" value={newForm.question}
                onChange={e => setNewForm(f => ({ ...f, question: e.target.value }))} />
            </div>
            <div>
              <label className="form-label">質問（英語）</label>
              <input className="form-input" value={newForm.question_en}
                onChange={e => setNewForm(f => ({ ...f, question_en: e.target.value }))} />
            </div>
            <div>
              <label className="form-label">回答（日本語）</label>
              <textarea className="form-input" rows={4} value={newForm.answer}
                onChange={e => setNewForm(f => ({ ...f, answer: e.target.value }))} />
            </div>
            <div>
              <label className="form-label">回答（英語）</label>
              <textarea className="form-input" rows={4} value={newForm.answer_en}
                onChange={e => setNewForm(f => ({ ...f, answer_en: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="form-label">カテゴリ</label>
            <select className="form-input w-auto" value={newForm.category}
              onChange={e => setNewForm(f => ({ ...f, category: e.target.value }))}>
              <option value="general">一般</option>
              <option value="oem">OEM</option>
              <option value="order">注文</option>
              <option value="shipping">配送</option>
              <option value="payment">支払い</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button onClick={addFaq} className="btn-primary rounded-lg py-2 px-4 text-sm flex items-center gap-2">
              <Save size={16} /> 追加する
            </button>
            <button onClick={() => setShowNew(false)} className="btn-secondary rounded-lg py-2 px-4 text-sm">キャンセル</button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-12 text-gray-400">読み込み中...</div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-100">FAQがありません</div>
        ) : (
          faqs.map(faq => (
            <div key={faq.id} className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 ${!faq.is_visible ? 'opacity-60' : ''}`}>
              {editing?.id === faq.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">質問（日本語）</label>
                      <input className="form-input" value={editing.question}
                        onChange={e => setEditing(ed => ed ? { ...ed, question: e.target.value } : null)} />
                    </div>
                    <div>
                      <label className="form-label">質問（英語）</label>
                      <input className="form-input" value={editing.question_en || ''}
                        onChange={e => setEditing(ed => ed ? { ...ed, question_en: e.target.value } : null)} />
                    </div>
                    <div>
                      <label className="form-label">回答（日本語）</label>
                      <textarea className="form-input" rows={4} value={editing.answer}
                        onChange={e => setEditing(ed => ed ? { ...ed, answer: e.target.value } : null)} />
                    </div>
                    <div>
                      <label className="form-label">回答（英語）</label>
                      <textarea className="form-input" rows={4} value={editing.answer_en || ''}
                        onChange={e => setEditing(ed => ed ? { ...ed, answer_en: e.target.value } : null)} />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => updateFaq(editing)} className="btn-primary rounded-lg py-2 px-4 text-sm flex items-center gap-2">
                      <Save size={16} /> 保存
                    </button>
                    <button onClick={() => setEditing(null)} className="btn-secondary rounded-lg py-2 px-4 text-sm">キャンセル</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-1">Q: {faq.question}</div>
                    {faq.question_en && <div className="text-sm text-gray-400 mb-2">EN: {faq.question_en}</div>}
                    <div className="text-sm text-gray-700">A: {faq.answer}</div>
                    {faq.answer_en && <div className="text-xs text-gray-400 mt-1">EN: {faq.answer_en}</div>}
                    <span className="text-xs text-gray-400 mt-2 block">カテゴリ: {faq.category}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => toggleVisible(faq)}
                      className={`p-1.5 rounded ${faq.is_visible ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'}`}>
                      {faq.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button onClick={() => setEditing(faq)}
                      className="p-1.5 rounded text-blue-600 hover:bg-blue-50 text-sm">編集</button>
                    <button onClick={() => deleteFaq(faq.id)}
                      className="p-1.5 rounded text-red-500 hover:bg-red-50"><Trash2 size={16} /></button>
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
