'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './UserForm.module.css'

export default function EditForm({ initialData }) {
  const [name, setName] = useState(initialData.name)
  const [message, setMessage] = useState(initialData.message)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch(`/api/data/${initialData._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message })
      })

      if (res.ok) {
        alert('更新成功')
        router.push(`/data/${initialData._id}`)
        router.refresh()
      } else {
        alert('更新失敗')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.formCard}>
      <h2 className={styles.formTitle}>編輯用戶資料 / Edit User</h2>
      <form onSubmit={handleUpdate} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>姓名 / Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            disabled={isLoading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>訊息 / Message</label>
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            className={styles.textarea}
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          className={styles.submitBtn} 
          disabled={isLoading}
        >
          {isLoading ? '更新中...' : '儲存變更 / Save Changes'}
        </button>
      </form>
    </div>
  )
}
