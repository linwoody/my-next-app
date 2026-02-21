import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    // 1. 獲取動態路由參數 id
    const { id } = await params

    // 2. 驗證 ID 格式
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      )
    }

    // 3. 連接資料庫
    const client = await clientPromise
    const db = client.db('my_next_app')

    // 4. 根據 _id 查詢
    const item = await db.collection('test_collection').findOne({
      _id: new ObjectId(id)
    })

    if (!item) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: item })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
