'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Quote, QuoteStatus } from '@/types';
import { formatDateTime, QUOTE_STATUS_LABELS } from '@/lib/utils';
import { Save, Mail, Phone, Globe, Building2, Package } from 'lucide-react';

export default function QuoteDetail({ quote }: { quote: Quote }) {
  const [status, setStatus] = useState(quote.status);
  const [memo, setMemo] = useState(quote.admin_notes || '');
  const [paymentMethod, setPaymentMethod] = useState(quote.payment_method || '');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setSaving(true);
    await fetch(`/api/admin/quotes/${quote.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, admin_notes: memo, payment_method: paymentMethod || null }),
    });
    setSaving(false);
    router.refresh();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{quote.contact_name}</h2>
          <p className="text-gray-400 text-sm">{formatDateTime(quote.created_at)}</p>
        </div>
        <span className={`badge badge-${quote.status}`}>
          {QUOTE_STATUS_LABELS[quote.status]}
        </span>
      </div>

      {/* 連絡先 */}
      <div className="grid sm:grid-cols-2 gap-3 mb-5 bg-gray-50 p-4 rounded">
        {[
          { icon: Building2, label: '会社名', value: quote.company_name },
          { icon: Globe, label: '国', value: quote.country },
          { icon: Mail, label: 'メール', value: quote.email, href: `mailto:${quote.email}` },
          { icon: Phone, label: '電話 / WhatsApp', value: [quote.phone, quote.whatsapp].filter(Boolean).join(' / ') || null },
        ].map(item => item.value && (
          <div key={item.label} className="flex items-start gap-2">
            <item.icon className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-gray-400">{item.label}</p>
              {item.href ? (
                <a href={item.href} className="text-sm text-[#2D5016] hover:underline">{item.value}</a>
              ) : (
                <p className="text-sm text-gray-700">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 依頼詳細 */}
      <div className="mb-5 space-y-3">
        {quote.product_interest && quote.product_interest.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">興味のある商品</p>
            <div className="flex flex-wrap gap-1.5">
              {quote.product_interest.map((p, i) => (
                <span key={i} className="bg-[#F8F5EE] text-[#2D5016] text-xs px-2 py-1 border border-[#2D5016]/20">{p}</span>
              ))}
            </div>
          </div>
        )}
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            ['希望数量', quote.quantity],
            ['希望パッケージ', quote.packaging_pref],
            ['販売予定市場', quote.target_market],
            ['希望納期', quote.desired_delivery],
          ].map(([label, value]) => value && (
            <div key={label as string}>
              <p className="text-xs text-gray-400">{label}</p>
              <p className="text-gray-700">{value}</p>
            </div>
          ))}
        </div>
        {quote.message && (
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">メッセージ</p>
            <div className="bg-[#F8F5EE] p-4 rounded text-sm text-gray-700 whitespace-pre-wrap">{quote.message}</div>
          </div>
        )}
      </div>

      {/* ステータス・支払い方法 */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="form-label">ステータス</label>
          <select className="form-input" value={status} onChange={e => setStatus(e.target.value as QuoteStatus)}>
            {Object.entries(QUOTE_STATUS_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">支払い方法</label>
          <select className="form-input" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
            <option value="">未定</option>
            <option value="paypal">PayPal</option>
            <option value="bank_transfer">銀行振込</option>
          </select>
        </div>
      </div>

      <div className="mb-5">
        <label className="form-label">管理者メモ</label>
        <textarea
          className="form-input h-28 resize-none"
          value={memo}
          onChange={e => setMemo(e.target.value)}
          placeholder="対応内容、備考など"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-[#2D5016] text-white py-2.5 text-sm tracking-wider hover:bg-[#3d6b1f] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 rounded"
      >
        <Save className="w-4 h-4" />
        {saving ? '保存中...' : '変更を保存'}
      </button>
    </div>
  );
}
