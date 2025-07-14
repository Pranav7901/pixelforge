'use client'

import { ArrowRight } from "lucide-react"
import { useRouter } from 'next/navigation' 
import Image from 'next/image';

export default function BackgroundRemovalShowcase() {

  const router = useRouter();
  return (
    <section className="relative z-10 py-20 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            See the <span className="text-[#00C896]">Magic</span> in Action
          </h2>
          <p className="text-gray-400 text-lg">Professional background removal with AI precision</p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Before Image */}
            <div className="space-y-4">
              <div className="text-center">
                <span className="inline-block bg-zinc-800 text-gray-300 px-6 py-2 rounded-lg text-sm font-medium">
                  BEFORE
                </span>
              </div>
              <div className="relative group">
                <div className="aspect-square bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700">
                  <Image
  src="/before.jpg"
  alt="Before background removal"
  fill // This makes the image responsive like `w-full h-full`
  className="object-cover"
  priority // Optional: load immediately if above-the-fold
/>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* After Image */}
            <div className="space-y-4">
              <div className="text-center">
                <span className="inline-block bg-[#00C896] text-black px-6 py-2 rounded-lg text-sm font-medium">
                  AFTER
                </span>
              </div>
              <div className="relative group">
                <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl overflow-hidden border border-[#00C896]/30">
                  

<Image
  src="/after.png"
  alt="After background removal"
  fill
  className="object-cover"
  priority // Remove this if the image is not above-the-fold
/>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#00C896]/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          {/* Arrow Divider */}
          <div className="flex justify-center mt-8">
            <button
  onClick={() => router.push('/remove')}
  className="relative hover:opacity-35 inline-flex h-14 w-24 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-50"
>
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#C2FBD7_0%,#0B8C4C_50%,#C2FBD7_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
   <ArrowRight className="w-8 h-6" />
  </span>
</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-light text-[#00C896] mb-2">99.9%</div>
            <div className="text-gray-400 text-sm">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-[#00C896] mb-2">{"<3s"}</div>
            <div className="text-gray-400 text-sm">Processing Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-[#00C896] mb-2">4K</div>
            <div className="text-gray-400 text-sm">Max Resolution</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-[#00C896] mb-2">AI</div>
            <div className="text-gray-400 text-sm">Powered</div>
          </div>
        </div>
      </div>
    </section>
  )
}
