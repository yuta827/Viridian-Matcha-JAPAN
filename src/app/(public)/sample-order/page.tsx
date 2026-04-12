'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { CheckCircle, ArrowRight, Leaf, Plus, Minus, Trash2, Package, Globe, Truck, Info } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { generateOrderNumber } from '@/lib/utils'
import {
  calculateSampleShipping,
  calculateShipping,
  SHIPPING_COUNTRIES,
  EMS_RATES,
  E_PACKET_LIGHT_RATES,
} from '@/lib/shipping'
import type { Product } from '@/types'

interface CartItem {
  product: Product
  quantity: number
}

// USD/JPY 参考レート
const JPY_USD_RATE = 0.0067 // 1 JPY ≈ $0.0067 (¥149/$1)

// EMS 送料クイックリファレンス（サンプル単位別）
const SHIPPING_REFERENCE = [
  { label: '1 sample (100g)', samples: 1, weightG: 150 },
  { label: '2 samples (200g)', samples: 2, weightG: 250 },
  { label: '3 samples (300g)', samples: 3, weightG: 350 },
  { label: '5 samples (500g)', samples: 5, weightG: 550 },
  { label: '10 samples (1kg)', samples: 10, weightG: 1050 },
]

function SampleOrderContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [step, setStep] = useState<'select' | 'checkout' | 'success'>('select')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [paypalLoaded, setPaypalLoaded] = useState(false)
  const [paypalError, setPaypalError] = useState('')
  const paypalContainerRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  const [form, setForm] = useState({
    email: '', company_name: '', contact_person: '',
    country: '', phone: '',
    address1: '', address2: '', city: '', state: '', postal_code: '',
    payment_method: 'bank_transfer',
  })

  // カート合計
  const totalQuantity = cart.reduce((s, i) => s + i.quantity, 0)
  const productTotal = cart.reduce((s, i) => s + (i.product.sample_price_usd || 0) * i.quantity, 0)

  // 送料計算（国選択後）
  // PayPal SDK ロード
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    if (!clientId || document.getElementById('paypal-sdk')) return
    const script = document.createElement('script')
    script.id = 'paypal-sdk'
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture`
    script.onload = () => setPaypalLoaded(true)
    script.onerror = () => setPaypalError('PayPal の読み込みに失敗しました')
    document.head.appendChild(script)
    // すでに読み込み済みの場合
    if ((window as any).paypal) setPaypalLoaded(true)
  }, [])

  // PayPal ボタンのレンダリング（チェックアウト画面 + 国選択済み + PayPal選択時）
  useEffect(() => {
    if (!paypalLoaded || step !== 'checkout' || form.payment_method !== 'paypal') return
    if (!form.country || shippingCalc?.zone === 'unknown') return
    if (!paypalContainerRef.current) return

    const container = paypalContainerRef.current
    container.innerHTML = ''

    const paypal = (window as any).paypal
    if (!paypal) return

    const finalShipping = calculateSampleShipping(totalQuantity, form.country)
    const itemsTotal = productTotal
    const shippingTotal = finalShipping.recommendedPriceUSD ?? 0
    const orderTotal = itemsTotal + shippingTotal

    paypal.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal', height: 45 },
      createOrder: async () => {
        const res = await fetch('/api/paypal/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: [
              ...cart.map(item => ({
                name: item.product.name_en || item.product.name,
                price: item.product.sample_price_usd || 0,
                quantity: item.quantity,
              })),
              ...(shippingTotal > 0 ? [{ name: 'Shipping', price: shippingTotal, quantity: 1 }] : []),
            ],
            customerInfo: { email: form.email, name: form.contact_person },
          }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'PayPal order creation failed')
        return data.orderId
      },
      onApprove: async (data: { orderID: string }) => {
        setSubmitting(true)
        const finalShipping2 = calculateSampleShipping(totalQuantity, form.country)
        const line_items = cart.map(item => ({
          product_id: item.product.id,
          product_name: item.product.name_en || item.product.name,
          grade: item.product.grade,
          quantity: item.quantity,
          unit: '100g',
          unit_price_usd: item.product.sample_price_usd,
          total_usd: (item.product.sample_price_usd || 0) * item.quantity,
        }))
        await fetch('/api/orders', {
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
            shipping_address: { name: form.contact_person, address1: form.address1, address2: form.address2, city: form.city, state: form.state, postal_code: form.postal_code, country: form.country },
            line_items,
            subtotal_usd: itemsTotal,
            shipping_usd: finalShipping2.recommendedPriceUSD,
            shipping_jpy: finalShipping2.recommendedPriceJPY,
            shipping_zone: finalShipping2.zone,
            shipping_weight_g: finalShipping2.weightGrams,
            shipping_method: finalShipping2.recommended === 'ePacketLight' ? '国際eパケットライト' : 'EMS',
            total_usd: orderTotal,
            payment_method: 'paypal',
            payment_status: 'payment_confirmed',
            paypal_order_id: data.orderID,
            order_status: 'confirmed',
          }),
        })
        setSubmitting(false)
        setStep('success')
      },
      onError: (err: any) => {
        console.error('PayPal error:', err)
        setPaypalError('PayPal の処理中にエラーが発生しました。もう一度お試しください。')
      },
    }).render(container)
  }, [paypalLoaded, step, form.payment_method, form.country, totalQuantity, productTotal])

  const shippingCalc = useMemo(() => {
    if (!form.country || totalQuantity === 0) return null
    return calculateSampleShipping(totalQuantity, form.country)
  }, [form.country, totalQuantity])

  const shippingUSD = shippingCalc?.recommendedPriceUSD ?? 0
  const shippingJPY = shippingCalc?.recommendedPriceJPY ?? 0
  const grandTotal = productTotal + shippingUSD

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*, product_images(url, is_primary)')
        .eq('is_visible', true)
        .in('inquiry_type', ['order', 'both'])
        .not('sample_price_usd', 'is', null)
        .order('line').order('sort_order')
      setProducts(data || [])
      setLoading(false)

      const slug = searchParams.get('product')
      if (slug && data) {
        const p = data.find(p => p.slug === slug)
        if (p) setCart([{ product: p, quantity: 1 }])
      }
    }
    loadProducts()
  }, [])

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { product, quantity: 1 }]
    })
  }

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) setCart(prev => prev.filter(i => i.product.id !== productId))
    else setCart(prev => prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i))
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const finalShipping = calculateSampleShipping(totalQuantity, form.country)

    const line_items = cart.map(item => ({
      product_id: item.product.id,
      product_name: item.product.name_en || item.product.name,
      grade: item.product.grade,
      quantity: item.quantity,
      unit: '100g',
      unit_price_usd: item.product.sample_price_usd,
      total_usd: (item.product.sample_price_usd || 0) * item.quantity,
    }))

    await fetch('/api/orders', {
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
        subtotal_usd: productTotal,
        shipping_usd: finalShipping.recommendedPriceUSD,
        shipping_jpy: finalShipping.recommendedPriceJPY,
        shipping_zone: finalShipping.zone,
        shipping_weight_g: finalShipping.weightGrams,
        shipping_method: finalShipping.recommended === 'ePacketLight' ? '国際eパケットライト' : 'EMS',
        total_usd: productTotal + (finalShipping.recommendedPriceUSD ?? 0),
        payment_method: form.payment_method,
        payment_status: 'awaiting_payment',
        order_status: 'new',
      }),
    })

    setStep('success')
    setSubmitting(false)
  }

  // ── SUCCESS ──────────────────────────────────────
  if (step === 'success') {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-[#1a3009] mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
          Order Received!
        </h2>
        <p className="text-gray-600 mb-2">
          Thank you for your order. We will confirm and ship your samples within 3–5 business days.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          {form.payment_method === 'bank_transfer'
            ? 'Bank transfer details will be sent to your email.'
            : 'Payment confirmed via PayPal. We will ship your samples within 3–5 business days.'}
        </p>
        <a href="/" className="btn-primary inline-flex items-center gap-2">Back to Home <ArrowRight size={16} /></a>
      </div>
    )
  }

  // ── CHECKOUT ──────────────────────────────────────
  if (step === 'checkout') {
    const selectedCountryInfo = SHIPPING_COUNTRIES.find(c => c.code === form.country)

    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <button onClick={() => setStep('select')} className="text-sm text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-1">
          ← Back to product selection
        </button>
        <h1 className="text-2xl font-bold text-[#1a3009] mb-8" style={{ fontFamily: 'var(--font-serif)' }}>Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <form onSubmit={handleCheckout} className="md:col-span-3 space-y-5">

            {/* Contact */}
            <div className="bg-white border border-gray-200 p-6 space-y-4">
              <h2 className="font-semibold text-[#1a3009] border-b border-[#e8e0d0] pb-2">Contact Info</h2>
              <div>
                <label className="form-label">Email <span className="text-red-500">*</span></label>
                <input type="email" className="form-input" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Company Name</label>
                  <input className="form-input" value={form.company_name} onChange={e => setForm(f => ({ ...f, company_name: e.target.value }))} />
                </div>
                <div>
                  <label className="form-label">Contact Person <span className="text-red-500">*</span></label>
                  <input className="form-input" required value={form.contact_person} onChange={e => setForm(f => ({ ...f, contact_person: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="form-label">Phone / WhatsApp</label>
                <input className="form-input" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white border border-gray-200 p-6 space-y-4">
              <h2 className="font-semibold text-[#1a3009] border-b border-[#e8e0d0] pb-2">Shipping Address</h2>

              {/* Country selector */}
              <div>
                <label className="form-label">Country <span className="text-red-500">*</span></label>
                <select
                  className="form-input"
                  required
                  value={form.country}
                  onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                >
                  <option value="">Select country...</option>
                  <optgroup label="🇪🇺 Europe (Zone 3 — EMS / ePacket Light)">
                    {SHIPPING_COUNTRIES.filter(c => c.zone === 'zone3').map(c => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="🇺🇸 USA (Zone 4 — EMS / ePacket Light)">
                    {SHIPPING_COUNTRIES.filter(c => c.zone === 'zone4').map(c => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Shipping fee preview */}
              {shippingCalc && shippingCalc.zone !== 'unknown' && (
                <div className="bg-[#faf8f3] border border-[#e8e0d0] p-4 rounded text-sm space-y-2">
                  <div className="flex items-center gap-2 text-[#2d5016] font-semibold mb-1">
                    <Truck size={15} />
                    Shipping to {selectedCountryInfo?.name}
                  </div>

                  {/* eパケットライト（優先推奨） */}
                  {shippingCalc.ePacketLight.available && shippingCalc.ePacketLight.priceJPY && (
                    <div className={`flex justify-between items-center px-3 py-2 rounded border ${shippingCalc.recommended === 'ePacketLight' ? 'border-[#2d5016] bg-green-50' : 'border-gray-200'}`}>
                      <div>
                        <div className="font-medium text-[#1a3009] flex items-center gap-1">
                          {shippingCalc.recommended === 'ePacketLight' && <span className="text-xs bg-green-600 text-white px-1.5 py-0.5 rounded">Recommended</span>}
                          国際eパケットライト
                        </div>
                        <div className="text-xs text-gray-500">Tracked air mail · Up to 2kg</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#1a3009]">¥{shippingCalc.ePacketLight.priceJPY.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">≈ ${shippingCalc.ePacketLight.priceUSD?.toFixed(2)}</div>
                      </div>
                    </div>
                  )}

                  {/* EMS */}
                  {shippingCalc.ems.available && shippingCalc.ems.priceJPY && (
                    <div className={`flex justify-between items-center px-3 py-2 rounded border ${shippingCalc.recommended === 'ems' ? 'border-[#2d5016] bg-green-50' : 'border-gray-200'}`}>
                      <div>
                        <div className="font-medium text-[#1a3009] flex items-center gap-1">
                          {shippingCalc.recommended === 'ems' && <span className="text-xs bg-green-600 text-white px-1.5 py-0.5 rounded">Recommended</span>}
                          EMS（国際スピード郵便）
                        </div>
                        <div className="text-xs text-gray-500">Express · Tracked · 3–7 days</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#1a3009]">¥{shippingCalc.ems.priceJPY.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">≈ ${shippingCalc.ems.priceUSD?.toFixed(2)}</div>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Info size={11} />
                    Package weight: ~{shippingCalc.weightGrams}g · Charged at lowest available rate
                  </div>
                </div>
              )}

              {form.country && shippingCalc?.zone === 'unknown' && (
                <div className="bg-amber-50 border border-amber-200 p-3 rounded text-sm text-amber-800">
                  ⚠️ This country is not in our standard shipping zone. Please contact us for a shipping quote.
                </div>
              )}

              <div>
                <label className="form-label">Address Line 1 <span className="text-red-500">*</span></label>
                <input className="form-input" required placeholder="Street address" value={form.address1} onChange={e => setForm(f => ({ ...f, address1: e.target.value }))} />
              </div>
              <div>
                <label className="form-label">Address Line 2</label>
                <input className="form-input" placeholder="Apt, suite, floor (optional)" value={form.address2} onChange={e => setForm(f => ({ ...f, address2: e.target.value }))} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="form-label">City <span className="text-red-500">*</span></label>
                  <input className="form-input" required value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
                </div>
                <div>
                  <label className="form-label">State / Region</label>
                  <input className="form-input" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} />
                </div>
                <div>
                  <label className="form-label">Postal Code <span className="text-red-500">*</span></label>
                  <input className="form-input" required value={form.postal_code} onChange={e => setForm(f => ({ ...f, postal_code: e.target.value }))} />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white border border-gray-200 p-6 space-y-3">
              <h2 className="font-semibold text-[#1a3009] border-b border-[#e8e0d0] pb-2">Payment Method</h2>
              <label className="flex items-start gap-3 cursor-pointer p-3 border border-transparent hover:border-[#2d5016] hover:bg-green-50/30 rounded transition-colors">
                <input type="radio" name="payment" value="bank_transfer" checked={form.payment_method === 'bank_transfer'} onChange={() => setForm(f => ({ ...f, payment_method: 'bank_transfer' }))} className="mt-0.5" />
                <div>
                  <div className="font-medium text-[#1a3009]">Bank Transfer (Recommended)</div>
                  <div className="text-xs text-gray-500">Wire transfer to Sumishin SBI Bank. Details will be sent via email after order.</div>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer p-3 border border-transparent hover:border-[#2d5016] hover:bg-green-50/30 rounded transition-colors">
                <input type="radio" name="payment" value="paypal" checked={form.payment_method === 'paypal'} onChange={() => setForm(f => ({ ...f, payment_method: 'paypal' }))} className="mt-0.5" />
                <div>
                  <div className="font-medium text-[#1a3009]">PayPal</div>
                  <div className="text-xs text-gray-500">Pay securely via PayPal. Credit cards accepted via PayPal.</div>
                </div>
              </label>

              {/* PayPal ボタンエリア */}
              {form.payment_method === 'paypal' && (
                <div className="pt-2">
                  {!form.country || shippingCalc?.zone === 'unknown' ? (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded">
                      ⚠️ Please select a valid shipping country above to enable PayPal.
                    </div>
                  ) : submitting ? (
                    <div className="text-center py-4 text-gray-500 text-sm">Processing payment...</div>
                  ) : (
                    <>
                      <div ref={paypalContainerRef} className="min-h-[50px]" />
                      {paypalError && (
                        <p className="text-red-600 text-xs mt-2">{paypalError}</p>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* 銀行振込のみ Place Order ボタン表示 */}
            {form.payment_method === 'bank_transfer' && (
              <button type="submit" disabled={submitting || !form.country || shippingCalc?.zone === 'unknown'}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-50">
                {submitting ? 'Processing...' : 'Place Order'} {!submitting && <ArrowRight size={16} />}
              </button>
            )}
          </form>

          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="bg-[#faf8f3] border border-[#e8e0d0] p-5 sticky top-20">
              <h3 className="font-semibold text-[#1a3009] mb-4">Order Summary</h3>
              <div className="space-y-2 mb-3">
                {cart.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm py-1.5 border-b border-[#e8e0d0]">
                    <div>
                      <div className="font-medium text-xs text-[#1a3009]">{item.product.name_en || item.product.name}</div>
                      <div className="text-xs text-gray-400">{item.quantity} × ${item.product.sample_price_usd} / 100g</div>
                    </div>
                    <div className="font-semibold text-sm">${((item.product.sample_price_usd || 0) * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${productTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <Truck size={12} />
                    {shippingCalc?.recommended === 'ePacketLight' ? 'ePacket Light' : 'EMS Shipping'}
                  </span>
                  <span>
                    {shippingCalc && shippingJPY > 0
                      ? `¥${shippingJPY.toLocaleString()} ≈ $${shippingUSD.toFixed(2)}`
                      : <span className="text-gray-400 text-xs">Select country</span>}
                  </span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-base mt-3 pt-3 border-t border-[#e8e0d0] text-[#1a3009]">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
              {shippingCalc && shippingJPY > 0 && (
                <p className="text-xs text-gray-400 mt-2">
                  * Shipping: ¥{shippingJPY.toLocaleString()} ({shippingCalc.zone === 'zone3' ? 'Europe Zone 3' : 'USA Zone 4'})
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── PRODUCT SELECTION ──────────────────────────────────────
  // カート内アイテムのクイック送料見積もり（EMS + eパケットライト）
  const quickShippingEurope = totalQuantity > 0 ? calculateSampleShipping(totalQuantity, 'DE') : null
  const quickShippingUSA = totalQuantity > 0 ? calculateSampleShipping(totalQuantity, 'US') : null

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <div className="text-xs text-[#b8963e] tracking-widest mb-2">SAMPLE ORDER</div>
        <h1 className="text-3xl font-bold text-[#1a3009] mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
          Order Matcha Samples
        </h1>
        <p className="text-gray-600">Each sample is 100g. Select products and we&apos;ll calculate shipping automatically.</p>
      </div>

      {/* Shipping info banner */}
      <div className="bg-[#1a3009] text-white px-6 py-4 mb-6 flex flex-col sm:flex-row items-center gap-4 text-sm">
        <Truck size={20} className="text-[#b8963e] flex-shrink-0" />
        <div className="text-center sm:text-left">
          <span className="font-semibold">Japan Post International Shipping</span>
          <span className="text-green-300 mx-2">—</span>
          <span className="text-green-200">Tracked · Insured · From Japan</span>
        </div>
        <div className="sm:ml-auto flex gap-6 text-xs text-green-200">
          <div className="text-center"><div className="font-bold text-white text-sm">EMS</div><div>Express 3–7 days</div></div>
          <div className="text-center"><div className="font-bold text-white text-sm">ePacket</div><div>Tracked air (≤2kg)</div></div>
        </div>
      </div>

      {/* EMS & eパケットライト 料金早見表 */}
      <div className="mb-8 bg-white border border-[#e8e0d0] overflow-x-auto">
        <div className="px-4 py-3 border-b border-[#e8e0d0] flex items-center gap-2">
          <Globe size={14} className="text-[#b8963e]" />
          <span className="text-xs font-semibold text-[#1a3009] tracking-wider uppercase">
            Shipping Rate Reference (Japan Post, 2026) — Europe Zone 3 / USA Zone 4
          </span>
        </div>
        <table className="w-full text-xs">
          <thead className="bg-[#faf8f3]">
            <tr>
              <th className="px-3 py-2.5 text-left text-gray-600">Samples</th>
              <th className="px-3 py-2.5 text-center text-gray-500">Weight</th>
              <th className="px-3 py-2.5 text-center bg-green-50 text-[#2d5016] font-bold">🇪🇺 Europe — EMS</th>
              <th className="px-3 py-2.5 text-center bg-green-50/50 text-[#2d5016]">🇪🇺 Europe — ePacket</th>
              <th className="px-3 py-2.5 text-center bg-blue-50 text-blue-800 font-bold">🇺🇸 USA — EMS</th>
              <th className="px-3 py-2.5 text-center bg-blue-50/50 text-blue-800">🇺🇸 USA — ePacket</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0ece4]">
            {SHIPPING_REFERENCE.map(({ label, samples, weightG }) => {
              const euCalc = calculateShipping(weightG, 'DE')
              const usCalc = calculateShipping(weightG, 'US')
              return (
                <tr key={samples} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-left text-gray-700 font-medium">{label}</td>
                  <td className="px-3 py-2 text-center text-gray-400">~{weightG}g</td>
                  <td className="px-3 py-2 text-center bg-green-50 text-[#2d5016] font-semibold">
                    ¥{euCalc.ems.priceJPY?.toLocaleString() ?? '–'}
                    <span className="text-gray-400 font-normal ml-1">≈${euCalc.ems.priceUSD?.toFixed(0)}</span>
                  </td>
                  <td className="px-3 py-2 text-center bg-green-50/50 text-[#2d5016]">
                    {euCalc.ePacketLight.available && euCalc.ePacketLight.priceJPY
                      ? <>¥{euCalc.ePacketLight.priceJPY.toLocaleString()}<span className="text-gray-400 ml-1">≈${euCalc.ePacketLight.priceUSD?.toFixed(0)}</span></>
                      : <span className="text-gray-300">EMS only</span>
                    }
                  </td>
                  <td className="px-3 py-2 text-center bg-blue-50 text-blue-800 font-semibold">
                    ¥{usCalc.ems.priceJPY?.toLocaleString() ?? '–'}
                    <span className="text-gray-400 font-normal ml-1">≈${usCalc.ems.priceUSD?.toFixed(0)}</span>
                  </td>
                  <td className="px-3 py-2 text-center bg-blue-50/50 text-blue-800">
                    {usCalc.ePacketLight.available && usCalc.ePacketLight.priceJPY
                      ? <>¥{usCalc.ePacketLight.priceJPY.toLocaleString()}<span className="text-gray-400 ml-1">≈${usCalc.ePacketLight.priceUSD?.toFixed(0)}</span></>
                      : <span className="text-gray-300">EMS only</span>
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="text-xs text-gray-400 px-4 py-2">
          * Source: Japan Post International Mail Rate Table (2026.1.1). ePacket Light available up to 2kg. USD estimated at ¥149/$.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Products */}
        <div className="lg:col-span-2 space-y-3">
          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading products...</div>
          ) : products.map(product => {
            const img = (product.product_images as any[])?.find((i: any) => i.is_primary) || (product.product_images as any[])?.[0]
            const cartItem = cart.find(i => i.product.id === product.id)
            const lineColor = product.line === 'organic' ? 'bg-amber-100 text-amber-800' :
              product.line === 'premium' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
            return (
              <div key={product.id} className={`bg-white border p-4 flex items-center gap-4 transition-all ${cartItem ? 'border-[#2d5016] shadow-sm' : 'border-gray-200'}`}>
                <div className="w-16 h-16 bg-[#faf8f3] flex-shrink-0 overflow-hidden">
                  {img ? <img src={img.url} alt={product.name} className="w-full h-full object-cover" /> :
                    <div className="w-full h-full flex items-center justify-center"><Leaf className="text-[#2d5016]/20" size={24} /></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs px-1.5 py-0.5 font-medium ${lineColor}`}>
                      {product.line === 'organic' ? 'Organic' : product.line === 'premium' ? 'Premium' : 'Standard'}
                    </span>
                    <span className="text-xs text-[#b8963e] font-mono font-bold">Grade {product.grade}</span>
                  </div>
                  <div className="font-bold text-[#1a3009] text-sm truncate">{product.name_en || product.name}</div>
                  <div className="text-xs text-gray-500 truncate">{product.grade_label_en || product.grade_label}</div>
                  <div className="text-[#2d5016] font-bold text-sm mt-1">${product.sample_price_usd}<span className="text-xs font-normal text-gray-400">/100g</span></div>
                </div>
                {cartItem ? (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => updateQty(product.id, cartItem.quantity - 1)}
                      className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 rounded">
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-[#1a3009]">{cartItem.quantity}</span>
                    <button onClick={() => updateQty(product.id, cartItem.quantity + 1)}
                      className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 rounded">
                      <Plus size={12} />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => addToCart(product)}
                    className="flex-shrink-0 text-sm px-4 py-2 border border-[#2d5016] text-[#2d5016] hover:bg-[#2d5016] hover:text-white transition-colors">
                    Add
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Cart */}
        <div className="lg:col-span-1">
          <div className="bg-[#faf8f3] border border-[#e8e0d0] p-5 sticky top-20">
            <h3 className="font-semibold text-[#1a3009] mb-4 flex items-center gap-2">
              <Package size={16} className="text-[#b8963e]" /> Your Selection
            </h3>

            {cart.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No items selected yet</p>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex items-center gap-2 text-sm">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-xs text-[#1a3009] truncate">{item.product.name_en || item.product.name}</div>
                        <div className="text-gray-500 text-xs">{item.quantity} × ${item.product.sample_price_usd}</div>
                      </div>
                      <span className="font-semibold text-xs">${((item.product.sample_price_usd || 0) * item.quantity).toFixed(2)}</span>
                      <button onClick={() => updateQty(item.product.id, 0)} className="text-red-400 hover:text-red-600 flex-shrink-0">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Shipping estimate */}
                <div className="border-t border-[#e8e0d0] pt-3 space-y-1.5 text-sm mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Products ({totalQuantity} samples)</span>
                    <span>${productTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Quick shipping preview by region */}
                <div className="bg-white border border-[#e8e0d0] p-3 mb-4 text-xs">
                  <div className="font-medium text-[#1a3009] mb-2 flex items-center gap-1">
                    <Globe size={11} className="text-[#b8963e]" />
                    Shipping estimate for {totalQuantity} sample{totalQuantity > 1 ? 's' : ''}:
                  </div>
                  <div className="space-y-2">
                    {/* Europe */}
                    {quickShippingEurope && (
                      <div>
                        <div className="flex justify-between text-gray-500 mb-0.5">
                          <span className="font-medium">🇪🇺 Europe (Zone 3)</span>
                        </div>
                        {quickShippingEurope.ePacketLight.available && (
                          <div className="flex justify-between pl-2">
                            <span className="text-gray-400">ePacket Light</span>
                            <span className="font-semibold text-[#1a3009]">¥{quickShippingEurope.ePacketLight.priceJPY?.toLocaleString()} ≈ ${quickShippingEurope.ePacketLight.priceUSD?.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between pl-2">
                          <span className="text-gray-400">EMS Express</span>
                          <span className="font-semibold text-[#1a3009]">¥{quickShippingEurope.ems.priceJPY?.toLocaleString()} ≈ ${quickShippingEurope.ems.priceUSD?.toFixed(2)}</span>
                        </div>
                      </div>
                    )}
                    {/* USA */}
                    {quickShippingUSA && (
                      <div className="border-t border-[#f0ece4] pt-2">
                        <div className="flex justify-between text-gray-500 mb-0.5">
                          <span className="font-medium">🇺🇸 USA (Zone 4)</span>
                        </div>
                        {quickShippingUSA.ePacketLight.available && (
                          <div className="flex justify-between pl-2">
                            <span className="text-gray-400">ePacket Light</span>
                            <span className="font-semibold text-[#1a3009]">¥{quickShippingUSA.ePacketLight.priceJPY?.toLocaleString()} ≈ ${quickShippingUSA.ePacketLight.priceUSD?.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between pl-2">
                          <span className="text-gray-400">EMS Express</span>
                          <span className="font-semibold text-[#1a3009]">¥{quickShippingUSA.ems.priceJPY?.toLocaleString()} ≈ ${quickShippingUSA.ems.priceUSD?.toFixed(2)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 mt-2">* Exact rate confirmed at checkout</p>
                </div>

                <button onClick={() => setStep('checkout')}
                  className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-sm">
                  Proceed to Checkout <ArrowRight size={15} />
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
      <Suspense fallback={<div className="text-center py-12 text-gray-400">Loading...</div>}>
        <SampleOrderContent />
      </Suspense>
    </div>
  )
}
