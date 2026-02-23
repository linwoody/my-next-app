import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import EditForm from '@/app/components/EditForm'
import styles from '../page.module.css'
import Link from 'next/link'

export default async function EditPage({ params }) {
  const { id } = await params
  
  let data = null
  try {
    if (ObjectId.isValid(id)) {
      const client = await clientPromise
      const db = client.db(process.env.MONGODB_DB || 'my_next_app')
      data = await db.collection('test_collection').findOne({ _id: new ObjectId(id) })
    }
  } catch (error) {
    console.error(error)
  }

  if (!data) return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.content}><h2>找不到資料 / Data Not Found</h2></div>
        <div className={styles.footer}><Link href="/" className={styles.backBtn}>返回首頁 / Back Home</Link></div>
      </div>
    </div>
  )

  // 轉換 _id 為字串供 Client Component 使用
  const initialData = {
    ...data,
    _id: data._id.toString()
  }

  return (
    <div className={styles.container}>
      <div className={styles.card} style={{ borderTop: '4px solid #2563eb' }}>
        <div className={styles.content}>
          <EditForm initialData={initialData} />
        </div>
        <div className={styles.footer}>
          <Link href={`/data/${id}`} className={styles.backBtn}>
            ← 取消並返回 / Cancel
          </Link>
        </div>
      </div>
    </div>
  )
}
