

import type React from "react"
import type { Metadata } from "next"
import { Inter, Crimson_Text } from "next/font/google"
import "./globals.css"
import Providers from './provoider'


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const crimson = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "PixelForge - Generate Stunning AI Images",
  description:
    "Transform your ideas into captivating visuals with AI. Create, buy, and sell high-quality images—faster than ever, with zero design skills.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${crimson.variable} font-sans antialiased`}><Providers>{children}</Providers></body>
    </html>
  )
}
