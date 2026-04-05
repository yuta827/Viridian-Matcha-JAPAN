/**
 * 国際送料計算ユーティリティ
 * 日本郵便 国際郵便早見表 2026.1.1現在 に基づく
 */

// ===== EMS（国際スピード郵便）料金表 =====
// 単位：円
// 第3地帯：オセアニア・カナダ・メキシコ・中近東・ヨーロッパ
// 第4地帯：米国（グアム等海外領土含む）

export const EMS_RATES: { maxWeight: number; zone3: number; zone4: number }[] = [
  { maxWeight: 500,   zone3: 3150,  zone4: 3900  },
  { maxWeight: 600,   zone3: 3400,  zone4: 4180  },
  { maxWeight: 700,   zone3: 3650,  zone4: 4460  },
  { maxWeight: 800,   zone3: 3900,  zone4: 4740  },
  { maxWeight: 900,   zone3: 4150,  zone4: 5020  },
  { maxWeight: 1000,  zone3: 4400,  zone4: 5300  },
  { maxWeight: 1250,  zone3: 5000,  zone4: 5990  },
  { maxWeight: 1500,  zone3: 5550,  zone4: 6600  },
  { maxWeight: 1750,  zone3: 6150,  zone4: 7290  },
  { maxWeight: 2000,  zone3: 6700,  zone4: 7900  },
  { maxWeight: 2500,  zone3: 7750,  zone4: 9100  },
  { maxWeight: 3000,  zone3: 8800,  zone4: 10300 },
  { maxWeight: 3500,  zone3: 9850,  zone4: 11500 },
  { maxWeight: 4000,  zone3: 10900, zone4: 12700 },
  { maxWeight: 4500,  zone3: 11950, zone4: 13900 },
  { maxWeight: 5000,  zone3: 13000, zone4: 15100 },
  { maxWeight: 5500,  zone3: 14050, zone4: 16300 },
  { maxWeight: 6000,  zone3: 15100, zone4: 17500 },
  { maxWeight: 7000,  zone3: 17200, zone4: 19900 },
  { maxWeight: 8000,  zone3: 19300, zone4: 22300 },
  { maxWeight: 9000,  zone3: 21400, zone4: 24700 },
  { maxWeight: 10000, zone3: 23500, zone4: 27100 },
  { maxWeight: 11000, zone3: 25600, zone4: 29500 },
  { maxWeight: 12000, zone3: 27700, zone4: 31900 },
  { maxWeight: 13000, zone3: 29800, zone4: 34300 },
  { maxWeight: 14000, zone3: 31900, zone4: 36700 },
  { maxWeight: 15000, zone3: 34000, zone4: 39100 },
  { maxWeight: 16000, zone3: 36100, zone4: 41500 },
  { maxWeight: 17000, zone3: 38200, zone4: 43900 },
  { maxWeight: 18000, zone3: 40300, zone4: 46300 },
  { maxWeight: 19000, zone3: 42400, zone4: 48700 },
  { maxWeight: 20000, zone3: 44500, zone4: 51100 },
  { maxWeight: 21000, zone3: 46600, zone4: 53500 },
  { maxWeight: 22000, zone3: 48700, zone4: 55900 },
  { maxWeight: 23000, zone3: 50800, zone4: 58300 },
  { maxWeight: 24000, zone3: 52900, zone4: 60700 },
  { maxWeight: 25000, zone3: 55000, zone4: 63100 },
  { maxWeight: 26000, zone3: 57100, zone4: 65500 },
  { maxWeight: 27000, zone3: 59200, zone4: 67900 },
  { maxWeight: 28000, zone3: 61300, zone4: 70300 },
  { maxWeight: 29000, zone3: 63400, zone4: 72700 },
  { maxWeight: 30000, zone3: 65500, zone4: 75100 },
]

// ===== 国際eパケットライト料金表 =====
// 2kgまで対応、国際特定記録料金370円含む
// 第3地帯：ヨーロッパ等  第4地帯：米国等

