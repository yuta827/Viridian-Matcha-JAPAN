export const metadata = { title: 'Terms of Service - Matcha OEM' }
export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="bg-[#1a3009] py-16 text-center px-6">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>Terms of Service</h1>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16 prose prose-gray">
        <p className="text-gray-500 mb-8">Last updated: January 2024</p>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing our website and using our services, you agree to these Terms of Service. Please read them carefully.</p>
        <h2>2. OEM Services</h2>
        <p>Our OEM and private label services are available to registered businesses only. All orders are subject to minimum order quantities (MOQ) as specified per product.</p>
        <h2>3. Sample Orders</h2>
        <p>Sample orders are for evaluation purposes only. Sample prices do not reflect bulk pricing. Payment must be completed before samples are shipped.</p>
        <h2>4. Payment Terms</h2>
        <p>Payment is accepted via PayPal or bank transfer. For large OEM orders, payment schedule will be specified in the individual purchase agreement.</p>
        <h2>5. Intellectual Property</h2>
        <p>Custom packaging designs and private label artwork remain the property of the client after payment is completed. Our proprietary formulas and processes remain our exclusive property.</p>
        <h2>6. Limitation of Liability</h2>
        <p>We are not liable for indirect, consequential, or special damages. Our maximum liability is limited to the amount paid for the specific order in question.</p>
        <h2>7. Contact</h2>
        <p>For questions about these terms, contact us at: info@matchaoem.jp</p>
      </div>
    </div>
  )
}
