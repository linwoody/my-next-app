import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

// GET: 讀取特定資料
export async function GET(request, { params }) {
  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'my_next_app')
    const item = await db.collection('test_collection').findOne({ _id: new ObjectId(id) })

    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: item })
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}

// PATCH: 更新特定資料 (Update)
export async function PATCH(request, { params }) {
  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

    const body = await request.json()
    const { name, message } = body

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'my_next_app')
    
    const updateData = {}
    if (name) updateData.name = name
    if (message) updateData.message = message
    updateData.updatedAt = new Date()

    const result = await db.collection('test_collection').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, message: 'Updated successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

// DELETE: 刪除特定資料 (Delete)
export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'my_next_app')
    const result = await db.collection('test_collection').deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, message: 'Deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
