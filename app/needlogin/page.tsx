'use client';

import { signIn } from 'next-auth/react';

export default function LoginRequired() {
  return (
    <section className="bg-black text-white min-h-screen flex items-center justify-center px-6">
      <main className="relative z-10 flex flex-col items-center justify-center max-w-2xl text-center">
        {/* Badge */}
        <div className="mb-6">
          <span className="text-sm bg-[#00C896]/10 text-[#00C896] px-3 py-1 rounded-full font-medium tracking-wide">
            Authentication Required
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6 leading-tight">
          You need to <span className="text-[#00C896]">log in</span> to continue
        </h1>

        {/* Subtext */}
        <p className="text-base md:text-lg text-gray-300 mb-8">
          Sign in with your Google account to generate, explore, and sell AI images — smarter and faster.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => signIn('google')}
          className="bg-white text-black px-6 py-3 rounded-lg border border-gray-800 hover:bg-gray-200 transition-colors text-lg font-medium"
        >
          Log in with Google
        </button>
      </main>
    </section>
  );
}