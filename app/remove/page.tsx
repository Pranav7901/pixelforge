"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BackgroundRemovalPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const removeBackground = async () => {
    if (!originalImage) return;
    setIsProcessing(true);
    try {
      const res = await fetch("/api/remove-bg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: originalImage }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setProcessedImage(data.image);
    } catch (error: any) {
      alert("Background removal failed: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement("a");
      link.href = processedImage;
      link.download = "background-removed.png";
      link.click();
    }
  };

  const resetImages = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 md:p-8 border-b border-zinc-800">
        <Link href="/" className="text-2xl md:text-3xl font-light text-white font-serif">
          PixelForge
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/generate" className="text-gray-400 hover:text-white transition-colors">
            Generate
          </Link>
          <Link href="/background-removal" className="text-[#00C896] font-medium">
            Remove BG
          </Link>
          <button className="bg-black text-white px-6 py-2 rounded-lg border border-gray-800 hover:bg-gray-900 transition-colors">
            Join Now
          </button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            Remove <span className="text-[#00C896]">Background</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Upload any image and instantly remove its background with AI precision.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Box */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Upload Image</h3>

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                  dragActive ? "border-[#00C896] bg-[#00C896]/10" : "border-zinc-700 hover:border-zinc-600"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-4xl mb-4">📁</div>
                <p className="text-gray-400 mb-2">Drag and drop your image here</p>
                <p className="text-sm text-gray-500 mb-4">or</p>
                <button className="bg-[#00C896] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#00C896]/90 transition-colors">
                  Browse Files
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
              </div>

              <p className="mt-4 text-sm text-gray-400">Supported: JPG, PNG, WEBP (Max 10MB)</p>
            </div>

            {originalImage && (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Image Details</h3>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-[#00C896]">Ready</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Format:</span>
                    <span>JPG/PNG</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={removeBackground}
                disabled={!originalImage || isProcessing}
                className="w-full bg-[#00C896] hover:bg-[#00C896]/90 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-medium py-4 rounded-lg transition-colors"
              >
                {isProcessing ? "Processing..." : "Remove Background"}
              </button>
              {originalImage && (
                <button
                  onClick={resetImages}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Upload New Image
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 min-h-[600px]">
              <h3 className="text-lg font-semibold mb-6">Results</h3>

              {isProcessing ? (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#00C896] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Removing background...</p>
                    <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
                  </div>
                </div>
              ) : originalImage ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Original Image */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-3">Original</h4>
                    <div className="relative w-full aspect-square bg-zinc-800 rounded-lg overflow-hidden">
                      <Image
                        src={originalImage}
                        alt="Original"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                      />
                    </div>
                  </div>

                  {/* Processed Image */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-3">Background Removed</h4>
                    <div className="relative w-full aspect-square bg-zinc-800 rounded-lg overflow-hidden">
                      {processedImage ? (
                        <div className="group relative h-full">
                          <div
                            className="absolute inset-0 opacity-20"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='10' height='10' fill='%23ffffff'/%3e%3crect x='10' y='10' width='10' height='10' fill='%23ffffff'/%3e%3c/svg%3e")`,
                            }}
                          ></div>
                          <img
                            src={processedImage}
                            alt="Processed"
                            className="relative z-10 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 rounded-lg">
                            <button
                              onClick={downloadImage}
                              className="bg-[#00C896] text-black px-4 py-2 rounded-lg font-medium"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          <p>Processed image will appear here</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 text-gray-400 text-center">
                  <div>
                    <div className="text-6xl mb-4">🖼️</div>
                    <p>Upload an image to get started</p>
                    <p className="text-sm text-gray-500 mt-2">Drag and drop or click browse to select</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}