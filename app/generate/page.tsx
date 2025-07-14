'use client'

import { useState } from "react"
import Link from "next/link"

export default function GeneratePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [selectedStyle, setSelectedStyle] = useState("")
  const [selectedSize, setSelectedSize] = useState("1024x1024")
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [userInput, setUserInput] = useState('')

  const generateImage = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    try {
      const encodedPrompt = encodeURIComponent(prompt)
      const url = `https://image.pollinations.ai/prompt/${encodedPrompt}`

      // Optional simulated delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setImageUrl(url)
      setGeneratedImages([url])
    } catch (err) {
      console.error("Image generation failed:", err)
    }

    setIsGenerating(false)
  }

  const downloadImage = async () => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'ai-generated.png'
      document.body.appendChild(link)
      link.click()
      link.remove()

      URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Image download failed:", err)
    }
  }

  const styles = [
    { id: "realistic", name: "Realistic", description: "Photorealistic images" },
    { id: "artistic", name: "Artistic", description: "Painterly and stylized" },
    { id: "anime", name: "Anime", description: "Japanese animation style" },
    { id: "abstract", name: "Abstract", description: "Non-representational art" },
  ]

  const sizes = [
    { id: "512x512", name: "512×512", description: "Square" },
    { id: "1024x1024", name: "1024×1024", description: "High-res square" },
    { id: "1024x768", name: "1024×768", description: "Landscape" },
    { id: "768x1024", name: "768×1024", description: "Portrait" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 md:p-8 border-b border-zinc-800">
        <Link href="/" className="text-2xl md:text-3xl font-light text-white font-serif">
          PixelForge
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/generate" className="text-[#00C896] font-medium">
            Generate
          </Link>
          <button className="bg-black text-white px-6 py-2 rounded-lg border border-gray-800 hover:bg-gray-900 transition-colors">
            Join Now
          </button>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            Generate <span className="text-[#00C896]">AI Images</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Transform your ideas into stunning visuals with our advanced AI models
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Generation Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Prompt Input */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Describe Your Image</h3>
              <textarea
                onChange={(e) => {
                  setUserInput(e.target.value)
                  setPrompt(`${e.target.value}${selectedStyle ? `, ${selectedStyle}` : ''}`)
                }}
                placeholder="A majestic dragon flying over a mystical forest at sunset, digital art style..."
                className="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-[#00C896]"
              />
              <div className="mt-4 text-sm text-gray-400">{prompt.length}/500 characters</div>
            </div>

            {/* Style Selection */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Style</h3>
              <div className="grid grid-cols-2 gap-3">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => {
                      setSelectedStyle(style.id)
                      setPrompt(`${userInput}${userInput ? `, ${style.id}` : ''}`)
                    }}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      selectedStyle === style.id
                        ? "border-[#00C896] bg-[#00C896]/10"
                        : "border-zinc-700 hover:border-zinc-600"
                    }`}
                  >
                    <div className="font-medium">{style.name}</div>
                    <div className="text-xs text-gray-400">{style.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Size</h3>
              <div className="space-y-2">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-colors ${
                      selectedSize === size.id
                        ? "border-[#00C896] bg-[#00C896]/10"
                        : "border-zinc-700 hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{size.name}</span>
                      <span className="text-xs text-gray-400">{size.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateImage}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-[#00C896] hover:bg-[#00C896]/90 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-medium py-4 rounded-lg transition-colors"
            >
              {isGenerating ? "Generating..." : "Generate Images"}
            </button>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 min-h-[600px]">
              <h3 className="text-lg font-semibold mb-6">Generated Images</h3>

              {isGenerating ? (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#00C896] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Generating your images...</p>
                  </div>
                </div>
              ) : imageUrl ? (
                <div className="w-full h-full">
                  <div className="group relative">
                    <div className="aspect-square bg-zinc-800 rounded-lg overflow-hidden">
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt="Generated image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <button
                        className="bg-[#00C896] text-black px-4 py-2 rounded-lg font-medium"
                        onClick={downloadImage}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 text-gray-400">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎨</div>
                    <p>Your generated images will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}