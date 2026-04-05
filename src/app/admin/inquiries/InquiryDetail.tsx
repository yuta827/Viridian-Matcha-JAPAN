'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Inquiry, InquiryStatus } from '@/types';
import { formatDateTime, INQUIRY_STATUS_LABELS } from '@/lib/utils';
import { Save, Mail, Phone, Globe, Building2 } from 'lucide-react';

export default function InquiryDetail({ inquiry }: { inquiry: Inquiry }) {
  const [status, setStatus] = useState(inquiry.status);
  const [memo, setMemo] = useState(inquiry.admin_notes || '');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setSaving(true);
    await fetch(`/api/admin/inquiries/${inquiry.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, admin_notes: memo }),
    });
    setSaving(false);
    router.refresh();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{inquiry.contact_person}</h2>
          <p className="text-gray-400 text-sm">{formatDateTime(inquiry.created_at)}</p>
        </div>
        <span className={`badge badge-${inquiry.status}`}>
          {INQUIRY_STATUS_LABELS[inquiry.status]}
        </span>
      </div>

      {/* 連絡先情報 */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded">
        {[
          { icon: Building2, label: '会社名', value: inquiry.company_name },
          { icon: Globe, label: '国', value: inquiry.country },
          { icon: Mail, label: 'メール', value: inquiry.email, href: `mailto:${inquiry.email}` },
          { icon: Phone, label: '電話', value: inquiry.phone },
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

      {/* メッセージ */}
      <div className="mb-6">
        <p className="text-xs font-medium text-gray-500 mb-2">メッセージ</p>
        <div className="bg-[#F8F5EE] p-4 rounded text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
          {inquiry.notes}
        </div>
      </div>

      {/* ステータス更新 */}
      <div className="mb-4">
        <label className="form-label">ステータス更新</label>
        <select
          className="form-input"
          value={status}
          onChange={e => setStatus(e.target.value as InquiryStatus)}
        >
          {Object.entries(INQUIRY_STATUS_LABELS).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
      </div>

      {/* 管理者メモ */}
      <div className="mb-5">
        <label className="form-label">管理者メモ（社内用）</label>
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
