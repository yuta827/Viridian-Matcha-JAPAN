export type ProductLine = 'premium' | 'standard' | 'organic'
export type InquiryType = 'order' | 'inquiry' | 'both'

export interface Product {
  id: string
  name: string
  name_en?: string
  slug: string
  line: ProductLine
  grade: string
  grade_label?: string
  grade_label_en?: string
  description?: string
  description_en?: string
  moq: number
  packaging?: string
  origin?: string
  usage_suggestions?: string
  usage_suggestions_en?: string
  sample_price_usd?: number
  inquiry_type: InquiryType
  is_recommended: boolean
  is_visible: boolean
  sort_order: number
  created_at: string
  updated_at: string
  product_images?: ProductImage[]
}

export interface ProductImage {
  id: string
  product_id: string
  url: string
  alt?: string
  is_primary: boolean
  sort_order: number
  created_at: string
}

export type InquiryStatus =
  | 'new' | 'contacted' | 'sample_requested' | 'quote_sent'
  | 'awaiting_payment' | 'payment_confirmed' | 'in_production'
  | 'shipped' | 'completed' | 'closed'

export interface Inquiry {
  id: string
  inquiry_number: string
  company_name: string
  contact_person: string
  country: string
  email: string
  phone?: string
  interested_product?: string
  product_id?: string
  desired_quantity?: string
  packaging_preference?: string
  target_market?: string
  delivery_schedule?: string
  notes?: string
  status: InquiryStatus
  admin_notes?: string
  created_at: string
  updated_at: string
  products?: Product
}

export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'

export interface Quote {
  id: string
  quote_number: string
  inquiry_id?: string
  company_name: string
  contact_email: string
  line_items: QuoteLineItem[]
  subtotal_usd?: number
  shipping_usd?: number
  total_usd?: number
  valid_until?: string
  payment_method?: 'paypal' | 'bank_transfer'
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'
  notes?: string
  admin_notes?: string
  created_at: string
  updated_at: string
}

export interface QuoteLineItem {
  product_id?: string
  product_name: string
  grade: string
  quantity: number
  unit: string
  unit_price_usd: number
  total_usd: number
}

export type PaymentStatus = 'pending' | 'awaiting_payment' | 'payment_confirmed' | 'failed' | 'refunded'
export type OrderStatus = 'new' | 'processing' | 'in_production' | 'shipped' | 'completed' | 'cancelled'

export interface Order {
  id: string
  order_number: string
  order_type: 'sample' | 'oem'
  company_name?: string
  contact_person?: string
  country?: string
  email: string
  phone?: string
  shipping_address?: ShippingAddress
  line_items: OrderLineItem[]
  subtotal_usd?: number
  shipping_usd?: number
  total_usd?: number
  payment_method?: 'paypal' | 'bank_transfer'
  payment_status: PaymentStatus
  order_status: OrderStatus
  paypal_order_id?: string
  paypal_capture_id?: string
  bank_transfer_ref?: string
  quote_id?: string
  admin_notes?: string
  created_at: string
  updated_at: string
}

export interface OrderLineItem {
  product_id?: string
  product_name: string
  grade: string
  quantity: number
  unit: string
  unit_price_usd: number
  total_usd: number
}

export interface ShippingAddress {
  name: string
  company?: string
  address1: string
  address2?: string
  city: string
  state?: string
  postal_code: string
  country: string
}

export interface NewsPost {
  id: string
  title: string
  title_en?: string
  slug: string
  excerpt?: string
  excerpt_en?: string
  content?: string
  content_en?: string
  thumbnail_url?: string
  category: string
  is_published: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

export interface FaqItem {
  id: string
  question: string
  question_en?: string
  answer: string
  answer_en?: string
  category: string
  sort_order: number
  is_visible: boolean
  created_at: string
  updated_at: string
}

export interface Banner {
  id: string
  title?: string
  title_en?: string
  subtitle?: string
  subtitle_en?: string
  image_url?: string
  link_url?: string
  link_text?: string
  link_text_en?: string
  sort_order: number
  is_visible: boolean
  created_at: string
  updated_at: string
}

export interface CmsSection {
  id: string
  section_key: string
  section_name: string
  is_visible: boolean
  sort_order: number
  updated_at: string
}

export interface CmsContent {
  id: string
  section_key: string
  content_key: string
  content_type: 'text' | 'html' | 'image' | 'json'
  value?: string
  value_en?: string
  label?: string
  updated_at: string
}

export interface CompanyInfo {
  id: string
  key: string
  value?: string
  value_en?: string
  label?: string
  updated_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value?: string
  label?: string
  updated_at: string
}
