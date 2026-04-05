'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleClick = async () => {
    const email = emailRef.current?.value ?? ''
    const password = passwordRef.current?.value ?? ''

    if (!email || !password) {
      setMessage('メールとパスワードを入力してください')
      return
    }

    setMessage('ログイン中...')
    setLoading(true)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setMessage('エラー: ' + error.message)
      setLoading(false)
      return
    }

    if (data.session) {
      setMessage('成功！ダッシュボードに移動中...')
      window.location.replace('/admin/dashboard')
    } else {
      setMessage('セッション取得失敗')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a3009] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-[#2d5016] p-8 text-center">
          <div className="text-white font-bold text-2xl mb-1">抹茶OEM</div>
          <div className="text-green-200 text-sm">管理画面ログイン</div>
        </div>

        <div className="p-8 space-y-5">
          <div>
            <label className="form-label">メールアドレス</label>
            <input
              ref={emailRef}
              type="email"
              className="form-input"
              defaultValue=""
              autoComplete="username"
            />
          </div>
          <div>
            <label className="form-label">パスワード</label>
            <input
              ref={passwordRef}
              type="password"
              className="form-input"
              defaultValue=""
              autoComplete="current-password"
            />
          </div>

          {message && (
            <div className={`text-sm px-4 py-3 rounded-lg font-mono ${
              message.startsWith('エラー') ? 'bg-red-50 border border-red-200 text-red-800' : 'bg-blue-50 border border-blue-200 text-blue-800'
            }`}>
              {message}
            </div>
          )}

          <button
            type="button"
            onClick={handleClick}
            disabled={loading}
            className="w-full py-3 bg-[#2d5016] text-white font-semibold rounded-lg hover:bg-[#1a3009] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? '処理中...' : 'ログイン'}
          </button>
        </div>
      </div>
    </div>
  )
}
