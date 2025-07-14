"use client";

import { AnimatedBadge } from "@/components/animated-badge";
import { CTAButton } from "@/components/cta-button";
import { CTAButton2 } from "@/components/cta-button2";
import BackgroundRemovalShowcase from "@/components/background-removal-showcase";
import { useState, useEffect,useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import LogoutModal from '@/components/LogoutModel';

export default function Home() {
  const { data: session, status } = useSession();
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const avatarRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
  if (!dropdownOpen && avatarRef.current) {
    const rect = avatarRef.current.getBoundingClientRect();

    // Use rect.left + half image width to center the dropdown horizontally
    setDropdownPosition({
      top: rect.bottom + 8, // 8px below the avatar
      left: rect.left + rect.width / 2 - 72, // 72 = half of dropdown width (144px)
    });
  }

  setDropdownOpen(!dropdownOpen);
};
  const closeDropdown = () => setDropdownOpen(false);

  const handleProPayment = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/razorpay", {
        method: "POST",
      });

      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "PixelForge",
        description: "Pro Plan Subscription",
        order_id: data.id,
        handler: function (response) {
          alert(`Payment Successful: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          contact: "9999999999",
        },
        notes: {
          plan: "Pro",
        },
        theme: {
          color: "#00C896",
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const artImages = [
    { image: "/a.jpg", price: "$120", artType: "Surrealism" },
    { image: "/c.jpg", price: "$150", artType: "Cyberpunk" },
    { image: "s.jpg", price: "$90", artType: "Abstract" },
    { image: "l.jpg", price: "$180", artType: "Landscape" },
    { image: "m.jpg", price: "$110", artType: "Minimalist" },
    { image: "f.jpg", price: "$200", artType: "Fantasy" },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);


  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_40%,transparent_100%)]"></div>

      {/* Green Gradient Glow at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00C896]/10 to-transparent"></div>

      {/* Header */}
  <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl overflow-hidden rounded-full p-[1px]">
        {/* Glowing conic green border */}
        <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#A0F9B4_0%,#5BCE8E_50%,#A0F9B4_100%)] rounded-full z-0 pointer-events-none" />

        {/* Inner Navbar */}
        <div className="relative z-10 flex items-center justify-between rounded-full bg-black px-6 py-4 md:px-8 border border-zinc-800 shadow-xl">
          {/* Logo */}
          <div className="logo">
            <h1 className="text-2xl md:text-3xl font-light text-white font-serif">PixelForge</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 relative">
            <a href="/generate" className="text-gray-300 hover:text-white transition-colors">Generate</a>
            <a href="/remove" className="text-gray-300 hover:text-white transition-colors">Remove BG</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>

            {status === 'loading' ? null : session?.user ? (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="focus:outline-none"
              >
                <img
                  ref={avatarRef}
                  src={session.user.image || ''}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-gray-500 hover:brightness-110"
                />
              </button>
            ) : (
              <button
                onClick={() => router.push('/authenicate')}
                className="bg-black text-white px-6 py-2 rounded-lg border border-gray-800 hover:bg-gray-900 transition-colors"
              >
                Join Now
              </button>
            )}
          </nav>

          {/* Mobile menu icon */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={() => {
            setShowLogoutModal(false);
            signOut();
          }}
        />
      )}
      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
        {/* Animated Badge */}
        <div className="mb-8">
          <AnimatedBadge />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 max-w-4xl leading-tight">
          Generate Stunning AI Images <br className="hidden sm:block" />
          <span className="text-[#00C896]">Smarter</span> and <span className="text-[#00C896]">Faster</span>.
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg text-gray-300 tracking-tight mb-8 max-w-2xl leading-relaxed">
          Transform your ideas into captivating visuals with AI. Create, buy, and sell high-quality images—faster than
          ever, with zero design skills.
        </p>

        {/* CTA Button */}
        <div className="flex gap-2"><CTAButton /> 
        <CTAButton2/></div>
        
      </main>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Everything You Need to Create <span className="text-[#00C896]">Amazing</span> Images
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From AI generation to marketplace trading, we've got all the tools you need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-[#00C896]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Generation</h3>
              <p className="text-gray-400">Create stunning images from text prompts using advanced AI models</p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-[#00C896]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🖼️</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Background Removal</h3>
<p className="text-gray-400">Effortlessly remove image backgrounds with AI precision — perfect for products, profiles, and more.</p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-[#00C896]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
              <p className="text-gray-400">Generate professional images in seconds, not hours</p>
            </div>
          </div>
        </div>
      </section>
      <BackgroundRemovalShowcase />

      {/* How It Works Section */}
      <section className="relative z-10 py-20 px-6 bg-zinc-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              How It <span className="text-[#00C896]">Works</span>
            </h2>
            <p className="text-gray-400 text-lg">Simple steps to create and monetize your AI images</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#00C896] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Describe</h3>
              <p className="text-gray-400 text-sm">Write a detailed prompt describing your desired image</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#00C896] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Generate</h3>
              <p className="text-gray-400 text-sm">Our AI creates multiple variations for you to choose from</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#00C896] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Enhance</h3>
              <p className="text-gray-400 text-sm">Fine-tune and perfect your images with our editing tools</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#00C896] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Sell</h3>
              <p className="text-gray-400 text-sm">List your creations on our marketplace and earn money</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Featured <span className="text-[#00C896]">Creations</span>
            </h2>
            <p className="text-gray-400 text-lg">Discover amazing AI-generated images from our community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            { artImages.map((item) => (
              <div
                key={item.image}
                className="group relative overflow-hidden rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-[#00C896]/50 transition-colors"
              >
                <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                  <img  className="w-full h-full" src={item.image} alt="" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{item.artType}</h3>
                  <p className="text-gray-400 text-sm mb-2">Digital Art • Abstract</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#00C896] font-semibold">{item.price}</span>
                    <button className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-6 bg-zinc-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-light text-[#00C896] mb-2">1M+</div>
              <div className="text-gray-400">Images Generated</div>
            </div>
            <div>
              <div className="text-4xl font-light text-[#00C896] mb-2">50K+</div>
              <div className="text-gray-400">Active Creators</div>
            </div>
            <div>
              <div className="text-4xl font-light text-[#00C896] mb-2">$2M+</div>
              <div className="text-gray-400">Creator Earnings</div>
            </div>
            <div>
              <div className="text-4xl font-light text-[#00C896] mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
     <section  id="pricing" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Choose Your <span className="text-[#00C896]">Plan</span>
            </h2>
            <p className="text-gray-400 text-lg">Start free, upgrade when you need more power</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-2">Starter</h3>
              <div className="text-3xl font-light mb-6">Free</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3"><span className="text-[#00C896]">✓</span><span className="text-gray-300">10 images per month</span></li>
                <li className="flex items-center gap-3"><span className="text-[#00C896]">✓</span><span className="text-gray-300">Basic AI models</span></li>
                <li className="flex items-center gap-3"><span className="text-[#00C896]">✓</span><span className="text-gray-300">Community support</span></li>
              </ul>
              <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-lg transition-colors">Get Started</button>
            </div>

            <div className="bg-zinc-900/50 border-2 border-[#00C896] rounded-xl p-8 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#00C896] text-black px-4 py-1 rounded-full text-sm font-medium">Popular</div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <div className="text-3xl font-light mb-6">₹1900<span className="text-lg text-gray-400">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3"><span className="text-[#00C896]">✓</span><span className="text-gray-300">500 images per month</span></li>
                <li className="flex items-center gap-3"><span className="text-[#00C896]">✓</span><span className="text-gray-300">Advanced AI models</span></li>
                <li className="flex items-center gap-3"><span className="text-[#00C896]">✓</span><span className="text-gray-300">Priority support</span></li>
                <li className="flex items-center gap-3"><span className="text-[#00C896]">✓</span><span className="text-gray-300">Marketplace selling</span></li>
              </ul>
              <button
                onClick={handleProPayment}
                disabled={loading}
                className="w-full bg-[#00C896] hover:bg-[#00C896]/90 text-black py-3 rounded-lg transition-colors font-medium disabled:opacity-50"
              >
                {loading ? "Processing..." : "Start Pro Trial"}
              </button>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <div className="text-3xl font-light mb-6">₹5999<span className="text-lg text-gray-400">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3"><span className="text-[#00C896]">✓</span><span className="text-gray-300">Unlimited images</span></li>
                <li className="flex items-center gap-3"><span className="text-[#00C896]">✓</span><span className="text-gray-300">Custom AI models</span></li>
                <li className="flex items-center gap-3"><span className="text-[#00C896]">✓</span><span className="text-gray-300">Dedicated support</span></li>
                <li className="flex items-center gap-3"><span className="text-[#00C896]">✓</span><span className="text-gray-300">API access</span></li>
              </ul>
              <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-lg transition-colors">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-serif font-light mb-4">PixelForge</h3>
              <p className="text-gray-400 text-sm">
                Transform your ideas into captivating visuals with AI-powered image generation and marketplace.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    AI Generator
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Marketplace
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 PixelForge. All rights reserved.</p>
            <p className="text-gray-400 text-sm">© Developed By Pranav More </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Discord
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
