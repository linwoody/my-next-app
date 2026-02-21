import Image from "next/image";
import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import styles from "./page.module.css";

export default async function Home() {
  let users = [];
  try {
    const client = await clientPromise;
    const db = client.db('my_next_app');
    users = await db.collection('test_collection')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
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
          width={400}
          height={160}
          priority
        />
        
        <section className={styles.userSection}>
          <h2 className={styles.title}>用戶列表 / User List</h2>
          
          {users.length === 0 ? (
            <p className={styles.noData}>目前尚無資料，請先透過 POST API 新增資料。</p>
          ) : (
            <div className={styles.userList}>
              {users.map((user) => (
                <Link 
                  key={user._id.toString()} 
                  href={`/data/${user._id.toString()}`}
                  className={styles.userCard}
                >
                  <span className={styles.userName}>{user.name}</span>
                  <span className={styles.arrow}>→</span>
                </Link>
              ))}
            </div>
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
