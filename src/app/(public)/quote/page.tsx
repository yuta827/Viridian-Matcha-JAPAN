'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { generateInquiryNumber } from '@/lib/utils'

function QuoteForm() {
  const searchParams = useSearchParams()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <div className="text-xs text-[#b8963e] tracking-widest mb-2">OEM INQUIRY</div>
        <h1 className="text-3xl font-bold text-[#1a3009] mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
          Request OEM Quote
        </h1>
        <p className="text-gray-600">Fill in your requirements and we'll prepare a custom proposal.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-gray-200 p-8">
        <div className="text-sm font-semibold text-[#1a3009] border-b pb-2">Company & Contact</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Company Name <span className="text-red-500">*</span></label>
            <input className="form-input" required value={form.company_name} onChange={e => set('company_name', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Contact Person <span className="text-red-500">*</span></label>
            <input className="form-input" required value={form.contact_person} onChange={e => set('contact_person', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Country <span className="text-red-500">*</span></label>
            <input className="form-input" required value={form.country} onChange={e => set('country', e.target.value)} placeholder="USA, Germany, Australia..." />
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
            <input className="form-input" value={form.desired_quantity} onChange={e => set('desired_quantity', e.target.value)} placeholder="e.g. 100kg/month, 1 ton/year" />
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
          <div className="sm:col-span-2">
            <label className="form-label">Additional Notes</label>
            <textarea className="form-input" rows={4} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Certifications needed, label requirements, any special requests..." />
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>}

        <button type="submit" disabled={loading}
          className="btn-gold w-full flex items-center justify-center gap-2 py-4 disabled:opacity-50">
          {loading ? 'Submitting...' : 'Submit OEM Inquiry'} {!loading && <ArrowRight size={16} />}
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
