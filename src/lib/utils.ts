import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(date: string | Date, locale = 'ja-JP') {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function formatDate(date: string | Date, locale = 'ja-JP') {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatCurrency(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function generateOrderNumber(prefix = 'ORD') {
  const date = new Date()
  const y = date.getFullYear().toString().slice(-2)
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const rand = Math.floor(Math.random() * 9000) + 1000
  return `${prefix}-${y}${m}${d}-${rand}`
}

export function generateInquiryNumber() {
  return generateOrderNumber('INQ')
}

export function generateQuoteNumber() {
  return generateOrderNumber('QUO')
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const INQUIRY_STATUS_LABELS: Record<string, string> = {
  new: '新規',
  contacted: '連絡済み',
  sample_requested: 'サンプル依頼中',
  quote_sent: '見積送付済み',
  awaiting_payment: '入金待ち',
  payment_confirmed: '入金確認済み',
  in_production: '製造中',
  shipped: '発送済み',
  completed: '完了',
  closed: 'クローズ',
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  new: '新規',
  processing: '処理中',
  in_production: '製造中',
  shipped: '発送済み',
  completed: '完了',
  cancelled: 'キャンセル',
}

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending: '未払い',
  awaiting_payment: '入金待ち',
  payment_confirmed: '入金確認済み',
  failed: '決済失敗',
  refunded: '返金済み',
}

export const PRODUCT_LINE_LABELS: Record<string, string> = {
  premium: 'ノンオーガニック プレミアムライン',
  standard: 'ノンオーガニック スタンダードライン',
  organic: 'オーガニックライン',
}

export const QUOTE_STATUS_LABELS: Record<string, string> = {
  draft: '下書き',
  sent: '送付済み',
  accepted: '承認済み',
  rejected: '却下',
  expired: '期限切れ',
}
