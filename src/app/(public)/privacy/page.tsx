export const metadata = { title: 'Privacy Policy - Matcha OEM' }
export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <div className="bg-[#1a3009] py-16 text-center px-6">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>Privacy Policy</h1>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16 prose prose-gray">
        <p className="text-gray-500 mb-8">Last updated: January 2024</p>
        <h2>Information We Collect</h2>
        <p>We collect information you provide directly to us, such as company name, contact person, email address, phone number, and business requirements when you submit inquiries or orders.</p>
        <h2>How We Use Your Information</h2>
        <p>We use the information collected to process your inquiries and orders, communicate about your requests, improve our services, and send relevant business updates.</p>
        <h2>Information Sharing</h2>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist in our operations, under strict confidentiality agreements.</p>
        <h2>Data Security</h2>
        <p>We implement industry-standard security measures to protect your personal information. All data is transmitted via SSL encryption.</p>
        <h2>Contact</h2>
        <p>For privacy-related inquiries, please contact us at: info@matchaoem.jp</p>
      </div>
    </div>
  )
}
