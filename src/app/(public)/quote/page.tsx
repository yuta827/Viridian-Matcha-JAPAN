'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { CheckCircle, ArrowRight, Truck, Info, Globe } from 'lucide-react'
import { generateInquiryNumber } from '@/lib/utils'
import {
  calculateOEMShipping,
  SHIPPING_COUNTRIES,
} from '@/lib/shipping'

// 大口注文の送料概算クイックリファレンス
const OEM_SHIPPING_REFERENCE = [
  { label: '5kg', weightKg: 5 },
  { label: '10kg', weightKg: 10 },
  { label: '20kg', weightKg: 20 },
  { label: '30kg (max EMS)', weightKg: 30 },
]

function QuoteForm() {
  const searchParams = useSearchParams()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showShippingRef, setShowShippingRef] = useState(false)

  const [form, setForm] = useState({
    company_name: '',
    contact_person: '',
    country: '',
    email: '',
    phone: '',
    interested_product: searchParams.get('product') || '',
    desired_quantity: '',
    packaging_preference: '',
    target_market: '',
    delivery_schedule: '',
    notes: '',
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  // 国コードに変換（セレクト値から）
  const selectedCountryCode = SHIPPING_COUNTRIES.find(
    c => c.name.includes(form.country) || form.country === c.code
  )?.code || form.country

  // 数量からkgを解析（簡易）
  const parsedKg = useMemo(() => {
    const match = form.desired_quantity.match(/(\d+(?:\.\d+)?)\s*kg/i)
    return match ? parseFloat(match[1]) : null
  }, [form.desired_quantity])

  // 送料概算（数量・国が入力された場合）
  const shippingEstimate = useMemo(() => {
    if (!selectedCountryCode || !parsedKg || parsedKg <= 0) return null
    const code = SHIPPING_COUNTRIES.find(c => c.code === selectedCountryCode)?.code
    if (!code) return null
    return calculateOEMShipping(parsedKg, code)
  }, [selectedCountryCode, parsedKg])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, inquiry_number: generateInquiryNumber() }),
    })

    if (res.ok) {
      setSubmitted(true)
    } else {
      setError('送信に失敗しました。再度お試しください。')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-[#1a3009] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Inquiry Received!
        </h2>
        <p className="text-gray-600 mb-8">
          Thank you for your inquiry. Our team will review your requirements and respond within 1-2 business days.
        </p>
        <a href="/" className="btn-primary inline-flex items-center gap-2">
          Back to Home <ArrowRight size={16} />
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <div className="text-xs text-[#b8963e] tracking-widest mb-2">BRAND PARTNERSHIP INQUIRY</div>
        <h1 className="text-3xl font-bold text-[#1a3009] mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
          Start Your Private Label
        </h1>
        <p className="text-gray-600">Fill in your requirements and we&apos;ll prepare a custom proposal.</p>
      </div>

      {/* EMS 送料参考表（トグル） */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setShowShippingRef(!showShippingRef)}
          className="flex items-center gap-2 text-sm text-[#2d5016] hover:text-[#1a3009] font-medium border border-[#e8e0d0] px-4 py-2 bg-white hover:bg-[#faf8f3] transition-colors w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <Truck size={14} />
            EMS Shipping Rate Reference (Japan Post 2026) — Europe &amp; USA
          </span>
          <span className="text-xs">{showShippingRef ? '▲ Hide' : '▼ Show'}</span>
        </button>

        {showShippingRef && (
          <div className="border border-t-0 border-[#e8e0d0] bg-white overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-[#faf8f3]">
                <tr>
                  <th className="px-3 py-2.5 text-left text-gray-600">Order Quantity</th>
                  <th className="px-3 py-2.5 text-center bg-green-50 text-[#2d5016] font-bold">🇪🇺 Europe EMS (Zone 3)</th>
                  <th className="px-3 py-2.5 text-center bg-blue-50 text-blue-800 font-bold">🇺🇸 USA EMS (Zone 4)</th>
                  <th className="px-3 py-2.5 text-center text-gray-500">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ece4]">
                {OEM_SHIPPING_REFERENCE.map(({ label, weightKg }) => {
                  const euCalc = calculateOEMShipping(weightKg, 'DE')
                  const usCalc = calculateOEMShipping(weightKg, 'US')
                  return (
                    <tr key={weightKg} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-medium text-gray-700">{label}</td>
                      <td className="px-3 py-2 text-center bg-green-50 text-[#2d5016] font-semibold">
                        {euCalc.ems.priceJPY
                          ? <>¥{euCalc.ems.priceJPY.toLocaleString()} <span className="text-gray-400 font-normal">≈ ${euCalc.ems.priceUSD?.toFixed(0)}</span></>
                          : '—'}
                      </td>
                      <td className="px-3 py-2 text-center bg-blue-50 text-blue-800 font-semibold">
                        {usCalc.ems.priceJPY
                          ? <>¥{usCalc.ems.priceJPY.toLocaleString()} <span className="text-gray-400 font-normal">≈ ${usCalc.ems.priceUSD?.toFixed(0)}</span></>
                          : '—'}
                      </td>
                      <td className="px-3 py-2 text-center text-gray-400">
                        {weightKg >= 30 ? 'Max EMS' : 'EMS only (>2kg)'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <p className="text-xs text-gray-400 px-4 py-2">
              * EMS (Japan Post). Large orders (&gt;30kg) require freight forwarding — contact us for a quote. USD at ¥149/$.
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-gray-200 p-8">
        <div className="text-sm font-semibold text-[#1a3009] border-b pb-2">Company &amp; Contact</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Company Name <span className="text-red-500">*</span></label>
            <input className="form-input" required value={form.company_name} onChange={e => set('company_name', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Contact Person <span className="text-red-500">*</span></label>
            <input className="form-input" required value={form.contact_person} onChange={e => set('contact_person', e.target.value)} />
          </div>

          {/* 国選択（ドロップダウン） */}
          <div>
            <label className="form-label">Country <span className="text-red-500">*</span></label>
            <select
              className="form-input"
              required
              value={form.country}
              onChange={e => set('country', e.target.value)}
            >
              <option value="">Select country...</option>
              <optgroup label="🇪🇺 Europe (Zone 3 — EMS)">
                {SHIPPING_COUNTRIES.filter(c => c.zone === 'zone3').map(c => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </optgroup>
              <optgroup label="🇺🇸 USA (Zone 4 — EMS)">
                {SHIPPING_COUNTRIES.filter(c => c.zone === 'zone4').map(c => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </optgroup>
              <optgroup label="🌏 Other regions">
                <option value="OTHER">Other (please specify in notes)</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label className="form-label">Email <span className="text-red-500">*</span></label>
            <input type="email" className="form-input" required value={form.email} onChange={e => set('email', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Phone / WhatsApp</label>
            <input className="form-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 234 567 8900" />
          </div>
        </div>

        <div className="text-sm font-semibold text-[#1a3009] border-b pb-2">Order Requirements</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="form-label">Interested Product(s)</label>
            <input className="form-input" value={form.interested_product} onChange={e => set('interested_product', e.target.value)} placeholder="Grade A1, Organic B1, etc." />
          </div>
          <div>
            <label className="form-label">Desired Quantity</label>
            <input
              className="form-input"
              value={form.desired_quantity}
              onChange={e => set('desired_quantity', e.target.value)}
              placeholder="e.g. 10kg, 50kg/month, 1 ton/year"
            />
          </div>
          <div>
            <label className="form-label">Target Market</label>
            <input className="form-input" value={form.target_market} onChange={e => set('target_market', e.target.value)} placeholder="EU, USA, Southeast Asia..." />
          </div>
          <div>
            <label className="form-label">Packaging Preference</label>
            <input className="form-input" value={form.packaging_preference} onChange={e => set('packaging_preference', e.target.value)} placeholder="30g, 100g, bulk 1kg..." />
          </div>
          <div>
            <label className="form-label">Required Delivery</label>
            <input className="form-input" value={form.delivery_schedule} onChange={e => set('delivery_schedule', e.target.value)} placeholder="Within 3 months, Q1 2025..." />
          </div>

          {/* 送料概算（リアルタイム） */}
          {shippingEstimate && shippingEstimate.zone !== 'unknown' && (
            <div className="sm:col-span-2 bg-[#faf8f3] border border-[#e8e0d0] p-4 rounded text-sm">
              <div className="flex items-center gap-2 text-[#2d5016] font-semibold mb-2">
                <Truck size={14} />
                Shipping Estimate for {parsedKg}kg to {SHIPPING_COUNTRIES.find(c => c.code === form.country)?.name}
              </div>
              <div className="space-y-1.5">
                {shippingEstimate.ems.priceJPY && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">EMS（国際スピード郵便）</span>
                    <span className="font-bold text-[#1a3009]">
                      ¥{shippingEstimate.ems.priceJPY.toLocaleString()}
                      <span className="text-xs text-gray-400 ml-1">≈ ${shippingEstimate.ems.priceUSD?.toFixed(2)}</span>
                    </span>
                  </div>
                )}
                {!shippingEstimate.ems.priceJPY && parsedKg && parsedKg > 30 && (
                  <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-2 rounded">
                    <Info size={14} />
                    Over 30kg — EMS maximum exceeded. Please contact us for freight forwarding options.
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                * Estimate only. Actual shipping may vary. Large orders may require freight forwarding.
              </p>
            </div>
          )}

          <div className="sm:col-span-2">
            <label className="form-label">Additional Notes</label>
            <textarea className="form-input" rows={4} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Certifications needed, label requirements, shipping preferences, any special requests..." />
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>}

        <button type="submit" disabled={loading}
          className="btn-gold w-full flex items-center justify-center gap-2 py-4 disabled:opacity-50">
          {loading ? 'Submitting...' : 'Submit Brand Inquiry'} {!loading && <ArrowRight size={16} />}
        </button>

        <p className="text-xs text-center text-gray-400">
          We respond within 1-2 business days. Your information is kept confidential.
        </p>
      </form>
    </div>
  )
}

export default function QuotePage() {
  return (
    <div className="bg-[#faf8f3] min-h-screen py-8">
      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <QuoteForm />
      </Suspense>
    </div>
  )
}
