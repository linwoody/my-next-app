'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteBtn({ id }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async (e) => {
    e.preventDefault()
    if (!confirm('確定要刪除這筆資料嗎？')) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/data/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        router.refresh()
      } else {
        alert('刪除失敗')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      style={{
        background: 'transparent',
        border: 'none',
        color: '#ef4444',
        cursor: isDeleting ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        padding: '4px 8px',
        fontWeight: 'bold',
        marginLeft: '10px'
      }}
    >
      {isDeleting ? '...' : '✕'}
    </button>
  )
}
