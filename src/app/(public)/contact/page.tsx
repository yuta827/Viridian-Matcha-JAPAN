'use client'

import { useState } from 'react'
import { CheckCircle, Mail, Phone, MapPin } from 'lucide-react'
import { generateInquiryNumber } from '@/lib/utils'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    company_name: '', contact_person: '', country: '', email: '', phone: '', notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, inquiry_number: generateInquiryNumber(), interested_product: 'General Inquiry' }),
    })
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <>
      <div className="bg-[#1a3009] py-20 text-center px-6">
        <div className="text-xs text-[#b8963e] tracking-widest mb-3">CONTACT</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Get in Touch
        </h1>
        <p className="text-green-200 max-w-xl mx-auto">Ready to discuss your matcha needs? We&apos;d love to hear from you.</p>
      </div>

      <section className="section-padding bg-[#faf8f3]">
        <div className="container-xl max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#1a3009] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Contact Information
              </h2>
              <div className="space-y-5">
                {[
                  { icon: Mail, label: 'Email', value: 'maccha.kuu@gmail.com' },
                  { icon: Phone, label: 'Phone / WhatsApp', value: '+81-52-990-2209' },
                  { icon: MapPin, label: 'Location', value: 'Nagoya, Aichi, Japan' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="p-2 bg-[#2d5016]/10 rounded-lg flex-shrink-0">
                      <Icon className="text-[#2d5016]" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{label}</div>
                      <div className="font-medium text-[#1a3009]">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-[#1a3009] text-white p-6">
                <h3 className="font-bold mb-3">Business Hours</h3>
                <div className="space-y-1 text-sm text-green-200">
                  <div className="flex justify-between"><span>Monday – Friday</span><span>9:00 AM – 6:00 PM JST</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span>10:00 AM – 3:00 PM JST</span></div>
                  <div className="flex justify-between"><span>Sunday / Holidays</span><span>Closed</span></div>
                </div>
                <p className="text-xs text-green-300 mt-4">* We respond to emails within 24 hours on business days.</p>
              </div>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a3009] mb-3">Message Received!</h3>
                  <p className="text-gray-600">We&apos;ll get back to you within 1-2 business days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 space-y-4">
                  <h2 className="text-xl font-bold text-[#1a3009] mb-6">Send a Message</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Company Name</label>
                      <input className="form-input" value={form.company_name} onChange={e => setForm(f => ({ ...f, company_name: e.target.value }))} />
                    </div>
                    <div>
                      <label className="form-label">Name <span className="text-red-500">*</span></label>
                      <input className="form-input" required value={form.contact_person} onChange={e => setForm(f => ({ ...f, contact_person: e.target.value }))} />
                    </div>
                    <div>
                      <label className="form-label">Email <span className="text-red-500">*</span></label>
                      <input type="email" className="form-input" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                    <div>
                      <label className="form-label">Country <span className="text-red-500">*</span></label>
                      <input className="form-input" required value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} />
                    </div>
                    <div>
                      <label className="form-label">Phone / WhatsApp</label>
                      <input className="form-input" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Message <span className="text-red-500">*</span></label>
                    <textarea className="form-input" rows={5} required value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Tell us about your matcha needs..." />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full py-4 disabled:opacity-50">
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
