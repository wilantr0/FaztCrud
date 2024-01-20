import { conn } from '@/src/libs/db'
import { NextResponse } from 'next/server'

export async function GET (req, { params }) {
  try {
    const res = await conn.query(
      `SELECT * FROM product WHERE id = ${params.id}`
    )
    if (res.length === 0) {
      return NextResponse.json(
        {
          message: 'Producto no encontrado'
        },
        {
          status: 404
        }
      )
    }
    return NextResponse.json(res)
  } catch (e) {
    console.log(e)
    return NextResponse.json({ message: e.message }, { status: 500 })
  }
}

export async function DELETE (req, { params }) {
  try {
    const res = await conn.query(`DELETE FROM product WHERE id = ${params.id}`)

    if (res.affectedRows === 0) {
      return NextResponse.json(
        {
          message: 'Producto no encontrado'
        },
        {
          status: 404
        }
      )
    }

    return new Response(null, { status: 204 })
  } catch (error) {
    console.log(e)
    return NextResponse.json({ message: e.message }, { status: 500 })
  }
}

export async function PUT (req, { params }) {
  try {
    const data = await req.json()
    const res = await conn.query(
      `UPDATE product SET ? WHERE id = ${params.id}`,
      [data]
    )

    if (res.affectedRows === 0) {
      return NextResponse.json(
        {
          message: 'Producto no encontrado'
        },
        {
          status: 404
        }
      )
    }

    const product = await conn.query(
      `SELECT * FROM product WHERE id = ${params.id}`
    )

    console.log(res)
    return NextResponse.json({ product })
  } catch (e) {
    console.log(e)
    return NextResponse.json({ message: e.message }, { status: 500 })
  }
}
