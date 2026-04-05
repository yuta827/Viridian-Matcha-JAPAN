'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { CheckCircle, ArrowRight, Leaf, Plus, Minus, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { generateOrderNumber } from '@/lib/utils'
import type { Product } from '@/types'

interface CartItem {
  product: Product
  quantity: number
}

function SampleOrderContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [step, setStep] = useState<'select' | 'checkout' | 'success'>('select')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const supabase = createClient()

  const [form, setForm] = useState({
    email: '', company_name: '', contact_person: '',
    country: '', phone: '',
    address1: '', address2: '', city: '', state: '', postal_code: '',
    payment_method: 'paypal',
  })

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('products')
        .select('*, product_images(url, is_primary)')
        .eq('is_visible', true)
        .in('inquiry_type', ['order', 'both'])
        .not('sample_price_usd', 'is', null)
        .order('line').order('sort_order')
      setProducts(data || [])
      setLoading(false)

      // Pre-select from URL
      const slug = searchParams.get('product')
      if (slug && data) {
        const p = data.find(p => p.slug === slug)
        if (p) addToCart(p, data)
      }
    }
    fetch()
  }, [])

  const addToCart = (product: Product, allProducts?: Product[]) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { product, quantity: 1 }]
    })
  }

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(i => i.product.id !== productId))
    } else {
      setCart(prev => prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i))
    }
  }

  const total = cart.reduce((sum, item) => sum + (item.product.sample_price_usd || 0) * item.quantity, 0)

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const line_items = cart.map(item => ({
      product_id: item.product.id,
      product_name: item.product.name_en || item.product.name,
      grade: item.product.grade,
      quantity: item.quantity,
      unit: '100g',
      unit_price_usd: item.product.sample_price_usd,
      total_usd: (item.product.sample_price_usd || 0) * item.quantity,
    }))

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_number: generateOrderNumber('SMP'),
        order_type: 'sample',
        email: form.email,
        company_name: form.company_name,
        contact_person: form.contact_person,
        country: form.country,
        phone: form.phone,
        shipping_address: {
          name: form.contact_person,
          address1: form.address1,
          address2: form.address2,
          city: form.city,
          state: form.state,
          postal_code: form.postal_code,
          country: form.country,
        },
        line_items,
        subtotal_usd: total,
        total_usd: total,
        payment_method: form.payment_method,
        payment_status: 'awaiting_payment',
        order_status: 'new',
      }),
    })

    if (res.ok) {
      setStep('success')
    }
    setSubmitting(false)
  }

  if (step === 'success') {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-[#1a3009] mb-4">Order Received!</h2>
        <p className="text-gray-600 mb-8">
          {form.payment_method === 'paypal'
            ? 'Please complete PayPal payment. We will ship your samples within 3-5 business days after payment confirmation.'
            : 'Please complete bank transfer. We will ship your samples after payment confirmation. Bank details will be sent to your email.'}
        </p>
        <a href="/" className="btn-primary inline-flex items-center gap-2">Back to Home <ArrowRight size={16} /></a>
      </div>
    )
  }

  if (step === 'checkout') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <button onClick={() => setStep('select')} className="text-sm text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-1">
          ← Back to product selection
        </button>
        <h1 className="text-2xl font-bold text-[#1a3009] mb-6">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <form onSubmit={handleCheckout} className="md:col-span-3 space-y-4">
            <div className="bg-white border border-gray-200 p-6 space-y-4">
              <h2 className="font-semibold text-gray-900 border-b pb-2">Contact Info</h2>
              <div><label className="form-label">Email <span className="text-red-500">*</span></label><input type="email" className="form-input" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="form-label">Company Name</label><input className="form-input" value={form.company_name} onChange={e => setForm(f => ({ ...f, company_name: e.target.value }))} /></div>
                <div><label className="form-label">Contact Person <span className="text-red-500">*</span></label><input className="form-input" required value={form.contact_person} onChange={e => setForm(f => ({ ...f, contact_person: e.target.value }))} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="form-label">Country <span className="text-red-500">*</span></label><input className="form-input" required value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} /></div>
                <div><label className="form-label">Phone</label><input className="form-input" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-6 space-y-4">
              <h2 className="font-semibold text-gray-900 border-b pb-2">Shipping Address</h2>
              <div><label className="form-label">Address <span className="text-red-500">*</span></label><input className="form-input" required value={form.address1} onChange={e => setForm(f => ({ ...f, address1: e.target.value }))} /></div>
              <div><label className="form-label">Address 2</label><input className="form-input" value={form.address2} onChange={e => setForm(f => ({ ...f, address2: e.target.value }))} /></div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="form-label">City <span className="text-red-500">*</span></label><input className="form-input" required value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} /></div>
                <div><label className="form-label">State</label><input className="form-input" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} /></div>
                <div><label className="form-label">Postal Code <span className="text-red-500">*</span></label><input className="form-input" required value={form.postal_code} onChange={e => setForm(f => ({ ...f, postal_code: e.target.value }))} /></div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-6 space-y-3">
              <h2 className="font-semibold text-gray-900 border-b pb-2">Payment Method</h2>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="payment" value="paypal" checked={form.payment_method === 'paypal'} onChange={() => setForm(f => ({ ...f, payment_method: 'paypal' }))} />
                <span className="font-medium">PayPal</span>
                <span className="text-xs text-gray-400">Secure online payment</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="payment" value="bank_transfer" checked={form.payment_method === 'bank_transfer'} onChange={() => setForm(f => ({ ...f, payment_method: 'bank_transfer' }))} />
                <span className="font-medium">Bank Transfer</span>
                <span className="text-xs text-gray-400">Details will be sent via email</span>
              </label>
            </div>

            <button type="submit" disabled={submitting}
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-50">
              {submitting ? 'Processing...' : 'Place Order'} {!submitting && <ArrowRight size={16} />}
            </button>
          </form>

          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="bg-[#faf8f3] border border-[#e8e0d0] p-5 sticky top-20">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              {cart.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm py-2 border-b border-[#e8e0d0]">
                  <div>
                    <div className="font-medium">{item.product.name_en || item.product.name}</div>
                    <div className="text-xs text-gray-500">{item.quantity} × ${item.product.sample_price_usd}</div>
                  </div>
                  <div className="font-semibold">${((item.product.sample_price_usd || 0) * item.quantity).toFixed(2)}</div>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg mt-4 text-[#1a3009]">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <div className="text-xs text-[#b8963e] tracking-widest mb-2">SAMPLE ORDER</div>
        <h1 className="text-3xl font-bold text-[#1a3009] mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
          Order Matcha Samples
        </h1>
        <p className="text-gray-600">Select products and quantities. We ship samples worldwide.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Products */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading products...</div>
          ) : (
            products.map(product => {
              const img = (product.product_images as any[])?.find((i: any) => i.is_primary) || (product.product_images as any[])?.[0]
              const cartItem = cart.find(i => i.product.id === product.id)
              return (
                <div key={product.id} className="bg-white border border-gray-200 p-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#faf8f3] flex-shrink-0 overflow-hidden">
                    {img ? <img src={img.url} alt={product.name} className="w-full h-full object-cover" /> :
                      <div className="w-full h-full flex items-center justify-center"><Leaf className="text-[#2d5016]/20" size={24} /></div>}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[#1a3009] text-sm">{product.name_en || product.name}</div>
                    <div className="text-xs text-gray-500">{product.grade_label_en || product.grade_label}</div>
                    <div className="text-[#2d5016] font-semibold text-sm mt-1">${product.sample_price_usd}/100g</div>
                  </div>
                  {cartItem ? (
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(product.id, cartItem.quantity - 1)}
                        className="w-7 h-7 border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{cartItem.quantity}</span>
                      <button onClick={() => updateQty(product.id, cartItem.quantity + 1)}
                        className="w-7 h-7 border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                        <Plus size={12} />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(product)}
                      className="text-sm px-4 py-2 border border-[#2d5016] text-[#2d5016] hover:bg-[#2d5016] hover:text-white transition-colors">
                      Add
                    </button>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Cart */}
        <div className="lg:col-span-1">
          <div className="bg-[#faf8f3] border border-[#e8e0d0] p-5 sticky top-20">
            <h3 className="font-semibold text-gray-900 mb-4">Your Selection</h3>
            {cart.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">No items selected</p>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex items-center gap-2 text-sm">
                      <div className="flex-1">
                        <div className="font-medium text-xs">{item.product.name_en || item.product.name}</div>
                        <div className="text-gray-500 text-xs">{item.quantity} × ${item.product.sample_price_usd}</div>
                      </div>
                      <span className="font-semibold">${((item.product.sample_price_usd || 0) * item.quantity).toFixed(2)}</span>
                      <button onClick={() => updateQty(item.product.id, 0)} className="text-red-400 hover:text-red-600">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#e8e0d0] pt-3 mb-4">
                  <div className="flex justify-between font-bold text-[#1a3009]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button onClick={() => setStep('checkout')}
                  className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SampleOrderPage() {
  return (
    <div className="bg-[#faf8f3] min-h-screen">
      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <SampleOrderContent />
      </Suspense>
    </div>
  )
}