export const E_PACKET_LIGHT_RATES: { maxWeight: number; zone3: number; zone4: number }[] = [
  { maxWeight: 100,  zone3: 880,  zone4: 1200 },
  { maxWeight: 200,  zone3: 1060, zone4: 1410 },
  { maxWeight: 300,  zone3: 1240, zone4: 1620 },
  { maxWeight: 400,  zone3: 1420, zone4: 1830 },
  { maxWeight: 500,  zone3: 1600, zone4: 2040 },
  { maxWeight: 600,  zone3: 1780, zone4: 2250 },
  { maxWeight: 700,  zone3: 1960, zone4: 2460 },
  { maxWeight: 800,  zone3: 2140, zone4: 2670 },
  { maxWeight: 900,  zone3: 2320, zone4: 2880 },
  { maxWeight: 1000, zone3: 2500, zone4: 3090 },
  { maxWeight: 1100, zone3: 2680, zone4: 3300 },
  { maxWeight: 1200, zone3: 2860, zone4: 3510 },
  { maxWeight: 1300, zone3: 3040, zone4: 3720 },
  { maxWeight: 1400, zone3: 3220, zone4: 3930 },
  { maxWeight: 1500, zone3: 3400, zone4: 4140 },
  { maxWeight: 1600, zone3: 3580, zone4: 4350 },
  { maxWeight: 1700, zone3: 3760, zone4: 4560 },
  { maxWeight: 1800, zone3: 3940, zone4: 4770 },
  { maxWeight: 1900, zone3: 4120, zone4: 4980 },
  { maxWeight: 2000, zone3: 4300, zone4: 5190 },
]

// ===== 地帯判定 =====
export type ShippingZone = 'zone3' | 'zone4' | 'unknown'
export type ShippingRegion = 'europe' | 'usa' | 'other'

// ヨーロッパ（第3地帯）の国コード一覧
const EUROPE_COUNTRIES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'NO', 'CH',
  'IS', 'AD', 'AL', 'AM', 'AZ', 'BA', 'BY', 'GE', 'GI', 'JE',
  'LI', 'MC', 'MD', 'ME', 'MK', 'RS', 'RU', 'SM', 'UA', 'VA',
]

// 米国・グアム等（第4地帯）の国コード一覧
const USA_COUNTRIES = ['US', 'GU', 'MP', 'PR', 'VI', 'AS', 'UM']

export function getShippingZone(countryCode: string): ShippingZone {
  const code = countryCode.toUpperCase()
  if (EUROPE_COUNTRIES.includes(code)) return 'zone3'
  if (USA_COUNTRIES.includes(code)) return 'zone4'
  return 'unknown'
}

export function getShippingRegion(countryCode: string): ShippingRegion {
  const zone = getShippingZone(countryCode)
  if (zone === 'zone3') return 'europe'
  if (zone === 'zone4') return 'usa'
  return 'other'
}

// ===== 送料計算 =====
export interface ShippingCalculation {
  weightGrams: number
  zone: ShippingZone
  ems: {
    available: boolean
    priceJPY: number | null
    priceUSD: number | null
  }
  ePacketLight: {
    available: boolean
    priceJPY: number | null
    priceUSD: number | null
  }
  recommended: 'ems' | 'ePacketLight' | null
  recommendedPriceJPY: number | null
  recommendedPriceUSD: number | null
}

// JPY to USD conversion rate (approximate, should be updated)
const JPY_TO_USD_RATE = 0.0067 // 1 JPY ≈ 0.0067 USD (1 USD ≈ 149 JPY)

export function calculateShipping(
  weightGrams: number,
  countryCode: string,
  exchangeRate: number = JPY_TO_USD_RATE
): ShippingCalculation {
  const zone = getShippingZone(countryCode)

  // eパケットライト（2kgまで）
  let ePacketJPY: number | null = null
  const ePacketAvailable = weightGrams <= 2000 && zone !== 'unknown'
  if (ePacketAvailable) {
    const row = E_PACKET_LIGHT_RATES.find(r => weightGrams <= r.maxWeight)
    if (row) {
      ePacketJPY = zone === 'zone3' ? row.zone3 : row.zone4
    }
  }

  // EMS（30kgまで）
  let emsJPY: number | null = null
  const emsAvailable = weightGrams <= 30000 && zone !== 'unknown'
  if (emsAvailable) {
    const row = EMS_RATES.find(r => weightGrams <= r.maxWeight)
    if (row) {
      emsJPY = zone === 'zone3' ? row.zone3 : row.zone4
    }
  }

  // 推奨サービス（eパケットライトが使える場合はそちら優先、安いため）
  let recommended: 'ems' | 'ePacketLight' | null = null
  let recommendedPriceJPY: number | null = null

  if (ePacketJPY !== null && emsJPY !== null) {
    // 両方使える場合はeパケットライトが安いので推奨
    recommended = 'ePacketLight'
    recommendedPriceJPY = ePacketJPY
  } else if (emsJPY !== null) {
    recommended = 'ems'
    recommendedPriceJPY = emsJPY
  } else if (ePacketJPY !== null) {
    recommended = 'ePacketLight'
    recommendedPriceJPY = ePacketJPY
  }

  return {
    weightGrams,
    zone,
    ems: {
      available: emsAvailable,
      priceJPY: emsJPY,
      priceUSD: emsJPY ? Math.ceil(emsJPY * exchangeRate * 100) / 100 : null,
    },
    ePacketLight: {
      available: ePacketAvailable,
      priceJPY: ePacketJPY,
      priceUSD: ePacketJPY ? Math.ceil(ePacketJPY * exchangeRate * 100) / 100 : null,
    },
    recommended,
    recommendedPriceJPY,
    recommendedPriceUSD: recommendedPriceJPY
      ? Math.ceil(recommendedPriceJPY * exchangeRate * 100) / 100
      : null,
  }
}

