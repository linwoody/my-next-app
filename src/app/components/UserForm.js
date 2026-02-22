'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './UserForm.module.css'

export default function UserForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !message) return alert('請填寫所有欄位')
    
    setIsLoading(true)
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message })
      })
      
      if (res.ok) {
        setName('')
        setMessage('')
        router.refresh() // 重新整理頁面數據
      } else {
        alert('新增失敗')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.formCard}>
      <h2 className={styles.formTitle}>新增用戶資料 / Add User</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>姓名 / Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            placeholder="請輸入姓名"
            disabled={isLoading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>訊息 / Message</label>
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            className={styles.textarea}
            placeholder="請輸入訊息"
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          className={styles.submitBtn} 
          disabled={isLoading}
        >
          {isLoading ? '處理中...' : '確認新增 / Submit'}
        </button>
      </form>
    </div>
  )
}
