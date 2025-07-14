import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { imageBase64 } = await req.json()

  if (!imageBase64) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 })
  }

  try {
    const buffer = Buffer.from(imageBase64.split(',')[1], 'base64')

    const formData = new FormData()
    formData.append("image_file", new Blob([buffer]), "image.png")
    formData.append("size", "auto")

    const apiRes = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.REMOVE_BG_API_KEY!,
      },
      body: formData,
    })

    if (!apiRes.ok) {
      const errorText = await apiRes.text()
      return NextResponse.json({ error: errorText }, { status: 500 })
    }

    const resultBuffer = await apiRes.arrayBuffer()
    const resultBase64 = Buffer.from(resultBuffer).toString("base64")

    return NextResponse.json({ image: `data:image/png;base64,${resultBase64}` })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}