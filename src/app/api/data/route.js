import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    // 1. 接收參數 (Receiving parameters)
    const body = await request.json()
    const { name, message } = body

    if (!name || !message) {
      return NextResponse.json(
        { error: 'Missing name or message' },
        { status: 400 }
      )
    }

    // 2. 獲取 MongoDB 連接 (Get MongoDB connection)
    const client = await clientPromise
    const db = client.db('my_next_app')

    // 3. 儲存資料 (Saving data)
    const result = await db.collection('test_collection').insertOne({
      name,
      message,
      createdAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      received: { name, message }
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// 讀取資料範例 (Reading data example)
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('my_next_app')

    const data = await db
      .collection('test_collection')
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray()

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
