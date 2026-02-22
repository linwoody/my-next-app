import Image from "next/image";
import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import styles from "./page.module.css";
import UserForm from "./components/UserForm";
import DeleteBtn from "./components/DeleteBtn";
import Pagination from "./components/Pagination";

export default async function Home({ searchParams }) {
  const { page } = await searchParams;
  const currentPage = parseInt(page) || 1;
  const limit = 5; // 每頁顯示 5 筆資料
  const skip = (currentPage - 1) * limit;

  let users = [];
  let totalCount = 0;
  let totalPages = 0;

  try {
    const client = await clientPromise;
    const db = client.db('my_next_app');
    const collection = db.collection('test_collection');
    
    // 同時取得資料與總數
    const [data, total] = await Promise.all([
      collection.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray(),
      collection.countDocuments({})
    ]);

    users = data;
    totalCount = total;
    totalPages = Math.ceil(totalCount / limit);
  } catch (e) {
    console.error("Failed to fetch users:", e);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        
        {/* 新增資料表單 */}
        <UserForm />

        <section className={styles.userSection}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>用戶列表 / User List</h2>
            <span className={styles.countInfo}>總共 {totalCount} 筆資料</span>
          </div>
          
          {users.length === 0 ? (
            <p className={styles.noData}>目前尚無資料，請填寫上方表單新增。</p>
          ) : (
            <>
              <div className={styles.userList}>
                {users.map((user) => (
                  <div key={user._id.toString()} className={styles.userCardWrapper}>
                    <Link 
                      href={`/data/${user._id.toString()}`}
                      className={styles.userCard}
                    >
                      <span className={styles.userName}>{user.name}</span>
                      <span className={styles.arrow}>→</span>
                    </Link>
                    {/* 刪除按鈕 */}
                    <DeleteBtn id={user._id.toString()} />
                  </div>
                ))}
              </div>

              {/* 分頁控制項 */}
              <Pagination totalPages={totalPages} currentPage={currentPage} />
            </>
          )}
        </section>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            查看文件 / Docs
          </a>
        </div>
      </main>
    </div>
  );
}
