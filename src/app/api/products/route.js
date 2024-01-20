import { NextResponse } from 'next/server'
import { conn } from '@/src/libs/db'
import { writeFile } from 'fs/promises'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dmrvwbhnm',
  api_key: '832339145844669',
  api_secret: 'jom-AxkC8V6OuXys5BCeL8NtXKM'
})

export async function GET () {
  try {
    const res = await conn.query('SELECT * FROM product')
    return NextResponse.json(res)
  } catch (e) {
    console.log(e)
    return NextResponse.json({ message: e.message }, { status: 500 })
  }
}

export async function POST (req) {
  try {
    const data = await req.formData()
    const image = data.get('image')

    if (image === 'null') {
      return NextResponse.json(
        {
          message: 'image is required'
        },
        {
          status: 400
        }
      )
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filePath = path.join(process.cwd(), 'public', image.name)
    await writeFile(filePath, buffer)

    const uplo = await cloudinary.uploader.upload(filePath)
    console.log(uplo.url)

    const res = await conn.query('INSERT INTO product SET ?', {
      name: data.get('name'),
      description: data.get('description'),
      price: data.get('price'),
      image: uplo.url
    })

    console.log(res)

    return NextResponse.json({
      name: data.get('name'),
      description: data.get('description'),
      price: data.get('price'),
      image: uplo.url,
      id: res.insertId
    })
  } catch (e) {
    console.log(e)
    return NextResponse.json({ message: e.message }, { status: 500 })
  }
}
