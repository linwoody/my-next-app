'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import styles from './Pagination.module.css'

export default function Pagination({ totalPages, currentPage }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage)
    router.push(`?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  return (
    <div className={styles.pagination}>
      <button 
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={styles.pageBtn}
      >
        上一頁 / Prev
      </button>
      
      <span className={styles.pageInfo}>
        第 {currentPage} 頁，共 {totalPages} 頁
      </span>

      <button 
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={styles.pageBtn}
      >
        下一頁 / Next
      </button>
    </div>
  )
}
