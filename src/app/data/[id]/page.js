import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import Link from 'next/link'
import styles from './page.module.css'

export default async function DataDetailPage({ params }) {
  const { id } = await params

  let data = null
  let error = null

  try {
    // 1. 驗證 ID 格式 (Validation ID format)
    if (!ObjectId.isValid(id)) {
      error = "無效的 ID 格式 (Invalid ID format)"
    } else {
      // 2. 直接從資料庫讀取 (Server Component advantage)
      const client = await clientPromise
      const db = client.db(process.env.MONGODB_DB || 'my_next_app')
      data = await db.collection('test_collection').findOne({
        _id: new ObjectId(id)
      })

      if (!data) {
        error = "找不到該筆資料 (Document not found)"
      }
    }
  } catch (e) {
    console.error(e)
    error = "伺服器發生錯誤 (Server error)"
  }

  // 渲染頁面 (Rendering the page)
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>資料詳情 / Data Detail</h1>
        </div>

        <div className={styles.content}>
          {error ? (
            <div className={styles.error}>
              <h3>{error}</h3>
              <p>請檢查您的連結或 ID 是否正確</p>
            </div>
          ) : (
            <>
              <div className={styles.field}>
                <span className={styles.label}>用戶名稱 / Name</span>
                <div className={styles.value}>{data.name}</div>
              </div>

              <div className={styles.field}>
                <span className={styles.label}>建立時間 / Created At</span>
                <div className={styles.value}>
                  {new Date(data.createdAt).toLocaleString('zh-TW')}
                </div>
              </div>

              <div className={styles.field}>
                <span className={styles.label}>訊息內容 / Message</span>
                <div className={styles.messageBox}>
                  <div className={styles.value}>{data.message}</div>
                </div>
              </div>

              <div className={styles.field}>
                <span className={styles.label}>系統 ID / ID</span>
                <div className={styles.value} style={{ fontSize: '12px', color: '#94a3b8' }}>
                  {data._id.toString()}
                </div>
              </div>
            </>
          )}
        </div>

        <div className={styles.footer} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href={`/data/${id}/edit`} className={styles.backBtn} style={{ color: '#0f172a' }}>
            ✎ 編輯資料 / Edit
          </Link>
          <Link href="/" className={styles.backBtn}>
            ← 返回首頁 / Back Home
          </Link>
        </div>
      </div>
    </div>
  )
}