// ===== サンプル注文用送料計算 =====
// サンプルは100g単位
export function calculateSampleShipping(
  quantityItems: number, // 商品種類数 × 個数
  countryCode: string
): ShippingCalculation {
  // 各商品100g × 個数 = 合計重量（梱包材50g追加）
  const weightGrams = quantityItems * 100 + 50
  return calculateShipping(weightGrams, countryCode)
}

// ===== OEM注文用送料計算 =====
// kg単位の大口注文
export function calculateOEMShipping(
  weightKg: number,
  countryCode: string
): ShippingCalculation {
  const weightGrams = weightKg * 1000
  return calculateShipping(weightGrams, countryCode)
}

// ===== 国名リスト（ドロップダウン用） =====
export const SHIPPING_COUNTRIES = [
  // ヨーロッパ（第3地帯）
  { code: 'AT', name: 'Austria / オーストリア', zone: 'zone3' },
  { code: 'BE', name: 'Belgium / ベルギー', zone: 'zone3' },
  { code: 'BG', name: 'Bulgaria / ブルガリア', zone: 'zone3' },
  { code: 'HR', name: 'Croatia / クロアチア', zone: 'zone3' },
  { code: 'CZ', name: 'Czech Republic / チェコ', zone: 'zone3' },
  { code: 'DK', name: 'Denmark / デンマーク', zone: 'zone3' },
  { code: 'EE', name: 'Estonia / エストニア', zone: 'zone3' },
  { code: 'FI', name: 'Finland / フィンランド', zone: 'zone3' },
  { code: 'FR', name: 'France / フランス', zone: 'zone3' },
  { code: 'DE', name: 'Germany / ドイツ', zone: 'zone3' },
  { code: 'GR', name: 'Greece / ギリシャ', zone: 'zone3' },
  { code: 'HU', name: 'Hungary / ハンガリー', zone: 'zone3' },
  { code: 'IE', name: 'Ireland / アイルランド', zone: 'zone3' },
  { code: 'IT', name: 'Italy / イタリア', zone: 'zone3' },
  { code: 'LV', name: 'Latvia / ラトビア', zone: 'zone3' },
  { code: 'LT', name: 'Lithuania / リトアニア', zone: 'zone3' },
  { code: 'LU', name: 'Luxembourg / ルクセンブルク', zone: 'zone3' },
  { code: 'MT', name: 'Malta / マルタ', zone: 'zone3' },
  { code: 'NL', name: 'Netherlands / オランダ', zone: 'zone3' },
  { code: 'NO', name: 'Norway / ノルウェー', zone: 'zone3' },
  { code: 'PL', name: 'Poland / ポーランド', zone: 'zone3' },
  { code: 'PT', name: 'Portugal / ポルトガル', zone: 'zone3' },
  { code: 'RO', name: 'Romania / ルーマニア', zone: 'zone3' },
  { code: 'RU', name: 'Russia / ロシア', zone: 'zone3' },
  { code: 'SK', name: 'Slovakia / スロバキア', zone: 'zone3' },
  { code: 'SI', name: 'Slovenia / スロベニア', zone: 'zone3' },
  { code: 'ES', name: 'Spain / スペイン', zone: 'zone3' },
  { code: 'SE', name: 'Sweden / スウェーデン', zone: 'zone3' },
  { code: 'CH', name: 'Switzerland / スイス', zone: 'zone3' },
  { code: 'GB', name: 'United Kingdom / イギリス', zone: 'zone3' },
  { code: 'UA', name: 'Ukraine / ウクライナ', zone: 'zone3' },
  // 米国（第4地帯）
  { code: 'US', name: 'United States / アメリカ', zone: 'zone4' },
  { code: 'GU', name: 'Guam / グアム', zone: 'zone4' },
] as const

export type CountryCode = typeof SHIPPING_COUNTRIES[number]['code']

// ===== 送料区分ラベル =====
export function getZoneLabel(zone: ShippingZone): string {
  switch (zone) {
    case 'zone3': return 'Europe / ヨーロッパ（第3地帯）'
    case 'zone4': return 'USA / アメリカ（第4地帯）'
    default: return 'Not available / 対応地域外'
  }
}

export function getServiceLabel(service: 'ems' | 'ePacketLight'): string {
  return service === 'ems'
    ? 'EMS（国際スピード郵便）'
    : '国際eパケットライト（追跡付き航空便）'
}
