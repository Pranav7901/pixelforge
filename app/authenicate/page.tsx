'use client'

import { signIn } from 'next-auth/react'
import { Shield, Chrome } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 md:p-8 border-b border-zinc-800">
        <div className="text-2xl md:text-3xl font-light text-white font-serif">PixelForge</div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[#00C896] font-medium">Back</Link>
        </nav>
      </header>

      <div className="max-w-md mx-auto p-6 mt-16">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#00C896] to-[#00A67E] rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-light mb-2">
              Welcome to <span className="text-[#00C896]">PixelForge</span>
            </h1>
            <p className="text-gray-400">Sign in with Google to get started</p>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-3 border border-zinc-700 hover:border-zinc-600"
          >
            <Chrome className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Footer */}
          <div className="text-center pt-6 text-sm text-gray-400">
            By signing in, you agree to our{' '}
            <span className="text-[#00C896] hover:underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="text-[#00C896] hover:underline cursor-pointer">Privacy Policy</span>.
          </div>
        </div>

        {/* Help */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Need help?{' '}
            <span className="text-[#00C896] hover:underline cursor-pointer">Contact Support</span>
          </p>
        </div>
      </div>
    </div>
  )
}