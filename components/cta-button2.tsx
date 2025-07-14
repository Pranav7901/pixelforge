'use client'

import { useRouter } from 'next/navigation';
export function CTAButton2() {
   const router = useRouter();
  return (
    <button
  onClick={() => router.push('/remove')}
  className="relative hover:opacity-35 inline-flex h-14 w-36 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-50"
>
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#C2FBD7_0%,#0B8C4C_50%,#C2FBD7_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
    Remove BG <span className="m-2">&#8594;</span>
  </span>
</button>
  )
}